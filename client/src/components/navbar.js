import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

const Navbar = ({user, onRemoveUser, onChangeVisibilityAuthPopup}) => {
    const signOutHendler = () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        GoogleAuth.signOut()
            .then(() => {
                onRemoveUser();
                onChangeVisibilityAuthPopup();
        }, () => console.log('sign out error'));
    };
    return(
        <nav>
            { !!user.email && (
                <div className="nav-wrapper blue darken-1 padding">
                    <div className="left user_left">
                        <img
                            className="user_icon"
                            src={user.img}
                            title={user.name}
                            alt={user.email}
                        />
                        &nbsp;
                        <span>Hi, {user.name}!</span>
                    </div>
                    <div id="nav-mobile" className="right user_right">
                        <ul>
                            <li>
                                <NavLink  to="/" >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/exercises" >
                                    Exercises list
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/" onClick={signOutHendler}>
                                    Sign Out
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};


export default connect(
    (state) => ({
        user: state.user
    }),
    dispatch => ({
        onRemoveUser: () => {
            dispatch ({type: 'REMOVE_USER'})
        },
        onChangeVisibilityAuthPopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_AUTH_POPUP'})
        },

    })
)(Navbar);