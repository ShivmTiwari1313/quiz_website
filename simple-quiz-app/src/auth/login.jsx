import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import '../styles/background.css';
import '../styles/animations.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty password
      if (formData.email && formData.password) {
        onLogin({
          email: formData.email,
          name: formData.email.split('@')[0] // Generate a simple username
        });
        navigate('/quiz');
      } else {
        setErrors({ general: 'Invalid credentials' });
      }
    // } catch () {
    //   setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bubbles">
      {[...Array(8)].map((_, i) => <div key={i} className="bubble"></div>)}
      <div className="content-wrapper">
        <div className="auth-container fade-in">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to continue your quiz journey</p>
          </div>
          
          {errors.general && (
            <div className="error-message" style={{ textAlign: 'center', marginBottom: '15px' }}>
              {errors.general}
            </div>
          )}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <div className="error-message">{errors.email}</div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div className="error-message">{errors.password}</div>
            </div>
            
            <button 
              type="submit" 
              className="auth-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <a href="/signup" className="auth-link">Sign up</a></p>
          </div>
          
          <div className="social-auth">
            <div className="social-btn google">
              <i className="fab fa-google"></i>
            </div>
            <div className="social-btn facebook">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="social-btn twitter">
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;