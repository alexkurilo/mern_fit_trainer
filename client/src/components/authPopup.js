import React from 'react';
import {connect} from "react-redux";

import {
    authAPI,
} from '../api';

import './authPopup.css';

const AuthPopup = ({authPopup, onGetUser}) => {
    const signInHendler = () => {
        onGetUser();
    };

    const visibility = () => {
        return authPopup ? 'visible' : 'hidden';
    };

    return (
        <div className={'auth ' + visibility()}>
            <div className={'popup'}>
                <h4> You can log in using google</h4>
                <div
                    className="waves-effect waves-light btn"
                    onClick={signInHendler}
                >
                    <i className="material-icons left">
                        <img
                            className="icon_button"
                            src="/img/google_icon.png"
                            alt="google"
                        />
                    </i>
                    sign in with Google
                </div>
            </div>
        </div>
    );
};

export default connect(
    state => ({
        user: state.user,
        authPopup: state.authPopup
    }),
    dispatch => ({
        onGetUser: () => {
            dispatch(authAPI.google.oauth2.getUser())
        },
    })
)(AuthPopup);