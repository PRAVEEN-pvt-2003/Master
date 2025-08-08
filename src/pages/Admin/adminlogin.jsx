import React, { useState } from 'react';
import './adminlogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin-login/', {
        userid: userid,
        password: password,
      });

      if (response.data.success) {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUsername', userid);
        toast.success('Login successful! Redirecting...');
        navigate('/Admin');
      } else {
        toast.error('Invalid credentials');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Userid"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
