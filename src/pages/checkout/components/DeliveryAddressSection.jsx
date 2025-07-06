import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryAddressSection = ({ selectedAddress, onAddressSelect, onAddressAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'business',
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  });

  const savedAddresses = [
    {
      id: 1,
      type: 'business',
      businessName: 'Main Restaurant Location',
      contactPerson: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@restaurant.com',
      address: '123 MG Road, Commercial Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      landmark: 'Near Metro Station',
      isDefault: true
    },
    {
      id: 2,
      type: 'business',
      businessName: 'Branch Office',
      contactPerson: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@restaurant.com',
      address: '456 Link Road, Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      landmark: 'Opposite Shopping Mall',
      isDefault: false
    }
  ];

  const handleAddressSelect = (address) => {
    onAddressSelect(address);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAddress = () => {
    if (newAddress.businessName && newAddress.contactPerson && newAddress.phone && newAddress.address) {
      const addressToAdd = {
        ...newAddress,
        id: Date.now()
      };
      onAddressAdd(addressToAdd);
      setNewAddress({
        type: 'business',
        businessName: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        isDefault: false
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Delivery Address</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Add New Address
        </Button>
      </div>

      {/* Saved Addresses */}
      <div className="space-y-4 mb-6">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer transition-micro ${
              selectedAddress?.id === address.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
            }`}
            onClick={() => handleAddressSelect(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-text-primary">{address.businessName}</h4>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-1">
                  Contact: {address.contactPerson} • {address.phone}
                </p>
                <p className="text-sm text-text-secondary mb-1">
                  {address.address}
                </p>
                <p className="text-sm text-text-secondary">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                {address.landmark && (
                  <p className="text-xs text-text-muted mt-1">
                    Landmark: {address.landmark}
                  </p>
                )}
              </div>
              <div className="ml-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAddress?.id === address.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedAddress?.id === address.id && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Form */}
      {showAddForm && (
        <div className="border border-border rounded-lg p-4 bg-secondary-50">
          <h4 className="font-medium text-text-primary mb-4">Add New Business Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Business Name *"
              value={newAddress.businessName}
              onChange={(e) => handleNewAddressChange('businessName', e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Contact Person *"
              value={newAddress.contactPerson}
              onChange={(e) => handleNewAddressChange('contactPerson', e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number *"
              value={newAddress.phone}
              onChange={(e) => handleNewAddressChange('phone', e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={newAddress.email}
              onChange={(e) => handleNewAddressChange('email', e.target.value)}
            />
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Complete Address *"
                value={newAddress.address}
                onChange={(e) => handleNewAddressChange('address', e.target.value)}
                required
              />
            </div>
            <Input
              type="text"
              placeholder="City *"
              value={newAddress.city}
              onChange={(e) => handleNewAddressChange('city', e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="State *"
              value={newAddress.state}
              onChange={(e) => handleNewAddressChange('state', e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="PIN Code *"
              value={newAddress.pincode}
              onChange={(e) => handleNewAddressChange('pincode', e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Landmark (Optional)"
              value={newAddress.landmark}
              onChange={(e) => handleNewAddressChange('landmark', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center space-x-2">
              <Input
                type="checkbox"
                checked={newAddress.isDefault}
                onChange={(e) => handleNewAddressChange('isDefault', e.target.checked)}
              />
              <span className="text-sm text-text-secondary">Set as default address</span>
            </label>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddAddress}
              >
                Add Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressSection;