import './style.css';
import {AiFillEye} from 'react-icons/ai'

const IncomingDeliveredRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/incoming/delivered/${props.id}`;
    }

    return(
        <>
        <tr className='IncomingDeliveredRow_tr' id={props.id}>
                <td className='IncomingDeliveredRow_td'>{props.id}</td>
                <td className='IncomingDeliveredRow_td'>{props.placed_at}</td>
                <td className='IncomingDeliveredRow_td'>{props.delivered_at}</td>
                <td className='IncomingDeliveredRow_td'>{props.total_price}</td>
                <td className='IncomingDeliveredRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='IncomingDeliveredRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default IncomingDeliveredRow;