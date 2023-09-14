import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RequestRow from '../../../components/Admin/RequestRow';

const Requests = () => {
    const [Users , setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedRequests, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");

    const getUsers = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/request`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUsers(response.data.data);
            })            
            .catch(error => {
                console.log(error);
            })
    };

    const getSearched = async () => {
        await axios.get(`http://127.0.0.1:8000/api/admin/request/search/${searchInput}`, {
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
            getUsers();
        } else {
            getSearched();
        }
    }, [searchInput]);

    return (
        <div className='requests_page'> 
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Requests</h1></div>
                        <div className='search_bar'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='request_table'>
                            <thead className='request_thead'>
                                <tr className=''>
                                    <th className='request_th top_left'>Company Name</th>
                                    <th className='request_th'>Email</th>
                                    <th className='request_th '>Phone Number</th>
                                    <th className='request_th'>Address</th>
                                    <th className='request_th top_right'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    Users.map((user) => (
                                        <RequestRow id={user.id} name={user.company_name} email={user.email} phone={user.phone} address={user.address}/>
                                    ))
                                ) : (
                                    searchedRequests.map((request) => (
                                        <RequestRow id={request.id} name={request.company_name} email={request.email} phone={request.phone} address={request.address}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default Requests;