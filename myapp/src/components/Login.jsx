import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE = 'http://localhost:8080/users/auth';
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      localStorage.setItem('jwtToken', res.data.token);
      setMessage("✅ Login successful!");
      navigate('/home');
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Wrong Credentials!"));
    }
  };

  return (
    <div className='containerLogin'>
      <div className='header'>
        <p>Hello, Welcome to Crop Deal</p>
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
        </div>

        <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>

        <button className="enter" onClick={handleSubmit}>Submit</button>

        {message && <p style={{ marginTop: '10px', color: message.includes("❌") ? 'red' : 'green' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;































// import React, { useState } from 'react';
// import './LoginSignup.css';
// import user_icon from '../../assets/person.png';
// import email_icon from '../../assets/email.png';
// import password_icon from '../../assets/password.png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const LoginSignup = () => {
//   const [action, setAction] = useState("Signup");
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const API_BASE = 'http://localhost:8080/users/auth';
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (!email.trim() || !password.trim() || (action === "Signup" && !role.trim())) {
//       setMessage("❌ Please fill in all required fields.");
//       return;
//     }

//     try {
//       if (action === "Login") {
//         const res = await axios.post(`${API_BASE}/login`, { email, password });
//         localStorage.setItem('jwtToken', res.data.token);
//         setMessage("✅ Login successful!");
//         navigate('/home');
//       } else {
//         await axios.post(`${API_BASE}/register`, { email, password, role });
//         setMessage("✅ Signup successful! You can now log in.");
//         setAction("Login");
//       }
//     } catch (err) {
//       setMessage("❌ Error: " + (err.response?.data?.message || "Wrong Credentials!"));
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='header'>
//         <div className='submit-container'>
//           <div className={action === "Signup" ? "submit" : "submit gray"} onClick={() => setAction("Signup")}>Sign Up</div>
//           <div className={action === "Login" ? "submit" : "submit gray"} onClick={() => setAction("Login")}>Login</div>
//         </div>
//         <p>Hello, Welcome to Crop Deal</p>
//       </div>

//       <div className='form-container'>
//         <div className='inputs'>
//           <div className='input'>
//             <img src={email_icon} alt="email icon" />
//             <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>

//           <div className='input password-input'>
//             <img src={password_icon} alt="password icon" />
//             <div className="input-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder='Password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           {action === "Signup" && (
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
//           )}
//         </div>

//         {action === "Login" && (
//           <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>
//         )}

//         <button className="enter" onClick={handleSubmit}>
//           {action === "Login" ? "Submit" : "Register"}
//         </button>

//         {message && <p style={{ marginTop: '10px', color: message.includes("❌") ? 'red' : 'green' }}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;





