import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import TopContentWidget from './components/TopContentWidget';
import PlatformBreakdown from './components/PlatformBreakdown';
import GoalTracking from './components/GoalTracking';
import FilterToolbar from './components/FilterToolbar';
import Icon from '../../components/AppIcon';

const AnalyticsDashboard = () => {
  const [selectedClient, setSelectedClient] = useState('TechCorp Solutions');
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [savedFilters, setSavedFilters] = useState([
    { name: 'High Performing Content', filters: { client: 'all', platform: 'all', contentType: 'all', dateRange: '7d' } },
    { name: 'Social Media Focus', filters: { client: 'all', platform: 'instagram', contentType: 'social', dateRange: '30d' } }
  ]);

  // Mock data for metrics
  const metricsData = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: 12.5,
      trend: [45000, 52000, 48000, 61000, 55000, 67000, 72000],
      icon: 'Eye',
      color: 'primary'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: 8.2,
      trend: [3.2, 3.8, 4.1, 4.5, 4.2, 4.6, 4.8],
      icon: 'Heart',
      color: 'success'
    },
    {
      title: 'Conversions',
      value: '1,247',
      change: -2.1,
      trend: [180, 220, 195, 240, 210, 185, 205],
      icon: 'Target',
      color: 'warning'
    },
    {
      title: 'ROI',
      value: '324%',
      change: 15.8,
      trend: [280, 295, 310, 285, 320, 315, 324],
      icon: 'TrendingUp',
      color: 'accent'
    }
  ];

  // Mock data for performance chart
  const performanceData = [
    { date: 'Jan 1', reach: 45000, engagement: 2200, conversions: 180, clicks: 3400 },
    { date: 'Jan 2', reach: 52000, engagement: 2800, conversions: 220, clicks: 4100 },
    { date: 'Jan 3', reach: 48000, engagement: 2400, conversions: 195, clicks: 3800 },
    { date: 'Jan 4', reach: 61000, engagement: 3200, conversions: 240, clicks: 4800 },
    { date: 'Jan 5', reach: 55000, engagement: 2900, conversions: 210, clicks: 4200 },
    { date: 'Jan 6', reach: 67000, engagement: 3600, conversions: 185, clicks: 5100 },
    { date: 'Jan 7', reach: 72000, engagement: 4100, conversions: 205, clicks: 5800 }
  ];

  // Mock data for top content
  const topContentData = [
    {
      id: 1,
      title: 'Digital Marketing Trends 2024',
      type: 'blog',
      client: 'TechCorp',
      publishDate: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      views: 15420,
      engagement: 892,
      shares: 234,
      performanceChange: 23.5
    },
    {
      id: 2,
      title: 'Product Launch Video',
      type: 'video',
      client: 'RetailPlus',
      publishDate: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      views: 28750,
      engagement: 1456,
      shares: 567,
      performanceChange: 18.2
    },
    {
      id: 3,
      title: 'Health Tips Infographic',
      type: 'image',
      client: 'HealthFirst',
      publishDate: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      views: 9830,
      engagement: 654,
      shares: 123,
      performanceChange: -5.1
    },
    {
      id: 4,
      title: 'Sustainability Campaign',
      type: 'social',
      client: 'EcoGreen',
      publishDate: '5 days ago',
      thumbnail: null,
      views: 12400,
      engagement: 789,
      shares: 345,
      performanceChange: 31.7
    },
    {
      id: 5,
      title: 'Financial Planning Guide',
      type: 'blog',
      client: 'FinanceFlow',
      publishDate: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      views: 7650,
      engagement: 423,
      shares: 89,
      performanceChange: 12.3
    }
  ];

  // Mock data for platform breakdown
  const platformData = [
    { platform: 'facebook', value: 45000, color: '#1877F2', percentage: 32.1 },
    { platform: 'instagram', value: 38000, color: '#E4405F', percentage: 27.1 },
    { platform: 'linkedin', value: 25000, color: '#0A66C2', percentage: 17.9 },
    { platform: 'twitter', value: 18000, color: '#1DA1F2', percentage: 12.9 },
    { platform: 'youtube', value: 14000, color: '#FF0000', percentage: 10.0 }
  ];

  // Mock data for goals
  const goalsData = [
    {
      id: 1,
      title: 'Q1 Lead Generation',
      client: 'TechCorp Solutions',
      current: 847,
      target: 1000,
      progress: 84.7,
      status: 'on-track',
      dueDate: 'Mar 31, 2024',
      timeRemaining: '18 days',
      dailyTarget: 8.5
    },
    {
      id: 2,
      title: 'Brand Awareness Campaign',
      client: 'RetailPlus Inc',
      current: 125000,
      target: 150000,
      progress: 83.3,
      status: 'on-track',
      dueDate: 'Feb 28, 2024',
      timeRemaining: '12 days',
      dailyTarget: 2083
    },
    {
      id: 3,
      title: 'Social Media Engagement',
      client: 'HealthFirst Medical',
      current: 2400,
      target: 5000,
      progress: 48.0,
      status: 'at-risk',
      dueDate: 'Mar 15, 2024',
      timeRemaining: '25 days',
      dailyTarget: 104
    },
    {
      id: 4,
      title: 'Website Traffic Growth',
      client: 'EcoGreen Energy',
      current: 15600,
      target: 20000,
      progress: 78.0,
      status: 'on-track',
      dueDate: 'Apr 30, 2024',
      timeRemaining: '45 days',
      dailyTarget: 98
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleFiltersChange = (filters) => {
    console.log('Filters changed:', filters);
    // Handle filter changes - would typically trigger data refetch
  };

  const handleSaveFilter = (filter) => {
    setSavedFilters(prev => [...prev, filter]);
  };

  const handleExportData = (format) => {
    console.log('Exporting data in format:', format);
    // Handle data export
  };

  const handleScheduleReport = () => {
    console.log('Opening schedule report dialog');
    // Handle report scheduling
  };

  const handleGenerateReport = () => {
    console.log('Generating report for:', selectedClient);
    // Handle report generation
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-60 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <Breadcrumbs />
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">
                    Analytics Dashboard
                  </h1>
                  <p className="text-text-muted">
                    Track performance metrics and campaign effectiveness across all clients
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Icon name="Clock" size={16} />
                    <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    iconName={refreshing ? "Loader2" : "RefreshCw"}
                    iconSize={16}
                    className={refreshing ? "animate-spin" : ""}
                  >
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportData('csv')}
                      iconName="Download"
                      iconSize={16}
                    >
                      Export Data
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleScheduleReport}
                      iconName="Calendar"
                      iconSize={16}
                    >
                      Schedule Report
                    </Button>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleGenerateReport}
                      iconName="FileText"
                      iconSize={16}
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Toolbar */}
            <FilterToolbar
              onFiltersChange={handleFiltersChange}
              savedFilters={savedFilters}
              onSaveFilter={handleSaveFilter}
            />

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metricsData.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  trend={metric.trend}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Performance Chart - Takes 2 columns */}
              <div className="lg:col-span-2">
                <PerformanceChart
                  data={performanceData}
                  selectedClient={selectedClient}
                  onClientChange={setSelectedClient}
                />
              </div>

              {/* Right Panel - Takes 1 column */}
              <div className="space-y-6">
                <PlatformBreakdown platformData={platformData} />
                <GoalTracking goals={goalsData.slice(0, 2)} />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopContentWidget topContent={topContentData} />
              <GoalTracking goals={goalsData.slice(2)} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;