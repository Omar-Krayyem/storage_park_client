import './style.css';
import { useState } from 'react';

const IncomingPlacedRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='AdminIncomingPlacedRow_tr' id={props.id}>
                <td className='adminIncomingPlacedRow_td'>{props.id}</td>
                <td className='adminIncomingPlacedRow_td'>{props.company_name}</td>
                <td className='adminIncomingPlacedRow_td'>{props.item_count}</td>
                <td className='adminIncomingPlacedRow_td'>{props.placed_at}</td>
                <td className='adminIncomingPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default IncomingPlacedRow;