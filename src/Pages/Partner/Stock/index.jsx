import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StockRow from '../../../components/Partner/StockRow';

const Stock = () => {
    const [stocks , setStocks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedStocks, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");


    const getOrders = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/stock`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setStocks(response.data.data);
                setLoading(false);
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
        setNoRecords(stocks.length === 0 && searchedStocks.length === 0);
    }, [stocks,searchInput, searchedStocks]);

    return (
            <div className='PartnerStock_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Stored Products</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    {loading ? (
                                <div className="loading-animation">
                                    <div className="point"></div>
                                    <div className="point"></div>
                                    <div className="point"></div>
                              </div>

                    ) : (
                    <div className='table'>
                        <table className='PartnerStock_table'>
                            <thead className='PartnerStock_thead'>
                                <tr className=''>
                                    <th className='PartnerStock_th top_left'>Name</th>
                                    <th className='PartnerStock_th'>Category</th>
                                    <th className='PartnerStock_th'>Price</th>
                                    <th className='PartnerStock_th'>Quantity</th>
                                    <th className='PartnerStock_th top_right'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {noRecords ? (
                                    <tr>
                                        <td colSpan="5">No records found.</td>
                                    </tr>
                                ) : (
                                    searchInput === "" ? (
                                        stocks.map((stock) => (
                                            <StockRow id={stock.id} name={stock.product.name}  category={stock.product.category.category} quantity={stock.quantity}  price={stock.product.price}/>
                                        ))
                                    ) : (
                                        searchedStocks.map((stock) => (
                                            <StockRow id={stock.id} name={stock.product.name}  category={stock.product.category.category} quantity={stock.quantity}  price={stock.product.price}/>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>)}
                </div>
            </div>        
    );
}

export default Stock;