import './style.css';

const AdminOutgoingPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/admin/outgoing/placed/${props.id}`;
    }

    return(
        <>
            <tr onClick={handleOpenModal} className='AdminOutgoingPlacedRow_tr' id={props.id}>
                <td className='AdminOutgoingPlacedRow_td'>{props.id}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.company_name}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.customer_name}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.placed_at}</td>
                <td className='AdminOutgoingPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>    
    );
}

export default AdminOutgoingPlacedRow;