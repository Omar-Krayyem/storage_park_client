import './style.css';
import { useState } from 'react';
import UserModel from '../../models/PartnerModel';

const PartnerRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='PartnerRow_tr' id={props.id}>
                <td className='PartnerRow_td'>{props.name}</td>
                <td className='PartnerRow_td'>{props.email}</td>
                <td className='PartnerRow_td'>{props.phone}</td>
                <td className='PartnerRow_td'>{props.address}</td>
            </tr>
            <UserModel
            handleCloseModal={handleCloseModal}
            openModal={openModal} 
            user_id = {props.id}
            />
        </>
            
        
    );
}

export default PartnerRow;