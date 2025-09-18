import React, { useEffect, useState } from "react";
import "../../Styles/admin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
} from "../../services/userservices";
import MainAdmin from "../../assets/main-admin.png";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaFolderOpen,
  FaFileAlt,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import TickIcon from "../../assets/round.png";
import CancelIcon from "../../assets/cancel.png";
import TimeIcon from "../../assets/time.png";
import ApplicationImg from "../../assets/user.png";
import ApplicationUser from "../../assets/2User.png";
import FolderIcon from "../../assets/application-png.png"
import BarIcon from "../../assets/bar.png";
import PlusIcon from "../../assets/plus.png"

function Admin() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [adminName, setAdminName] = useState("Admin");
  const [view, setView] = useState("stats");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSchemeId, setEditSchemeId] = useState(null);
  const [formData, setFormData] = useState({
    scheme_name: "",
    description: "",
    eligibility: "",
    date: "",
    category: "",
    benefits: "",
    required_documents: "",
    how_to_apply: "",
    contact_info: "",
  });

  const navigate = useNavigate();

  const categories = [
    "EDUCATION",
    "WOMEN",
    "SENIOR CITIZEN",
    "AGRICULTURE",
    "RURAL & URBAN DEVELOPMENT",
    "SPORTS",
    "TOURISM",
    "PUBLIC SAFETY",
    "TAX & PUBLIC FINANCE",
    "FOOD SECURITY",
  ];

  const [applications, setApplications] = useState([
    { id: 1, name: "John Doe", scheme_name: "Education Grant", status: "pending" },
    { id: 2, name: "Jane Smith", scheme_name: "Health Coverage", status: "approved" },
    { id: 3, name: "Raj Patel", scheme_name: "Women's Safety Program", status: "rejected" },
    { id: 4, name: "Anita Sharma", scheme_name: "Youth Skill Program", status: "pending" },
  ]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const adminUsername = localStorage.getItem("adminUsername");

    if (isAdmin !== "true") {
      navigate("/adminlogin");
      return;
    }

    if (adminUsername) {
      setAdminName(adminUsername);
    }

    loadSchemes();
  }, [navigate]);

  const loadSchemes = async () => {
    try {
      const data = await fetchSchemes();
      setSchemes(data);
    } catch {
      toast.error("Failed to load schemes");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (scheme) => {
    setFormData({
      scheme_name: scheme.scheme_name,
      description: scheme.description,
      eligibility: scheme.eligibility,
      date: scheme.date || "",
      category: scheme.category || "",
      benefits: scheme.benefits,
      required_documents: scheme.required_documents,
      how_to_apply: scheme.how_to_apply,
      contact_info: scheme.contact_info,
    });
    setEditSchemeId(scheme.id);
    setIsEditMode(true);
    setView("add");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scheme?")) return;
    try {
      await deleteScheme(id);
      toast.success("Scheme deleted");
      loadSchemes();
    } catch {
      toast.error("Failed to delete scheme");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemeData = {
      ...formData,
      date: formData.date || null,
      category: formData.category || "",
    };

    try {
      if (isEditMode) {
        await updateScheme(editSchemeId, schemeData);
        toast.success("Scheme updated successfully");
      } else {
        await createScheme(schemeData);
        toast.success("Scheme created successfully");
      }

      setFormData({
        scheme_name: "",
        description: "",
        eligibility: "",
        date: "",
        category: "",
        benefits: "",
        required_documents: "",
        how_to_apply: "",
        contact_info: "",
      });

      setIsEditMode(false);
      setEditSchemeId(null);
      loadSchemes();
    } catch (error) {
      toast.error("Failed to save scheme");
      console.error("Error saving scheme:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminToken");
    toast.info("Logged out successfully");
    navigate("/");
  };

  const handleApplicationAction = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    toast.success(`Application ${status}`);
  };

  const filteredSchemes = schemes.filter((s) =>
    selectedCategory ? s.category === selectedCategory : true
  );

  const getCurrentViewTitle = () => {
    switch (view) {
      case "stats":
        return "Admin Dashboard";
      case "add":
        return isEditMode ? "Edit Scheme" : "Add Scheme";
      case "schemes":
        return "Manage Schemes";
      case "applicants":
        return "Applications";
      default:
        return "";
    }
  };

  const monthlyApplications = [
    { month: "Jan", applications: 40 },
    { month: "Feb", applications: 60 },
    { month: "Mar", applications: 50 },
    { month: "Apr", applications: 80 },
    { month: "May", applications: 70 },
    { month: "Jun", applications: 90 },
  ];

  const schemeCategories = [
    { name: "EDUCATION", value: 40 },
    { name: "WOMEN", value: 30 },
    { name: "AGRICULTURE", value: 20 },
    { name: "SPORTS", value: 10 },
  ];

  const schemePerformance = [
    { month: "Jan", approved: 30, rejected: 10 },
    { month: "Feb", approved: 50, rejected: 20 },
    { month: "Mar", approved: 40, rejected: 10 },
    { month: "Apr", approved: 60, rejected: 25 },
    { month: "May", approved: 55, rejected: 15 },
    { month: "Jun", approved: 70, rejected: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Calculate approval rate
const totalApplications = applications.length;
const approvedApplications = applications.filter(app => app.status === "approved").length;
const approvalRate = totalApplications === 0 ? 0 : Math.round((approvedApplications / totalApplications) * 100);

// Simulated processing times (in days)
const processingTimes = [3, 5, 2, 4]; // example days per application
const avgProcessingTime = processingTimes.length === 0
  ? 0
  : Math.round(processingTimes.reduce((a,b) => a+b, 0) / processingTimes.length);

// Simulated user satisfaction ratings (scale 1-5)
const userRatings = [4,5,5,3,4];
const avgUserRating = userRatings.length === 0
  ? 0
  : (userRatings.reduce((a,b) => a+b, 0) / userRatings.length).toFixed(1);


const [openDropdown, setOpenDropdown] = useState(null);
const [modalApplicant, setModalApplicant] = useState(null);

// Toggle the dropdown menu for a specific applicant
const toggleDropdown = (id) => {
  setOpenDropdown(openDropdown === id ? null : id);
};

// Open the modal to view applicant details
const handleViewDetails = (id) => {
  const applicant = applications.find((app) => app.id === id);
  if (applicant) setModalApplicant(applicant);
  setOpenDropdown(null); // Close dropdown after clicking
};

// Close the modal
const closeModal = () => setModalApplicant(null);



  return (
    <div className="admin-page">
      <ToastContainer position="top-right" autoClose={1500} />

      {/* Sidebar */}
      <div className="sidebar">
        <div className="admin-profile">
          <img src={MainAdmin} alt="Admin" className="admin-image" />
          <h2>
            {adminName
              ? adminName.charAt(0).toUpperCase() + adminName.slice(1).toLowerCase()
              : "Admin"}
          </h2>
          <p>Administrator</p>
        </div>
                <div className="crossover-line"></div>
        <ul className="nav-links">
          <li className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>
            <img src={BarIcon} alt="baricon" className="nav-icon"/>
            <span>Dashboard</span>
          </li>
          <li className={view === "add" ? "active" : ""} onClick={() => setView("add")}>
            <img src={PlusIcon} alt="addIcon" className="nav-icon"/>
            <span>Add Scheme</span>
          </li>
          <li className={view === "schemes" ? "active" : ""} onClick={() => setView("schemes")}>
            <img src={FolderIcon} alt="document" className="nav-icon"/>
            <span>Manage Schemes</span>
          </li>
          <li className={view === "applicants" ? "active" : ""} onClick={() => setView("applicants")}>
            <img src={ApplicationUser} alt="" className="nav-icon"/>
            <span>Applications</span>
          </li>
        </ul>

              <div className="crossover-line"></div>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="center-content">
        <div className="fixed-header">
          <h2>{getCurrentViewTitle()}</h2>
          <div className="header-right">
            <input type="text" placeholder="Search..." className="header-search" />
            <div className="icon-button">
              <FaBell/>
            </div>
          </div>
        </div>

        {/* ===== Page Content ===== */}
        <div className="page-content">
          {/* Your existing content for Add, Manage, Stats, Applications */}
          {/* Add Scheme */}
         {view === "add" && (
            <form className="add-scheme-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>+ Add Scheme</h2>
                <p>Create a new scheme</p>
              </div>

              {/* Row 1: Scheme Name & Category */}
              <div className="form-row">
                <div className="form-group">
                  <label>Scheme Name</label>
                  <input type="text" name="scheme_name" value={formData.scheme_name} onChange={handleInputChange} required placeholder="Enter scheme name"/>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (<option key={idx} value={cat}>{cat}</option>))}
                  </select>
                </div>
              </div>

              {/* Row 2: Launch Date & Contact Info */}
              <div className="form-row">
                <div className="form-group">
                  <label>Launch Date</label>
                  <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                  placeholder="Starting Date"/>
                </div>
                <div className="form-group">
                  <label>Contact Info</label>
                  <input 
                  type="text" 
                  name="contact_info" 
                  value={formData.contact_info} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Contact info"/>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
                placeholder="Discription"/>
              </div>

              {/* Eligibility */}
              <div className="form-group">
                <label>Eligibility Criteria</label>
                <textarea 
                name="eligibility" 
                value={formData.eligibility} 
                onChange={handleInputChange} 
                required 
                placeholder="Eligibility"/>
              </div>

              {/* Benefits */}
              <div className="form-group">
                <label>Benefits</label>
                <textarea 
                name="benefits" 
                value={formData.benefits} 
                onChange={handleInputChange} 
                placeholder="Benefits"/>
              </div>

              {/* Row 3: Required Documents & How to Apply */}
              <div className="form-row">
                <div className="form-group">
                  <label>Required Documents</label>
                  <textarea 
                  name="required_documents" 
                  value={formData.required_documents} 
                  onChange={handleInputChange} 
                  placeholder="Required document"/>
                </div>
                <div className="form-group">
                  <label>How to Apply</label>
                  <textarea 
                  name="how_to_apply" 
                  value={formData.how_to_apply} 
                  onChange={handleInputChange} 
                  placeholder="How to apply"/>
                </div>
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button type="submit">{isEditMode ? "Update Scheme" : "Create Scheme"}</button>
              </div>
            </form>
          )}

          {/* Manage Schemes */}
          {view === "schemes" && (
            <>
              <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className="scheme-filter">
                <option value="">All Categories</option>
                {categories.map((cat, idx) => (<option key={idx} value={cat}>{cat}</option>))}
              </select>
              <div className="table-wrapper">
                <table className="scheme-table">
                  <thead>
                    <tr>
                      <th>Scheme Name</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Eligibility</th>
                      <th>Date</th>
                      <th>Benefits</th>
                      <th>Required Documents</th>
                      <th>How to Apply</th>
                      <th>Contact Info</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchemes.length > 0 ? filteredSchemes.map((scheme) => (
                      <tr key={scheme.id}>
                        <td>{scheme.scheme_name}</td>
                        <td>{scheme.category || "N/A"}</td>
                        <td>{scheme.description}</td>
                        <td>{scheme.eligibility}</td>
                        <td>{scheme.date || "N/A"}</td>
                        <td>{scheme.benefits}</td>
                        <td>{scheme.required_documents}</td>
                        <td>{scheme.how_to_apply}</td>
                        <td>{scheme.contact_info}</td>
                        <td className="action-buttons">
                          <button onClick={() => handleEdit(scheme)} className="edit-button">Edit</button>
                          <button onClick={() => handleDelete(scheme.id)} className="delete-button">Delete</button>
                        </td>
                      </tr>
                    )) : (<tr><td colSpan="10" style={{ textAlign: "center" }}>No schemes found.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </>
          )}

         {view === "stats" && (
  <div className="stats-view">

    <div className="stats-top-cards">
  {/* Total Schemes */}
  <div className="top-card">
    <div className="card-info">
      <p>Total Schemes</p>
      <h3>{schemes.length}</h3>
      <p className="card-extra">{schemes.length} Active Schemes</p>
    </div>
    <div className="card-icon" style={{ backgroundColor: "#3b65f0ff" }}>
      <FaFolderOpen color="#fff" size={24} />
    </div>
  </div>

  {/* Total Applications */}
  <div className="top-card">
    <div className="card-info">
      <p>Total Applications</p>
      <h3>{applications.length}</h3>
      <p className="card-extra">This Month</p>
    </div>
    <div className="card-icon" style={{ backgroundColor: "#00C49F" }}>
      <FaFileAlt color="#fff" size={24} />
    </div>
  </div>

  {/* Pending Review */}
  <div className="top-card">
    <div className="card-info">
      <p>Pending Review</p>
      <h3>{applications.filter(app => app.status === "pending").length}</h3>
      <p className="card-extra">Awaiting Approvals</p>
    </div>
    <div className="card-icon" style={{ backgroundColor: "#FFBB28" }}>
      <FaBell color="#fff" size={24} />
    </div>
  </div>

  {/* Approved Applications */}
  <div className="top-card">
    <div className="card-info">
      <p>Approved Applications</p>
      <h3>{applications.filter(app => app.status === "approved").length}</h3>
      <p className="card-extra">
        {applications.length === 0 
          ? "0% Success Rate" 
          : `${Math.round(
              (applications.filter(app => app.status === "approved").length / applications.length) * 100
            )}% Success Rate`}
      </p>
    </div>
    <div className="card-icon" style={{ backgroundColor: "#4CAF50" }}>
      <FaTachometerAlt color="#fff" size={24} />
    </div>
  </div>
</div>


    <div className="stats-charts">
      {/* Monthly Applications Chart */}
      <div className="chart-card">
        <h3>Monthly Applications</h3>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={monthlyApplications}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#355feb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scheme Categories Chart */}
      <div className="chart-card">
        <h3>Scheme Categories Distribution</h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={schemeCategories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {schemeCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Scheme Performance Chart */}
    <div className="chart-card full-width-chart">
      <h3>Scheme Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={schemePerformance}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="approved" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="rejected" stroke="#ff7300" fill="#ff7300" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

              <div className="stats-bottom-cards">
  {/* Approval Rate */}
  <div className="bottom-card">
    <h4>Approval Rate</h4>
    <div className="loader-bar">
      <div className="loader-fill" style={{ width: `${approvalRate}%`, backgroundColor: "#4CAF50" }}></div>
    </div>
    <p>{approvalRate}% Approved</p>
  </div>

  {/* Processing Time */}
  <div className="bottom-card">
    <h4>Processing Time</h4>
    <div className="loader-bar">
      {/* Assuming max processing time is 10 days */}
      <div className="loader-fill" style={{ width: `${Math.min(avgProcessingTime*10, 100)}%`, backgroundColor: "#355feb" }}></div>
    </div>
    <p>Average: {avgProcessingTime} days</p>
  </div>

  {/* User Satisfaction */}
  <div className="bottom-card">
    <h4>User Satisfaction</h4>
    <div className="loader-bar">
      <div className="loader-fill" style={{ width: `${(avgUserRating/5)*100}%`, backgroundColor: "#FFBB28" }}></div>
    </div>
    <p>Rating: {avgUserRating} / 5</p>
  </div>
</div>
  </div> 
)}

  



          {/* Applications */}
{view === "applicants" && (
  <div className="applicants-section">
    
    {/* ===== Summary Cards on Top ===== */}
    <div className="summary-cards">
      <div className="summary-card total">
        <div className="card-container">
        <h4>Total Applications</h4>
        <p>{applications.length}</p>
        </div>
        <img src={ApplicationImg} alt="userimg" className="application-admin-icon" />
      </div>

      <div className="summary-card approved">
        <div className="card-container">
        <h4>Approved</h4>
        <p>{applications.filter(app => app.status === "approved").length}</p>
        </div>
        <img src={TickIcon} alt="approved icon" className="application-admin-icon"/>
      </div>

      <div className="summary-card pending">
        
        <div className="card-container">
        <h4>Pending</h4>
        <p>{applications.filter(app => app.status === "pending").length}</p>
        </div>
        <img src={TimeIcon} alt="pending icon" className="application-admin-icon"/>
      </div>

      <div className="summary-card rejected">
        
        <div className="card-container">
        <h4>Rejected</h4>
        <p>{applications.filter(app => app.status === "rejected").length}</p>
        </div>
        <img src={CancelIcon} alt="Rejected icon" className="application-admin-icon"/>
      </div>
    </div>

    <div className="application-title-bar">
      <h1>Applications</h1>
      <p>{applications.length}  <span>applications showing</span></p>
    </div>

    {/* ===== Applicants Grid Below ===== */}
    <div className="applicants-container">
      {applications.map((app) => (
        <div key={app.id} className="application-scheme-card">
          {/* Top section: avatar, name, scheme, badge + dots */}
          <div className="card-top">
            <div className="user-info">
              <div className="user-top">
                <div className="user-avatar">{app.name[0].toUpperCase()}</div>
                <div className="name-scheme">
                  <p className="user-name">{app.name}</p>
                  <p className="scheme-name">{app.scheme_name}</p>
                </div>
              </div>
            </div>

            <div className="badge-dots">
              <span className={`status-badge ${app.status}`}>
                {app.status}
              </span>
              <div className="dots-container">
                <div className="dots" onClick={() => toggleDropdown(app.id)}>⋯</div>
                {openDropdown === app.id && (
                  <div className="dropdown-menu">
                    <p onClick={() => handleViewDetails(app.id)}>View Details</p>
                    <p 
                      onClick={() => handleApplicationAction(app.id, "approved")}
                      disabled={app.status === "approved"}
                    >
                      Approve
                    </p>
                    <p 
                      onClick={() => handleApplicationAction(app.id, "rejected")}
                      disabled={app.status === "rejected"}
                    >
                      Reject
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle info: location and date */}
          <div className="card-middle">
            <p className="user-location"><strong>Location:</strong> {app.city || "N/A"}</p>
            <p className="user-date"><strong>Date Applied:</strong> {app.date || "N/A"}</p>
          </div>

          {/* Bottom card actions */}
          <div className="card-actions">
            <button 
              className="approve-button" 
              onClick={() => handleApplicationAction(app.id, "approved")}
              disabled={app.status === "approved"}
            >
              Approve
            </button>
            <button 
              className="reject-button" 
              onClick={() => handleApplicationAction(app.id, "rejected")}
              disabled={app.status === "rejected"}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* ===== Modal ===== */}
    {modalApplicant && (
      <div className="modal-overlay" onClick={closeModal}>
  <div className="modal-card" onClick={(e) => e.stopPropagation()}>
    {/* Header */}
    <div className="modal-header">
      <div>
        <h3>Application Details</h3>
        <p>Complete information about this application</p>
      </div>
      <button className="modal-close" onClick={closeModal}>×</button>
    </div>

    {/* Applicant Name & Status */}
    <div className="info-row">
      <p><strong>Name:</strong> {modalApplicant.name}</p>
      <p><strong>Status:</strong> {modalApplicant.status}</p>
    </div>

    {/* Scheme Name & Location */}
    <div className="info-row">
      <p><strong>Scheme:</strong> {modalApplicant.scheme_name}</p>
      <p><strong>Location:</strong> {modalApplicant.city || "N/A"}</p>
    </div>

    {/* Applied Date */}
    <div className="info-row">
      <p><strong>Date Applied:</strong> {modalApplicant.date || "N/A"}</p>
    </div>
  </div>
</div>

    )}
  </div>
)}






        </div>
      </div>
    </div>
  );
}

export default Admin;
