
const initialState = {
    name: 'charles'

}

const authReducer = (state = { ...initialState }, action) => {
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