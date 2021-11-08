import {Toolbar, AppBar} from '@material-ui/core';
import {Link} from "react-router-dom";
import logo from "./assets/BB.png"
import './home.css';

export function Navbar(props){
    return(
            <AppBar color="primary" position="relative">
                <Toolbar>
                    <div>
                        <img src={logo} alt="logo" class="img1"/>
                    </div>

                    <div class= "menu">
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
                                <Link to="/">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
    )
}
