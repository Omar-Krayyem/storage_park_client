import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Graph from '../../../components/Worker/Graph'
const Dashboard = () => {
    const [ delivered , setDelivered] = useState(0);
    const [ IncOrder , setIncOrder] = useState(0);
    const [ OutOrder , setOutOrder] = useState(0);
    const [ data, setData] = useState([]);
    const token = localStorage.getItem("token");

    const getUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/worker/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data.dailyOrderCounts)
            setData(response.data.data.dailyOrderCounts)
            setDelivered(response.data.data.delivered)
            setIncOrder(response.data.data.shipmentInc)
            setOutOrder(response.data.data.shipmentOut)
        })
        .catch(error => {
            console.log(error);
        });    
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
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
                    <div className='graphs'>
                        <h2>Number of Delivered Orders</h2>
                        <Graph data={data}/>
                    </div>
                </div>
            </div>        
    );
}

export default Dashboard;