import { useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import JobViewPopup from "../../../common/popups/popup-job-view";
import { loadScript } from "../../../../globals/constants";

function CanSavedJobsPage() {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [popupLoading, setPopupLoading] = useState(false);
    const [popupError, setPopupError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [downloading, setDownloading] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(null);

    // Fetch saved jobs from API
    const fetchSavedJobs = async () => {
          loadScript("js/custom.js")
        try {
            setLoading(true);
            const response = await fetch("http://localhost:7001/api/applyview");
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Handle different possible response formats
            if (Array.isArray(data)) {
                setSavedJobs(data);
            } else if (data && Array.isArray(data.data)) {
                setSavedJobs(data.data);
            } else if (data && data.jobs) {
                setSavedJobs(data.jobs);
            } else {
                console.log("Unexpected API response format:", data);
                setSavedJobs([]);
            }
            
            setError(null);
        } catch (err) {
            console.error("Error fetching saved jobs:", err);
            setError("Failed to load saved jobs. Please try again later.");
            setSavedJobs([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch job details by ID for popup
    const fetchJobDetails = async (jobId) => {
        if (!jobId) return;
        
        try {
            setPopupLoading(true);
            setPopupError(null);
            
            const response = await fetch(`http://localhost:7001/api/jobview/${jobId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setJobDetails(data);
        } catch (err) {
            console.error("Error fetching job details:", err);
            setPopupError("Failed to load job details. Please try again.");
        } finally {
            setPopupLoading(false);
        }
    };

    // Update application status
    const updateApplicationStatus = async (applicationId, newStatus) => {
        if (!applicationId) {
            console.error("No application ID provided");
            return;
        }

        try {
            setUpdatingStatus(applicationId);
            
            const response = await fetch(`http://localhost:7001/api/applyupate/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("Status update successful:", result);
            
            // Update local state to reflect the change
            setSavedJobs(prevJobs => 
                prevJobs.map(job => 
                    (job.id || job._id) === applicationId 
                        ? { ...job, status: newStatus }
                        : job
                )
            );
            
        } catch (err) {
            console.error("Error updating application status:", err);
            alert("Failed to update status. Please try again.");
        } finally {
            setUpdatingStatus(null);
        }
    };

    // Handle status change
    const handleStatusChange = (applicationId, newStatus) => {
        if (window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
            updateApplicationStatus(applicationId, newStatus);
        }
    };

    // Download resume file
    const handleDownloadResume = async (job) => {
        if (!job?.resume?.path) {
            console.error("No resume path found for this job:", job);
            alert("No resume file available for download.");
            return;
        }

        try {
            setDownloading(job.id || job._id);
            
            const resumePath = job.resume.path;
            // Ensure the path is properly formatted for the URL
            const formattedPath = resumePath.replace(/\\/g, '/');
            const downloadUrl = `http://localhost:7001/${formattedPath}`;
            
            console.log("Downloading resume from:", downloadUrl);
            
            const response = await fetch(downloadUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            
            // Get filename from resume object or use default
            const filename = job.resume.filename || `resume-${job.id || job._id}.pdf`;
            a.download = filename;
            
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
        } catch (err) {
            console.error("Error downloading resume:", err);
            alert("Failed to download resume. Please try again.");
        } finally {
            setDownloading(null);
        }
    };

    // View job details
    const handleViewJob = (job) => {
        setSelectedJob(job);
        setShowPopup(true);
        
        // Get job ID from the job object (try different possible ID fields)
        const jobId = job?.jobId || job?.id || job?._id;
        console.log("Job ID for details:", jobId);
        
        if (jobId) {
            fetchJobDetails(jobId);
        } else {
            console.error("No job ID found in job object:", job);
            setPopupError("Job ID not found");
        }
    };

    // Close popup
    const handleClosePopup = () => {
        setSelectedJob(null);
        setJobDetails(null);
        setPopupError(null);
        setShowPopup(false);
    };

    // Get status badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'accepted':
                return 'badge bg-success';
            case 'rejected':
                return 'badge bg-danger';
            case 'pending':
            default:
                return 'badge bg-warning';
        }
    };

    // Get status display text
    const getStatusDisplayText = (status) => {
        switch (status) {
            case 'accepted':
                return 'Accepted';
            case 'rejected':
                return 'Rejected';
            case 'pending':
            default:
                return 'Pending';
        }
    };

  useEffect(() => {
    loadScript("js/custom.js");
        fetchSavedJobs();
        
    }, []);

    if (loading) {
        return (
            <div className="twm-right-section-panel candidate-save-job site-bg-gray">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ms-2">Loading saved jobs...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="twm-right-section-panel candidate-save-job site-bg-gray">
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                    <button 
                        className="btn btn-primary ms-3" 
                        onClick={fetchSavedJobs}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!savedJobs || savedJobs.length === 0) {
        return (
            <div className="twm-right-section-panel candidate-save-job site-bg-gray">
                <div className="text-center py-5">
                    <i className="fas fa-bookmark fa-3x text-muted mb-3"></i>
                    <h4>No Saved Jobs</h4>
                    <p className="text-muted">You haven't saved any jobs yet.</p>
                </div>
            </div>
        );
    }

   

    return (
        <>
            <div className="twm-right-section-panel candidate-save-job site-bg-gray">
                <div className="twm-D_table table-responsive">
                    <table id="jobs_bookmark_table" className="table table-bordered twm-candidate-save-job-list-wrap">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Poster</th>
                                <th>Role</th>
                                <th>Application ends</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedJobs.map((job) => {
                                const applicationId = job.id || job._id;
                                const currentStatus = job.status || 'pending';
                                
                                return (
                                    <tr key={applicationId}>
                                        <td>
                                            <div className="twm-candidate-save-job-list">
                                                <div className="twm-media">
                                                    {/* <div className="twm-media-pic">
                                                        <JobZImage 
                                                            src={job.companyLogo || job.logo || "images/jobs-company/pic1.jpg"} 
                                                            alt={job.companyName || job.company} 
                                                        />
                                                    </div> */}
                                                </div>
                                                <div className="twm-mid-content">
                                                    <a 
                                                        href="#" 
                                                        className="twm-job-title"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleViewJob(job);
                                                        }}
                                                    >
                                                        <h4>{job?.jobTitel}</h4>
                                                    </a>
                                                    {/* <p className="twm-candidate-address">
                                                        <i className="feather-map-pin"></i>
                                                        {job.location || "Location not specified"}
                                                    </p> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#">{job.username || job.postedBy || "N/A"}</a>
                                        </td>
                                        <td>
                                            <a href="#">{job.role || job.jobType || "N/A"}</a>
                                        </td>
                                        <td>
                                            <div>
                                                {job.lastdate || job.applicationDeadline
                                                    ? new Date(job.lastdate || job.applicationDeadline).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    })
                                                    : "N/A"}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className={`${getStatusBadgeClass(currentStatus)} me-2`}>
                                                    {getStatusDisplayText(currentStatus)}
                                                </span>
                                                <select 
                                                    className="form-select form-select-sm"
                                                    value={currentStatus}
                                                    onChange={(e) => handleStatusChange(applicationId, e.target.value)}
                                                    disabled={updatingStatus === applicationId}
                                                    style={{ width: 'auto', minWidth: '100px' }}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                                {updatingStatus === applicationId && (
                                                    <div className="spinner-border spinner-border-sm ms-2" role="status">
                                                        <span className="visually-hidden">Updating...</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="twm-table-controls">
                                                <ul className="twm-DT-controls-icon list-unstyled">
                                                    <li>
                                                        <button 
                                                            className="custom-toltip border-0 bg-transparent"
                                                            onClick={() => handleViewJob(job)}
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#saved-jobs-view"
                                                        >
                                                            <span className="fa fa-eye" />
                                                            <span className="custom-toltip-block">View</span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button 
                                                            className={`custom-toltip border-0 bg-transparent ${downloading === applicationId ? 'downloading' : ''}`}
                                                            onClick={() => handleDownloadResume(job)}
                                                            disabled={downloading === applicationId}
                                                        >
                                                            {downloading === applicationId ? (
                                                                <span className="fa fa-spinner fa-spin" />
                                                            ) : (
                                                                <span className="fa fa-download" />
                                                            )}
                                                            <span className="custom-toltip-block">
                                                                {downloading === applicationId ? 'Downloading...' : 'Download Resume'}
                                                            </span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Job View Popup */}
            <JobViewPopup 
                job={jobDetails || selectedJob} 
                isLoading={popupLoading}
                error={popupError}
                onClose={handleClosePopup}
                show={showPopup}
            />
        </>
    )
}

export default CanSavedJobsPage;