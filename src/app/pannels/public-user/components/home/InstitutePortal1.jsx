// import { button } from "@/components/ui/button";
import { GraduationCap, Users, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const InstitutePortal1 = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon-container">
            <GraduationCap className="hero-icon" />
          </div>
          <h1 className="hero-title">Academic Career Hub</h1>
          <p className="hero-description">
            Connect talented individuals with prestigious academic institutions. 
            Whether you're an institute posting positions or a candidate seeking opportunities, 
            we're here to facilitate meaningful academic careers.
          </p>
          <div className="hero-buttons">
            <button 
              asChild
              className="primary-button"
            >
              <Link to="/institute-page">
                <Briefcase className="button-icon" />
                Institute Portal
              </Link>
            </button>
            {/* <button 
              className="secondary-button"
            >
              <Users className="button-icon" />
              Browse Jobs
            </button> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-header">
          <h2 className="features-title">Why Choose Our Platform?</h2>
          <p className="features-subtitle">
            We specialize in academic recruitment, connecting institutions with qualified professionals
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-container">
                <GraduationCap className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Academic Focus</h3>
              <p className="feature-card-description">
                Specialized platform designed specifically for academic institutions and educational careers
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-container">
                <Users className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Quality Candidates</h3>
              <p className="feature-card-description">
                Access to a curated network of qualified professionals in academia and research
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-container">
                <Briefcase className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Easy Management</h3>
              <p className="feature-card-description">
                Streamlined tools for posting positions, managing applications, and tracking candidates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Institute Portal Section */}
      <div className="institute-section">
        <div className="institute-content">
          <h2 className="institute-title">Institute Career Portal</h2>
          <p className="institute-description">
            Post job vacancies, manage applications, and connect with qualified candidates through our dedicated institute portal
          </p>
          <div className="institute-buttons">
            <button 
              asChild
              className="institute-primary-button"
            >
              <Link to="/institute-page">
                <Briefcase className="button-icon" />
                Access Institute Portal
              </Link>
            </button>
            {/* <button 
              className="institute-secondary-button"
            >
              <MapPin className="button-icon" />
              View All Institutions
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutePortal1;

// CSS Styles
const styles = `
.home-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}
/* Hero Section Styles */
.hero-section {
  background-image: url('/assets/images/inn-banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.hero-icon {
  height: 4rem;
  width: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color:white;
}

.hero-description {
  font-size: 1.25rem;
  color: #bfdbfe;
  margin-bottom: 2rem;
  line-height: 1.75;
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
  }
}

.primary-button {
  background-color: white;
  border: none;;
  color: #B7912A;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.primary-button:hover {
  background-color: #f0f7ff;

}

.secondary-button {
  border: 1px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: white;
  color: #B7912A;
}

.button-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.5rem;
}

/* Features Section Styles */
.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

.features-header {
  text-align: center;
  margin-bottom: 3rem;
}

.features-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.features-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.feature-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.feature-card-header {
  padding: 1.5rem;
  text-align: center;
}

.feature-icon-container {
  width: 3rem;
  height: 3rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.feature-icon {
  height: 1.5rem;
  width: 1.5rem;
  color: #B7912A;
}

.feature-card-title {
  color: #1e3a8a;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-card-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Institute Section Styles */
.institute-section {
  background-color: rgba(243, 244, 246, 0.5);
  padding: 4rem 0;
}

.institute-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.institute-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.institute-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.institute-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .institute-buttons {
    flex-direction: row;
  }
}

.institute-primary-button {
  background: linear-gradient(90deg, #B7912A, #25e8ebff);
  color: white;
  border:none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.institute-primary-button:hover {
  // box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.institute-secondary-button {
  border: 1px solid #B7912A;
  color: #B7912A;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.institute-secondary-button:hover {
  background-color: #B7912A;
  color: white;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);