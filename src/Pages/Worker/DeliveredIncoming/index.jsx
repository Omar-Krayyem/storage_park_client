import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeliveredIncomingRow from '../../../components/Worker/DeliveredIncomingRow';

const DeliveredIncoming = () => {

    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedOrders, setSearchedOrders] = useState([]);
    const [noRecords, setNoRecords] = useState(false);

    const token = localStorage.getItem("token");

    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/worker/incoming/delivered`, {
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
        await axios.get(`http://127.0.0.1:8000/api/worker/incoming/delivered/search/${searchInput}`, {
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
            <div className='DeliveredIncoming_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Delivered Orders</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='DeliveredIncoming_table'>
                            <thead className='DeliveredIncoming_thead'>
                                <tr className=''>
                                    <th className='DeliveredIncoming_th top_left'>Order ID</th>
                                    <th className='DeliveredIncoming_th'>Company Name</th>
                                    <th className='DeliveredIncoming_th'>Placed at</th>
                                    <th className='DeliveredIncoming_th '>Delivered at</th>
                                    <th className='DeliveredIncoming_th top_right'></th>
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
                                            <DeliveredIncomingRow id={order.id} company_name={order.user.company_name} delivered_at={order.delivered_at} placed_at={order.placed_at}/>
                                        ))
                                    ) : (
                                        searchedOrders.map((order) => (
                                            <DeliveredIncomingRow id={order.id} company_name={order.user.company_name} delivered_at={order.delivered_at} placed_at={order.placed_at}/>
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

export default DeliveredIncoming;