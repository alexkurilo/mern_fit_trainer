import {combineReducers} from 'redux';
import user from './userReducer';
import popup from './popupReducer';
import date from './dateReducer';
import commonExercises from './commonExercisesReducer';
import userDayExercises from './userDayExercisesReduser';
import userDayPlan from './userDayPlanReducer';
import socialNetworks from './socialNetworksReducer';

export default combineReducers({
    user,
    popup,
    date,
    commonExercises,
    userDayExercises,
    userDayPlan,
    socialNetworks,
})