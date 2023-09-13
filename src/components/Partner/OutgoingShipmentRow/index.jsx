import './style.css';

const OutgoingShipmentRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/outgoing/shipment/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='OutgoingShipmentRow_tr' id={props.id}>
                <td className='OutgoingShipmentRow_td'>{props.id}</td>
                <td className='OutgoingShipmentRow_td'>{props.customer_name}</td>
                <td className='OutgoingShipmentRow_td'>{props.placed_at}</td>
                <td className='OutgoingShipmentRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default OutgoingShipmentRow;