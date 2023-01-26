import axios from 'axios'

//enables a new user to sign up for an account
export const register = async (user) => await axios.post(`${process.env.REACT_APP_API}/register`, user)

//enables a registered user to sign ui for an account
export const login = async (user) => await axios.post(`${process.env.REACT_APP_API}/login`, user)

//updates the user in local storage after getting the stripe details
export const updateUserInLocalStorage = (user, next) => {
    if (window.localStorage.getItem('auth')) {
        let auth = JSON.parse(localStorage.getItem('auth'))
        auth.user = user;
        localStorage.setItem('auth', JSON.stringify(auth))

        //why are we calling next?
        //callback function
        next();
    }

}

