import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import {useRoutes} from './routes';
import Navbar from './components/navbar';
import AuthPopup from './components/authPopup';
import 'materialize-css';

const clientId = '917699130461-94p4kpno06kf2r24lt8vmutvegj56uut.apps.googleusercontent.com';//надо перенести в config
class App extends Component {
    componentWillMount ( ) {
        // window.gapi.load('auth2', function() {
        //     window.gapi.auth2.init({
        //         client_id : clientId
        //     });
        // });

        if (!this.props.user.email){
            this.props.onSaveUser({
                _id: "5e789daa6834e397610339e2",
                fitPlans: [],
                name: "Курило Алексей",
                email: "kurilo.alex77@gmail.com",
                img: "https://lh5.googleusercontent.com/-g36di1Gl0cc/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nAmbVm-PRYnUX319BGZZzI3Eqi8UA/s96-c/photo.jpg",
                __v: 0,
            });
            this.props.onChangeVisibilityAuthPopup();
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
        user: state.user
    }),
    dispatch => ({
        onSaveUser: (user) => {
            const payload = user;
            dispatch ({type: 'SAVE_USER', payload})
        },
        onChangeVisibilityAuthPopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_AUTH_POPUP'})
        },
    })
)(App);
