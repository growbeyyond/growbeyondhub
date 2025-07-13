import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ComponentLibrary from './components/ComponentLibrary';
import ReportCanvas from './components/ReportCanvas';
import ReportSettings from './components/ReportSettings';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ReportBuilder = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [reportComponents, setReportComponents] = useState([]);
  const [reportTitle, setReportTitle] = useState('Untitled Report');
  const [lastSaved, setLastSaved] = useState(null);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const handleComponentUpdate = (componentId, updates) => {
    setReportComponents(prev =>
      prev.map(comp =>
        comp.id === componentId ? { ...comp, ...updates } : comp
      )
    );
  };

  const handleSaveReport = () => {
    const reportData = {
      title: reportTitle,
      components: reportComponents,
      lastModified: new Date().toISOString()
    };
    
    // Mock save operation
    console.log('Saving report:', reportData);
    setLastSaved(new Date());
    
    // Show success notification
    // In a real app, this would be handled by a notification system
  };

  const handlePreviewReport = () => {
    console.log('Previewing report with components:', reportComponents);
    // Open preview modal or new window
  };

  const handleExportReport = (format) => {
    console.log('Exporting report as:', format);
    // Handle export logic
  };

  const handleNewReport = () => {
    setReportComponents([]);
    setSelectedComponent(null);
    setReportTitle('Untitled Report');
    setLastSaved(null);
  };

  const handleLoadTemplate = (templateId) => {
    console.log('Loading template:', templateId);
    // Load template components
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-60">
          {/* Page Header */}
          <div className="bg-background border-b border-border px-6 py-4">
            <Breadcrumbs />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    Report Builder
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Create custom reports with drag-and-drop components
                  </p>
                </div>
                
                {/* Report Title Editor */}
                <div className="hidden md:block">
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="px-3 py-1 bg-surface border border-border rounded-md text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Report title"
                  />
                  {lastSaved && (
                    <p className="text-xs text-text-muted mt-1">
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="FileText"
                  iconSize={16}
                  onClick={handleNewReport}
                >
                  New Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Save"
                  iconSize={16}
                  onClick={handleSaveReport}
                >
                  Save
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconSize={16}
                  onClick={handlePreviewReport}
                >
                  Preview
                </Button>
                
                <div className="relative group">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Download"
                    iconSize={16}
                  >
                    Export
                  </Button>
                  
                  {/* Export Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="py-2">
                      <button
                        onClick={() => handleExportReport('pdf')}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        <Icon name="FileText" size={16} />
                        <span>Export as PDF</span>
                      </button>
                      <button
                        onClick={() => handleExportReport('excel')}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        <Icon name="FileSpreadsheet" size={16} />
                        <span>Export as Excel</span>
                      </button>
                      <button
                        onClick={() => handleExportReport('powerpoint')}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        <Icon name="Presentation" size={16} />
                        <span>Export as PowerPoint</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Builder Interface */}
          <div className="h-[calc(100vh-8rem)] flex">
            {/* Component Library - Left Sidebar */}
            <div className="w-80 hidden lg:block">
              <ComponentLibrary
                onComponentDrag={(component) => {
                  console.log('Component dragged:', component);
                }}
              />
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 min-w-0">
              <ReportCanvas
                onComponentSelect={handleComponentSelect}
                selectedComponent={selectedComponent}
                components={reportComponents}
                onComponentsChange={setReportComponents}
              />
            </div>

            {/* Settings Panel - Right Sidebar */}
            <div className="w-80 hidden xl:block">
              <ReportSettings
                selectedComponent={selectedComponent}
                onComponentUpdate={handleComponentUpdate}
              />
            </div>
          </div>

          {/* Mobile/Tablet Bottom Panel */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Package"
                  iconSize={16}
                >
                  Components
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  iconSize={16}
                >
                  Settings
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconSize={16}
                  onClick={handlePreviewReport}
                >
                  Preview
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Download"
                  iconSize={16}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions Floating Button - Mobile */}
          <div className="lg:hidden fixed bottom-20 right-4 z-50">
            <div className="relative group">
              <Button
                variant="primary"
                shape="circle"
                size="lg"
                iconName="Plus"
                iconSize={20}
              />
              
              {/* Quick Actions Menu */}
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-background border border-border rounded-lg shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth">
                    <Icon name="BarChart3" size={16} />
                    <span>Add Chart</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth">
                    <Icon name="TrendingUp" size={16} />
                    <span>Add KPI</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth">
                    <Icon name="Table" size={16} />
                    <span>Add Table</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-text-primary hover:bg-surface transition-smooth">
                    <Icon name="Type" size={16} />
                    <span>Add Text</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportBuilder;