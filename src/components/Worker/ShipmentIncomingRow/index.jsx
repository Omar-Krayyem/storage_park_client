import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const ShipmentIncomingRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
        <tr className='ShipmentIncomingRow_tr' id={props.id}>
                <td className='ShipmentIncomingRow_td'>{props.id}</td>
                <td className='ShipmentIncomingRow_td'>{props.company_name}</td>
                <td className='ShipmentIncomingRow_td'>{props.status}</td>
                <td className='ShipmentIncomingRow_td'>{props.total_price}</td>
                <td className='ShipmentIncomingRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}}  
                    className='ShipmentIncomingRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default ShipmentIncomingRow;