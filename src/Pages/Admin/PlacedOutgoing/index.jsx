import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OutgoingPlacedRow from '../../../components/Admin/OutgoingPlacedRow';

const PlacedOutgoing = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/outgoing`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setOrders(response.data.data);
                setLoading(false);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/search/${searchInput}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
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
            <div className='Adminplacedoutgoing_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Outgoing Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    {loading ? (
                                <div className="loading-animation">
                                    <div className="point"></div>
                                    <div className="point"></div>
                                    <div className="point"></div>
                              </div>

                    ) : (
                    <div className='table'>
                        <table className='adminplacedoutgoing_table'>
                            <thead className='Adminplacedoutgoing_thead'>
                                <tr className=''>
                                    <th className='adminplacedoutgoing_th top_left'>Order ID</th>
                                    <th className='adminplacedoutgoing_th'>Company Name</th>
                                    <th className='adminplacedoutgoing_th'>Customer Name</th>
                                    <th className='adminplacedoutgoing_th '>Status</th>
                                    <th className='adminplacedoutgoing_th top_right'></th>
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
                                            <OutgoingPlacedRow id={order.id} company_name={order.user.company_name} customer_name={order.customer.name} status={order.status}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <OutgoingPlacedRow id={order.id} company_name={order.user.company_name} customer_name={order.customer.name} status={order.status}/>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>)}
                </div>
            </div>        
    );
}

export default PlacedOutgoing;