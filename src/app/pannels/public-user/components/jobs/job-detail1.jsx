import { useEffect, useState } from "react";
import { loadScript } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import ApplyJobPopup from "../../../../common/popups/popup-apply-job";
import SectionJobLocation from "../../sections/jobs/detail/section-job-location";
import SectionOfficePhotos1 from "../../sections/common/section-office-photos1";
import SectionOfficeVideo1 from "../../sections/common/section-office-video1";
import SectionShareProfile from "../../sections/common/section-share-profile";
import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";
import { useParams } from "react-router-dom";
import log from "cros/common/logger";

function JobDetail1Page() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sidebarConfig = {
        showJobInfo: true
    }

    useEffect(() => {
        loadScript("js/custom.js");
    }, []);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`http://localhost:7001/api/jobview/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch job");
                }
                const data = await res.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    // Show loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Show message if no job data is available
    if (!job || !job.data) {
        return <div>No job data found.</div>;
    }

    return (
        <>
            <div className="section-full  p-t120 p-b90 bg-white">
                <div className="container">
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="cabdidate-de-info">
                                    <div className="twm-job-self-wrap">
                                        <div className="twm-job-self-info">
                                            <div className="twm-job-self-top">
                                                {/* <div className="twm-media-bg">
                                                    <JobZImage src="imagesTeacher.jpg" alt="#" />
                                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                                </div> */}
                                                <div className="twm-mid-content">
                                                    {/* <div className="twm-media">
                                                        <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                                                    </div> */}
                                                    <h4 className="twm-s-title">{job.data.titel} <span className="twm-job-post-duration"></span></h4>
                                                    <p className="twm-job-address"><i className="feather-map-pin" /> {job.data.location}</p>
                                                    <div className="twm-job-self-mid">
                                                        <div className="twm-job-apllication-area">Application ends:
                                                            <span className="twm-job-apllication-date"> {new Date(job.data.lastdate).toLocaleDateString("en-GB")}</span>
                                                        </div>
                                                    </div>
                                                    <div className="twm-job-self-bottom">
                                                        <a className="site-button" data-bs-toggle="modal" href="#apply_job_popup" role="button">
                                                            Apply Now
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="twm-s-title">Job Description:</h4>
                                    <p>{job.data.message}</p>
                                   <h4 className="twm-s-title">Requirements:</h4>
<ul className="description-list-2">
  {job?.data?.requirements?.split(/,|\n/).map((req, index) => (
    <li key={index}>
      <i className="feather-check" /> {req.trim()}
    </li>
  ))}
</ul>


                                    
                                    {/* <h4 className="twm-s-title">Responsabilities:</h4>
                                    <ul className="description-list-2">
                                        <li>
                                            <i className="feather-check" />
                                            Develop and implement standards-aligned lesson plans using varied instructional strategies.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Create and grade assessments, analyze results, and provide timely feedback to students.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Maintain a safe, inclusive classroom environment with clear routines and behavior expectations.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Offer individual and small-group support, and communicate student progress to families.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Offer individual and small-group support, and communicate student progress to families.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Collaborate with colleagues, participate in professional development, and refine teaching practices.
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionJobsSidebar2 _config={sidebarConfig} job={job}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ApplyJobPopup />
        </>
    )
}

export default JobDetail1Page;