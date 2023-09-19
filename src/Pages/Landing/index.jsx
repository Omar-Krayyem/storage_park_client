import './style.css';
import React, { useState, useEffect } from "react";
import NavBar from '../../components/Shared/NavBar';
import Footer from '../../components/Shared/Footer';
import h1 from '../../images/home1.jpg';
import h2 from '../../images/hero3.png';
import icon1 from '../../images/sol1.png';
import icon2 from '../../images/sol2.png';
import icon3 from '../../images/sol3.png';
import icon4 from '../../images/sol4.png';
import icon5 from '../../images//sol5.png';
const Landing = () => {

    return (
        <div className='Landing_page'> 
            <div className='nav_section'> <NavBar/> </div>
            <div className='body'>
                <div className="section hero">
                    <div className='right'>
                        <h1>We Stored, Pick, Pack and Ship</h1>
                        <p>
                        storage park couples powerful software with its flexible nationwide fulfillment network, enabling brands to offer consistently efficient, 
                        cost-effective delivery that improves the customer experience, from every channel.
                        </p>
                        <button>Track Your Order</button>
                    </div>
                    <div><img src={h1} alt='hero image'></img></div>
                </div>

                <div className='section hero2'>
                    <div className='left'>
                        <h1>OUR ENGINEERED SOLUTIONS AND OBSE SSIVE ONBOARDING BUILD ECOMMERCE AND STRENGTHEN RETAIL</h1>
                    </div>
                    <div className='right'>
                        <div className='solutions  one'>
                            <div className="solution">
                                <img src={icon1} alt=""/>
                                <p>
                                    OBSESSIVE
                                    <br/>
                                    ONBOARDING
                                </p>
                            </div>
                            <div className="solution">
                                <img src={icon2} alt=""/>
                                <p className="">
                                    VALUE-ADDED 
                                    <br/>
                                    SERVICES
                                </p>
                            </div>

                            <div className="solution">
                                <img src={icon3} alt=""/>
                                <p>
                                    TAILORED
                                    <br/>
                                    ENGINEERED SOLUTIONS
                                </p>
                            </div>
                        </div>
                        <div className='solutions  two'>
                            <div className="solution">
                                <img src={icon4} alt=""/>
                                <p>
                                    SCALABLE
                                    <br/>
                                    INTEGRATIONS
                                </p>
                            </div>

                            <div className="solution">
                                <img src={icon5} alt=""/>
                                <p>
                                    ROBUST
                                    <br/>
                                    REALTIME PORTAL
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='section hero3'><img src={h2} alt='image'></img></div>
            </div>
            <div className="footer"><Footer/></div>
        </div>
    );
}

export default Landing;