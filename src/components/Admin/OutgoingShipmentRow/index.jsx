import './style.css';
import {AiFillEye} from 'react-icons/ai'

const OutgoingShipmentRow = (props) => {

    const handleOpenOrder = () => {
        window.location.href = `/admin/outgoing/shipment/${props.id}`;
    }

    return(
        <>
            <tr className='AdminOutgoingShipmentRow_tr' id={props.id}>
                <td className='AdminOutgoingShipmentRow_td'>{props.id}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.worker_name}</td>
                <td className='AdminOutgoingShipmentRow_td'>
                    <AiFillEye 
                    onClick={handleOpenOrder} 
                    className='AdminOutgoingShipmentRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
    );
}

export default OutgoingShipmentRow;