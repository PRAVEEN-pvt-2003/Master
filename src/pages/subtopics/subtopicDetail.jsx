import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSchemes } from "../../services/userservices";
import "../../Styles/subtopicdetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader";

function Subtopicdetail() {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadScheme = async () => {
      setLoading(true);
      try {
        const data = await fetchSchemes();
        const found = data.find((s) => String(s.id) === String(schemeId));
        setScheme(found || null);
      } catch (err) {
        console.error("Error loading scheme detail:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    loadScheme();
  }, [schemeId]);

  if (loading) return <Loader />;

  if (!scheme) {
    return <p>No scheme details found.</p>;
  }

  const handleApply = () => {
  const storedUser = JSON.parse(localStorage.getItem("userData")) || null;

  if (!storedUser) {
    toast.info("Please login to apply for the scheme.");
    navigate("/auth");
    return;
  }

  const userEmail = storedUser.email || storedUser.username;

  const appliedSchemes =
    JSON.parse(localStorage.getItem("appliedSchemes")) || [];

  const alreadyApplied = appliedSchemes.some(
    (s) => s.id === scheme.id && s.userEmail === userEmail
  );

  if (!alreadyApplied) {
    appliedSchemes.push({
      id: scheme.id,
      name: scheme.scheme_name,
      status: "Pending",
      userEmail: userEmail,
    });
    localStorage.setItem("appliedSchemes", JSON.stringify(appliedSchemes));

    toast.success("Scheme applied successfully!");
  } else {
    toast.info("You have already applied for this scheme.");
  }

  setShowPopup(true);
};


  const applySteps = scheme.how_to_apply
    ? scheme.how_to_apply
        .split(/[\r\n]+|\. +|;+/)
        .map((step) => step.trim())
        .filter((step) => step.length > 0)
    : [];

  const handleGoDashboard = () => {
    setShowPopup(false);
    navigate("/userdashboard");
  };

  return (
    <div className="scheme-detail-page">
      <h1 className="scheme-title">{scheme.scheme_name}</h1>

      <h3>
        <strong>Description:</strong>
      </h3>
      <p>{scheme.description}</p>
      <h3>
        <strong>Eligibility:</strong>
      </h3>
      <p>{scheme.eligibility}</p>
      <h3>
        <strong>Date:</strong>
      </h3>
      <p>{scheme.date || "N/A"}</p>
      <h3>
        <strong>Category:</strong>
      </h3>
      <p>{scheme.category}</p>

      {applySteps.length > 0 && (
        <div className="apply-section">
          <h3>
            <strong>How to Apply</strong>
          </h3>
          <ul>
            {applySteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="scheme-buttons">
        <button
          className="back-btn"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/subtopics/all");
            }
          }}
        >
          Go Back
        </button>

        <button className="apply-btn" onClick={handleApply}>
          Apply Now
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="apply-popup">
          <div className="popup-card">
            <span className="popup-close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <h2>Scheme Applied Successfully!</h2>
            <button className="dashboard-btn" onClick={handleGoDashboard}>
              Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subtopicdetail;
