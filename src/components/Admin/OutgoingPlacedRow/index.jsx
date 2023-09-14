import './style.css';
import {AiFillEye} from 'react-icons/ai'

const AdminOutgoingPlacedRow = (props) => {

    const handleOpenOrder = () => {
        window.location.href = `/admin/outgoing/placed/${props.id}`;
    }

    return(
        <>
            <tr className='AdminOutgoingPlacedRow_tr' id={props.id}>
                <td className='AdminOutgoingPlacedRow_td'>{props.id}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.placed_at}</td>
                <td className='AdminOutgoingPlacedRow_td'>
                    <AiFillEye 
                    onClick={handleOpenOrder} 
                    className='AdminOutgoingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>    
    );
}

export default AdminOutgoingPlacedRow;