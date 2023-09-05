import './style.css';
import { useState } from 'react';
import GetWorkerModel from '../../models/GetWorkerModel';

const WorkerRow = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return(
        <>
        <tr onClick={handleOpenModal} className='WorkerRow_tr' id={props.id}>
                <td className='WorkerRow_td'>{props.name}</td>
                <td className='WorkerRow_td'>{props.email}</td>
                <td className='WorkerRow_td'>{props.phone}</td>
                <td className='WorkerRow_td'>{props.address}</td>
            </tr>
            <GetWorkerModel
            handleCloseModal={handleCloseModal}
            openModal={openModal} 
            user_id = {props.id}
            />
        </>
            
        
    );
}

export default WorkerRow;