import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OutgoingPlacedRow from '../../../components/Partner/OutgoingPlacedRow';

const PlacedOutgoing = () => {
    const [orders , setOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);
    const token = localStorage.getItem("token");

    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/placed`, {
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
        await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/placed/search/${searchInput}`, {
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
        <div className='PartnerplacedOutgoing_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Placed Orders</h1></div>
                        <div className='right_title'>
                        <Link to={'/partner/incoming/create'}><button>Place Order</button></Link>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='placedOutgoing_table'>
                            <thead className='placedOutgoing_thead'>
                                <tr className=''>
                                    <th className='placedOutgoing_th top_left'>Order ID</th>
                                    <th className='placedOutgoing_th'>Customer Name</th>
                                    <th className='placedOutgoing_th '>Placed at</th>
                                    <th className='placedOutgoing_th top_right'>Total Price $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    orders.map((order) => (
                                        <OutgoingPlacedRow id={order.id} customer_name={order.customer?.name} total_price={order.total_price} placed_at={order.placed_at}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <OutgoingPlacedRow id={order.id} customer_name={order.customer?.name} total_price={order.total_price} placed_at={order.placed_at}/>
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