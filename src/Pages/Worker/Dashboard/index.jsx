import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import WorkerLayout from '../../../utils/WorkerLayout';

const Dashboard = () => {
    const [ delivered , setDelivered] = useState(0);
    const [ IncOrder , setIncOrder] = useState(0);
    const [ OutOrder , setOutOrder] = useState(0);

    const [ lastIncOrder , setLastIncOrder] = useState([]);
    const [ lastOutOrder , setLastOutOrder] = useState([]);
    const token = localStorage.getItem("token");

    const getUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/worker/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data)
            setDelivered(response.data.data.delivered)
            setIncOrder(response.data.data.shipmentInc)
            setOutOrder(response.data.data.shipmentOut)
            setLastIncOrder(response.data.data.lastShipmentInc)
            setLastOutOrder(response.data.data.lastShipmentOut)
        })
        .catch(error => {
            console.log(error);
        });    
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <WorkerLayout>
            <div className='WorkerDashboard_page'> 
                <div className='body'>
                    <div className='title'><h1>Dashboard</h1></div>
                    <div className='records'>
                        <div className='record'>
                            <span>{delivered}</span>Delivered Orders
                        </div>
                        <div className='record'>
                            <span>{IncOrder}</span>Incoming Orders
                        </div>
                        <div className='record'>
                            <span>{OutOrder}</span>Outgoing Orders
                        </div>
                    </div>
                </div>
            </div>
        </WorkerLayout>
        
    );
}

export default Dashboard;