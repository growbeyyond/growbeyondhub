import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'content_published',
      title: 'Blog post published',
      description: 'Digital Marketing Trends 2024 went live on TechCorp website',
      client: 'TechCorp Solutions',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      icon: 'FileText',
      iconColor: 'text-success',
      iconBg: 'bg-success-50'
    },
    {
      id: 2,
      type: 'approval_pending',
      title: 'Content needs approval',
      description: 'Social media campaign for Q1 launch requires client review',
      client: 'RetailPlus Inc',
      user: 'Mike Chen',
      time: '15 minutes ago',
      icon: 'Clock',
      iconColor: 'text-warning',
      iconBg: 'bg-warning-50'
    },
    {
      id: 3,
      type: 'report_generated',
      title: 'Monthly report ready',
      description: 'Analytics report for December has been generated and sent',
      client: 'HealthFirst Medical',
      user: 'System',
      time: '1 hour ago',
      icon: 'FileBarChart',
      iconColor: 'text-accent',
      iconBg: 'bg-accent-50'
    },
    {
      id: 4,
      type: 'campaign_started',
      title: 'Campaign launched',
      description: 'Winter Sale campaign is now live across all channels',
      client: 'EcoGreen Energy',
      user: 'Lisa Park',
      time: '2 hours ago',
      icon: 'Rocket',
      iconColor: 'text-primary',
      iconBg: 'bg-primary-50'
    },
    {
      id: 5,
      type: 'client_feedback',
      title: 'Client feedback received',
      description: 'Positive feedback on brand awareness campaign performance',
      client: 'FinanceFlow Ltd',
      user: 'David Wilson',
      time: '3 hours ago',
      icon: 'MessageSquare',
      iconColor: 'text-success',
      iconBg: 'bg-success-50'
    },
    {
      id: 6,
      type: 'content_scheduled',
      title: 'Content scheduled',
      description: '5 social media posts scheduled for next week',
      client: 'TechCorp Solutions',
      user: 'Emma Davis',
      time: '4 hours ago',
      icon: 'Calendar',
      iconColor: 'text-accent',
      iconBg: 'bg-accent-50'
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Recent Activity
          </h2>
          <button className="text-sm text-primary hover:text-primary-700 transition-smooth">
            View All
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.iconBg}`}>
                <Icon 
                  name={activity.icon} 
                  size={16} 
                  className={activity.iconColor} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-text-muted">
                    {activity.time}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mt-1">
                  {activity.description}
                </p>
                
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-primary bg-primary-50 px-2 py-1 rounded">
                    {activity.client}
                  </span>
                  <span className="text-xs text-text-muted">
                    by {activity.user}
                  </span>
                </div>
              </div>
              
              {index < activities.length - 1 && (
                <div className="absolute left-5 mt-12 w-px h-4 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;