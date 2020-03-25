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
        window.gapi.load('auth2', function() {
            window.gapi.auth2.init({
                client_id : clientId
            });
        });
    }

    render() {
        console.log(this.props.user);
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

    })
)(App);
