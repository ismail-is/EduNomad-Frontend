import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuthRedirect() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Extract token and user data from URL parameters
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const userData = {
            id: urlParams.get('userId'),
            email: urlParams.get('email'),
            username: urlParams.get('username'),
            role: urlParams.get('role')
        };

        if (token && userData.id) {
            // Send message to opener window
            if (window.opener) {
                window.opener.postMessage({
                    type: 'GOOGLE_OAUTH_SUCCESS',
                    token,
                    user: userData,
                    requiresRoleCompletion: !userData.role || userData.role === 'parent' // Example condition
                }, '*'); // Use specific origin in production

                // Close the popup
                window.close();
            } else {
                // If no opener, handle directly
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/dashboard');
            }
        } else {
            // Handle error
            if (window.opener) {
                window.opener.postMessage({
                    type: 'GOOGLE_OAUTH_ERROR',
                    message: 'Authentication failed'
                }, '*');
                window.close();
            } else {
                navigate('/login', { state: { error: 'Authentication failed' } });
            }
        }
    }, [location, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Completing authentication...</p>
            </div>
        </div>
    );
}

export default OAuthRedirect;