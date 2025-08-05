import React, { useEffect, useState } from 'react';
import './admin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchSchemes,
  createScheme,
  updateScheme,
  deleteScheme,
} from '../../services/userservices';
import LogoutImg from '../../assets/Logout-img.png';
import MainAdmin from '../../assets/main-admin.png';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [schemes, setSchemes] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [view, setView] = useState('add');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSchemeId, setEditSchemeId] = useState(null);
  const [formData, setFormData] = useState({
    scheme_name: '',
    description: '',
    eligibility: '',
    date: '',
    category: '',
  });

  const navigate = useNavigate();

  const categories = [
    'EDUCATION', 'WOMEN', 'SENIOR CITIZEN', 'AGRICULTURE',
    'RURAL & URBAN DEVELOPMENT', 'SPORTS', 'TOURISM', 'PUBLIC SAFETY',
    'TAX & PUBLIC FINANCE', 'FOOD SAFETY',
  ];

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    const adminUsername = localStorage.getItem('adminUsername');

    if (isAdmin !== 'true') {
      navigate('/adminlogin');
      return;
    }

    setAdminName(adminUsername);
    loadSchemes();
  }, [navigate]);

  const loadSchemes = async () => {
    try {
      const data = await fetchSchemes();
      setSchemes(data);
    } catch {
      toast.error('Failed to load schemes');
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
      date: scheme.date || '',
      category: scheme.category || '',
    });
    setEditSchemeId(scheme.id);
    setIsEditMode(true);
    setView('add');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;
    try {
      await deleteScheme(id);
      toast.success('Scheme deleted');
      loadSchemes();
    } catch {
      toast.error('Failed to delete scheme');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemeData = {
      ...formData,
      date: formData.date || null,
      category: formData.category || '',
    };

    try {
      if (isEditMode) {
        await updateScheme(editSchemeId, schemeData);
        toast.success('Scheme updated successfully');
      } else {
        await createScheme(schemeData);
        toast.success('Scheme created successfully');
      }
      setFormData({ scheme_name: '', description: '', eligibility: '', date: '', category: '' });
      setIsEditMode(false);
      setEditSchemeId(null);
      loadSchemes();
    } catch (error) {
      toast.error('Failed to save scheme');
      console.error('Error saving scheme:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    toast.info('Logged out successfully');
    setTimeout(() => {
      navigate('/adminlogin');
    }, 1000);
  };

  return (
    <div className="admin-page">
      <ToastContainer position="top-right" autoClose={1500} />

      {/* Sidebar */}
      <div className="sidebar">
        <div className="admin-profile">
          <img src={MainAdmin} alt="Admin" className="admin-image" />
          <h2>
            {adminName && typeof adminName === 'string'
              ? adminName.charAt(0).toUpperCase() + adminName.slice(1).toLowerCase()
              : 'Admin'}
          </h2>
        </div>
        <ul className="nav-links">
          <li onClick={() => setView('add')}>Add Scheme</li>
          <li onClick={() => setView('schemes')}>Existing Schemes</li>
          <li onClick={() => setView('stats')}>View Statistics</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          <img src={LogoutImg} alt="logout" className="logout-image" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="center-content">
        <h2 className="admin-name">
          Welcome{' '}
          {adminName && typeof adminName === 'string'
            ? adminName.charAt(0).toUpperCase() + adminName.slice(1).toLowerCase()
            : ''}
        </h2>

        {view === 'add' && (
          <>
            <h2 className="form-title">{isEditMode ? 'Edit Scheme' : 'Add New Scheme'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <input
                type="text"
                name="scheme_name"
                placeholder="Scheme Name"
                value={formData.scheme_name}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="form-textarea"
              />
              <textarea
                name="eligibility"
                placeholder="Eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                required
                className="form-textarea"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button type="submit" className="form-button">
                {isEditMode ? 'Update Scheme' : 'Add Scheme'}
              </button>
            </form>
          </>
        )}

        {view === 'schemes' && (
          <>
            <h3 className="existing_scheme">Existing Schemes</h3>
            <div className="scheme-list">
              {schemes.length === 0 ? (
                <p>No schemes found.</p>
              ) : (
                schemes.map((scheme) => {
                  console.log("Scheme:", scheme);
                  return (
                    <div key={scheme.id} className="scheme-card">
                      <h4>{scheme.scheme_name}</h4>
                      <p><strong>Category:</strong> {scheme.category || <em style={{ color: 'red' }}>Missing</em>}</p>
                      <p>{scheme.description}</p>
                      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                      <p><strong>Date:</strong> {scheme.date || 'N/A'}</p>
                      <button onClick={() => handleEdit(scheme)} className="edit-button">Edit</button>
                      <button onClick={() => handleDelete(scheme.id)} className="delete-button">Delete</button>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {view === 'stats' && (
          <div>
            <h3>Statistics View Coming Soon</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
