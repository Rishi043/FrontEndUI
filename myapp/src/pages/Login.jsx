import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE = 'http://localhost:8080/users/auth';
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in all required fields. ❌");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      localStorage.setItem('jwtToken', res.data.token);
      console.log("Token ", res.data.token);
      setMessage("Login successful! ✅");

      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwtDecode(token);
      const role = decodedToken.Role || '';
      if (token && role.toUpperCase() === 'DEALER') {
        navigate('/homeDealer');
      }
      else if (token && role.toUpperCase() === 'FARMER') {
        navigate('/homeFarmer');
      }
      else {
        navigate('/login');
      }

      // const redirectTo = new URLSearchParams(window.location.search).get("redirect");
      // navigate(redirectTo ? /${redirectTo} : '/homeDealer');
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || "Wrong Credentials!"));
    }

  };





  return (
    <div className='imglogin'>
      <div className='containerLogin'>
        <div className='container'>
          <div className='header'>
            <p>Hello, Welcome to Crop Deal</p>
          </div>

          <div className='form-container'>
            <div className='inputs'>
              <div className='input'>
                <img src={email_icon} alt="email icon" />
                <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} required />
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
            </div>

            <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>

            <button className="enter" onClick={handleSubmit}>Submit</button>

            {message && <p style={{ marginTop: '10px', color: message.includes("❌") ? 'red' : 'green' }}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;































// import React, { useState } from 'react';
// import './LoginSignup.css';
// import email_icon from '../assets/email.png';
// import password_icon from '../assets/password.png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const API_BASE = 'http://localhost:8080/users/auth';
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (!email.trim() || !password.trim()) {
//       setMessage("Please fill in all required fields. ❌");
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_BASE}/login`, { email, password });
//       localStorage.setItem('jwtToken', res.data.token);
//       console.log("Token ",res.data.token);
//       setMessage("Login successful! ✅"); 
//       const redirectTo = new URLSearchParams(window.location.search).get("redirect");
//       navigate(redirectTo ? `/${redirectTo}` : '/homeDealer');

//       // navigate('/homeDealer');
//     } catch (err) {
//       setMessage("Error: " + (err.response?.data?.message || "Wrong Credentials!"));
//     }
//   };

//   return (
//     <div className='imglogin'>
//       <div className='containerLogin'>
//         <div className='container'>
//           <div className='header'>
//             <p>Hello, Welcome to Crop Deal</p>
//           </div>

//           <div className='form-container'>
//             <div className='inputs'>
//               <div className='input'>
//                 <img src={email_icon} alt="email icon" />
//                 <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} required />
//               </div>

//               <div className='input password-input input-wrapper'>
//                 <img src={password_icon} alt="password icon" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder='Password'
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>

//             <button className="enter" onClick={handleSubmit}>Submit</button>

//             {message && <p style={{ marginTop: '10px', color: message.includes("❌") ? 'red' : 'green' }}>{message}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;