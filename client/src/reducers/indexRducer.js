import {combineReducers} from 'redux';
import user from "./userReducer";
import authPopup from "./authPopupReducer";
import date from "./dateReducer";

export default combineReducers({
    user,
    authPopup,
    date,
})