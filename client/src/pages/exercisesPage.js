import React from 'react';
import {connect} from 'react-redux';

const ExercisesPage = () => {
    return(
        <div className="container">
            <h3>Exercises Page</h3>

        </div>
    );
};


export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({

    })
)(ExercisesPage);