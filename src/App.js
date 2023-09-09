import './App.css';
import { Route, Routes } from 'react-router-dom';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register'

import AdminDashboard from './Pages/Admin/Dashboard';
import Requests from './Pages/Admin/Requests/index';
import Partners from './Pages/Admin/Partners';
import Workers from './Pages/Admin/Workers';
import AdminPlacedIncoming from './Pages/Admin/PlacedIncoming';
import AdminPlacedIncomingById from './Pages/Admin/PlacedOrderById';
import AdminShipmentIncoming from './Pages/Admin/ShipmentIncoming';
import AdminShipmentIncomingById from './Pages/Admin/ShipmentOrderById';
import AdminDeliveredIncoming from './Pages/Admin/DeliveredIncoming';
import AdminDeliveredOrderById from './Pages/Admin/DeliveredOrderById';

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

        <Route path='incoming/delivered' element={<AdminDeliveredIncoming/>} />
        <Route path='incoming/delivered/:id' element={<AdminDeliveredOrderById/>} ></Route>
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
