import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Map , Marker } from "pigeon-maps"

const PartnerIncomingOrder = () => {
    const navigate = useNavigate();
    localStorage.setItem("activeSection", "Incplaced");
    const { id } = useParams();
    const token = localStorage.getItem("token");
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 
    const [status, setStatus] = useState("placed");
    const [delivered, setDelivered] = useState()

    const [loading, setLoading] = useState(false)

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/partner/incoming/placed/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data)
            setLatitude(response.data.data.latitude);
            setLongitude(response.data.data.longitude);
            setOrder(response.data.data);
            setOrderItems(response.data.data.order_items)
            const orderStatus = response.data.data.status;
            setStatus(orderStatus);
            if(response.data.data.status === "delivered"){
                setDelivered(response.data.data.delivered_at)
            }
            setLoading(true)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    useEffect(() => {
        setMapDataLoaded(true);
    }, [longitude, latitude]);

    return (
            <div className='PartnerIncomingOrderDetail_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'>
                            <RiArrowDownSLine className='arrow' size={35} onClick={() => {navigate('/partner/incoming')}}/>
                            <h1>Order Number: {id}</h1>
                        </div>
                    </div>
                    {loading &&
                    <div className='orderInfo'>
                        <div className='right_section'>
                            <div className='order_table'>
                                <table className='PartnerIncomingOrderDetail_table'>
                                    <tr className='PartnerIncomingOrderDetail_tr '>
                                        <th className='PartnerIncomingOrderDetail_th top_left'>Total Price $</th>
                                        <td className='PartnerIncomingOrderDetail_td top_right'>{order.total_price}</td>
                                    </tr>
                                    <tr className='PartnerIncomingOrderDetail_tr'>
                                        <th className='PartnerIncomingOrderDetail_th'>Placed At</th>
                                        <td className='PartnerIncomingOrderDetail_td'>{order.placed_at}</td>
                                    </tr>
                                    {delivered &&
                                    <tr className='PartnerIncomingOrderDetail_tr'>
                                        <th className='PartnerIncomingOrderDetail_th'>Delivered At</th>
                                        <td className='PartnerIncomingOrderDetail_td' >{delivered}</td>
                                    </tr>
                                    }
                                    <tr className='PartnerIncomingOrderDetail_tr'>
                                        <th className='PartnerIncomingOrderDetail_th bottom_left'>Status</th>
                                        <td className='PartnerIncomingOrderDetail_td bottom_right' >{status}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <div className="left_section">
                            {mapDataLoaded && (
                                <div className='mapContainer'>
                                    <Map
                                        height={410}
                                        // default+Center={[latitude, longitude]}
                                        defaultZoom={13}
                                        center={[latitude, longitude]}
                                    >
                                        <Marker width={50} anchor={[ latitude, longitude]} />
                                    </Map>
                                </div>
                            )}
                        </div>
                    </div>}
                    
                    {loading &&
                    <div className='product_table'>
                        <h2>Order Items:</h2>
                        <table className='PartnerIncomingProduct_table'>
                            <thead className='PartnerIncomingProduct_thead'>
                                <tr className=''>
                                    <th className='PartnerIncomingProduct_th top_left'>Name</th>
                                    <th className='PartnerIncomingProduct_th'>Descritpion</th>
                                    <th className='PartnerIncomingProduct_th'>Category</th>
                                    <th className='PartnerIncomingProduct_th'>Price $</th>
                                    <th className='PartnerIncomingProduct_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='PartnerIncomingProduct_tr'>
                                        <td className='PartnerIncomingProduct_td'>{item.product.name}</td>
                                        <td className='PartnerIncomingProduct_td'>{item.product.description}</td>
                                        <td className='PartnerIncomingProduct_td'>{item.product.category.category}</td>
                                        <td className='PartnerIncomingProduct_td'>{item.product.price}</td>
                                        <td className='PartnerIncomingProduct_td'>{item.quantity}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>
                    }         
                </div>
            </div>        
    );
}

export default PartnerIncomingOrder;