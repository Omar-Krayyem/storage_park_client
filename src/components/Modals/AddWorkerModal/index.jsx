import '../PartnerModel/style.css';
import Modal from 'react-modal';
import React, { useState }from "react";
import axios from 'axios';

const AddWorkerModal = ({ openModal, handleCloseModal }) => {
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")


    const token = localStorage.getItem("token");

    const AddWorker = (e) => {
        e.preventDefault();

        const postData = {first_name, last_name, email, password, phone, address};
        console.log(postData)
    
        axios.post('http://127.0.0.1:8000/api/admin/worker/store', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            // window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });


    }


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
                            <div className='btnSection'>
                                <button className='btn' onClick={AddWorker}>Add</button>
                                <button className='btn' onClick={async(e) => {e.preventDefault(); handleCloseModal();}}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AddWorkerModal;