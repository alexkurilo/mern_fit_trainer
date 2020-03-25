import React from 'react';
import {connect} from 'react-redux';

const HomePage = () => {
    return(
        <div className="container">
            <h3>Home Page</h3>

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