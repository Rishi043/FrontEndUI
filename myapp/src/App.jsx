// App Routing 

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Crops from './pages/Crops';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/orders" element={<Orders />} />  

        <Route path="/homeDealer" element={<HomeDealer />} /> 


      </Routes>
    </>
  );
}

export default App;
