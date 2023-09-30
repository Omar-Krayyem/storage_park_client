import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const IncomingPlacedRow = (props) => {
    const navigate = useNavigate();
    
    return(
        <>
        <tr className='IncomingPlacedRow_tr' id={props.id}>
                <td className='IncomingPlacedRow_td'>{props.id}</td>
                <td className='IncomingPlacedRow_td'>{props.item_count}</td>
                <td className='IncomingPlacedRow_td'>{props.status}</td>
                <td className='IncomingPlacedRow_td'>{props.total_price}</td>
                <td className='IncomingPlacedRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}} 
                    className='IncomingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default IncomingPlacedRow;