import './style.css';
import {AiFillEye} from 'react-icons/ai'

const IncomingPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/incoming/placed/${props.id}`;
    }

    return(
        <>
        <tr className='IncomingPlacedRow_tr' id={props.id}>
                <td className='IncomingPlacedRow_td'>{props.id}</td>
                <td className='IncomingPlacedRow_td'>{props.item_count}</td>
                <td className='IncomingPlacedRow_td'>{props.placed_at}</td>
                <td className='IncomingPlacedRow_td'>{props.total_price}</td>
                <td className='IncomingPlacedRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='IncomingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default IncomingPlacedRow;