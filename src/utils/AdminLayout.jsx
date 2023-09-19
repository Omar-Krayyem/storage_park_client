import  './AdminStyle.css';
import React, {useState} from 'react'
import AdminNavSide from '../components/Admin/NavSide'
import Header from '../components/Shared/Header'
import {Outlet} from 'react-router-dom';

const AdminLayout = () => {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className='AdminLayout'>
            <div className='left_side'>
                <AdminNavSide isOpened={isOpened} setIsOpened={setIsOpened}/>
            </div>
            <div className='right_side'>
                <Header className="head" isOpened={isOpened} setIsOpened={setIsOpened}/>
                <Outlet/>
                {/* {children} */}
            </div>
        </div>
    );
}

export default AdminLayout