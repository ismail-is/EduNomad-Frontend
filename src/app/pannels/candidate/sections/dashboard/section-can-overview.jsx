import { useState, useEffect } from 'react';
import CountUp from "react-countup";
import axios from 'axios';

function SectionCandidateOverview() {
    const [jobCount, setJobCount] = useState(0);
    const [applicationCount, setApplicationCount] = useState(435);
    const [messageCount, setMessageCount] = useState(28);
    const [notificationCount, setNotificationCount] = useState(18);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobCount();
    }, []);

    const fetchJobCount = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:7001/api/jobview');
            
            // Handle different response structures
            let count = 0;
            
            if (Array.isArray(response.data)) {
                // If response.data is an array
                count = response.data.length;
            } else if (response.data && Array.isArray(response.data.data)) {
                // If response.data has a data property that's an array
                count = response.data.data.length;
            } else if (response.data && typeof response.data.count === 'number') {
                // If response.data has a count property
                count = response.data.count;
            } else if (response.data && typeof response.data.total === 'number') {
                // If response.data has a total property
                count = response.data.total;
            }
            
            console.log('API Response:', response.data);
            console.log('Job count:', count);
            
            setJobCount(count);
            setError(null);
        } catch (error) {
            console.error('Error fetching job count:', error);
            setError('Failed to fetch job count');
            // Fallback to a default value
            setJobCount(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="twm-dash-b-blocks mb-5">
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-job" /></div>
                                <div className="wt-card-right wt-total-active-listing counter">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : error ? (
                                        <div>Error</div>
                                    ) : (
                                        <CountUp end={jobCount} duration={1} />
                                    )}
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Posted Jobs</h4>
                                    {error && <small className="text-danger">{error}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other cards remain the same */}
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-2">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-resume" /></div>
                                <div className="wt-card-right wt-total-listing-view counter">
                                    <CountUp end={applicationCount} duration={1} />
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Total Applications</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-3">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-envelope" /></div>
                                <div className="wt-card-right wt-total-listing-review counter">
                                    <CountUp end={messageCount} duration={1} />
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Messages</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                    <div className="panel panel-default">
                        <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-4">
                            <div className="wt-card-wrap-2">
                                <div className="wt-card-icon-2"><i className="flaticon-bell" /></div>
                                <div className="wt-card-right wt-total-listing-bookmarked counter">
                                    <CountUp end={notificationCount} duration={1} />
                                </div>
                                <div className="wt-card-bottom-2">
                                    <h4 className="m-b0">Notifications</h4>
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