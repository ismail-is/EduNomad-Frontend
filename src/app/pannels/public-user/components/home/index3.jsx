import { NavLink } from "react-router-dom";
import { loadScript, publicUrlFor, default_skin, updateSkinStyle } from "../../../../../globals/constants";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import CountUp from "react-countup";
import { useEffect } from "react";
import SectionJobCategories from "../../sections/about/section-job-categories";

function Home3Page() {

    useEffect(()=>{
        updateSkinStyle(default_skin, true, false)
        loadScript("js/custom.js")
    })

    return (
        <>
            {/*Banner Start*/}
            <div className="twm-home3-banner-section site-bg-white bg-cover"style={{
  backgroundImage: `
    linear-gradient(
      90deg,
      rgba(42, 123, 155, 0.85) 0%,
      rgba(87, 199, 133, 0.86) 100%
    ),
    url(${publicUrlFor("/images/background/Edono-home-bg.jpg")})
  `
}}
>
                <div className="twm-home3-inner-section" >
                    <div className="twm-bnr-mid-section">
                        <div className="twm-bnr-title-large"> Edunomad Connect</div>
                        <div className="twm-bnr-title-light">Brings Education Together</div>
                        <div className="twm-bnr-discription">Where Teachers, Schools, and Parents Find Each Other.</div>
                        <div className="twm-bnr-search-bar">
                            <form>
                                <div className="row">
                                    {/*Title*/}
                                    <div className="form-group col-xl-3 col-lg-6 col-md-6">
                                        <label>Subject</label>
                                        <select className="wt-search-bar-select selectpicker" data-live-search="true" title="" id="j-Job_Title" data-bv-field="size">
                                            <option disabled value="">Select Subjects</option>
                                            <option selected>All Subjects</option>
                                            <option>Physics</option>
                                            <option>Chemistry</option>
                                            <option>Mathematics</option>
                                        </select>
                                    </div>
                                    {/*All Category*/}
                                    <div className="form-group col-xl-4 col-lg-6 col-md-6">
                                        <label>Type</label>
                                        <select className="wt-search-bar-select selectpicker" data-live-search="true" title="" id="j-All_Category" data-bv-field="size">
                                            <option disabled value="">Select Category</option>
                                            <option selected>Service Type</option>
                                            <option>Full-Time</option>
                                            <option>Part-Time</option>
                                            <option>Intern</option>
                                        </select>
                                    </div>
                                    {/*Location*/}
                                    <div className="form-group col-xl-3 col-lg-6 col-md-6">
                                        <label>Location</label>
                                        <div className="twm-inputicon-box">
                                            <input name="username" type="text" required className="form-control" placeholder="Location" />
                                            <i className="twm-input-icon fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    {/*Find job btn*/}
                                    <div className="form-group col-xl-2 col-lg-6 col-md-6">
                                        <button type="button" className="site-button">Find Job</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="twm-bnr-popular-search">
                            <span className="twm-title">Popular Searches:</span>
                            <NavLink to={publicUser.jobs.LIST}>Teacher</NavLink> ,
                            <NavLink to={publicUser.jobs.LIST}>Tutor</NavLink> ,
                            <NavLink to={publicUser.jobs.LIST}>Intern</NavLink> ,
                            <NavLink to={publicUser.jobs.LIST}>Trainee</NavLink> ...
                        </div>
                    </div>
                </div>
            </div>
          
            {/* HOW IT WORK SECTION START */}
            <div className="section-full p-t120 p-b90 site-bg-gray twm-how-it-work-area">
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Unified Process </div>
                        </div>
                        <h2 className="wt-title">How It Works</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="twm-how-it-work-section3">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6">
                                <div className="twm-w-process-steps3">
                                    <div className="twm-w-pro-top">
                                        <span className="twm-large-number  text-clr-sky">01</span>
                                        <div className="twm-media bg-clr-sky">
                                            <span><JobZImage src="images/work-process/icon1.png" alt="icon1" /></span>
                                        </div>
                                    </div>
                                    <h4 className="twm-title">Create Your Profile</h4>
                                    <p>Sign up in minutes and tell us who you are, teacher, parent, or institute. Add your details, preferences, and what you’re looking for.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6">
                                <div className="twm-w-process-steps3">
                                    <div className="twm-w-pro-top">
                                        <span className="twm-large-number text-clr-pink">02</span>
                                        <div className="twm-media bg-clr-pink">
                                            <span><JobZImage src="images/work-process/icon2.png" alt="icon1" /></span>
                                        </div>
                                    </div>
                                    <h4 className="twm-title"> Post or Search</h4>
                                    <p>Institutes and parents can post teaching needs, while teachers browse jobs and tutoring opportunities by skill and location.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6">
                                <div className="twm-w-process-steps3">
                                    <div className="twm-w-pro-top">
                                        <span className="twm-large-number  text-clr-green">03</span>
                                        <div className="twm-media  bg-clr-green">
                                            <span><JobZImage src="images/work-process/icon3.png" alt="icon1" /></span>
                                        </div>
                                    </div>
                                    <h4 className="twm-title">Connect & Collaborate</h4>
                                    <p>Review matches, connect with the right people, and take the next step, whether it’s hiring, applying, or starting a class.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* HOW IT WORK SECTION END */}
            {/* FEATURED SECTION START */}
            <div className="section-full p-t120 p-b90 site-bg-white twm-featured-city-area">
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Featured Cities</div>
                        </div>
                        <h2 className="wt-title">Browse job offers by
                            popular locations</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="twm-featured-city-section">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12">
                                <div className="twm-featured-city twm-large-block">
                                    <div className="twm-media">
                                        <JobZImage src="/images/City/UK.jpg" alt="" />
                                        <div className="twm-city-info">
                                            <div className="twm-city-jobs">125 Jobs</div>
                                            <h4 className="twm-title"><NavLink to={publicUser.jobs.LIST}>UK</NavLink></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="twm-featured-city">
                                            <div className="twm-media">
                                                <JobZImage src="images/City/Egypt.jpg" alt="" />
                                                <div className="twm-city-info">
                                                    <div className="twm-city-jobs">190 Jobs</div>
                                                    <h4 className="twm-title"><NavLink to={publicUser.jobs.LIST}>Egypt</NavLink></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="twm-featured-city">
                                            <div className="twm-media">
                                                <JobZImage src="images/City/Kenya.jpg" alt="" />
                                                <div className="twm-city-info">
                                                    <div className="twm-city-jobs">220 Jobs</div>
                                                    <h4 className="twm-title"><NavLink to={publicUser.jobs.LIST}>Kenya</NavLink></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* FEATURED SECTION END */}
            {/* JOB POST START */}
            <div className="section-full p-t120 p-b90 site-bg-gray twm-bg-ring-wrap2">
                <div className="twm-bg-ring-right" />
                <div className="twm-bg-ring-left" />
                <div className="container">
                    <div className="wt-separator-two-part">
                        <div className="row wt-separator-two-part-row">
                            <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-left">
                                {/* title="" START*/}
                                <div className="section-head left wt-small-separator-outer">
                                    <div className="wt-small-separator site-text-primary">
                                        <div>All Jobs Post</div>
                                    </div>
                                    <h2 className="wt-title">Find Your Career You Deserve it</h2>
                                </div>
                                {/* title="" END*/}
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-right text-right">
                                <NavLink to={publicUser.jobs.LIST} className=" site-button">Browse All Jobs</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="section-content">
                        <div className="twm-jobs-grid-wrap">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="twm-jobs-grid-style1  m-b30">
                                        <div className="twm-media">
                                            <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                                        </div>
                                        <span className="twm-job-post-duration">1 days ago</span>
                                        <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                                <h4>English Teacher</h4>
                                            </NavLink>
                                            <p className="twm-job-address">Pune, Maharashtra</p>
                                            <p>Qualification: B.A. in English + B.Ed.</p>
                                            <p>Experience: Minimum 3 years teaching middle or high school English </p>
                                            {/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
                                        </div>
                                        <div className="twm-right-content">
                                            <div className="twm-jobs-amount">Apply Before: <span> August 20, 2025</span></div>
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Apply Now</NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="twm-jobs-grid-style1 m-b30">
                                        <div className="twm-media">
                                            <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                                        </div>
                                        <span className="twm-job-post-duration">15 days ago</span>
                                        <div className="twm-jobs-category green"><span className="twm-bg-brown">Intership</span></div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                                <h4>Science Teacher (Physics Focus)</h4>
                                            </NavLink>
                                            <p className="twm-job-address">Bengaluru, Karnataka</p>
                                            <p>Qualification: M.Sc. in Physics + B.Ed.</p>
                                            <p>Experience: At least 2 years teaching experience at the secondary level </p>
                                            
                                            {/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
                                        </div>
                                        <div className="twm-right-content">
                                            <div className="twm-jobs-amount">Apply Before:<span> September 5, 2025</span></div>
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Apply Now</NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="twm-jobs-grid-style1  m-b30">
                                        <div className="twm-media">
                                            <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                                        </div>
                                        <span className="twm-job-post-duration">6 Month ago</span>
                                        <div className="twm-jobs-category green"><span className="twm-bg-purple">Fulltime</span></div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                                <h4 className="twm-job-title">Mathematics Tutor (Online)</h4>
                                            </NavLink>
                                            <p className="twm-job-address">Remote (based in India)</p>
                                             <p>Qualification: B.Sc. or M.Sc. in Mathematics</p>
                                            <p>Experience:1+ year of online teaching experience for Grades 8–12</p>
                                            {/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
                                        </div>
                                        <div className="twm-right-content">
                                            <div className="twm-jobs-amount">Apply Before:<span> November 12, 2025</span></div>
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Apply Now</NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="twm-jobs-grid-style1  m-b30">
                                        <div className="twm-media">
                                            <JobZImage src="images/client-logo2/instLogo.png" alt="#" />
                                        </div>
                                        <span className="twm-job-post-duration">1 days ago</span>
                                        <div className="twm-jobs-category green"><span className="twm-bg-golden">Temporary</span></div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                                <h4 className="twm-job-title">Art & Craft Teacher</h4>
                                            </NavLink>
                                            <p className="twm-job-address">Jaipur, Rajasthan</p>
                                            <p>Qualification: Diploma or Degree in Fine Arts / Visual Arts / Art Education</p>
                                            <p>Experience: Minimum 2 years of teaching art in primary or middle school </p>
                                            {/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
                                        </div>
                                        <div className="twm-right-content">
                                            <div className="twm-jobs-amount">Apply Before: <span> September 10, 2025</span></div>
                                            <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Apply Now</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* JOB POST END */}
            {/* CANDIDATES START */}
            <div className="section-full p-t120 p-b90 site-bg-white">
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Candidates</div>
                        </div>
                        <h2 className="wt-title">Featured Candidates</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="section-content">
                        <div className="twm-blog-post-3-outer-wrap">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    {/*Block one*/}
                                    <div className="twm-candidates-list-style1">
                                        <div className="twm-media">
                                            <div className="twm-media-pic">
                                                <JobZImage src="images/Candidt/pic1.jpg" alt="#" />
                                            </div>
                                            <div className="twm-candidates-tag"><span>Featured</span></div>
                                        </div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.candidate.DETAIL1} className="twm-job-title">
                                                <h4>Wanda Montgomery </h4>
                                            </NavLink>
                                            <p>M.A. in English Literature</p>
                                            <div className="twm-fot-content">
                                                <div className="twm-left-info">
                                                    <p className="twm-candidate-address"><i className="feather-map-pin" />New York</p>
                                                    {/* <div className="twm-jobs-vacancies">$20<span>/ Day</span></div> */}
                                                </div>
                                                <div className="twm-right-btn">
                                                    <NavLink to={publicUser.candidate.DETAIL1} className="twm-view-prifile site-text-primary">View Profile</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    {/*Block two*/}
                                    <div className="twm-candidates-list-style1">
                                        <div className="twm-media">
                                            <div className="twm-media-pic">
                                                <JobZImage src="images/Candidt/pic2.jpg" alt="#" />
                                            </div>
                                            <div className="twm-candidates-tag"><span>Featured</span></div>
                                        </div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.candidate.DETAIL1} className="twm-job-title">
                                                <h4>Peter Hawkins</h4>
                                            </NavLink>
                                            <p>B.Sc. in Mathematics, B.Ed.</p>
                                            <div className="twm-fot-content">
                                                <div className="twm-left-info">
                                                    <p className="twm-candidate-address"><i className="feather-map-pin" />New York</p>
                                                    {/* <div className="twm-jobs-vacancies">$7<span>/ Hour</span></div> */}
                                                </div>
                                                <div className="twm-right-btn">
                                                    <NavLink to={publicUser.candidate.DETAIL1} className="twm-view-prifile site-text-primary">View Profile</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    {/*Block three*/}
                                    <div className="twm-candidates-list-style1">
                                        <div className="twm-media">
                                            <div className="twm-media-pic">
                                                <JobZImage src="images/Candidt/pic3.jpg" alt="#" />
                                            </div>
                                            <div className="twm-candidates-tag"><span>Featured</span></div>
                                        </div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.candidate.DETAIL1} className="twm-job-title">
                                                <h4>Ralph Johnson</h4>
                                            </NavLink>
                                            <p>M.Sc. in Physics</p>
                                            <div className="twm-fot-content">
                                                <div className="twm-left-info">
                                                    <p className="twm-candidate-address"><i className="feather-map-pin" />New York</p>
                                                    {/* <div className="twm-jobs-vacancies">$180<span>/ Day</span></div> */}
                                                </div>
                                                <div className="twm-right-btn">
                                                    <NavLink to={publicUser.candidate.DETAIL1} className="twm-view-prifile site-text-primary">View Profile</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    {/*Block Four*/}
                                    <div className="twm-candidates-list-style1">
                                        <div className="twm-media">
                                            <div className="twm-media-pic">
                                                <JobZImage src="images/Candidt/pic4.jpg" alt="#" />
                                            </div>
                                            <div className="twm-candidates-tag"><span>Featured</span></div>
                                        </div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.candidate.DETAIL1} className="twm-job-title">
                                                <h4>Randall Henderson </h4>
                                            </NavLink>
                                            <p>B.Com., Diploma in Accountancy</p>
                                            <div className="twm-fot-content">
                                                <div className="twm-left-info">
                                                    <p className="twm-candidate-address"><i className="feather-map-pin" />New York</p>
                                                    {/* <div className="twm-jobs-vacancies">$90<span>/ Week</span></div> */}
                                                </div>
                                                <div className="twm-right-btn">
                                                    <NavLink to={publicUser.candidate.DETAIL1} className="twm-view-prifile site-text-primary">View Profile</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    {/*Block Five*/}
                                    <div className="twm-candidates-list-style1">
                                        <div className="twm-media">
                                            <div className="twm-media-pic">
                                                <JobZImage src="images/Candidt/pic5.jpg" alt="#" />
                                            </div>
                                            <div className="twm-candidates-tag"><span>Featured</span></div>
                                        </div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.candidate.DETAIL1} className="twm-job-title">
                                                <h4>Randall Warren</h4>
                                            </NavLink>
                                            <p>M.A. in History, B.Ed.</p>
                                            <div className="twm-fot-content">
                                                <div className="twm-left-info">
                                                    <p className="twm-candidate-address"><i className="feather-map-pin" />New York</p>
                                                    {/* <div className="twm-jobs-vacancies">$95<span>/ Day</span></div> */}
                                                </div>
                                                <div className="twm-right-btn">
                                                    <NavLink to={publicUser.candidate.DETAIL1} className="twm-view-prifile site-text-primary">View Profile</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    {/*Block Six*/}
                                    <div className="twm-candidates-list-style1">
                                        <div className="twm-media">
                                            <div className="twm-media-pic">
                                                <JobZImage src="images/Candidt/pic6.jpg" alt="#" />
                                            </div>
                                            <div className="twm-candidates-tag"><span>Featured</span></div>
                                        </div>
                                        <div className="twm-mid-content">
                                            <NavLink to={publicUser.candidate.DETAIL1} className="twm-job-title">
                                                <h4>Christina Fischer </h4>
                                            </NavLink>
                                            <p>B.Tech. in Computer Science</p>
                                            <div className="twm-fot-content">
                                                <div className="twm-left-info">
                                                    <p className="twm-candidate-address"><i className="feather-map-pin" />New York</p>
                                                    {/* <div className="twm-jobs-vacancies">$19<span>/ Hour</span></div> */}
                                                </div>
                                                <div className="twm-right-btn">
                                                    <NavLink to={publicUser.candidate.DETAIL1} className="twm-view-prifile site-text-primary">View Profile</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center m-b30">
                                <NavLink to={publicUser.candidate.LIST} className=" site-button">All  Candidates</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <SectionJobCategories />
        </>
    )
}

export default Home3Page;