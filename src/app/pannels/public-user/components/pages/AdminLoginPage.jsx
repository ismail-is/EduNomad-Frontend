import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { publicUrlFor } from "../../../../../globals/constants";
import JobzImage from "../../../../common/jobz-img";
import { publicUser } from "../../../../../globals/route-names";

function AdminLoginPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (credentials.username === "admin" && credentials.password === "admin@123") {
            navigate("/candidate/dashboard");
        } else {
            setError("Invalid username or password. Please try again.");
        }
        setIsLoading(false);
    };

    // Inline styles
    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        loginCard: {
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            maxWidth: "1200px",
            width: "100%",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
        },
        leftPanel: {
            padding: "50px",
            background: "linear-gradient(45deg, #4f6beb, #3a56d6)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden"
        },
        rightPanel: {
            padding: "50px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        logo: {
            marginBottom: "30px",
            textAlign: "center"
        },
        title: {
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "15px",
            background: "linear-gradient(45deg, #4f6beb, #3a56d6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
        },
        subtitle: {
            color: "#6c757d",
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "1.1rem"
        },
        formGroup: {
            marginBottom: "25px",
            position: "relative"
        },
        label: {
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#495057",
            fontSize: "0.95rem"
        },
        input: {
            width: "100%",
            padding: "15px 20px",
            border: "2px solid #e9ecef",
            borderRadius: "12px",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            outline: "none",
            backgroundColor: "#f8f9fa"
        },
        inputFocus: {
            borderColor: "#4f6beb",
            backgroundColor: "white",
            boxShadow: "0 0 0 3px rgba(79, 107, 235, 0.1)"
        },
        button: {
            width: "100%",
            padding: "15px",
            background: "linear-gradient(45deg, #4f6beb, #3a56d6)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
        },
        buttonHover: {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 25px rgba(79, 107, 235, 0.3)"
        },
        buttonLoading: {
            opacity: "0.8",
            cursor: "not-allowed"
        },
        errorAlert: {
            backgroundColor: "#fee",
            border: "1px solid #f5c6cb",
            color: "#721c24",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "0.95rem",
            borderLeft: "4px solid #dc3545"
        },
        footer: {
            marginTop: "40px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            border: "1px solid #e9ecef"
        },
        credentials: {
            backgroundColor: "#e7f3ff",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#0066cc",
            marginBottom: "20px",
            border: "1px solid #b3d9ff"
        },
        socialIcons: {
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px"
        },
        socialIcon: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#4f6beb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textDecoration: "none",
            transition: "all 0.3s ease",
            fontSize: "1rem"
        },
        loadingSpinner: {
            display: "inline-block",
            width: "20px",
            height: "20px",
            border: "3px solid rgba(255,255,255,0.3)",
            borderRadius: "50%",
            borderTopColor: "white",
            animation: "spin 1s ease-in-out infinite"
        },
        imageContainer: {
            textAlign: "center",
            padding: "20px"
        },
        adminImage: {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
        }
    };

    return (
        <>
            <style>
                {`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .fade-in {
                    animation: fadeIn 0.6s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            
            <div className="section-full site-bg-gray twm-admin-login-area" style={styles.container}>
                <div className="twm-admin-login-wrap fade-in" style={styles.loginCard}>
                    <div className="row" style={{margin: 0}}>
                        <div className="col-lg-5 col-md-12" style={styles.leftPanel}>
                            <div className="twm-admin-login-content" style={{position: "relative", zIndex: 2}}>
                                <div className="media" style={styles.logo}>
                                    <NavLink to={publicUser.HOME1}>
                                        <JobzImage 
                                            id="skin_admin_logo" 
                                            src="assets/images/Eduno logo.png" 
                                            alt="" 
                                            style={{filter: "brightness(0) invert(1)"}}
                                        />
                                    </NavLink>
                                </div>
                                <h2 className="twm-admin-login-title" style={{color: "white", fontSize: "2.5rem", fontWeight: "700", marginBottom: "15px"}}>
                                    Admin <span style={{color: "#a8c6ff"}}>Dashboard</span>
                                </h2>
                                <p style={{color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", lineHeight: "1.6"}}>
                                    Access your admin panel to manage candidates, jobs, and platform settings with powerful tools and analytics.
                                </p>
                                
                                <div style={styles.imageContainer}>
                                    <JobzImage 
                                        src="images/admin-login.png" 
                                        alt="Admin Login" 
                                        style={styles.adminImage}
                                    />
                                </div>
                            </div>
                            <div style={{
                                position: "absolute",
                                top: "-50%",
                                right: "-50%",
                                width: "100%",
                                height: "200%",
                                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                                zIndex: 1
                            }}></div>
                        </div>
                        
                        <div className="col-lg-7 col-md-12" style={styles.rightPanel}>
                            <div className="twm-admin-login-content">
                                <h2 style={styles.title}>Admin <span>Login</span></h2>
                                <p style={styles.subtitle}>
                                    Please enter your credentials to access the admin panel
                                </p>
                                
                                {/* <div style={styles.credentials}>
                                    <strong>Default Credentials:</strong> admin / admin@123
                                </div> */}
                                
                                <form onSubmit={handleLogin} className="twm-admin-login-form">
                                    <div style={styles.formGroup}>
                                        <label htmlFor="username" style={styles.label}>Username</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="username"
                                            name="username"
                                            value={credentials.username}
                                            onChange={handleInputChange}
                                            placeholder="Enter your username"
                                            required
                                            style={{
                                                ...styles.input,
                                                ...(credentials.username ? styles.inputFocus : {})
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = "#4f6beb";
                                                e.target.style.backgroundColor = "white";
                                                e.target.style.boxShadow = "0 0 0 3px rgba(79, 107, 235, 0.1)";
                                            }}
                                            onBlur={(e) => {
                                                if (!credentials.username) {
                                                    e.target.style.borderColor = "#e9ecef";
                                                    e.target.style.backgroundColor = "#f8f9fa";
                                                    e.target.style.boxShadow = "none";
                                                }
                                            }}
                                        />
                                    </div>
                                    
                                    <div style={styles.formGroup}>
                                        <label htmlFor="password" style={styles.label}>Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter your password"
                                            required
                                            style={{
                                                ...styles.input,
                                                ...(credentials.password ? styles.inputFocus : {})
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = "#4f6beb";
                                                e.target.style.backgroundColor = "white";
                                                e.target.style.boxShadow = "0 0 0 3px rgba(79, 107, 235, 0.1)";
                                            }}
                                            onBlur={(e) => {
                                                if (!credentials.password) {
                                                    e.target.style.borderColor = "#e9ecef";
                                                    e.target.style.backgroundColor = "#f8f9fa";
                                                    e.target.style.boxShadow = "none";
                                                }
                                            }}
                                        />
                                    </div>
                                    
                                    {error && (
                                        <div style={styles.errorAlert} role="alert">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <button 
                                        type="submit" 
                                        style={{
                                            ...styles.button,
                                            ...(isLoading ? styles.buttonLoading : {})
                                        }}
                                        onMouseOver={(e) => {
                                            if (!isLoading) {
                                                e.target.style.transform = "translateY(-2px)";
                                                e.target.style.boxShadow = "0 10px 25px rgba(79, 107, 235, 0.3)";
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (!isLoading) {
                                                e.target.style.transform = "translateY(0)";
                                                e.target.style.boxShadow = "none";
                                            }
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <span style={styles.loadingSpinner}></span>
                                                <span style={{marginLeft: "10px"}}>Logging in...</span>
                                            </span>
                                        ) : (
                                            "Login to Dashboard"
                                        )}
                                    </button>
                                </form>
                                
                                {/* <div style={styles.footer}>
                                    <p style={{margin: 0, color: "#6c757d"}}>Secure Admin Access</p>
                                    <div style={styles.socialIcons}>
                                        <a 
                                            href="https://www.facebook.com/" 
                                            style={styles.socialIcon}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = "#3b5998";
                                                e.target.style.transform = "translateY(-3px)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = "#4f6beb";
                                                e.target.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a 
                                            href="https://www.twitter.com/" 
                                            style={styles.socialIcon}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = "#1da1f2";
                                                e.target.style.transform = "translateY(-3px)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = "#4f6beb";
                                                e.target.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a 
                                            href="https://www.instagram.com/" 
                                            style={styles.socialIcon}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = "#e4405f";
                                                e.target.style.transform = "translateY(-3px)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = "#4f6beb";
                                                e.target.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a 
                                            href="https://www.youtube.com/" 
                                            style={styles.socialIcon}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = "#cd201f";
                                                e.target.style.transform = "translateY(-3px)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = "#4f6beb";
                                                e.target.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLoginPage;