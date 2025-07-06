import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DeliveryInstructionsSection = ({ instructions, onInstructionsUpdate, deliverySlot, onSlotSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState(deliverySlot || null);
  const [specialInstructions, setSpecialInstructions] = useState(instructions || '');

  const deliverySlots = [
    {
      id: 'morning',
      label: 'Morning Delivery',
      time: '8:00 AM - 12:00 PM',
      description: 'Best for restaurants and cafes',
      available: true,
      charge: 0
    },
    {
      id: 'afternoon',
      label: 'Afternoon Delivery',
      time: '12:00 PM - 4:00 PM',
      description: 'Standard business hours',
      available: true,
      charge: 0
    },
    {
      id: 'evening',
      label: 'Evening Delivery',
      time: '4:00 PM - 8:00 PM',
      description: 'After business hours',
      available: true,
      charge: 150
    },
    {
      id: 'next_day',
      label: 'Next Day Delivery',
      time: 'Next Business Day',
      description: 'Guaranteed next day delivery',
      available: true,
      charge: 200
    }
  ];

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    onSlotSelect(slot);
  };

  const handleInstructionsChange = (value) => {
    setSpecialInstructions(value);
    onInstructionsUpdate(value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Truck" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Delivery Instructions</h3>
      </div>

      {/* Delivery Time Slots */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-4">Select Delivery Time</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliverySlots.map((slot) => (
            <div
              key={slot.id}
              className={`border rounded-lg p-4 cursor-pointer transition-micro ${
                !slot.available
                  ? 'border-border bg-secondary-50 opacity-50 cursor-not-allowed'
                  : selectedSlot?.id === slot.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
              }`}
              onClick={() => slot.available && handleSlotSelect(slot)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-text-primary">{slot.label}</h5>
                    {slot.charge > 0 && (
                      <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">
                        +{formatCurrency(slot.charge)}
                      </span>
                    )}
                    {slot.charge === 0 && (
                      <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-1">{slot.time}</p>
                  <p className="text-xs text-text-muted">{slot.description}</p>
                </div>
                <div className="ml-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedSlot?.id === slot.id
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedSlot?.id === slot.id && (
                      <Icon name="Check" size={12} className="text-primary-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-4">Special Delivery Instructions</h4>
        <textarea
          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={4}
          placeholder={`Please provide any specific delivery instructions:\n• Loading dock access details\n• Contact person for receiving\n• Special handling requirements\n• Preferred delivery entrance`}
          value={specialInstructions}
          onChange={(e) => handleInstructionsChange(e.target.value)}
        />
        <p className="text-xs text-text-muted mt-2">
          Maximum 500 characters • {500 - specialInstructions.length} remaining
        </p>
      </div>

      {/* Delivery Requirements */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Bulk Delivery Requirements</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success-600" />
            <span className="text-text-secondary">Delivery person will call 30 minutes before arrival</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success-600" />
            <span className="text-text-secondary">Unloading assistance available for bulk orders</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success-600" />
            <span className="text-text-secondary">Quality check before delivery completion</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning-600" />
            <span className="text-text-secondary">Ensure adequate space for bulk item storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInstructionsSection;