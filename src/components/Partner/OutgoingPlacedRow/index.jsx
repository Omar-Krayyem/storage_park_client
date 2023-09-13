import './style.css';

const OutgingPlacedRow = (props) => {

    const handleOpenModal = () => {
        window.location.href = `/partner/outgoing/placed/${props.id}`;
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='OutgingPlacedRow_tr' id={props.id}>
                <td className='OutgingPlacedRow_td'>{props.id}</td>
                <td className='OutgingPlacedRow_td'>{props.customer_name}</td>
                <td className='OutgingPlacedRow_td'>{props.placed_at}</td>
                <td className='OutgingPlacedRow_td'>{props.total_price}</td>
            </tr>
        </>
            
        
    );
}

export default OutgingPlacedRow;