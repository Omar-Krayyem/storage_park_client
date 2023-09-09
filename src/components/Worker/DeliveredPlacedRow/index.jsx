import './style.css';

const ShipmentPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/worker/incoming/delivered/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='ShipmentPlacedRow_tr' id={props.id}>
                <td className='ShipmentPlacedRow_td'>{props.id}</td>
                <td className='ShipmentPlacedRow_td'>{props.company_name}</td>
                <td className='ShipmentPlacedRow_td'>{props.placed_at}</td>
                <td className='ShipmentPlacedRow_td'>{props.delivered_at}</td>
                <td className='ShipmentPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default ShipmentPlacedRow;