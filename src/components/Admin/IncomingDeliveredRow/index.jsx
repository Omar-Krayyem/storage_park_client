import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const IncomingDeliveredRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
            <tr className='AdminIncomingDeliveredRow_tr' id={props.id}>
                <td className='AdminIncomingDeliveredRow_td'>{props.id}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.company_name}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.worker_name}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.delivered_at}</td>
                <td className='AdminIncomingDeliveredRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}} 
                    className='AdminIncomingDeliveredRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
    );
}

export default IncomingDeliveredRow;