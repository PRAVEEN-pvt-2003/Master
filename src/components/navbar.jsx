import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/navbar.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebLogo from "../assets/web-logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userToken") || !!localStorage.getItem("adminToken")
  );

  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken") || !!localStorage.getItem("adminToken"));
    };

    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => window.removeEventListener("loginStatusChanged", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    toast.info("Logged out successfully!");
    navigate("/");
    window.dispatchEvent(new Event("loginStatusChanged"));
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    if (location.pathname !== "/") {
      navigate("/#" + id);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = ["home", "categories", "progress", "about-us", "contact"];

    const handleScroll = () => {
      let current = "home";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 80;
          if (window.scrollY >= sectionTop) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img className="search-img" src={WebLogo} alt="Search" />
          <span>Scheme Finder</span>
        </div>
        <div className="navbar-center">
          <span 
            className={activeSection === "home" ? "active" : ""}
            onClick={() => scrollToSection("home")} >Home</span>

          <span 
            className={activeSection === "categories" ? "active" : ""}
            onClick={()=>scrollToSection("categories")}>Categories</span>

          <span 
            className={activeSection === "progress" ? "active" : ""}
            onClick={()=>scrollToSection("progress")} >How it works</span>

          <span 
            className={activeSection === "about-us" ? "active" : ""}
            onClick={() => scrollToSection("about-us")} >About us</span>

          <span 
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => scrollToSection("contact")} >Contact</span>
          </div>

          <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <Link to="/userdashboard" style={{ marginLeft: "20px", textDecoration: "none", color: "black" }}>
                <span
                className={`sidebar-link ${activeSection === "userdashboard" ? "active" : ""}`}
                 onClick={() => scrollToSection("userdashboard")}>Dashboard</span>
              </Link>
              <button onClick={handleLogout} style={{ marginLeft: "20px" }}>Logout</button>
            </>
          ) : (
            <Link to="/auth">
              <button style={{ marginLeft: "20px" }}>Sign In</button>
            </Link>
          )}
        </div>
      </nav>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Navbar;
