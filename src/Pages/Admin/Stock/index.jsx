import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockRow from '../../../components/Admin/AdminStockRow';

const Stock = () => {
    const [stocks , setStocks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedProduct, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
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

    useEffect(() => {
        setNoRecords(stocks.length === 0 && searchedProduct.length === 0);
    }, [stocks,searchInput, searchedProduct]);

    return (
        <div className='AdminStock_page'> 
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Stored Products</h1></div>
                        <div className='right_title'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='AdminStock_table'>
                            <thead className='AdminStock_thead'>
                                <tr className=''>
                                    <th className='AdminStock_th top_left'>Name</th>
                                    <th className='AdminStock_th'>Company Name</th>
                                    <th className='AdminStock_th'>Category</th>
                                    <th className='AdminStock_th'>Quantity</th>
                                    <th className='AdminStock_th top_right'></th>
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
                                            <StockRow id={stock.id} name={stock.product.name} company_name={stock.user.company_name} category={stock.product.category.category} quantity={stock.quantity}/>
                                        ))
                                    ) : (
                                        searchedProduct.map((stock) => (
                                            <StockRow id={stock.id} name={stock.product.name} company_name={stock.user.company_name} category={stock.product.category.category} quantity={stock.quantity}/>
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

export default Stock;