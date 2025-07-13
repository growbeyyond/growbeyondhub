import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const PerformanceChart = () => {
  const [chartType, setChartType] = useState('line');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const data = [
    { name: 'Mon', engagement: 4200, reach: 8500, clicks: 320, conversions: 45 },
    { name: 'Tue', engagement: 3800, reach: 7200, clicks: 280, conversions: 38 },
    { name: 'Wed', engagement: 5100, reach: 9800, clicks: 420, conversions: 62 },
    { name: 'Thu', engagement: 4600, reach: 8900, clicks: 380, conversions: 51 },
    { name: 'Fri', engagement: 6200, reach: 12000, clicks: 520, conversions: 78 },
    { name: 'Sat', engagement: 5800, reach: 11200, clicks: 480, conversions: 69 },
    { name: 'Sun', engagement: 4900, reach: 9500, clicks: 410, conversions: 58 }
  ];

  const metrics = [
    { key: 'engagement', label: 'Engagement', color: '#2563EB', icon: 'Heart' },
    { key: 'reach', label: 'Reach', color: '#0EA5E9', icon: 'Users' },
    { key: 'clicks', label: 'Clicks', color: '#059669', icon: 'MousePointer' },
    { key: 'conversions', label: 'Conversions', color: '#D97706', icon: 'Target' }
  ];

  const dateRanges = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
    { key: '1y', label: '1 Year' }
  ];

  const selectedMetricData = metrics.find(m => m.key === selectedMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">
                {entry.name}: {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Campaign Performance
          </h2>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-surface rounded-md p-1">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 text-xs rounded transition-smooth ${
                  chartType === 'line' ?'bg-primary text-white' :'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon name="TrendingUp" size={14} />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 text-xs rounded transition-smooth ${
                  chartType === 'bar' ?'bg-primary text-white' :'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon name="BarChart3" size={14} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-smooth ${
                  selectedMetric === metric.key
                    ? 'bg-primary text-white' :'text-text-muted hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={metric.icon} size={14} />
                <span>{metric.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            {dateRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => setDateRange(range.key)}
                className={`px-3 py-1 text-xs rounded transition-smooth ${
                  dateRange === range.key
                    ? 'bg-primary text-white' :'text-text-muted hover:text-text-primary hover:bg-surface'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={selectedMetricData?.color}
                  strokeWidth={3}
                  dot={{ fill: selectedMetricData?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: selectedMetricData?.color, strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={selectedMetric}
                  fill={selectedMetricData?.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;