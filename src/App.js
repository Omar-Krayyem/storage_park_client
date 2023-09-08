import './App.css';
import { Route, Routes } from 'react-router-dom';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register'
import AdminDashboard from './Pages/Admin/Dashboard';
import Requests from './Pages/Admin/Requests/index';
import Partners from './Pages/Admin/Partners';
import Workers from './Pages/Admin/Workers';
import PartnerDashboard from './Pages/Partner/Dashboard';
import PlacedIncoming from './Pages/Partner/PlacedIncoming';
import AddIncomingorder from './Pages/Partner/AddIncomingorder';
import AdminPlacedIncoming from './Pages/Admin/PlacedIncoming';
import AdminShipmentIncoming from './Pages/Admin/ShipmentIncoming';
import ShipmentIncoming from './Pages/Partner/ShipmentIncoming';
import PlacedIncomingById from './Pages/Partner/PlacedOrderById';
import AdminPlacedIncomingById from './Pages/Admin/PlacedOrderById';
import AdminShipmentIncomingById from './Pages/Admin/ShipmentOrderById';
import ShipmentIncomingById from './Pages/Partner/ShipmentOrderById';

import WorkerDashboard from './Pages/Worker/Dashboard';
import WorkerShipmentIncoming from './Pages/Worker/ShipmentIncoming';
import WorkerShipmentIncomingById from './Pages/Worker/ShipmentOrderById';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />

      <Route path="/admin" >
        <Route index element={<AdminDashboard/>} />
        <Route path='requests' element={<Requests/>} />
        <Route path='partners' element={<Partners/>} />
        <Route path='workers' element={<Workers/>} />

        <Route path='incoming/placed' element={<AdminPlacedIncoming/>} />
        <Route path='incoming/placed/:id' element={<AdminPlacedIncomingById/>} ></Route>

        <Route path='incoming/shipment' element={<AdminShipmentIncoming/>} />
        <Route path='incoming/shipment/:id' element={<AdminShipmentIncomingById/>} ></Route>
      </Route>

      <Route path='/partner'>
        <Route index element={<PartnerDashboard/>} />
        <Route path='incoming/placed' element={<PlacedIncoming/>} ></Route>
        <Route path='incoming/create' element={<AddIncomingorder/>} ></Route>
        <Route path='incoming/placed/:id' element={<PlacedIncomingById/>} ></Route>

        <Route path='incoming/shipment' element={<ShipmentIncoming/>} />
        <Route path='incoming/shipment/:id' element={<ShipmentIncomingById/>} ></Route>
      </Route>

      <Route path='/worker'>
        <Route index element={<WorkerDashboard/>} />

        <Route path='incoming/shipment' element={<WorkerShipmentIncoming/>} />
        <Route path='incoming/shipment/:id' element={<WorkerShipmentIncomingById/>} ></Route>
      </Route>
    </Routes>
  );
}

export default App;
