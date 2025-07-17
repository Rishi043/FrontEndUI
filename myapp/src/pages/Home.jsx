import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="imghome home-hero d-flex flex-column justify-content-center align-items-center text-white text-center">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="display-3 fw-bold single-line left-shift">
          Welcome to <span className="brand">CropDeal</span>
        </h1>
        <p className="lead mb-4">Empowering Farmers. Enabling Dealers. Securing Transactions.</p>
        <div className="button-group">
          <Link to="/crops" className="btn btn-login btn-lg me-3 shadow-sm">Available Crops</Link>
          {/* <Link to="/register" className="btn btn-register btn-lg shadow-sm">Register</Link> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
