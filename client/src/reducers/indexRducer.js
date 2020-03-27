import {combineReducers} from 'redux';
import user from './userReducer';
import authPopup from './authPopupReducer';
import date from './dateReducer';
import commonExercises from './commonExercisesReducer';

export default combineReducers({
    user,
    authPopup,
    date,
    commonExercises,
})