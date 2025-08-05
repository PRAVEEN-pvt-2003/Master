import AboutImg from '../assets/About-img.png'
import './About.css';

function About() {
  return (
    <div id="about-us" className="about-section">
    <div className='left-img'>
          <img src={AboutImg} alt="image" />
      </div>
      <div className="about-container">
              <h1>About Us</h1>
              <p>
                  Welcome to <strong> Scheme Finder </strong> — your trusted gateway to all government benefits in one place.
                  Our mission is to make every citizen aware, informed, and empowered by providing easy access to the latest central and state government schemes, subsidies, scholarships, and welfare programs.
                  Whether you're a student, farmer, senior citizen, job seeker, or entrepreneur — we help you discover and apply for the schemes you are eligible for.
                  Our platform is designed to be simple, secure, and user-friendly, ensuring that no opportunity is ever missed due to lack of information.
                  Bridging citizens with benefits — faster, easier, and smarter.
              </p>
          </div>
          </div>
  );
}

export default About;
