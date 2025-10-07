import log from "cros/common/logger";

function JobViewPopup({ job, isLoading, error, onClose }) {
    console.log("my data", job);
    
    // Format date for better display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <>
            <div className="modal fade twm-saved-jobs-view" id="saved-jobs-view" aria-hidden="true" aria-labelledby="sign_up_popupLabel-3" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content position-relative">
                        {/* Close button positioned at top right */}
                        <button 
                            type="button" 
                            className="btn-close position-absolute top-0 end-0 m-3" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                            style={{ zIndex: 10 }}
                        />
                        
                        <form>
                            <div className="modal-body p-4 pt-5">
                                {isLoading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2 mb-0">Loading job details...</p>
                                    </div>
                                ) : error ? (
                                    <div className="alert alert-danger text-center">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        Error loading job details: {error}
                                    </div>
                                ) : job?.data ? (
                                    <div className="row">
                                        {/* Job Title Header */}
                                        <div className="col-12 mb-4">
                                            <div className="text-center">
                                                <h2 className="h3 text-primary mb-2">{job.data.titel}</h2>
                                                {job.data.department && (
                                                    <p className="text-muted mb-0">{job.data.department}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Basic Job Information */}
                                        <div className="col-md-6 mb-4">
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">
                                                        <i className="fas fa-info-circle me-2 text-primary"></i>
                                                        Basic Information
                                                    </h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Job Title</label>
                                                        <p className="fw-semibold mb-0 text-dark">{job.data.titel}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Department</label>
                                                        <p className="mb-0">{job.data.department || 'Not specified'}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Location</label>
                                                        <p className="mb-0">
                                                            <i className="fas fa-map-marker-alt me-1 text-muted"></i>
                                                            {job.data.location || 'Not specified'}
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Employment Type</label>
                                                        <p className="mb-0">{job.data.employmentType || 'Not specified'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Requirements */}
                                        <div className="col-md-6 mb-4">
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">
                                                        <i className="fas fa-user-check me-2 text-primary"></i>
                                                        Requirements
                                                    </h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Experience</label>
                                                        <p className="mb-0">{job.data.experience || 'Not specified'}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Qualification</label>
                                                        <p className="mb-0">{job.data.qualification || 'Not specified'}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-muted small mb-1">Gender</label>
                                                        <p className="mb-0">{job.data.gender || 'Not specified'}</p>
                                                    </div>
                                                    <div className="mb-0">
                                                        <label className="form-label text-muted small mb-1">Apply Before</label>
                                                        <p className="mb-0 text-danger fw-semibold">
                                                            <i className="fas fa-calendar-alt me-1"></i>
                                                            {formatDate(job.data.lastdate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job Description */}
                                        <div className="col-12 mb-4">
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">
                                                        <i className="fas fa-file-alt me-2 text-primary"></i>
                                                        Job Description
                                                    </h6>
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-0" style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                                        {job.data.message || 'No description provided.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job Requirements */}
                                        {job.data.requirements && (
                                            <div className="col-12 mb-4">
                                                <div className="card border-0 shadow-sm">
                                                    <div className="card-header bg-light">
                                                        <h6 className="mb-0">
                                                            <i className="fas fa-tasks me-2 text-primary"></i>
                                                            Job Requirements
                                                        </h6>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="mb-0" style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                                            {job.data.requirements}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
                                        <p className="text-muted">No job data available</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="modal-footer border-top-0 pt-0">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary me-2" 
                                    data-bs-dismiss="modal"
                                >
                                    <i className="fas fa-times me-2"></i>
                                    Close
                                </button>
                                {/* {job?.data && (
                                    <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        onClick={() => {
                                            // Add apply functionality here
                                            console.log('Apply for job:', job.data.titel);
                                        }}
                                    >
                                        <i className="fas fa-paper-plane me-2"></i>
                                        Apply Now
                                    </button>
                                )} */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Add some custom styles */}
            <style jsx>{`
                .card {
                    transition: transform 0.2s ease-in-out;
                }
                .card:hover {
                    transform: translateY(-2px);
                }
                .modal-header {
                    border-bottom: 2px solid rgba(255,255,255,0.1);
                }
                .form-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .bg-light {
                    background-color: #f8f9fa !important;
                }
                .modal-content {
                    border-radius: 12px;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
}

export default JobViewPopup;