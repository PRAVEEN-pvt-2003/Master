import React, { useState } from "react";
import "../Styles/Auth.css";
import { signup, userLogin, adminLogin } from "../services/userservices";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash ,FaRegFileAlt } from "react-icons/fa";
import UserIcon from "../assets/user.png";
import PasswordIcon from "../assets/padlock.png";
import EmailIcon from "../assets/mail.png";
import LocationIcon from "../assets/location.png";


function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/userdashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        const isAdminLogin = email.toLowerCase() === "admin@gmail.com";
        if (isAdminLogin) {
          data = await adminLogin(email, password);
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("username", email);
          sessionStorage.setItem("showLoginToast", "true");
          window.dispatchEvent(new Event("loginStatusChanged"));
          toast.success(data.message);
          navigate("/admin", { replace: true });
        } else {
          data = await userLogin(email, password);
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("isAdmin", "false");
          localStorage.setItem("username", email);
          sessionStorage.setItem("showLoginToast", "true");
          window.dispatchEvent(new Event("loginStatusChanged"));
          toast.success(data.message);
          navigate(redirectPath, { replace: true });
        }
      } else {
        data = await signup(name, email, password, gender, dob, city);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("username", name);
        localStorage.setItem(
          "userData",
          JSON.stringify({ name, email, gender, dob, city })
        );
        toast.success(data.message);
        navigate("/userdashboard", { replace: true });
        window.dispatchEvent(new Event("loginStatusChanged"));
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE PANEL */}
      <div className="auth-left">
        <h2>Scheme Finder Portal</h2>
        <p>
          Discover and access government schemes, benefits, and assistance
          programs tailored for you. Find the right schemes with ease.
        </p>
        <div className="auth-left-info">
          <span> <FaRegFileAlt/> 1000+ Schemes</span>
          <span> ✔ Verified</span>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="auth-right">
        <h3>Get Started</h3>
        <p>Access your scheme finder dashboard or create a new account</p>

        {/* TOGGLE BUTTONS */}
        <div className="auth-toggle">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Show name only on signup */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <img src={UserIcon} alt="User" className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <img src={EmailIcon} alt="Email" className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>

          <div className=" form-group password-field">
            <label htmlFor="password">Password</label>
            <img src={PasswordIcon} alt="Password" className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Gender + DOB only on signup */}
          {!isLogin && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender"> Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <img src={LocationIcon} alt="Location" className="input-icon" />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              </div>
            </>
          )}

          <button type="submit" className="auth-btn">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          By continuing, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
        <p className="auth-support">
          Need help? <a href="#">Contact Support</a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Login;
