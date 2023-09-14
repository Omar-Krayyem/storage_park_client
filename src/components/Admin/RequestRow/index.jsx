import './style.css';
import { useState } from 'react';
import RequestModal from '../../Modals/RequestModal';
import {AiFillEye} from 'react-icons/ai'
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
        <tr className='RequestRow_tr' id={props.id}>
                <td className='RequestRow_td'>{props.name}</td>
                <td className='RequestRow_td'>{props.email}</td>
                <td className='RequestRow_td'>{props.phone}</td>
                <td className='RequestRow_td'>{props.address}</td>
                <td className='RequestRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='RequestRow_svg'
                    size={20}/>
                </td>
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