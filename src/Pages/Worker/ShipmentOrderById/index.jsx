import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';
import { Map , Marker } from "pigeon-maps"

const AddIncomingOrder = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/worker/incoming/shipment/${id}`, {
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

    const AddToDelivered = () => {
        const postData = {id};

        axios.post('http://127.0.0.1:8000/api/worker/incoming/shipment/addToDelivered', postData
        , {
        headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            window.location.href = '/worker/incoming/shipment';
        })
        .catch(error => {
            console.log(error);
        });
    }


    return (
            <div className='WorkerIncomingShipmentOrder_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Shipment Order ID: {id}</h1></div>
                        <div className='right_title'>
                            <button onClick={AddToDelivered}>Delivered</button>
                            <Link to={'/worker/incoming/shipment'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='order_table'>
                        <table className='WorkerIncomingShipmentOrder_table'>
                            <thead className='WorkerIncomingShipmentOrder_thead'>
                                <tr className=''>
                                    <th className='WorkerIncomingShipmentOrder_th top_left'>Company Name</th>
                                    <th className='WorkerIncomingShipmentOrder_th'>Total Price $</th>
                                    <th className='WorkerIncomingShipmentOrder_th top_right'>Placed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='WorkerIncomingShipmentOrder_tr'>
                                    <td className='WorkerIncomingShipmentOrder_td'>{order.user?.company_name || ''}</td>
                                    <td className='WorkerIncomingShipmentOrder_td'>{order.total_price}</td>
                                    <td className='WorkerIncomingShipmentOrder_td'>{order.placed_at}</td>
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
                        <table className='WorkerIncomingShipmentOrder_table'>
                            <thead className='WorkerIncomingShipmentOrder_thead'>
                                <tr className=''>
                                    <th className='WorkerIncomingShipmentOrder_th top_left'>Name</th>
                                    <th className='WorkerIncomingShipmentOrder_th'>Descritpion</th>
                                    <th className='WorkerIncomingShipmentOrder_th'>Category</th>
                                    <th className='WorkerIncomingShipmentOrder_th'>Price $</th>
                                    <th className='WorkerIncomingShipmentOrder_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='WorkerIncomingShipmentOrder_tr'>
                                        <td className='WorkerIncomingShipmentOrder_td'>{item.product.name}</td>
                                        <td className='WorkerIncomingShipmentOrder_td'>{item.product.description}</td>
                                        <td className='WorkerIncomingShipmentOrder_td'>{item.product.category.category}</td>
                                        <td className='WorkerIncomingShipmentOrder_td'>{item.product.price}</td>
                                        <td className='WorkerIncomingShipmentOrder_td'>{item.quantity}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>        
    );
}

export default AddIncomingOrder;