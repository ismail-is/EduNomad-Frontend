import React, { useState, useRef } from 'react';
import { User, Mail, MessageSquare, Upload, FileText, Send, CheckCircle } from 'lucide-react';



function SectionApplyJob() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    resume: null
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate form submission
    setTimeout(() => setIsSubmitted(false), 3000);
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
          {/* Header */}
          <div className="form-header">
            <h1 className="header-title">Apply For This Job</h1>
            <p className="header-subtitle">Join our team and make a difference</p>
          </div>

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
            <div className="form-field">
              <label htmlFor="message" className="field-label">
                Cover Letter / Message
              </label>
              <div className="input-container">
                <div className="textarea-icon">
                  <MessageSquare className="icon" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us why you're the perfect fit for this role..."
                  className="text-input textarea"
                  required
                />
              </div>
            </div>

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

            {/* Alternative Option */}
            {/* <div className="alternative-option">
              <p className="option-text">
                If you don't have a resume document, you may{' '}
                <button type="button" className="option-button">
                  write your brief professional profile here
                </button>
              </p>
            </div> */}

            {/* Submit Button */}
            <div className="submit-container">
              <button
                type="submit"
                disabled={isSubmitted}
                className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="button-icon" />
                    <span>Application Sent!</span>
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
    </div>
  );
}

export default SectionApplyJob;

// CSS Styles
const styles = `
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%);
  padding: 48px 16px;
}

.main-content {
  max-width: 52rem;
  margin: 0 auto;
}

.form-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(90deg,rgba(1, 229, 214, 1) 0%, rgba(237, 221, 83, 1) 100%);
  padding: 2rem;
}

.header-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.header-subtitle {
  color: #d1fae5;
  margin-top: 0.5rem;
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

.textarea-icon {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
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

.text-input:hover {
  border-color: #d1d5db;
}

.text-input:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
}

.textarea {
  padding-top: 0.75rem;
  padding-left: 2.5rem;
  min-height: 5rem;
  resize: none;
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

.alternative-option {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
}

.option-text {
  color: #1e40af;
  font-size: 0.875rem;
  margin: 0;
}

.option-button {
  color: #2563eb;
  font-weight: 500;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
}

.option-button:hover {
  color: #1e40af;
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

.submit-button:not(.submitted) {
  background: linear-gradient(to right, #10b981 0%, #0d9488 100%);
}

.submit-button:not(.submitted):hover {
  background: linear-gradient(to right, #0d9488 0%, #0f766e 100%);
  transform: scale(1.02);
}

.submit-button:not(.submitted):active {
  transform: scale(0.98);
}

.submit-button.submitted {
  background-color: #10b981;
}

.button-icon {
  height: 1.25rem;
  width: 1.25rem;
}

.footer {
  text-align: center;
  margin-top: 2rem;
}

.footer-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}
`;

// Inject styles into the document head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);