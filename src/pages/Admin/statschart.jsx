
import React, { useState } from "react";
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
import { FaArrowLeft } from "react-icons/fa";
import "../../Styles/admin.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LiveStatsDashboard = () => {
  const [applications] = useState([
    { id: 1, user: "John Doe", status: "Approved", category: "Education" },
    { id: 2, user: "Jane Smith", status: "Pending", category: "Women" },
    { id: 3, user: "Mike Johnson", status: "Rejected", category: "Agriculture" },
    { id: 4, user: "Alice Brown", status: "Approved", category: "Tourism" },
    { id: 5, user: "Bob Lee", status: "Pending", category: "Sports" },
  ]);

  const [activeCard, setActiveCard] = useState(null);

  const totalApplications = applications.length;
  const approved = applications.filter(a => a.status === "Approved").length;
  const pending = applications.filter(a => a.status === "Pending").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;

  const getFilteredApps = (card) => {
    if (card === "approved") return applications.filter(a => a.status === "Approved");
    if (card === "pending") return applications.filter(a => a.status === "Pending" || a.status === "Rejected");
    return applications;
  };

  const data = {
    labels: ["Education","Women","Senior Citizen","Agriculture","Tourism","Rural & Urban development","Sports","Public safety","Tax & public Finance","Food security"],
    datasets: [
      {
        label: "Number of Schemes",
        data: [27,20,14,16,10,18,12,13,15,12],
        borderColor: "#4caf50",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#2196f3",
        pointBorderColor: "#fff",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, title: { display: true, text: "Schemes per Category" } },
    scales: { y: { beginAtZero: true, stepSize: 2 } },
  };

  return (
    <div className="stats-container">
      {/* Cards */}
      <div className="stats-cards">
        {[
          { key: "total", title: "Total Applications", count: totalApplications },
          { key: "approved", title: "Approved", count: approved },
          { key: "pending", title: "Pending / Rejected", count: `${pending} / ${rejected}` },
        ].map(card => (
          <div
            key={card.key}
            className={`stats-card ${activeCard === card.key ? "active-card" : ""}`}
            onClick={() => setActiveCard(card.key)}
          >
            <h3>{card.title}</h3>
            <p>{card.count}</p>
          </div>
        ))}
      </div>

      {/* Chart or Table */}
      <div style={{ marginTop: "30px" }}>
        {!activeCard ? (
          <div style={{ height: "350px" }}>
            <Line data={data} options={options} />
          </div>
        ) : (
          <div>
            {/* Back arrow */}
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: "15px", cursor: "pointer", color: "#01060bff", fontWeight: 500 }}
              onClick={() => setActiveCard(null)}
            >
              <FaArrowLeft style={{ marginRight: "8px" }} /> 
            </div>

            {/* Modern Table */}
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                overflowX: "auto"
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>
                {activeCard === "total" ? "All Applications" :
                 activeCard === "approved" ? "Approved Applications" :
                 "Pending / Rejected Applications"}
              </h3>

              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5", textAlign: "center", fontWeight: 600 }}>
                    <th style={{ padding: "12px" }}>ID</th>
                    <th style={{ padding: "12px" }}>User</th>
                    <th style={{ padding: "12px" }}>Status</th>
                    <th style={{ padding: "12px" }}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredApps(activeCard).map((app, index) => (
                    <tr
                      key={app.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                        transition: "background 0.3s",
                        cursor: "default"
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eaeaeaff"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "#fff"}
                    >
                      <td style={{ padding: "12px" }}>{app.id}</td>
                      <td style={{ padding: "12px" }}>{app.user}</td>
                      <td style={{ padding: "12px", fontWeight: 500, color: app.status === "Approved" ? "#4caf50" : app.status === "Pending" ? "#ff9800" : "#f44336" }}>{app.status}</td>
                      <td style={{ padding: "12px" }}>{app.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStatsDashboard;
