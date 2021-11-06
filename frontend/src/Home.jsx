import './home.css';
import { Link } from 'react-router-dom';

export function Home(props){
    return (
        <nav>
            <div class="container">
                <img src="https://www.kindpng.com/picc/m/63-636289_computer-chip-computer-chip-icon-png-transparent-png.png" alt="logo" class="img1"/>
            </div>

            <div class="menu">
                <ul>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#the-team">The Team</a>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}