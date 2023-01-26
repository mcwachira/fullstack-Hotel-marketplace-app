import User from '../models/userModel.js'
import Stripe from 'stripe'
import queryString from 'query-string'

// console.log(process.env.STRIPE_SECRET_KEY)
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
        console.log('LOgin link for payout settings', loginLink)
        res.json(loginLink)


    } catch (error) {
        console.log('Stripe Payout settings url', error)
    }

}