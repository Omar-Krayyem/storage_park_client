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
        <div className='PartnerOutgoingPlacedOrder_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'><h1>Placed Order Number: {id}</h1></div>
                        <div className='right_title'>
                            <Link to={'/partner/outgoing/placed'}><button>Back</button></Link>
                        </div>
                    </div>

                    <div className='Order_Info'>
                        
                        <div className='info_row'>
                            <h2>Order Info:</h2>
                            <div className="halftext_feild">
                                <label>Total Price</label>
                                <input
                                    className='half'
                                    type="text"
                                    required
                                    value={order.total_price}
                                    disabled
                                ></input>
                            </div>
                            <div className="halftext_feild ">
                                <label>Placed At</label>
                                <input
                                    className='half'
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
                        
                        <h2>Location Info:</h2>
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
                </div>
        </div>
    );
}

export default PartnerOutgoingPlacedOrder;