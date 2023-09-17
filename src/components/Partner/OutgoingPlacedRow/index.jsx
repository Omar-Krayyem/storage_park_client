import './style.css';
import {AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const OutgingPlacedRow = (props) => {
    const navigate = useNavigate();

    return(
        <>
        <tr className='OutgingPlacedRow_tr' id={props.id}>
                <td className='OutgingPlacedRow_td'>{props.id}</td>
                <td className='OutgingPlacedRow_td'>{props.customer_name}</td>
                <td className='OutgingPlacedRow_td'>{props.placed_at}</td>
                <td className='OutgingPlacedRow_td'>{props.total_price}</td>
                <td className='OutgingPlacedRow_td'>
                    <AiFillEye 
                    onClick={() => {navigate(`${props.id}`)}} 
                    className='OutgingPlacedRow_svg'
                    size={20}/>
                </td>
            </tr>
        </>
            
        
    );
}

export default OutgingPlacedRow;