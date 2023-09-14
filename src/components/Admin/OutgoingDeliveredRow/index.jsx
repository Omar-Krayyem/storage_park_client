import './style.css';
import {AiFillEye} from 'react-icons/ai'

const OutgoingDeliveredRow = (props) => {

    const handleOpenOrder = () => {
        window.location.href = `/admin/outgoing/delivered/${props.id}`;
    }

    return(
        <>
            <tr className='AdminOutgoingDeliveredRow_tr' id={props.id}>
                <td className='AdminOutgoingDeliveredRow_td'>{props.id}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.worker_name}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.delivered_at}</td>
                <td className='AdminOutgoingDeliveredRow_td'>
                    <AiFillEye 
                    onClick={handleOpenOrder} 
                    className='AdminOutgoingDeliveredRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
    );
}

export default OutgoingDeliveredRow;