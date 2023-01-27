import User from '../models/userModel.js'
import Hotel from '../models/hotelModel.js'
import Order from '../models/orderModel.js'
import Stripe from 'stripe'
import queryString from 'query-string'

console.log(process.env.STRIPE_SECRET_KEY)
const stripe = Stripe('sk_test_51KhTzaFOlIiSsYbGQWbXsjHsgvJAcACwx0S4T1AlTT7UBm0rW7tQr9gnWsBj7Q6XTTvYmLfpSvXH1yqbG8g47fgB00NaZyLNng')
// console.log('stripe', stripe)
export const createConnectAccount = async (req, res) => {
    //check user based on the id from our token
    //console.log(req.user._id)
    const user = await User.findById(req.user._id).exec()

    // console.log(user)

    //check if user has a stripe accout id and if not create a link to signg up the user
    if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({
            type: 'express',
        })
        user.stripe_account_id = account.id

        user.save()
        // console.log(account)

    }


    // console.log(user.stripe_account_id)
    // //create an account link based on the users id
    // console.log(process.env.STRIPE_REDIRECT_URL)

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding',
    })

    //prefil the user details

    accountLink = Object.assign(accountLink, {
        'stipe_user[email]': user.email || undefined
    })

    // console.log(accountLink)

    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`
    // console.log(link)
    res.send(link)
    //update the payment schedule of the user
    // console.log('account connetced')
}

export const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId, {
        settings: {

            payouts: {
                schedule: {
                    delay_days: 7,
                }
            }
        }
    })

    return account
}
export const getAccountStatus = async (req, res) => {
    const user = await User.findById(req.user._id).exec()
    const account = await stripe.accounts.retrieve(user.stripe_account_id)

    //updte delay days 
    const updateAccount = await updateDelayDays(account.Id)

    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id, {
            //save the updated account with updated delay days
            stripe_seller: updateAccount
        },
            { new: true }
        ).select("-password -confirmPassword").exec()
        console.log(updatedUser)


        res.json(updatedUser)

    } catch (error) {
        console.log(error)
    }

}

export const getAccountBalance = async (req, res) => {
    const user = await User.findById(req.user._id).exec()

    try {

        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        })

        res.json(balance)
    } catch (error) {
        console.log(error)
    }
    const account = await stripe.accounts.retrieve(user.stripe_account_id)


}

export const payoutSetting = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).exec()
        const loginLink = await stripe.accounts.createLoginLink(
            //user.stripe_seller.id, 
            user.stripe_account_id, {
            redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
        }
        )
        console.log('Login link for payout settings', loginLink)
        res.json(loginLink)


    } catch (error) {
        console.log('Stripe Payout settings url', error)
    }

}

export const stripeSesionId = async (req, res) => {
    // 1. Get hotel id from the the body
    const { hotelId } = req.body

    console.log(hotelId)
    //2. Find th hotel based on the hotel id
    const hotel = await Hotel.findById(hotelId).populate('postedBy').exec()

    //3.charge platform/application fees like 20%
    const fee = (hotel.price * 20) / 1000

    //4.create a session

    const session = await stripe.checkout.sessions.create({
        //5. purchasing  item etails will be added to the user on checkout
        line_items: [
            {
                name: hotel.title,
                amount: hotel.price * 100, // in cents,
                currency: 'usd',
                quantity: 1,
            }
        ],
        mode: 'payment',

        //6. create payment intent , application fees, destination charge
        payment_intent_data: {
            application_fee_amount: fee * 100, //convert into cents
            //seller can see balance in dashboard
            transfer_data: {
                destination: hotel.postedBy.stripe_account_id
            }
        },


        //success and cancel url
        success_url: `${process.env.STRIPE_SUCCESS_URL}/${hotel._id}`,
        //`process.env.STRIPE_SUCCESS_URL/${hotel._id}`
        cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    console.log('this is link ', process.env.STRIPE_SUCCESS_URL)
    console.log(hotel._id)
    console.log(session)

    //7. add the sesion object to user in db
    await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec()

    //8.send session id as to repsonse frontend 
    res.send({
        sessionId: session.id
    })
}


export const stripeSuccess = async (req, res) => {

    const { hotelId } = req.body

    try {
        //first get the htoel from the hotel id in the body
        const hotel = await Hotel.findById(hotelId)

        //get the user who booked the hotel
        const user = await User.findById(req.user._id)

        console.log('user id', user)
        //check if user has stripe session
        if (!user.stripeSession) return;
        //retriev the users stipe session

        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id)

        //check if the session is payed for and if not create one
        if (session.payment_status === 'paid') {

            //check if order exist 
            const orderExist = await Order.findOne({ 'session.id': session.id })
            if (orderExist) {

                //if the order exist send success
                res.json({ success: true })
            } else {
                //create a new order

                let newOrder = await new Order({
                    hotel: hotelId,
                    session,
                    orderedBy: user._id,

                }).save()
            }


            //remove stripe session

            await User.findByIdAndUpdate(user._id, {
                $set: { stripeSession: {} },
            })

            res.json({ success: true })
        }



    } catch (error) {
        console.log(error)
    }


}