import { publicUrlFor } from "../../../globals/constants";
import JobZImage from "../jobz-img";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";

function Footer() {
    return (
        <>
            <footer className="footer-dark" style={{
  backgroundImage: `
    linear-gradient(
      180deg,
      rgba(8, 99, 85, 0.6) 0%,
      rgba(6, 57, 50, 0.6) 100%
    ),
    url(${publicUrlFor("images/Eduno-Footer-bg.jpg")})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center"
}}>

                <div className="container">
                    {/* NEWS LETTER SECTION START */}
                    <div className="ftr-nw-content">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="ftr-nw-title">
                                    Join our email subscription now to get updates
                                    on new jobs and notifications.
                                </div>
                            </div>
                            <div className="col-md-7">
                                <form>
                                    <div className="ftr-nw-form">
                                        <input name="news-letter" className="form-control" placeholder="Enter Your Email" type="text" />
                                        <button className="ftr-nw-subcribe-btn">Subscribe Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* NEWS LETTER SECTION END */}
                    {/* FOOTER BLOCKES START */}
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-lg-3 col-md-12">
                                <div className="widget widget_about">
                                    <div className="logo-footer clearfix">
                                        <NavLink to={publicUser.HOME3}>
                                            <img src="assets/images/Eduno logo.png" className="logo-img"/>
                                        <h3 className='nav-text-ed'>EduNomad Connect</h3>
                                        </NavLink>
                                    </div>
                                    <p>Empowering educators and connecting learning communities across the globe.</p>
                                    <ul className="ftr-list">
                                        <li><p><span>Address :</span>65 Sunset CA 90026, USA </p></li>
                                        <li><p><span>Email :</span>example@max.com</p></li>
                                        <li><p><span>Call :</span>555-555-1234</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title">For Educators</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.pages.LOGIN}>Jobs</NavLink></li>
                                                <li><NavLink to={publicUser.candidate.GRID}>Apply </NavLink></li>
                                                <li><NavLink to={publicUser.blog.LIST}> Teachers</NavLink></li>
                                                {/* <li><NavLink to={publicUser.blog.DETAIL}>FAQs</NavLink></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title">For Institutes & Parents</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.blog.GRID1}> Add Vacancy</NavLink></li>
                                                <li><NavLink to={publicUser.pages.CONTACT}>Apllicants</NavLink></li>
                                                <li><NavLink to={publicUser.jobs.LIST}>Request</NavLink></li>
                                                {/* <li><NavLink to={publicUser.jobs.DETAIL1}>Contact Us</NavLink></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title">Quick Links</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.pages.FAQ}>Home</NavLink></li>
                                                <li><NavLink to={publicUser.pages.LOGIN}>About</NavLink></li>
                                                {/* <li><NavLink to={publicUser.pages.ERROR404}> Jobs</NavLink></li> */}
                                                <li><NavLink to={publicUser.pages.PRICING}>Contact</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title">Quick Links</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.HOME3}>Home</NavLink></li>
                                                <li><NavLink to={publicUser.pages.ABOUT}>About us</NavLink></li>
                                                <li><NavLink to={publicUser.jobs.GRID}>Jobs</NavLink></li>
                                                <li><NavLink to={publicUser.employer.LIST}>Teachers</NavLink></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* FOOTER COPYRIGHT */}
                    <div className="footer-bottom">
                        <div className="footer-bottom-info">
                            <div className="footer-copy-right">
                                <span className="copyrights-text">Copyright © 2023 by thewebmax All Rights Reserved.</span>
                            </div>
                            <ul className="social-icons">
                                <li><a href="https://www.facebook.com/" className="fab fa-facebook-f" /></li>
                                <li><a href="https://www.twitter.com/" className="fab fa-twitter" /></li>
                                <li><a href="https://www.instagram.com/" className="fab fa-instagram" /></li>
                                <li><a href="https://www.youtube.com/" className="fab fa-youtube" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;