import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (selectedCount === 0) return null;

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Clients',
      icon: 'CheckCircle',
      color: 'text-success',
      description: 'Set selected clients to active status'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Clients',
      icon: 'XCircle',
      color: 'text-warning',
      description: 'Set selected clients to inactive status'
    },
    {
      id: 'pause',
      label: 'Pause Services',
      icon: 'Pause',
      color: 'text-secondary',
      description: 'Temporarily pause services for selected clients'
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: 'Download',
      color: 'text-accent',
      description: 'Export selected client data to CSV'
    },
    {
      id: 'assign',
      label: 'Assign Manager',
      icon: 'UserPlus',
      color: 'text-primary',
      description: 'Assign account manager to selected clients'
    },
    {
      id: 'delete',
      label: 'Delete Clients',
      icon: 'Trash2',
      color: 'text-error',
      description: 'Permanently delete selected clients'
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-200">
      <div className="bg-background border border-border rounded-lg shadow-elevation-3 p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
              {selectedCount}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {selectedCount} client{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleActionClick('activate')}
              iconName="CheckCircle"
              iconSize={16}
            >
              Activate
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleActionClick('export')}
              iconName="Download"
              iconSize={16}
            >
              Export
            </Button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                iconName="MoreHorizontal"
                iconSize={16}
              >
                More
              </Button>

              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-background border border-border rounded-lg shadow-elevation-2 z-300">
                  <div className="p-2">
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide px-3 py-2">
                      Bulk Actions
                    </div>
                    {bulkActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action.id)}
                        className={`w-full flex items-start space-x-3 px-3 py-2 text-left hover:bg-surface rounded-md transition-smooth ${
                          action.id === 'delete' ? 'hover:bg-error-50' : ''
                        }`}
                      >
                        <Icon 
                          name={action.icon} 
                          size={16} 
                          className={`mt-0.5 ${action.color}`} 
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            action.id === 'delete' ? 'text-error' : 'text-text-primary'
                          }`}>
                            {action.label}
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

            {/* Clear Selection */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              iconSize={16}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;