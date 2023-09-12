import '../Workers/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddWorkerModal from '../../../components/Modals/AddWorkerModal';

import WorkerRow from '../../../components/Admin/WorkerRow';

const Workers = () => {
    const [Users , setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

    const token = localStorage.getItem("token");

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

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
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Workers</h1></div>
                        <div className='right_title'>
                            <button onClick={handleOpenModal}>Add Worker</button>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='worker_table'>
                            <thead className='worker_thead'>
                                <tr className=''>
                                    <th className='workers_th top_left'>Worker Name</th>
                                    <th className='workers_th'>Email</th>
                                    <th className='workers_th '>Phone Number</th>
                                    <th className='workers_th top_right'>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    Users.map((worker) => (
                                        <WorkerRow id={worker.id} name={`${worker.first_name} ${worker.last_name}`} email={worker.email} phone={worker.phone} address={worker.address}/>
                                    ))
                                ) : (
                                    searchedPartners.map((worker) => (
                                        <WorkerRow id={worker.id} name={`${worker.first_name} ${worker.last_name}`} email={worker.email} phone={worker.phone} address={worker.address}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
            </div>
            <AddWorkerModal
            handleCloseModal={handleCloseModal}
            openModal={openModal} 
            />
        </div>
    );
}

export default Workers;