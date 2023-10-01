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
import OrderTrackModal from '../../components/Modals/OrderTrackModal';
const Landing = () => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return (
        <div className='Landing_page'> 
            <div className='nav_section'> <NavBar/> </div>
            <div className='body'>
                <div className="section hero">
                    <div className='right'>
                        <h1>Streamlined Solutions for Your Business</h1>
                        <p>
                        Storage Park couples powerful software with its flexible nationwide fulfillment network, enabling brands to offer consistently efficient, 
                        cost-effective delivery that improves the customer experience, from every channel.
                        </p>
                        <button onClick={handleOpenModal}>Track Your Order</button>
                    </div>
                    <div><img src={h1} alt='hero image'></img></div>
                </div>

                <div className='hero2'>
                        <h1>Our Services</h1>
                        <div className='solutions'>
                            <div className="solution">
                                
                                <img src={icon1} alt=""/>
                                <p>
                                    Obsessive
                                    <br/>
                                    Onboarding
                                </p>
                            </div>
                            <div className="solution">
                               
                                <img src={icon2} alt=""/> 
                                <p className="">
                                    Value-Added
                                    <br/>
                                    Services
                                </p>
                            </div>

                            <div className="solution">
                                
                                <img src={icon3} alt=""/>
                                <p>
                                    Tailored
                                    <br/>
                                    Engineered Solutions
                                </p>
                            </div>
                            <div className="solution">
                                
                                <img src={icon4} alt=""/>
                                <p>
                                    Scalable
                                    <br/>
                                    Integrations
                                </p>
                            </div>

                            <div className="solution">
                                
                                <img src={icon5} alt=""/> 
                                <p>
                                    Robust
                                    <br/>
                                    Realtime Portal
                                </p>
                            </div>
                        </div>
                                                   
                </div>
                <div className='section hero3'><img src={h2} alt='image'></img></div>
            </div>
            <div className="footer"><Footer/></div>
            <OrderTrackModal
            handleCloseModal={handleCloseModal}
            openModal={openModal}
            />
        </div>
    );
}

export default Landing;