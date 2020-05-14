import React from 'react';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import DefaultCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from '@appannie/react-infinite-calendar';
// import '@appannie/react-infinite-calendar/styles.css';

// import InfiniteCalendar, {
//     Calendar,
//     defaultMultipleDateInterpolation,
//     withMultipleDates,
// } from 'react-infinite-calendar';

import {
    userDayExercisesAPI,
    userDayPlansAPI,
} from '../api';

import "react-infinite-calendar/styles.css";

const MyCalendar = ({onAddDate, date, user, userDayPlan, onGetUserDayExercises, onGetUserDayPlan, onGetUserDayPLanExercises}) => {
    const history = useHistory();

    const onChangeHandler = (dateObj) => {
        const date = new Date(dateObj);
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const mounth = date.getMonth() < 9 ? ("0" + (1 + date.getMonth())) : (1 + date.getMonth());
        const year = date.getFullYear();

        onGetUserDayPlan(user._id, `${year}-${mounth}-${day}`);
        onGetUserDayExercises(user._id, `${year}-${mounth}-${day}`);
        onGetUserDayPLanExercises(userDayPlan);

        onAddDate(`${year}-${mounth}-${day}`);
        history.push(`/exercises/${year}-${mounth}-${day}`);
    };
    return (
        <DefaultCalendar
            displayOptions={{
                layout: 'landscape',
                showOverlay: true,
                shouldHeaderAnimate: true,
                showHeader: false,
                todayHelperRowOffset: 1,
                overscanMonthCount: 1
            }}
            width={600}
            height={400}
            minDate={new Date()}
            Component={withMultipleDates(Calendar)}
            interpolateSelection={defaultMultipleDateInterpolation}
            onSelect={onChangeHandler}
            selected={date}
        />
    );
};

export default connect(
    state => ({
        user: state.user,
        date: state.date,
        userDayPlan: state.userDayPlan,
    }),
    dispatch => ({
        onAddDate: date => {
            const payload = date;
            dispatch({type: 'ADD_DATE', payload})
        },
        onGetUserDayPlan: (userId, date) => {
            dispatch(userDayPlansAPI.getUserDaysPlan(userId, date));
        },
        onGetUserDayExercises: (userId, date) => {
            dispatch(userDayExercisesAPI.getUserDayExercise(userId, date));
        },
        onGetUserDayPLanExercises: (userId, date) => {
            dispatch(userDayExercisesAPI.getUserDayPlanExercise(userId, date));
        },
    })
)(MyCalendar);
