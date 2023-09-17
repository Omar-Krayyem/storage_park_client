import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';

import { Map , Marker } from "pigeon-maps"
import AdminLayout from '../../../utils/AdminLayout';



const AdminIncomingShipmentOrder = () => {
    localStorage.setItem("activeSection", "Incshipment");
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [worker, setWorker] = useState("");
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/incoming/shipment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);
            setLatitude(response.data.data.latitude);
            setLongitude(response.data.data.longitude);
            setOrder(response.data.data);
            setWorker(`${response.data.data.worker.first_name}  ${response.data.data.worker.last_name}`)
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
        <AdminLayout>
            <div className='AdminIncomingShipmentOrder_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Placed Order ID: {id}</h1></div>
                        <div className='right_title'>
                            <Link to={'/admin/incoming/shipment'}><button>Back</button></Link>
                        </div>
                    </div>

                        
                    <div className='order_table'>
                        <table className='AdminIncomingShipmentOrder_table'>
                            <thead className='AdminIncomingShipmentOrder_thead'>
                                <tr className=''>
                                    <th className='AdminIncomingShipmentOrder_th top_left'>Company Name</th>
                                    <th className='AdminIncomingShipmentOrder_th'>Total Price $</th>
                                    <th className='AdminIncomingShipmentOrder_th top_right'>Placed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='AdminIncomingShipmentOrder_tr'>
                                    <td className='AdminIncomingShipmentOrder_td'>{order.user?.company_name || ''}</td>
                                    <td className='AdminIncomingShipmentOrder_td'>{order.total_price}</td>
                                    <td className='AdminIncomingShipmentOrder_td'>{order.placed_at}</td>
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
                        <table className='AdminIncomingShipmentOrder_table'>
                            <thead className='AdminIncomingShipmentOrder_thead'>
                                <tr className=''>
                                    <th className='AdminIncomingShipmentOrder_th top_left'>Name</th>
                                    <th className='AdminIncomingShipmentOrder_th'>Descritpion</th>
                                    <th className='AdminIncomingShipmentOrder_th'>Category</th>
                                    <th className='AdminIncomingShipmentOrder_th'>Price $</th>
                                    <th className='AdminIncomingShipmentOrder_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='AdminIncomingShipmentOrder_tr'>
                                        <td className='AdminIncomingShipmentOrder_td'>{item.product.name}</td>
                                        <td className='AdminIncomingShipmentOrder_td'>{item.product.description}</td>
                                        <td className='AdminIncomingShipmentOrder_td'>{item.product.category.category}</td>
                                        <td className='AdminIncomingShipmentOrder_td'>{item.product.price}</td>
                                        <td className='AdminIncomingShipmentOrder_td'>{item.quantity}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <div className="halftext_feild ">
                            <label>Selected Worker</label>
                            <input
                                className='creatableSelect'
                                type="text"
                                required
                                value={worker}
                                disabled
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
        
    );
}

export default AdminIncomingShipmentOrder;