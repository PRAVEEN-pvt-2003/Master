import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/home.css";
import profileCreate from "../assets/profile-create.png";
import categoriesSearch from "../assets/categories.png";
import comparison from "../assets/comparison.png";
import AppliedImg  from "../assets/applied-img.png";
import MainLogo from "../assets/MainLogo.png";
import About from "./about";
import Contact from "./contact";
import Reveal from "../components/reveal";
import { fetchSchemes } from "../services/userservices";

const BASE_CATEGORIES = [
  { id: 1, name: "EDUCATION", icon: "./catalog-magazine.png" },
  { id: 2, name: "WOMEN", icon: "./venus.png" },
  { id: 3, name: "SENIOR CITIZEN", icon: "./old-people.png" },
  { id: 4, name: "AGRICULTURE", icon: "./farm.png" },
  { id: 5, name: "RURAL & URBAN DEVELOPMENT", icon: "./improve-user.png" },
  { id: 6, name: "SPORTS", icon: "./medal.png" },
  { id: 7, name: "TOURISM", icon: "./tour-guide-people.png" },
  { id: 8, name: "PUBLIC SAFETY", icon: "./shield-check.png" },
  { id: 9, name: "TAX & PUBLIC FINANCE", icon: "./tax.png" },
  { id: 10, name: "FOOD SECURITY", icon: "./food-safety.png" }
];

const steps = [
  {
    icon: <img src={profileCreate} alt="Profile" className="step-img" />,
    number: "01",
    title: 'Create Your Profile',
    description: 'Set up your personal profile to receive tailored scheme recommendations.',
  },
  {
    icon: <img src={categoriesSearch} alt="Categories" className="step-img" />,
    number:"02",
    title: 'Browse Categories',
    description: 'Explore schemes by category to find what suits your needs best.',
  },
  {
    icon:  <img src={comparison} alt="Compare" className="step-img" />,
    number:"03",
    title: 'Compare Options',
    description: 'Evaluate multiple schemes side-by-side to make informed decisions.',
  },
  {
    icon: <img src={AppliedImg} alt="Apply" className="step-img" />,
    number:"04",
    title: 'Apply with Confidence',
    description: 'Submit your application knowing you’ve chosen the right scheme.',
  },
];


function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCategoriesWithCounts();
  }, []);

  const loadCategoriesWithCounts = async () => {
    try {
      const schemes = await fetchSchemes();

      const updatedCategories = BASE_CATEGORIES.map((category) => {
        const count = schemes.filter(
          (scheme) =>
            scheme.category?.toUpperCase() === category.name.toUpperCase()
        ).length;

        return {
          ...category,
          contents: `${count} schemes`
        };
      });

      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error fetching scheme counts:", error);
    }
  };

  const handleTotalSchemesClick = () => {
    navigate("/totalschemes");
  };

  const getTotalSchemesCount = () => {
    return categories.reduce((sum, category) => {
      const num = parseInt(category.contents) || 0;
      return sum + num;
    }, 0);
  };

  return (
    <div id="home" className="home-page">

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-overlay">
          <h1>
            Welcome to <span>Scheme Finder</span>
          </h1>
          <p>
            Discover government schemes tailored for you. 
            Quick, simple, and efficient—just like it should be.
          </p>
          <a href="#categories" className="scroll-button">
            Explore Categories
          </a>
        </div>
        <img src={MainLogo} alt="Welcome" className="welcome-image" />
      </section>

      {/* Total Schemes Summary */}
      <div className="total-schemes-wrapper">
        <span className="hashtag-title">#schemesForYou</span>

        <div className="scheme-cards-row">
          {/* Total schemes card */}
          <div
            className="total-scheme-card"
            onClick={handleTotalSchemesClick}
          >
            <h3>{getTotalSchemesCount()}</h3>
            <p>Total schemes →</p>
          </div>

          {/* Central schemes card */}
          <div className="total-scheme-card">
            <h3>30+</h3>
            <p>Central schemes</p>
          </div>

          {/* State schemes card */}
          <div className="total-scheme-card">
            <h3>110+</h3>
            <p>State schemes</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="categories-section">
        <Reveal direction="up">
        <h2 className="home-title">
          Find Scheme Based on <br /> Categories
        </h2>
        </Reveal>

        <Reveal>
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() =>
                navigate(`/subtopics/${category.name.toLowerCase()}`, {
                  state: { selectedCategory: category.name }
                })
              }
            >
              <img src={category.icon} alt={category.name} className="category-icon" />
              <p>{category.name}</p>
              <small className="category-count">{category.contents}</small>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      <section className="scheme-finder-section" id="progress">
        <Reveal direction="up">
      <h2 className="section-title">How Scheme Finder Works</h2>
      <p className="subtitle">Finding the right scheme is just a few simple steps away</p>
      <div className="steps-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-card ${index % 2 === 0 ? "left" : "right"}`}
            >
              <Reveal direction="up">
              <div className="step-icon">{step.icon}</div>
              </Reveal>
              <div className="step-content">
                <Reveal direction="up">
                <p className="step-number">{step.number}</p>
                </Reveal>
                <Reveal direction="up">
                <h3 className="step-title">{step.title}</h3>
                </Reveal>
                <Reveal direction="up">
                <p className="step-description">{step.description}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
          </Reveal>
    </section>

          {/* Ready to Find Your Perfect Scheme Section */}
      <section className="find-scheme-section">
        <div className="find-scheme-content">
          <h2>Ready to Find Your Perfect Scheme?</h2>
          <p>Join thousands of users who have discovered the right schemes for their needs. Start your journey today!</p>
          <button onClick={() => navigate("/auth")} className="auth-button">
            Get Started Now
          </button>
        </div>
      </section>

      {/* About & Contact */}
      <section id="about-us">
        <Reveal direction="up">
          <About />
          </Reveal>
      </section>

      <section id="contact">
        <Reveal direction="up">
          <Contact />
          </Reveal>
      </section>

      
    </div>
  );
}

export default Home;

    

