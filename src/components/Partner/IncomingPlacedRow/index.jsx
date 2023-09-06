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
        <tr onClick={handleOpenModal} className='IncomingPlacedRow_tr' id={props.id}>
                <td className='IncomingPlacedRow_td'>{props.id}</td>
                <td className='IncomingPlacedRow_td'>{props.item_count}</td>
                <td className='IncomingPlacedRow_td'>{props.placed_at}</td>
                <td className='IncomingPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default IncomingPlacedRow;