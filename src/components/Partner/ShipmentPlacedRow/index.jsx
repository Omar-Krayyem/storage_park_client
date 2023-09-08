import './style.css';

const ShipmentPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/incoming/shipment/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='ShipmentPlacedRow_tr' id={props.id}>
                <td className='ShipmentPlacedRow_td'>{props.id}</td>
                <td className='ShipmentPlacedRow_td'>{props.item_count}</td>
                <td className='ShipmentPlacedRow_td'>{props.placed_at}</td>
                <td className='ShipmentPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default ShipmentPlacedRow;