import './style.css';
import React,  { useState } from "react";
import logo from '../../../images/logo_d.png';
import { FaWarehouse } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import {TbTruckDelivery} from "react-icons/tb";
import { FiLogOut } from 'react-icons/fi';
import { BiSolidUser } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';

const NavSide = () => {
    const navigate = useNavigate();
    const [expandedSections, setExpandedSections] = useState([]);
    const [activeSection, setActiveSection] = useState(localStorage.getItem("current_page"));

    const toggleSection = (section) => {
        if (expandedSections.includes(section)) {
            setExpandedSections(expandedSections.filter(sec => sec !== section));
        } else {
            setExpandedSections([...expandedSections, section]);
        }
    };

    const isSectionExpanded = (section) => expandedSections.includes(section);

    const handlePageClick = (pageName) => {
        setActiveSection(pageName);
        localStorage.setItem("current_page", pageName);
    };

    const handleLogout  = () => {
        localStorage.setItem("token" , "");
        localStorage.setItem("user_type", 0);
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

                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("incomingOrders")}>
                                <div className={`first ${activeSection === "incoming/placed" || activeSection === "incoming/shipment" || activeSection === "incoming/delivered" ? 'selected' : ''}`}>
                                    <div className='icon'> <TbTruckDelivery size={27}/> </div>
                                    <div className="title">Incoming Orders</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("incomingOrders") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            
                            {isSectionExpanded("incomingOrders") && (
                                <div className="section-pages">
                                    <NavLink className="nav_link" to={'/partner/incoming/placed'}><div className={`page ${activeSection === "incoming/placed" ? 'selected' : ''}`} onClick={() => handlePageClick("incoming/placed")}>Placed</div></NavLink>
                                    <NavLink className="nav_link" to={'/partner/incoming/shipment'}><div className={`page ${activeSection === "incoming/shipment" ? 'selected' : ''}`} onClick={() => handlePageClick("incoming/shipment")}>Shipments</div></NavLink>
                                    <NavLink className="nav_link" to={'/partner/incoming/delivered'}><div className={`page ${activeSection === "incoming/delivered" ? 'selected' : ''}`} onClick={() => handlePageClick("incoming/delivered")}>Delivered</div></NavLink>
                                </div>
                            )}
                        </div>
                        
                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("outgoingOrders")}>
                                <div className={`first ${activeSection === "outgoing/placed" || activeSection === "outgoing/shipment" || activeSection === "outgoing/delivered" ? 'selected' : ''}`}>
                                    <div className='icon reflect'> <TbTruckDelivery size={27}/> </div>
                                    <div className="title">Outgoing Orders</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("outgoingOrders") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            
                            {isSectionExpanded("outgoingOrders") && (
                                <div className="section-pages">
                                    <NavLink className="nav_link" to={'/partner/outgoing/placed'}><div className={`page ${activeSection === "outgoing/placed" ? 'selected' : ''}`} onClick={() => handlePageClick("outgoing/placed")}>Placed</div></NavLink>
                                    <NavLink className="nav_link" to={'/partner/outgoing/shipment'}><div className={`page ${activeSection === "outgoing/shipment" ? 'selected' : ''}`} onClick={() => handlePageClick("outgoing/shipment")}>Shipments</div></NavLink>
                                    <NavLink className="nav_link" to={'/partner/outgoing/delivered'}><div className={`page ${activeSection === "outgoing/delivered" ? 'selected' : ''}`} onClick={() => handlePageClick("outgoing/delivered")}>Delivered</div></NavLink>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                
                <div className="lower-section">
                    <NavLink className="nav_link" to={'/partner/profile'}>
                        <div className={`title_section ${activeSection === "profile" ? 'selected' : ''}`} onClick={() => handlePageClick("profile")}>
                            <div className='icon'><BiSolidUser size={25} /></div>
                            <div className="title">Profile</div>
                        </div>
                    </NavLink>
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