import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { publicUser } from '../../../globals/route-names';
// import './Footer.css';

function Footer1() {
  return (
    <footer className="footer">
      {/* Background Pattern */}
      <div className="footer-bg-pattern"></div>
      
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-grid">
              <div>
               
                <p className="newsletter-description">
                  Join our email subscription now to get updates on new jobs and notifications.
                </p>
              </div>
              <div>
                <form className="newsletter-form">
                  <div className="newsletter-input-wrapper">
                    <Mail className="newsletter-input-icon" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="newsletter-input"
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
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <style>{`
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
  background: radial-gradient(ellipse at top, rgba(51, 65, 85, 0.2) 0%, rgba(30, 41, 59, 0.1) 50%, transparent 100%);
}

/* Newsletter Section */
.newsletter-section {
  position: relative;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  background: linear-gradient(90deg, rgba(5, 150, 105, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%);
}

.newsletter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 44px;
  padding-bottom: 42px;
}

.newsletter-content {
  max-width: 1200px;
  margin: 0 auto;
}

.newsletter-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 38px;
  align-items: center;
}

@media (min-width: 768px) {
  .newsletter-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.newsletter-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
}

.newsletter-description {
  color: #cbd5e1;
  line-height: 1.6;
  font-size:20px;
  text-align:start;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 20px;
  height: 20px;
}

.newsletter-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: #94a3b8;
}

.newsletter-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #059669;
  border-color: transparent;
}

.newsletter-button {
  padding: 12px 24px;
  background: linear-gradient(90deg, #059669 0%, #0d9488 100%);
  color: white;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.newsletter-button:hover {
  background: linear-gradient(90deg, #047857 0%, #0f766e 100%);
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  gap: 32px;
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 2fr;
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

.company-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
  // border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo-text {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.company-name {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.company-description {
  color: #cbd5e1;
  line-height: 1.6;
  max-width: 384px;
   text-align:start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #cbd5e1;
  transition: color 0.3s ease;
}

.contact-item:hover {
  color: white;
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #10b981;
  margin-top: 2px;
}

.contact-link {
  color: inherit;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

/* Footer Links */
.footer-links {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  .footer-links {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-section h4 {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.3);
   text-align:start;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align:start;
}

.footer-link {
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link:hover {
  color: #34d399;
  transform: translateX(4px);
}

.footer-link-dot {
  width: 4px;
  height: 4px;
  background: #10b981;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.footer-link:hover .footer-link-dot {
  width: 8px;
}

/* Footer Bottom */
.footer-bottom {
  position: relative;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
}

.footer-bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
  }
}

.copyright {
  color: #94a3b8;
  font-size: 14px;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #1e293b;
  color: #94a3b8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}`}</style>
        <div className="footer-grid">
          {/* Company Info */}
          <div className="company-info">
            <div className="company-header">
              <div className="logo-footer clearfix">
                    <NavLink to={publicUser.HOME3}>
                        <img src="assets/images/Eduno logo.png" className="logo-img"/>
                        <h3 className='nav-text-ed'>EduNomad Connect</h3>
                    </NavLink>
                 </div>
                 </div>
            
            <p className="company-description">
              Empowering educators and connecting learning communities across the globe.
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>65 Sunset CA 90026, USA</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <a href="mailto:example@max.com" className="contact-link">example@max.com</a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <a href="tel:555-555-1234" className="contact-link">555-555-1234</a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {/* For Educators */}
            <div className="footer-section">
              <h4>For Educators</h4>
              <ul>
                <li>
                  <NavLink to="/job-grid" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Find Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/aplly-job" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Apply Now
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/emp-list" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Teacher Resources
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* For Institutes */}
            <div className="footer-section">
              <h4>For Institutes/Parents</h4>
              <ul>
                <li>
                  <NavLink to="/inst-portal" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Post Vacancy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="footer-link">
                    <span className="footer-link-dot"></span>
                    View Applicants
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/jobs" className="footer-link">
                    <span className="footer-link-dot"></span>
                    Make Request
                  </NavLink>
                </li>
              </ul>
            </div>

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
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              Copyright © 2025 by EduNomad Connect. All Rights Reserved.
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
    </footer>
  );
}

export default Footer1;

