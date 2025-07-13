import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onDateNavigation, 
  selectedClient, 
  onClientChange,
  clients 
}) => {
  const formatDate = (date, mode) => {
    const options = {
      month: mode === 'month' ? { month: 'long', year: 'numeric' } : { month: 'short' },
      week: { month: 'short', day: 'numeric' },
      day: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };
    
    return date.toLocaleDateString('en-US', options[mode]);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateNavigation(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateNavigation(newDate);
  };

  const handleToday = () => {
    onDateNavigation(new Date());
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left Section - Date Navigation */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <h2 className="text-xl font-heading font-semibold text-text-primary min-w-[200px]">
            {formatDate(currentDate, viewMode)}
          </h2>
          <button
            onClick={handleNext}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToday}
        >
          Today
        </Button>
      </div>

      {/* Right Section - View Controls */}
      <div className="flex items-center space-x-4">
        {/* Client Filter */}
        <div className="relative">
          <select
            value={selectedClient}
            onChange={(e) => onClientChange(e.target.value)}
            className="appearance-none bg-surface border border-border rounded-md px-3 py-2 pr-8 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Clients</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none" 
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-surface border border-border rounded-md p-1">
          {['month', 'week', 'day'].map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-3 py-1 text-sm rounded transition-smooth capitalize ${
                viewMode === mode
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Create Content Button */}
        <Button
          variant="primary"
          iconName="Plus"
          iconSize={16}
        >
          Create Content
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;