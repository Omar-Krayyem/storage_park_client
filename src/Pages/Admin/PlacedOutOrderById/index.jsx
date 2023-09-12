import './style.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';

import { Map , Marker } from "pigeon-maps"



const AdminOutgoingPlacedOrder = () => {
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


    const addToShipment = () => {
        if(selectedWorkerId === 0){
            setError("Select worker")
        }
        else{
            const postData = {id , selectedWorkerId};
            console.log(postData)

            axios.post('http://127.0.0.1:8000/api/admin/outgoing/placed/selectWorker', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                window.location.href = '/admin/outgoing/shipment';
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

                    <div className='Order_Info'>
                        
                        <div className='info_row'>
                            <h2>Order Info:</h2>
                            <div className="halftext_feild">
                                <label>Company Name</label>
                                <input
                                    className='Q'
                                    type="text"
                                    required
                                    value={order.user?.company_name || ''}
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild">
                                <label>Total Price</label>
                                <input
                                    className='Q'
                                    type="text"
                                    required
                                    value={order.total_price}
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>Placed At</label>
                                <input
                                    className='Q'
                                    type="text"
                                    required
                                    value={order.placed_at}
                                    disabled
                                ></input>
                            </div>
                        </div>

                        <div className='info_row'>
                            <h2>Customer Info:</h2>
                            <div className="halftext_feild">
                                <label>Name</label>
                                <input
                                    className='Q'
                                    type="text"
                                    required
                                    value={order.customer?.name}
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild">
                                <label>Email</label>
                                <input
                                    className='half'
                                    type="text"
                                    required
                                    value={order.customer?.email}
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>Phone</label>
                                <input
                                    className='Q'
                                    type="text"
                                    required
                                    value={order.customer?.phone}
                                    disabled
                                ></input>
                            </div>
                        </div>

                        <div className='info_row'>
                            <h2>Location Info:</h2>
                            <div className="halftext_feild">
                                <label>Latitude</label>
                                <input
                                    className='half'
                                    type="text"
                                    required
                                    value={latitude}
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>Longitude</label>
                                <input
                                    className='half'
                                    type="text"
                                    required
                                    value={longitude}
                                    disabled
                                ></input>
                            </div>
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
                    </div>

                    <div className='products_section'>
                        <h2>Order Items:</h2>
                        <div className='display_products'>
                            {orderItems.map((item, index) => (
                                <div className='display_product' key={index}>
                                    <div className='attributes'>
                                        <div><span>Name: </span>{item.product.name}</div>
                                        <div><span>Description: </span>{item.product.description}</div>
                                        <div><span>Category: </span>{item.product.category.category}</div>
                                        <div><span>Price: </span>{item.product.price}$</div>
                                        <div><span>Quantity: </span>{item.quantity}</div>
                                    </div>
                                </div>
                            ))}         
                        </div>
                    </div>
                        
                    <div className='select_worker'>
                        <div className="halftext_feild">
                                <label>Select Worker</label>
                                <select
                                    className="half"
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
            {/* </div> */}
        </div>
    );
}

export default AdminOutgoingPlacedOrder;