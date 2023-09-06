import './style.css';
import { useState } from 'react';

const ShipmentPlacedRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='ShipmentPlacedRow_tr' id={props.id}>
                <td className='ShipmentPlacedRow_td'>{props.id}</td>
                <td className='ShipmentPlacedRow_td'>{props.item_count}</td>
                <td className='ShipmentPlacedRow_td'>{props.placed_at}</td>
                <td className='ShipmentPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default ShipmentPlacedRow;