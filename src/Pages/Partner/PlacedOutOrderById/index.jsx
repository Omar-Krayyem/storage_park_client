import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';
import { Map , Marker } from "pigeon-maps"

const PartnerOutgoingPlacedOrder = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/placed/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLatitude(response.data.data.latitude);
            setLongitude(response.data.data.longitude);
            setOrder(response.data.data);
            setOrderItems(response.data.data.order_items)
            setMapDataLoaded(true);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);


    return (
            <div className='PartnerOutgoingPlacedOrder_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Placed Order Number: {id}</h1></div>
                        <div className='right_title'>
                            <Link to={'/partner/outgoing/placed'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='order_table'>
                        <table className='PartnerOutgoingPlacedOrder_table'>
                            <thead className='PartnerOutgoingPlacedOrder_thead'>
                                <tr className=''>
                                    <th className='PartnerOutgoingPlacedOrder_th top_left'>Customer Name</th>
                                    <th className='PartnerOutgoingPlacedOrder_th'>Customer Email</th>
                                    <th className='PartnerOutgoingPlacedOrder_th'>Customer Phone</th>
                                    <th className='PartnerOutgoingPlacedOrder_th'>Total Price $</th>
                                    <th className='PartnerOutgoingPlacedOrder_th top_right'>Placed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='PartnerOutgoingPlacedOrder_tr'>
                                    <td className='PartnerOutgoingPlacedOrder_td'>{order.customer?.name}</td>
                                    <td className='PartnerOutgoingPlacedOrder_td'>{order.customer?.email}</td>
                                    <td className='PartnerOutgoingPlacedOrder_td'>{order.customer?.phone}</td>
                                    <td className='PartnerOutgoingPlacedOrder_td'>{order.total_price}</td>
                                    <td className='PartnerOutgoingPlacedOrder_td'>{order.placed_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                        
                    <div className='mapContainer'>
                        {mapDataLoaded && (
                            <div className='mapContainer'>
                                <Map
                                    height={300}
                                    defaultCenter={[latitude, longitude]}
                                    defaultZoom={13}
                                >
                                    <Marker width={50} anchor={[latitude, longitude]} />
                                </Map>
                            </div>
                        )}
                    </div>

                    <div className='order_table'>
                        <h2>Order Items:</h2>
                        <table className='PartnerOutgoingPlacedOrder_table'>
                            <thead className='PartnerOutgoingPlacedOrder_thead'>
                                <tr className=''>
                                    <th className='PartnerOutgoingPlacedOrder_th top_left'>Name</th>
                                    <th className='PartnerOutgoingPlacedOrder_th'>Descritpion</th>
                                    <th className='PartnerOutgoingPlacedOrder_th'>Category</th>
                                    <th className='PartnerOutgoingPlacedOrder_th'>Price $</th>
                                    <th className='PartnerOutgoingPlacedOrder_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='PartnerOutgoingPlacedOrder_tr'>
                                        <td className='PartnerOutgoingPlacedOrder_td'>{item.product.name}</td>
                                        <td className='PartnerOutgoingPlacedOrder_td'>{item.product.description}</td>
                                        <td className='PartnerOutgoingPlacedOrder_td'>{item.product.category.category}</td>
                                        <td className='PartnerOutgoingPlacedOrder_td'>{item.product.price}</td>
                                        <td className='PartnerOutgoingPlacedOrder_td'>{item.quantity}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>        
    );
}

export default PartnerOutgoingPlacedOrder;