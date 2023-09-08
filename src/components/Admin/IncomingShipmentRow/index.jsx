import './style.css';

const IncomingShipmentRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/admin/incoming/shipment/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='AdminIncomingShipmentRow_tr' id={props.id}>
                <td className='adminIncomingShipmentRow_td'>{props.id}</td>
                <td className='adminIncomingShipmentRow_td'>{props.company_name}</td>
                <td className='adminIncomingShipmentRow_td'>{props.worker_name}</td>
                <td className='adminIncomingShipmentRow_td'>{props.placed_at}</td>
                <td className='adminIncomingShipmentRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default IncomingShipmentRow;