import AboutImg from '../assets/About-img.png';
import '../Styles/About.css';
import CustomerCare from "../assets/customer-care.jpg";
import CustomerCare2 from "../assets/customer-care2.jpg";

function About() {
  return (
    <section id="about-us" className="about-section">
      <div className="about-container">
        {/* Left Column - Text */}
        <div className="about-text">
          <h1>About Us</h1>
          <p className="subtitle">
            Your trusted gateway with governments and benefits
          </p>
          <p>
            Welcome to <strong>Scheme Finder</strong> — your trusted gateway to
            all government benefits in one place. Our mission is to make every
            citizen aware, informed, and empowered by providing easy access to
            the latest central and state government schemes, subsidies,
            scholarships, and welfare programs.
          </p>
          <p>
            Whether you're a student, farmer, senior citizen, job seeker, or
            entrepreneur — we help you discover and apply for the schemes you
            are eligible for. Our platform is designed to be simple, secure, and
            user-friendly, ensuring that no opportunity is ever missed due to
            lack of information.
          </p>

          {/* Mission Card */}
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To empower every citizen with equal access to government benefits.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="about-image">
          <img src={AboutImg} alt="About" />
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h3>Our Team</h3>
        <div className="team-members">
          <div className="team-member">
            <img src={CustomerCare2} alt="John Smith" />
            <h4>John Smith</h4>
            <p>CEO & CTO</p>
          </div>
          <div className="team-member">
            <img src={CustomerCare2} alt="David Chen" />
            <h4>David Chen</h4>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <img src={CustomerCare} alt="Sarah Lee" />
            <h4>Sarah Lee</h4>
            <p>Community Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
