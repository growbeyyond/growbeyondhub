import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CalendarGrid = ({ 
  currentDate, 
  viewMode, 
  scheduledContent, 
  onDateSelect, 
  onContentDrop,
  selectedDate,
  clients 
}) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getContentForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return scheduledContent.filter(content => 
      content.scheduledDate === dateStr
    );
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    const contentData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onContentDrop?.(contentData, date);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'Youtube',
      twitter: 'Twitter',
      linkedin: 'Linkedin'
    };
    return icons[platform] || 'Globe';
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-accent text-white',
      published: 'bg-success text-white',
      draft: 'bg-warning text-white',
      failed: 'bg-error text-white'
    };
    return colors[status] || 'bg-secondary text-white';
  };

  const getClientColor = (clientId) => {
    const colors = [
      'border-l-primary',
      'border-l-accent',
      'border-l-success',
      'border-l-warning',
      'border-l-error'
    ];
    return colors[clientId % colors.length];
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        {/* Week Headers */}
        <div className="grid grid-cols-7 bg-surface border-b border-border">
          {weekDays.map(day => (
            <div key={day} className="p-3 text-center">
              <span className="text-sm font-medium text-text-secondary">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => (
            <div
              key={index}
              className={`min-h-[120px] border-r border-b border-border last:border-r-0 ${
                date ? 'cursor-pointer hover:bg-surface' : ''
              } ${isSelected(date) ? 'bg-primary-50' : ''}`}
              onClick={() => date && onDateSelect(date)}
              onDrop={(e) => date && handleDrop(e, date)}
              onDragOver={handleDragOver}
            >
              {date && (
                <div className="p-2 h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      isToday(date) 
                        ? 'bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center' 
                        : 'text-text-primary'
                    }`}>
                      {date.getDate()}
                    </span>
                    {getContentForDate(date).length > 0 && (
                      <span className="text-xs text-text-muted">
                        {getContentForDate(date).length}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {getContentForDate(date).slice(0, 3).map(content => (
                      <div
                        key={content.id}
                        className={`p-1 rounded text-xs border-l-2 ${getClientColor(content.clientId)} bg-surface`}
                      >
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={getPlatformIcon(content.platform)} 
                            size={12} 
                            className="text-text-muted" 
                          />
                          <span className="truncate text-text-primary">
                            {content.title}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-text-muted">
                            {content.scheduledTime}
                          </span>
                          <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(content.status)}`}>
                            {content.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {getContentForDate(date).length > 3 && (
                      <div className="text-xs text-text-muted text-center py-1">
                        +{getContentForDate(date).length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        {/* Week Headers */}
        <div className="grid grid-cols-8 bg-surface border-b border-border">
          <div className="p-3"></div>
          {days.map(date => (
            <div key={date.toISOString()} className="p-3 text-center">
              <div className="text-sm font-medium text-text-secondary">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-semibold mt-1 ${
                isToday(date) 
                  ? 'bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' 
                  : 'text-text-primary'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="max-h-96 overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-border">
              <div className="p-2 text-xs text-text-muted text-right border-r border-border">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {days.map(date => (
                <div
                  key={`${date.toISOString()}-${hour}`}
                  className="min-h-[60px] border-r border-border p-1 hover:bg-surface cursor-pointer"
                  onClick={() => onDateSelect(date)}
                  onDrop={(e) => handleDrop(e, date)}
                  onDragOver={handleDragOver}
                >
                  {getContentForDate(date)
                    .filter(content => {
                      const contentHour = parseInt(content.scheduledTime.split(':')[0]);
                      return contentHour === hour;
                    })
                    .map(content => (
                      <div
                        key={content.id}
                        className={`p-1 rounded text-xs border-l-2 ${getClientColor(content.clientId)} bg-surface mb-1`}
                      >
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={getPlatformIcon(content.platform)} 
                            size={10} 
                            className="text-text-muted" 
                          />
                          <span className="truncate text-text-primary">
                            {content.title}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayContent = getContentForDate(currentDate);

    return (
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        {/* Day Header */}
        <div className="p-4 bg-surface border-b border-border">
          <div className="text-center">
            <div className="text-sm font-medium text-text-secondary">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
            <div className={`text-2xl font-semibold mt-1 ${
              isToday(currentDate) ? 'text-primary' : 'text-text-primary'
            }`}>
              {currentDate.getDate()}
            </div>
            <div className="text-sm text-text-muted">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-border">
              <div className="w-20 p-3 text-xs text-text-muted text-right border-r border-border">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              <div
                className="flex-1 min-h-[80px] p-2 hover:bg-surface cursor-pointer"
                onClick={() => onDateSelect(currentDate)}
                onDrop={(e) => handleDrop(e, currentDate)}
                onDragOver={handleDragOver}
              >
                {dayContent
                  .filter(content => {
                    const contentHour = parseInt(content.scheduledTime.split(':')[0]);
                    return contentHour === hour;
                  })
                  .map(content => (
                    <div
                      key={content.id}
                      className={`p-3 rounded-lg border-l-4 ${getClientColor(content.clientId)} bg-surface mb-2`}
                    >
                      <div className="flex items-start space-x-3">
                        <Image
                          src={content.thumbnail}
                          alt={content.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon 
                              name={getPlatformIcon(content.platform)} 
                              size={16} 
                              className="text-text-muted" 
                            />
                            <h4 className="font-medium text-text-primary">
                              {content.title}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(content.status)}`}>
                              {content.status}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary mb-2">
                            {content.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-text-muted">
                            <span>{content.clientName}</span>
                            <span>{content.scheduledTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1">
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarGrid;