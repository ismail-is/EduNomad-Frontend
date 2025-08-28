import { useEffect } from "react";
import { loadScript } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import ApplyJobPopup from "../../../../common/popups/popup-apply-job";
import SectionJobLocation from "../../sections/jobs/detail/section-job-location";
import SectionOfficePhotos1 from "../../sections/common/section-office-photos1";
import SectionOfficeVideo1 from "../../sections/common/section-office-video1";
import SectionShareProfile from "../../sections/common/section-share-profile";
import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";

function JobDetail1Page() {

    const sidebarConfig = {
        showJobInfo: true
    }

    useEffect(()=>{
        loadScript("js/custom.js");
    })

    return (
        <>
            <div className="section-full  p-t120 p-b90 bg-white">
                <div className="container">
                    {/* BLOG SECTION START */}
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                {/* Candidate detail START */}
                                <div className="cabdidate-de-info">
                                    <div className="twm-job-self-wrap">
                                        <div className="twm-job-self-info">
                                            <div className="twm-job-self-top">
                                                <div className="twm-media-bg">
                                                    <JobZImage src="imagesTeacher.jpg" alt="#" />
                                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                                </div>
                                                <div className="twm-mid-content">
                                                    <div className="twm-media">
                                                        <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                                                    </div>
                                                    <h4 className="twm-job-title">Math Teacher <span className="twm-job-post-duration">/ 1 days ago</span></h4>
                                                    <p className="twm-job-address"><i className="feather-map-pin" /> USA</p>
                                                    <div className="twm-job-self-mid">
                                                        {/* <div className="twm-job-self-mid-left">
                                                            <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                                            <div className="twm-jobs-amount">$2000 - $2500 <span>/ Month</span></div>
                                                        </div> */}
                                                        <div className="twm-job-apllication-area">Application ends:
                                                            <span className="twm-job-apllication-date">October 1, 2025</span>
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
                                    <p>We are seeking a passionate and dedicated Math Teacher to join our team. The ideal candidate will have a strong background in mathematics, excellent communication skills, and the ability to inspire students to develop problem-solving skills and a love for math. The teacher will create engaging lesson plans, assess student progress, and foster a positive learning environment.
                                    </p>
                                    {/* <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.</p> */}
                                    <h4 className="twm-s-title">Requirments:</h4>
                                    <ul className="description-list-2">
                                        <li>
                                            <i className="feather-check" />
                                           Bachelor’s degree in education or relevant subject plus required teaching certification.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Ability to design and deliver differentiated lessons using both traditional and digital methods.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Proven classroom management techniques for establishing clear rules and resolving conflicts.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Excellent verbal and written communication skills with students, parents, and colleagues.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            In-depth subject knowledge and commitment to continuous professional development.
                                        </li>
                                    </ul>
                                    <h4 className="twm-s-title">Responsabilities:</h4>
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
                                    </ul>

                                    {/* <SectionShareProfile /> */}
                                    {/* <SectionJobLocation /> */}

                                    {/* <div className="twm-two-part-section">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <SectionOfficePhotos1 />
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <SectionOfficeVideo1 />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 rightSidebar">
                                <SectionJobsSidebar2 _config={sidebarConfig} />
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