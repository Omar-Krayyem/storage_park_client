import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PartnerRow from '../../../components/Admin/PartnerRow';

const Partners = () => {
    const [Users , setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    const token = localStorage.getItem("token");

    const getUsers = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/partner`, {
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
        await axios.get(`http://127.0.0.1:8000/api/admin/partner/search/${searchInput}`, {
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

    useEffect(() => {
        setNoRecords(Users.length === 0 && searchedPartners.length === 0);
    }, [Users,searchInput, searchedPartners]);

    return (
            <div className='partners_page'> 
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Partners</h1></div>
                        <div className='search_bar'>
                            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='table'>
                        <table className='partner_table'>
                            <thead className='partner_thead'>
                                <tr className=''>
                                    <th className='partners_th top_left'>Company Name</th>
                                    <th className='partners_th'>Email</th>
                                    <th className='partners_th '>Phone Number</th>
                                    <th className='partners_th'>Address</th>
                                    <th className='partners_th top_right'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {noRecords ? (
                                    <tr>
                                        <td colSpan="5">No records found.</td>
                                    </tr>
                                ) : (
                                    searchInput === "" ? (
                                        Users.map((user) => (
                                            <PartnerRow id={user.id} name={user.company_name} email={user.email} phone={user.phone} address={user.address} />
                                        ))
                                    ) : (
                                        searchedPartners.map((partner) => (
                                            <PartnerRow id={partner.id} name={partner.company_name} email={partner.email} phone={partner.phone} address={partner.address} />
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

export default Partners;