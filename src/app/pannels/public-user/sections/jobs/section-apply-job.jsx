import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, MessageSquare, Upload, FileText, Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SectionApplyJob() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [job, setJob] = useState({});

  // Clean up any existing modal backdrops on component mount
  useEffect(() => {
    // Remove Bootstrap modal backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    
    // Remove modal-open class from body
    document.body.classList.remove('modal-open');
    
    // Reset body overflow
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:7001/api/jobview/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setJob(data.data); // Set the actual job data, not the entire response
        
        // Log the job data from the response
        console.log("main ID job ", data.data);
        console.log("Job title:", job.data?.titel);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // Log job title when job state updates
  useEffect(() => {
    if (job && job.titel) {
      console.log("Job title from state:", job.titel);
    }
  }, [job]);

  // Get user data from localStorage
  const getUserDataFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return {
          id: parsedData.id || '',
          name: parsedData.name || '',
          email: parsedData.email || '',
          username: parsedData.username || '',
          role: parsedData.role || '',
          lastdate: parsedData.lastdate || '',
        };
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
    return { id: '', name: '', email: '', username: '', role: '' };
  };

  const userData = getUserDataFromLocalStorage();

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    message: '',
    resume: null,
    username: userData.username,
    role: userData.role,
    userId: userData.id,
    jobId: params.id,
    jobTitel: job?.titel || '', // Initialize with empty string
    jobTitelastdatel: job?.lastdate || '', // Initialize with empty string
  });

  // Update formData when job data is loaded
  useEffect(() => {
    if (job && job.titel) {
      setFormData(prev => ({
        ...prev,
        jobTitel: job.titel
      }));
    }
  }, [job]);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Update formData when user data changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUserData = getUserDataFromLocalStorage();
      setFormData(prev => ({
        ...prev,
        name: updatedUserData.name,
        email: updatedUserData.email,
        username: updatedUserData.username,
        role: updatedUserData.role,
        userId: updatedUserData.id,
        lastdate: updatedUserData.lastdate,
      }));
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      const currentUserData = getUserDataFromLocalStorage();
      if (currentUserData.id !== formData.userId) {
        handleStorageChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [formData.userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!formData.userId) {
      setError('User ID not found. Please make sure you are logged in.');
      setIsLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('username', formData.username);
      submitData.append('role', formData.role);
      submitData.append('email', formData.email);
      submitData.append('userId', formData.userId);
      submitData.append('jobId', formData.jobId);
      submitData.append('jobTitel', formData.jobTitel || job?.titel || '');
      submitData.append('lastdate', formData.lastdate || job?.lastdate || '');
      if (formData.message) {
        submitData.append('message', formData.message);
      }
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }
      submitData.append('timestamps', new Date().toISOString());
      
      console.log('Submitting application with userId:', formData.userId);
      console.log('Job title being submitted:', formData.jobTitel);
      
      const response = await fetch('http://localhost:7001/api/apply', {
        method: 'POST',
        body: submitData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData(prev => ({
        name: userData.name,
        username: userData.username,
        role: userData.role,
        email: userData.email,
        message: '',
        resume: null,
        userId: prev.userId,
        jobId: prev.jobId,
        jobTitel: prev.jobTitel,
        lastdate: prev.lastdate,
      }));
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clean up modal backdrops before redirecting
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(-1); // Go back to previous page
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your application');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, resume: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="form-card">
          {/* Display job title if available */}
          {/* {job && job.titel && (
            <div className="job-header">
              <h2>Applying for: {job.titel}</h2>
            </div>
          )} */}
          
          <form onSubmit={handleSubmit} className="form-content">
            {/* Name Field */}
            <div className="form-field">
              <label htmlFor="name" className="field-label">
                Your Name
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <User className="icon" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="text-input"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-field">
              <label htmlFor="email" className="field-label">
                Email Address
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Mail className="icon" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="text-input"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            {/* <div className="form-field">
              <label htmlFor="message" className="field-label">
                Cover Letter (Optional)
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <MessageSquare className="icon" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a good fit for this position..."
                  className="text-input"
                  rows="4"
                />
              </div>
            </div> */}

            {/* File Upload */}
            <div className="form-field">
              <label className="field-label">
                Upload Resume
              </label>
              
              {!formData.resume ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className={`upload-icon ${isDragging ? 'dragging-icon' : ''}`} />
                  <p className="drop-text">
                    Drop your resume here, or <span className="browse-text">browse</span>
                  </p>
                  <p className="file-types">Supports PDF, DOC, DOCX (max 5MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                    className="file-input"
                    required
                  />
                </div>
              ) : (
                <div className="file-preview">
                  <div className="file-info">
                    <FileText className="file-icon" />
                    <div>
                      <p className="file-name">{formData.resume.name}</p>
                      <p className="file-size">
                        {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Success Message */}
            {isSubmitted && (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                <div>
                  <h3>Application Submitted Successfully!</h3>
                  <p>Redirecting you back to the previous page...</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="submit-container">
              <button
                type="submit"
                disabled={isLoading || isSubmitted || !formData.userId}
                className={`submit-button ${isSubmitted ? 'submitted' : ''} ${isLoading ? 'loading' : ''} ${!formData.userId ? 'disabled' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Submitting...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="button-icon" />
                    <span>Application Sent!</span>
                  </>
                ) : !formData.userId ? (
                  <>
                    <span>Please Login to Apply</span>
                  </>
                ) : (
                  <>
                    <Send className="button-icon" />
                    <span>Send Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-content {
          max-width: 52rem;
          width: 100%;
          margin: 0 auto;
        }

        .form-card {
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .job-header {
          padding: 1.5rem 2rem 0;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1rem;
        }

        .job-header h2 {
          margin: 0;
          color: #111827;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .form-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .input-container {
          position: relative;
        }

        .input-icon {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          padding-left: 0.75rem;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .icon {
          height: 1.25rem;
          width: 1.25rem;
          color: #9ca3af;
        }

        .text-input {
          display: block;
          width: 100%;
          padding-left: 2.5rem;
          padding-right: 1rem;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          line-height: 1.5;
          transition: all 0.2s ease;
        }

        textarea.text-input {
          resize: vertical;
          min-height: 100px;
        }

        .text-input:hover {
          border-color: #d1d5db;
        }

        .text-input:focus {
          outline: none;
          border-color: transparent;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
        }

        .file-drop-area {
          position: relative;
          border: 2px dashed #d1d5db;
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .file-drop-area:hover {
          border-color: #34d399;
        }

        .file-drop-area.dragging {
          border-color: #10b981;
          background-color: #ecfdf5;
        }

        .upload-icon {
          height: 3rem;
          width: 3rem;
          margin: 0 auto 1rem;
          color: #9ca3af;
          transition: color 0.2s ease;
        }

        .upload-icon.dragging-icon {
          color: #10b981;
        }

        .drop-text {
          color: #4b5563;
          font-weight: 500;
          margin: 0;
        }

        .browse-text {
          color: #059669;
        }

        .file-types {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-top: 0.5rem;
        }

        .file-input {
          display: none;
        }

        .file-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 0.5rem;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-icon {
          height: 2rem;
          width: 2rem;
          color: #059669;
        }

        .file-name {
          font-weight: 500;
          color: #111827;
          margin: 0;
        }

        .file-size {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .remove-button {
          color: #ef4444;
          font-weight: 500;
          font-size: 0.875rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .remove-button:hover {
          color: #dc2626;
        }

        .error-message {
          background-color: #fef2f2;
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #fecaca;
          font-size: 0.875rem;
        }

        .success-message {
          background-color: #f0fdf4;
          color: #166534;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #bbf7d0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .success-icon {
          height: 2rem;
          width: 2rem;
          color: #16a34a;
        }

        .success-message h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .success-message p {
          margin: 0.25rem 0 0 0;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .submit-container {
          padding-top: 1rem;
        }

        .submit-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: white;
          transition: all 0.2s ease;
          transform: scale(1);
          border: none;
          cursor: pointer;
        }

        .submit-button:not(.submitted):not(.loading):not(.disabled) {
          background: linear-gradient(to right, #10b981 0%, #0d9488 100%);
        }

        .submit-button:not(.submitted):not(.loading):not(.disabled):hover {
          background: linear-gradient(to right, #0d9488 0%, #0f766e 100%);
          transform: scale(1.02);
        }

        .submit-button:not(.submitted):not(.loading):not(.disabled):active {
          transform: scale(0.98);
        }

        .submit-button.submitted {
          background-color: #10b981;
        }

        .submit-button.loading {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .submit-button.disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
          color: #6b7280;
        }

        .button-icon {
          height: 1.25rem;
          width: 1.25rem;
        }

        .spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 10px;
          }
          
          .form-content {
            padding: 1.5rem;
          }
          
          .file-drop-area {
            padding: 1.5rem;
          }
          
          .job-header {
            padding: 1rem 1.5rem 0;
          }
        }

        /* Ensure no modal backdrop persists */
        .modal-backdrop {
          display: none !important;
        }
        
        body.modal-open {
          overflow: auto !important;
          padding-right: 0 !important;
        }
      `}</style>
    </div>
  );
}

export default SectionApplyJob;