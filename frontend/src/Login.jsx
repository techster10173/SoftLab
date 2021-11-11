import React from 'react';
import './login.css';
import logo from "./assets/BB.png"
import {Button, TextField, Box} from '@mui/material';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


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
        axios.put('/auth/', {
            uname: this.state.username,
            pass: this.state.password
        }).then(res => {
            this.setState({loggedIn: true});
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

    signup = () => {
        axios.post('/auth/', {
            uname: this.state.username,
            pass: this.state.password
        }).then(res => {
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
                            height: 400,
                            backgroundColor: 'white',
                            opacity: [0.9, 0.8, 0.7],
                            padding: "20px 10px 20px 10px",
                            boxShadow: "2px 1px 19px -2px #000000",
                            borderRadius: 7,
                            margin: "0 auto"
                        }}
                    >
                        <img src={logo} alt="logo" className="log_logo" />
                        <div>
                            <TextField sx={textFieldStyle} onChange={this.updateUsername} value={this.state.username} id="outlined-basic" label="Username" variant="outlined" />
                            <TextField sx={textFieldStyle} onChange={this.updatePassword} value={this.state.password} label="Password" type="password" variant="outlined" />
                            <div>
                                <Button variant="contained" sx={{width: "33%", left: "15%"}} onClick={this.login}>Login</Button>
                                <Button variant="contained" sx={{width: "33%", left: "19%"}} onClick={this.signup}>Signup</Button>
                            </div>   
                        </div>
                    </Box>
                </div>
            {this.state.loggedIn ? <Navigate to="/projects" /> : null}
            </>
        )
    }

}