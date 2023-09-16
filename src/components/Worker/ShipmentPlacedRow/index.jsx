import './style.css';
import {AiFillEye} from 'react-icons/ai'

const ShipmentPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/incoming/shipment/${props.id}`;
    }

    return(
        <>
        <tr className='ShipmentPlacedRow_tr' id={props.id}>
                <td className='ShipmentPlacedRow_td'>{props.id}</td>
                <td className='ShipmentPlacedRow_td'>{props.company_name}</td>
                <td className='ShipmentPlacedRow_td'>{props.placed_at}</td>
                <td className='ShipmentPlacedRow_td'>{props.total_price}</td>
                <td className='ShipmentPlacedRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='ShipmentPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default ShipmentPlacedRow;