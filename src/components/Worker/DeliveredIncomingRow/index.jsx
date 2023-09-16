import './style.css';
import {AiFillEye} from 'react-icons/ai'

const DeliveredIncomingRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/incoming/delivered/${props.id}`;
    }

    return(
        <>
        <tr className='DeliveredIncomingRow_tr' id={props.id}>
                <td className='DeliveredIncomingRow_td'>{props.id}</td>
                <td className='DeliveredIncomingRow_td'>{props.company_name}</td>
                <td className='DeliveredIncomingRow_td'>{props.placed_at}</td>
                <td className='DeliveredIncomingRow_td'>{props.delivered_at}</td>
                <td className='DeliveredIncomingRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='DeliveredIncomingRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default DeliveredIncomingRow;