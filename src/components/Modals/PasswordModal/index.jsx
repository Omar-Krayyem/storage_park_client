import './style.css';
import Modal from 'react-modal';
import React, {useState} from "react";
import {AiOutlineClose} from 'react-icons/ai'

const PasswordModal = ({ openModal, handleCloseModal }) => {
    const [order, setOrder] = useState("");
    return (
        <div>
            <Modal isOpen={openModal} className="PasswordModal">
            <div className='title'>
                        <h1>Upfate Password</h1>
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
                            type="text" 
                            required
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        ></input>
                    </div>
                    <div className="text_feild">
                        <label>Confirm Password</label>
                        <input 
                            className='full'
                            type="text" 
                            required
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        ></input>
                    </div>
                    <button>Track Order</button>
                </div>
            </Modal>
        </div>
    );
}

export default PasswordModal;