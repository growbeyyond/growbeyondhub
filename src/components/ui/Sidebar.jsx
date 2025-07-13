import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedClient, setSelectedClient] = useState('TechCorp Solutions');
  const [clientSelectorOpen, setClientSelectorOpen] = useState(false);

  const clients = [
    { id: 1, name: 'TechCorp Solutions', status: 'active', avatar: 'TC' },
    { id: 2, name: 'RetailPlus Inc', status: 'active', avatar: 'RP' },
    { id: 3, name: 'HealthFirst Medical', status: 'active', avatar: 'HF' },
    { id: 4, name: 'EcoGreen Energy', status: 'pending', avatar: 'EG' },
    { id: 5, name: 'FinanceFlow Ltd', status: 'active', avatar: 'FF' }
  ];

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and key metrics'
    },
    {
      label: 'Client Management',
      path: '/client-management',
      icon: 'Users',
      tooltip: 'Manage client accounts and relationships'
    },
    {
      label: 'Content Calendar',
      path: '/content-calendar',
      icon: 'Calendar',
      tooltip: 'Schedule and manage content publishing'
    },
    {
      label: 'Content Creation',
      path: '/content-creation',
      icon: 'FileText',
      tooltip: 'Create and edit marketing content'
    },
    {
      label: 'Analytics Dashboard',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Performance metrics and insights'
    },
    {
      label: 'Report Builder',
      path: '/report-builder',
      icon: 'FileBarChart',
      tooltip: 'Generate custom client reports'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client.name);
    setClientSelectorOpen(false);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-100"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-background border-r border-border z-100 transition-all duration-300 ease-smooth
        ${isExpanded ? 'w-60' : 'w-16'}
        lg:translate-x-0 ${isExpanded ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {isExpanded && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-lg text-text-primary">
                GrowBeyondHub
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth lg:hidden"
          >
            <Icon name={isExpanded ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Client Selector */}
        {isExpanded && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <button
                onClick={() => setClientSelectorOpen(!clientSelectorOpen)}
                className="w-full flex items-center justify-between p-3 bg-surface border border-border rounded-md hover:bg-surface-100 transition-smooth"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary text-white rounded text-xs flex items-center justify-center font-medium">
                    TC
                  </div>
                  <span className="text-sm font-medium text-text-primary truncate">
                    {selectedClient}
                  </span>
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-muted" />
              </button>

              {/* Client Dropdown */}
              {clientSelectorOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-elevation-2 z-200 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search clients..."
                      className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-md placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="py-2">
                    {clients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleClientSelect(client)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface transition-smooth"
                      >
                        <div className="w-6 h-6 bg-primary text-white rounded text-xs flex items-center justify-center font-medium">
                          {client.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {client.name}
                          </p>
                          <p className={`text-xs ${
                            client.status === 'active' ? 'text-success' : 'text-warning'
                          }`}>
                            {client.status}
                          </p>
                        </div>
                        {selectedClient === client.name && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border">
                    <Button variant="ghost" size="sm" fullWidth iconName="Plus" iconSize={16}>
                      Add New Client
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-smooth group relative
                    ${isActiveRoute(item.path)
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }
                  `}
                  title={!isExpanded ? item.tooltip : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActiveRoute(item.path) ? 'text-white' : 'text-current'}
                  />
                  {isExpanded && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-300">
                      {item.tooltip}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {isExpanded && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-surface rounded-md">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                <p className="text-xs text-text-muted truncate">Agency Owner</p>
              </div>
              <button className="p-1 text-text-muted hover:text-text-primary transition-smooth">
                <Icon name="Settings" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Collapse Toggle for Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-background border border-border rounded-full items-center justify-center text-text-muted hover:text-text-primary transition-smooth"
        >
          <Icon name={isExpanded ? "ChevronLeft" : "ChevronRight"} size={14} />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;