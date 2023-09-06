import './style.css';
import React from "react";

const Header = (props) => {
    return (
        <div className='Header'> 
            LOGGED IN <span>{props.name}</span>
        </div>
    );
}

export default Header;