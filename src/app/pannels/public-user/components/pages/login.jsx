import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { canRoute, candidate, empRoute, employer, publicUser } from "../../../../../globals/route-names";
import { useState, useEffect } from "react";

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
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    // Handle Google OAuth message from popup
    useEffect(() => {
        const handleMessage = (event) => {
            // For security, you might want to check the origin
            // if (event.origin !== 'http://localhost:7001') return;

            if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
                const { token, user, requiresRoleCompletion } = event.data;
                
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setIsGoogleLoading(false);

                if (requiresRoleCompletion) {
                    // Redirect to role completion page
                    navigate('/', { 
                        state: { 
                            userId: user.id,
                            email: user.email,
                            username: user.username 
                        } 
                    });
                } else {
                    // Regular login success
                    alert('Login successful!');
                    
                    // Redirect based on user role
                    if (user.role === 'school' || user.role === 'parent') {
                        navigate(canRoute(candidate.DASHBOARD));
                    } else if (user.role === 'teacher' || user.role === 'tutor') {
                        navigate(empRoute(employer.DASHBOARD));
                    } else {
                        navigate(publicUser.HOME1);
                    }
                }
            }

            if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
                setError(event.data.message);
                setIsGoogleLoading(false);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

    const handleGoogleLogin = async (userType = 'candidate') => {
        setIsGoogleLoading(true);
        setError('');

        try {
            // Open Google OAuth in new window
            const width = 600;
            const height = 600;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            const popup = window.open(
                'http://localhost:7001/api/auth/google',
                'Google Login',
                `width=${width},height=${height},left=${left},top=${top}`
            );

            // Check if popup is closed without success
            const checkPopup = setInterval(() => {
                if (popup && popup.closed) {
                    clearInterval(checkPopup);
                    setIsGoogleLoading(false);
                }
            }, 500);

        } catch (error) {
            console.error('Google login error:', error);
            setError('Google login failed. Please try again.');
            setIsGoogleLoading(false);
        }
    };

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
                                    
                                    {/* Google Login Button */}
                                    <div className="mb-4">
                                        <button 
                                            type="button"
                                            className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center"
                                            onClick={() => handleGoogleLogin('candidate')}
                                            disabled={isGoogleLoading}
                                        >
                                            {isGoogleLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    Connecting...
                                                </>
                                            ) : (
                                                <>
                                                    <img 
                                                        src="https://developers.google.com/identity/images/g-logo.png" 
                                                        alt="Google" 
                                                        style={{ width: '18px', height: '18px', marginRight: '10px' }}
                                                    />
                                                    Continue with Google
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* <div className="position-relative text-center mb-4">
                                        <hr />
                                        <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                                            Or continue with email
                                        </span>
                                    </div> */}

                                    {/* <div className="twm-tabs-style-2">
                                        <div className="tab-content" id="myTab2Content">
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
                                    </div> */}
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

                .btn-outline-danger {
                    border-color: #db4437;
                    color: #db4437;
                }

                .btn-outline-danger:hover {
                    background-color: #db4437;
                    color: white;
                }
                `}
            </style>
        </>
    )
}

export default LoginPage;