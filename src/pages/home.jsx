import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import WelcomeImage from '../assets/project-logo.png';  
import About from './about';
import Contact from './contact';

function Home() {
  const categories = [
    { id: 1, name: "EDUCATION", icon: "./catalog-magazine.png", contents:"25 schemes"}, 
    { id: 2, name: "WOMEN'S", icon: "./venus.png", contents:"28 schemes" },
    { id: 3, name: "SENIOR CITIZEN", icon: "./old-people.png", contents:"20 schemes" },
    { id: 4, name: "AGRICULTURE", icon: "./farm.png", contents:"15 schemes" },
    { id: 5, name: "RURAL & URBAN DEVELOPMENT", icon: "./improve-user.png", contents:"18 schemes" },
    { id: 6, name: "SPORTS", icon: "./medal.png", contents:"17 schemes" },
    { id: 7, name: "TOURISM", icon: "./tour-guide-people.png", contents:"12 schemes" },
    { id: 8, name: "PUBLIC SAFETY", icon: "./shield-check.png", contents:"22 schemes" },
    { id: 9, name: "TAX & PUBLIC FINANCE", icon: "./tax.png", contents:"18 schemes" },
    { id: 10, name: "FOOD SECURITY", icon: "./food-safety.png", contents:"13 schemes" }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id='home' className="home-page">
      
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-overlay">
          <h1>Welcome to <span>Scheme Finder</span></h1>
          <p>Discover government schemes tailored for you. Quick, simple, and efficient—just like it should be.</p>
          <a href="#categories" className="scroll-button">Explore Categories</a>
        </div>
        <img src={WelcomeImage} alt="Welcome" className="welcome-image" />
      </section>

      {/* total scheme display*/}
      <div className='total-schemes-wrapper'>
        <span className='hashtag-title'>#schemesFor You</span>
          <div className="scheme-cards-row">
            <div className='total-scheme-card'>
              <h3>200+</h3>
              <p>Total schemes &#8594;</p>
            </div>
            <div className='total-scheme-card'>
              <h3>50+</h3>
              <p>Central schemes &#8594;</p>
            </div>
            <div className='total-scheme-card'>
              <h3>140+</h3>
              <p>State schemes &#8594;</p>
            </div>
        </div>
      </div>
      {/* Categories Section */}
      <section id="categories" className="categories-section">
        <h2 className="home-title">Find Scheme Bsaed on <br /> Categories</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => navigate(`/subtopics/${category.id}`,{
                state: { selectedCategory: category.name }
              })}
            >
              <img src={category.icon} alt={category.name} className="category-icon" />
              <p>{category.name}</p>
              <small>{category.contents}</small>
            </div>
          ))}
        </div>
      </section>

      {/* About and Contact */}
      <section id="about-us"><About /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}

export default Home;
