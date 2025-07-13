import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ComponentLibrary = ({ onComponentDrag }) => {
  const [activeCategory, setActiveCategory] = useState('metrics');
  const [searchQuery, setSearchQuery] = useState('');

  const componentCategories = {
    metrics: {
      label: 'Metrics',
      icon: 'BarChart3',
      components: [
        { id: 'kpi-card', name: 'KPI Card', icon: 'TrendingUp', description: 'Display key performance indicators' },
        { id: 'metric-grid', name: 'Metrics Grid', icon: 'Grid3X3', description: 'Grid layout for multiple metrics' },
        { id: 'comparison-card', name: 'Comparison Card', icon: 'ArrowUpDown', description: 'Compare two metrics side by side' },
        { id: 'progress-bar', name: 'Progress Bar', icon: 'BarChart2', description: 'Show progress towards goals' }
      ]
    },
    charts: {
      label: 'Charts',
      icon: 'PieChart',
      components: [
        { id: 'line-chart', name: 'Line Chart', icon: 'TrendingUp', description: 'Show trends over time' },
        { id: 'bar-chart', name: 'Bar Chart', icon: 'BarChart3', description: 'Compare values across categories' },
        { id: 'pie-chart', name: 'Pie Chart', icon: 'PieChart', description: 'Show proportional data' },
        { id: 'area-chart', name: 'Area Chart', icon: 'Activity', description: 'Filled line chart for volume data' },
        { id: 'donut-chart', name: 'Donut Chart', icon: 'Circle', description: 'Pie chart with center space' }
      ]
    },
    tables: {
      label: 'Tables',
      icon: 'Table',
      components: [
        { id: 'data-table', name: 'Data Table', icon: 'Table', description: 'Structured data display' },
        { id: 'ranking-table', name: 'Ranking Table', icon: 'List', description: 'Ordered list with rankings' },
        { id: 'comparison-table', name: 'Comparison Table', icon: 'Columns', description: 'Side-by-side comparisons' }
      ]
    },
    content: {
      label: 'Content',
      icon: 'FileText',
      components: [
        { id: 'text-block', name: 'Text Block', icon: 'Type', description: 'Rich text content' },
        { id: 'image-block', name: 'Image Block', icon: 'Image', description: 'Images and graphics' },
        { id: 'logo-block', name: 'Logo Block', icon: 'Hexagon', description: 'Client or agency logos' },
        { id: 'divider', name: 'Divider', icon: 'Minus', description: 'Section separators' }
      ]
    }
  };

  const templates = [
    { id: 'monthly-report', name: 'Monthly Performance Report', preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' },
    { id: 'social-media', name: 'Social Media Analytics', preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop' },
    { id: 'seo-report', name: 'SEO Performance Report', preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop' },
    { id: 'campaign-summary', name: 'Campaign Summary', preview: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=200&fit=crop' }
  ];

  const filteredComponents = componentCategories[activeCategory]?.components.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'component',
      component: component
    }));
    onComponentDrag?.(component);
  };

  const handleTemplateSelect = (template) => {
    console.log('Template selected:', template);
  };

  return (
    <div className="h-full bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">
          Component Library
        </h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-border rounded-md placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {Object.entries(componentCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-md transition-smooth ${
                activeCategory === key
                  ? 'bg-primary text-white' :'text-text-muted hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name={category.icon} size={14} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              className="p-3 bg-surface border border-border rounded-md hover:bg-surface-100 cursor-grab active:cursor-grabbing transition-smooth"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-50 rounded-md flex items-center justify-center">
                  <Icon name={component.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {component.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {component.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates Section */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-text-primary mb-3">Quick Start Templates</h3>
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-surface border border-border rounded-md overflow-hidden mb-2 group-hover:border-primary transition-smooth">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs text-text-secondary group-hover:text-text-primary transition-smooth">
                  {template.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibrary;