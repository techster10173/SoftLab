import {Toolbar, AppBar} from '@material-ui/core';
import {Link} from "react-router-dom";
import logo from "./assets/BB.png"


export function Navbar(props){
    return(
        <div>
            <AppBar variant = "contained" color = "primary">
                <Toolbar>
                    <div class="container">
                            <img src={logo} alt="logo" class="img1"/>
                        </div>

                        <div class="nav">
                            <ul>
                                <li>
                                    <Link to="/project">Projects</Link>
                                </li>
                                <li>
                                    <Link to="/hardware">Hardware Sets</Link>
                                </li>
                                <li>
                                    <Link to="/data">Data Sets</Link>
                                </li>
                            </ul>
                        </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
