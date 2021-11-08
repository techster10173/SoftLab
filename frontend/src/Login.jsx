import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import './login.css';
import logo from "./assets/BB.png"
import {Box} from '@material-ui/core';
import 'firebase/auth';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.uiConfig = {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
            signInSuccessUrl: '/projects',
            // We will display Google and Facebook as auth providers.
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        }
    }

    render() {
        return (
            <div id="login_body">
                <Box
                    sx={{
                        width: "300px",
                        height: 300,
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                        padding: "20px 10px 20px 10px",
                        boxShadow: "2px 1px 19px -2px #000000",
                        borderRadius: 20,
                        margin: "0 auto"
                    }}
                >
                    <img src={logo} alt="logo" class="log_logo" />

                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}></StyledFirebaseAuth>

                </Box>
            </div>
           
    

        )
    }

}