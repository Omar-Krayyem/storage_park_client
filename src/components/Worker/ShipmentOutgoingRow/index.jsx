import './style.css';
import {AiFillEye} from 'react-icons/ai'

const ShipmentOutgoingRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/outgoing/shipment/${props.id}`;
    }

    return(
        <>
        <tr className='ShipmentOutgoingRow_tr' id={props.id}>
                <td className='ShipmentOutgoingRow_td'>{props.id}</td>
                <td className='ShipmentOutgoingRow_td'>{props.company_name}</td>
                <td className='ShipmentOutgoingRow_td'>{props.placed_at}</td>
                <td className='ShipmentOutgoingRow_td'>{props.total_price}</td>
                <td className='ShipmentOutgoingRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='ShipmentOutgoingRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default ShipmentOutgoingRow;