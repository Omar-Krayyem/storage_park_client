import  './PartnerStyle.css';
import React, {useState} from 'react'
import PartnerNavSide from '../components/Partner/NavSide'
import Header from '../components/Shared/Header'
// import {Outlet} from 'react-router-dom';

const PartnerLayout = ({children}) => {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className='PartnerLayout'>
            <div className='left_side'>
                <PartnerNavSide isOpened={isOpened} setIsOpened={setIsOpened}/>
            </div>
            <div className='right_side'>
                <Header className="head" isOpened={isOpened} setIsOpened={setIsOpened}/>
                {/* <Outlet/> */}
                {children}
            </div>
        </div>
    );
}

export default PartnerLayout