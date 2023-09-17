import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutgoingDeliveredRow from '../../../components/Partner/OutgoingDeliveredRow';
import PartnerLayout from '../../../utils/PartnerLayout';

const DeliveredOutgoing = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, SetSearchedOrders] = useState([]);
    const [noRecords, setNoRecords] = useState(false);

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
            SetSearchedOrders(response.data.data);
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
        <PartnerLayout>
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
                                    <th className='PartnerDeliveredOutgoing_th'>Customer Name</th>
                                    <th className='PartnerDeliveredOutgoing_th '>Delivered at</th>
                                    <th className='PartnerDeliveredOutgoing_th'>Total Price $</th>
                                    <th className='PartnerDeliveredIncoming_th top_right'></th>
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
                                            <OutgoingDeliveredRow id={order.id} delivered_at={order.delivered_at} customer_name={order.customer?.name} placed_at={order.placed_at}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <OutgoingDeliveredRow id={order.id} delivered_at={order.delivered_at} customer_name={order.customer?.name} placed_at={order.placed_at}/>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PartnerLayout>
        
    );
}

export default DeliveredOutgoing;