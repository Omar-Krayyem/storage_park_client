import './style.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PieChart from '../../../components/Admin/pieChart';
import Barchart from '../../../components/Admin/Barchart';
import AdminLayout from '../../../utils/AdminLayout';

const Dashboard = () => {

    const [ requests , setRequests] = useState(0);
    const [ partners , setPartners] = useState(0);
    const [ workers , setWorkers] = useState(0);

    const [ placedInc , setPlacedInc] = useState(0);
    const [ shipmentInc , setShipmentInc] = useState(0);
    const [ deliveredInc , setDeliveredInc] = useState(0);

    const [ placedOut , setPlacedOut] = useState(0);
    const [ shipmentOut , setShipmentOut] = useState(0);
    const [ deliveredOut , setDeliveredOut] = useState(0);

    const [categories, setCategories] = useState([]);

    

      const token = localStorage.getItem("token");

        const getUser = async () => {
            await axios.get(`http://127.0.0.1:8000/api/admin/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.data)
                setRequests(response.data.data.requests)
                setPartners(response.data.data.partner)
                setWorkers(response.data.data.worker)

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
        <AdminLayout>
            <div className='AdminDashboard_page'> 
                <div className='body'>
                <div className='title'><h1>Dashboard</h1></div>
                    <div className='records'>
                        <div className='record'>
                            <span>{requests}</span>Requests
                        </div>
                        <div className='record'>
                            <span>{partners}</span>Partners
                        </div>
                        <div className='record'>
                            <span>{workers}</span>Workers
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
        </AdminLayout>
        
    );
}

export default Dashboard;