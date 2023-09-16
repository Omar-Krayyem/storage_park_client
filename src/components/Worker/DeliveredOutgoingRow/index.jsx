import './style.css';
import {AiFillEye} from 'react-icons/ai'

const DeliveredOutgoingRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/outgoing/delivered/${props.id}`;
    }

    return(
        <>
        <tr className='DeliveredOutgoingRow_tr' id={props.id}>
                <td className='DeliveredOutgoingRow_td'>{props.id}</td>
                <td className='DeliveredOutgoingRow_td'>{props.company_name}</td>
                <td className='DeliveredOutgoingRow_td'>{props.customer_name}</td>
                <td className='DeliveredOutgoingRow_td'>{props.delivered_at}</td>
                <td className='DeliveredOutgoingRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='DeliveredOutgoingRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default DeliveredOutgoingRow;