import '../Partners/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavSide from '../../../components/Admin/NavSide';
import Header from '../../../components/Shared/Header';
import PartnerRow from '../../../components/Admin/PartnerRow';

const Partners = () => {

    const name = localStorage.getItem("user_name");

    const [Users , setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedPartners, setSearchedRequests] = useState([]);

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

    return (
        <div className='partners_page'> 
            <div className='left_side'>
                <NavSide/>
            </div>
            <div className='right_side'>
                <div className='head'>
                    <Header name={name} />
                </div>
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
                                    <th className='partners_th top_right'>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === "" ? (
                                    Users.map((user) => (
                                        <PartnerRow id={user.id} name={user.company_name} email={user.email} phone={user.phone} address={user.address}/>
                                    ))
                                ) : (
                                    searchedPartners.map((partner) => (
                                        <PartnerRow id={partner.id} name={partner.company_name} email={partner.email} phone={partner.phone} address={partner.address}/>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partners;