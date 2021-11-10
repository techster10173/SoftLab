import React from 'react';
import './login.css';
import logo from "./assets/BB.png"
import {Button, TextField, Box} from '@mui/material';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const textFieldStyle = {
            width: "70%",
            left: "15%",
            marginBottom: "10px"
        }


        return (
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
                    <img src={logo} alt="logo" class="log_logo" />
                    <div>
                        <TextField sx={textFieldStyle} id="outlined-basic" label="Username" variant="outlined" />
                        <TextField sx={textFieldStyle} label="Password" type="password" variant="outlined" />
                        <div>
                            <Button variant="contained" sx={{width: "33%", left: "15%"}}>Login</Button>
                            <Button variant="contained" sx={{width: "33%", left: "19%"}}>Signup</Button>
                        </div>   
                    </div>
                </Box>
            </div>
           
    

        )
    }

}