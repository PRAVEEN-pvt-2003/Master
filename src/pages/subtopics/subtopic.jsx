import React, { useState, useEffect } from "react";
import "../../Styles/subtopic.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchSchemes } from "../../services/userservices";


import Loader from "../../components/loader";

import educationImg from "../../assets/Education-img1.jpeg";
import womenImg from "../../assets/Women-banner.jpeg";
import agricultureImg from "../../assets/Agriculture-banner.jpeg";
import RuralImg from "../../assets/rural-banner.jpeg";
import SportsImg from "../../assets/Sports-banner.jpeg";
import TourImg from "../../assets/Travel-banner.jpeg";
import PublicImg from "../../assets/Publicsafety-banner.jpeg";
import TaxImg from "../../assets/tax-banner.jpeg";
import FoodSafety from "../../assets/Foodsafety-banner.jpeg";
import SeniorImg from "../../assets/senior-banner.png";
import { FaCalendarAlt, FaFileAlt, FaUserFriends } from "react-icons/fa";

const categoryImages = {
  "EDUCATION": educationImg,
  "WOMEN": womenImg,
  "AGRICULTURE": agricultureImg,
  "RURAL & URBAN DEVELOPMENT": RuralImg,
  "SPORTS": SportsImg,
  "TOURISM": TourImg,
  "PUBLIC SAFETY": PublicImg,
  "TAX & PUBLIC FINANCE": TaxImg,
  "FOOD SECURITY": FoodSafety,
  "SENIOR CITIZEN": SeniorImg,
};

function Subtopic() {
  const { topicId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
    const [searchTerm] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // 🔹 loader state
  const schemesPerPage = 6;

  const selectedCategory =
    topicId === "all"
      ? "ALL"
      : location.state?.selectedCategory || topicId?.toUpperCase() || "EDUCATION";

  useEffect(() => {
    const loadSchemes = async () => {
      setLoading(true);
      try {
        const data = await fetchSchemes();
        if (topicId === "all") {
          setSchemes(data);
        } else {
          const filtered = data.filter(
            (s) => s.category?.toLowerCase() === topicId.toLowerCase()
          );
          setSchemes(filtered);
        }
      } catch (err) {
        console.error("Error fetching schemes:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };
    loadSchemes();
  }, [topicId]);
  const filteredSchemes = schemes.filter((s) => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch = s.scheme_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(schemes.length / schemesPerPage);
  const indexOfLast = currentPage * schemesPerPage;
  const indexOfFirst = indexOfLast - schemesPerPage;
  const currentSchemes = schemes.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (number) => {
    setCurrentPage(number);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imageSrc = categoryImages[selectedCategory] || educationImg;

  if (loading) return <Loader />;

  return (
    <>
      <div className="top-card">
        <img src={imageSrc} alt={`${selectedCategory} banner`} className="top-card-img" />
        <h6 className="top-card-text">{selectedCategory}</h6>
      </div>

    <div className="availability-msg">
      <h4>Available Schemes</h4>
      <p>{filteredSchemes.length} Schemes found </p>
    </div>

      <div className="contents">
  {currentSchemes.length === 0 ? (
    <p>No schemes found under {selectedCategory}.</p>
  ) : (
    currentSchemes.map((scheme) => (
      <div
        key={scheme.id}
        className="scheme-card"
        onClick={() => navigate(`/detail/${scheme.id}`)}
        style={{ cursor: "pointer" }}
      >
        <h4 className="scheme-title">{scheme.scheme_name}</h4>

        <p className="scheme-description">
          <FaFileAlt/>
          <strong>Description:</strong> {scheme.description}
        </p>

        <p className="scheme-eligibility">
          <FaUserFriends/>
          <strong>Eligibility:</strong> {scheme.eligibility}
        </p>

        <p className="scheme-date">
          <FaCalendarAlt/>
          <strong>Date:</strong> {scheme.date || "N/A"}
        </p>
      </div>
    ))
  )}
</div>


      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Subtopic;
