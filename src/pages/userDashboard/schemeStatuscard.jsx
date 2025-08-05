import React from 'react';
import './UserDashboard.css';

function SchemeStatusCard({ name, status }) {
  const statusColor = {
    Approved: '#d4edda',
    Pending: '#fff3cd',
    Rejected: '#f8d7da'
  };

  return (
    <div className="scheme-card" style={{ backgroundColor: statusColor[status] || '#eee' }}>
      <h4>{name}</h4>
      <span className={`status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}

export default SchemeStatusCard;
