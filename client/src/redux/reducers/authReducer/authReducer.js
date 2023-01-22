
const initialState = {

}

const authReducer = (initialState, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return {
                ...initialState, ...action.payload
            }
        case 'LOGGED_OUT_USER':
            return {
                ...initialState, ...action.payload
            }

        default:
            return initialState
    }

}


export default authReducer