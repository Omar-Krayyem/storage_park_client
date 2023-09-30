import { useNavigate } from 'react-router-dom';
import './style.css';
import {AiFillEye} from 'react-icons/ai'

const AdminOutgoingPlacedRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
            <tr className='AdminOutgoingPlacedRow_tr' id={props.id}>
                <td className='AdminOutgoingPlacedRow_td'>{props.id}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.status}</td>
                <td className='AdminOutgoingPlacedRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}} 
                    className='AdminOutgoingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>    
    );
}

export default AdminOutgoingPlacedRow;