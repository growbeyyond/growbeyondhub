import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientSummaryCards = () => {
  const summaryData = [
    {
      id: 1,
      title: "Total Clients",
      value: "47",
      change: "+3",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      id: 2,
      title: "Monthly Revenue",
      value: "$127,450",
      change: "+12.5%",
      changeType: "increase",
      icon: "DollarSign",
      color: "success"
    },
    {
      id: 3,
      title: "Active Campaigns",
      value: "89",
      change: "+7",
      changeType: "increase",
      icon: "Target",
      color: "accent"
    },
    {
      id: 4,
      title: "Avg. Client Value",
      value: "$2,710",
      change: "-2.1%",
      changeType: "decrease",
      icon: "TrendingUp",
      color: "warning"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 text-primary';
      case 'success':
        return 'bg-success-50 text-success';
      case 'accent':
        return 'bg-accent-50 text-accent';
      case 'warning':
        return 'bg-warning-50 text-warning';
      default:
        return 'bg-surface text-text-muted';
    }
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-4">
      {summaryData.map((item) => (
        <div key={item.id} className="bg-background border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
              <Icon name={item.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium ${getChangeColor(item.changeType)}`}>
              <Icon 
                name={item.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{item.change}</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">{item.value}</p>
            <p className="text-sm text-text-muted">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientSummaryCards;