import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutgoingDeliveredRow from '../../../components/Partner/OutgoingDeliveredRow';

const DeliveredOutgoing = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/delivered`, {
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
        await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/delivered/search/${searchInput}`, {
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
        <div className='PartnerDeliveredOutgoing_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Delivered Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='PartnerDeliveredOutgoing_table'>
                            <thead className='PartnerDeliveredOutgoing_thead'>
                                <tr className=''>
                                    <th className='PartnerDeliveredOutgoing_th top_left'>Order ID</th>
                                    <th className='PartnerDeliveredOutgoing_th'>Placed at</th>
                                    <th className='PartnerDeliveredOutgoing_th '>Delivered at</th>
                                    <th className='PartnerDeliveredOutgoing_th top_right'>Total Price $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    orders.map((order) => (
                                        <OutgoingDeliveredRow id={order.id} delivered_at={order.delivered_at} customer_name={order.customer?.name} placed_at={order.placed_at}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <OutgoingDeliveredRow id={order.id} delivered_at={order.delivered_at} customer_name={order.customer?.name} placed_at={order.placed_at}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default DeliveredOutgoing;