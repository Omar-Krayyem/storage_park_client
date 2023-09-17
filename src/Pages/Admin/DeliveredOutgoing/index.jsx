import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OutgoingDeliveredRow from '../../../components/Admin/OutgoingDeliveredRow';
import AdminLayout from '../../../utils/AdminLayout';

const DeliveredOutgoing = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/delivered`, {
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
        await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/delivered/search/${searchInput}`, {
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

    useEffect(() => {
        setNoRecords(orders.length === 0 && searchedOrders.length === 0);
    }, [orders,searchInput, searchedOrders]);

    return (
        <AdminLayout>
            <div className='AdminDeliveredOutgoing_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Delivered Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='AdminDeliveredOutgoing_table'>
                            <thead className='AdminDeliveredOutgoing_thead'>
                                <tr className=''>
                                    <th className='AdminDeliveredOutgoing_th top_left'>Order ID</th>
                                    <th className='AdminDeliveredOutgoing_th'>Company Name</th>
                                    <th className='AdminDeliveredOutgoing_th'>Customer Name</th>
                                    <th className='AdminDeliveredOutgoing_th '>Worker Name</th>
                                    <th className='AdminDeliveredOutgoing_th'>Delivered At</th>
                                    <th className='AdminDeliveredOutgoing_th top_right'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {noRecords ? (
                                    <tr>
                                        <td colSpan="5">No records found.</td>
                                    </tr>
                                ) : (
                                    searchInput === "" ? (
                                        orders.map((order) => (
                                            <OutgoingDeliveredRow id={order.id} company_name={order.user.company_name} worker_name={`${order.worker.first_name} ${order.worker.last_name}`} customer_name={order.customer.name} delivered_at={order.delivered_at}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <OutgoingDeliveredRow id={order.id} company_name={order.user.company_name} worker_name={`${order.worker.first_name} ${order.worker.last_name}`} customer_name={order.customer.name} delivered_at={order.delivered_at}/>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default DeliveredOutgoing;