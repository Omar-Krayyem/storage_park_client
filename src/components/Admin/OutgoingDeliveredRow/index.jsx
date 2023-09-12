import './style.css';

const OutgoingDeliveredRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/admin/outgoing/delivered/${props.id}`;
    }

    return(
        <>
            <tr onClick={handleOpenModal} className='AdminOutgoingDeliveredRow_tr' id={props.id}>
                <td className='AdminOutgoingDeliveredRow_td'>{props.id}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.worker_name}</td>
                <td className='AdminOutgoingDeliveredRow_td'>{props.delivered_at}</td>
            </tr>
        </>
    );
}

export default OutgoingDeliveredRow;