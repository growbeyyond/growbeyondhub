import React from 'react';

import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedItems, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDelete, 
  onBulkStatusChange,
  onBulkMove,
  totalItems 
}) => {
  const selectedCount = selectedItems.length;
  const allSelected = selectedCount === totalItems;

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg shadow-elevation-2 p-4 z-200">
      <div className="flex items-center space-x-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary text-white rounded flex items-center justify-center text-xs font-medium">
            {selectedCount}
          </div>
          <span className="text-sm text-text-primary">
            {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border"></div>

        {/* Select All/Deselect All */}
        <Button
          variant="ghost"
          size="sm"
          onClick={allSelected ? onDeselectAll : onSelectAll}
          iconName={allSelected ? "X" : "CheckSquare"}
          iconSize={16}
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </Button>

        {/* Divider */}
        <div className="w-px h-6 bg-border"></div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-2">
          {/* Status Change */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              iconName="CheckCircle"
              iconSize={16}
            >
              Status
            </Button>
            
            {/* Status Dropdown */}
            <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-lg shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <div className="p-2 space-y-1">
                {[
                  { status: 'draft', label: 'Mark as Draft', color: 'text-warning' },
                  { status: 'scheduled', label: 'Mark as Scheduled', color: 'text-accent' },
                  { status: 'published', label: 'Mark as Published', color: 'text-success' },
                  { status: 'failed', label: 'Mark as Failed', color: 'text-error' }
                ].map(({ status, label, color }) => (
                  <button
                    key={status}
                    onClick={() => onBulkStatusChange?.(selectedItems, status)}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-surface transition-smooth ${color}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Move to Date */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconSize={16}
            onClick={() => onBulkMove?.(selectedItems)}
          >
            Move
          </Button>

          {/* Duplicate */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            iconSize={16}
            onClick={() => {
              selectedItems.forEach(item => {
                // Handle bulk duplicate
                console.log('Duplicate item:', item);
              });
            }}
          >
            Duplicate
          </Button>

          {/* Export */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconSize={16}
            onClick={() => {
              // Handle bulk export
              console.log('Export items:', selectedItems);
            }}
          >
            Export
          </Button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border"></div>

        {/* Delete */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Trash2"
          iconSize={16}
          onClick={() => onBulkDelete?.(selectedItems)}
          className="text-error hover:text-error hover:bg-error-50"
        >
          Delete
        </Button>

        {/* Close */}
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconSize={16}
          onClick={onDeselectAll}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;