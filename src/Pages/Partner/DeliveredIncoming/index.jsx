import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomingDeliveredRow from '../../../components/Partner/IncomingDeliveredRow';

const DeliveredIncoming = () => {

    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/incoming/delivered`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data)
                setOrders(response.data.data);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/partner/incoming/delivered/search/${searchInput}`, {
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
        <div className='PartnerDeliveredIncoming_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Delivered Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='PartnerDeliveredIncoming_table'>
                            <thead className='PartnerDeliveredIncoming_thead'>
                                <tr className=''>
                                    <th className='PartnerDeliveredIncoming_th top_left'>Order ID</th>
                                    <th className='PartnerDeliveredIncoming_th'>Placed at</th>
                                    <th className='PartnerDeliveredIncoming_th '>Delivered at</th>
                                    <th className='PartnerDeliveredIncoming_th top_right'>Total Price $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    orders.map((order) => (
                                        <IncomingDeliveredRow id={order.id} delivered_at={order.delivered_at} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <IncomingDeliveredRow id={order.id} delivered_at={order.delivered_at} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default DeliveredIncoming;