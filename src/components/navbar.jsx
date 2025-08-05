import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '../assets/search-icon.png'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    const shouldShowToast = sessionStorage.getItem('showLoginToast') === 'true';

    if (loggedIn && shouldShowToast) {
      toast.success('Signed in successfully!', { toastId: 'login-toast' });
      sessionStorage.removeItem('showLoginToast');
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.info('Logged out successfully!');
    navigate('/');
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/#' + id);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        
        <div className="navbar-left">
          <img className='search-img' src={SearchIcon} alt="Search-image" />
          <span>Scheme Finder</span>
          </div>
        <div className="navbar-right">
          <span onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            Home
          </span>
          <span onClick={() => scrollToSection('about-us')} style={{ cursor: 'pointer', marginLeft: '20px' }}>
            About
          </span>
          <span onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer', marginLeft: '20px' }}>
            Contact
          </span>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ marginLeft: '20px', textDecoration: 'none', color: 'black' }}>
                <span>Dashboard</span>
              </Link>
              <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Logout</button>
            </>
          ) : (
            <Link to="/auth">
              <button style={{ marginLeft: '20px' }}>Sign In</button>
            </Link>
          )}
        </div>
      </nav>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Navbar;
