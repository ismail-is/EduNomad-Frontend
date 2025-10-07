import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../../globals/route-names";
import SectionSideAdvert from "./section-side-advert";
import JobZImage from "../../../../../common/jobz-img";

function SectionJobsSidebar2({ _config,job}) {
    console.log(job?.data.department)
    return (
        <>
            <div className="side-bar mb-4">
                <div className="twm-s-info2-wrap mb-5">
                    <div className="twm-s-info2">
                        <h4 className="section-head-small mb-4">Job Information</h4>
                        {/* <ul className="twm-job-hilites">
                            <li>
                                <i className="fas fa-calendar-alt" />
                                <span className="twm-title">Date Posted</span>
                            </li>
                            <li>
                                <i className="fas fa-eye" />
                                <span className="twm-title">8160 Views</span>
                            </li>
                            <li>
                                <i className="fas fa-file-signature" />
                                <span className="twm-title">6 Applicants</span>
                            </li>
                        </ul> */}
                        <ul className="twm-job-hilites2">
                             <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-user-tie" />
                                    <span className="twm-title">Job Title</span>
                                    <div className="twm-s-info-discription">{job?.data.titel}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-calendar-alt" />
                                    <span className="twm-title">Date Posted</span>
                                    <div className="twm-s-info-discription">
                                        {new Date(job?.data.createdAt).toLocaleDateString("en-GB")}
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-map-marker-alt" />
                                    <span className="twm-title">Location</span>
                                    <div className="twm-s-info-discription">{job?.data.location}</div>
                                </div>
                            </li>
                           
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-clock" />
                                    <span className="twm-title">Experience</span>
                                    <div className="twm-s-info-discription">{job?.data.experience}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-suitcase" />
                                    <span className="twm-title">Qualification</span>
                                    <div className="twm-s-info-discription">{job?.data.qualification} </div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-venus-mars" />
                                    <span className="twm-title">Gender</span>
                                    <div className="twm-s-info-discription">{job?.data.gender}</div>
                                </div>
                            </li>
                            {/* <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-money-bill-wave" />
                                    <span className="twm-title">Offered Salary</span>
                                    <div className="twm-s-info-discription">$2000-$2500 / Month</div>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>

            </div>

            {
                _config.showJobInfo &&
                <div className="twm-s-info3-wrap mb-5">
                    {/* <div className="twm-s-info3">
                        <div className="twm-s-info-logo-section">
                            <div className="twm-media">
                                <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                            </div>
                            <h4 className="twm-title">Math Teacher</h4>
                        </div>
                        <ul>
                          
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-map-marker-alt" />
                                    <span className="twm-title">Address</span>
                                    <div className="twm-s-info-discription">USA</div>
                                </div>
                            </li>
                        </ul>
                        <NavLink to={publicUser.pages.ABOUT} className=" site-button">Vew Profile</NavLink>
                    </div> */}
                </div>
            }
            
            {/* <SectionSideAdvert /> */}
        </>
    )
}

export default SectionJobsSidebar2;