import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ClientContextSelector = ({ onClientChange, selectedClient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'TechCorp Solutions', 
      status: 'active', 
      avatar: 'TC',
      industry: 'Technology',
      lastActivity: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'RetailPlus Inc', 
      status: 'active', 
      avatar: 'RP',
      industry: 'Retail',
      lastActivity: '1 day ago'
    },
    { 
      id: 3, 
      name: 'HealthFirst Medical', 
      status: 'active', 
      avatar: 'HF',
      industry: 'Healthcare',
      lastActivity: '3 hours ago'
    },
    { 
      id: 4, 
      name: 'EcoGreen Energy', 
      status: 'pending', 
      avatar: 'EG',
      industry: 'Energy',
      lastActivity: '1 week ago'
    },
    { 
      id: 5, 
      name: 'FinanceFlow Ltd', 
      status: 'active', 
      avatar: 'FF',
      industry: 'Finance',
      lastActivity: '5 hours ago'
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientSelect = (client) => {
    onClientChange?.(client);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'inactive':
        return 'text-error';
      default:
        return 'text-text-muted';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'inactive':
        return 'bg-error';
      default:
        return 'bg-text-muted';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('[data-client-selector]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" data-client-selector>
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-3 bg-surface border border-border rounded-md hover:bg-surface-100 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-primary text-white rounded-lg text-sm flex items-center justify-center font-medium">
              {selectedClient?.avatar || 'TC'}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusDot(selectedClient?.status || 'active')} rounded-full border-2 border-background`}></div>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-text-primary truncate">
              {selectedClient?.name || 'TechCorp Solutions'}
            </p>
            <p className="text-xs text-text-muted truncate">
              {selectedClient?.industry || 'Technology'}
            </p>
          </div>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-muted transition-transform" 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-elevation-2 z-200 max-h-80 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
              />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-border rounded-md placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Client List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface transition-smooth"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary text-white rounded-lg text-sm flex items-center justify-center font-medium">
                      {client.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusDot(client.status)} rounded-full border-2 border-background`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {client.name}
                      </p>
                      {selectedClient?.id === client.id && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-text-muted truncate">
                        {client.industry}
                      </p>
                      <p className={`text-xs ${getStatusColor(client.status)} capitalize`}>
                        {client.status}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      Last activity: {client.lastActivity}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center">
                <Icon name="Search" size={24} className="text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted">No clients found</p>
                <p className="text-xs text-text-muted mt-1">Try adjusting your search</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              fullWidth 
              iconName="Plus" 
              iconSize={16}
              onClick={() => {
                setIsOpen(false);
                // Handle add new client
                console.log('Add new client');
              }}
            >
              Add New Client
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientContextSelector;