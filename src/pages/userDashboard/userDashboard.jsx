import React, { useState, useEffect } from 'react';
import './userDashboard.css';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';

import EditProfileModal from '../userDashboard/Editprofile'; 

import User0 from '../../assets/user0.jpg';
import User1 from '../../assets/user1.png';
import User2 from '../../assets/user2.png';
import User3 from '../../assets/user3.png';
import User4 from '../../assets/user4.png';

function UserDashboard() {
  const allImages = {
    default: User0,
    options: [User1, User2, User3, User4],
  };

  useEffect(() => {
    const shouldShowToast = sessionStorage.getItem('showToast');
    if (shouldShowToast === 'true') {
      toast.success('Login successful!');
      sessionStorage.removeItem('showToast');
    }
  }, []);

  const savedProfile = localStorage.getItem('profile');
  const [selectedImage, setSelectedImage] = useState(savedProfile || allImages.default);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (img) => {
    setSelectedImage(img);
    localStorage.setItem('profile', img);
    setShowOptions(false);
  };

  const storedUser = JSON.parse(localStorage.getItem('userData')) || {};
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser.name || 'User',
    dob: storedUser.dob || '',
    city: storedUser.city || 'N/A',
  });

  const user = {
    name: formData.name,
    email: storedUser.email || 'user@example.com',
    gender: storedUser.gender || 'N/A',
    city: formData.city,
    profile: selectedImage,
  };

  const handleSave = (updatedFormData) => {
    const updatedUser = {
      ...storedUser,
      ...updatedFormData,
    };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setFormData(updatedFormData);
    setIsEditing(false);
  };

  const schemes = [
    { id: 1, name: 'Skill Training', status: 'Approved' },
    { id: 2, name: 'Startup Fund', status: 'Rejected' },
    { id: 3, name: 'Student Support', status: 'Pending' },
    { id: 4, name: 'Entrepreneur Program', status: 'Approved' },
    { id: 5, name: 'Hostel Facility', status: 'Pending' },
  ];

  const statusCount = {
    Applied: schemes.length,
    Approved: schemes.filter((s) => s.status === 'Approved').length,
    Pending: schemes.filter((s) => s.status === 'Pending').length,
    Rejected: schemes.filter((s) => s.status === 'Rejected').length,
  };

  return (
    <div className="github-dashboard">
      <aside className="github-sidebar">
        <div className="profile-container">
          <img src={selectedImage} alt="Profile" className="profile-pic" />
          <FaCamera className="pencil-icon" onClick={() => setShowOptions(!showOptions)} />
        </div>

        {showOptions && (
          <div className="image-grid">
            {allImages.options.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Option ${idx + 1}`}
                className={`profile-option ${selectedImage === img ? 'selected' : ''}`}
                onClick={() => handleSelect(img)}
              />
            ))}
          </div>
        )}

        <h2 className="user-name">{user.name}</h2>
        <p className="user-Gender">{user.gender}/</p>
        <p className="user-city">{user.city}</p>
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>

        <div className="sidebar-stats">
          <h3 className="sidebar-title">Scheme Status</h3>
          <ul className="stats-list">
            <li><span className="dot green"></span> Applied: {statusCount.Applied}</li>
            <li><span className="dot blue"></span> Approved: {statusCount.Approved}</li>
            <li><span className="dot yellow"></span> Pending: {statusCount.Pending}</li>
            <li><span className="dot red"></span> Rejected: {statusCount.Rejected}</li>
          </ul>
        </div>
      </aside>

      <main className="github-main">
        <h1>Welcome <span className="User-name" style={{ color: '#2563eb' }}>{user.name}</span></h1>

        <h3 className="section-title">Applied Schemes</h3>
        <div className="repo-list">
          {schemes.map((scheme) => (
            <div className="repo-card" key={scheme.id}>
              <div className="repo-header">
                <h3 className="repo-title">{scheme.name}</h3>
                <span className={`status-badge ${scheme.status.toLowerCase()}`}>
                  {scheme.status}
                </span>
              </div>
              <p className="repo-id">Scheme ID: {scheme.id}</p>
            </div>
          ))}
        </div>
      </main>

      {isEditing && (
        <EditProfileModal
          userData={formData}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default UserDashboard;
