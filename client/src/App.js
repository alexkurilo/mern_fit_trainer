import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {
    authAPI,
    commonExercisesAPI,
} from './api';

import {useRoutes} from './routes';
import Navbar from './components/navbar';
import AuthPopup from './components/authPopup';
import 'materialize-css';

class App extends Component {
    componentWillMount ( ) {
        // this.props.onGetAuth();

        if (!this.props.commonExercises.length){
            this.props.onGetCommonExercises();
        }

/////////////////////////////////////////////////////////////////////
        if (!this.props.user.email){
            this.props.onSaveUser({
                _id: "5e789daa6834e397610339e2",
                name: "Курило Алексей",
                email: "kurilo.alex77@gmail.com",
                img: "https://lh5.googleusercontent.com/-g36di1Gl0cc/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nAmbVm-PRYnUX319BGZZzI3Eqi8UA/s96-c/photo.jpg",
                __v: 0,
            });
            this.props.onChangeVisibilityAuthPopup();

            fetch(`/api/user_day_exercise/5e789daa6834e397610339e2`)
                .then( response => response.json())
                .then( response => {
                    this.props.onSaveDates(response);
                })
            ;
        }
///////////////////////////////////////////////////////////////////////

    }

    render() {
        return (
            <div>
                { !!this.props.user.email && (
                    <BrowserRouter>
                        <Navbar />
                        {useRoutes(!!this.props.user)}
                    </BrowserRouter>
                )}
                <AuthPopup />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: state.user,
        commonExercises: state.commonExercises,
    }),
    dispatch => ({
        onSaveUser: user => {
            const payload = user;
            dispatch ({type: 'SAVE_USER', payload})
        },
        onSaveDates: datesList => {
            const payload = datesList;
            dispatch ({type: 'SAVE_DATES', payload})
        },
        onGetAuth: () => {
            dispatch ( authAPI.getAuthData() );
        },
        onGetCommonExercises: () => {
            dispatch ( commonExercisesAPI.getCommonExercises() );
        },
        onChangeVisibilityAuthPopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_AUTH_POPUP'})
        },
    })
)(App);
