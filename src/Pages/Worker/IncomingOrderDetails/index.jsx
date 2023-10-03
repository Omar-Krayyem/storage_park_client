import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Map , Marker } from "pigeon-maps"

const WorkerIncomingOrder = () => {
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
            const response = await axios.get(`http://127.0.0.1:8000/api/worker/incoming/shipment/${id}`, {
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
            const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
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
            <div className='WorkerIncomingOrderDetail_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'>
                            <RiArrowDownSLine className='arrow' size={35} onClick={() => {navigate('/worker/incoming')}}/>
                            <h1>Order Number: {id}</h1>
                        </div>
                    </div>
                    {loading &&
                    <div className='orderInfo'>
                        <div className='right_section'>
                            <div className='order_table'>
                                <table className='WorkerIncomingOrderDetail_table'>
                                    <tr className='WorkerIncomingOrderDetail_tr'>
                                        <th className='WorkerIncomingOrderDetail_th top_left'>Company Name</th>
                                        <td className='WorkerIncomingOrderDetail_td top_right' >{order.user?.company_name || ''}</td>
                                    </tr>
                                    <tr className='WorkerIncomingOrderDetail_tr'>
                                        <th className='WorkerIncomingOrderDetail_th'>Total Price $</th>
                                        <td className='WorkerIncomingOrderDetail_td'>{order.total_price}</td>
                                    </tr>
                                    <tr className='WorkerIncomingOrderDetail_tr'>
                                        <th className='WorkerIncomingOrderDetail_th'>Placed At</th>
                                        <td className='WorkerIncomingOrderDetail_td'>{order.placed_at}</td>
                                    </tr>
                                    {delivered && (
                                        <tr className='WorkerIncomingOrderDetail_tr'>
                                            <th className='WorkerIncomingOrderDetail_th'>Delivered At</th>
                                            <td className='WorkerIncomingOrderDetail_td'>{delivered}</td>
                                        </tr>
                                    )}
                                    {display ? (
                                        <tr className='WorkerIncomingOrderDetail_tr'>
                                            <th className='WorkerIncomingOrderDetail_th bottom_left'>Status</th>
                                            <td className='WorkerIncomingOrderDetail_td bottom_right'>{status}</td>
                                        </tr>
                                    ) : (
                                    <>
                                        <tr className='WorkerIncomingOrderDetail_tr'>
                                            <th className='WorkerIncomingOrderDetail_th'>Status</th>
                                            <td className='WorkerIncomingOrderDetail_td' >{status}</td>
                                        </tr>
                                        <tr className='WorkerIncomingOrderDetail_tr'>
                                            <th className='WorkerIncomingOrderDetail_th bottom_left'></th>
                                            <td className='WorkerIncomingOrderDetail_td bottom_right' >
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
                        <table className='WorkerIncomingProduct_table'>
                            <thead className='WorkerIncomingProduct_thead'>
                                <tr className=''>
                                    <th className='WorkerIncomingProduct_th top_left'>Name</th>
                                    <th className='WorkerIncomingProduct_th'>Descritpion</th>
                                    <th className='WorkerIncomingProduct_th'>Category</th>
                                    <th className='WorkerIncomingProduct_th'>Price $</th>
                                    <th className='WorkerIncomingProduct_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='WorkerIncomingProduct_tr'>
                                        <td className='WorkerIncomingProduct_td'>{item.product.name}</td>
                                        <td className='WorkerIncomingProduct_td'>{item.product.description}</td>
                                        <td className='WorkerIncomingProduct_td'>{item.product.category.category}</td>
                                        <td className='WorkerIncomingProduct_td'>{item.product.price}</td>
                                        <td className='WorkerIncomingProduct_td'>{item.quantity}</td>
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

export default WorkerIncomingOrder;