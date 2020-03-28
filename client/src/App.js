import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {useRoutes} from './routes';
import Navbar from './components/navbar';
import AuthPopup from './components/authPopup';
import 'materialize-css';

class App extends Component {
    componentWillMount ( ) {
        if (this.props.user.email == null){
            fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'google',
                    type: 'oauth2',
                }),
                headers: {"Content-Type": "application/json"}
            })
                .then( response => response.json())
                .then( ({ data }) => {
                    window.gapi.load('auth2', function() {
                        window.gapi.auth2.init({
                            client_id : data.client_id,
                        });
                    });
                });
        }

/////////////////////////////////////////////////////////////////////
//         if (!this.props.user.email){
//             this.props.onSaveUser({
//                 _id: "5e789daa6834e397610339e2",
//                 fitPlans: [],
//                 name: "Курило Алексей",
//                 email: "kurilo.alex77@gmail.com",
//                 img: "https://lh5.googleusercontent.com/-g36di1Gl0cc/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nAmbVm-PRYnUX319BGZZzI3Eqi8UA/s96-c/photo.jpg",
//                 __v: 0,
//             });
//             this.props.onChangeVisibilityAuthPopup();
//
//             fetch(`/api/user_day_exercise/5e789daa6834e397610339e2`)
//                 .then( response => response.json())
//                 .then( ({ data }) => {
//                     this.props.onSaveDates(data);
//                 })
//             ;
//         }
///////////////////////////////////////////////////////////////////////

        if (this.props.commonExercises.length === 0){
            fetch('/api/common_exercise')
                .then( response => response.json())
                .then( ({ data }) => {
                    this.props.onSaveCommonExercises(data)
                })
            ;
        }
    }

    render() {
        return (
            <div>
                { !!this.props.user.email && (
                    <BrowserRouter>
                        <Navbar />
                        {useRoutes()}
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
        onSaveCommonExercises: exercises => {
            const payload = exercises;
            dispatch ({type: 'SAVE_COMMON_EXERCISES', payload})
        },
        onChangeVisibilityAuthPopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_AUTH_POPUP'})
        },
        onSaveDates: datesList => {
            const payload = datesList;
            dispatch ({type: 'SAVE_DATES', payload})
        }
    })
)(App);
