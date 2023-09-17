import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipmentOutgoingRow from '../../../components/Worker/ShipmentOutgoingRow';
import WorkerLayout from '../../../utils/WorkerLayout';

const ShipmentIncoming = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, setSearchedOrders] = useState([]);
    const [noRecords, setNoRecords] = useState(false);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/worker/outgoing/shipment`, {
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
        await axios.get(`http://127.0.0.1:8000/api/worker/outgoing/shipment/search/${searchInput}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setSearchedOrders(response.data.data);
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
        <WorkerLayout>
            <div className='ShipmentOutgoing_page'>
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Shipment Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='ShipmentOutgoing_table'>
                            <thead className='ShipmentOutgoing_thead'>
                                <tr className=''>
                                    <th className='ShipmentOutgoing_th top_left'>Order ID</th>
                                    <th className='ShipmentOutgoing_th'>Company Name</th>
                                    <th className='ShipmentOutgoing_th'>Customer Name</th>
                                    <th className='ShipmentOutgoing_th '>Placed at</th>
                                    <th className='ShipmentOutgoing_th top_right'></th>
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
                                            <ShipmentOutgoingRow id={order.id} company_name={order.user.company_name} customer_name={order.customer?.name} placed_at={order.placed_at}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <ShipmentOutgoingRow id={order.id} company_name={order.user.company_name} customer_name={order.customer?.name} placed_at={order.placed_at}/>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </WorkerLayout>
        
    );
}

export default ShipmentIncoming;