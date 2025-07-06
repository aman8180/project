import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary border-primary-200',
    success: 'bg-success-50 text-success border-success-200',
    warning: 'bg-warning-50 text-warning border-warning-200',
    accent: 'bg-accent-50 text-accent border-accent-200'
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatValue = (val) => {
    if (typeof val === 'number' && val >= 1000) {
      return formatCurrency(val);
    }
    return val;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-text-primary font-data mb-1">
            {formatValue(value)}
          </p>
          {subtitle && (
            <p className="text-xs text-text-muted">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={trend === 'up' ? 'text-success' : 'text-error'}
              />
              <span className={`text-xs ml-1 ${trend === 'up' ? 'text-success' : 'text-error'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;