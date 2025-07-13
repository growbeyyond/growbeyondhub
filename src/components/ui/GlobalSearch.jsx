import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';


const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Mock search data
  const searchData = [
    // Clients
    { id: 1, type: 'client', title: 'TechCorp Solutions', subtitle: 'Technology Client', path: '/client-management', icon: 'Building' },
    { id: 2, type: 'client', title: 'RetailPlus Inc', subtitle: 'Retail Client', path: '/client-management', icon: 'Building' },
    
    // Content
    { id: 3, type: 'content', title: 'Digital Marketing Trends 2024', subtitle: 'Blog Post • TechCorp', path: '/content-creation', icon: 'FileText' },
    { id: 4, type: 'content', title: 'Social Media Campaign Q1', subtitle: 'Campaign • RetailPlus', path: '/content-calendar', icon: 'Calendar' },
    { id: 5, type: 'content', title: 'Product Launch Video', subtitle: 'Video Content • TechCorp', path: '/content-creation', icon: 'Video' },
    
    // Reports
    { id: 6, type: 'report', title: 'Monthly Performance Report', subtitle: 'Analytics Report • TechCorp', path: '/report-builder', icon: 'FileBarChart' },
    { id: 7, type: 'report', title: 'Social Media Analytics', subtitle: 'Social Report • RetailPlus', path: '/analytics-dashboard', icon: 'BarChart3' },
    
    // Campaigns
    { id: 8, type: 'campaign', title: 'Summer Sale Campaign', subtitle: 'Active Campaign • RetailPlus', path: '/content-calendar', icon: 'Megaphone' },
    { id: 9, type: 'campaign', title: 'Brand Awareness Drive', subtitle: 'Scheduled Campaign • TechCorp', path: '/content-calendar', icon: 'Target' }
  ];

  const categoryConfig = {
    client: { label: 'Clients', color: 'text-primary', bgColor: 'bg-primary-50' },
    content: { label: 'Content', color: 'text-accent', bgColor: 'bg-accent-50' },
    report: { label: 'Reports', color: 'text-success', bgColor: 'bg-success-50' },
    campaign: { label: 'Campaigns', color: 'text-warning', bgColor: 'bg-warning-50' }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = (searchQuery) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Group by category
      const grouped = filtered.reduce((acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      }, {});
      
      setResults(grouped);
      setLoading(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    const allResults = Object.values(results).flat();
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allResults[selectedIndex]) {
          handleResultClick(allResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        setResults([]);
        break;
    }
  };

  const handleResultClick = (result) => {
    console.log('Navigate to:', result.path, result);
    setIsOpen(false);
    setQuery('');
    setResults([]);
    // Here you would typically use navigate(result.path)
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('[data-global-search]')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyboardShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  const renderResults = () => {
    if (loading) {
      return (
        <div className="p-4 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-text-muted">Searching...</p>
        </div>
      );
    }

    if (Object.keys(results).length === 0 && query.trim()) {
      return (
        <div className="p-4 text-center">
          <Icon name="Search" size={24} className="text-text-muted mx-auto mb-2" />
          <p className="text-sm text-text-muted">No results found</p>
          <p className="text-xs text-text-muted mt-1">Try different keywords</p>
        </div>
      );
    }

    let currentIndex = 0;
    return Object.entries(results).map(([category, items]) => (
      <div key={category} className="mb-4 last:mb-0">
        <div className="px-4 py-2 border-b border-border">
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-wide">
            {categoryConfig[category]?.label || category}
          </h3>
        </div>
        <div className="py-2">
          {items.map((item) => {
            const isSelected = currentIndex === selectedIndex;
            const itemIndex = currentIndex++;
            
            return (
              <button
                key={item.id}
                onClick={() => handleResultClick(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth ${
                  isSelected ? 'bg-primary text-white' : 'hover:bg-surface'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-white bg-opacity-20' : categoryConfig[category]?.bgColor || 'bg-surface'
                }`}>
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className={isSelected ? 'text-white' : categoryConfig[category]?.color || 'text-text-muted'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    isSelected ? 'text-white' : 'text-text-primary'
                  }`}>
                    {item.title}
                  </p>
                  <p className={`text-xs truncate ${
                    isSelected ? 'text-white text-opacity-80' : 'text-text-muted'
                  }`}>
                    {item.subtitle}
                  </p>
                </div>
                <Icon 
                  name="ArrowUpRight" 
                  size={14} 
                  className={isSelected ? 'text-white text-opacity-60' : 'text-text-muted'} 
                />
              </button>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="relative" data-global-search>
      {/* Search Input */}
      <div className="relative">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search everything... (⌘K)"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-md text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || Object.keys(results).length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-elevation-2 z-300 max-h-96 overflow-hidden">
          <div className="max-h-96 overflow-y-auto" ref={resultsRef}>
            {renderResults()}
          </div>
          
          {/* Footer */}
          {Object.keys(results).length > 0 && (
            <div className="px-4 py-2 border-t border-border bg-surface">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">↑↓</kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">↵</kbd>
                    <span>Select</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">esc</kbd>
                    <span>Close</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;