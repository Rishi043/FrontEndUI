import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';


function Navbar() {
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-3" to="/">🌾 CropDeal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        {!token ? (
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-btn-login mx-2" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-btn-register mx-2" to="/register">Register</Link>
          </li>
        </ul>
      ) : (
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;