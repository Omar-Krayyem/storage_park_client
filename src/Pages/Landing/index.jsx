import './style.css';
import React, { useState, useEffect } from "react";
import NavBar from '../../components/Shared/NavBar';
import Footer from '../../components/Shared/Footer';
const Landing = () => {

    return (
        <div className='Landing_page'> 
            <div className='nav_section'> <NavBar/> </div>
            <div className='body'>

            </div>
            <div className="footer"><Footer/></div>
        </div>
    );
}

export default Landing;