// src/App.js or App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Crops from './pages/Crops';  
import DealerDashboard from './pages/DealerDashboard'; 
import FarmerDashboard from './pages/FarmerDashboard';
import PaymentPage from './pages/PaymentPage';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/crops" element={<Crops />} />  
        <Route path="/homeDealer" element={<DealerDashboard />} /> 
        <Route path="/homeFarmer" element={<FarmerDashboard />} />
        <Route path="/payment" element={<PaymentPage />} />

      </Routes>
    </>
  );
}

export default App;