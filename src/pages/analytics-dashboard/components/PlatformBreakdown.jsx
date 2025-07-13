import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const PlatformBreakdown = ({ platformData }) => {
  const platformConfig = {
    facebook: { color: '#1877F2', icon: 'Facebook' },
    instagram: { color: '#E4405F', icon: 'Instagram' },
    twitter: { color: '#1DA1F2', icon: 'Twitter' },
    linkedin: { color: '#0A66C2', icon: 'Linkedin' },
    youtube: { color: '#FF0000', icon: 'Youtube' },
    tiktok: { color: '#000000', icon: 'Music' },
    website: { color: '#059669', icon: 'Globe' }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-elevation-2">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            ></div>
            <span className="text-sm font-medium text-text-primary capitalize">
              {data.platform}
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Engagement:</span>
              <span className="font-medium text-text-primary">
                {data.value.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Percentage:</span>
              <span className="font-medium text-text-primary">
                {data.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalEngagement = platformData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Platform Breakdown</h3>
        <button className="text-text-muted hover:text-text-primary transition-smooth">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>

      {/* Pie Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {platformData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Platform List */}
      <div className="space-y-3">
        {platformData.map((platform) => {
          const config = platformConfig[platform.platform] || { color: '#64748B', icon: 'Globe' };
          const percentage = ((platform.value / totalEngagement) * 100).toFixed(1);
          
          return (
            <div key={platform.platform} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: platform.color }}
                >
                  <Icon name={config.icon} size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary capitalize">
                    {platform.platform}
                  </p>
                  <p className="text-xs text-text-muted">
                    {platform.value.toLocaleString()} engagements
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {percentage}%
                </p>
                <div className="w-16 h-2 bg-surface rounded-full mt-1">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: platform.color 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Total Engagement</span>
          <span className="font-semibold text-text-primary">
            {totalEngagement.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlatformBreakdown;