import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Map , Marker } from "pigeon-maps"

const AdminIncomingPlacedOrder = () => {
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
            setMapDataLoaded(true);
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

    return (
            <div className='AdminIncomingPlacedOrder_page'>
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
                                <table className='AdminIncomingPlacedOrder_table'>
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th top_left'>Company Name</th>
                                        <td className='AdminIncomingPlacedOrder_td top_right' >{order.user?.company_name || ''}</td>
                                    </tr>
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Customer Name</th>
                                        <td className='AdminIncomingPlacedOrder_td' >{order.customer?.name || ''}</td>
                                    </tr>
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Customer Email</th>
                                        <td className='AdminIncomingPlacedOrder_td' >{order.customer?.email || ''}</td>
                                    </tr>
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Customer Phone</th>
                                        <td className='AdminIncomingPlacedOrder_td' >{order.customer?.phone || ''}</td>
                                    </tr>
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Total Price $</th>
                                        <td className='AdminIncomingPlacedOrder_td'>{order.total_price}</td>
                                    </tr>
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Placed At</th>
                                        <td className='AdminIncomingPlacedOrder_td'>{order.placed_at}</td>
                                    </tr>
                                    {delivered && (
                                        <tr className='AdminIncomingPlacedOrder_tr'>
                                            <th className='AdminIncomingPlacedOrder_th'>Delivered At</th>
                                            <td className='AdminIncomingPlacedOrder_td'>{delivered}</td>
                                        </tr>
                                    )}
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th bottom_left'>Status</th>
                                        <td className='AdminIncomingPlacedOrder_td bottom_right' >{status}</td>
                                    </tr>
                                </table>   
                            </div>
                            {!display &&
                                <div className='btn_section'>
                                    <button onClick={AddToDelivered}>Assign Employee</button>
                                </div>
                            }
                        </div>
                        
                        <div className="left_section">
                            {mapDataLoaded && (
                                <div className='mapContainer'>
                                    <Map
                                        height={230}
                                        defaultCenter={[latitude, longitude]}
                                        defaultZoom={13}
                                    >
                                        <Marker width={50} anchor={[latitude, longitude]} />
                                    </Map>
                                </div>
                            )}
                        </div>
                    </div>}
                    {loading &&
                    <div className='product_table'>
                        <h2>Order Items:</h2>
                        <table className='AdminIncomingProduct_table'>
                            <thead className='AdminIncomingProduct_thead'>
                                <tr className=''>
                                    <th className='AdminIncomingProduct_th top_left'>Name</th>
                                    <th className='AdminIncomingProduct_th'>Descritpion</th>
                                    <th className='AdminIncomingProduct_th'>Category</th>
                                    <th className='AdminIncomingProduct_th'>Price $</th>
                                    <th className='AdminIncomingProduct_th top_right'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr className='AdminIncomingProduct_tr'>
                                        <td className='AdminIncomingProduct_td'>{item.product.name}</td>
                                        <td className='AdminIncomingProduct_td'>{item.product.description}</td>
                                        <td className='AdminIncomingProduct_td'>{item.product.category.category}</td>
                                        <td className='AdminIncomingProduct_td'>{item.product.price}</td>
                                        <td className='AdminIncomingProduct_td'>{item.quantity}</td>
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

export default AdminIncomingPlacedOrder;