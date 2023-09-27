import './App.css';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import React, {useState, useEffect} from 'react'

import Landing from './Pages/Landing';
import Tracking from './Pages/Tracking';
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

import { Provider } from 'react-redux';
import reduxStore from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react'
// import persistor from './redux/store';

function App() {
  let user_type = localStorage.getItem("user_type");
  const navigate = useNavigate();

  // const store = useSelector((store) => store);
  // console.log(store);
  // let user_type = store.user.user_type;
  // const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isWorker, setIsWorker] =useState(false);
  const [isPartner, setIsPartner] =useState(false);

  useEffect(() => {
    if (user_type === "1") {
      setIsAdmin(true);
      navigate("/admin");
    } else if (parseInt(user_type) === 2) {
      setIsWorker(true);
      navigate("/worker");
    } else if (parseInt(user_type) === 3) {
      setIsPartner(true);
      navigate("/partner");
    }
  }, [user_type]);
 
  return (
    <Provider store={reduxStore}>
      <Routes>
        <Route index element={<Landing/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
        <Route path="/admin" element={isAdmin? <AdminLayout/> : <Navigate to="/login"/>}>
          <Route index element={isAdmin? <AdminDashboard/> : <Navigate to="/login"/>} />
          <Route path='requests' element={isAdmin? <Requests/> : <Navigate to="/login"/>} />
          <Route path='partners' element={isAdmin? <Partners/> : <Navigate to="/login"/>} />
          <Route path='workers' element={isAdmin? <Workers/> : <Navigate to="/login"/>} />

          <Route path='stock' element={isAdmin? <AdminStock/> : <Navigate to="/login"/>} />

          <Route path='incoming/placed' element={isAdmin? <AdminPlacedIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/placed/:id' element={isAdmin? <AdminPlacedIncomingById/> : <Navigate to="/login"/>} />


          <Route path='incoming/shipment' element={isAdmin? <AdminShipmentIncoming/> : <Navigate to="/login"/>}/>
          <Route path='incoming/shipment/:id' element={isAdmin? <AdminShipmentIncomingById/> : <Navigate to="/login"/>}/>

          <Route path='incoming/delivered' element={isAdmin? <AdminDeliveredIncoming/> : <Navigate to="/login"/>}/>
          <Route path='incoming/delivered/:id' element={isAdmin? <AdminDeliveredOrderById/> : <Navigate to="/login"/>}/>

          <Route path='outgoing/placed' element={isAdmin? <AdminPlacedOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/placed/:id' element={isAdmin? <AdminPlacedOutgoingById/> : <Navigate to="/login"/>} />

          <Route path='outgoing/shipment' element={isAdmin? <AdminShipmentOutgoing/> : <Navigate to="/login"/>}/>
          <Route path='outgoing/shipment/:id' element={isAdmin? <AdminShipmentOutgoingById/> : <Navigate to="/login"/>}/>

          <Route path='outgoing/delivered' element={isAdmin? <AdminDeliveredOutgoing/> : <Navigate to="/login"/>}/>
          <Route path='outgoing/delivered/:id' element={isAdmin? <AdminDeliveredOutOrderById/> : <Navigate to="/login"/>}/>

          <Route path='profile' element={isAdmin? <AdminProfile/> : <Navigate to="/login"/>}/>
        </Route>

        <Route path='/partner' element={isPartner? <PartnerLayout/> : <Navigate to='login'/>}>
          <Route index  element={isPartner? <PartnerDashboard/> : <Navigate to="/login"/>} />
          <Route path='incoming/placed' element={isPartner? <PlacedIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/create' element={isPartner? <AddIncomingorder/> : <Navigate to="/login"/>} />
          <Route path='incoming/placed/:id' element={isPartner? <PlacedIncomingById/> : <Navigate to="/login"/>} />

          <Route path='incoming/shipment' element={isPartner? <ShipmentIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/shipment/:id' element={isPartner? <ShipmentIncomingById/> : <Navigate to="/login"/>} />

          <Route path='incoming/delivered' element={isPartner? <DeliveredIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/delivered/:id' element={isPartner? <DeliveredOrderById/> : <Navigate to="/login"/>} />

          <Route path='stock' element={isPartner? <PartnerStock/> : <Navigate to="/login"/>} />

          <Route path='outgoing/placed' element={isPartner? <PlacedOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/create' element={isPartner? <AddOutgoingOrder/> : <Navigate to="/login"/>} />
          <Route path='outgoing/placed/:id' element={isPartner? <PlacedOutOrderById/> : <Navigate to="/login"/>} />

          <Route path='outgoing/shipment' element={isPartner? <ShipmentOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/shipment/:id' element={isPartner? <ShipmentOutOrderById/> : <Navigate to="/login"/>} />

          <Route path='outgoing/delivered' element={isPartner? <DeliveredOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/delivered/:id' element={isPartner? <DeliveredOutOrderById/> : <Navigate to="/login"/>} />

          <Route path='profile' element={isPartner? <PartnerProfile/> : <Navigate to="/login"/>}/>
        </Route>

        <Route path='/worker' element={isWorker? <WorkerLayout/> : <Navigate to="/login"/>}>
          <Route index element={isWorker? <WorkerDashboard/> : <Navigate to="/login"/>} />

          <Route path='incoming/shipment' element={isWorker? <WorkerShipmentIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/shipment/:id' element={isWorker? <WorkerShipmentIncomingById/> : <Navigate to="/login"/>}></Route>

          <Route path='incoming/delivered' element={isWorker? <WorkerDeliveredIncoming/> : <Navigate to="/login"/>}/>
          <Route path='incoming/delivered/:id' element={isWorker? <WorkerDeliveredOrderById/> : <Navigate to="/login"/>}></Route>

          <Route path='outgoing/shipment' element={isWorker? <WorkerShipmentOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/shipment/:id' element={isWorker? <WorkerShipmentOutOrderById/> : <Navigate to="/login"/>}></Route>

          <Route path='outgoing/delivered' element={isWorker? <WorkerDeliveredOutgoing/> : <Navigate to="/login"/>}/>
          <Route path='outgoing/delivered/:id' element={isWorker? <WorkerDeliveredOutOrderById/> : <Navigate to="/login"/>}></Route>

          <Route path='profile' element={isWorker? <WorkerProfile/> : <Navigate to="/login"/>}/>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
