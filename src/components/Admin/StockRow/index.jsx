import './style.css';
import { useState } from 'react';
import AdminStockModal from '../../Modals/AdminStockModal';

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
        <tr onClick={handleOpenModal} className='StockRow_tr' id={props.id}>
                <td className='StockRow_td'>{props.name}</td>
                <td className='StockRow_td'>{props.company_name}</td>
                <td className='StockRow_td'>{props.category}</td>
                <td className='StockRow_td'>{props.quantity}</td>
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