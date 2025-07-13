import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, trend, icon, color = 'primary' }) => {
  const isPositive = change >= 0;
  const trendData = trend || [];
  
  const colorClasses = {
    primary: 'bg-primary-50 text-primary border-primary-100',
    success: 'bg-success-50 text-success border-success-100',
    warning: 'bg-warning-50 text-warning border-warning-100',
    accent: 'bg-accent-50 text-accent border-accent-100'
  };

  // Generate simple sparkline path
  const generateSparklinePath = (data) => {
    if (!data.length) return '';
    
    const width = 60;
    const height = 20;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-success-50 text-success' :'bg-error-50 text-error'
          }`}>
            <Icon 
              name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
              className="mr-1" 
            />
            {Math.abs(change)}%
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <h3 className="text-sm font-medium text-text-muted mb-1">{title}</h3>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
      
      {trendData.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Last 7 days</span>
          <svg width="60" height="20" className="text-primary">
            <path
              d={generateSparklinePath(trendData)}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-60"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MetricCard;