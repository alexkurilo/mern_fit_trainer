import React from 'react';
import {connect} from 'react-redux';

import MyCalendar from '../components/calendar';
// import InfiniteCalendar, {
//     Calendar,
//     defaultMultipleDateInterpolation,
//     withMultipleDates,
// } from '@appannie/react-infinite-calendar';
// import '@appannie/react-infinite-calendar/styles.css';

// import InfiniteCalendar, {
//     Calendar,
//     defaultMultipleDateInterpolation,
//     withMultipleDates,
// } from 'react-infinite-calendar';
// import "react-infinite-calendar/styles.css";

const HomePage = () => {
    // const onChangeHandler = (event) => {
    //     console.log(event);
    // };



    return(
        <div className="container">
            <h5>Choose a training date.</h5>
            <div className="calendar_container">
                {/*<InfiniteCalendar*/}
                {/*    displayOptions={{*/}
                {/*        layout: 'landscape',*/}
                {/*        showOverlay: true,*/}
                {/*        shouldHeaderAnimate: true,*/}
                {/*        showHeader: false,*/}
                {/*        todayHelperRowOffset: 1,*/}
                {/*        overscanMonthCount: 1*/}
                {/*    }}*/}
                {/*    width={800}*/}
                {/*    height={600}*/}
                {/*    // disabledDays={[0, 6]}*/}
                {/*    minDate={new Date()}*/}
                {/*    Component={withMultipleDates(Calendar)}*/}
                {/*    interpolateSelection={defaultMultipleDateInterpolation}*/}
                {/*    onSelect={(event) => onChangeHandler(event)}*/}
                {/*    selected={[new Date("2020-03-26"), new Date("2020-03-28"), new Date("2020-03-30")]}*/}
                {/*    // selected={new Date("2020-03-26")}*/}
                {/*/>*/}
                <MyCalendar />
            </div>
        </div>
    );
};


export default connect(
    (state) => ({
        user: state.user
    }),
    dispatch => ({

    })
)(HomePage);