import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SchedulingPanel = ({ onSchedule, selectedPlatforms }) => {
  const [scheduleType, setScheduleType] = useState('now'); // now, later, recurring
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [recurringPattern, setRecurringPattern] = useState('daily');
  const [timezone, setTimezone] = useState('America/New_York');
  const [autoPost, setAutoPost] = useState(true);

  const scheduleOptions = [
    { id: 'now', name: 'Publish Now', icon: 'Send', description: 'Post immediately to selected platforms' },
    { id: 'later', name: 'Schedule for Later', icon: 'Calendar', description: 'Choose specific date and time' },
    { id: 'recurring', name: 'Recurring Schedule', icon: 'Repeat', description: 'Set up recurring posts' }
  ];

  const recurringOptions = [
    { id: 'daily', name: 'Daily', description: 'Every day at the same time' },
    { id: 'weekly', name: 'Weekly', description: 'Same day each week' },
    { id: 'monthly', name: 'Monthly', description: 'Same date each month' },
    { id: 'custom', name: 'Custom', description: 'Define custom pattern' }
  ];

  const timezones = [
    { id: 'America/New_York', name: 'Eastern Time (ET)' },
    { id: 'America/Chicago', name: 'Central Time (CT)' },
    { id: 'America/Denver', name: 'Mountain Time (MT)' },
    { id: 'America/Los_Angeles', name: 'Pacific Time (PT)' },
    { id: 'UTC', name: 'UTC' }
  ];

  const optimalTimes = [
    { platform: 'facebook', time: '15:00', engagement: 'High' },
    { platform: 'instagram', time: '11:00', engagement: 'High' },
    { platform: 'twitter', time: '12:00', engagement: 'Medium' },
    { platform: 'linkedin', time: '08:00', engagement: 'High' }
  ];

  const handleSchedule = () => {
    const scheduleData = {
      type: scheduleType,
      date: selectedDate,
      time: selectedTime,
      recurring: scheduleType === 'recurring' ? recurringPattern : null,
      timezone,
      autoPost,
      platforms: selectedPlatforms
    };

    onSchedule(scheduleData);
  };

  const getOptimalTimeForPlatforms = () => {
    const platformTimes = optimalTimes.filter(ot => selectedPlatforms.includes(ot.platform));
    if (platformTimes.length === 0) return null;
    
    // Return the most common optimal time
    const timeMap = {};
    platformTimes.forEach(pt => {
      timeMap[pt.time] = (timeMap[pt.time] || 0) + 1;
    });
    
    const mostCommonTime = Object.keys(timeMap).reduce((a, b) => timeMap[a] > timeMap[b] ? a : b);
    return mostCommonTime;
  };

  const suggestedTime = getOptimalTimeForPlatforms();

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">Publishing Schedule</h3>
      </div>

      {/* Schedule Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          When to Publish
        </label>
        <div className="space-y-2">
          {scheduleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setScheduleType(option.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-md text-left transition-smooth ${
                scheduleType === option.id
                  ? 'bg-primary text-white' :'bg-surface hover:bg-surface-100 text-text-primary'
              }`}
            >
              <Icon 
                name={option.icon} 
                size={20} 
                className={scheduleType === option.id ? 'text-white' : 'text-text-muted'} 
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  scheduleType === option.id ? 'text-white' : 'text-text-primary'
                }`}>
                  {option.name}
                </p>
                <p className={`text-xs ${
                  scheduleType === option.id ? 'text-white text-opacity-80' : 'text-text-muted'
                }`}>
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      {(scheduleType === 'later' || scheduleType === 'recurring') && (
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Time
              </label>
              <Input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>

          {/* Suggested Optimal Time */}
          {suggestedTime && (
            <div className="bg-accent-50 border border-accent-100 rounded-lg p-3 mb-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Optimal Time Suggestion</span>
              </div>
              <p className="text-sm text-text-secondary mb-2">
                Based on your selected platforms, {suggestedTime} shows high engagement
              </p>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setSelectedTime(suggestedTime)}
              >
                Use Suggested Time
              </Button>
            </div>
          )}

          {/* Timezone Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {timezones.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Recurring Pattern */}
      {scheduleType === 'recurring' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Recurring Pattern
          </label>
          <div className="space-y-2">
            {recurringOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setRecurringPattern(option.id)}
                className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-smooth ${
                  recurringPattern === option.id
                    ? 'bg-primary text-white' :'bg-surface hover:bg-surface-100 text-text-primary'
                }`}
              >
                <div>
                  <p className={`text-sm font-medium ${
                    recurringPattern === option.id ? 'text-white' : 'text-text-primary'
                  }`}>
                    {option.name}
                  </p>
                  <p className={`text-xs ${
                    recurringPattern === option.id ? 'text-white text-opacity-80' : 'text-text-muted'
                  }`}>
                    {option.description}
                  </p>
                </div>
                {recurringPattern === option.id && (
                  <Icon name="Check" size={16} className="text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platform Engagement Times */}
      {selectedPlatforms.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Platform Insights</h4>
          <div className="space-y-2">
            {optimalTimes
              .filter(ot => selectedPlatforms.includes(ot.platform))
              .map((platformTime) => (
                <div key={platformTime.platform} className="flex items-center justify-between p-2 bg-surface rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-text-primary capitalize">{platformTime.platform}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">{platformTime.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      platformTime.engagement === 'High' ?'bg-success-50 text-success' :'bg-warning-50 text-warning'
                    }`}>
                      {platformTime.engagement}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Auto-Post Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-text-primary">Auto-Publish</label>
            <p className="text-xs text-text-muted">Automatically publish without manual approval</p>
          </div>
          <button
            onClick={() => setAutoPost(!autoPost)}
            className={`w-10 h-6 rounded-full transition-smooth ${
              autoPost ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              autoPost ? 'translate-x-5' : 'translate-x-1'
            }`}></div>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="primary"
          fullWidth
          onClick={handleSchedule}
          disabled={
            (scheduleType === 'later' || scheduleType === 'recurring') && 
            (!selectedDate || !selectedTime)
          }
          iconName={scheduleType === 'now' ? 'Send' : 'Calendar'}
          iconSize={16}
        >
          {scheduleType === 'now' ?'Publish Now' 
            : scheduleType === 'later' ?'Schedule Post' :'Set Recurring Schedule'
          }
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Save"
          iconSize={16}
        >
          Save as Draft
        </Button>
      </div>

      {/* Schedule Summary */}
      {(scheduleType === 'later' || scheduleType === 'recurring') && selectedDate && selectedTime && (
        <div className="mt-4 p-3 bg-primary-50 border border-primary-100 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Schedule Summary</span>
          </div>
          <p className="text-sm text-text-secondary">
            {scheduleType === 'recurring' ? 'Recurring post' : 'Scheduled for'} {selectedDate} at {selectedTime} ({timezone})
          </p>
          <p className="text-xs text-text-muted mt-1">
            Publishing to: {selectedPlatforms.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default SchedulingPanel;