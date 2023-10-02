import './style.css';
import React,  { useState } from "react";
import logo from '../../../images/logo_d.png';
import { FaWarehouse } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import {TbTruckDelivery} from "react-icons/tb";
import { FiLogOut } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';

const NavSide = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(localStorage.getItem("current_page"));

    const handlePageClick = (pageName) => {
        setActiveSection(pageName);
        localStorage.setItem("current_page", pageName);
    };

    const handleLogout  = () => {
        localStorage.setItem("token" , "");
        localStorage.setItem("user_type", 0);
        localStorage.setItem("current_page", "dashboard");
        navigate('/login');
    }
    
    return (
        <div>
            <div className="sidebar">
                <div className='upper_section'>
                    <div className="logo"><img src={logo} alt='logo'></img></div>

                    <div className="sections ">
                        <NavLink className="nav_link" to={'/partner/dashboard'}>
                            <div className={`title_section ${activeSection === "dashboard" ? 'selected' : ''}`} onClick={() => handlePageClick("dashboard")}>
                                <div className='icon'><MdDashboard size={25} /></div>
                                <div className="title">Dashboard</div>
                            </div>
                        </NavLink>

                        <NavLink className="nav_link" to={'/partner/stock'}>
                            <div className={`title_section ${activeSection === "stock" ? 'selected' : ''}`} onClick={() => handlePageClick("stock")}>
                                <div className='icon'><FaWarehouse size={25} /></div>
                                <div className="title">Stored Products</div>
                            </div>
                        </NavLink>

                        <NavLink className="nav_link" to={'/partner/incoming'}>
                            <div className={`title_section ${activeSection === "incoming" ? 'selected' : ''}`} onClick={() => handlePageClick("incoming")}>
                                <div className='icon'> <TbTruckDelivery size={27}/> </div>
                                <div className="title">Incoming Orders</div>
                            </div>
                        </NavLink>

                        <NavLink className="nav_link" to={'/partner/outgoing'}>
                            <div className={`title_section ${activeSection === "outgoing" ? 'selected' : ''}`} onClick={() => handlePageClick("outgoing")}>
                                <div className='icon reflect'> <TbTruckDelivery size={27}/> </div>
                                <div className="title">Outgoing Orders</div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                
                <div className="lower-section">
                    <div className="title_section" onClick={handleLogout}>
                        <div className='icon'><FiLogOut  size={25}/></div>
                        <div className="title">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavSide;