import React, { useState } from 'react';
import './Editprofile.css';

const EditProfileModal = ({ onClose, onSave, userData }) => {
  const [name, setName] = useState(userData.name || '');
  const [dob, setDob] = useState(userData.dob || '');
  const [city, setCity] = useState(userData.city || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, dob, city });
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
