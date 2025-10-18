import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { publicUser } from '../../../globals/route-names';

function Footer1() {
  return (
    <footer className="footer">
      {/* Background Pattern */}
      <div className="footer-bg-pattern"></div>
      
      {/* Newsletter Section */}
      <div className="newsletter-section">
        {/* <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-grid">
              <div className="newsletter-text">
                <h2 className="newsletter-title">Stay Updated</h2>
                <p className="newsletter-description">
                  Join our email subscription now to get updates on new jobs and notifications.
                </p>
              </div>
              <div className="newsletter-form-container">
                <form className="newsletter-form">
                  <div className="newsletter-input-wrapper">
                    <Mail className="newsletter-input-icon" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="newsletter-input"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="newsletter-button"
                  >
                    <Send className="newsletter-button-icon" />
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="company-info">
            <div className="company-header">
              <div className="logo-footer">
                <NavLink to={publicUser.HOME3} className="logo-link">
                  <img 
                    src="assets/images/Eduno logo.png" 
                    className="logo-img"
                    alt="EduNomad Connect"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="logo-fallback" style={{display: 'none'}}>
                    <div className="company-logo"></div>
                  </div>
                  <h3 className="company-name">EduNomad Connect</h3>
                </NavLink>
              </div>
            </div>
            
            <p className="company-description">
              Empowering educators and connecting learning communities across the globe. 
              Find your perfect teaching opportunity or the ideal educator for your institution.
            </p>
            
            {/* <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>65 Sunset CA 90026, USA</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <a href="mailto:support@edunomad.com" className="contact-link">support@edunomad.com</a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <a href="tel:+15555551234" className="contact-link">+1 (555) 555-1234</a>
              </div>
            </div> */}
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <NavLink to="/" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about-us" className="footer-link">
                    <span className="footer-link-dot"></span>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/terms-of-service" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Terms of Service
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Information Section */}
            <div className="footer-section">
              <h4>Contact Information</h4>
              <div className="contact-info-column">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>65 Sunset CA 90026, USA</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <a href="mailto:support@edunomad.com" className="contact-link">support@edunomad.com</a>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <a href="tel:+15555551234" className="contact-link">+1 (555) 555-1234</a>
                </div>
              </div>
            </div>

            {/* Additional Links */}
            {/* <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li>
                  <NavLink to="/blog" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className="footer-link">
                    <span className="footer-link-dot"></span>
                    FAQ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/support" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Support
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sitemap" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Sitemap
                  </NavLink>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 EduNomad Connect. All rights reserved.
            </p>
            
            <div className="social-links">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <Facebook className="social-icon" />
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <Twitter className="social-icon" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Instagram className="social-icon" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <Youtube className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Footer Styles */
        .footer {
          position: relative;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          color: white;
          overflow: hidden;
        }

        .footer-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at top, rgba(51, 65, 85, 0.2) 0%, rgba(30, 41, 59, 0.1) 50%, transparent 100%),
            linear-gradient(45deg, transparent 49%, rgba(16, 185, 129, 0.05) 50%, transparent 51%);
          background-size: 100% 100%, 30px 30px;
        }

        /* Newsletter Section */
        .newsletter-section {
          position: relative;
          border-bottom: 1px solid rgba(51, 65, 85, 0.5);
          background: linear-gradient(90deg, rgba(5, 150, 105, 0.15) 0%, rgba(13, 148, 136, 0.15) 100%);
          backdrop-filter: blur(10px);
        }

        .newsletter-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .newsletter-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .newsletter-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: center;
        }

        @media (min-width: 768px) {
          .newsletter-grid {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
        }

        .newsletter-text {
          text-align: center;
        }

        @media (min-width: 768px) {
          .newsletter-text {
            text-align: left;
          }
        }

        .newsletter-title {
          font-size: 28px;
          font-weight: bold;
          color: white;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .newsletter-description {
          color: #cbd5e1;
          line-height: 1.6;
          font-size: 16px;
          max-width: 400px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .newsletter-description {
            margin: 0;
          }
        }

        .newsletter-form-container {
          display: flex;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .newsletter-form-container {
            justify-content: flex-end;
          }
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 400px;
        }

        @media (min-width: 640px) {
          .newsletter-form {
            flex-direction: row;
          }
        }

        .newsletter-input-wrapper {
          position: relative;
          flex: 1;
        }

        .newsletter-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 20px;
          height: 20px;
        }

        .newsletter-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .newsletter-input::placeholder {
          color: #94a3b8;
        }

        .newsletter-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.3);
          border-color: #10b981;
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-button {
          padding: 14px 28px;
          background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
          color: white;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
        }

        .newsletter-button:hover {
          background: linear-gradient(135deg, #047857 0%, #0f766e 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.4);
        }

        .newsletter-button:active {
          transform: translateY(0);
        }

        .newsletter-button-icon {
          width: 16px;
          height: 16px;
        }

        /* Main Footer Content */
        .footer-main {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 2fr ;
            gap: 120px;
          }
        }

        /* Company Info */
        .company-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .company-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border-radius: 8px;
        }

        .company-logo {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        }

        .company-name {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin: 0;
          background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .company-description {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 15px;
          text-align: left;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #cbd5e1;
          transition: color 0.3s ease;
          font-size: 14px;
        }

        .contact-item:hover {
          color: white;
        }

        .contact-icon {
          width: 18px;
          height: 18px;
          color: #10b981;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .contact-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: #10b981;
          text-decoration: underline;
        }

        /* Footer Links */
        .footer-links {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 768px) {
          .footer-links {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }

        .footer-section h4 {
          font-size: 18px;
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(16, 185, 129, 0.3);
          text-align: left;
          position: relative;
        }

        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #10b981, transparent);
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
        }

        .footer-link {
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          padding: 4px 0;
        }

        .footer-link:hover {
          color: #34d399;
          transform: translateX(8px);
        }

        .footer-link-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .footer-link:hover .footer-link-dot {
          width: 12px;
          border-radius: 3px;
          background: #34d399;
        }

        /* Contact Information Column */
        .contact-info-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-info-column .contact-item {
          margin-bottom: 8px;
        }

        /* Footer Bottom */
        .footer-bottom {
          position: relative;
          border-top: 1px solid rgba(51, 65, 85, 0.5);
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
        }

        .footer-bottom-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 24px;
        }

        .footer-bottom-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .footer-bottom-content {
            flex-direction: row;
            gap: 24px;
          }
        }

        .copyright {
          color: #94a3b8;
          font-size: 14px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .copyright {
            text-align: left;
          }
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-link {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          border-color: transparent;
        }

        .social-icon {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .social-link:hover .social-icon {
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
}

export default Footer1;