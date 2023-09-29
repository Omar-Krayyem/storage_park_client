import './style.css';
import Modal from 'react-modal';
import React, { useState }from "react";
import axios from 'axios';
import {AiOutlineClose} from 'react-icons/ai'

const AddWorkerModal = ({ openModal, handleCloseModal }) => {
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const AddWorker = (e) => {
        e.preventDefault();

        if (!/^\d+$/.test(phone)) {
            setError("Phone number should contain only numbers");
            setTimeout(() => setError(""), 2000);
            return;
        }


        const postData = {first_name, last_name, email, password, phone, address};
        console.log(postData)
    
        axios.post('http://127.0.0.1:8000/api/admin/worker/store', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            navigate('/admin/workers');
            // window.location.reload();
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


    return (
        <div>
            <Modal  isOpen={openModal} className="AddWorkerModal"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}
              >
                <div className='body'>
                <div className='title'>
                    <h1>Add Worker</h1>
                    <AiOutlineClose 
                    onClick={async (e) => {
                        e.preventDefault();
                        handleCloseModal();
                    }}
                    className='icon'
                    size={25}/>
                </div>
                <div className="form_body">
                        <form className='AddWorkerForm'>
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
                            <div className="text_feild">
                                <label>Password</label>
                                <input 
                                className='full'
                                type="text"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                ></input> 
                            </div>
                            <div className='error'>{error}</div>
                            <button className='addbtn' onClick={AddWorker}>Add</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AddWorkerModal;