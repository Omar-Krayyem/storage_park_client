import './style.css';
import {AiFillEye} from 'react-icons/ai'

const IncomingShipmentRow = (props) => {

    const handleOpenOrder = () => {
        window.location.href = `/admin/incoming/shipment/${props.id}`;
    }

    return(
        <>
            <tr className='AdminIncomingShipmentRow_tr' id={props.id}>
                <td className='adminIncomingShipmentRow_td'>{props.id}</td>
                <td className='adminIncomingShipmentRow_td'>{props.company_name}</td>
                <td className='adminIncomingShipmentRow_td'>{props.worker_name}</td>
                <td className='adminIncomingShipmentRow_td'>{props.placed_at}</td>
                <td className='adminIncomingShipmentRow_td'>
                    <AiFillEye 
                    onClick={handleOpenOrder} 
                    className='adminIncomingShipmentRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
    );
}

export default IncomingShipmentRow;