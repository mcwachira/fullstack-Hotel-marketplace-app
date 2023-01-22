import { combineReducers } from "redux";
import authReducer from "./authReducer/authReducer";

const rootReducer = combineReducers({
    user: authReducer,
})

export default rootReducer