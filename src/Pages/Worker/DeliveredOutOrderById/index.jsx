import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';
import { Map , Marker } from "pigeon-maps"
import WorkerLayout from '../../../utils/WorkerLayout';

const DeliveredOrderById = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/worker/outgoing/delivered/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);
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
        <WorkerLayout>
            <div className='WorkerOutgoingDeliveredOrder_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Placed Order ID: {id}</h1></div>
                        <div className='right_title'>
                            <Link to={'/worker/incoming/delivered'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='order_table'>
                        <table className='WorkerOutgoingDeliveredOrder_table'>
                            <thead className='WorkerOutgoingDeliveredOrder_thead'>
                                <tr className=''>
                                    <th className='WorkerOutgoingDeliveredOrder_th top_left'>Company Name</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Customer Name</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Customer Email</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Customer Phone</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Total Price $</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Placed At</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th top_right'>Delivered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='WorkerOutgoingDeliveredOrder_tr'>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.user?.company_name || ''}</td>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.customer?.name}</td>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.customer?.email}</td>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.customer?.phone}</td>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.total_price}</td>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.placed_at}</td>
                                    <td className='WorkerOutgoingDeliveredOrder_td'>{order.delivered_at}</td>
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
                        <table className='WorkerOutgoingDeliveredOrder_table'>
                            <thead className='WorkerOutgoingDeliveredOrder_thead'>
                                <tr className=''>
                                    <th className='WorkerOutgoingDeliveredOrder_th top_left'>Name</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Descritpion</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Category</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th'>Price $</th>
                                    <th className='WorkerOutgoingDeliveredOrder_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='WorkerOutgoingDeliveredOrder_tr'>
                                        <td className='WorkerOutgoingDeliveredOrder_td'>{item.product.name}</td>
                                        <td className='WorkerOutgoingDeliveredOrder_td'>{item.product.description}</td>
                                        <td className='WorkerOutgoingDeliveredOrder_td'>{item.product.category.category}</td>
                                        <td className='WorkerOutgoingDeliveredOrder_td'>{item.product.price}</td>
                                        <td className='WorkerOutgoingDeliveredOrder_td'>{item.quantity}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </WorkerLayout>
        
    );
}

export default DeliveredOrderById;