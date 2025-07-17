import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '' });
  const [crops, setCrops] = useState([]);


  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.sub || payload.email;
      setUser({ name: email });

      axios.get(`http://localhost:8081/crops/by/${email}`)
        .then(res => setCrops(res.data))
        .catch(err => console.error('Error fetching crops:', err));
    } catch (err) {
      console.error('Token decoding failed:', err);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="farmer-dashboard">
      {/* Sidebar */}
      <aside className="farmer-sidebar">
        <div>
          <h2>CropDeal</h2>
          <nav className="sidebar-nav">
            <div><button onClick={() => navigate('/')}>🏡 Home</button></div>
            <div><button onClick={() => navigate('/add-crop')}>🌱 Add Crop</button></div>
            <div><button onClick={() => navigate('/my-crops')}>📋 My Crops</button></div>
            <div><button onClick={() => navigate('/market-prices')}>💹 Market Prices</button></div>
            <div><button onClick={() => navigate('/weather')}>🌦 Weather</button></div>
            <div><button onClick={() => navigate('/profile')}>👤 Profile</button></div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="farmer-main">
        <div className="welcome-box">
          <h1>Welcome, {user.name || 'Farmer'}!</h1>
          <p>Manage your crops, check market trends, and stay updated with weather forecasts.</p>
        </div>

        <div className="card-grid">
          {/* Same cards as before */}
          <div onClick={() => navigate('/add-crop')} className="card">
            <h3>🌱 Add Crop</h3>
            <p>Register a new crop with type, quantity, and harvest details.</p>
          </div>
          <div onClick={() => navigate('/my-crops')} className="card">
            <h3>📋 My Crops</h3>
            <p>View and manage your crops in one place.</p>
          </div>
          <div onClick={() => navigate('/market-prices')} className="card">
            <h3>💹 Market Prices</h3>
            <p>Check latest market prices for various crops.</p>
          </div>
          <div onClick={() => navigate('/weather')} className="card">
            <h3>🌦 Weather</h3>
            <p>Get daily weather updates to plan farming.</p>
          </div>
          <div onClick={() => navigate('/profile')} className="card">
            <h3>👤 Profile</h3>
            <p>Update your personal and crop information.</p>
          </div>
        </div>

        {/* Crop Table Section */}
        <div className="crop-table-container">
          <h2>Your Crops</h2>
          {crops.length > 0 ? (
            <table className="crop-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {crops.map(crop => (
                  <tr key={crop.id}>
                    <td>{crop.id}</td>
                    <td>{crop.name}</td>
                    <td>{crop.type}</td>
                    <td>{crop.quantity}</td>
                    <td>₹{crop.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#888', marginTop: '10px' }}>No crops found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
