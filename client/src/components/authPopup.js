import React from 'react';
import {connect} from "react-redux";

import {
    authAPI,
} from '../api';

import './authPopup.css';

const AuthPopup = ({popup, onGetUser, socialNetworks}) => {
    const signInHendler = (socNetName) => {
        if (socNetName === 'google'){
            onGetUser(socNetName);
        } else {
            alert(`Connect library for ${socNetName}`);
        }
    };

    const visibility = () => {
        return popup.authPopup ? 'visible' : 'hidden';
    };

    return (
        <div className={'auth ' + visibility()}>
            <div className={'popup'}>
                <h5> You can log in using some social network</h5>
                <div className='soc_window'>
                    {
                        socialNetworks.map( socNetName => {
                            return (
                                <div
                                    key={socNetName}
                                    className="btn-floating btn-large waves-effect waves-light white btn soc_btn"
                                    onClick={() => signInHendler(socNetName)}
                                >
                                    <img
                                        className="icon_button material-icons"
                                        src={`/img/${socNetName}.png`}
                                        alt={socNetName}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default connect(
    state => ({
        user: state.user,
        popup: state.popup,
        socialNetworks: state.socialNetworks,
    }),
    dispatch => ({
        onGetUser: (socNetName) => {
            dispatch(authAPI[socNetName].getUser())
        },
    })
)(AuthPopup);