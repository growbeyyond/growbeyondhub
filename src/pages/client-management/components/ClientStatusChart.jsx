import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ClientStatusChart = () => {
  const statusData = [
    { name: 'Active', value: 35, color: '#059669' },
    { name: 'Pending', value: 8, color: '#D97706' },
    { name: 'Inactive', value: 4, color: '#DC2626' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-text-secondary">{data.value} clients</p>
          <p className="text-xs text-text-muted">
            {((data.value / statusData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col space-y-2 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-primary">{entry.value}</span>
            </div>
            <span className="text-text-muted font-medium">
              {statusData.find(item => item.name === entry.value)?.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Client Status Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientStatusChart;