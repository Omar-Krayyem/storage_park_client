import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const ShipmentOutgoingRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
        <tr className='ShipmentOutgoingRow_tr' id={props.id}>
                <td className='ShipmentOutgoingRow_td'>{props.id}</td>
                <td className='ShipmentOutgoingRow_td'>{props.company_name}</td>
                <td className='ShipmentOutgoingRow_td'>{props.customer_name}</td>
                <td className='ShipmentOutgoingRow_td'>{props.status}</td>
                <td className='ShipmentOutgoingRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}}  
                    className='ShipmentOutgoingRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default ShipmentOutgoingRow;