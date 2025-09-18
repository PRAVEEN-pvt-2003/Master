import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Admin from "./pages/Admin/admin";
import AdminLogin from "./pages/Admin/adminlogin";
import Contact from "./pages/contact";
import Login from "./pages/Auth";
import Subtopics from "./pages/subtopics/subtopic";
import Subtopicdetail from "./pages/subtopics/subtopicdetail";
import TotalSchemes from "./pages/subtopics/Totalschemes";
import UserDashboard from "./pages/userDashboard/userDashboard";
import { UserProtectedRoute, AdminProtectedRoute } from "./routes/ProtectedRoute";
import Loader from './components/loader';
import "./Styles/App.css";

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/+$/, "");

  const [loading, setLoading] = useState(true);

  const hideFooter = ["/auth", "/admin", "/adminlogin", "/userdashboard"].includes(path);
  const hideNavbar = ["/admin", "/adminlogin"].includes(path);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Login />} />

          <Route
            path="/userdashboard"
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            }
          />
          <Route path="/subtopics/:topicId" element={<Subtopics/>} />
          <Route path="/detail/:schemeId" element={<Subtopicdetail />} />
          <Route path="/totalschemes" element={<TotalSchemes />} />

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute adminOnly>
                <Admin />
              </AdminProtectedRoute>
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
