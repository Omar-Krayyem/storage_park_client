import './App.css';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Auth/Login/index';
import Register from './pages/Auth/Register/index'
import AdminDashboard from './pages/Admin/Dashboard';
import Requests from './pages/Admin/Requests';
import Partners from './pages/Admin/Partners';
import Workers from './Pages/Admin/Workers';
import PartnerDashboard from './pages/Partner/Dashboard';
import PlacedIncoming from './pages/Partner/PlacedIncoming';
import AddIncomingorder from './pages/Partner/AddIncomingorder';
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
