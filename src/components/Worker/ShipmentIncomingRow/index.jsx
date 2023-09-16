import './style.css';
import {AiFillEye} from 'react-icons/ai'

const ShipmentIncomingRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/incoming/shipment/${props.id}`;
    }

    return(
        <>
        <tr className='ShipmentIncomingRow_tr' id={props.id}>
                <td className='ShipmentIncomingRow_td'>{props.id}</td>
                <td className='ShipmentIncomingRow_td'>{props.company_name}</td>
                <td className='ShipmentIncomingRow_td'>{props.placed_at}</td>
                <td className='ShipmentIncomingRow_td'>{props.total_price}</td>
                <td className='ShipmentIncomingRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='ShipmentIncomingRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default ShipmentIncomingRow;