import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demo
  const mockCredentials = {
    email: 'wholesale@business.com',
    password: 'wholesale123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userProfile', JSON.stringify({
          name: 'Rajesh Kumar',
          email: formData.email,
          company: 'Kumar Wholesale Trading',
          role: 'Procurement Manager',
          gstNumber: '27ABCDE1234F1Z5'
        }));
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        navigate('/dashboard');
      } else {
        // Failed login
        setErrors({
          general: 'Invalid email or password. Please use wholesale@business.com / wholesale123 for demo.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password or show modal
    alert('Forgot password functionality would be implemented here');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface border border-border rounded-lg shadow-elevation-2 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Building2" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Wholesale Login
          </h1>
          <p className="text-text-secondary">
            Access your business account for bulk ordering
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error font-medium">
                {errors.general}
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Business Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your business email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'border-error focus:border-error' : ''}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'border-error focus:border-error' : ''}
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <Input
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-secondary">Remember me</span>
            </label>
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary-700 font-medium transition-micro"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Account'}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary text-sm mb-4">
            New wholesale customer?
          </p>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleRegisterClick}
            iconName="UserPlus"
            iconPosition="left"
          >
            Register Your Business
          </Button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent-700 mb-1">Demo Credentials:</p>
              <p className="text-accent-600">Email: wholesale@business.com</p>
              <p className="text-accent-600">Password: wholesale123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;