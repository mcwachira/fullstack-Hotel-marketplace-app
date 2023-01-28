import axios from 'axios'

//this enables the user to  cretae an account with stripe 
//The user should have a  auth token generated when he login to his account
//the function send the token to the backenend to be verified
export const createConnectAccount = async (token) => await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)



//get account status

export const getAccountStatus = async (token) => await axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)



export const getAccountBalance = async (token) => await axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)




export const payoutSettings = async (token) => await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)

export const getSessionId = async (token, hotelId) => await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,

    {
        hotelId
    }
    ,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)

export const stripeSuccessRequest = async (token, hotelId) => await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,

    {
        hotelId
    }
    ,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)

// export const searchListing = async (query) => {
//     await axios.post(`${process.env.REACT_APP_API}/search-listing`, query)
// }

export const searchListing = async (query) =>
    await axios.post(`${process.env.REACT_APP_API}/search-listing`, query);