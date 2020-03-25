import {combineReducers} from 'redux';
import user from "./userReducer";
import authPopup from "./authPopupReducer";

export default combineReducers({
    user,
    authPopup,
})