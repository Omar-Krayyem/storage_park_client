import './style.css';
import Modal from 'react-modal';
import React from "react";

const RegistrationMsgModal = ({ openModal, handleCloseModal }) => {
    return (
        <div>
            <Modal isOpen={openModal} className="registrationModal">
                <div className='body'>
                    <div className='text'>
                    Thank you for placing your trust in us. We will review your registration and send your acceptance via email.
                    </div>
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            </Modal>
            
        </div>
    );
}

export default RegistrationMsgModal;