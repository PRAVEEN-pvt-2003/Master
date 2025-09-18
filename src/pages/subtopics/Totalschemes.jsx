import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/totalscheme.css";
import { fetchSchemes } from "../../services/userservices";
import AllSchemeImg from "../../assets/totalScheme-bg.jpg";
import Loader from "../../components/loader";
import { FaUserFriends, FaCalendarAlt, FaFileAlt, FaSearch  } from "react-icons/fa";

function TotalSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const schemesPerPage = 9;

  // Category colors mapping
  const categoryColors = {
    education: "#f59e0b",
    women: "#ec4899",
    "senior citizen": "#3b82f6",
    agriculture: "#22c55e",
    "rural & urban development": "#8b5cf6",
    "sports & tourism": "#f97316",
    "public safety": "#ef4444",
    "tax & public finance": "#0ea5e9",
    "food safety": "#10b981",
  };

  const getCategoryColor = (category) => {
    if (!category) return "#6b7280"; // fallback gray
    return categoryColors[category.trim().toLowerCase()] || "#6b7280";
  };

  // Fetch schemes
  useEffect(() => {
    const loadSchemes = async () => {
      try {
        setLoading(true);
        const data = await fetchSchemes();
        setSchemes(data);
        setTimeout(() => setLoading(false), 800);
      } catch (err) {
        console.error("Error fetching schemes:", err);
        setLoading(false);
      }
    };
    loadSchemes();
  }, []);

  const categories = ["All", ...new Set(schemes.map((s) => s.category || "Uncategorized"))];

  const filteredSchemes = schemes.filter((s) => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch = s.scheme_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(Math.ceil(filteredSchemes.length / schemesPerPage), 1);
  const indexOfLastScheme = currentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = filteredSchemes.slice(indexOfFirstScheme, indexOfLastScheme);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/totalschemes?category=${encodeURIComponent(newCategory)}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="total-schemes-page">
      {/* HERO */}
      <div className="hero-banner">
        <img src={AllSchemeImg} alt="Schemes Background" className="hero-img" />
        <div className="hero-overlay">
          <h1>Government Schemes</h1>
          <p>
            Discover and explore government schemes designed to benefit citizens across
            various sectors
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="search-wrapper">
        <div className="search-filter-card">
          <div className="search-input-wrapper">
          <FaSearch className="search-icon"/>
          <input
            type="text"
            placeholder= " Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
           <div className="showing-count">
           <FaFileAlt/>Showing {filteredSchemes.length} schemes
      </div>
        </div>
      </div>

      {/* SHOWING COUNT */}
     

      {/* SCHEMES */}
      {filteredSchemes.length === 0 ? (
        <p className="no-schemes">No schemes found.</p>
      ) : (
        <>
          <div className="scheme-cards-container">
            {currentSchemes.map((scheme) => (
              <div key={scheme.id} className="scheme-card">
                <div className="scheme-card-header">
                  <span
                    className="scheme-badge"
                    style={{
                      background: getCategoryColor(scheme.category),
                      color: "#fff",
                    }}
                  >
                    {scheme.category || "General"}
                  </span>
                  <span className="scheme-date">
                    <FaCalendarAlt /> {scheme.date || "N/A"}
                  </span>
                </div>

                <h3 className="scheme-title">{scheme.scheme_name}</h3>
                <p className="scheme-description">{scheme.description}</p>

                <div className="scheme-eligibility">
                  <span>
                    <FaUserFriends /> <strong>Eligibility</strong>
                  </span>
                  <p>{scheme.eligibility}</p>
                </div>

                <div className="scheme-card-divider"></div>

                <div className="scheme-footer">
                  <button
                    onClick={() => navigate(`/detail/${scheme.id}`)}
                    className="view-btn"
                  >
                    View Details ➝
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>

            {(() => {
              const pageNumbers = [];
              const maxPageNumbersToShow = 5;

              let startPage = Math.max(currentPage - 2, 1);
              let endPage = startPage + maxPageNumbersToShow - 1;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
              }

              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
              }

              return pageNumbers.map((num) => (
                <button
                  key={num}
                  className={currentPage === num ? "active" : ""}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ));
            })()}

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TotalSchemes;
