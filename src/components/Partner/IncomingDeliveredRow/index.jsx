import { useNavigate } from 'react-router-dom';
import './style.css';
import {AiFillEye} from 'react-icons/ai'

const IncomingDeliveredRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
        <tr className='IncomingDeliveredRow_tr' id={props.id}>
                <td className='IncomingDeliveredRow_td'>{props.id}</td>
                <td className='IncomingDeliveredRow_td'>{props.placed_at}</td>
                <td className='IncomingDeliveredRow_td'>{props.delivered_at}</td>
                <td className='IncomingDeliveredRow_td'>{props.total_price}</td>
                <td className='IncomingDeliveredRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}} 
                    className='IncomingDeliveredRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default IncomingDeliveredRow;