/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  Download,
  X,
  MapPin,
  GraduationCap,
  Building,
  Search,
  Save,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               CSS Styles                                   */
/* -------------------------------------------------------------------------- */

const styles = `
  .inst-app-viewer {
    font-family: system-ui, -apple-system, sans-serif;
    
  }

  /* Status Pill */
  .status-pill {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    
  }

  .status-pill.pending {
    background-color: #fef9c3;
    color: #854d0e;
  }

  .status-pill.reviewed {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .status-pill.shortlisted {
    background-color: #d1fae5;
    color: #065f46;
  }

  .status-pill.rejected {
    background-color: #ffe4e6;
    color: #9f1239;
  }

  .status-pill.accepted {
    background-color: #d1fae5;
    color: #065f46;
  }

  /* Icon Button */
  .icon-button {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .icon-button:hover {
    background-color: #f8fafc;
  }

  .icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button .icon {
    width: 1rem;
    height: 1rem;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;
  }

  .modal-content {
    position: relative;
    max-height: 85vh;
    width: 100%;
    max-width: 56rem;
    overflow-y: auto;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: slideIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Nested Modal */
  .nested-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;
  }

  /* Header */
  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem 1.5rem;
    background-color: #f8fafc;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }

  .modal-subtitle {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0.25rem 0 0 0;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    background-color: white;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .close-button:hover {
    background-color: #f1f5f9;
    color: #334155;
    border-color: #cbd5e1;
  }

  .close-button .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background-color: #ffffff;
    border-bottom: 1px solid #f1f5f9;
  }

  .search-container {
    position: relative;
    flex: 1;
    max-width: 20rem;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 0.625rem;
    width: 1rem;
    height: 1rem;
    color: #94a3b8;
  }

  .search-input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    background-color: #f8fafc;
    padding: 0.5rem 0.75rem 0.5rem 2.25rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    border-color: #3b82f6;
    background-color: white;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .search-input::placeholder {
    color: #94a3b8;
  }

  /* Applications Grid */
  .applications-grid {
    display: grid;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #f8fafc;
  }

  @media (min-width: 640px) {
    .applications-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .applications-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .application-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }

  .application-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }

  .card-head {
    margin-bottom: 0.5rem;
  }

  .candidate-name {
    font-size: 1.125rem;
    font-weight: 500;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .candidate-details {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    color: #475569;
    margin-bottom: 0.25rem;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .card-actions {
    display: flex;
    gap: 0.25rem;
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 6rem 2rem;
    text-align: center;
    color: #64748b;
  }

  .empty-icon {
    width: 3rem;
    height: 3rem;
    color: #f59e0b;
  }

  /* Resume Modal Sections */
  .modal-section {
    display: grid;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    padding: 1rem;
    font-size: 0.875rem;
    background-color: #fafafa;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #075985;
    margin-bottom: 0.5rem;
  }

  .section-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #374151;
  }

  /* Contact Modal */
  .contact-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background-color: #f8fafc;
    border-radius: 0.375rem;
  }

  .email-icon {
    color: #0284c7;
  }

  .phone-icon {
    color: #059669;
  }

  .address-icon {
    color: #d97706;
  }

  /* Action Buttons */
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .email-button {
    background: linear-gradient(to right, #0ea5e9, #0284c7);
    color: white;
    border: none;
  }

  .email-button:hover {
    opacity: 0.9;
    background: linear-gradient(to right, #0284c7, #0369a1);
  }

  .call-button {
    border-color: #34d399;
    color: #059669;
  }

  .call-button:hover {
    background-color: #ecfdf5;
  }

  .cancel-button {
    border-color: #fda4af;
    color: #be123c;
  }

  .cancel-button:hover {
    background-color: #fff1f2;
  }

  .save-button {
    background: linear-gradient(to right, #0ea5e9, #0284c7);
    color: white;
    border: none;
  }

  .save-button:hover {
    opacity: 0.9;
    background: linear-gradient(to right, #0284c7, #0369a1);
  }

  /* Form Elements */
  .filter-select {
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    background-color: white;
    padding: 0.5rem;
    font-size: 0.875rem;
    width: 100%;
    transition: border-color 0.2s ease;
  }

  .filter-select:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .notes-textarea {
    width: 100%;
    height: 6rem;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    padding: 0.5rem;
    font-size: 0.875rem;
    resize: vertical;
    transition: border-color 0.2s ease;
  }

  .notes-textarea:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Utility Classes */
  .space-y-1 > * + * {
    margin-top: 0.25rem;
  }

  .space-y-4 > * + * {
    margin-top: 1rem;
  }

  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }

  .flex {
    display: flex;
  }

  .flex-1 {
    flex: 1;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .block {
    display: block;
  }

  .w-full {
    width: 100%;
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .whitespace-pre-line {
    white-space: pre-line;
  }
`;

