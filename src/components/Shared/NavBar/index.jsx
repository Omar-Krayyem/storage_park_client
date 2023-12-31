import './style.css';
import LOGO from '../../../images/logo_landing.png';
import { NavLink } from 'react-router-dom';
const Navbar = () => {

    return (
        <div className='navbar'> 
            <div className='left'>
                <img src={LOGO} alt='logo'></img>
            </div>
            <div className="right">
                <NavLink to={'/register'}><button >Get Started</button></NavLink>
                <NavLink to={'/login'}><button >Login</button></NavLink>
            </div>
        </div>
    );
}

export default Navbar;