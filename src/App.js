import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react'

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
import AdminLayout from './utils/AdminLayout';

import PartnerDashboard from './Pages/Partner/Dashboard';
import PlacedIncoming from './Pages/Partner/PlacedIncoming';
import PlacedIncomingById from './Pages/Partner/PlacedOrderById';
import AddIncomingorder from './Pages/Partner/AddIncomingorder';
import ShipmentIncoming from './Pages/Partner/ShipmentIncoming';
import ShipmentIncomingById from './Pages/Partner/ShipmentOrderById';
import DeliveredIncoming from './Pages/Partner/DeliveredIncoming';
import DeliveredOrderById from './Pages/Partner/DeliveredOrderById';

import WorkerDashboard from './Pages/Worker/Dashboard';
import WorkerShipmentIncoming from './Pages/Worker/ShipmentIncoming';
import WorkerShipmentIncomingById from './Pages/Worker/ShipmentOrderById';
import WorkerDeliveredIncoming from './Pages/Worker/DeliveredIncoming';
import WorkerDeliveredOrderById from './Pages/Worker/DeliveredOrderById';

function App() {
  let user_type = localStorage.getItem("user_type");

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
  }, []);

  if (!isAdmin && !isWorker && !isPartner) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      
      <Route path="/admin" element={isAdmin? <AdminLayout/> : <Navigate to="/"/>}>
        <Route index element={isAdmin? <AdminDashboard/> : <Navigate to="/"/>} />
        <Route path='requests' element={isAdmin? <Requests/> : <Navigate to="/"/>} />
        <Route path='partners' element={isAdmin? <Partners/> : <Navigate to="/"/>} />
        <Route path='workers' element={isAdmin? <Workers/> : <Navigate to="/"/>} />

        <Route path='stock' element={isAdmin? <AdminStock/> : <Navigate to="/"/>} />

        <Route path='incoming/placed' element={isAdmin? <AdminPlacedIncoming/> : <Navigate to="/"/>} />
        <Route path='/admin/incoming/placed/:id' element={isAdmin? <AdminPlacedIncomingById/> : <Navigate to="/"/>} />

        <Route path='incoming/shipment' element={isAdmin? <AdminShipmentIncoming/> : <Navigate to="/"/>}/>
        <Route path='incoming/shipment/:id' element={isAdmin? <AdminShipmentIncomingById/> : <Navigate to="/"/>}/>

        <Route path='incoming/delivered' element={isAdmin? <AdminDeliveredIncoming/> : <Navigate to="/"/>}/>
        <Route path='incoming/delivered/:id' element={isAdmin? <AdminDeliveredOrderById/> : <Navigate to="/"/>}/>

        <Route path='outgoing/placed' element={isAdmin? <AdminPlacedOutgoing/> : <Navigate to="/"/>} />
        <Route path='/admin/outgoing/placed/:id' element={isAdmin? <AdminPlacedOutgoingById/> : <Navigate to="/"/>} />

        <Route path='outgoing/shipment' element={isAdmin? <AdminShipmentOutgoing/> : <Navigate to="/"/>}/>
        <Route path='outgoing/shipment/:id' element={isAdmin? <AdminShipmentOutgoingById/> : <Navigate to="/"/>}/>

        <Route path='outgoing/delivered' element={isAdmin? <AdminDeliveredOutgoing/> : <Navigate to="/"/>}/>
        <Route path='outgoing/delivered/:id' element={isAdmin? <AdminDeliveredOutOrderById/> : <Navigate to="/"/>}/>
      </Route>

      <Route path='/partner'>
        <Route index element={<PartnerDashboard/>} />
        <Route path='incoming/placed' element={<PlacedIncoming/>} ></Route>
        <Route path='incoming/create' element={<AddIncomingorder/>} ></Route>
        <Route path='incoming/placed/:id' element={<PlacedIncomingById/>} ></Route>

        <Route path='incoming/shipment' element={<ShipmentIncoming/>} />
        <Route path='incoming/shipment/:id' element={<ShipmentIncomingById/>} ></Route>

        <Route path='incoming/delivered' element={<DeliveredIncoming/>} />
        <Route path='incoming/delivered/:id' element={<DeliveredOrderById/>} ></Route>
      </Route>

      <Route path='/worker'>
        <Route index element={<WorkerDashboard/>} />

        <Route path='incoming/shipment' element={<WorkerShipmentIncoming/>} />
        <Route path='incoming/shipment/:id' element={<WorkerShipmentIncomingById/>} ></Route>

        <Route path='incoming/delivered' element={<WorkerDeliveredIncoming/>} />
        <Route path='incoming/delivered/:id' element={<WorkerDeliveredOrderById/>} ></Route>
      </Route>
    </Routes>
  );
}

export default App;
