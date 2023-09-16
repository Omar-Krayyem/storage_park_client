import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

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
            
            {/* <div className='graphs'>
                <div className='inc_order'>
                    <h2>Last Incoming Orders</h2>
                    <table>
                        <tbody>
                        {lastIncOrder.map((order) => (
                            <tr key={order.id} className='tr'>
                                <td>{order.id} - {order.user?.company_name}</td> 
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='pieChart'>
                    <h2>Last Outgoing Orders</h2>
                </div>
            </div> */}
        </div>
</div>
    );
}

export default Dashboard;