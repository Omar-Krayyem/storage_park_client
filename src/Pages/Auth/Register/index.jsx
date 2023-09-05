import '../Register/style.css';
import { Link} from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios"
import logo from '../../../images/logo_p.png';
import RegistrationMsgModal from '../../../components/models/RegistrationMsgModal';

const Register = () => {
    const [first_name, setFName] = useState("");
    const [last_name, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [company_name, setName] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const submitForm = async(e) => {
        e.preventDefault()

        const postData = {first_name, last_name, email, address, phone, company_name};
        console.log(postData)
        await axios.post("http://127.0.0.1:8000/api/register", postData)
        .then(response => {
                console.log(response);
                setFName("");
                setLName("");
                setEmail("");
                setAddress("");
                setPhone("");
                setName("");
                setErrorMessage("");
                handleOpenModal();
        })
        .catch(error => {
            if (error.response) {
                const { data } = error.response;
                setErrorMessage(data.message || "An error occurred during registration");
            } else {
                setErrorMessage("An error occurred during registration");
            }
        });

        
    }

    return (
        <div className='RegisterPage'>
            <RegistrationMsgModal
            handleCloseModal={handleCloseModal}
            openModal={openModal} 
            />
            <div className='RegisterComponent'>
                <div className='leftSide'>
                    <img src={logo} alt="Logo"></img>
                </div>
                <div className='rightSide'>
                    <div className="form_body">
                        <form className='RegisterForm'>
                            <div className='nameSection'>
                                <div className="halftext_feild">
                                    <label>First Name</label>
                                    <input 
                                    className='half'
                                    type="text" 
                                    required=""
                                    onChange={(e) => setFName(e.target.value)}
                                    value={first_name}
                                    ></input>
                                </div>
                                <div className="halftext_feild ">
                                    <label>Last Name</label>
                                    <input 
                                    className='half'
                                    type="text"
                                    required
                                    onChange={(e) => setLName(e.target.value)}
                                    value={last_name}
                                    ></input> 
                                </div>
                            </div>
                            <div className="text_feild">
                                <label>Company Name</label>
                                <input 
                                className='full'
                                type="text" 
                                required
                                onChange={(e) => setName(e.target.value)}
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
                            <div className='error'>{errorMessage}</div>
                            <input
                                type="submit"
                                className="RegisterBtn"
                                value="Get Start"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    submitForm(e);
                                }}
                            ></input>
                            <div className="form_bottom">Already have an account <Link className='linkBtn' to="/">login</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;