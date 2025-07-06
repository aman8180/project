import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BillingInformationSection = ({ billingInfo, onBillingUpdate }) => {
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const [gstDetails, setGstDetails] = useState({
    gstNumber: 'GST123456789',
    businessName: 'Kumar Restaurant Pvt Ltd',
    address: '123 MG Road, Commercial Complex, Mumbai, Maharashtra - 400001',
    verified: true
  });

  const handleBillingChange = (field, value) => {
    onBillingUpdate({
      ...billingInfo,
      [field]: value
    });
  };

  const handleGstChange = (field, value) => {
    setGstDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const verifyGstNumber = () => {
    // Mock GST verification
    setTimeout(() => {
      setGstDetails(prev => ({
        ...prev,
        verified: true
      }));
    }, 1000);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="FileText" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Billing Information</h3>
      </div>

      {/* GST Details */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-4">GST Details</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="GST Number (15 digits)"
                value={gstDetails.gstNumber}
                onChange={(e) => handleGstChange('gstNumber', e.target.value)}
                className="font-data"
              />
            </div>
            <Button
              variant={gstDetails.verified ? "success" : "outline"}
              size="sm"
              onClick={verifyGstNumber}
              iconName={gstDetails.verified ? "CheckCircle" : "Search"}
              iconPosition="left"
              disabled={gstDetails.verified}
            >
              {gstDetails.verified ? 'Verified' : 'Verify'}
            </Button>
          </div>

          {gstDetails.verified && (
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success-600 mt-0.5" />
                <div className="flex-1">
                  <h5 className="font-medium text-success-800 mb-1">GST Verified</h5>
                  <p className="text-sm text-success-700 mb-2">{gstDetails.businessName}</p>
                  <p className="text-xs text-success-600">{gstDetails.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Billing Address */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-text-primary">Billing Address</h4>
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={sameAsDelivery}
              onChange={(e) => setSameAsDelivery(e.target.checked)}
            />
            <span className="text-sm text-text-secondary">Same as delivery address</span>
          </label>
        </div>

        {!sameAsDelivery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Business Name"
              value={billingInfo?.businessName || ''}
              onChange={(e) => handleBillingChange('businessName', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Contact Person"
              value={billingInfo?.contactPerson || ''}
              onChange={(e) => handleBillingChange('contactPerson', e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Complete Address"
                value={billingInfo?.address || ''}
                onChange={(e) => handleBillingChange('address', e.target.value)}
              />
            </div>
            <Input
              type="text"
              placeholder="City"
              value={billingInfo?.city || ''}
              onChange={(e) => handleBillingChange('city', e.target.value)}
            />
            <Input
              type="text"
              placeholder="State"
              value={billingInfo?.state || ''}
              onChange={(e) => handleBillingChange('state', e.target.value)}
            />
            <Input
              type="text"
              placeholder="PIN Code"
              value={billingInfo?.pincode || ''}
              onChange={(e) => handleBillingChange('pincode', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Phone Number"
              value={billingInfo?.phone || ''}
              onChange={(e) => handleBillingChange('phone', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Purchase Order Details */}
      <div>
        <h4 className="font-medium text-text-primary mb-4">Purchase Order Details (Optional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="PO Number"
            value={billingInfo?.poNumber || ''}
            onChange={(e) => handleBillingChange('poNumber', e.target.value)}
          />
          <Input
            type="date"
            placeholder="PO Date"
            value={billingInfo?.poDate || ''}
            onChange={(e) => handleBillingChange('poDate', e.target.value)}
          />
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Reference/Notes"
              value={billingInfo?.reference || ''}
              onChange={(e) => handleBillingChange('reference', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInformationSection;