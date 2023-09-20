import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate, useRef } from 'react-router-dom';

import { Map , Marker } from "pigeon-maps"
import emailjs from '@emailjs/browser';

const AdminOutgoingPlacedOrder = () => {
    const navigate = useNavigate();
    localStorage.setItem("activeSection", "Incplaced");
    const { id } = useParams();
    const token = localStorage.getItem("token");
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 

    const [workers, setWorkers] = useState([]);
    const [selectedWorkerId, setSelectedWorkerId] = useState(0);

    const [error, setError] = useState("");
    
    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/placed/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);
            setLatitude(response.data.data.order.latitude);
            setLongitude(response.data.data.order.longitude);
            setOrder(response.data.data.order);
            setWorkers(response.data.data.workers);
            setOrderItems(response.data.data.order.order_items)
            setMapDataLoaded(true);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    const sendEmail = () => {
        const emailParams = {
          customer_name: order.customer?.name || '',
          order_id: id,
          company_name: order.user?.company_name || '',
          email: order.customer?.email || '',
        };
      
        emailjs.send('service_envn8ta', 'template_xin94y2', emailParams, 'k2mdBDZm5xIUKujvn')
          .then((response) => {
            console.log('Email sent:', response);
          })
          .catch((error) => {
            console.error('Email error:', error);
          });
    };


    const addToShipment = () => {
        if(selectedWorkerId === 0){
            setError("Select worker")
        }
        else{
            const postData = {id , selectedWorkerId};

            axios.post('http://127.0.0.1:8000/api/admin/outgoing/placed/selectWorker', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response)
                sendEmail();
                navigate('/admin/outgoing/shipment');
            })
            .catch(error => {
                console.log(error);
            });
        }
    }


    return (
            <div className='AdminOutgoingPlacedOrder_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Placed Order Number: {id}</h1></div>
                        <div className='right_title'>
                            <button onClick={addToShipment}>Add to Shipment</button>
                            <Link to={'/admin/outgoing/placed'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='order_table'>
                        <table className='AdminOutgoingPlacedOrder_table'>
                            <thead className='AdminOutgoingPlacedOrder_thead'>
                                <tr className=''>
                                    <th className='AdminOutgoingPlacedOrder_th top_left'>Company Name</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Customer Name</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Customer Email</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Customer Phone</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Total Price $</th>
                                    <th className='AdminOutgoingPlacedOrder_th top_right'>Placed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='AdminOutgoingPlacedOrder_tr'>
                                    <td className='AdminOutgoingPlacedOrder_td'>{order.user?.company_name || ''}</td>
                                    <td className='AdminOutgoingPlacedOrder_td'>{order.customer?.name}</td>
                                    <td className='AdminOutgoingPlacedOrder_td'>{order.customer?.email}</td>
                                    <td className='AdminOutgoingPlacedOrder_td'>{order.customer?.phone}</td>
                                    <td className='AdminOutgoingPlacedOrder_td'>{order.total_price}</td>
                                    <td className='AdminOutgoingPlacedOrder_td'>{order.placed_at}</td>
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
                        <table className='AdminOutgoingPlacedOrder_table'>
                            <thead className='AdminOutgoingPlacedOrder_thead'>
                                <tr className=''>
                                    <th className='AdminOutgoingPlacedOrder_th top_left'>Name</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Descritpion</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Category</th>
                                    <th className='AdminOutgoingPlacedOrder_th'>Price $</th>
                                    <th className='AdminOutgoingPlacedOrder_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='AdminOutgoingPlacedOrder_tr'>
                                        <td className='AdminOutgoingPlacedOrder_td'>{item.product.name}</td>
                                        <td className='AdminOutgoingPlacedOrder_td'>{item.product.description}</td>
                                        <td className='AdminOutgoingPlacedOrder_td'>{item.product.category.category}</td>
                                        <td className='AdminOutgoingPlacedOrder_td'>{item.product.price}</td>
                                        <td className='AdminOutgoingPlacedOrder_td'>{item.quantity}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>
                        
                    <div className='select_worker'>
                        <div className="halftext_feild">
                                <label>Select Worker</label>
                                <select
                                    className="creatableSelect half"
                                    value={selectedWorkerId}
                                    onChange={(e) => setSelectedWorkerId(e.target.value)}
                                    required
                                >
                                <option value="0">Select a worker</option>
                                {workers.map((worker) => (
                                    <option key={worker.id} value={worker.id}>
                                        {worker.first_name} {worker.last_name}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div >{error}</div>
                    </div>
                </div>
            </div>        
    );
}

export default AdminOutgoingPlacedOrder;