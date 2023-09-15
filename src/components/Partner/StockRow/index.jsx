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
        <tr onClick={handleOpenModal} className='PartnerStockRow_tr' id={props.id}>
                <td className='PartnerStockRow_td'>{props.name}</td>
                <td className='PartnerStockRow_td'>{props.category}</td>
                <td className='PartnerStockRow_td'>{props.price}</td>
                <td className='PartnerStockRow_td'>{props.quantity}</td>
                <td className='PartnerStockRow_td'>
                    <AiFillEye 
                    onClick={handleOpenModal} 
                    className='PartnerStockRow_svg'
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