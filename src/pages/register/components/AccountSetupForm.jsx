import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSetupForm = ({ formData, setFormData, errors, onSubmit, onPrevious }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToMinimumOrder, setAgreedToMinimumOrder] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    if (!agreedToMinimumOrder) {
      newErrors.minimumOrder = 'You must acknowledge the minimum order requirement';
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(newErrors);
    } else {
      onSubmit(newErrors);
    }
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-error';
    if (strength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Create Password *
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'border-error pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
          
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-secondary-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all ${getStrengthColor(passwordStrength(formData.password))}`}
                    style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">
                  {getStrengthText(passwordStrength(formData.password))}
                </span>
              </div>
              <ul className="text-xs text-text-secondary space-y-1">
                <li className={formData.password.length >= 8 ? 'text-success' : ''}>
                  • At least 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'text-success' : ''}>
                  • One uppercase letter
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'text-success' : ''}>
                  • One lowercase letter
                </li>
                <li className={/\d/.test(formData.password) ? 'text-success' : ''}>
                  • One number
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-success' : ''}>
                  • One special character
                </li>
              </ul>
            </div>
          )}
          
          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'border-error pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="ShoppingCart" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-primary-800 mb-2">Minimum Order Requirement</h3>
              <p className="text-sm text-primary-700 mb-3">
                As a wholesale platform, we require a minimum order value of ₹10,000 per transaction to ensure cost-effective bulk pricing and delivery.
              </p>
              <label className="flex items-start space-x-3">
                <Input
                  type="checkbox"
                  checked={agreedToMinimumOrder}
                  onChange={(e) => setAgreedToMinimumOrder(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-primary-800">
                  I understand and agree to the minimum order requirement of ₹10,000 per transaction
                </span>
              </label>
              {errors.minimumOrder && (
                <p className="text-error text-sm mt-2">{errors.minimumOrder}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <Input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-text-primary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className="text-error text-sm">{errors.terms}</p>
          )}

          <label className="flex items-start space-x-3">
            <Input
              type="checkbox"
              checked={formData.marketingEmails}
              onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-text-secondary">
              I would like to receive promotional emails about new products, offers, and wholesale deals
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        <Button
          type="submit"
          variant="primary"
          iconName="UserCheck"
          iconPosition="right"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default AccountSetupForm;