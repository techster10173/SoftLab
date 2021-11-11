import React from 'react';
import './login.css';
import { Home } from './Home.jsx';
import logo from "./assets/newLogo.png"
import {Button, TextField, Box} from '@mui/material';
import axios from 'axios';
import {Navigate, Router, Route, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createStore } from 'redux';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

export function authReducer(state = {value: document.cookie === ""}, action) {
    switch (action.type) {
        case 'LOGIN':
            return {value: true};
        case 'LOGOUT':
            return {value: false};
        default:
            return state;
    }
}

export let authStore = createStore(authReducer);

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        };
        this.MySwal = withReactContent(Swal)
    }

    login = (e) => {
        if(this.state.username === ""){
            this.MySwal.fire({
                title: 'Username cannot be empty',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        if(this.state.password === ""){
            this.MySwal.fire({
                title: 'Password cannot be empty',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        e.preventDefault();
        axios.put('/auth/', {
            uname: this.state.username,
            pass: this.state.password
        }).then(res => {
            console.log(res);
            this.setState({loggedIn: true});
            authStore.dispatch({type: 'LOGIN'});
        }).catch(err => {
            this.MySwal.fire({
                title: 'Login Failed',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            console.error(err.response);
        });

    }

    signup = (e) => {
        e.preventDefault();

        if(this.state.username === ""){
            this.MySwal.fire({
                title: 'Username cannot be empty',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        if(this.state.password === ""){
            this.MySwal.fire({
                title: 'Password cannot be empty',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        axios.post('/auth/', {
            uname: this.state.username,
            pass: this.state.password
        }).then(res => {
            authStore.dispatch({type: 'LOGIN'});
            this.setState({loggedIn: true});
            console.log(res);
        }).catch(err => {
            this.MySwal.fire({
                title: 'Signup Failed',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            console.error(err);
        });
    }

    updateUsername = (e) => {
        this.setState({username: e.target.value});
    }

    updatePassword = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
        const textFieldStyle = {
            width: "70%",
            left: "15%",
            marginBottom: "10px"
        }

        return (
            <>
                <div id="login_body">
                    <Box
                        sx={{
                            width: "300px",
                            height: 440,
                            backgroundColor: 'white',
                            opacity: [0.9, 0.8, 0.7],
                            padding: "20px 10px 20px 10px",
                            boxShadow: "2px 1px 19px -2px #000000",
                            borderRadius: 7,
                            margin: "0 auto"
                        }}
                    >
                        <Link variant="contained" sx={{width: "33%", left: "15%"}} to="/"><ArrowBackIosOutlinedIcon></ArrowBackIosOutlinedIcon></Link>
                        <Link variant="contained" sx={{width: "33%", left: "15%"}} to="/"><img src={logo} alt="logo" className="log_logo" /></Link>
                        <div>
                            <TextField sx={textFieldStyle} onChange={this.updateUsername} value={this.state.username} id="outlined-basic" label="Username" variant="outlined" />
                            <TextField sx={textFieldStyle} onChange={this.updatePassword} value={this.state.password} label="Password" type="password" variant="outlined" />
                            <div>
                                <Button variant="contained" sx={{width: "33%", left: "15%"}} onClick={this.signup}>Signup</Button>
                                <Button variant="contained" sx={{width: "33%", left: "19%"}} onClick={this.login}>Login</Button>
                            </div>   
                        </div>
                    </Box>
                </div>
            {this.state.loggedIn ? <Navigate to="/projects" /> : null}
            </>
        )
    }

}