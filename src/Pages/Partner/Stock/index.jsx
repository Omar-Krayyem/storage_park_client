import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StockRow from '../../../components/Partner/StockRow';

const Stock = () => {
    const [stocks , setStocks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/stock`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data)
                setStocks(response.data.data);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/partner/stock/search/${searchInput}`, {
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
        <div className='PartnerStock_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Stored Products</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='PartnerStock_table'>
                            <thead className='PartnerStock_thead'>
                                <tr className=''>
                                    <th className='PartnerStock_th top_left'>Name</th>
                                    <th className='PartnerStock_th'>Category</th>
                                    <th className='PartnerStock_th'>Price</th>
                                    <th className='PartnerStock_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    stocks.map((order) => (
                                        <StockRow id={order.id} name={order.product.name}  category={order.product.category.category} quantity={order.quantity}  price={order.product.price}/>
                                    ))
                                ) : (
                                    searchedPartners.map((order) => (
                                        <StockRow id={order.id} name={order.product.name}  category={order.product.category.category} quantity={order.quantity} price={order.product.price}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default Stock;