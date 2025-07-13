import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const ClientFilters = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = {
    planType: [
      { value: 'all', label: 'All Plans' },
      { value: 'starter', label: 'Starter ($500-$1,500)' },
      { value: 'professional', label: 'Professional ($1,500-$5,000)' },
      { value: 'enterprise', label: 'Enterprise ($5,000+)' },
      { value: 'custom', label: 'Custom Package' }
    ],
    status: [
      { value: 'all', label: 'All Status' },
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending Setup' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'paused', label: 'Paused' }
    ],
    industry: [
      { value: 'all', label: 'All Industries' },
      { value: 'technology', label: 'Technology' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'retail', label: 'Retail & E-commerce' },
      { value: 'finance', label: 'Finance & Banking' },
      { value: 'education', label: 'Education' },
      { value: 'real-estate', label: 'Real Estate' },
      { value: 'other', label: 'Other' }
    ],
    dateRange: [
      { value: 'all', label: 'All Time' },
      { value: 'last-7-days', label: 'Last 7 Days' },
      { value: 'last-30-days', label: 'Last 30 Days' },
      { value: 'last-90-days', label: 'Last 90 Days' },
      { value: 'this-year', label: 'This Year' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value
    };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      planType: 'all',
      status: 'all',
      industry: 'all',
      dateRange: 'all'
    };
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconSize={16}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Plan Type</label>
          <select
            value={activeFilters.planType}
            onChange={(e) => handleFilterChange('planType', e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.planType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
          <select
            value={activeFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.status.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Industry</label>
          <select
            value={activeFilters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.industry.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
          <select
            value={activeFilters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.dateRange.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Advanced Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Monthly Spend Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span className="text-text-muted">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Account Manager</label>
              <select className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="all">All Managers</option>
                <option value="john-doe">John Doe</option>
                <option value="sarah-johnson">Sarah Johnson</option>
                <option value="mike-chen">Mike Chen</option>
                <option value="emily-davis">Emily Davis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Contract Type</label>
              <select className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="all">All Contracts</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
                <option value="project-based">Project-based</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFilters;