import './style.css';
import {AiFillEye} from 'react-icons/ai'

const OutgoingShipmentRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/outgoing/shipment/${props.id}`;
    }

    return(
        <>
        <tr className='OutgoingShipmentRow_tr' id={props.id}>
                <td className='OutgoingShipmentRow_td'>{props.id}</td>
                <td className='OutgoingShipmentRow_td'>{props.customer_name}</td>
                <td className='OutgoingShipmentRow_td'>{props.placed_at}</td>
                <td className='OutgoingShipmentRow_td'>{props.total_price}</td>
                <td className='OutgoingShipmentRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='OutgoingShipmentRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default OutgoingShipmentRow;