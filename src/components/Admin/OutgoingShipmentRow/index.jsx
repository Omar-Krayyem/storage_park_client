import './style.css';

const OutgoingShipmentRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/admin/outgoing/shipment/${props.id}`;
    }

    return(
        <>
            <tr onClick={handleOpenModal} className='AdminOutgoingShipmentRow_tr' id={props.id}>
                <td className='AdminOutgoingShipmentRow_td'>{props.id}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.worker_name}</td>
                <td className='AdminOutgoingShipmentRow_td'>{props.placed_at}</td>
            </tr>
        </>
    );
}

export default OutgoingShipmentRow;