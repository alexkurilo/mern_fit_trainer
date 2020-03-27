import React from 'react';
import {connect} from 'react-redux';

import MyCalendar from '../components/calendar';

const HomePage = () => {
    return(
        <div className="container">
            <h5>Choose a training date.</h5>
            <div className="calendar_container">
                <MyCalendar />
            </div>
        </div>
    );
};

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({

    })
)(HomePage);