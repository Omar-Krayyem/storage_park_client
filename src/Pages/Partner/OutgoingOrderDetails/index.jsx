import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Map , Marker } from "pigeon-maps"

const OutgoingOrderDetail = () => {
    const navigate = useNavigate();
    localStorage.setItem("activeSection", "Incplaced");
    const { id } = useParams();
    const token = localStorage.getItem("token");
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    
    const [order, setOrder] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 
    const [status, setStatus] = useState("placed");
    const [delivered, setDelivered] = useState()

    const [loading, setLoading] = useState(false)

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/partner/outgoing/placed/${id}`, {
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
            setMapDataLoaded(true);
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

    return (
            <div className='PartnerOutgoingOrderDetail_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'>
                            <RiArrowDownSLine className='arrow' size={35} onClick={() => {navigate('/partner/outgoing')}}/>
                            <h1>Order Number: {id}</h1>
                        </div>
                    </div>
                    {loading &&
                    <div className='orderInfo'>
                        <div className='right_section'>
                            <div className='order_table'>
                                <table className='PartnerOutgoingOrderDetail_table'>
                                    <tr className='PartnerOutgoingOrderDetail_tr '>
                                        <th className='PartnerOutgoingOrderDetail_th top_left'>Customer Name</th>
                                        <td className='PartnerOutgoingOrderDetail_td top_right' >{order.customer?.name || ''}</td>
                                    </tr>
                                    <tr className='PartnerOutgoingOrderDetail_tr'>
                                        <th className='PartnerOutgoingOrderDetail_th'>Customer Email</th>
                                        <td className='PartnerOutgoingOrderDetail_td' >{order.customer?.email || ''}</td>
                                    </tr>
                                    <tr className='PartnerOutgoingOrderDetail_tr'>
                                        <th className='PartnerOutgoingOrderDetail_th'>Customer Phone</th>
                                        <td className='PartnerOutgoingOrderDetail_td' >{order.customer?.phone || ''}</td>
                                    </tr>
                                    <tr className='PartnerOutgoingOrderDetail_tr'>
                                        <th className='PartnerOutgoingOrderDetail_th'>Total Price $</th>
                                        <td className='PartnerOutgoingOrderDetail_td'>{order.total_price}</td>
                                    </tr>
                                    <tr className='PartnerOutgoingOrderDetail_tr'>
                                        <th className='PartnerOutgoingOrderDetail_th'>Placed At</th>
                                        <td className='PartnerOutgoingOrderDetail_td'>{order.placed_at}</td>
                                    </tr>
                                    {delivered &&
                                    <tr className='PartnerOutgoingOrderDetail_tr'>
                                        <th className='PartnerOutgoingOrderDetail_th'>Delivered At</th>
                                        <td className='PartnerOutgoingOrderDetail_td' >{delivered}</td>
                                    </tr>
                                    }
                                    <tr className='PartnerOutgoingOrderDetail_tr'>
                                        <th className='PartnerOutgoingOrderDetail_th bottom_left'>Status</th>
                                        <td className='PartnerOutgoingOrderDetail_td bottom_right' >{status}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <div className="left_section">
                            {mapDataLoaded && (
                                <div className='mapContainer'>
                                    <Map
                                        height={310}
                                        defaultCenter={[latitude, longitude]}
                                        defaultZoom={13}
                                    >
                                        <Marker width={50} anchor={[longitude, latitude]} />
                                    </Map>
                                </div>
                            )}
                        </div>
                    </div>}
                    {loading &&
                    <div className='product_table'>
                        <h2>Order Items:</h2>
                        <table className='PartnerOutgoingProduct_table'>
                            <thead className='PartnerOutgoingProduct_thead'>
                                <tr className=''>
                                    <th className='PartnerOutgoingProduct_th top_left'>Name</th>
                                    <th className='PartnerOutgoingProduct_th'>Descritpion</th>
                                    <th className='PartnerOutgoingProduct_th'>Category</th>
                                    <th className='PartnerOutgoingProduct_th'>Price $</th>
                                    <th className='PartnerOutgoingProduct_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='PartnerOutgoingProduct_tr'>
                                        <td className='PartnerOutgoingProduct_td'>{item.product.name}</td>
                                        <td className='PartnerOutgoingProduct_td'>{item.product.description}</td>
                                        <td className='PartnerOutgoingProduct_td'>{item.product.category.category}</td>
                                        <td className='PartnerOutgoingProduct_td'>{item.product.price}</td>
                                        <td className='PartnerOutgoingProduct_td'>{item.quantity}</td>
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

export default OutgoingOrderDetail;