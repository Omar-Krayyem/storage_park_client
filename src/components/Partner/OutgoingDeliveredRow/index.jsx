import './style.css';

const OutgoingDeliveredRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/outgoing/delivered/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='OutgoingDeliveredRow_tr' id={props.id}>
                <td className='OutgoingDeliveredRow_td'>{props.id}</td>
                <td className='OutgoingDeliveredRow_td'>{props.customer_name}</td>
                <td className='OutgoingDeliveredRow_td'>{props.placed_at}</td>
                <td className='OutgoingDeliveredRow_td'>{props.delivered_at}</td>
            </tr>
        </>
            
        
    );
}

export default OutgoingDeliveredRow;