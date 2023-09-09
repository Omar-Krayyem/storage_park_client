import './style.css';

const IncomingDeliveredRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/incoming/delivered/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='IncomingDeliveredRow_tr' id={props.id}>
                <td className='IncomingDeliveredRow_td'>{props.id}</td>
                <td className='IncomingDeliveredRow_td'>{props.placed_at}</td>
                <td className='IncomingDeliveredRow_td'>{props.delivered_at}</td>
                <td className='IncomingDeliveredRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default IncomingDeliveredRow;