/* -------------------------------------------------------------------------- */
/*                               Helper Components                            */
/* -------------------------------------------------------------------------- */

const StatusPill = ({ status }) => {
  if (!status) return null;
  return (
    <span className={`status-pill ${status.toLowerCase()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const IconButton = ({ icon: Icon, children, className = "", onClick, disabled, ...rest }) => (
  <button 
    className={`icon-button ${className}`} 
    onClick={onClick}
    disabled={disabled}
    type="button"
    {...rest}
  >
    <Icon className="icon" />
    {children}
  </button>
);

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

const InstAppViewer = ({ jobTitle, jobId, isOpen, onClose }) => {
  /* ------------------------------- State --------------------------------- */
  const [selectedApp, setSelectedApp] = useState(null);
  const [contactApp, setContactApp] = useState(null);
  const [reviewApp, setReviewApp] = useState(null);
  const [search, setSearch] = useState("");
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  /* ------------------------------- Effects -------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    
    let abortController = new AbortController();

    const fetchApps = async () => {
      setLoading(true);
      setFetchError("");
      
      try {
        const response = await fetch("http://localhost:7001/api/applyview", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        const data = Array.isArray(json?.data) ? json.data : [];

        // Filter by jobId and accepted status only
        const filtered = data.filter(
          (item) => 
            String(item?.jobId) === String(jobId) && 
            item?.status === "accepted"
        );

        // Map API structure to UI schema
        const mapped = filtered.map((item) => ({
          id: item?._id || Math.random().toString(36).substr(2, 9),
          candidateName: item?.name || item?.username || "Unknown Candidate",
          email: item?.email || "",
          phone: item?.phone || "",
          address: item?.address || "",
          education: item?.jobTitel && item.jobTitel !== "undefined" ? item.jobTitel : "",
          experience: item?.experience || "",
          resumeUrl: item?.resume?.path || "",
          resumeFilename: item?.resume?.filename || "",
          coverLetter: item?.message || "",
          appliedDate: item?.createdAt || new Date().toISOString(),
          status: item?.status || "pending",
          role: item?.role || "",
          userId: item?.userId || "",
        }));

        if (!abortController.signal.aborted) {
          setApps(mapped);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Fetch error:', error);
          setFetchError(error?.message || "Failed to fetch applications");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchApps();

    return () => {
      abortController.abort();
    };
  }, [isOpen, jobId]);

  /* -------------------------- Derived Collections ------------------------ */
  const filteredApps = useMemo(() => {
    return apps
      .filter((app) => {
        const searchLower = search.toLowerCase();
        return (
          app.candidateName.toLowerCase().includes(searchLower) ||
          app.email.toLowerCase().includes(searchLower) ||
          app.role.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  }, [apps, search]);

  /* ----------------------------- Handlers -------------------------------- */
  const handleCloseMain = () => {
    // Close all nested modals first
    setSelectedApp(null);
    setContactApp(null);
    setReviewApp(null);
    // Then close main modal
    onClose();
  };

  const handleModalOverlayClick = (e) => {
    // Only close if clicking the overlay itself, not the content
    if (e.target === e.currentTarget) {
      handleCloseMain();
    }
  };

  const handleNestedModalOverlayClick = (e, closeHandler) => {
    // Only close if clicking the overlay itself, not the content
    if (e.target === e.currentTarget) {
      closeHandler();
    }
  };

  const updateStatus = (id, newStatus) => {
    setApps((prev) => 
      prev.map((app) => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const openResume = (app) => {
    if (app?.resumeUrl) {
      // Normalize backslashes to forward slashes for browser
      const normalized = app.resumeUrl.replace(/\\/g, "/");
      const url = normalized.startsWith("http://") || normalized.startsWith("https://")
        ? normalized
        : `http://localhost:7001/${normalized}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Resume not available.");
    }
  };

  const handleSaveReview = () => {
    // Here you could make an API call to save the review
    alert("Review saved! (Note: This is currently local state only)");
    setReviewApp(null);
  };

  /* ---------------------------- UI Helpers ------------------------------- */
  const Modal = ({ children, onOverlayClick, className = "" }) => (
    <div className={`modal-overlay ${className}`} onClick={onOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  const NestedModal = ({ children, onOverlayClick }) => (
    <div className="nested-modal-overlay" onClick={onOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  /* ---------------------------------------------------------------------- */
  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <Modal onOverlayClick={handleModalOverlayClick}>
        {/* --------------------------- Header -------------------------- */}
        <header className="modal-header">
          <div>
            <h2 className="modal-title">Applications – {jobTitle}</h2>
            <h2 className="modal-title">Applications – {jobId}</h2>
            <p className="modal-subtitle">
              {apps.length} applicant{apps.length !== 1 ? "s" : ""} so far
            </p>
            {fetchError && (
              <p className="modal-subtitle" style={{ color: "#dc2626" }}>
                Error: {fetchError}
              </p>
            )}
          </div>
          <button 
            className="close-button"
            onClick={handleCloseMain}
            aria-label="Close applications view"
            type="button"
          >
            <X className="icon" />
          </button>
        </header>

        {/* ------------------------ Toolbar --------------------------- */}
        <div className="toolbar">
          <label className="search-container">
            <Search className="search-icon" />
            <input
              className="search-input"
              placeholder="Search by name, email, or role…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        {/* -------------------- Applications Grid --------------------- */}
        {loading ? (
          <div className="empty-state">
            <User className="empty-icon" />
            <p>Loading applications…</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="empty-state">
            <User className="empty-icon" />
            <p>No accepted applications found for this job.</p>
            {search && <p>Try adjusting your search criteria.</p>}
          </div>
        ) : (
          <div className="applications-grid">
            {filteredApps.map((app) => (
              <div key={app.id} className="application-card">
                {/* -------- Card Head -------- */}
                <div className="card-head">
                  <h3 className="candidate-name">{app.candidateName}</h3>
                  <div className="space-y-1">
                    {app.email && (
                      <p className="candidate-details">
                        <Mail className="icon" /> {app.email}
                      </p>
                    )}
                    {app.phone && (
                      <p className="candidate-details">
                        <Phone className="icon" /> {app.phone}
                      </p>
                    )}
                    {app.role && (
                      <p className="candidate-details">
                        <User className="icon" /> {app.role}
                      </p>
                    )}
                    <p className="candidate-details">
                      <Calendar className="icon" />
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* -------- Card Footer -------- */}
                <div className="card-footer">
                  <StatusPill status={app.status} />
                  <div className="card-actions">
                    <IconButton 
                      icon={FileText} 
                      onClick={() => setSelectedApp(app)}
                    >
                      Resume
                    </IconButton>
                    {app.email && (
                      <IconButton 
                        icon={Mail} 
                        onClick={() => setContactApp(app)} 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* ---------------------------- Resume Modal --------------------------- */}
      {selectedApp && (
        <NestedModal 
          onOverlayClick={(e) => handleNestedModalOverlayClick(e, () => setSelectedApp(null))}
        >
          <header className="modal-header">
            <div>
              <h2 className="modal-title">{selectedApp.candidateName}</h2>
              <p className="modal-subtitle">Resume & Details</p>
            </div>
            <button 
              className="close-button"
              onClick={() => setSelectedApp(null)}
              aria-label="Close resume view"
              type="button"
            >
              <X className="icon" />
            </button>
          </header>

          <div className="space-y-6 px-6 py-6 text-sm">
            {/* Personal Information */}
            <section className="modal-section">
              <h3 className="section-title">
                <User className="icon" /> Personal Information
              </h3>
              {selectedApp.email && (
                <div className="section-content">
                  <Mail className="icon" /> {selectedApp.email}
                </div>
              )}
              {selectedApp.phone && (
                <div className="section-content">
                  <Phone className="icon" /> {selectedApp.phone}
                </div>
              )}
              {selectedApp.address && (
                <div className="section-content">
                  <MapPin className="icon" /> {selectedApp.address}
                </div>
              )}
              {selectedApp.role && (
                <div className="section-content">
                  <User className="icon" /> Role: {selectedApp.role}
                </div>
              )}
            </section>

            {/* Education */}
            {selectedApp.education && selectedApp.education !== "undefined" && (
              <section className="modal-section">
                <h3 className="section-title">
                  <GraduationCap className="icon" /> Education
                </h3>
                <p>{selectedApp.education}</p>
              </section>
            )}

            {/* Experience */}
            {selectedApp.experience && (
              <section className="modal-section">
                <h3 className="section-title">
                  <Building className="icon" /> Experience
                </h3>
                <p>{selectedApp.experience}</p>
              </section>
            )}

            {/* Cover Letter / Message */}
            {selectedApp.coverLetter && (
              <section className="modal-section">
                <h3 className="section-title">
                  <FileText className="icon" /> Message
                </h3>
                <p className="whitespace-pre-line">{selectedApp.coverLetter}</p>
              </section>
            )}

            <div className="action-buttons">
              <IconButton 
                icon={Download} 
                onClick={() => openResume(selectedApp)}
                className="email-button"
              >
                {selectedApp.resumeFilename || "Download Resume"}
              </IconButton>
              <IconButton
                icon={X}
                onClick={() => setSelectedApp(null)}
                className="cancel-button"
              >
                Close
              </IconButton>
            </div>
          </div>
        </NestedModal>
      )}

      {/* ---------------------------- Contact Modal -------------------------- */}
      {contactApp && (
        <NestedModal 
          onOverlayClick={(e) => handleNestedModalOverlayClick(e, () => setContactApp(null))}
        >
          <header className="modal-header">
            <div>
              <h2 className="modal-title">Contact {contactApp.candidateName}</h2>
              <p className="modal-subtitle">Get in touch with the candidate</p>
            </div>
            <button 
              className="close-button"
              onClick={() => setContactApp(null)}
              aria-label="Close contact view"
              type="button"
            >
              <X className="icon" />
            </button>
          </header>

          <div className="space-y-4 px-6 py-6 text-sm">
            <div className="space-y-1">
              {contactApp.email && (
                <div className="contact-info">
                  <Mail className="icon email-icon" /> {contactApp.email}
                </div>
              )}
              {contactApp.phone && (
                <div className="contact-info">
                  <Phone className="icon phone-icon" /> {contactApp.phone}
                </div>
              )}
              {contactApp.address && (
                <div className="contact-info">
                  <MapPin className="icon address-icon" /> {contactApp.address}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {contactApp.email && (
                <IconButton
                  icon={Mail}
                  className="email-button flex-1"
                  onClick={() => window.open(`mailto:${contactApp.email}`, '_blank')}
                >
                  Send Email
                </IconButton>
              )}
              {contactApp.phone && (
                <IconButton
                  icon={Phone}
                  className="call-button flex-1"
                  onClick={() => window.open(`tel:${contactApp.phone}`, '_blank')}
                >
                  Call Now
                </IconButton>
              )}
            </div>
          </div>
        </NestedModal>
      )}

      {/* ---------------------------- Review Modal --------------------------- */}
      {reviewApp && (
        <NestedModal 
          onOverlayClick={(e) => handleNestedModalOverlayClick(e, () => setReviewApp(null))}
        >
          <header className="modal-header">
            <div>
              <h2 className="modal-title">Review {reviewApp.candidateName}</h2>
              <p className="modal-subtitle">Update application status and add notes</p>
            </div>
            <button 
              className="close-button"
              onClick={() => setReviewApp(null)}
              aria-label="Close review"
              type="button"
            >
              <X className="icon" />
            </button>
          </header>

          <div className="space-y-6 px-6 py-6 text-sm">
            {/* Current Status */}
            <section className="modal-section">
              <p className="mb-2 font-medium">Current Status</p>
              <StatusPill status={reviewApp.status} />
            </section>

            {/* Message/Cover Letter */}
            {reviewApp.coverLetter && (
              <section className="modal-section">
                <p className="mb-2 font-medium">Candidate Message</p>
                <p className="whitespace-pre-line">{reviewApp.coverLetter}</p>
              </section>
            )}

            {/* Update Form */}
            <section className="modal-section">
              <label className="block space-y-1">
                <span className="text-sm font-medium">Update Status</span>
                <select
                  className="filter-select"
                  value={reviewApp.status}
                  onChange={(e) => updateStatus(reviewApp.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-sm font-medium">Notes (Optional)</span>
                <textarea
                  className="notes-textarea"
                  placeholder="Add your review notes here…"
                />
              </label>
            </section>

            <div className="action-buttons">
              <IconButton
                icon={Save}
                onClick={handleSaveReview}
                className="save-button"
              >
                Save Review
              </IconButton>
              <IconButton
                icon={X}
                onClick={() => setReviewApp(null)}
                className="cancel-button"
              >
                Cancel
              </IconButton>
            </div>
          </div>
        </NestedModal>
      )}
    </>
  );
};

export default InstAppViewer;
