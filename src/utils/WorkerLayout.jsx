import  './WorkerStyle.css';
import React, {useState} from 'react'
import WorkerNavSide from '../components/Worker/NavSide'
import Header from '../components/Shared/Header'
import {Outlet} from 'react-router-dom';

const WorkerLayout = () => {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className='WorkerLayout'>
            <div className='left_side'>
                <WorkerNavSide isOpened={isOpened} setIsOpened={setIsOpened}/>
            </div>
            <div className='right_side'>
                <Header className="head" isOpened={isOpened} setIsOpened={setIsOpened}/>
                <Outlet/>
            </div>
        </div>
    );
}

export default WorkerLayout