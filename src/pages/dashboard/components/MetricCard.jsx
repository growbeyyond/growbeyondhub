import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, onClick, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-muted';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div 
      className={`bg-background border border-border rounded-lg p-6 transition-smooth hover:shadow-elevation-2 ${
        onClick ? 'cursor-pointer hover:border-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        {trend && (
          <div className="w-16 h-8 bg-surface rounded flex items-center justify-center">
            <div className="w-full h-1 bg-primary-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(trend, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-heading font-semibold text-text-primary">
          {value}
        </h3>
        <p className="text-sm text-text-muted">{title}</p>
        
        {change && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={getChangeIcon()} 
              size={16} 
              className={getChangeColor()} 
            />
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
            <span className="text-xs text-text-muted">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;