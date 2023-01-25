
let userState;
if (window.localStorage.getItem('auth')) {
    userState = JSON.parse(window.localStorage.getItem('auth'))
} else {
    userState = null;
}

const authReducer = (state = userState, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return {
                ...state, ...action.payload
            }
        case 'LOGGED_OUT_USER':
            return {
                ...state, ...action.payload
            }

        default:
            return state
    }

}


export default authReducer