import React, { useState, useEffect } from "react";
import "./subtopic.css";
import { fetchSchemes } from "../../services/userservices";
import { useLocation, } from 'react-router-dom';

import educationImg from '../../assets/Education-img1.jpeg';
import womenImg from '../../assets/Women-banner.jpeg';
import agricultureImg from '../../assets/Agriculture-banner.jpeg';
import RuralImg from '../../assets/rural-banner.jpeg';
import SportsImg from '../../assets/Sports-banner.jpeg';
import TourImg from '../../assets/Travel-banner.jpeg';
import PublicImg from '../../assets/Publicsafety-banner.jpeg';
import TaxImg from '../../assets/tax-banner.jpeg';
import FoodSafety from '../../assets/Foodsafety-banner.jpeg';
import SerniorImg from '../../assets/senior-banner.png';

const categoryImages = {
  "EDUCATION": educationImg,
  "WOMEN'S": womenImg,
  "AGRICULTURE": agricultureImg,
  "RURAL & URBAN DEVELOPMENT": RuralImg,
  "SPORTS":SportsImg,
  "TOURISM":TourImg,
  "PUBLIC SAFETY":PublicImg,
  "TAX & PUBLIC FINANCE": TaxImg,
  "FOOD SECURITY": FoodSafety,
  "SENIOR CITIZEN": SerniorImg,
};

function Subtopic() {
  const location = useLocation();

  const selectedCategory = location.state?.selectedCategory || 'EDUCATION'; // default fallback
  const [schemes, setSchemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const schemesPerPage = 6;

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        const data = await fetchSchemes();
        const filtered = data.filter(
          (scheme) =>
            scheme.category &&
            scheme.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );
        setSchemes(filtered);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    loadSchemes();
  }, [selectedCategory]);

  const totalPages = Math.ceil(schemes.length / schemesPerPage);
  const indexOfLast = currentPage * schemesPerPage;
  const indexOfFirst = indexOfLast - schemesPerPage;
  const currentSchemes = schemes.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (number) => {
    setCurrentPage(number);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imageSrc = categoryImages[selectedCategory.toUpperCase()] || educationImg;

  return (
    <>
      <div className="top-card">
        <img src={imageSrc} alt={`${selectedCategory} card`} className="top-card-img" />
        <h6 className="top-card-text">{selectedCategory}</h6>
      </div>

      <div className="contents">
        {currentSchemes.length === 0 ? (
          <p>No schemes found under {selectedCategory}.</p>
        ) : (
          currentSchemes.map((scheme, idx) => (
            <div key={idx}>
              <h4>{scheme.scheme_name}</h4>
              <p>{scheme.description}</p>
              <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p><strong>Date:</strong> {scheme.date || "N/A"}</p>
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
