import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DealerDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const DealerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [dealerEmail, setDealerEmail] = useState('');
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.get('http://localhost:8080/orders/dealer/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error('❌ Failed to load orders.');
      console.error(err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://localhost:8082/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Order deleted successfully.");
      fetchOrders(); // refresh after delete
    } catch (err) {
      toast.error("❌ Failed to delete order.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return navigate('/login');

    try {
      const decoded = jwtDecode(token);
      const email = decoded.sub || decoded.email || '';
      const role = decoded.Role || decoded.role || '';

      if (role.toUpperCase() !== 'DEALER') {
        toast.error('❌ Unauthorized access');
        return navigate('/login');
      }

      setDealerEmail(email);
      fetchOrders();
    } catch (err) {
      console.error("JWT Decode Error:", err);
      toast.error('❌ Invalid session');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dealer-dashboard">
      <div className="dashboard-header">
        <h1>Dealer Dashboard</h1>
        <div className="user-info">
          <p>Logged in as: <strong>{dealerEmail}</strong></p>

        </div>
      </div>

      <div className="orders-section">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Crop Name</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.cropName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.orderDate?.split('T')[0]}</td>
                  <td className={`status ${order.status?.toLowerCase()}`}>
                    <span className="status-text">{order.status}</span>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(order.orderId)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DealerDashboard;



