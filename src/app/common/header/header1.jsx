import { NavLink } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";
import { useState, useEffect } from "react";

function Header1({ _config }) {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ 
        name: 'John Doe', 
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567'
    });
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in (example using localStorage)
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
        
        // Initialize Bootstrap tooltips
        if (typeof window !== 'undefined') {
            const bootstrap = require('bootstrap');
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }, []);

    function handleNavigationClick() {
        setMenuActive(!menuActive);
    }

    const handleLogout = () => {
        // Clear user data from storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser({ name: '', email: '', phone: '' });
        setProfileDropdownOpen(false);
        // Optional: redirect to home page
        window.location.href = '/';
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

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
                            {/* MAIN Nav */}
                            <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                                <ul className=" nav navbar-nav">
                                    <li className="has-mega-menu"><a href="/">Home</a></li>
                                    <li className="has-child"><a href="/about-us">About Us</a></li>
                                    <li className="has-child"><a href="/inst-portal">Post Job</a></li>
                                    <li className="has-child"><a href="/contact-us">Contact Us</a></li>
                                </ul>
                            </div>
                            {/* Header Right Section*/}
                            <div className="extra-nav header-2-nav">
                                {isLoggedIn ? (
                                    <div className="extra-cell">
                                        <div className="header-nav-btn-section">
                                            <div className="user-profile-dropdown">
                                                <div className="dropdown">
                                                    <button 
                                                        className="btn dropdown-toggle user-dropdown-btn" 
                                                        type="button" 
                                                        id="userDropdown"
                                                        onClick={toggleProfileDropdown}
                                                    >
                                                        <img 
                                                            src="https://ui-avatars.com/api/?name=John+Doe&background=3b5d50&color=fff" 
                                                            alt="User" 
                                                            className="user-avatar"
                                                        />
                                                        <span className="user-name">{user.name}</span>
                                                    </button>
                                                    {profileDropdownOpen && (
                                                        <div className="dropdown-menu show" aria-labelledby="userDropdown">
                                                            <div className="dropdown-header">
                                                                <h6>User Profile</h6>
                                                                {/* <small>Full account details</small> */}
                                                            </div>
                                                            <div className="dropdown-body">
                                                                <div className="user-info-item">
                                                                    <i className="fas fa-user"></i>
                                                                    <span>{user.username}</span>
                                                                </div>
                                                                <div className="user-info-item">
                                                                    <i className="fas fa-envelope"></i>
                                                                    <span>{user.email}</span>
                                                                </div>
                                                                <div className="user-info-item">
                                                                    <i className="fas fa-phone"></i>
                                                                    <span>{user.phone}</span>
                                                                </div>
                                                            </div>
                                                            <div className="dropdown-footer">
                                                                <button onClick={handleLogout} className="logout-btn">
                                                                    <i className="fas fa-sign-out-alt"></i> Logout
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="extra-cell">
                                        <div className="header-nav-btn-section">
                                            <div className="twm-nav-btn-left">
                                                <a className="twm-nav-sign-up" data-bs-toggle="modal" href="#sign_up_popup" role="button">
                                                    <i className="feather-log-in"></i> Sign Up
                                                </a>
                                            </div>
                                            <div className="twm-nav-btn-right">
                                                <NavLink to="/login" className="twm-nav-post-a-job">
                                                    <i className="feather-log-in"></i> Sign In
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* SITE Search */}
                    <div id="search">
                        <span className="close"></span>
                        <form role="search" id="searchform" action="/search" method="get" className="radius-xl">
                            <input className="form-control" name="q" type="search" placeholder="Type to search" />
                            <span className="input-group-append">
                                <button type="button" className="search-btn">
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </header>

            <style jsx>{`
                .user-profile-dropdown {
                    position: relative;
                }
                
                .user-dropdown-btn {
                    background: none;
                    border: none;
                    display: flex;
                    align-items: center;
                    color: #2c3e50;
                    font-weight: 500;
                    cursor: pointer;
                    padding: 5px 10px;
                    border-radius: 5px;
                    transition: all 0.3s;
                }
                
                .user-dropdown-btn:hover {
                    background-color: #f8f9fa;
                }
                
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                    border: 2px solid #3b5d50;
                }
                
                .dropdown-menu {
                    width: 300px;
                    padding: 0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                    border: none;
                    position: absolute;
                    right: 0;
                    top: 100%;
                    z-index: 1000;
                    background: white;
                }
                
                .dropdown-header {
                    background-color: #01E9E9;
                    color: white;
                    padding: 15px;
                }
                
                .dropdown-header h6 {
                    margin: 0;
                    font-weight: 600;
                }
                
                .dropdown-header small {
                    opacity: 0.8;
                }
                
                .dropdown-body {
                    padding: 15px;
                }
                
                .user-info-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                
                .user-info-item i {
                    width: 20px;
                    margin-right: 10px;
                    color: #BC84CA;
                }
                
                .dropdown-footer {
                    padding: 15px;
                    border-top: 1px solid #dee2e6;
                    text-align: center;
                }
                
                .logout-btn {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    transition: all 0.3s;
                }
                
                .logout-btn:hover {
                    background-color: #c82333;
                }
                
                @media (max-width: 768px) {
                    .dropdown-menu {
                        right: -50px;
                    }
                }
            `}</style>

            {/* Include Font Awesome for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        </>
    )
}

export default Header1;