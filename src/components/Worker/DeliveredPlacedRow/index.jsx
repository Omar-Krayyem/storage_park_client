import './style.css';
import {AiFillEye} from 'react-icons/ai'

const DeliveredPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/incoming/delivered/${props.id}`;
    }

    return(
        <>
        <tr className='DeliveredPlacedRow_tr' id={props.id}>
                <td className='DeliveredPlacedRow_td'>{props.id}</td>
                <td className='DeliveredPlacedRow_td'>{props.company_name}</td>
                <td className='DeliveredPlacedRow_td'>{props.placed_at}</td>
                <td className='DeliveredPlacedRow_td'>{props.delivered_at}</td>
                <td className='DeliveredPlacedRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='DeliveredPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default DeliveredPlacedRow;