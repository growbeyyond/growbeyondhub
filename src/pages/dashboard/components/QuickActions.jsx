import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const quickActions = [
    {
      id: 1,
      title: 'Create Blog Post',
      description: 'Write and publish new blog content',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      action: () => console.log('Create blog post')
    },
    {
      id: 2,
      title: 'Schedule Social Post',
      description: 'Plan social media content',
      icon: 'Calendar',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      action: () => console.log('Schedule social post')
    },
    {
      id: 3,
      title: 'Generate Report',
      description: 'Create client performance report',
      icon: 'FileBarChart',
      color: 'text-success',
      bgColor: 'bg-success-50',
      action: () => console.log('Generate report')
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description: 'Generate content with AI assistance',
      icon: 'Sparkles',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      action: () => console.log('AI content generator')
    }
  ];

  const recentTemplates = [
    { id: 1, name: 'Monthly Performance Report', type: 'Report Template' },
    { id: 2, name: 'Social Media Calendar', type: 'Content Template' },
    { id: 3, name: 'SEO Audit Report', type: 'Report Template' },
    { id: 4, name: 'Campaign Brief', type: 'Content Template' }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review TechCorp campaign',
      client: 'TechCorp Solutions',
      dueTime: '2:00 PM',
      priority: 'high',
      type: 'review'
    },
    {
      id: 2,
      title: 'Publish RetailPlus blog post',
      client: 'RetailPlus Inc',
      dueTime: '4:30 PM',
      priority: 'medium',
      type: 'publish'
    },
    {
      id: 3,
      title: 'Client call with HealthFirst',
      client: 'HealthFirst Medical',
      dueTime: '5:00 PM',
      priority: 'high',
      type: 'meeting'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case 'review': return 'Eye';
      case 'publish': return 'Send';
      case 'meeting': return 'Video';
      default: return 'CheckCircle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-background border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Quick Actions
            </h2>
            <div className="relative">
              <Button
                variant="primary"
                size="sm"
                iconName="Plus"
                iconSize={16}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Create New
              </Button>
              
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-lg shadow-elevation-2 z-200">
                  <div className="p-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-surface transition-smooth text-left"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.bgColor}`}>
                          <Icon name={action.icon} size={16} className={action.color} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {action.title}
                          </p>
                          <p className="text-xs text-text-muted">
                            {action.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.slice(0, 4).map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="flex items-center space-x-3 p-4 bg-surface rounded-lg hover:bg-surface-100 transition-smooth text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.bgColor}`}>
                  <Icon name={action.icon} size={18} className={action.color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {action.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Templates */}
      <div className="bg-background border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Recent Templates
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {recentTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-100 transition-smooth cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="FileTemplate" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {template.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {template.type}
                    </p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-background border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Today's Tasks
            </h3>
            <span className="text-sm text-text-muted">
              {upcomingTasks.length} pending
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 bg-surface rounded-lg hover:bg-surface-100 transition-smooth cursor-pointer"
              >
                <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name={getTaskIcon(task.type)} size={16} className="text-accent" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-primary bg-primary-50 px-2 py-1 rounded">
                      {task.client}
                    </span>
                    <span className="text-xs text-text-muted">
                      Due {task.dueTime}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-error' :
                    task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                  }`} />
                  <Icon name="ChevronRight" size={16} className="text-text-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;