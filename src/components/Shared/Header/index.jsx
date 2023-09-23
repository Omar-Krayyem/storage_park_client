import './style.css';
import React from "react";

const Header = () => {
    const name = localStorage.getItem("user_name");
    return (
        <div className='Header'> 
            LOGGED IN <span>{name}</span>
        </div>
    );
}

export default Header;