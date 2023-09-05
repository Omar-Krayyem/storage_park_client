import './style.css';
import Modal from 'react-modal';
import React, { useState, useEffect }from "react";
import axios from 'axios';

const GetWorkerModal = ({ openModal, handleCloseModal, user_id }) => {
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");


    const token = localStorage.getItem("token");

    const getUser = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/worker/${user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.data)
                setFName(response.data.data.first_name)
                setLName(response.data.data.last_name)
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

        axios.delete(`http://127.0.0.1:8000/api/admin/worker/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            handleCloseModal();
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    }

    const updateUser = (e) => {
        e.preventDefault();

        const postData = {user_id, first_name, last_name, email, phone, address};
        console.log(postData)
    
        axios.post('http://127.0.0.1:8000/api/admin/worker/update', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            // window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });


    }

    useEffect(() => {
        getUser();
    }, [user_id]);


    return (
        <div>
            <Modal isOpen={openModal} className="partnerModal">
                <div className='body'>
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
                            <div className='btnSection'>
                                <button className='btn' onClick={updateUser}>Update</button>
                                <button className='btn' onClick={deleteUser}>Delete</button>
                            </div>
                            <button
                                type="submit"
                                className="close btn"
                                value="Close"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    handleCloseModal();
                                }}
                            >Close</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default GetWorkerModal;