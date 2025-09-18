import React, { useState } from 'react';
import '../../Styles/Editprofile.css';

const EditProfileModal = ({ onClose, onSave, userData }) => {
  const [name, setName] = useState(userData.name || '');
  const [dob, setDob] = useState(userData.dob || '');
  const [city, setCity] = useState(userData.city || '');
  const [gender, setGender] = useState(userData.gender || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, dob,gender, city });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <select 
          className="dropdown-select"
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
