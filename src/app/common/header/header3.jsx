import { NavLink } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";
import { useState } from "react";

function Header3({ _config }) {
    const [menuActive, setMenuActive] = useState(false);

    function handleNavigationClick() {
        setMenuActive(!menuActive);
    }

    return (
        <>
            <header className={"site-header " + _config.style + " mobile-sider-drawer-menu " + (menuActive ? "active" : "")}>
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar">
                        <div className="container-fluid clearfix">
                            <div className="logo-header">
                                <div className="logo-header-inner logo-header-one">
                                    <NavLink to={publicUser.HOME3} className='logo-flex'>
                                        <img src="assets/images/Eduno logo.png" className="logo-img"/>
                                        <h3 className='nav-text-ed'>EduNomad Connect</h3>
                                    </NavLink>
                                </div>
                            </div>
                            {/* NAV Toggle Button */}
                            <button id="mobile-side-drawer"
                                data-target=".header-nav"
                                data-toggle="collapse"
                                type="button"
                                className="navbar-toggler collapsed"
                                onClick={handleNavigationClick}
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar icon-bar-first" />
                                <span className="icon-bar icon-bar-two" />
                                <span className="icon-bar icon-bar-three" />
                            </button>
                            {/* MAIN Vav */}
                            <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                                <ul className=" nav navbar-nav">
                                    <li className="has-mega-menu"><a href="/">Home</a></li>
                                    <li className="has-child"><a href="/job-grid">Jobs</a></li>
                                    <li className="has-child"><a href="/emp-list">Teachers</a> </li>
                                    <li className="has-child"><a href="/about-us">About Us</a></li>
                                    <li className="has-child"><a href="/apply-job">Apply Job</a></li>
                                    <li className="has-child"><a href="/contact-us">Contact Us</a></li>
                                </ul>
                            </div>
                            {/* Header Right Section*/}
                            <div className="extra-nav header-2-nav">
                                <div className="extra-cell">
                                    <div className="header-search">
                                        <a href="#search" className="header-search-icon"><i className="feather-search" /></a>
                                    </div>
                                </div>
                                {/* <div className="extra-cell">
                                    <div className="header-nav-btn-section">
                                        <div className="twm-nav-btn-left">
                                            <NavLink to="/sign-up" className="twm-nav-sign-up">
                                                <i className="feather-log-in" /> Sign Up
                                            </NavLink>
                                        </div>
                                        <div className="twm-nav-btn-right">
                                            <NavLink to="/login" className="twm-nav-post-a-job">
                                                <i className="feather-log-in" /> Sign In
                                            </NavLink>
                                        </div>
                                    </div>
                                </div> */}

                                 <div className="extra-cell">
                                    <div className="header-nav-btn-section">
                                        <div className="twm-nav-btn-left">
                                            <a className="twm-nav-sign-up" data-bs-toggle="modal" href="#sign_up_popup" role="button">
                                                <i className="feather-log-in" /> Sign Up
                                            </a>
                                        </div>
                                          <div className="twm-nav-btn-right">
                                            <NavLink to="/login" className="twm-nav-post-a-job">
                                                <i className="feather-log-in" /> Sign In
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SITE Search */}
                    <div id="search">
                        <span className="close" />
                        <form role="search" id="searchform" action="/search" method="get" className="radius-xl">
                            <input className="form-control" name="q" type="search" placeholder="Type to search" />
                            <span className="input-group-append">
                                <button type="button" className="search-btn">
                                    <i className="fa fa-paper-plane" />
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header3;