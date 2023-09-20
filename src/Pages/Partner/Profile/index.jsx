import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PasswordModal from '../../../components/Modals/PasswordModal';

const Profile = () => {
    const [user_id, setId] = useState(0);
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [company_name, setCompany_name] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const token = localStorage.getItem("token");

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const getUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/partner/profile/get`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data)
            setId(response.data.data.id)
            setFName(response.data.data.first_name)
            setLName(response.data.data.last_name)
            setEmail(response.data.data.email)
            setPhone(response.data.data.phone)
            setAddress(response.data.data.address)
            setCompany_name(response.data.data.company_name)
        })
        .catch(error => {
            console.log(error);
        });    
    };

    const updateInfo = (e) => {
        e.preventDefault();

        if (!/^\d+$/.test(phone)) {
            setErrorMessage("Phone number should contain only numbers");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        const postData = {user_id, first_name, last_name, email, phone, address, company_name};

        axios.post('http://127.0.0.1:8000/api/partner/profile', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            localStorage.setItem("user_name", `${first_name} ${last_name}`)
            setSuccessMessage("Updated Successfully");
            setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.data) {
                setErrorMessage(error.response.data.data);
            } else {
                setErrorMessage("An error occurred");
            }
            setTimeout(() => setErrorMessage(""), 3000);
        });
    }

    useEffect(() => {
        getUser();
    }, []);
 
    return (
            <div className='AdminProfile_page'> 
                <div className='body'>
                    <div className='title'><h1>Profile</h1></div>
                    <div className="form_body">
                        <form className='ProfileForm'>
                            <div className='nameSection'>
                                <div className="halftext_feild">
                                    <label>First Name</label>
                                    <input 
                                    className='half'
                                    type="text" 
                                    value={first_name}
                                    onChange={(e) => setFName(e.target.value)}
                                    ></input>
                                </div>
                                <div className="halftext_feild end">
                                    <label>Last Name</label>
                                    <input 
                                    className='half'
                                    type="text"
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
                                    onChange={(e) => setCompany_name(e.target.value)}
                                    value={company_name}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Work Email</label>
                                <input 
                                    className='full'
                                    type="email" 
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Phone</label>
                                <input 
                                    className='full'
                                    type="text" 
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                ></input>
                            </div>
                            <div className="text_feild">
                                <label>Address</label>
                                <input 
                                    className='full'
                                    type="text"
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                ></input> 
                            </div>
                            {errorMessage && <div className='error'>{errorMessage}</div>}
                            {successMessage && <div className='success'>{successMessage}</div>}
                            <button type="button" className='btn' onClick={handleOpenModal}>Change Password</button>
                            <button className='btn' onClick={updateInfo}>Update</button>
                        </form>
                    </div>
                </div>
                <PasswordModal
                    handleCloseModal={handleCloseModal}
                    openModal={openModal} 
                />
            </div>        
    );
}

export default Profile; 