import './style.css';
import React from "react";
import { BiSolidUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const name = localStorage.getItem("user_name");
    const navigate = useNavigate();

    const profile = () => {
        let user_type = localStorage.getItem("user_type");
        console.log(user_type)
        if(parseInt(user_type) === 1){
            navigate('/admin/profile');
        }
        else if(parseInt(user_type) === 2){
            navigate('/worker/profile');
        }
        else if(parseInt(user_type) === 3){
            navigate('/partner/profile')
        }
    }

    return (
        <div className='Header'> 
            <div className='text' onClick={profile}>
                <BiSolidUser size={25} className='icon'/> <span>{name}</span>
            </div>
        </div>
    );
}

export default Header;