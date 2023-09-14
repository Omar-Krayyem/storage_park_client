import './style.css';
import { useState } from 'react';
import AdminStockModal from '../../Modals/AdminStockModal';
import {AiFillEye} from 'react-icons/ai'

const StockRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr className='AdminStockRow_tr' id={props.id}>
                <td className='AdminStockRow_td'>{props.name}</td>
                <td className='AdminStockRow_td'>{props.company_name}</td>
                <td className='AdminStockRow_td'>{props.category}</td>
                <td className='AdminStockRow_td'>{props.quantity}</td>
                <td className='AdminStockRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='AdminStockRow_svg'
                    size={20}/>
                </td>
            </tr>
            <AdminStockModal
            handleCloseModal={handleCloseModal}
            openModal={openModal} 
            id = {props.id}
            />
        </>
            
        
    );
}

export default StockRow;