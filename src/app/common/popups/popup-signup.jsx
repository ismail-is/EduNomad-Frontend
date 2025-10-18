import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

function SignUpPopup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        agree: false,
        role: 'school'
    });
    
    const [activeTab, setActiveTab] = useState('sign-candidate');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        if (errorMessage) setErrorMessage('');
    };

    const handleRoleChange = (role) => {
        setFormData(prev => ({
            ...prev,
            role: role
        }));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        
        if (tab === 'sign-candidate') {
            handleRoleChange('school');
        } else {
            handleRoleChange('teacher');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        setErrorMessage('');

        try {
            // Open Google OAuth in new window or redirect
            const width = 600;
            const height = 600;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            const popup = window.open(
                'http://localhost:7001/api/auth/google',
                'Google Login',
                `width=${width},height=${height},left=${left},top=${top}`
            );

            // Listen for message from popup
            const messageHandler = (event) => {
                if (event.origin !== 'http://localhost:7001') return;

                if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
                    const { token, user, requiresRoleCompletion } = event.data;
                    
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    // Close popup
                    if (popup) popup.close();

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
                        
                        const modal = document.getElementById('sign_up_popup');
                        const modalInstance = bootstrap.Modal.getInstance(modal);
                        if (modalInstance) {
                            modalInstance.hide();
                        }

                        // Redirect based on role
                        if (user.role === 'school' || user.role === 'parent') {
                            navigate('/school-dashboard');
                        } else if (user.role === 'teacher' || user.role === 'tutor') {
                            navigate('/teacher-dashboard');
                        } else {
                            navigate('/dashboard');
                        }
                    }

                    window.removeEventListener('message', messageHandler);
                }

                if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
                    setErrorMessage(event.data.message);
                    if (popup) popup.close();
                    window.removeEventListener('message', messageHandler);
                }
            };

            window.addEventListener('message', messageHandler);

            // Check if popup is closed without success
            const checkPopup = setInterval(() => {
                if (popup && popup.closed) {
                    clearInterval(checkPopup);
                    setIsGoogleLoading(false);
                    window.removeEventListener('message', messageHandler);
                }
            }, 500);

        } catch (error) {
            console.error('Google login error:', error);
            setErrorMessage('Google login failed. Please try again.');
            setIsGoogleLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        if (!formData.agree) {
            setErrorMessage('You must agree to the terms and conditions');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:7001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            const data = await response.json();

            alert('Sign up successful! Please login to continue.');
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            const modal = document.getElementById('sign_up_popup');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
            
            navigate('/login');
            
            setFormData({
                username: '',
                password: '',
                email: '',
                phone: '',
                agree: false,
                role: 'school'
            });
        } catch (error) {
            console.error('Sign up error:', error);
            if (error.message.includes('Failed to fetch')) {
                setErrorMessage('Cannot connect to the server. Please check if the server is running on port 7001.');
            } else {
                setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal fade twm-sign-up" id="sign_up_popup" aria-hidden="true" aria-labelledby="sign_up_popupLabel" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h2 className="modal-title" id="sign_up_popupLabel">Sign Up</h2>
                            <p>Sign Up and get access to all the features of EduNomad Connect</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    {errorMessage}
                                </div>
                            )}
                            
                            {/* Google Sign In Button */}
                            {/* <div className="mb-4">
                                <button 
                                    type="button"
                                    className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center"
                                    onClick={handleGoogleLogin}
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
                            </div> */}

                            {/* <div className="position-relative text-center mb-4">
                                <hr />
                                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                                    Or continue with
                                </span>
                            </div> */}

                            <div className="twm-tabs-style-2">
                                {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button 
                                            className={`nav-link ${activeTab === 'sign-candidate' ? 'active' : ''}`} 
                                            onClick={() => handleTabChange('sign-candidate')}
                                            type="button"
                                        >
                                            <i className="fas fa-user-tie me-2"></i>School/Parent
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button 
                                            className={`nav-link ${activeTab === 'sign-Employer' ? 'active' : ''}`} 
                                            onClick={() => handleTabChange('sign-Employer')}
                                            type="button"
                                        >
                                            <i className="fas fa-building me-2"></i>Teacher/Tutor
                                        </button>
                                    </li>
                                </ul> */}
                                <div className="tab-content" id="myTabContent">
                                    {/* School/Parent Signup */}
                                    <div className={`tab-pane fade ${activeTab === 'sign-candidate' ? 'show active' : ''}`} id="sign-candidate">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="role-candidate" className="form-label">I am a*</label>
                                                    <select 
                                                        className="form-select"
                                                        value={formData.role}
                                                        onChange={(e) => handleRoleChange(e.target.value)}
                                                    >
                                                        <option value="school">School</option>
                                                        <option value="parent">Parent</option>
                                                        <option value="teacher">Teacher</option>
                                                        <option value="tutor">Tutor</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="username" 
                                                        type="text" 
                                                        required 
                                                        className="form-control" 
                                                        placeholder="Username*" 
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3 position-relative">
                                                    <input 
                                                        name="password" 
                                                        type={showPassword ? "text" : "password"} 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Password*" 
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                    <button 
                                                        type="button"
                                                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2"
                                                        onClick={togglePasswordVisibility}
                                                        style={{zIndex: 5, border: 'none', background: 'transparent'}}
                                                    >
                                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="email" 
                                                        type="email" 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Email*" 
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="phone" 
                                                        type="tel" 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Phone*" 
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <div className="form-check">
                                                        <input 
                                                            type="checkbox" 
                                                            className="form-check-input" 
                                                            id="agree1" 
                                                            name="agree"
                                                            checked={formData.agree}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-check-label" htmlFor="agree1">
                                                            I agree to the <a href="#">Terms and conditions</a>
                                                        </label>
                                                        <p className="mt-2">Already registered?
                                                             <a href='login'  
                                                                className="twm-backto-login" 
                                                                data-bs-target="#sign_up_popup2" 
                                                                // data-bs-toggle="modal" 
                                                                // data-bs-dismiss="modal"
                                                                 onClick={() => navigate("/login")}
                                                            >
                                                                Log in here
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary w-100 py-2"
                                                    disabled={isSubmitting || !formData.agree}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Signing Up...
                                                        </>
                                                    ) : 'Sign Up'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Teacher/Tutor Signup */}
                                    <div className={`tab-pane fade ${activeTab === 'sign-Employer' ? 'show active' : ''}`} id="sign-Employer">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="role-employer" className="form-label">I am a*</label>
                                                    <select 
                                                        className="form-select"
                                                        value={formData.role}
                                                        onChange={(e) => handleRoleChange(e.target.value)}
                                                    >
                                                        <option value="teacher">Teacher</option>
                                                        <option value="tutor">Tutor</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="username" 
                                                        type="text" 
                                                        required 
                                                        className="form-control" 
                                                        placeholder="Username*" 
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3 position-relative">
                                                    <input 
                                                        name="password" 
                                                        type={showPassword ? "text" : "password"} 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Password*" 
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                    <button 
                                                        type="button"
                                                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2"
                                                        onClick={togglePasswordVisibility}
                                                        style={{zIndex: 5, border: 'none', background: 'transparent'}}
                                                    >
                                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="email" 
                                                        type="email" 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Email*" 
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="phone" 
                                                        type="tel" 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Phone*" 
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <div className="form-check">
                                                        <input 
                                                            type="checkbox" 
                                                            className="form-check-input" 
                                                            id="agree2" 
                                                            name="agree"
                                                            checked={formData.agree}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-check-label" htmlFor="agree2">
                                                            I agree to the <a href="#">Terms and conditions</a>
                                                        </label>
                                                        <p className="mt-2">Already registered?
                                                            <button 
                                                                className="twm-backto-login" 
                                                                data-bs-target="#sign_up_popup2" 
                                                                data-bs-toggle="modal" 
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Log in here
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary w-100 py-2"
                                                    disabled={isSubmitting || !formData.agree}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Signing Up...
                                                        </>
                                                    ) : 'Sign Up'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPopup;