import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PieChart from '../../../components/Admin/pieChart';
import Barchart from '../../../components/Admin/Barchart';
import PartnerLayout from '../../../utils/PartnerLayout';

const Dashboard = () => {

    const [ orders , setOrders] = useState(0);
    const [ products , setProducts] = useState(0);
    const [ items , setItems] = useState(0);

    const [ placedInc , setPlacedInc] = useState(0);
    const [ shipmentInc , setShipmentInc] = useState(0);
    const [ deliveredInc , setDeliveredInc] = useState(0);

    const [ placedOut , setPlacedOut] = useState(0);
    const [ shipmentOut , setShipmentOut] = useState(0);
    const [ deliveredOut , setDeliveredOut] = useState(0);

    const token = localStorage.getItem("token");

        const getUser = async () => {
            await axios.get(`http://127.0.0.1:8000/api/partner/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.data)
                setOrders(response.data.data.order_count)
                setProducts(response.data.data.product_count)
                setItems(response.data.data.item_count)

                setPlacedInc(response.data.data.placedInc)
                setShipmentInc(response.data.data.shipmentInc)
                setDeliveredInc(response.data.data.deliveredInc)

                setPlacedOut(response.data.data.placedOut)
                setShipmentOut(response.data.data.shipmentOut)
                setDeliveredOut(response.data.data.deliveredOut)

                setCategories(response.data.data.category)
            })
            .catch(error => {
                console.log(error);
            });    
        };

        useEffect(() => {
            getUser();
        }, []);


    const [categories, setCategories] = useState([]);
    const BarData = [
        {
          name: 'Placed Orders',
          outgoing: placedOut,
          incoming: placedInc,
          amt: 2400,
        },
        {
          name: 'shipment Orders',
          outgoing: shipmentOut,
          incoming: shipmentInc,
          amt: 2210,
        },
        {
          name: 'Delivered Orders',
          outgoing: deliveredOut,
          incoming: deliveredInc,
          amt: 2290,
        }
      ];

    const PieData = categories.map((category) => (
        { name: category.category, value: category.products_count }
    ));

    return (
        <PartnerLayout> 
            <div className='AdminDashboard_page'> 
                <div className='body'>
                <div className='title'><h1>Dashboard</h1></div>
                    <div className='records'>
                        <div className='record'>
                            <span>{orders}</span>Orders
                        </div>
                        <div className='record'>
                            <span>{products}</span>Products
                        </div>
                        <div className='record'>
                            <span>{items}</span>Items
                        </div>
                    </div>
                    <div className='graphs'>
                    <div className='barChart'>
                            <h2>Numbers of Orders</h2>
                            <Barchart data={BarData}/>
                        </div>
                        <div className='pieChart'>
                            <h2>Stored Product Categories</h2>
                            <PieChart data={PieData} width={1200} height={1200} />
                        </div>
                    </div>
                </div>
            </div>
        </PartnerLayout>
    );
}

export default Dashboard;