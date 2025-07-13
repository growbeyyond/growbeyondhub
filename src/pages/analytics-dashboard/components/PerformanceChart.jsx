import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = ({ data, clients, selectedClient, onClientChange }) => {
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(['reach', 'engagement']);
  const [dateRange, setDateRange] = useState('7d');

  const availableMetrics = [
    { key: 'reach', label: 'Reach', color: '#2563EB' },
    { key: 'engagement', label: 'Engagement', color: '#059669' },
    { key: 'conversions', label: 'Conversions', color: '#D97706' },
    { key: 'clicks', label: 'Clicks', color: '#0EA5E9' }
  ];

  const dateRanges = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
    { key: '1y', label: '1 Year' }
  ];

  const handleMetricToggle = (metricKey) => {
    setSelectedMetrics(prev => 
      prev.includes(metricKey)
        ? prev.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-muted">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">Performance Overview</h2>
          <p className="text-sm text-text-muted">Track key metrics across all campaigns</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-1 bg-surface rounded-lg p-1">
            {dateRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => setDateRange(range.key)}
                className={`px-3 py-1 text-xs rounded-md transition-smooth ${
                  dateRange === range.key
                    ? 'bg-primary text-white' :'text-text-muted hover:text-text-primary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-1 bg-surface rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-smooth ${
                chartType === 'line' ?'bg-primary text-white' :'text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-smooth ${
                chartType === 'bar' ?'bg-primary text-white' :'text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
          
          {/* Export Button */}
          <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
            Export
          </Button>
        </div>
      </div>

      {/* Metric Toggles */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {availableMetrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => handleMetricToggle(metric.key)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
              selectedMetrics.includes(metric.key)
                ? 'bg-primary text-white' :'bg-surface text-text-muted hover:bg-surface-100'
            }`}
          >
            <div 
              className="w-2 h-2 rounded-full mr-2" 
              style={{ backgroundColor: selectedMetrics.includes(metric.key) ? 'white' : metric.color }}
            ></div>
            {metric.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              {selectedMetrics.map((metricKey) => {
                const metric = availableMetrics.find(m => m.key === metricKey);
                return (
                  <Line
                    key={metricKey}
                    type="monotone"
                    dataKey={metricKey}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={{ fill: metric.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: metric.color, strokeWidth: 2 }}
                  />
                );
              })}
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              {selectedMetrics.map((metricKey, index) => {
                const metric = availableMetrics.find(m => m.key === metricKey);
                return (
                  <Bar
                    key={metricKey}
                    dataKey={metricKey}
                    fill={metric.color}
                    radius={[2, 2, 0, 0]}
                  />
                );
              })}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;