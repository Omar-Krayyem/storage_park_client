import './style.css';
import { useState } from 'react';

const IncomingShipmentRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='AdminIncomingShipmentRow_tr' id={props.id}>
                <td className='adminIncomingShipmentRow_td'>{props.id}</td>
                <td className='adminIncomingShipmentRow_td'>{props.company_name}</td>
                <td className='adminIncomingShipmentRow_td'>{props.worker_name}</td>
                <td className='adminIncomingShipmentRow_td'>{props.placed_at}</td>
                <td className='adminIncomingShipmentRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default IncomingShipmentRow;