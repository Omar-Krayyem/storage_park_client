import './style.css';
import React, { useState, useEffect } from "react";
import Footer from '../../components/Shared/Footer';
import { Map , Marker } from "pigeon-maps"
import LOGO from '../../images/logo_landing.png';
import { NavLink, useParams} from 'react-router-dom';
import axios from 'axios';

const Tracking = () => {
    const { id } = useParams();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/location/${id}`);
            setLatitude(response.data.data[0].latitude);
            setLongitude(response.data.data[0].longitude);
            setMapDataLoaded(true);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div className='Tracking_page'> 
            <div className='header'>
                <div className='left'>
                    <img src={LOGO} alt='logo'></img>
                </div>
                <div className="right">
                    <NavLink to={'/'}><button >Back</button></NavLink>
                </div>
            </div>
            <div className='body'>
                <h1>Order Current Location</h1>
                <div className='mapContainer'>
                    {mapDataLoaded && (
                        <div className='mapContainer'>
                        <Map
                            height={400}
                            defaultCenter={[latitude, longitude]}
                            defaultZoom={13}
                        >
                        <Marker width={50} anchor={[latitude, longitude]} />
                        </Map>
                            </div>
                        )}
                    </div>
            </div>
            <div className="footer"><Footer/></div>
        </div>
    );
}

export default Tracking;