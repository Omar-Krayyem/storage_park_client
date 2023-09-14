import './style.css';
import React, { useState } from "react";

const Profile = () => {
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                            <button className='btn'>Update</button>
                            {/* <input
                                    type="submit"
                                    className="RegisterBtn"
                                    value="Get Start"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        submitForm(e);
                                    }}
                            ></input> */}
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default Profile;