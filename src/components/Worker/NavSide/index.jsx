import './style.css';
import React,  { useState } from "react";
import logo from '../../../images/logo_d.png';
import { MdDashboard } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import {TbTruckDelivery} from "react-icons/tb";
import { FiLogOut } from 'react-icons/fi';
import { BiSolidUser } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const NavSide = () => {

    const [expandedSections, setExpandedSections] = useState([]);
    const [activeSection, setActiveSection] = useState("dashboard");

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
    };

    const handleLogout  = () => {
        localStorage.setItem("token" , "");
        localStorage.setItem("user_type", 0);
        window.location.href = '/';
    }

    return (
        <div>
            <div className="sidebar">
                <div className='upper_section'>
                    <div className="logo"><img src={logo} alt='logo'></img></div>

                    <div className="sections ">
                        <NavLink className="nav_link" to={'/worker'}>
                            <div className={`title_section ${activeSection === "dashboard" ? 'selected' : ''}`} onClick={() => handlePageClick("dashboard")}>
                                <div className='icon'><MdDashboard size={25} /></div>
                                <div className="title">Dashboard</div>
                            </div>
                        </NavLink>

                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("incomingOrders")}>
                                <div className={`first ${activeSection === "Incshipment" || activeSection === "Incdelivered" ? 'selected' : ''}`}>
                                    <div className='icon'> <TbTruckDelivery size={27}/> </div>
                                    <div className="title">Incoming Orders</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("incomingOrders") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            
                            {isSectionExpanded("incomingOrders") && (
                                <div className="section-pages">
                                    <NavLink className="nav_link" to={'/worker/incoming/shipment'}><div className={`page ${activeSection === "Incshipment" ? 'selected' : ''}`} onClick={() => handlePageClick("Incshipment")}>Shipments</div></NavLink>
                                    <NavLink className="nav_link" to={'/worker/incoming/delivered'}><div className={`page ${activeSection === "Incdelivered" ? 'selected' : ''}`} onClick={() => handlePageClick("Incdelivered")}>Delivered</div></NavLink>
                                </div>
                            )}
                        </div>


                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("outgoingOrders")}>
                                <div className={`first ${activeSection === "Outshipment" || activeSection === "Outdelivered" ? 'selected' : ''}`}>
                                    <div className='icon reflect'> <TbTruckDelivery size={27}/> </div>
                                    <div className="title">Outgoing Orders</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("outgoingOrders") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            
                            {isSectionExpanded("outgoingOrders") && (
                                <div className="section-pages">
                                    <NavLink className="nav_link" to={'/worker/outgoing/shipment'}><div className={`page ${activeSection === "Outshipment" ? 'selected' : ''}`} onClick={() => handlePageClick("Outshipment")}>Shipments</div></NavLink>
                                    <NavLink className="nav_link" to={'/worker/outgoing/delivered'}><div className={`page ${activeSection === "Outdelivered" ? 'selected' : ''}`} onClick={() => handlePageClick("Outdelivered")}>Delivered</div></NavLink>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                
                <div className="lower-section">
                    <NavLink className="nav_link" to={'/worker/profile'}>
                        <div className={`title_section ${activeSection === "profile" ? 'selected' : ''}`} onClick={() => handlePageClick("profile")}>
                            <div className='icon'><BiSolidUser size={25} /></div>
                            <div className="title">Profile</div>
                        </div>
                    </NavLink>
                    <div className="title_section"  onClick={handleLogout}>
                        <div className='icon'><FiLogOut  size={25}/></div>
                        <div className="title">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavSide;