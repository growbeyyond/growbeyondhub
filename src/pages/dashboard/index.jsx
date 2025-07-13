import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ClientContextSelector from '../../components/ui/ClientContextSelector';
import GlobalSearch from '../../components/ui/GlobalSearch';
import NotificationCenter from '../../components/ui/NotificationCenter';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import PerformanceChart from './components/PerformanceChart';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState({
    id: 1,
    name: 'TechCorp Solutions',
    status: 'active',
    avatar: 'TC',
    industry: 'Technology'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  // Mock metrics data
  const metrics = [
    {
      title: 'Total Clients',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'Users',
      trend: 75,
      onClick: () => navigate('/client-management')
    },
    {
      title: 'Active Campaigns',
      value: '18',
      change: '+8%',
      changeType: 'positive',
      icon: 'Rocket',
      trend: 60,
      onClick: () => navigate('/content-calendar')
    },
    {
      title: 'Pending Approvals',
      value: '7',
      change: '-15%',
      changeType: 'negative',
      icon: 'Clock',
      trend: 30,
      onClick: () => navigate('/content-creation')
    },
    {
      title: 'Monthly Revenue',
      value: '$48,250',
      change: '+23%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: 85,
      onClick: () => navigate('/analytics-dashboard')
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowWelcome(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide welcome message
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const handleClientChange = (client) => {
    setSelectedClient(client);
    // Here you would typically fetch data for the selected client
    console.log('Client changed to:', client);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'create-content': navigate('/content-creation');
        break;
      case 'schedule-post': navigate('/content-calendar');
        break;
      case 'generate-report': navigate('/report-builder');
        break;
      case 'view-analytics': navigate('/analytics-dashboard');
        break;
      default:
        console.log('Quick action:', action);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <Sidebar />
      
      {/* Welcome Toast */}
      {showWelcome && (
        <div className="fixed top-20 right-6 bg-success text-white px-6 py-3 rounded-lg shadow-elevation-2 z-300 animate-slide-in-right">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">Welcome back! Dashboard updated.</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Dashboard Overview
              </h1>
              <p className="text-text-secondary">
                Monitor your agency's performance and manage client campaigns
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="w-80">
                <GlobalSearch />
              </div>
              <NotificationCenter />
              <Button
                variant="primary"
                iconName="Plus"
                iconSize={16}
                onClick={() => handleQuickAction('create-content')}
              >
                Create Content
              </Button>
            </div>
          </div>

          {/* Client Context Selector */}
          <div className="mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-sm font-medium text-text-primary">
                    Current Workspace:
                  </h2>
                  <div className="w-64">
                    <ClientContextSelector
                      selectedClient={selectedClient}
                      onClientChange={handleClientChange}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: 2 minutes ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                trend={metric.trend}
                onClick={metric.onClick}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Activity Feed - Left Column */}
            <div className="lg:col-span-4">
              <ActivityFeed />
            </div>

            {/* Performance Chart - Center Column */}
            <div className="lg:col-span-5">
              <PerformanceChart />
            </div>

            {/* Quick Actions - Right Column */}
            <div className="lg:col-span-3">
              <QuickActions />
            </div>
          </div>

          {/* Additional Dashboard Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Client Performance Summary */}
            <div className="bg-background border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Top Performing Clients
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'TechCorp Solutions', growth: '+34%', revenue: '$12,450' },
                    { name: 'RetailPlus Inc', growth: '+28%', revenue: '$9,800' },
                    { name: 'HealthFirst Medical', growth: '+22%', revenue: '$8,650' },
                    { name: 'EcoGreen Energy', growth: '+18%', revenue: '$7,200' }
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-lg text-xs flex items-center justify-center font-medium">
                          {client.name.split(' ').map(word => word[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{client.name}</p>
                          <p className="text-xs text-success">{client.growth} growth</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-text-primary">{client.revenue}</p>
                        <p className="text-xs text-text-muted">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-background border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Upcoming Deadlines
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { task: 'Q1 Report for TechCorp', due: 'Today, 5:00 PM', priority: 'high' },
                    { task: 'Social Media Calendar Review', due: 'Tomorrow, 10:00 AM', priority: 'medium' },
                    { task: 'RetailPlus Campaign Launch', due: 'Jan 15, 2:00 PM', priority: 'high' },
                    { task: 'Content Approval Meeting', due: 'Jan 16, 11:00 AM', priority: 'low' }
                  ].map((deadline, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        deadline.priority === 'high' ? 'bg-error' :
                        deadline.priority === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{deadline.task}</p>
                        <p className="text-xs text-text-muted">{deadline.due}</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-text-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;