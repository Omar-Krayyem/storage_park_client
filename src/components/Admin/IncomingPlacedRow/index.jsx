import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const IncomingPlacedRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
            <tr className='AdminIncomingPlacedRow_tr' id={props.id}>
                <td className='AdminIncomingPlacedRow_td'>{props.id}</td>
                <td className='AdminIncomingPlacedRow_td'>{props.company_name}</td>
                <td className='AdminIncomingPlacedRow_td'>{props.status}</td>
                <td className='AdminIncomingPlacedRow_td'>{props.total_price}</td>
                <td className='AdminIncomingPlacedRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}} 
                    className='adminIncomingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>    
    );
}

export default IncomingPlacedRow;