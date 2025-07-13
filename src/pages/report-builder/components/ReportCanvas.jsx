import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCanvas = ({ onComponentSelect, selectedComponent }) => {
  const [components, setComponents] = useState([
    {
      id: 'header-1',
      type: 'text-block',
      x: 20,
      y: 20,
      width: 560,
      height: 80,
      content: 'Monthly Performance Report - TechCorp Solutions',
      style: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
    },
    {
      id: 'kpi-1',
      type: 'kpi-card',
      x: 20,
      y: 120,
      width: 180,
      height: 120,
      data: { value: '2,847', label: 'Total Visitors', change: '+12.5%', trend: 'up' }
    },
    {
      id: 'kpi-2',
      type: 'kpi-card',
      x: 220,
      y: 120,
      width: 180,
      height: 120,
      data: { value: '18.7%', label: 'Conversion Rate', change: '+2.3%', trend: 'up' }
    },
    {
      id: 'kpi-3',
      type: 'kpi-card',
      x: 420,
      y: 120,
      width: 180,
      height: 120,
      data: { value: '$12,450', label: 'Revenue', change: '+8.9%', trend: 'up' }
    }
  ]);

  const [draggedComponent, setDraggedComponent] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const canvasRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'component') {
        const newComponent = {
          id: `${data.component.id}-${Date.now()}`,
          type: data.component.id,
          x: Math.max(0, x - 50),
          y: Math.max(0, y - 25),
          width: getDefaultWidth(data.component.id),
          height: getDefaultHeight(data.component.id),
          content: getDefaultContent(data.component.id),
          data: getDefaultData(data.component.id)
        };
        setComponents(prev => [...prev, newComponent]);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  const getDefaultWidth = (type) => {
    switch (type) {
      case 'kpi-card': return 180;
      case 'line-chart': return 400;
      case 'bar-chart': return 400;
      case 'data-table': return 500;
      case 'text-block': return 300;
      default: return 200;
    }
  };

  const getDefaultHeight = (type) => {
    switch (type) {
      case 'kpi-card': return 120;
      case 'line-chart': return 250;
      case 'bar-chart': return 250;
      case 'data-table': return 200;
      case 'text-block': return 60;
      default: return 100;
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'text-block': return 'Enter your text here...';
      default: return null;
    }
  };

  const getDefaultData = (type) => {
    switch (type) {
      case 'kpi-card': return { value: '0', label: 'New Metric', change: '0%', trend: 'neutral' };
      default: return null;
    }
  };

  const handleComponentClick = (component) => {
    onComponentSelect?.(component);
  };

  const handleComponentDelete = (componentId) => {
    setComponents(prev => prev.filter(c => c.id !== componentId));
    if (selectedComponent?.id === componentId) {
      onComponentSelect?.(null);
    }
  };

  const renderComponent = (component) => {
    const isSelected = selectedComponent?.id === component.id;

    switch (component.type) {
      case 'text-block':
        return (
          <div
            className={`absolute border-2 transition-all ${
              isSelected ? 'border-primary bg-primary-50' : 'border-transparent hover:border-border'
            }`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height
            }}
            onClick={() => handleComponentClick(component)}
          >
            <div
              className="w-full h-full p-2 text-text-primary"
              style={component.style}
            >
              {component.content}
            </div>
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleComponentDelete(component.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            )}
          </div>
        );

      case 'kpi-card':
        return (
          <div
            className={`absolute border-2 transition-all ${
              isSelected ? 'border-primary bg-primary-50' : 'border-transparent hover:border-border'
            }`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height
            }}
            onClick={() => handleComponentClick(component)}
          >
            <div className="w-full h-full bg-background border border-border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-text-primary">
                  {component.data?.value || '0'}
                </span>
                <div className={`flex items-center space-x-1 text-sm ${
                  component.data?.trend === 'up' ? 'text-success' : 
                  component.data?.trend === 'down' ? 'text-error' : 'text-text-muted'
                }`}>
                  <Icon 
                    name={component.data?.trend === 'up' ? 'TrendingUp' : 
                          component.data?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                  />
                  <span>{component.data?.change || '0%'}</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                {component.data?.label || 'Metric Label'}
              </p>
            </div>
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleComponentDelete(component.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            )}
          </div>
        );

      default:
        return (
          <div
            className={`absolute border-2 transition-all ${
              isSelected ? 'border-primary bg-primary-50' : 'border-transparent hover:border-border'
            }`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height
            }}
            onClick={() => handleComponentClick(component)}
          >
            <div className="w-full h-full bg-surface border border-border rounded-md flex items-center justify-center">
              <div className="text-center">
                <Icon name="Package" size={24} className="text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted">{component.type}</p>
              </div>
            </div>
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleComponentDelete(component.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-surface flex flex-col">
      {/* Canvas Header */}
      <div className="p-4 bg-background border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Report Canvas
            </h2>
            <p className="text-sm text-text-secondary">
              Drag components from the library to build your report
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="RotateCcw" iconSize={16}>
              Undo
            </Button>
            <Button variant="ghost" size="sm" iconName="RotateCw" iconSize={16}>
              Redo
            </Button>
            <Button variant="outline" size="sm" iconName="Eye" iconSize={16}>
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Paper */}
          <div
            ref={canvasRef}
            className="relative bg-background border border-border rounded-lg shadow-sm min-h-[800px] w-full"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => onComponentSelect?.(null)}
          >
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #000 1px, transparent 1px),
                  linear-gradient(to bottom, #000 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Drop Zone Indicator */}
            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="MousePointer2" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    Start Building Your Report
                  </h3>
                  <p className="text-text-secondary max-w-md">
                    Drag components from the library on the left to create your custom report layout
                  </p>
                </div>
              </div>
            )}

            {/* Render Components */}
            {components.map(component => (
              <div key={component.id}>
                {renderComponent(component)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCanvas;