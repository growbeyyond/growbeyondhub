import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ onFiltersChange, savedFilters, onSaveFilter }) => {
  const [activeFilters, setActiveFilters] = useState({
    client: 'all',
    platform: 'all',
    contentType: 'all',
    dateRange: '30d'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');

  const clients = [
    { value: 'all', label: 'All Clients' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'retailplus', label: 'RetailPlus Inc' },
    { value: 'healthfirst', label: 'HealthFirst Medical' },
    { value: 'ecogreen', label: 'EcoGreen Energy' },
    { value: 'financeflow', label: 'FinanceFlow Ltd' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'website', label: 'Website' }
  ];

  const contentTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'blog', label: 'Blog Posts' },
    { value: 'video', label: 'Videos' },
    { value: 'image', label: 'Images' },
    { value: 'social', label: 'Social Posts' },
    { value: 'ad', label: 'Advertisements' }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      client: 'all',
      platform: 'all',
      contentType: 'all',
      dateRange: '30d'
    };
    setActiveFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const handleSaveFilter = () => {
    if (filterName.trim()) {
      onSaveFilter?.({
        name: filterName,
        filters: activeFilters,
        createdAt: new Date().toISOString()
      });
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadSavedFilter = (savedFilter) => {
    setActiveFilters(savedFilter.filters);
    onFiltersChange?.(savedFilter.filters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all' && value !== '30d').length;
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-6">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Client Filter */}
        <div className="flex items-center space-x-2">
          <Icon name="Building" size={16} className="text-text-muted" />
          <select
            value={activeFilters.client}
            onChange={(e) => handleFilterChange('client', e.target.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {clients.map((client) => (
              <option key={client.value} value={client.value}>
                {client.label}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={16} className="text-text-muted" />
          <select
            value={activeFilters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {platforms.map((platform) => (
              <option key={platform.value} value={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Type Filter */}
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-text-muted" />
          <select
            value={activeFilters.contentType}
            onChange={(e) => handleFilterChange('contentType', e.target.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {contentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-muted" />
          <select
            value={activeFilters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconSize={16}
            >
              Clear ({getActiveFilterCount()})
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
          >
            Advanced
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            iconName="Save"
            iconSize={16}
          >
            Save Filter
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Custom Date Range */}
            {activeFilters.dateRange === 'custom' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Start Date
                  </label>
                  <Input type="date" className="w-full" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    End Date
                  </label>
                  <Input type="date" className="w-full" />
                </div>
              </>
            )}
            
            {/* Additional Filters */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                Minimum Engagement
              </label>
              <Input type="number" placeholder="0" className="w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Saved Filters */}
      {savedFilters && savedFilters.length > 0 && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Bookmark" size={16} className="text-text-muted" />
            <span className="text-sm font-medium text-text-muted">Saved Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {savedFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleLoadSavedFilter(filter)}
                className="inline-flex items-center px-3 py-1 bg-surface hover:bg-surface-100 border border-border rounded-md text-xs text-text-primary transition-smooth"
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
          <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Save Filter</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-muted mb-2">
                Filter Name
              </label>
              <Input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Enter filter name..."
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowSaveDialog(false);
                  setFilterName('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveFilter}
                disabled={!filterName.trim()}
              >
                Save Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;