import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
// import { NavLink } from 'react-router-dom';

import Landing from './Pages/Landing';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register'

import AdminDashboard from './Pages/Admin/Dashboard';
import Requests from './Pages/Admin/Requests/index';
import Partners from './Pages/Admin/Partners';
import Workers from './Pages/Admin/Workers';
import AdminStock from './Pages/Admin/Stock';
import AdminPlacedIncoming from './Pages/Admin/PlacedIncoming';
import AdminPlacedIncomingById from './Pages/Admin/PlacedOrderById';
import AdminShipmentIncoming from './Pages/Admin/ShipmentIncoming';
import AdminShipmentIncomingById from './Pages/Admin/ShipmentOrderById';
import AdminDeliveredIncoming from './Pages/Admin/DeliveredIncoming';
import AdminDeliveredOrderById from './Pages/Admin/DeliveredOrderById';
import AdminPlacedOutgoing from './Pages/Admin/PlacedOutgoing';
import AdminPlacedOutgoingById from './Pages/Admin/PlacedOutOrderById';
import AdminShipmentOutgoing from './Pages/Admin/ShipmentOutgoing';
import AdminShipmentOutgoingById from './Pages/Admin/ShipmentOutOrderById';
import AdminDeliveredOutgoing from './Pages/Admin/DeliveredOutgoing';
import AdminDeliveredOutOrderById from './Pages/Admin/DeliveredOutOrderById';
import AdminProfile from './Pages/Admin/Profile';
import AdminLayout from './utils/AdminLayout';

import PartnerDashboard from './Pages/Partner/Dashboard';
import PlacedIncoming from './Pages/Partner/PlacedIncoming';
import PlacedIncomingById from './Pages/Partner/PlacedOrderById';
import AddIncomingorder from './Pages/Partner/AddIncomingorder';
import ShipmentIncoming from './Pages/Partner/ShipmentIncoming';
import ShipmentIncomingById from './Pages/Partner/ShipmentOrderById';
import DeliveredIncoming from './Pages/Partner/DeliveredIncoming';
import DeliveredOrderById from './Pages/Partner/DeliveredOrderById';
import PartnerStock from './Pages/Partner/Stock';
import PlacedOutgoing from './Pages/Partner/PlacedOutgoing';
import AddOutgoingOrder from './Pages/Partner/AddOutgoingOrder';
import PlacedOutOrderById from './Pages/Partner/PlacedOutOrderById';
import ShipmentOutgoing from './Pages/Partner/ShipmentOutgoing';
import ShipmentOutOrderById from './Pages/Partner/ShipmentOutOrderById';
import DeliveredOutgoing from './Pages/Partner/DeliveredOutgoing';
import DeliveredOutOrderById from './Pages/Partner/DeliveredOutOrderById';
import PartnerProfile from './Pages/Partner/Profile';
import PartnerLayout from './utils/PartnerLayout';

import WorkerDashboard from './Pages/Worker/Dashboard';
import WorkerShipmentIncoming from './Pages/Worker/ShipmentIncoming';
import WorkerShipmentIncomingById from './Pages/Worker/ShipmentOrderById';
import WorkerDeliveredIncoming from './Pages/Worker/DeliveredIncoming';
import WorkerDeliveredOrderById from './Pages/Worker/DeliveredOrderById';
import WorkerShipmentOutgoing from './Pages/Worker/ShipmentOutgoing';
import WorkerShipmentOutOrderById from './Pages/Worker/ShipmentOutOrderById';
import WorkerDeliveredOutgoing from './Pages/Worker/DeliveredOutgoing';
import WorkerDeliveredOutOrderById from './Pages/Worker/DeliveredOutOrderById';
import WorkerProfile from './Pages/Worker/Profile';
import WorkerLayout from './utils/WorkerLayout';



