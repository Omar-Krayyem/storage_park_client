import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import AddWorkerModal from '../../../components/models/AddWorkerModal';

import NavSide from '../../../components/Partner/NavSide';
import Header from '../../../components/Shared/Header';
import { Link } from 'react-router-dom';
// import WorkerRow from '../../../components/Admin/WorkerRow';

const PlacedIncoming = () => {

    const name = localStorage.getItem("user_name");

    const [Users , setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");


    const getUsers = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/worker`, {
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
        await axios.get(`http://127.0.0.1:8000/api/admin/worker/search/${searchInput}`, {
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
        <div className='workers_page'> 
            <div className='left_side'>
                <NavSide/>
            </div>
            <div className='right_side'>
                <div className='head'>
                    <Header name={name} />
                </div>
                <div className='body'>
                    <div className='title'>
                    <div className='page_title'><h1>Placed Orders</h1></div>
                        <div className='right_title'>
                        <Link to={'/partner/incoming/create'}><button>Place Order</button></Link>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='worker_table'>
                            <thead className='worker_thead'>
                                <tr className=''>
                                    <th className='workers_th top_left'>Order ID</th>
                                    <th className='workers_th'>Number of Order Items</th>
                                    <th className='workers_th '>Placed at</th>
                                    <th className='workers_th top_right'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {searchInput === "" ? (
                                    Users.map((worker) => (
                                        <WorkerRow id={worker.id} name={`${worker.first_name} ${worker.last_name}`} email={worker.email} phone={worker.phone} address={worker.address}/>
                                    ))
                                ) : (
                                    searchedPartners.map((worker) => (
                                        <WorkerRow id={worker.id} name={`${worker.first_name} ${worker.last_name}`} email={worker.email} phone={worker.phone} address={worker.address}/>
                                    ))
                                )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlacedIncoming;