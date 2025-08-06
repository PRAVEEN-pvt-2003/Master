// Login.jsx
import React, { useState } from 'react';
import './Auth.css';
import LoginImage from '../assets/login-img.png';
import { signup, userLogin, adminLogin } from '../services/userservices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import BackGroundImg from '../assets/microsoft-bg.png';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        const isAdminLogin = email.toLowerCase() === 'admin@gmail.com';
        if (isAdminLogin) {
          data = await adminLogin(email, password);
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', email);
          sessionStorage.setItem('showLoginToast', 'true');
          toast.success(data.message);
          navigate('/admin');
        } else {
          data = await userLogin(email, password);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isAdmin', 'false');
          localStorage.setItem('username', email);
          sessionStorage.setItem('showLoginToast', 'true');
          toast.success(data.message);
          navigate('/');
        }
      } else {
        data = await signup(name, email, password, gender, dob, city);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'false');
        localStorage.setItem('username', name);
        localStorage.setItem('userData', JSON.stringify({
          name,
          email,
          gender,
          city,
        }));
        toast.success(data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <img className='bg-img' src={BackGroundImg} alt="img" />
      <div className="auth-card">
        <div className="auth-side-panel">
          <img src={LoginImage} alt="Authentication" />
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>
            {isLogin
              ? 'Access your dashboard and manage your projects.'
              : 'Join us today to manage your tasks and track progress!'}
          </p>
        </div>
        <div className="auth-form-section">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {!isLogin && (
              <>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <a className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </a>
          </p>
          <ToastContainer
            position="top-right"
            margin-top="10%"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover={false}
            draggable={false}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
