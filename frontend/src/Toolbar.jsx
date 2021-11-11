import {Toolbar, AppBar} from '@material-ui/core';
import axios from 'axios';
import {Link, Navigate} from "react-router-dom";
import logo from "./assets/BB.png"
import './home.css';
import { useState } from 'react';

export function Navbar(props){
    const [open, setOpen] = useState(false);

    const logout = () => {
        axios.post('/api/auth/signout').then(res => {
            setOpen(true);
        }).catch(err => {
            console.error(err);
        });
    }

    return(
        <>
            <AppBar color="primary" position="relative">
                <Toolbar>
                    <div>
                        <img src={logo} alt="logo" className="img1"/>
                    </div>

                    <div className="menu">
                        <ul>
                            <li>
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li>
                                <Link to="/hardware">Hardware Sets</Link>
                            </li>
                            <li>
                                <Link to="/data">Data Sets</Link>
                            </li>
                            <li>
                                <a href="#" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
            {open ? <Navigate to="/"/> : null}
            </>
    )
}
