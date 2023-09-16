import './style.css';
import React from "react";

const Dashboard = () => {
    const name = localStorage.getItem("user_name");

    return (
        <div className='dashboard_page'> 
                <div className='body'>
                    omar
                </div>
        </div>
    );
}

export default Dashboard;