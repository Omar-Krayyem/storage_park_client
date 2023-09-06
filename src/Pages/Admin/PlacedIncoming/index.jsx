import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavSide from '../../../components/Admin/NavSide';
import Header from '../../../components/Shared/Header';
import { Link } from 'react-router-dom';
import IncomingPlacedRow from '../../../components/Admin/IncomingPlacedRow';

const PlacedIncoming = () => {

    const name = localStorage.getItem("user_name");

    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/incoming/placed`, {
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
        await axios.get(`http://127.0.0.1:8000/api/partner/incoming/search/${searchInput}`, {
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
        <div className='Adminplacedincoming_page'> 
            <div className='left_side'>
                <NavSide/>
            </div>
            <div className='right_side'>
                <div className='head'>
                    <Header name={name} />
                </div>
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Placed Orders</h1></div>
                        <div className='right_title'>
                        <Link to={'/partner/incoming/create'}><button>Place Order</button></Link>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='adminplacedincoming_table'>
                            <thead className='Adminplacedincoming_thead'>
                                <tr className=''>
                                    <th className='adminplacedincoming_th top_left'>Order ID</th>
                                    <th className='adminplacedincoming_th'>Company Name</th>
                                    <th className='adminplacedincoming_th'>Number of Order Items</th>
                                    <th className='adminplacedincoming_th '>Placed at</th>
                                    <th className='adminplacedincoming_th top_right'>Total Price $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    orders.map((order) => (
                                        <IncomingPlacedRow id={order.id} company_name={order.user.company_name} item_count={order.item_count} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <IncomingPlacedRow id={order.id} item_count={order.item_count} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlacedIncoming;