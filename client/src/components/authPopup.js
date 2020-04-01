import React from 'react';
import {connect} from "react-redux";

import {
    authAPI,
} from '../api';

import './authPopup.css';

const AuthPopup = ({authPopup, onGetUser, socialNetworks}) => {
    const signInHendler = (socNetName) => {
        onGetUser(socNetName);
    };

    const visibility = () => {
        return authPopup ? 'visible' : 'hidden';
    };

    return (
        <div className={'auth ' + visibility()}>
            <div className={'popup'}>
                <h4> You can log in using some social network</h4>
                {
                    socialNetworks.map( socNetName => {
                        return (
                            <div
                                key={socNetName}
                                className="waves-effect waves-light btn"
                                onClick={() => signInHendler(socNetName)}
                            >
                                <i className="material-icons left">
                                    <img
                                        className="icon_button"
                                        src={`/img/${socNetName}_icon.png`}
                                        alt={socNetName}
                                    />
                                </i>
                                sign in with {socNetName}
                            </div>
                        )
                    })
                }


            </div>
        </div>
    );
};

export default connect(
    state => ({
        user: state.user,
        authPopup: state.authPopup,
        socialNetworks: state.socialNetworks,
    }),
    dispatch => ({
        onGetUser: (socNetName) => {
            dispatch(authAPI[socNetName].getUser())
        },
    })
)(AuthPopup);