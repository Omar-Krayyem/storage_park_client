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
import AdminPlacedIncoming from './Pages/Admin/IncomingOrders';
import AdminPlacedOutgoing from './Pages/Admin/OutgoingOrders';
import AdminIncomingOrederDetails from './Pages/Admin/IncomingOrderDetails';
import AdminOutgoingOrdersDetails from './Pages/Admin/OutgoingOrderDetails';
import AdminProfile from './Pages/Admin/Profile';
import AdminLayout from './utils/AdminLayout';

import PartnerDashboard from './Pages/Partner/Dashboard';
import PlacedIncoming from './Pages/Partner/IncomingOrders';
import AddIncomingorder from './Pages/Partner/AddIncomingorder';
import PartnerStock from './Pages/Partner/Stock';
import PlacedOutgoing from './Pages/Partner/OutgoingOrders';
import AddOutgoingOrder from './Pages/Partner/AddOutgoingOrder';
import PartnerProfile from './Pages/Partner/Profile';
import PartnerLayout from './utils/PartnerLayout';
import PartnerIncomingOrederDetails from './Pages/Partner/IncomingOrderDetails';
import PartnerOutgoingOrdersDetails from './Pages/Partner/OutgoingOrderDetails';


import WorkerDashboard from './Pages/Worker/Dashboard';
import WorkerShipmentIncoming from './Pages/Worker/IncomingOrders';
import WorkerShipmentOutgoing from './Pages/Worker/OutgoingOrders';
import WorkerProfile from './Pages/Worker/Profile';
import WorkerLayout from './utils/WorkerLayout';
import WorkerIncomingOrederDetails from './Pages/Worker/IncomingOrderDetails';
import WorkerOutgoingOrdersDetails from './Pages/Worker/OutgoingOrderDetails';

import { Provider } from 'react-redux';
import reduxStore from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react'
// import persistor from './redux/store';

function App() {
  let user_type = localStorage.getItem("user_type");
  let current_page = localStorage.getItem("current_page")
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
      navigate(`/admin/${current_page}`);
    } else if (parseInt(user_type) === 2) {
      setIsWorker(true);
      navigate(`/worker/${current_page}`);
    } else if (parseInt(user_type) === 3) {
      setIsPartner(true);
      navigate(`/partner/${current_page}`);
    }
  }, [user_type]);
 
  return (
    <Provider store={reduxStore}>
      <Routes>
        <Route index element={<Landing/>}/>
        <Route path='/tracking/:id' element={<Tracking/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
        <Route path="/admin" element={isAdmin? <AdminLayout/> : <Navigate to="/login"/>}>
          <Route path='dashboard' element={isAdmin? <AdminDashboard/> : <Navigate to="/login"/>} />
          <Route path='requests' element={isAdmin? <Requests/> : <Navigate to="/login"/>} />
          <Route path='partners' element={isAdmin? <Partners/> : <Navigate to="/login"/>} />
          <Route path='workers' element={isAdmin? <Workers/> : <Navigate to="/login"/>} />

          <Route path='stock' element={isAdmin? <AdminStock/> : <Navigate to="/login"/>} />

          <Route path='incoming' element={isAdmin? <AdminPlacedIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/:id' element={isAdmin? <AdminIncomingOrederDetails/> : <Navigate to="/login"/>} />

          <Route path='outgoing' element={isAdmin? <AdminPlacedOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/:id' element={isAdmin? <AdminOutgoingOrdersDetails/> : <Navigate to="/login"/>} />

          <Route path='profile' element={isAdmin? <AdminProfile/> : <Navigate to="/login"/>}/>
        </Route>

        <Route path='/partner' element={isPartner? <PartnerLayout/> : <Navigate to='login'/>}>
          <Route path='dashboard'  element={isPartner? <PartnerDashboard/> : <Navigate to="/login"/>} />
          <Route path='incoming' element={isPartner? <PlacedIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/create' element={isPartner? <AddIncomingorder/> : <Navigate to="/login"/>} />
          <Route path='incoming/:id' element={isPartner? <PartnerIncomingOrederDetails/> : <Navigate to="/login"/>} />

          <Route path='stock' element={isPartner? <PartnerStock/> : <Navigate to="/login"/>} />

          <Route path='outgoing' element={isPartner? <PlacedOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/create' element={isPartner? <AddOutgoingOrder/> : <Navigate to="/login"/>} />
          <Route path='outgoing/:id' element={isPartner? <PartnerOutgoingOrdersDetails/> : <Navigate to="/login"/>} />

          <Route path='profile' element={isPartner? <PartnerProfile/> : <Navigate to="/login"/>}/>
        </Route>

        <Route path='/worker' element={isWorker? <WorkerLayout/> : <Navigate to="/login"/>}>
          <Route path='dashboard' element={isWorker? <WorkerDashboard/> : <Navigate to="/login"/>} />

          <Route path='incoming' element={isWorker? <WorkerShipmentIncoming/> : <Navigate to="/login"/>} />
          <Route path='incoming/:id' element={isWorker? <WorkerIncomingOrederDetails/> : <Navigate to="/login"/>}></Route>

          <Route path='outgoing' element={isWorker? <WorkerShipmentOutgoing/> : <Navigate to="/login"/>} />
          <Route path='outgoing/:id' element={isWorker? <WorkerOutgoingOrdersDetails/> : <Navigate to="/login"/>}></Route>
          
          <Route path='profile' element={isWorker? <WorkerProfile/> : <Navigate to="/login"/>}/>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
