import './style.css';
import Modal from 'react-modal';
import React from "react";

const RegistrationMsgModal = ({ openModal, handleCloseModal }) => {
    return (
        <div>
            <Modal isOpen={openModal} className="registrationModal"
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
              }}>
                <div className='body'>
                    <div className='text'>
                    Thank you for placing your trust in us. We will review your registration and send your acceptance via email.
                    </div>
                    <button onClick={handleCloseModal}>Done</button>
                </div>
            </Modal>
            
        </div>
    );
}

export default RegistrationMsgModal;