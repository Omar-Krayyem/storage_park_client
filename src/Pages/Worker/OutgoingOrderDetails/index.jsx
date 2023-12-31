import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Map , Marker } from "pigeon-maps"

const WorkerOutgoingOrder = () => {
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
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false)

    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/worker/outgoing/shipment/${id}`, {
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
            if(response.data.data.status !== "shipment"){
                setDisplay(true)
            }
            
            setLoading(true)
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
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            console.log(formattedDate);
            setDelivered(formattedDate)
            setDisplay(true)
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        setMapDataLoaded(true);
    }, [longitude, latitude]);

    return (
            <div className='WorkerOutgoingOrderDetail_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'>
                            <RiArrowDownSLine className='arrow' size={35} onClick={() => {navigate('/worker/outgoing')}}/>
                            <h1>Order Number: {id}</h1>
                        </div>
                    </div>
                    {loading &&
                    <div className='orderInfo'>
                        <div className='right_section'>
                            <div className='order_table'>
                                <table className='WorkerOutgoingOrderDetail_table'>
                                    <tr className='WorkerOutgoingOrderDetail_tr'>
                                        <th className='WorkerOutgoingOrderDetail_th top_left'>Company Name</th>
                                        <td className='WorkerOutgoingOrderDetail_td top_right' >{order.user?.company_name || ''}</td>
                                    </tr>
                                    <tr className='WorkerOutgoingOrderDetail_tr'>
                                        <th className='WorkerOutgoingOrderDetail_th'>Customer Name</th>
                                        <td className='WorkerOutgoingOrderDetail_td' >{order.customer?.name || ''}</td>
                                    </tr>
                                    <tr className='WorkerOutgoingOrderDetail_tr'>
                                        <th className='WorkerOutgoingOrderDetail_th'>Customer Email</th>
                                        <td className='WorkerOutgoingOrderDetail_td' >{order.customer?.email || ''}</td>
                                    </tr>
                                    <tr className='WorkerOutgoingOrderDetail_tr'>
                                        <th className='WorkerOutgoingOrderDetail_th'>Customer Phone</th>
                                        <td className='WorkerOutgoingOrderDetail_td' >{order.customer?.phone || ''}</td>
                                    </tr>
                                    <tr className='WorkerOutgoingOrderDetail_tr'>
                                        <th className='WorkerOutgoingOrderDetail_th'>Total Price $</th>
                                        <td className='WorkerOutgoingOrderDetail_td'>{order.total_price}</td>
                                    </tr>
                                    <tr className='WorkerOutgoingOrderDetail_tr'>
                                        <th className='WorkerOutgoingOrderDetail_th'>Placed At</th>
                                        <td className='WorkerOutgoingOrderDetail_td'>{order.placed_at}</td>
                                    </tr>
                                    {delivered && (
                                        <tr className='WorkerOutgoingOrderDetail_tr'>
                                            <th className='WorkerOutgoingOrderDetail_th'>Delivered At</th>
                                            <td className='WorkerOutgoingOrderDetail_td'>{delivered}</td>
                                        </tr>
                                    )}
                                    {display ? (
                                        <tr className='WorkerOutgoingOrderDetail_tr'>
                                            <th className='WorkerOutgoingOrderDetail_th bottom_left'>Status</th>
                                            <td className='WorkerOutgoingOrderDetail_td bottom_right'>{status}</td>
                                        </tr>
                                    ) : (
                                    <>
                                        <tr className='WorkerOutgoingOrderDetail_tr'>
                                            <th className='WorkerOutgoingOrderDetail_th'>Status</th>
                                            <td className='WorkerOutgoingOrderDetail_td' >{status}</td>
                                        </tr>
                                        <tr className='WorkerOutgoingOrderDetail_tr'>
                                            <th className='WorkerOutgoingOrderDetail_th bottom_left'></th>
                                            <td className='WorkerOutgoingOrderDetail_td bottom_right' >
                                                <button onClick={AddToDelivered}>Delivered</button>
                                            </td>
                                        </tr>
                                    </>
                                    )}
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
                        <table className='WorkerOutgoingProduct_table'>
                            <thead className='WorkerOutgoingProduct_thead'>
                                <tr className=''>
                                    <th className='WorkerOutgoingProduct_th top_left'>Name</th>
                                    <th className='WorkerOutgoingProduct_th'>Descritpion</th>
                                    <th className='WorkerOutgoingProduct_th'>Category</th>
                                    <th className='WorkerOutgoingProduct_th'>Price $</th>
                                    <th className='WorkerOutgoingProduct_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='WorkerOutgoingProduct_tr'>
                                        <td className='WorkerOutgoingProduct_td'>{item.product.name}</td>
                                        <td className='WorkerOutgoingProduct_td'>{item.product.description}</td>
                                        <td className='WorkerOutgoingProduct_td'>{item.product.category.category}</td>
                                        <td className='WorkerOutgoingProduct_td'>{item.product.price}</td>
                                        <td className='WorkerOutgoingProduct_td'>{item.quantity}</td>
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

export default WorkerOutgoingOrder;