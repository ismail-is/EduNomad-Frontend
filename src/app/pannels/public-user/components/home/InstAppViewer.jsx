/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  Download,
  Eye,
  X,
  MapPin,
  GraduationCap,
  Building,
  Search,
  Filter,
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
  }

  .icon-button:hover {
    background-color: #f8fafc;
  }

  .icon-button:disabled {
    opacity: 0.5;
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
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
  }

  .modal-content {
    max-height: 85vh;
    width: 100%;
    max-width: 56rem;
    overflow-y: auto;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Header */
  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0f172a;
  }

  .modal-subtitle {
    font-size: 0.875rem;
    color: #64748b;
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
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
  }

  .search-input:focus {
    border-color: #3b82f6;
    background-color: white;
    outline: none;
  }

  .search-input::placeholder {
    color: #94a3b8;
  }

  .filter-select {
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    background-color: white;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    font-size: 0.875rem;
    appearance: none;
    padding-right: 1.75rem;
  }

  /* Applications Grid */
  .applications-grid {
    display: grid;
    gap: 1rem;
    padding: 0 1.5rem 2.5rem;
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
    transition: box-shadow 0.2s;
  }

  .application-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    display: grid;
    place-items: center;
    gap: 1rem;
    padding: 6rem 0;
    text-align: center;
    color: #64748b;
  }

  .empty-icon {
    width: 2.5rem;
    height: 2.5rem;
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
  }

  /* Contact Modal */
  .contact-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
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
  }

  .email-button {
    background: linear-gradient(to right, #0ea5e9, #0284c7);
    color: white;
  }

  .email-button:hover {
    opacity: 0.9;
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

  /* Review Modal */
  .notes-textarea {
    width: 100;
    height: 6rem;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .save-button {
    background: linear-gradient(to right, #0ea5e9, #0284c7);
    color: white;
  }

  .save-button:hover {
    opacity: 0.9;
  }
`;

/* -------------------------------------------------------------------------- */
/*                               Helper Pieces                                */
/* -------------------------------------------------------------------------- */

const StatusPill = ({ status }) => {
  return (
    <span className={`status-pill ${status}`}>
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
};

const IconButton = ({ icon: Icon, children, className = "", ...rest }) => (
  <button className={`icon-button ${className}`} {...rest}>
    <Icon className="icon" />
    {children}
  </button>
);

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

const InstAppViewer = ({ jobTitle, isOpen, onClose }) => {
  /* ------------------------------- State --------------------------------- */
  const [selectedApp, setSelectedApp] = useState(null);
  const [contactApp, setContactApp] = useState(null);
  const [reviewApp, setReviewApp] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [apps, setApps] = useState([
    {
      id: "1",
      candidateName: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Academic Street, University City, CA 90210",
      education: "PhD in Computer Science — Stanford (2019)",
      experience:
        "5 yrs Research Scientist @ Google AI · 15+ papers in top-tier conferences",
      resumeUrl: "#",
      coverLetter:
        "I am excited to apply for the Assistant Professor position. …",
      appliedDate: "2024-02-15",
      status: "pending",
    },
    {
      id: "2",
      candidateName: "Dr. Michael Chen",
      email: "m.chen@university.edu",
      phone: "+1 (555) 987-6543",
      address: "456 Research Blvd, Tech Valley, NY 12180",
      education: "PhD in Artificial Intelligence — MIT (2020)",
      experience:
        "4 yrs Post-doc Researcher @ Carnegie Mellon University, 6 papers in NeurIPS/ICML",
      resumeUrl: "#",
      coverLetter:
        "As a recent PhD graduate with expertise in AI and published research …",
      appliedDate: "2024-02-12",
      status: "reviewed",
    },
    {
      id: "3",
      candidateName: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@tech.com",
      phone: "+1 (555) 456-7890",
      address: "789 Innovation Dr, Silicon Valley, CA 94105",
      education: "PhD in Machine Learning — UC Berkeley (2018)",
      experience:
        "6 yrs Senior Engineer @ Google · 2 yrs Adjunct Prof @ UC Berkeley",
      resumeUrl: "#",
      coverLetter:
        "With my industry experience at Google and academic background …",
      appliedDate: "2024-02-10",
      status: "shortlisted",
    },
  ]);

  /* -------------------------- Derived Collections ------------------------ */
  const filteredApps = useMemo(() => {
    return apps
      .filter(
        (a) =>
          a.candidateName.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase())
      )
      .filter((a) => (statusFilter === "all" ? true : a.status === statusFilter))
      .sort(
        (a, b) => new Date(b.appliedDate).valueOf() - new Date(a.appliedDate).valueOf()
      );
  }, [apps, search, statusFilter]);

  /* ----------------------------- Handlers -------------------------------- */
  const updateStatus = (id, newStatus) =>
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

  /* ---------------------------- UI Helpers ------------------------------- */
  const Modal = ({ children }) => (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );

  /* ---------------------------------------------------------------------- */
  return (
    isOpen && (
      <>
        <style>{styles}</style>
        <Modal>
          {/* --------------------------- Header -------------------------- */}
          <header className="modal-header">
            <div>
              <h2 className="modal-title">Applications – {jobTitle}</h2>
              <p className="modal-subtitle">
                {apps.length} applicant{apps.length !== 1 && "s"} so far
              </p>
            </div>
            <IconButton icon={X} onClick={onClose} aria-label="Close" />
          </header>

          {/* ------------------------ Toolbar --------------------------- */}
          <div className="toolbar">
            <label className="search-container">
              <Search className="search-icon" />
              <input
                className="search-input"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>

            <IconButton icon={Download} onClick={() => alert("Export coming soon…")}>
              Export CSV
            </IconButton>
          </div>

          {/* -------------------- Applications Grid --------------------- */}
          {filteredApps.length === 0 ? (
            <div className="empty-state">
              <User className="empty-icon" />
              <p>No applications match your criteria.</p>
            </div>
          ) : (
            <ul className="applications-grid">
              {filteredApps.map((app) => (
                <li key={app.id} className="application-card">
                  {/* -------- Card Head -------- */}
                  <div className="card-head">
                    <h3 className="candidate-name">{app.candidateName}</h3>

                    <div className="space-y-1">
                      <p className="candidate-details">
                        <Mail className="icon" /> {app.email}
                      </p>
                      <p className="candidate-details">
                        <Phone className="icon" /> {app.phone}
                      </p>
                      <p className="candidate-details">
                        <Calendar className="icon" />{" "}
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
                      <IconButton
                        icon={Mail}
                        onClick={() => setContactApp(app)}
                      />
                      <IconButton
                        icon={Eye}
                        onClick={() => setReviewApp(app)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* ---------------------------- Resume Modal --------------------------- */}
          {selectedApp && (
            <Modal>
              <header className="modal-header">
                <h2 className="modal-title">{selectedApp.candidateName}</h2>
                <IconButton
                  icon={X}
                  onClick={() => setSelectedApp(null)}
                  aria-label="Close resume"
                />
              </header>

              <div className="space-y-6 px-6 py-6 text-sm">
                {/* Personal */}
                <section className="modal-section">
                  <h3 className="section-title">
                    <User className="icon" /> Personal
                  </h3>
                  <p className="section-content">
                    <Mail className="icon" /> {selectedApp.email}
                  </p>
                  <p className="section-content">
                    <Phone className="icon" /> {selectedApp.phone}
                  </p>
                  <p className="section-content">
                    <MapPin className="icon" /> {selectedApp.address}
                  </p>
                </section>

                {/* Education */}
                <section className="modal-section">
                  <h3 className="section-title">
                    <GraduationCap className="icon" /> Education
                  </h3>
                  <p>{selectedApp.education}</p>
                </section>

                {/* Experience */}
                <section className="modal-section">
                  <h3 className="section-title">
                    <Building className="icon" /> Experience
                  </h3>
                  <p>{selectedApp.experience}</p>
                </section>

                <div className="action-buttons">
                  <IconButton
                    icon={Download}
                    onClick={() => alert("PDF download coming soon…")}
                  >
                    PDF
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
            </Modal>
          )}

          {/* ---------------------------- Contact Modal -------------------------- */}
          {contactApp && (
            <Modal>
              <header className="modal-header">
                <h2 className="modal-title">Contact {contactApp.candidateName}</h2>
                <IconButton
                  icon={X}
                  onClick={() => setContactApp(null)}
                  aria-label="Close contact"
                />
              </header>
              <div className="space-y-4 px-6 py-6 text-sm">
                <div className="space-y-1">
                  <p className="contact-info">
                    <Mail className="icon email-icon" /> {contactApp.email}
                  </p>
                  <p className="contact-info">
                    <Phone className="icon phone-icon" /> {contactApp.phone}
                  </p>
                  <p className="contact-info">
                    <MapPin className="icon address-icon" /> {contactApp.address}
                  </p>
                </div>

                <div className="flex gap-2">
                  <IconButton
                    icon={Mail}
                    className="email-button flex-1"
                    onClick={() => window.open(`mailto:${contactApp.email}`)}
                  >
                    Email
                  </IconButton>
                  <IconButton
                    icon={Phone}
                    className="call-button flex-1"
                    onClick={() => window.open(`tel:${contactApp.phone}`)}
                  >
                    Call
                  </IconButton>
                </div>
              </div>
            </Modal>
          )}

          {/* ---------------------------- Review Modal --------------------------- */}
          {reviewApp && (
            <Modal>
              <header className="modal-header">
                <h2 className="modal-title">Review {reviewApp.candidateName}</h2>
                <IconButton
                  icon={X}
                  onClick={() => setReviewApp(null)}
                  aria-label="Close review"
                />
              </header>
              <div className="space-y-6 px-6 py-6 text-sm">
                {/* Current status */}
                <section className="modal-section">
                  <p className="mb-2 font-medium">Current status</p>
                  <StatusPill status={reviewApp.status} />
                </section>

                {/* Cover Letter */}
                <section className="modal-section">
                  <p className="mb-2 font-medium">Cover Letter</p>
                  <p className="whitespace-pre-line">{reviewApp.coverLetter}</p>
                </section>

                {/* Update form */}
                <section className="modal-section">
                  <label className="block space-y-1">
                    <span className="text-sm font-medium">Update status</span>
                    <select
                      className="filter-select w-full"
                      value={reviewApp.status}
                      onChange={(e) => updateStatus(reviewApp.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </label>

                  <label className="block space-y-1">
                    <span className="text-sm font-medium">Notes (optional)</span>
                    <textarea
                      className="notes-textarea"
                      placeholder="Add your notes here…"
                    />
                  </label>
                </section>

                <div className="action-buttons">
                  <IconButton
                    icon={Save}
                    onClick={() => {
                      alert("Review saved!");
                      setReviewApp(null);
                    }}
                    className="save-button"
                  >
                    Save
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
            </Modal>
          )}
        </Modal>
      </>
    )
  );
};

export default InstAppViewer;