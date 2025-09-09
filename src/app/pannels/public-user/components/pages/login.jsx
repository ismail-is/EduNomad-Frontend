import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { canRoute, candidate, empRoute, employer, publicUser } from "../../../../../globals/route-names";
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const [candidateEmail, setCandidateEmail] = useState('');
    const [employerEmail, setEmployerEmail] = useState('');
    const [candidatePassword, setCandidatePassword] = useState('');
    const [employerPassword, setEmployerPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState({ candidate: false, employer: false });
    const [showCandidatePassword, setShowCandidatePassword] = useState(false);
    const [showEmployerPassword, setShowEmployerPassword] = useState(false);

    const handleCandidateLogin = async (event) => {
        event.preventDefault();
        setIsLoading({ ...isLoading, candidate: true });
        setError('');
        
        try {
            const response = await fetch('http://localhost:7001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: candidateEmail,
                    password: candidatePassword
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on user role
                if (data.user.role === 'school' || data.user.role === 'parent') {
                    navigate(canRoute(candidate.DASHBOARD));
                } else if (data.user.role === 'teacher' || data.user.role === 'tutor') {
                    navigate(empRoute(employer.DASHBOARD));
                } else {
                    // Default redirect for other roles
                    navigate(publicUser.HOME1);
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please try again later.');
        } finally {
            setIsLoading({ ...isLoading, candidate: false });
        }
    }

    const handleEmployerLogin = async (event) => {
        event.preventDefault();
        setIsLoading({ ...isLoading, employer: true });
        setError('');
        
        try {
            const response = await fetch('http://localhost:7001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: employerEmail,
                    password: employerPassword
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on user role
                if (data.user.role === 'school' || data.user.role === 'parent') {
                    navigate(canRoute(candidate.DASHBOARD));
                } else if (data.user.role === 'teacher' || data.user.role === 'tutor') {
                    navigate(empRoute(employer.DASHBOARD));
                } else {
                    // Default redirect for other roles
                    navigate(publicUser.HOME1);
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please try again later.');
        } finally {
            setIsLoading({ ...isLoading, employer: false });
        }
    }

    return (
        <>
            <div className="section-full site-bg-white">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-lg-6 col-md-5 twm-log-reg-media-wrap">
                            <div className="twm-log-reg-media">
                                <div className="twm-l-media">
                                    <JobZImage src="images/login-bg.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-7">
                            <div className="twm-log-reg-form-wrap">
                                <div className="twm-log-reg-logo-head">
                                    <NavLink to={publicUser.HOME1}>
                                         <img src="assets/images/Eduno logo.png" className="logo-img"/>
                                        <h3 className='nav-text-ed'>EduNomad Connect</h3>
                                    </NavLink>
                                </div>
                                <div className="twm-log-reg-inner">
                                    <div className="twm-log-reg-head">
                                        <div className="twm-log-reg-logo">
                                            <span className="log-reg-form-title">Log In</span>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <div className="twm-tabs-style-2">
                                        <div className="tab-content" id="myTab2Content">
                                            {/*Login Candidate Content*/}
                                            <form onSubmit={handleCandidateLogin} className="tab-pane fade show active" id="twm-login-candidate">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3">
                                                            <input 
                                                                name="email"
                                                                type="email"
                                                                required
                                                                className="form-control"
                                                                placeholder="Email*"
                                                                value={candidateEmail}
                                                                onChange={(event) => {
                                                                    setCandidateEmail(event.target.value);
                                                                }} 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3 password-input-container">
                                                            <input
                                                                name="password"
                                                                type={showCandidatePassword ? "text" : "password"}
                                                                className="form-control"
                                                                required
                                                                placeholder="Password*"
                                                                value={candidatePassword}
                                                                onChange={(event) => {
                                                                    setCandidatePassword(event.target.value);
                                                                }} 
                                                            />
                                                            <span 
                                                                className="password-toggle-icon"
                                                                onClick={() => setShowCandidatePassword(!showCandidatePassword)}
                                                            >
                                                                {showCandidatePassword ? (
                                                                    <i className="fas fa-eye-slash"></i>
                                                                ) : (
                                                                    <i className="fas fa-eye"></i>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="twm-forgot-wrap">
                                                            <div className="form-group mb-3">
                                                                <div className="form-check">
                                                                    <label className="form-check-label rem-forgot" htmlFor="Password4"><a href="#" className="site-text-primary">Forgot Password</a></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <button 
                                                                type="submit" 
                                                                className="site-button"
                                                                disabled={isLoading.candidate}
                                                            >
                                                                {isLoading.candidate ? 'Logging in...' : 'Log in'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            {/*Login Employer Content*/}
                                            <form onSubmit={handleEmployerLogin} className="tab-pane fade" id="twm-login-Employer">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3">
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                required
                                                                className="form-control"
                                                                placeholder="Email*"
                                                                value={employerEmail}
                                                                onChange={(event) => {
                                                                    setEmployerEmail(event.target.value);
                                                                }} 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3 password-input-container">
                                                            <input
                                                                name="password"
                                                                type={showEmployerPassword ? "text" : "password"}
                                                                className="form-control"
                                                                required
                                                                placeholder="Password*"
                                                                value={employerPassword}
                                                                onChange={(event) => {
                                                                    setEmployerPassword(event.target.value);
                                                                }} 
                                                            />
                                                            <span 
                                                                className="password-toggle-icon"
                                                                onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                                                            >
                                                                {showEmployerPassword ? (
                                                                    <i className="fas fa-eye-slash"></i>
                                                                ) : (
                                                                    <i className="fas fa-eye"></i>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="twm-forgot-wrap">
                                                            <div className="form-group mb-3">
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" id="Password5" />
                                                                    <label className="form-check-label rem-forgot" htmlFor="Password5">Remember me <a href="#" className="site-text-primary">Forgot Password</a></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <button 
                                                                type="submit" 
                                                                className="site-button"
                                                                disabled={isLoading.employer}
                                                            >
                                                                {isLoading.employer ? 'Logging in...' : 'Log in'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                .password-input-container {
                    position: relative;
                }
                
                .password-toggle-icon {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #777;
                }
                
                .password-toggle-icon:hover {
                    color: #333;
                }
                `}
            </style>
        </>
    )
}

export default LoginPage;