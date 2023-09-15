import './style.css';
import {AiFillEye} from 'react-icons/ai'

const IncomingShipmentRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/incoming/shipment/${props.id}`;
    }

    return(
        <>
        <tr className='IncomingShipmentRow_tr' id={props.id}>
                <td className='IncomingShipmentRow_td'>{props.id}</td>
                <td className='IncomingShipmentRow_td'>{props.item_count}</td>
                <td className='IncomingShipmentRow_td'>{props.placed_at}</td>
                <td className='IncomingShipmentRow_td'>{props.total_price}</td>
                <td className='IncomingDeliveredRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='IncomingShipmentRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default IncomingShipmentRow;