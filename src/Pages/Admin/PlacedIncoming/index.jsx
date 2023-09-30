import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IncomingPlacedRow from '../../../components/Admin/IncomingPlacedRow';

const PlacedIncoming = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/incoming/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setOrders(response.data.data);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/admin/incoming/search/${searchInput}`, {
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
            <div className='Adminplacedincoming_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Incoming Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='adminplacedincoming_table'>
                            <thead className='Adminplacedincoming_thead'>
                                <tr className=''>
                                    <th className='adminplacedincoming_th top_left'>Order ID</th>
                                    <th className='adminplacedincoming_th'>Company Name</th>
                                    <th className='adminplacedincoming_th '>Status</th>
                                    <th className='adminplacedincoming_th'>Total Price $</th>
                                    <th className='adminplacedincoming_th top_right'></th>
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
                                            <IncomingPlacedRow id={order.id} company_name={order.user.company_name} total_price={order.total_price} status={order.status}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <IncomingPlacedRow id={order.id} company_name={order.user.company_name} total_price={order.status} status={order.status}/>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}

export default PlacedIncoming;