import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE = 'http://localhost:8080/users/auth';
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim() || !role.trim()) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/register`, { email, password, role });
      setMessage("✅ Signup successful! You can now log in.");
      navigate('/login');
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Signup failed!"));
    }
  };

  return (
    <div className='containerSignup'>
      <div className='header'>
        <p>Create Your Account</p>
      </div>

      <div className='form-container'>
        <div className='inputs'>
          <div className='input'>
            <img src={email_icon} alt="email icon" />
            <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className='input password-input'>
            <img src={password_icon} alt="password icon" />
            <div className="input-wrapper">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='input'>
            <img src={user_icon} alt="user icon" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="select-role"
            >
              <option value="">Select Role</option>
              <option value="FARMER">FARMER</option>
              <option value="DEALER">DEALER</option>
            </select>
          </div>
        </div>

        <button className="enter" onClick={handleSubmit}>Register</button>

        {message && <p style={{ marginTop: '10px', color: message.includes("❌") ? 'red' : 'green' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
