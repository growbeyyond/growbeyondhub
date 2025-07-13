import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Content Published Successfully',
      message: 'Blog post "Digital Marketing Trends 2024" has been published to TechCorp\'s website',
      time: '2 minutes ago',
      unread: true,
      client: 'TechCorp Solutions',
      action: 'View Post'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Client Review Required',
      message: 'Social media campaign for RetailPlus requires approval before scheduled publication',
      time: '15 minutes ago',
      unread: true,
      client: 'RetailPlus Inc',
      action: 'Review Campaign'
    },
    {
      id: 3,
      type: 'info',
      title: 'Report Generated',
      message: 'Monthly analytics report for HealthFirst Medical is ready for download',
      time: '1 hour ago',
      unread: false,
      client: 'HealthFirst Medical',
      action: 'Download Report'
    },
    {
      id: 4,
      type: 'error',
      title: 'Content Sync Failed',
      message: 'Failed to sync content calendar with EcoGreen Energy\'s CMS. Please check connection',
      time: '2 hours ago',
      unread: true,
      client: 'EcoGreen Energy',
      action: 'Retry Sync'
    },
    {
      id: 5,
      type: 'info',
      title: 'New Team Member Added',
      message: 'Sarah Johnson has been added to the FinanceFlow Ltd account team',
      time: '3 hours ago',
      unread: false,
      client: 'FinanceFlow Ltd',
      action: null
    },
    {
      id: 6,
      type: 'success',
      title: 'Campaign Performance Update',
      message: 'Summer Sale campaign exceeded target by 25% - great work team!',
      time: '5 hours ago',
      unread: false,
      client: 'RetailPlus Inc',
      action: 'View Analytics'
    }
  ]);

  const [filter, setFilter] = useState('all'); // all, unread, client-specific

  const unreadCount = notifications.filter(n => n.unread).length;
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return notification.unread;
    return true;
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const handleNotificationAction = (notification) => {
    console.log('Notification action:', notification.action, notification);
    // Handle specific notification actions
    handleMarkAsRead(notification.id);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'info':
      default:
        return 'text-accent';
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success-50';
      case 'warning':
        return 'bg-warning-50';
      case 'error':
        return 'bg-error-50';
      case 'info':
      default:
        return 'bg-accent-50';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('[data-notification-center]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" data-notification-center>
      {/* Notification Bell */}
      <button
        onClick={handleToggle}
        className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-background border border-border rounded-lg shadow-elevation-2 z-300 max-h-[32rem] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-text-primary">
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="xs"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all read
                  </Button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-text-muted hover:text-text-primary transition-smooth"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs rounded-md transition-smooth ${
                  filter === 'all' ?'bg-primary text-white' :'text-text-muted hover:text-text-primary hover:bg-surface'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-xs rounded-md transition-smooth ${
                  filter === 'unread' ?'bg-primary text-white' :'text-text-muted hover:text-text-primary hover:bg-surface'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border last:border-b-0 hover:bg-surface transition-smooth ${
                    notification.unread ? 'bg-primary-50 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getNotificationBgColor(notification.type)}`}>
                      <Icon
                        name={getNotificationIcon(notification.type)}
                        size={16}
                        className={getNotificationColor(notification.type)}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-text-primary truncate pr-2">
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="p-1 text-text-muted hover:text-error transition-smooth"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-text-muted">
                            {notification.client}
                          </span>
                          <span className="text-xs text-text-muted">•</span>
                          <span className="text-xs text-text-muted">
                            {notification.time}
                          </span>
                        </div>
                        
                        {notification.action && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleNotificationAction(notification)}
                          >
                            {notification.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-3" />
                <p className="text-sm text-text-muted">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {filter === 'unread' ?'All caught up! Check back later for updates.' :'Notifications will appear here when you have updates.'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-4 border-t border-border bg-surface">
              <Button 
                variant="ghost" 
                size="sm" 
                fullWidth
                iconName="Settings"
                iconSize={16}
              >
                Notification Settings
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;