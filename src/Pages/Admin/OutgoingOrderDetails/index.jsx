import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Map , Marker } from "pigeon-maps"

const AdminOutgoingOrderDetail = () => {
    const navigate = useNavigate();
    localStorage.setItem("activeSection", "Incplaced");
    const { id } = useParams();
    const token = localStorage.getItem("token");
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    console.log("lat: ", latitude,"long: ", longitude)
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [mapDataLoaded, setMapDataLoaded] = useState(false); 
    const [status, setStatus] = useState("placed");
    const [delivered, setDelivered] = useState()
    const [display, setDisplay] = useState(false);

    const [loading, setLoading] = useState(false)
    const [workers, setWorkers] = useState([]);
    const [selectedWorkerId, setSelectedWorkerId] = useState(0);
    const [selectedWorkerName, setSelectedWorkerName] = useState();
    
    const [error, setError] = useState("");
    const getOrder = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/outgoing/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data)
            setLatitude(response.data.data.order.latitude);
            setLongitude(response.data.data.order.longitude);
            console.log("la: ", response.data.data.order.latitude);
            console.log("lo: ", response.data.data.order.longitude);
            setOrder(response.data.data.order);
            setWorkers(response.data.data.workers);
            setOrderItems(response.data.data.order.order_items)
            const orderStatus = response.data.data.order.status;
            setStatus(orderStatus);
            if(response.data.data.order.status !== "placed"){
                setSelectedWorkerName(`${response.data.data.order.worker.first_name} ${response.data.data.order.worker.last_name}`)
                setDisplay(true)
            }
            if(response.data.data.order.status === "delivered"){
                setDelivered(response.data.data.order.delivered_at)
            }
            
            setLoading(true)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getOrder();
        setMapDataLoaded(true);
    }, [longitude, latitude]);


    const addToShipment = () => {        
        if(selectedWorkerId === 0){
            setError("Select worker")
        }
        else{
            const postData = {id , selectedWorkerId};
            console.log(postData)

            axios.post('http://127.0.0.1:8000/api/admin/incoming/placed/selectWorker', postData, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setStatus("shipment")
                setDisplay(true)
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const handleWorkerSelection = (e) => {
        const selectedId = e.target.value;
        setSelectedWorkerId(selectedId);
        const selectedWorker = workers.find(worker => worker.id === parseInt(selectedId));
        setSelectedWorkerName(selectedWorker ? `${selectedWorker.first_name} ${selectedWorker.last_name}` : "");
    }


    return (
            <div className='AdminOutgoingOrderDetail_page'>
                <div className='body'>
                    <div className='title'>
                        <div className='page_title'>
                            <RiArrowDownSLine className='arrow' size={35} onClick={() => {navigate('/admin/outgoing')}}/>
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
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Employee</th>
                                        <td className='AdminIncomingPlacedOrder_td'>
                                            {display ? (
                                                <>{selectedWorkerName}</>
                                            ) : (
                                                <select
                                                    className="creatableSelect half"
                                                    value={selectedWorkerId}
                                                    onChange={handleWorkerSelection}
                                                    required
                                                >
                                                    <option value="0">Employees</option>
                                                    {workers.map((worker) => (
                                                        <option key={worker.id} value={worker.id}>
                                                            {worker.first_name} {worker.last_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </td>
                                    </tr>
                                    {delivered &&
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th'>Delivered At</th>
                                        <td className='AdminIncomingPlacedOrder_td' >{delivered}</td>
                                    </tr>
                                    }

                                    {display &&
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th bottom_left'>Status</th>
                                        <td className='AdminIncomingPlacedOrder_td bottom_right' >{status}</td>
                                    </tr>
                                    }       
                                    
                                    
                                    {!display &&
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                    <th className='AdminIncomingPlacedOrder_th '>Status</th>
                                    <td className='AdminIncomingPlacedOrder_td' >{status}</td>
                                    </tr>
                                    }
                                    {!display &&
                                    <tr className='AdminIncomingPlacedOrder_tr'>
                                        <th className='AdminIncomingPlacedOrder_th bottom_left'></th>
                                        <td className='AdminIncomingPlacedOrder_td bottom_right' ><button onClick={addToShipment}>Assign Employee</button></td>
                                    </tr>
                                    }
                                </table>
                            </div>
                            {!display &&
                                <div className='btn_section'>
                                    {error && <div className='error'>{error}</div>}
                                    
                                </div>
                            }
                        </div>
                        
                        <div className="left_section">
                            {mapDataLoaded && (
                                <div className='mapContainer'>
                                    <Map
                                        height={410}
                                        defaultCenter={[latitude, longitude]}
                                        defaultZoom={13}
                                    >
                                        <Marker width={50} anchor={[ longitude, latitude]} />
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

export default AdminOutgoingOrderDetail;