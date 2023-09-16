import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Profile = () => {
    const [user_id, setId] = useState(0);
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const token = localStorage.getItem("token");

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

        if((password !== "" && conPassword === "") ||(password === "" && conPassword !== "")){
            setErrorMessage("To change password fill the all password fields");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        if(password.length < 6){
            setErrorMessage("Password is too short");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        if ((password && conPassword) && (password !== conPassword || password.length < 6)) {
            setErrorMessage("Passwords do not match");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        const postData = {user_id, first_name, last_name, email, phone, address, password};
        console.log(postData)

        axios.post('http://127.0.0.1:8000/api/partner/profile', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
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
        <div className='PartnerProfile_page'> 
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
                            <div className="text_feild">
                                <label>Password</label>
                                <input 
                                    className='full'
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                ></input> 
                            </div>
                            <div className="text_feild">
                                <label>Confirm Password</label>
                                <input 
                                    className='full'
                                    type="password"
                                    required
                                    onChange={(e) => setConPassword(e.target.value)}
                                    value={conPassword}
                                ></input> 
                            </div>
                            <div className='error'>{errorMessage}</div>
                            <div className='success'>{successMessage}</div>
                            <button className='btn' onClick={updateInfo}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default Profile;