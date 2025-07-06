import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const BusinessInformationForm = ({ formData, setFormData, errors, onNext }) => {
  const businessTypes = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'catering', label: 'Catering Service' },
    { value: 'retail', label: 'Retail Store' },
    { value: 'institutional', label: 'Institutional (School/Hospital)' },
    { value: 'distributor', label: 'Food Service Distributor' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.gstNumber) {
      newErrors.gstNumber = 'GST number is required';
    } else if (!validateGST(formData.gstNumber)) {
      newErrors.gstNumber = 'Invalid GST number format';
    }
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.businessAddress) newErrors.businessAddress = 'Business address is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';

    if (Object.keys(newErrors).length === 0) {
      onNext(newErrors);
    } else {
      onNext(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Company Name *
          </label>
          <Input
            type="text"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className={errors.companyName ? 'border-error' : ''}
          />
          {errors.companyName && (
            <p className="text-error text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            GST Number *
          </label>
          <Input
            type="text"
            placeholder="22AAAAA0000A1Z5"
            value={formData.gstNumber}
            onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
            className={errors.gstNumber ? 'border-error' : ''}
            maxLength={15}
          />
          {errors.gstNumber && (
            <p className="text-error text-sm mt-1">{errors.gstNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Business Type *
          </label>
          <select
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.businessType ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="text-error text-sm mt-1">{errors.businessType}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Business Address *
          </label>
          <Input
            type="text"
            placeholder="Enter complete business address"
            value={formData.businessAddress}
            onChange={(e) => handleInputChange('businessAddress', e.target.value)}
            className={errors.businessAddress ? 'border-error' : ''}
          />
          {errors.businessAddress && (
            <p className="text-error text-sm mt-1">{errors.businessAddress}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Pincode *
          </label>
          <Input
            type="text"
            placeholder="400001"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            className={errors.pincode ? 'border-error' : ''}
            maxLength={6}
          />
          {errors.pincode && (
            <p className="text-error text-sm mt-1">{errors.pincode}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            City *
          </label>
          <Input
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={errors.city ? 'border-error' : ''}
          />
          {errors.city && (
            <p className="text-city text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            State *
          </label>
          <Input
            type="text"
            placeholder="Enter state"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={errors.state ? 'border-error' : ''}
          />
          {errors.state && (
            <p className="text-error text-sm mt-1">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
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

export default BusinessInformationForm;