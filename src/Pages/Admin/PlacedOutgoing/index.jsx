import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OutgoingPlacedRow from '../../../components/Admin/OutgoingPlacedRow';

const PlacedOutgoing = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/placed`, {
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
        await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/placed/search/${searchInput}`, {
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

    return (
        <div className='Adminplacedoutgoing_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Placed Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='adminplacedoutgoing_table'>
                            <thead className='Adminplacedoutgoing_thead'>
                                <tr className=''>
                                    <th className='adminplacedoutgoing_th top_left'>Order ID</th>
                                    <th className='adminplacedoutgoing_th'>Company Name</th>
                                    <th className='adminplacedoutgoing_th'>Order Items</th>
                                    <th className='adminplacedoutgoing_th '>Placed at</th>
                                    <th className='adminplacedoutgoing_th top_right'>Total Price $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    orders.map((order) => (
                                        <OutgoingPlacedRow id={order.id} company_name={order.user.company_name} customer_name={order.customer.name} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <OutgoingPlacedRow id={order.id} company_name={order.user.company_name} customer_name={order.customer.name} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default PlacedOutgoing;