import processLogin from "../../form-processing/login";
import { formType } from "../../../globals/constants";
import { useNavigate } from "react-router-dom";
import { canRoute, candidate, empRoute, employer } from "../../../globals/route-names";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignInPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('candidate');
    const [canusername, setCanUsername] = useState('School/Parent');
    const [empusername, setEmpUsername] = useState('Teacher/Tutor');
    const [password, setPassword] = useState('12345');
    const [rememberMe, setRememberMe] = useState(false);

    const handleCandidateLogin = (event) => {
        event.preventDefault();
        loginCandidate();
    }

    const handleEmployerLogin = (event) => {
        event.preventDefault();
        loginEmployer();
    }

    const loginCandidate = () => {
        processLogin(
            {
                type: formType.LOGIN_CANDIDATE,
                username: canusername,
                password: password
            },
            (valid) => {
                if (valid) {
                    moveToCandidate();
                } else {
                    // show error
                    console.log('error');
                }
            }
        );
    }

    const loginEmployer = () => {
        processLogin(
            {
                type: formType.LOGIN_EMPLOYER,
                username: empusername,
                password: password
            },
            (valid) => {
                if (valid) {
                    moveToEmployer();
                } else {
                    // show error
                    console.log('error');
                }
            }
        );
    }

    const moveToCandidate = () => {
        navigate(canRoute(candidate.DASHBOARD));
    }

    const moveToEmployer = () => {
        navigate(empRoute(employer.DASHBOARD));
    }

    return (
        <div className="page-content bg-white">
            {/* Login Section */}
            <div className="content-block">
                <div className="section-full bg-white p-t50 p-b50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <div className="sign-in-page">
                                    <div className="twm-tabs-style-2">
                                        <ul className="nav nav-tabs" id="myTab2" role="tablist">
                                            {/* Login Candidate */}
                                            <li className="nav-item">
                                                <button 
                                                    className={`nav-link ${activeTab === 'candidate' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('candidate')}
                                                    type="button"
                                                >
                                                    <i className="fas fa-user-tie"></i>School/Parents
                                                </button>
                                            </li>
                                            {/* Login Employer */}
                                            <li className="nav-item">
                                                <button 
                                                    className={`nav-link ${activeTab === 'employer' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('employer')}
                                                    type="button"
                                                >
                                                    <i className="fas fa-building"></i>Teacher/Tutor
                                                </button>
                                            </li>
                                        </ul>
                                        
                                        <div className="tab-content mt-5" id="myTab2Content">
                                            {/* Login Candidate Content */}
                                            {activeTab === 'candidate' && (
                                                <form onSubmit={handleCandidateLogin} className="tab-pane fade show active">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-3">
                                                                <input 
                                                                    name="username"
                                                                    type="text"
                                                                    required
                                                                    className="form-control"
                                                                    placeholder="Username*"
                                                                    value={canusername}
                                                                    onChange={(event) => {
                                                                        setCanUsername(event.target.value);
                                                                    }} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-3">
                                                                <input
                                                                    name="password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    required
                                                                    placeholder="Password*"
                                                                    value={password}
                                                                    onChange={(event) => {
                                                                        setPassword(event.target.value);
                                                                    }} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-3">
                                                                <div className="form-check">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="form-check-input" 
                                                                        id="rememberCandidate" 
                                                                        checked={rememberMe}
                                                                        onChange={(e) => setRememberMe(e.target.checked)}
                                                                    />
                                                                    <label className="form-check-label rem-forgot" htmlFor="rememberCandidate">
                                                                        Remember me <Link to="/forgot-password">Forgot Password</Link>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <button type="submit" className="site-button">
                                                                Log in
                                                            </button>
                                                            <div className="mt-3 mb-3">
                                                                Don't have an account?
                                                                <Link to="/sign-up" className="twm-backto-login ms-1">Sign Up</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                            
                                            {/* Login Employer Content */}
                                            {activeTab === 'employer' && (
                                                <form onSubmit={handleEmployerLogin} className="tab-pane fade show active">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-3">
                                                                <input
                                                                    name="username"
                                                                    type="text"
                                                                    required
                                                                    className="form-control"
                                                                    placeholder="Username*"
                                                                    value={empusername}
                                                                    onChange={(event) => {
                                                                        setEmpUsername(event.target.value);
                                                                    }} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-3">
                                                                <input
                                                                    name="password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    required
                                                                    placeholder="Password*"
                                                                    value={password}
                                                                    onChange={(event) => {
                                                                        setPassword(event.target.value);
                                                                    }} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-3">
                                                                <div className="form-check">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="form-check-input" 
                                                                        id="rememberEmployer" 
                                                                        checked={rememberMe}
                                                                        onChange={(e) => setRememberMe(e.target.checked)}
                                                                    />
                                                                    <label className="form-check-label rem-forgot" htmlFor="rememberEmployer">
                                                                        Remember me <Link to="/forgot-password">Forgot Password</Link>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <button type="submit" className="site-button">
                                                                Log in
                                                            </button>
                                                            <div className="mt-3 mb-3">
                                                                Don't have an account?
                                                                <Link to="/sign-up" className="twm-backto-login ms-1">Sign Up</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-5 text-center">
                                        <span className="modal-f-title">Login or Sign up with</span>
                                        <ul className="twm-modal-social mt-3">
                                            <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                                            <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                                            <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                                            <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Login Section END */}
            <style>{`
            .sign-in-page {
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    margin: 50px 0;
}

.nav-tabs {
    border-bottom: 2px solid #dee2e6;
    justify-content: center;
}

.nav-tabs .nav-link {
    border: none;
    padding: 15px 25px;
    font-weight: 600;
    color: #6c757d;
    background: transparent;
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav-tabs .nav-link.active {
    color: #2e55fa;
    background-color: transparent;
    border: none;
    border-bottom: 3px solid #2e55fa;
}

.nav-tabs .nav-link:hover {
    border: none;
    border-bottom: 3px solid #2e55fa;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-control {
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e4e4e4;
}

.site-button {
    background: #2e55fa;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    width: 100%;
    font-weight: 600;
    transition: all 0.3s;
}

.site-button:hover {
    background: #1a3fd8;
    color: white;
}

.rem-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.twm-backto-login {
    color: #2e55fa;
    text-decoration: none;
    font-weight: 600;
    background: none;
    border: none;
    padding: 0;
}

.twm-backto-login:hover {
    text-decoration: underline;
}

.twm-modal-social {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 15px;
}

.twm-modal-social li a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    color: white;
    font-size: 18px;
    transition: all 0.3s;
}

.facebook-clr {
    background: #3b5998;
}

.twitter-clr {
    background: #1da1f2;
}

.linkedin-clr {
    background: #0077b5;
}

.google-clr {
    background: #db4a39;
}

.twm-modal-social li a:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.modal-f-title {
    font-weight: 600;
    color: #6c757d;
}
            `}</style>
        </div>
    );
}

export default SignInPage;