    import './style.css';
    import Modal from 'react-modal';
    import React, {useState} from "react";
    import {AiOutlineClose} from 'react-icons/ai';
    import axios from 'axios';

    const PasswordModal = ({ openModal, handleCloseModal }) => {
        const [password, setPassword] = useState("");
        const [conPassword, setConPassword] = useState(""); 
        const [errorMessage, setErrorMessage] = useState("");
        const [successMessage, setSuccessMessage] = useState("");

        const token = localStorage.getItem("token");

        const updatePassword = (e) => {
            e.preventDefault();

            if((password !== "" && conPassword === "") ||(password === "" && conPassword !== "")){
                setErrorMessage("To change password fill the all password fields");
                setTimeout(() => setErrorMessage(""), 3000);
                return;
            }

            if ((password && conPassword) && (password !== conPassword || password.length < 6)) {
                setErrorMessage("Passwords do not match");
                setTimeout(() => setErrorMessage(""), 3000);
                return;
            }

            const postData = {password};

            axios.post('http://127.0.0.1:8000/api/password', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.data);
                setSuccessMessage("Updated Successfully");
                setConPassword("")
                setPassword("")
                setTimeout(() => setSuccessMessage(""), 1000);
                handleCloseModal();
                
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
        
        return (
            <Modal isOpen={openModal} className="PasswordModal" 
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}
              >
                <div className='title'>
                            <h1>Update Password</h1>
                            <AiOutlineClose 
                            onClick={async (e) => {
                                e.preventDefault();
                                handleCloseModal();
                            }}
                            className='icon'
                            size={25}/>
                </div>
                <div className='body'>
                    <div className="text_feild">
                            <label>Password</label>
                            <input 
                                className='full'
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div className="text_feild">
                            <label>Confirm Password</label>
                            <input 
                                className='full'
                                type="password" 
                                required
                                value={conPassword}
                                onChange={(e) => setConPassword(e.target.value)}
                            ></input>
                        </div>
                        
                        {errorMessage && <div className='error'>{errorMessage}</div>}
                        {successMessage && <div className='success'>{successMessage}</div>}
                        <button onClick={updatePassword}>Update</button>
                </div>
            </Modal>
        );
    }

    export default PasswordModal;