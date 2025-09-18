import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/userservices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/adminlogin.css";
import adminBg from "../../assets/admin-bg2.jpg";
import { FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import LogoImg from "../../assets/main-admin.png";

const AdminLogin = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(userid, password);
      localStorage.setItem("adminToken", res.token || "dummyToken");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminUsername", userid);
      toast.success("Admin login successful ✅");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="admin-login-page">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Left Panel */}
      <div className="left-panel">
        <img src={LogoImg} alt="Logo" className="top-logo" />
        <h2>Admin Portal</h2>
        <p className="subtitle">Enter your credentials to access the system</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label htmlFor="userid">User ID</label>
          <input
            id="userid"
            type="text"
            placeholder="Enter User ID"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="admin-password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
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

          <button type="submit">Sign in</button>
        </form>

        <div className="secure-access">
        <FaShieldAlt className="shield-icon" />
        <div className="secure-text">
          <h4>Secure Access</h4>
          <p>Enterprise-grade encryption and security protocols.</p>
        </div>
      </div>
    </div>

      {/* Right Panel */}
      <div
        className="right-panel"
        style={{ backgroundImage: `url(${adminBg})` }}
      >
        <div className="info-box">
          <h3>Professional Administration</h3>
          <p>Manage your organization with confidence using our comprehensive admin platform.</p>
          <ul>
            <li>Real-time analytics dashboard</li>
            <li>Advanced user management</li>
            <li>Robust security protocols</li>
            <li>Customizable access controls</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
