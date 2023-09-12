import './style.css';

const IncomingPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/admin/incoming/placed/${props.id}`;
    }

    return(
        <>
            <tr onClick={handleOpenModal} className='AdminIncomingPlacedRow_tr' id={props.id}>
                <td className='adminIncomingPlacedRow_td'>{props.id}</td>
                <td className='adminIncomingPlacedRow_td'>{props.company_name}</td>
                <td className='adminIncomingPlacedRow_td'>{props.item_count}</td>
                <td className='adminIncomingPlacedRow_td'>{props.placed_at}</td>
                <td className='adminIncomingPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>    
    );
}

export default IncomingPlacedRow;