import { useState } from 'react';
import './Auth.css';
import LoginImage from '../assets/login-img.png';
import { signup, userLogin, adminLogin } from '../services/userservices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import BackGroundImg from '../assets/microsoft-bg.png'
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


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
        data = await signup(name, email, password);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'false');
        localStorage.setItem('username', name);
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
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}

            </span>
            </div>
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>

          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <a
              type="button"
              className="toggle-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </a>
          </p>

        </div>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover={false}
            draggable={false}
            theme="light"
          />
      </div>
    </div>
  );
}

export default Login;
