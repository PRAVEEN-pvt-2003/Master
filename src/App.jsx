import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import About from './pages/about';
import Admin from './pages/Admin/admin';
import AdminLogin from './pages/Admin/adminlogin';
import Contact from './pages/contact';
import Login from './pages/Auth';
import './App.css';
import ProtectedRoute from './routes/routecomponent';
import Subtopics from './pages/subtopics/subtopic';
import Subtopicdetail from './pages/subtopics/subtopicdetail';
import UserDashboard from './pages/userDashboard/userDashboard';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/+$/, '');

  const hideFooter =
    path === '/auth' || path === '/admin' || path === '/adminlogin' || path === '/dashboard';

  const hideNavbar = path === '/admin' || path === '/adminlogin';

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/subtopics/:topicId" element={<Subtopics />} />
          <Route path="/detail/:subtopicId" element={<Subtopicdetail />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
