import './style.css';
import Modal from 'react-modal';
import React, { useState, useEffect }from "react";
import axios from 'axios';
import {AiOutlineClose} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const PartnerModal = ({ openModal, handleCloseModal, user_id }) => {
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [company_name, setName] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const getUser = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/partner/${user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setFName(response.data.data.first_name)
                setLName(response.data.data.last_name)
                setName(response.data.data.company_name)
                setEmail(response.data.data.email)
                setPhone(response.data.data.phone)
                setAddress(response.data.data.address)
            })
            .catch(error => {
                console.log(error);
            });    
    };

    const deleteUser = (e) => {
        e.preventDefault();

        axios.delete(`http://127.0.0.1:8000/api/admin/partner/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            // handleCloseModal();
            window.location.reload();
            // navigate('/admin/partners');
        })
        .catch(error => {
            console.log(error);
        });
    }

    const updateUser = (e) => {
        e.preventDefault();

        if (!/^\d+$/.test(phone)) {
            setError("Phone number should contain only numbers");
            setTimeout(() => setError(""), 2000);
            return;
        }

        const postData = {user_id, first_name, last_name, email, phone, company_name, address};
    
        axios.post('http://127.0.0.1:8000/api/admin/partner/', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            setMsg("Updated Successfullyy")
            setTimeout(() => setMsg(""), 2000);
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.data) {
                setError(error.response.data.data);
            } else {
                setError("An error occurred");
            }
            setTimeout(() => setError(""), 2000);
        });
    }

    useEffect(() => {
        getUser();
    }, [user_id]);


    return (
        <div>
            <Modal isOpen={openModal} className="partnerModal"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}
              >
                <div className='body'>
                <div className='title'>
                    <h1>Partner</h1>
                    <AiOutlineClose 
                    onClick={async (e) => {
                        e.preventDefault();
                        handleCloseModal();
                    }}
                    className='icon'
                    size={25}/>
                </div>
                <div className="form_body">
                        <form className='partnerForm'>
                            <div className='nameSection'>
                                <div className="halftext_feild">
                                    <label>First Name</label>
                                    <input 
                                    className='half'
                                    type="text" 
                                    required
                                    value={first_name}
                                    onChange={(e) => setFName(e.target.value)}
                                    ></input>
                                </div>
                                <div className="halftext_feild ">
                                    <label>Last Name</label>
                                    <input 
                                    className='half'
                                    type="text"
                                    required
                                    value={last_name}
                                    onChange={(e) => setLName(e.target.value)}
                                    ></input> 
                                </div>
                            </div>
                            <div className="text_feild">
                                <label>Company Name</label>
                                <input 
                                className='full'
                                type="text" 
                                required
                                value={company_name}
                                onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Work Email</label>
                                <input 
                                className='full'
                                type="email" 
                                name='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Phone</label>
                                <input 
                                className='full'
                                type="text" 
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Address</label>
                                <input 
                                className='full'
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                ></input> 
                            </div>
                            <div className='error'>{error}</div>
                            <div className='msg'>{msg}</div>
                            <div className='btnSection'>
                                <button className='btn' onClick={updateUser}>Update</button>
                                <button className='btn' onClick={deleteUser}>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PartnerModal;