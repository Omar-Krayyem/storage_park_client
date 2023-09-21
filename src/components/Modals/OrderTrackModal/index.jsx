import './style.css';
import Modal from 'react-modal';
import React, {useState} from "react";
import {AiOutlineClose} from 'react-icons/ai'

const OrderTrackModal = ({ openModal, handleCloseModal }) => {
    const [order, setOrder] = useState("");
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
                    </div>
                    <button>Track Order</button>
                </div>
            </Modal>
        </div>
    );
}

export default OrderTrackModal;