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
        <Route path='incoming/shipment' element={<AdminShipmentIncoming/>} />
      </Route>

      <Route path='/partner'>
        <Route index element={<PartnerDashboard/>} />
        <Route path='incoming/placed' element={<PlacedIncoming/>} ></Route>
        <Route path='incoming/create' element={<AddIncomingorder/>} ></Route>
      </Route>
    </Routes>
  );
}

export default App;
