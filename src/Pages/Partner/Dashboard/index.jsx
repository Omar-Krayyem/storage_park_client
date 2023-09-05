import './style.css';
import React from "react";

import NavSide from '../../../components/Partner/NavSide';
import Header from '../../../components/Shared/Header';

const Dashboard = () => {
    const name = localStorage.getItem("user_name");

    return (
        <div className='dashboard_page'> 
            <div className='left_side'>
                <NavSide/>
            </div>
            <div className='right_side'>
                <div className='head'>
                    <Header name={name} />
                </div>
                <div className='body'>
                    omar
                </div>
            </div>
        </div>
    );
}

export default Dashboard;