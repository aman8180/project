import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderStatusWidget = () => {
  const orderUpdates = [
    {
      id: "WH-2024-001234",
      status: "delivered",
      title: "Order Delivered",
      description: "50kg Basmati Rice + 3 items",
      timestamp: "2 hours ago",
      amount: 12500,
      icon: "CheckCircle",
      color: "success"
    },
    {
      id: "WH-2024-001235",
      status: "in_transit",
      title: "Out for Delivery",
      description: "25kg Wheat Flour + 2 items",
      timestamp: "4 hours ago",
      amount: 8750,
      icon: "Truck",
      color: "primary"
    },
    {
      id: "WH-2024-001236",
      status: "processing",
      title: "Order Confirmed",
      description: "100kg Sugar + 5 items",
      timestamp: "1 day ago",
      amount: 18900,
      icon: "Package",
      color: "warning"
    },
    {
      id: "WH-2024-001237",
      status: "pending",
      title: "Payment Pending",
      description: "75kg Rice + 4 items",
      timestamp: "2 days ago",
      amount: 15600,
      icon: "Clock",
      color: "accent"
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (color) => {
    const colors = {
      success: 'text-success bg-success-50 border-success-200',
      primary: 'text-primary bg-primary-50 border-primary-200',
      warning: 'text-warning bg-warning-50 border-warning-200',
      accent: 'text-accent bg-accent-50 border-accent-200'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Order Status Updates</h3>
          <p className="text-sm text-text-secondary mt-1">Real-time tracking of your orders</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Bell"
          onClick={() => {}}
        />
      </div>

      <div className="space-y-4">
        {orderUpdates.map((order) => (
          <div key={order.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-micro">
            <div className={`p-2 rounded-full border ${getStatusColor(order.color)}`}>
              <Icon name={order.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{order.title}</p>
                  <p className="text-xs text-text-secondary mt-1">{order.description}</p>
                  <p className="text-xs text-text-muted mt-1">Order #{order.id}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-data font-medium text-text-primary">
                    {formatCurrency(order.amount)}
                  </p>
                  <p className="text-xs text-text-muted">{order.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          className="w-full"
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All Orders
        </Button>
      </div>
    </div>
  );
};

export default OrderStatusWidget;