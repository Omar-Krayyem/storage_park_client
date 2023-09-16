import './style.css';
import { LuCopyright } from 'react-icons/lu';
import {GrTwitter} from 'react-icons/gr';
import {AiOutlineInstagram, AiFillLinkedin, AiFillYoutube} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
const Navbar = () => {

    return (
        <div className='footer'> 
            <div className='upper'>
                <div className="left">
                    <h1>Storage Park</h1>
                    <p>storagepark.lb@gmail.com <br></br>00961 01 123 456</p>
                </div>
                <div className="right">
                <span>KEEP UP TO DATE ON INDUSTRY TRENDS AND NEWS</span>
                <div className='icons'>
                    <div className='icon'><GrTwitter size={25}/></div>
                    <div className='icon'><AiOutlineInstagram size={30}/></div>
                    <div className='icon'><AiFillLinkedin size={30}/></div>
                    <div className='icon'><BsFacebook size={25}/></div>
                    <div className='icon'><AiFillYoutube size={30}/></div>
                </div>
                </div>
            </div>
            <div className="down"><LuCopyright/> StoragePark</div>
        </div>
    );
}

export default Navbar;