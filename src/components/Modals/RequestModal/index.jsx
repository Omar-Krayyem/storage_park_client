import './style.css';
import Modal from 'react-modal';
import React, { useState, useEffect, useRef }from "react";
import axios from 'axios';
import emailjs from '@emailjs/browser';
import {AiOutlineClose} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const RequestModal = ({ openModal, handleCloseModal, user_id }) => {
    const navigate = useNavigate();
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [company_name, setName] = useState("");

    const form = useRef();

    const token = localStorage.getItem("token");

    const getUser = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/request/${user_id}`, {
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

    const deleteRequest = (e) => {
        e.preventDefault();

        axios.delete(`http://127.0.0.1:8000/api/admin/request/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            // handleCloseModal();
            window.location.reload();
            // navigate('/admin/requests');
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getUser();
    }, [user_id]);



    function generateRandomPassword(length) {
        let password = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        return password;
    }

    const password = generateRandomPassword(12);

    const sendEmail = () => {
        const emailParams = {
            company_name: company_name,
            email: email,
            password: password,
        };

        emailjs.send('service_envn8ta', 'template_597msxo', emailParams, 'k2mdBDZm5xIUKujvn')
          .then((response) => {
            console.log('Email sent:', response);
          })
          .catch((error) => {
            console.error('Email error:', error);
          });
    }

    const acceptRequest = (e) => {
        e.preventDefault();

        const postData = {user_id, password}

        axios.post('http://127.0.0.1:8000/api/admin/request', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response)
                sendEmail();
                navigate('/admin/partners');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <Modal isOpen={openModal} className="requestModal"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}>
                <div className='body'>
                <div className='title'>
                    <h1>Request</h1>
                    <AiOutlineClose 
                    onClick={async (e) => {
                        e.preventDefault();
                        handleCloseModal();
                    }}
                    className='icon'
                    size={25}/>
                </div>
                <div className="form_body">
                        <form  className='requestForm'>
                            <div className='nameSection'>
                                <div className="halftext_feild">
                                    <label>First Name</label>
                                    <input 
                                    className='half'
                                    type="text" 
                                    disabled                                    
                                    value={first_name}
                                    ></input>
                                </div>
                                <div className="halftext_feild end">
                                    <label>Last Name</label>
                                    <input 
                                    className='half'
                                    type="text"
                                    disabled
                                    value={last_name}
                                    ></input> 
                                </div>
                            </div>
                            <div className="text_feild">
                                <label>Company Name</label>
                                <input 
                                className='full'
                                type="text" 
                                disabled
                                value={company_name}
                                name='company_name'
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Work Email</label>
                                <input 
                                className='full'
                                type="email" 
                                name='email'
                                disabled
                                value={email}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Phone</label>
                                <input 
                                className='full'
                                type="text" 
                                disabled
                                value={phone}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Address</label>
                                <input 
                                className='full'
                                type="text"
                                disabled
                                value={address}
                                ></input> 
                            </div>
                            <div>
                                <input
                                value={password}
                                name='password'
                                hidden
                                ></input>
                            </div>
                            <div className='btnSection'>
                                <button className='btn reject' onClick={deleteRequest}>Reject</button>
                                <button className='btn' onClick={acceptRequest}>Accept</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            
        </div>
    );
}

export default RequestModal;