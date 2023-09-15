import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ShipmentPlacedRow from '../../../components/Partner/IncomingShipmentRow';

const ShipmentIncoming = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/incoming/shipment`, {
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
        await axios.get(`http://127.0.0.1:8000/api/partner/incoming/shipment/search/${searchInput}`, {
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
        <div className='PartnerShipmentincoming_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Shipment Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='ShipmentIncoming_table'>
                            <thead className='ShipmentIncoming_thead'>
                                <tr className=''>
                                    <th className='ShipmentIncoming_th top_left'>Order ID</th>
                                    <th className='ShipmentIncoming_th'>Order Items</th>
                                    <th className='ShipmentIncoming_th'>Placed at</th>
                                    <th className='ShipmentIncoming_th'>Total Price $</th>
                                    <th className='ShipmentIncoming_th top_right'></th>
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
                                            <ShipmentPlacedRow id={order.id} item_count={order.item_count} total_price={order.total_price} placed_at={order.placed_at}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <ShipmentPlacedRow id={order.id} item_count={order.item_count} total_price={order.total_price} placed_at={order.placed_at}/>
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

export default ShipmentIncoming;