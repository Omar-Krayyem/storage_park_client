import './style.css';
import { useState } from 'react';
import RequestModal from '../../Modals/RequestModal';

const RequestRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='UserRow_tr' id={props.id}>
                <td className='UserRow_td'>{props.name}</td>
                <td className='UserRow_td'>{props.email}</td>
                <td className='UserRow_td'>{props.phone}</td>
                <td className='UserRow_td'>{props.address}</td>
            </tr>
            <RequestModal
            handleCloseModal={handleCloseModal}
            openModal={openModal} 
            user_id = {props.id}
            />
        </>
            
        
    );
}

export default RequestRow;