import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalTracking = ({ goals }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success-50 border-success-200';
      case 'on-track':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'at-risk':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'behind':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'on-track':
        return 'TrendingUp';
      case 'at-risk':
        return 'AlertTriangle';
      case 'behind':
        return 'TrendingDown';
      default:
        return 'Target';
    }
  };

  const getProgressColor = (progress, status) => {
    if (status === 'completed') return 'bg-success';
    if (progress >= 80) return 'bg-primary';
    if (progress >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Goal Tracking</h3>
        <button className="text-text-muted hover:text-text-primary transition-smooth">
          <Icon name="Plus" size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-smooth">
            {/* Goal Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary mb-1">
                  {goal.title}
                </h4>
                <p className="text-xs text-text-muted">
                  {goal.client} • Due {goal.dueDate}
                </p>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                <Icon name={getStatusIcon(goal.status)} size={12} className="mr-1" />
                {goal.status.replace('-', ' ')}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted">Progress</span>
                <span className="text-xs font-medium text-text-primary">
                  {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${getProgressColor(goal.progress, goal.status)}`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-muted">0</span>
                <span className="text-xs font-medium text-text-primary">
                  {goal.progress}%
                </span>
                <span className="text-xs text-text-muted">
                  {goal.target.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Goal Metrics */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-text-muted">Time Remaining</span>
                <p className="font-medium text-text-primary">{goal.timeRemaining}</p>
              </div>
              <div>
                <span className="text-text-muted">Daily Target</span>
                <p className="font-medium text-text-primary">
                  {goal.dailyTarget.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <button className="text-xs text-text-muted hover:text-text-primary transition-smooth">
                View Details
              </button>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-text-muted hover:text-text-primary transition-smooth">
                  <Icon name="Edit2" size={14} />
                </button>
                <button className="p-1 text-text-muted hover:text-text-primary transition-smooth">
                  <Icon name="MoreHorizontal" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Goal */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-3 text-sm text-text-muted hover:text-text-primary border-2 border-dashed border-border hover:border-primary rounded-lg transition-smooth">
          <Icon name="Plus" size={16} />
          <span>Add New Goal</span>
        </button>
      </div>
    </div>
  );
};

export default GoalTracking;