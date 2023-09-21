import './style.css';
import React from "react";
import { useSelector } from 'react-redux';

const Header = () => {
    const name = useSelector((store) => store.user.user_name);
    return (
        <div className='Header'> 
            LOGGED IN <span>{name}</span>
        </div>
    );
}

export default Header;