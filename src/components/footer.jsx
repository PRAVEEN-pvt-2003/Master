import { FaLinkedin, FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import './footer.css';
import digilocker from '../assets/digilocker.jpeg';
import digitalindia from '../assets/digitalindia.jpg';
import umang from '../assets/umang.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Logo Section */}
        <div className="footer-section">
          <h2 className="footer-title">©2025 Scheme Finder</h2>
          <p>Powered by Besant Organization</p>
          <div className="footer-icons">
            <a title='LinkedIn' href="#"><FaLinkedin /></a>
            <a title='Facebok' href="#"><FaFacebook /></a>
            <a title='Twitter' href="#"><FaXTwitter /></a>
            <a title='Instagram' href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3>Useful Links</h3>
          <div className="footer-links-images">

            <a href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer">
            <img src={digilocker} alt="DigiLocker" />
            </a>

            <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
            <img src={digitalindia} alt="Digital India" />
            </a>

            <a href="https://web.umang.gov.in/landing/" target="_blank" rel="noopener noreferrer">
            <img src={umang} alt="UMANG" />
            </a>

          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Get in touch</h3>
          <p>4th Floor, Schem finder Office<br />Chennai, India</p>
          <p className="mt-2">support@SchemeFinder.com</p>
          <p>+91-1234567890</p>
        </div>

      </div>

      {/* Bottom Note */}
      <div className="footer-bottom">
        Last Updated On : 04/07/2025 | v-1.0.0
      </div>
    </footer>
  );
}

export default Footer;
