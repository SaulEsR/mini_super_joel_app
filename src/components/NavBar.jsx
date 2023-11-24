import "./NavBarStyle.css";
import routes from "../utils/router";
import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <img src={logo} alt="Logo del establecimeinto" />
                </li>
                {routes.map((route) => (
                    <li>
                        <NavLink to={route.path}>{route.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
