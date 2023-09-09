import './style.css';

const IncomingDeliveredRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/admin/incoming/delivered/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='AdminIncomingDeliveredRow_tr' id={props.id}>
                <td className='AdminIncomingDeliveredRow_td'>{props.id}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.company_name}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.worker_name}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.placed_at}</td>
                <td className='AdminIncomingDeliveredRow_td'>{props.delivered_at}</td>
            </tr>
        </>
            
        
    );
}

export default IncomingDeliveredRow;