import ContactImg from '../assets/contact-img.png'
import '../Styles/contact.css';

function Contact() {
    return (
        <>
        <div id='contact' className="contact-container">
        <div className="contact-section">
                <h1>Contact Us</h1>
                <p>
                    We're here to help you. Have a question, feedback, or need support? Feel free to reach out — our team is ready to assist you with any queries regarding schemes, eligibility, or app usage.
                </p>

                <div className="office-address">
                    📍 Office Address:{"\n"}
                    Schemefinder Helpline Center,{"\n"}
                    [Insert Government Department Name or District Office],{"\n"}
                    [Chennai, Tamil nadu, 600116]
                </div>

                <ul className="contact-details">
                    <li><span>📧 Email:</span> support@SchemeFinder.in</li>
                    <li><span>📱 Phone:</span> +91-9876543210 (Toll-Free)</li>
                    <li><span>🌐 Website:</span> www.SchemeFinder.in</li>
                    <li><span>🔗 Follow us on:</span> Facebook | Twitter | YouTube</li>
                </ul>
            </div>
            <div className="contact-image">
            <img src={ContactImg} alt="image" />
            </div>
            </div>
            </>
    )
}

export default Contact;
