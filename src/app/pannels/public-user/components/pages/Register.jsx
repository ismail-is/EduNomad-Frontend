import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        agree: false
    });
    
    const [activeTab, setActiveTab] = useState('sign-candidate');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll simulate an API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Sign up successful! Welcome to our platform.');
            
            // Close the modal
            const modal = document.getElementById('sign_up_popup');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            
            // Redirect to home page
            navigate('/');
            
            // Reset form
            setFormData({
                username: '',
                password: '',
                email: '',
                phone: '',
                agree: false
            });
        } catch (error) {
            alert('Sign up failed. Please try again.');
            console.error('Sign up error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal fade twm-sign-up" id="sign_up_popup" aria-hidden="true" aria-labelledby="sign_up_popupLabel" tabIndex={-1}>
<h1></h1>           
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h2 className="modal-title" id="sign_up_popupLabel">Sign Up</h2>
                            <p>Sign Up and get access to all the features of EduNomad Connect</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="twm-tabs-style-2">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button 
                                            className={`nav-link ${activeTab === 'sign-candidate' ? 'active' : ''}`} 
                                            onClick={() => setActiveTab('sign-candidate')}
                                            type="button"
                                        >
                                            <i className="fas fa-user-tie" />School/Parent
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button 
                                            className={`nav-link ${activeTab === 'sign-Employer' ? 'active' : ''}`} 
                                            onClick={() => setActiveTab('sign-Employer')}
                                            type="button"
                                        >
                                            <i className="fas fa-building" />Teacher/Tutor
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {/* School/Parent Signup */}
                                    <div className={`tab-pane fade ${activeTab === 'sign-candidate' ? 'show active' : ''}`} id="sign-candidate">
                                        <div className="row">
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
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="password" 
                                                        type="password" 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Password*" 
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
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
                                                        />
                                                        <label className="form-check-label" htmlFor="agree1">
                                                            I agree to the <a href="#">Terms and conditions</a>
                                                        </label>
                                                        <p>Already registered?
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
                                                    className="site-button" 
                                                    disabled={isSubmitting || !formData.agree}
                                                >
                                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Teacher/Tutor Signup */}
                                    <div className={`tab-pane fade ${activeTab === 'sign-Employer' ? 'show active' : ''}`} id="sign-Employer">
                                        <div className="row">
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
                                                <div className="form-group mb-3">
                                                    <input 
                                                        name="password" 
                                                        type="password" 
                                                        className="form-control" 
                                                        required 
                                                        placeholder="Password*" 
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
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
                                                        />
                                                        <label className="form-check-label" htmlFor="agree2">
                                                            I agree to the <a href="#">Terms and conditions</a>
                                                        </label>
                                                        <p>Already registered?
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
                                                    className="site-button" 
                                                    disabled={isSubmitting || !formData.agree}
                                                >
                                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <span className="modal-f-title">Login or Sign up with</span>
                            <ul className="twm-modal-social">
                                <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                                <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                                <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                                <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;