import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminImage from '../../assets/statsimg.jpg'; 
import BackGroundImg from '../../assets/microsoft-bg.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AdminLogin() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userid || !password) {
      toast.warn('Please enter both User ID and Password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/admin-login/', {
        userid,
        password
      });

      if (response.status === 200) { 
        toast.success('Admin login successful!');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUsername', userid);
        navigate('/admin');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="admin-login-wrapper">
      <img className='admin-bg-img' src={BackGroundImg} alt="img" />
      <div className="admin-login-card">
        {/* Left Form */}
        <div className="admin-login-left">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userid"
              placeholder="User ID"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              required
            />
            <div className='admin-pass-wrapper'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}

            </span>
            </div>
            <button type="submit" className='admin-login-btn'>Login</button>
          </form>
        </div>

        {/* Right Image */}
        <div className="admin-login-right">
          <img src={AdminImage} alt="Admin illustration" />
          <h3>Welcome Back, Admin!</h3>
          <p>Manage schemes, users and content securely from your dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
