import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StockRow from '../../../components/Admin/StockRow';

const PlacedIncoming = () => {
    const [stocks , setStocks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/stock`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                // console.log(response.data)
                setStocks(response.data.data);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/admin/stock/search/${searchInput}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // console.log(response.data.data)
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
        <div className='AdminShipmentincoming_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Stored Products</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='adminShipmentIncoming_table'>
                            <thead className='AdminShipmetnIncoming_thead'>
                                <tr className=''>
                                    <th className='adminShipmentIncoming_th top_left'>Name</th>
                                    <th className='adminShipmentIncoming_th'>Company Name</th>
                                    <th className='adminShipmentIncoming_th'>Category</th>
                                    <th className='adminShipmentIncoming_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    stocks.map((order) => (
                                        <StockRow id={order.id} name={order.product.name} company_name={order.user.company_name} category={order.product.category.category} quantity={order.quantity}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <StockRow id={order.id} name={order.product.name} company_name={order.user.company_name} category={order.product.category.category} quantity={order.quantity}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default PlacedIncoming;