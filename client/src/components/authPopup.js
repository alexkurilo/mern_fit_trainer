import React from 'react';
import {connect} from "react-redux";

import './authPopup.css';

const AuthPopup = ({authPopup, onChangeVisibilityAuthPopup, onSaveUser, onSaveDates}) => {
    const signInHendler = () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        GoogleAuth.signIn({
            scope: 'profile email'
        }).then((googleUser) => {
            const userData = {
                name: googleUser.getBasicProfile().getName(),
                email: googleUser.getBasicProfile().getEmail(),
                img: googleUser.getBasicProfile().getImageUrl(),
            };

            fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({...userData}),
                headers: {"Content-Type": "application/json"}
            })
                .then( response => response.json())
                .then( ({ data }) => {
                    if (data) {
                        onSaveUser(data);
                        fetch(`/api/user_day_exercise/${data._id}`)
                            .then( response => response.json())
                            .then( ({ data }) => {
                                onSaveDates(data);
                            });
                    }
                    onChangeVisibilityAuthPopup();
                    return data;
                });
        });
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
                            src="img/google_icon.ico"
                            alt="google oauth2"
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
        onSaveUser: (user) => {
            const payload = user;
            dispatch ({type: 'SAVE_USER', payload})
        },
        onChangeVisibilityAuthPopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_AUTH_POPUP'})
        },
        onSaveDates: datesList => {
            const payload = datesList;
            dispatch ({type: 'SAVE_DATES', payload})
        },
    })
)(AuthPopup);