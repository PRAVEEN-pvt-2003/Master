import React, { useEffect, useState } from "react";
import "../../Styles/userDashboard.css";
import {
  FaCamera,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEnvelope,
  FaCity,
  FaBirthdayCake,
  FaMoneyBillWave,
  FaChartBar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import EditProfileModal from "../userDashboard/Editprofile";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import User0 from "../../assets/user0.jpg";
import User1 from "../../assets/user1.png";
import User2 from "../../assets/user2.png";
import User3 from "../../assets/user3.png";
import User4 from "../../assets/user4.png";

function UserDashboard() {
  const allImages = { default: User0, options: [User1, User2, User3, User4] };
  const [activeTab, setActiveTab] = useState("all");
  const [schemes, setSchemes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(allImages.default);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storedUser = JSON.parse(localStorage.getItem("userData")) || {};
  const savedProfile = localStorage.getItem("profile");

  useEffect(() => {
    if (savedProfile) setSelectedImage(savedProfile);
  }, [savedProfile]);

  useEffect(() => {
    const shouldShowToast = sessionStorage.getItem("showLoginToast");
    if (shouldShowToast === "true") {
      toast.success("Login successful!");
      sessionStorage.removeItem("showLoginToast");
    }

    const username = storedUser.email || storedUser.username;
    const appliedSchemes = JSON.parse(localStorage.getItem("appliedSchemes")) || [];

    const userSchemes = appliedSchemes
      .filter((s) => s.userEmail === username)
      .map((s, idx) => ({
        ...s,
        dateApplied: s.dateApplied || `2025-09-${(idx % 30) + 1}`,
      }));

    setSchemes(userSchemes);
  }, [storedUser]);

  const [formData, setFormData] = useState({
    name: storedUser.name || storedUser.username || "User",
    dob: storedUser.dob || "",
    city: storedUser.city || "Chennai, Tamil Nadu",
  });

  const user = {
    name: formData.name,
    email: storedUser.email || storedUser.username || "user@example.com",
    dob: formData.dob,
    city: formData.city,
    profile: selectedImage,
  };

  const handleSelect = (img) => {
    setSelectedImage(img);
    localStorage.setItem("profile", img);
    setShowOptions(false);
  };

  const handleSave = (updatedFormData) => {
    const updatedUser = { ...storedUser, ...updatedFormData };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setFormData(updatedFormData);
    setIsEditing(false);
  };

  const statusCount = {
    Applied: schemes.length,
    Approved: schemes.filter((s) => s.status === "Approved").length,
    Pending: schemes.filter((s) => s.status === "Pending").length,
    Rejected: schemes.filter((s) => s.status === "Rejected").length,
  };

  const calculateAge = (dob) => {
    if (!dob) return "Not set";
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return "Invalid date";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const filteredSchemes = activeTab === "all" ? schemes : schemes.filter((s) => s.status.toLowerCase() === activeTab);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Applications Over Time" },
    },
    scales: { y: { beginAtZero: true, stepSize: 1 } },
  };

  const getChartData = () => {
    const dateMap = {};
    schemes.forEach((s) => {
      const date = s.dateApplied || "Unknown";
      dateMap[date] = (dateMap[date] || 0) + 1;
    });
    const sortedDates = Object.keys(dateMap).sort((a, b) => new Date(a) - new Date(b));
    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Applications per Date",
          data: sortedDates.map((d) => dateMap[d]),
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)",
          fill: true,
          tension: 0.3,
          pointBackgroundColor: "#2563eb",
          pointRadius: 5,
        },
      ],
    };
  };

  return (
    <div className="user-dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="profile-box">
          <div className="profile-pic-container">
            <img src={selectedImage} alt="Profile" className="profile-pic" />
            <FaCamera className="camera-icon" onClick={() => setShowOptions(!showOptions)} />
          </div>
          {showOptions && (
            <div className="profile-options">
              {allImages.options.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Option ${idx + 1}`}
                  className={`profile-option ${selectedImage === img ? "selected" : ""}`}
                  onClick={() => handleSelect(img)}
                />
              ))}
            </div>
          )}
          <h2 className="user-name">{user.name}</h2>
          <p className="user-city">{user.city}</p>
          <p className="user-id">ID: TN2024001</p>
        </div>

        {/* Sidebar Navigation WITHOUT Analytics */}
        <nav className="sidebar-nav">
          <button className={`nav-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            <FaFileAlt /> All Applications <span>{schemes.length}</span>
          </button>
          <button className={`nav-btn ${activeTab === "approved" ? "active" : ""}`} onClick={() => setActiveTab("approved")}>
            <FaCheckCircle /> Approved <span>{statusCount.Approved}</span>
          </button>
          <button className={`nav-btn ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
            <FaClock /> Pending <span>{statusCount.Pending}</span>
          </button>
          <button className={`nav-btn ${activeTab === "rejected" ? "active" : ""}`} onClick={() => setActiveTab("rejected")}>
            <FaTimesCircle /> Rejected <span>{statusCount.Rejected}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-content">
        <h1 className="dashboard-title">User Dashboard</h1>

        {/* Status Overview with Analytics Card */}
        <div className="status-overview">
          <div className="status-card total">
            <p>Total Applications</p>
            <h2>{schemes.length}</h2>
          </div>
          <div className="status-card approved">
            <p>Approved</p>
            <h2>{statusCount.Approved}</h2>
          </div>
          <div className="status-card pending">
            <p>Pending</p>
            <h2>{statusCount.Pending}</h2>
          </div>
          <div className="status-card rejected">
            <p>Rejected</p>
            <h2>{statusCount.Rejected}</h2>
          </div>
          <div
            className="status-card analytics"
            onClick={() => setActiveTab("analytics")}
            style={{ cursor: "pointer" }}
          >
            <p>Analytics</p>
            <h2>
              <FaChartBar />
            </h2>
          </div>
        </div>

        {/* Applications List OR Analytics Graph */}
        {activeTab === "analytics" ? (
          <div className="analytics-graph-container">
            <h3>Applications Analytics</h3>
            {schemes.length === 0 ? (
              <p>No applications data to show.</p>
            ) : (
              <Line data={getChartData()} options={chartOptions} height={300} />
            )}
          </div>
        ) : (
          <>
            <h2 className="dashboard-section-title">Applications</h2>
            <div className="applications-list">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme, index) => (
                  <div className={`application-card ${scheme.status.toLowerCase()}`} key={index}>
                    <div className="app-header">
                      <h3>{scheme.name}</h3>
                      <span className={`badge ${scheme.status.toLowerCase()}`}>{scheme.status}</span>
                    </div>
                    <p>Application ID: {scheme.id}</p>
                    <div className="app-footer">
                      <span>Status: {scheme.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No applications found in this category.</p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Right Panel */}

      <aside className="analytics-panel">
        <div className="user-panel">
          <div className="user-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <div className="detail-card">
              <FaEnvelope className="detail-icon" />
              <div className="detail-text">
                <p className="detail-label">Email</p>
                <p className="detail-value">{user.email}</p>
              </div>
            </div>

            <div className="detail-card">
              <FaCity className="detail-icon" />
              <div className="detail-text">
                <p className="detail-label">City</p>
                <p className="detail-value">{user.city}</p>
              </div>
            </div>

            <div className="detail-card">
              <FaBirthdayCake className="detail-icon" />
              <div className="detail-text">
                <p className="detail-label">Date of Birth</p>
                <p className="detail-value">{user.dob ? `${user.dob} / ${calculateAge(user.dob)} years` : "Not set"}</p>
              </div>
            </div>

            <div className="detail-card">
              <FaMoneyBillWave className="detail-icon" />
              <div className="detail-text">
                <p className="detail-label">Salary:</p>
                <p className="detail-value">2,00,000</p>
              </div>
            </div>

            <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        </div>
      </aside>

      {isEditing && <EditProfileModal userData={formData} onClose={() => setIsEditing(false)} onSave={handleSave} />}
    </div>
  );
}

export default UserDashboard;
