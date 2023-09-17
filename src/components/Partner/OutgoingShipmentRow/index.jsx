import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const OutgoingShipmentRow = (props) => {    
    const navigate = useNavigate();

    return(
        <>
        <tr className='OutgoingShipmentRow_tr' id={props.id}>
                <td className='OutgoingShipmentRow_td'>{props.id}</td>
                <td className='OutgoingShipmentRow_td'>{props.customer_name}</td>
                <td className='OutgoingShipmentRow_td'>{props.placed_at}</td>
                <td className='OutgoingShipmentRow_td'>{props.total_price}</td>
                <td className='OutgoingShipmentRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}}
                    className='OutgoingShipmentRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default OutgoingShipmentRow;