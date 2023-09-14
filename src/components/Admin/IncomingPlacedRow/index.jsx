import './style.css';
import {AiFillEye} from 'react-icons/ai'

const IncomingPlacedRow = (props) => {

    const handleOpenOrder = () => {
        window.location.href = `/admin/incoming/placed/${props.id}`;
    }

    return(
        <>
            <tr className='AdminIncomingPlacedRow_tr' id={props.id}>
                <td className='AdminIncomingPlacedRow_td'>{props.id}</td>
                <td className='AdminIncomingPlacedRow_td'>{props.company_name}</td>
                <td className='AdminIncomingPlacedRow_td'>{props.placed_at}</td>
                <td className='AdminIncomingPlacedRow_td'>{props.total_price}</td>
                <td className='AdminIncomingPlacedRow_td'>
                    <AiFillEye 
                    onClick={handleOpenOrder} 
                    className='adminIncomingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>    
    );
}

export default IncomingPlacedRow;