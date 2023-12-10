import './NavBarStyle.css';
import routes from '../routes/routes';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <img src={logo} alt="Logo de mini super joel" />
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