function App() {
  let user_type = localStorage.getItem("user_type");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWorker, setIsWorker] =useState(false);
  const [isPartner, setIsPartner] =useState(false);

  useEffect(() => {
    if (parseInt(user_type) === 1) {
      setIsAdmin(true);
    }
    else if (parseInt(user_type) === 2) {
      setIsWorker(true);
    }
    else if (parseInt(user_type) === 3) {
      setIsPartner(true);
    }
    else{
      window.location.reload();
    }

    // if (!isAdmin && !isWorker && !isPartner) {
    //   console.log("error")
    //   navigate('/Login');
    // } 
  }, []);

  

 
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      
      
      <Route path="/admin">
        <Route index element={isAdmin? <AdminDashboard/> : <Navigate to="/Login"/>} />
        <Route path='requests' element={isAdmin? <Requests/> : <Navigate to="/Login"/>} />
        <Route path='partners' element={isAdmin? <Partners/> : <Navigate to="/Login"/>} />
        <Route path='workers' element={isAdmin? <Workers/> : <Navigate to="/Login"/>} />

        <Route path='stock' element={isAdmin? <AdminStock/> : <Navigate to="/Login"/>} />

        <Route path='incoming/placed' element={isAdmin? <AdminPlacedIncoming/> : <Navigate to="/Login"/>} />
        <Route path='incoming/placed/:id' element={isAdmin? <AdminPlacedIncomingById/> : <Navigate to="/Login"/>} />


        <Route path='incoming/shipment' element={isAdmin? <AdminShipmentIncoming/> : <Navigate to="/Login"/>}/>
        <Route path='incoming/shipment/:id' element={isAdmin? <AdminShipmentIncomingById/> : <Navigate to="/Login"/>}/>

        <Route path='incoming/delivered' element={isAdmin? <AdminDeliveredIncoming/> : <Navigate to="/Login"/>}/>
        <Route path='incoming/delivered/:id' element={isAdmin? <AdminDeliveredOrderById/> : <Navigate to="/Login"/>}/>

        <Route path='outgoing/placed' element={isAdmin? <AdminPlacedOutgoing/> : <Navigate to="/Login"/>} />
        <Route path='outgoing/placed/:id' element={isAdmin? <AdminPlacedOutgoingById/> : <Navigate to="/Login"/>} />

        <Route path='outgoing/shipment' element={isAdmin? <AdminShipmentOutgoing/> : <Navigate to="/Login"/>}/>
        <Route path='outgoing/shipment/:id' element={isAdmin? <AdminShipmentOutgoingById/> : <Navigate to="/Login"/>}/>

        <Route path='outgoing/delivered' element={isAdmin? <AdminDeliveredOutgoing/> : <Navigate to="/Login"/>}/>
        <Route path='outgoing/delivered/:id' element={isAdmin? <AdminDeliveredOutOrderById/> : <Navigate to="/Login"/>}/>

        <Route path='profile' element={isAdmin? <AdminProfile/> : <Navigate to="/Login"/>}/>
      </Route>

      <Route path='/partner'>
        <Route index  element={isPartner? <PartnerDashboard/> : <Navigate to="/Login"/>} />
        <Route path='incoming/placed' element={isPartner? <PlacedIncoming/> : <Navigate to="/Login"/>} />
        <Route path='incoming/create' element={isPartner? <AddIncomingorder/> : <Navigate to="/Login"/>} />
        <Route path='incoming/placed/:id' element={isPartner? <PlacedIncomingById/> : <Navigate to="/Login"/>} />

        <Route path='incoming/shipment' element={isPartner? <ShipmentIncoming/> : <Navigate to="/Login"/>} />
        <Route path='incoming/shipment/:id' element={isPartner? <ShipmentIncomingById/> : <Navigate to="/Login"/>} />

        <Route path='incoming/delivered' element={isPartner? <DeliveredIncoming/> : <Navigate to="/Login"/>} />
        <Route path='incoming/delivered/:id' element={isPartner? <DeliveredOrderById/> : <Navigate to="/Login"/>} />

        <Route path='stock' element={isPartner? <PartnerStock/> : <Navigate to="/Login"/>} />

        <Route path='outgoing/placed' element={isPartner? <PlacedOutgoing/> : <Navigate to="/Login"/>} />
        <Route path='outgoing/create' element={isPartner? <AddOutgoingOrder/> : <Navigate to="/Login"/>} />
        <Route path='outgoing/placed/:id' element={isPartner? <PlacedOutOrderById/> : <Navigate to="/Login"/>} />

        <Route path='outgoing/shipment' element={isPartner? <ShipmentOutgoing/> : <Navigate to="/Login"/>} />
        <Route path='outgoing/shipment/:id' element={isPartner? <ShipmentOutOrderById/> : <Navigate to="/Login"/>} />

        <Route path='outgoing/delivered' element={isPartner? <DeliveredOutgoing/> : <Navigate to="/Login"/>} />
        <Route path='outgoing/delivered/:id' element={isPartner? <DeliveredOutOrderById/> : <Navigate to="/Login"/>} />

        <Route path='profile' element={isPartner? <PartnerProfile/> : <Navigate to="/Login"/>}/>
      </Route>

      <Route path='/worker'>
        <Route index element={isWorker? <WorkerDashboard/> : <Navigate to="/Login"/>} />

        <Route path='incoming/shipment' element={isWorker? <WorkerShipmentIncoming/> : <Navigate to="/Login"/>} />
        <Route path='incoming/shipment/:id' element={isWorker? <WorkerShipmentIncomingById/> : <Navigate to="/Login"/>}></Route>

        <Route path='incoming/delivered' element={isWorker? <WorkerDeliveredIncoming/> : <Navigate to="/Login"/>}/>
        <Route path='incoming/delivered/:id' element={isWorker? <WorkerDeliveredOrderById/> : <Navigate to="/Login"/>}></Route>

        <Route path='outgoing/shipment' element={isWorker? <WorkerShipmentOutgoing/> : <Navigate to="/Login"/>} />
        <Route path='outgoing/shipment/:id' element={isWorker? <WorkerShipmentOutOrderById/> : <Navigate to="/Login"/>}></Route>

        <Route path='outgoing/delivered' element={isWorker? <WorkerDeliveredOutgoing/> : <Navigate to="/Login"/>}/>
        <Route path='outgoing/delivered/:id' element={isWorker? <WorkerDeliveredOutOrderById/> : <Navigate to="/Login"/>}></Route>

        <Route path='profile' element={isWorker? <WorkerProfile/> : <Navigate to="/Login"/>}/>
      </Route>
    </Routes>
  );
}

export default App;
