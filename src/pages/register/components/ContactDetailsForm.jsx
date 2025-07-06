import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContactDetailsForm = ({ formData, setFormData, errors, onNext, onPrevious }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.contactPersonName) newErrors.contactPersonName = 'Contact person name is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number format';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.alternateNumber) {
      newErrors.alternateNumber = 'Alternate number is required';
    } else if (!validateMobile(formData.alternateNumber)) {
      newErrors.alternateNumber = 'Invalid alternate number format';
    }

    if (Object.keys(newErrors).length === 0) {
      onNext(newErrors);
    } else {
      onNext(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Contact Person Name *
          </label>
          <Input
            type="text"
            placeholder="Enter contact person name"
            value={formData.contactPersonName}
            onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
            className={errors.contactPersonName ? 'border-error' : ''}
          />
          {errors.contactPersonName && (
            <p className="text-error text-sm mt-1">{errors.contactPersonName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Designation *
          </label>
          <Input
            type="text"
            placeholder="e.g., Owner, Manager, Procurement Head"
            value={formData.designation}
            onChange={(e) => handleInputChange('designation', e.target.value)}
            className={errors.designation ? 'border-error' : ''}
          />
          {errors.designation && (
            <p className="text-error text-sm mt-1">{errors.designation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Mobile Number *
          </label>
          <Input
            type="tel"
            placeholder="9876543210"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            className={errors.mobileNumber ? 'border-error' : ''}
            maxLength={10}
          />
          {errors.mobileNumber && (
            <p className="text-error text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="contact@company.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Alternate Number *
          </label>
          <Input
            type="tel"
            placeholder="9876543210"
            value={formData.alternateNumber}
            onChange={(e) => handleInputChange('alternateNumber', e.target.value)}
            className={errors.alternateNumber ? 'border-error' : ''}
            maxLength={10}
          />
          {errors.alternateNumber && (
            <p className="text-error text-sm mt-1">{errors.alternateNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            WhatsApp Number (Optional)
          </label>
          <Input
            type="tel"
            placeholder="9876543210"
            value={formData.whatsappNumber}
            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
            maxLength={10}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Business Hours
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-secondary mb-1">Opening Time</label>
              <Input
                type="time"
                value={formData.openingTime}
                onChange={(e) => handleInputChange('openingTime', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Closing Time</label>
              <Input
                type="time"
                value={formData.closingTime}
                onChange={(e) => handleInputChange('closingTime', e.target.value)}
              />
            </div>
          </div>
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
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;