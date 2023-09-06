import '../NavSide/style.css';
import React,  { useState } from "react";
import logo from '../../../images/logo_d.png';
import { FaUsers, FaWarehouse } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import {TbTruckDelivery} from "react-icons/tb";
import { FiLogOut } from 'react-icons/fi';
import { BiSolidUser } from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';

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

    return (
        <div>
            <div className="sidebar">
                <div className='upper_section'>
                    <div className="logo"><img src={logo} alt='logo'></img></div>

                    <div className="sections ">
                        <NavLink to={'/admin'}>
                            <div className={`title_section ${activeSection === "dashboard" ? 'selected' : ''}`} onClick={() => handlePageClick("dashboard")}>
                                <div className='icon'><MdDashboard size={25} /></div>
                                <div className="title">Dashboard</div>
                            </div>
                        </NavLink>

                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("users")}>
                                <div className='first'>
                                    <div className='icon'><FaUsers size={25}/></div>
                                    <div className="title">Users</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("users") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            {isSectionExpanded("users") && (
                                <div className="section-pages">
                                    <NavLink to={'/admin/requests'}><div className={`page ${activeSection === "requests" ? 'selected' : ''}`} onClick={() => handlePageClick("requests")}>Requests</div></NavLink>
                                    <NavLink to={'/admin/partners'}><div className={`page ${activeSection === "partners" ? 'selected' : ''}`} onClick={() => handlePageClick("partners")}>Partners</div></NavLink>
                                    <NavLink to={'/admin/workers'}><div className={`page ${activeSection === "workers" ? 'selected' : ''}`} onClick={() => handlePageClick("workers")}>Workers</div></NavLink>
                                </div>
                            )}
                        </div>

                        <div className="title_section">
                            <div className='icon'><FaWarehouse size={25}/> </div>
                            <div className="title">Stored Products</div>
                        </div>

                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("incomingOrders")}>
                                <div className='first'>
                                    <div className='icon'> <TbTruckDelivery size={27}/> </div>
                                    <div className="title">Incoming Orders</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("incomingOrders") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            
                            {isSectionExpanded("incomingOrders") && (
                                <div className="section-pages">
                                    <NavLink to={'/admin/incoming/placed'}><div className={`page ${activeSection === "placed" ? 'selected' : ''}`} onClick={() => handlePageClick("Placed")}>Placed</div></NavLink>
                                    <NavLink to={'/admin/incoming/shipment'}><div className={`page ${activeSection === "shipment" ? 'selected' : ''}`} onClick={() => handlePageClick("shipment")}>Shipments</div></NavLink>
                                    <div className="page">Delivered</div>
                                </div>
                            )}
                        </div>
                        
                        <div className="section">
                            <div className='title_section' onClick={() => toggleSection("outgoingOrders")}>
                                <div className='first'>
                                    <div className='icon reflect'><TbTruckDelivery  size={27}/> </div>
                                    <div className="title">Outgoing Orders</div>
                                </div>
                                <div className={`arrow ${isSectionExpanded("outgoingOrders") ? 'expanded' : ''}`}><RiArrowDownSLine/></div>
                            </div>
                            
                            {isSectionExpanded("outgoingOrders") && (
                                <div className="section-pages">
                                    <div className="page">Placed</div>
                                    <div className="page">Shipments</div>
                                    <div className="page">Delivered</div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                
                <div className="lower-section">
                    <div className={`title_section ${activeSection === "profile" ? 'selected' : ''}`} onClick={() => handlePageClick("profile")}>
                        <div className='icon'><BiSolidUser size={25}/></div>
                        <div className="title">Profile</div>
                    </div>
                    <div className="title_section">
                        <div className='icon'><FiLogOut  size={25}/></div>
                        <div className="title">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavSide;