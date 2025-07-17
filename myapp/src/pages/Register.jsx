import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE = 'http://localhost:8080/users/auth';
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple regex for basic email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim() || !role.trim()) {
      toast.error("❌ Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("❌ Invalid email address.");
      return;
    }

if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    toast.error("❌ Use 8+ chars with uppercase, lowercase & special symbol.");
    return;
}


    try {
      await axios.post(`${API_BASE}/register`, { email, password, role });
      toast.success("✅ Signup successful! Redirecting...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "Signup failed!"));
    }
  };

  return (
    <div className='imglogin'>
      <div className='containerSignup'>
        <div className='header'>
          <p>Create Your Account</p>
        </div>

        <div className='form-container'>
          <div className='inputs'>
            <div className='input'>
              <img src={email_icon} alt="email icon" />
              <input
                type="email"
                placeholder='Email Id'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='input password-input input-wrapper'>
              <img src={password_icon} alt="password icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
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
        </div>

        {/* Toast Notification Container */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default Signup;




// import React, { useState } from 'react';
// import './LoginSignup.css';
// import user_icon from '../assets/person.png';
// import email_icon from '../assets/email.png';
// import password_icon from '../assets/password.png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const API_BASE = 'http://localhost:8080/users/auth';
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleSubmit = async () => {
//     // Check empty fields
//     if (!email.trim() || !password.trim() || !role.trim()) {
//       setMessage("❌ Please fill in all required fields.");
//       return;
//     }

//     // Validate email format
//     if (!validateEmail(email)) {
//       setMessage("❌ Please enter a valid email address.");
//       return;
//     }

//     // Validate password length
//     if (password.length < 6) {
//       setMessage("❌ Password must be at least 6 characters long.");
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE}/register`, { email, password, role });
//       setMessage("✅ Signup successful! You can now log in.");
//       navigate('/login');
//     } catch (err) {
//       setMessage("❌ Error: " + (err.response?.data?.message || "Signup failed!"));
//     }
//   };

//   return (
//     <div className='imglogin'>
//       <div className='containerSignup'>
//         <div className='header'>
//           <p>Create Your Account</p>
//         </div>

//         <div className='form-container'>
//           <div className='inputs'>
//             <div className='input'>
//               <img src={email_icon} alt="email icon" />
//               <input
//                 type="email"
//                 placeholder='Email Id'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className='input password-input input-wrapper'>
//               <img src={password_icon} alt="password icon" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder='Password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <div className='input'>
//               <img src={user_icon} alt="user icon" />
//               <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 required
//                 className="select-role"
//               >
//                 <option value="">Select Role</option>
//                 <option value="FARMER">FARMER</option>
//                 <option value="DEALER">DEALER</option>
//               </select>
//             </div>
//           </div>

//           <button className="enter" onClick={handleSubmit}>Register</button>

//           {message && (
//             <p style={{ marginTop: '10px', color: message.includes("❌") ? 'red' : 'green' }}>
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
