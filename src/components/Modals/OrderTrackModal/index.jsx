import './style.css';
import Modal from 'react-modal';
import React, {useState} from "react";
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios';
import { useNavigate } from 'react-router';

const OrderTrackModal = ({ openModal, handleCloseModal }) => {
    const [order, setOrder] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
    
        if (!/^\d+$/.test(order)) {
            setErrorMessage("Order should contain only numbers");
            return;
        }
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/checkOrder/${order}`);
            console.log(response.data.status);
            
            if (response.data.status === "Success") {
                navigate(`/tracking/${order}`);
            } else if (response.data.status === "Error") {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
    
            if (error.response && error.response.status === 404) {
                setErrorMessage("The order was not found.");
            } else {
                setErrorMessage("An error occurred while processing your request.");
            }
        }
    }

    return (
        <div>
            <Modal isOpen={openModal} className="orderModal"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}
              >
                <div className='body'>
                    <div className='title'>
                        <h1>Track Your Order</h1>
                        <AiOutlineClose 
                        onClick={async (e) => {
                            e.preventDefault();
                            handleCloseModal();
                        }}
                        className='icon'
                        size={25}/>
                    </div>
                    
                    <div className="text_feild">
                        <label>Order ID</label>
                        <input 
                            className='full'
                            type="text" 
                            required
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        ></input>
                        {errorMessage && <div className='error'>{errorMessage}</div>}
                    </div>
                    <button onClick={submit}>Track Order</button>
                </div>
            </Modal>
        </div>
    );
}

export default OrderTrackModal;