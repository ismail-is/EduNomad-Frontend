import { useState, useEffect } from 'react';
import CountUp from "react-countup";
import axios from 'axios';

function SectionCandidateOverview() {
    const [jobCount, setJobCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobCount();
        fetchApplicationCounts();
    }, []);

    const fetchJobCount = async () => {
        try {
            const response = await axios.get('http://localhost:7001/api/jobview');
            
            let count = 0;
            
            if (Array.isArray(response.data)) {
                count = response.data.length;
            } else if (response.data && Array.isArray(response.data.data)) {
                count = response.data.data.length;
            } else if (response.data && typeof response.data.count === 'number') {
                count = response.data.count;
            } else if (response.data && typeof response.data.total === 'number') {
                count = response.data.total;
            }
            
            console.log('Job count:', count);
            setJobCount(count);
        } catch (error) {
            console.error('Error fetching job count:', error);
            setJobCount(0);
        }
    };

    const fetchApplicationCounts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:7001/api/applyview');
            
            let applications = [];
            
            // Handle different response structures
            if (Array.isArray(response.data)) {
                applications = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                applications = response.data.data;
            } else {
                console.error('Unexpected API response structure:', response.data);
                setError('Unexpected API response structure');
                return;
            }
            
            console.log('Applications API Response:', applications);
            
            // Count applications by status
            const pendingCount = applications.filter(app => 
                app.status && app.status.toLowerCase() === 'pending'
            ).length;
            
            const acceptedCount = applications.filter(app => 
                app.status && app.status.toLowerCase() === 'accepted'
            ).length;
            
            console.log('Pending count:', pendingCount);
            console.log('Accepted count:', acceptedCount);
            
            setPendingCount(pendingCount);
            setAcceptedCount(acceptedCount);
            setError(null);
        } catch (error) {
            console.error('Error fetching application counts:', error);
            setError('Failed to fetch application counts');
            // Fallback to default values
            setPendingCount(0);
            setAcceptedCount(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="twm-dash-b-blocks mb-5">
            <div className="row">
                {/* Posted Jobs Card */}
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-job" /></div>
                                <div className="wt-card-right wt-total-active-listing counter">
                                    <CountUp end={jobCount} duration={1} />
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Posted Jobs</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Applications Card */}
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-2">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-resume" /></div>
                                <div className="wt-card-right wt-total-listing-view counter">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : error ? (
                                        <div>Error</div>
                                    ) : (
                                        <CountUp end={pendingCount + acceptedCount} duration={1} />
                                    )}
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Total Applications</h4>
                                    {error && <small className="text-danger">{error}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Applications Card */}
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-3">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-envelope" /></div>
                                <div className="wt-card-right wt-total-listing-review counter">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : error ? (
                                        <div>Error</div>
                                    ) : (
                                        <CountUp end={pendingCount} duration={1} />
                                    )}
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Pending</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accepted Applications Card */}
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-4">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-bell" /></div>
                                <div className="wt-card-right wt-total-listing-bookmarked counter">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : error ? (
                                        <div>Error</div>
                                    ) : (
                                        <CountUp end={acceptedCount} duration={1} />
                                    )}
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Accepted</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionCandidateOverview;