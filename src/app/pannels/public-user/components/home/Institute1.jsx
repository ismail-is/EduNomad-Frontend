import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  Briefcase, 
  GraduationCap, 
  ArrowLeft, 
  Calendar, 
  FileText, 
  ListChecks, 
  Edit, 
  Trash2,
  X
} from "lucide-react";
import InstAppViewer from './InstAppViewer';
import axios from "axios";

const Institute1 = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedJobForApplications, setSelectedJobForApplications] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVacancies();
  }, []);
  
  const fetchVacancies = async () => {
    try {
      const response = await axios.get("http://localhost:7001/api/jobview");
      console.log("Jobs data:", response.data);

      // ✅ if your API sends { success: true, data: [...] }
      if (response.data && response.data.data) {
        setVacancies(response.data.data);
      } else {
        setVacancies(response.data);
      }
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const [formData, setFormData] = useState({
    titel: "",
    department: "",
    location: "",
    employmentType: "",
    lastdate: "",
    message: "",
    requirements: ""
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let response;
      let url;
      
      if (formData.id) {
        // Update existing job - use the ID as a parameter
        url = `http://localhost:7001/api/jobupdate/${formData.id}`;
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Create new job
        url = 'http://localhost:7001/api/jobinsert';
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
      }

      if (!response.ok) {
        throw new Error(formData.id ? 'Failed to update job' : 'Failed to submit job');
      }

      const result = await response.json();
      
      if (formData.id) {
        // Update the existing vacancy in the list
        setVacancies(vacancies.map(v => 
          v.id === formData.id ? {...formData, postedDate: v.postedDate} : v
        ));
        alert('Job updated successfully!');
      } else {
        // If the API returns the created job, use it
        const newVacancy = result.job || {
          id: Date.now().toString(),
          ...formData,
          postedDate: new Date().toISOString().split('T')[0]
        };
        
        setVacancies([newVacancy, ...vacancies]);
        alert('Job posted successfully!');
      }
      
      setFormData({
        titel: "",
        department: "",
        location: "",
        employmentType: "",
        lastdate: "",
        message: "",
        requirements: ""
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error posting job:', error);
      alert(formData.id ? 'Failed to update job. Please try again.' : 'Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditVacancy = (vacancy) => {
    setFormData({
      id: vacancy.id,
      titel: vacancy.titel || "",
      department: vacancy.department || "",
      location: vacancy.location || "",
      employmentType: vacancy.employmentType || "",
      lastdate: vacancy.lastdate || "",
      message: vacancy.message || "",
      requirements: vacancy.requirements || ""
    });
    setShowForm(true);
  };

  const handleDeleteVacancy = async (id) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      try {
        // Try with axios first
        const response = await axios.delete(`http://localhost:7001/api/jobdelete/${id}`);
        
        console.log("Delete response:", response.data);
        
        if (response.data && response.data.success) {
          setVacancies(vacancies.filter(v => v.id !== id));
          alert('Vacancy deleted successfully!');
        } else {
          // If axios doesn't work, try with fetch
          try {
            const fetchResponse = await fetch(`http://localhost:7001/api/jobdelete/${id}`, {
              method: 'DELETE',
            });
            
            if (fetchResponse.ok) {
              setVacancies(vacancies.filter(v => v.id !== id));
              alert('Vacancy deleted successfully!');
            } else {
              throw new Error('Failed to delete vacancy');
            }
          } catch (fetchError) {
            console.error('Fetch delete error:', fetchError);
            throw new Error('Failed to delete vacancy');
          }
        }
      } catch (error) {
        console.error('Error deleting vacancy:', error);
        alert('Failed to delete vacancy. Please try again.');
      }
    }
  };

  return (
    <div className="institute-portal">
      {/* Header */}
      <div className="portal-header">
        <div className="header-container">
          <div className="header-navigation">
            <button
              className="back-button"
              onClick={() => navigate("/inst-portal")}
            >
              <ArrowLeft className="icon-small" />
              Back to Academic
            </button>
          </div>
          <div className="header-title-container">
            <GraduationCap className="header-icon" />
            <h1 className="header-title">Institute Career Portal</h1>
          </div>
          <p className="header-description">
            Manage and post job vacancies for your institute.
          </p>
        </div>
      </div>

      <div className="portal-content">
        {/* Action Section */}
        <div className="action-section">
          <div className="action-text">
            <h2 className="section-title">Job Vacancies</h2>
            <p className="section-subtitle">Manage your institute's current job openings</p>
          </div>
          <button 
            className="new-vacancy-button"
            onClick={() => {
              setFormData({
                titel: "",
                department: "",
                location: "",
                employmentType: "",
                lastdate: "",
                message: "",
                requirements: ""
              });
              setShowForm(true);
            }}
          >
            <Plus className="button-icon" />
            Post New Vacancy
          </button>
        </div>

        {/* Add Job Form Modal */}
        {showForm && (
          <div className="job-form-container">
            <div className="job-form-overlay" onClick={() => setShowForm(false)}></div>
            <div className="job-form-card">
              <div className="form-card-header">
                <div className="form-header-content">
                  <Briefcase className="form-header-icon" />
                  <div>
                    <h3 className="form-title">
                      {formData.id ? "Edit Job Posting" : "Create New Job Posting"}
                    </h3>
                    <p className="form-subtitle">
                      {formData.id ? "Update the job details" : "Fill in the details to attract qualified candidates"}
                    </p>
                  </div>
                </div>
                <button 
                  className="close-form-button"
                  onClick={() => setShowForm(false)}
                >
                  <X className="close-icon" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="vacancy-form">
                <div className="form-grid">
                  {/* Job Title */}
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      <span className="label-text">Job Title</span>
                      <span className="required-asterisk">*</span>
                    </label>
                    <div className="input-container">
                      <input
                        id="titel"
                        type="text"
                        value={formData.titel}
                        onChange={(e) => handleInputChange("titel", e.target.value)}
                        placeholder="e.g., Assistant Professor - Physics"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Department */}
                  <div className="form-group">
                    <label htmlFor="department" className="form-label">
                      <span className="label-text">Department</span>
                      <span className="required-asterisk">*</span>
                    </label>
                    <div className="input-container">
                      <input
                        id="department"
                        type="text"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        placeholder="e.g., Physics Department"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      <span className="label-text">Location</span>
                      <span className="required-asterisk">*</span>
                    </label>
                    <div className="input-container">
                      <MapPin className="input-icon" />
                      <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., Main Campus, Building A"
                        className="form-input with-icon"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Employment Type */}
                  <div className="form-group">
                    <label htmlFor="type" className="form-label">
                      <span className="label-text">Employment Type</span>
                      <span className="required-asterisk">*</span>
                    </label>
                    <div className="input-container">
                      <select
                        id="employmentType"
                        value={formData.employmentType}
                        onChange={(e) => handleInputChange("employmentType", e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">Select employment type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Visiting">Visiting Position</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Application Deadline */}
                  <div className="form-group">
                    <label htmlFor="deadline" className="form-label">
                      <span className="label-text">Application Deadline</span>
                      <span className="required-asterisk">*</span>
                    </label>
                    <div className="input-container">
                      <Clock className="input-icon" />
                      <input
                        id="lastdate"
                        type="date"
                        value={formData.lastdate}
                        onChange={(e) => handleInputChange("lastdate", e.target.value)}
                        className="form-input with-icon"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Job Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    <span className="label-text">Job Description</span>
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-container">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe the role and responsibilities..."
                      className="form-textarea"
                      rows="4"
                      required
                    />
                  </div>
                </div>
                
                {/* Requirements */}
                <div className="form-group">
                  <label htmlFor="requirements" className="form-label">
                    <span className="label-text">Requirements</span>
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-container">
                    <textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      placeholder="List required qualifications, experience, and skills..."
                      className="form-textarea"
                      rows="4"
                      required
                    />
                    <div className="hint-text">Separate requirements with bullet points or new lines</div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowForm(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : (formData.id ? "Update Vacancy" : "Post Vacancy")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="job-listings-container">
          {loading ? (
            <div className="empty-state-card">
              <div className="empty-state-content">
                <h3 className="empty-state-title">Loading vacancies...</h3>
              </div>
            </div>
          ) : vacancies.length > 0 ? (
            vacancies.map((vacancy) => (
              <div key={vacancy.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-card-main-info">
                    <div className="job-title-wrapper">
                      <GraduationCap className="job-title-icon" />
                      <h3 className="job-title">{vacancy.titel}</h3>
                    </div>
                    <div className="job-type-badge">{vacancy.employmentType}</div>
                  </div>
                  
                  <div className="job-meta-grid">
                    <div className="meta-item">
                      <Briefcase className="meta-icon" />
                      <div>
                        <span className="meta-label">Department</span>
                        <span className="meta-value">{vacancy.department}</span>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <MapPin className="meta-icon" />
                      <div>
                        <span className="meta-label">Location</span>
                        <span className="meta-value">{vacancy.location}</span>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <div>
                        <span className="meta-label">Deadline</span>
                        <span className="meta-value deadline">
                          {new Date(vacancy.lastdate).toLocaleDateString()}
                          <span className={`deadline-tag ${
                            new Date(vacancy.lastdate) < new Date() ? 'expired' : 'active'
                          }`}>
                            {new Date(vacancy.lastdate) < new Date() ? 'Expired' : 'Active'}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <Calendar className="meta-icon" />
                      <div>
                        <span className="meta-label">Posted</span>
                        <span className="meta-value">
                          {new Date(vacancy.postedDate || vacancy.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="job-card-content">
                  <div className="job-details-section">
                    <div className="detail-block">
                      <h4 className="section-heading">
                        <FileText className="section-icon" />
                        Description
                      </h4>
                      <div className="section-text">{vacancy.message}</div>
                    </div>
                    
                    <div className="detail-block">
                      <h4 className="section-heading">
                        <ListChecks className="section-icon" />
                        Requirements
                      </h4>
                      <ul className="requirements-list">
                        {(vacancy.requirements || "No requirements specified").split('\n').map((req, i) => (
                          req.trim() && <li key={i} className="requirement-item">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="job-card-footer">
                    <div className="job-actions">
                      <button 
                        className="action-button edit-button"
                        onClick={() => handleEditVacancy(vacancy)}
                      >
                        <Edit className="button-icon" />
                        Edit
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => handleDeleteVacancy(vacancy._id)}
                      >
                        <Trash2 className="button-icon" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-card">
              <div className="empty-state-content">
                <Users className="empty-state-icon" />
                <h3 className="empty-state-title">No job vacancies posted yet</h3>
                <p className="empty-state-text">Start by posting your first job vacancy</p>
                <button 
                  className="empty-state-button"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="button-icon" />
                  Post Your First Vacancy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Application Viewer */}
        {selectedJobForApplications && (
          <InstAppViewer 
            jobTitle={selectedJobForApplications.titel} 
            jobId={selectedJobForApplications.id}
            isOpen={!!selectedJobForApplications}
            onClose={() => setSelectedJobForApplications(null)}
          />
        )}
      </div>

      <style jsx>{`
        .institute-portal {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Header Styles */
        .portal-header {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          padding: 6rem 0 2rem;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          transition: opacity 0.2s;
        }

        .back-button:hover {
          opacity: 0.9;
        }

        .icon-small {
          width: 1rem;
          height: 1rem;
        }

        .header-title-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .header-icon {
          width: 2rem;
          height: 2rem;
        }

        .header-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 0;
        }

        .header-description {
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          line-height: 1.6;
        }

        /* Main Content */
        .portal-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .action-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.25rem;
        }

        .section-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .new-vacancy-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .new-vacancy-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .button-icon {
          width: 1rem;
          height: 1rem;
        }

        /* Job Form Styles */
        .job-form-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .job-form-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }

        .job-form-card {
          position: relative;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          z-index: 1001;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .form-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f9fafb;
          border-radius: 12px 12px 0 0;
        }

        .form-header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .form-header-icon {
          color: #3b82f6;
          width: 2rem;
          height: 2rem;
        }

        .form-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .form-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0.25rem 0 0;
        }

        .close-form-button {
          background: none;
          border: none;
          color: край;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
          display: flex;
          align-items: center;
          край: center;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          transition: background-color 0.2s;
        }

        .close-form-button:hover {
          background-color: #f3f4f6;
          color: #6b7280;
        }

        .close-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .vacancy-form {
          padding: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: flex;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .label-text {
          margin-right: 0.25rem;
        }

        .required-asterisk {
          color: #ef4444;
        }

        .input-container {
          position: relative;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          color: #374151;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input.with-icon {
          padding-left: 2.25rem;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .input-icon {
          position: absolute;
          left: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 1rem;
          height: 1rem;
        }

        .hint-text {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 1.5rem;
        }

        .submit-button {
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 0.625rem 1.25rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(90 край, #2563eb, #1d4ed8);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .submit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .cancel-button {
          background: white;
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 0.625rem 1.25rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-button:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .cancel-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Job Listings Container */
        .job-listings-container {
          display: grid;
          gap: 1.5rem;
          padding: 1rem 0;
        }

        /* Job Card */
        .job-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid #e5e7eb;
        }

        .job-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        /* Job Card Header */
        .job-card-header {
          padding: 1.5rem;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .job-card-main-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .job-title-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .job-title-icon {
          color: #3b82f6;
          край: 1.5rem;
          height: 1.5rem;
        }

        .job-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .job-type-badge {
          background-color: #e0e7ff;
          color: #3b82f6;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Meta Grid */
        .job-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .meta-icon {
          color: #6b7280;
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        .meta-label {
          display: block;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .meta-value {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .deadline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .deadline-tag {
          font-size: 0.625rem;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
          font-weight: 500;
        }

        .deadline-tag.active {
          background-color: #dcfce7;
          color: #166534;
        }

        .deadline-tag.expired {
          background-color: #fee2e2;
          color: #991b1b;
        }

        /* Job Card Content */
        .job-card-content {
          padding: 1.5rem;
        }

        .job-details-section {
          display: grid;
          gap: 1.5rem;
        }

        .detail-block {
          margin-bottom: 1rem;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .section-icon {
          color: #6b7280;
          width: 1rem;
          height: 1rem;
        }

        .section-text {
          font-size: 0.875rem;
          color: #4b5563;
          line-height: 1.6;
        }

        .requirements-list {
          padding-left: 1.25rem;
          margin: 0;
        }

        .requirement-item {
          font-size: 0.875rem;
          color: #4b5563;
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        /* Job Card Footer */
        .job-card-footer {
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 1rem;
        }

        .job-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-button {
          background-color: #eff6ff;
          color: #3b82f6;
          border: 1px solid #bfdbfe;
        }

        .edit-button:hover {
          background-color: #dbeafe;
        }

        .view-applications-button {
          background-color: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        .view-applications-button:hover {
          background-color: #dcfce7;
        }

        .delete-button {
          background-color: #fef2f2;
          color: #ef4444;
          border: 1px solid #fecaca;
        }

        .delete-button:hover {
          background-color: #fee2e2;
        }

        /* Empty State */
        .empty-state-card {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .empty-state-content {
          max-width: 400px;
          margin: 0 auto;
        }

        .empty-state-icon {
          width: 3rem;
          height: 3rem;
          color: #9ca3af;
          margin: 0 auto 1rem;
        }

        .empty-state-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .empty-state-text {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }

        .empty-state-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .empty-state-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .job-meta-grid {
            grid-template-columns: 1fr;
          }
          
          .job-card-header, 
          .job-card-content {
            padding: 1.25rem;
          }

          .portal-header {
            padding-top: 4rem;
          }
        }

        @media (max-width: 480px) {
          .job-card-main-info {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }
          
          .job-actions {
            flex-direction: column;
          }
          
          .action-button {
            justify-content: center;
          }

          .form-actions {
            flex-direction: column;
          }

          .submit-button, .cancel-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Institute1;