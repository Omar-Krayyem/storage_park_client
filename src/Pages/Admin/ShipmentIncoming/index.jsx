import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IncomingShipmentRow from '../../../components/Admin/IncomingShipmentRow';

const PlacedIncoming = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/incoming/shipment`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.data)
                setOrders(response.data.data);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/admin/incoming/shipment/search/${searchInput}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data)
            setSearchedRequests(response.data.data);
        })   
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (searchInput === "") {
            getOrders();
        } else {
            getSearched();
        }
    }, [searchInput]);

    return (
        <div className='AdminShipmentincoming_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Shipment Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='adminShipmentIncoming_table'>
                            <thead className='AdminShipmetnIncoming_thead'>
                                <tr className=''>
                                    <th className='adminShipmentIncoming_th top_left'>Order ID</th>
                                    <th className='adminShipmentIncoming_th'>Company Name</th>
                                    <th className='adminShipmentIncoming_th'>Worker Name</th>
                                    <th className='adminShipmentIncoming_th '>Placed at</th>
                                    <th className='adminShipmentIncoming_th top_right'>Total Price $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    orders.map((order) => (
                                        <IncomingShipmentRow id={order.id} company_name={order.user.company_name} worker_name={`${order.worker.first_name} ${order.worker.last_name}`} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <IncomingShipmentRow id={order.id} company_name={order.user.company_name} worker_name={`${order.worker.first_name} ${order.worker.last_name}`} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default PlacedIncoming;