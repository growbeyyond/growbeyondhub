import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientTable = ({ clients, onClientSelect, onBulkAction, selectedClients, onSelectionChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedClients = React.useMemo(() => {
    if (!sortConfig.key) return clients;

    return [...clients].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number') {
        return sortConfig.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [clients, sortConfig]);

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(clients.map(client => client.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectClient = (clientId, checked) => {
    if (checked) {
      onSelectionChange([...selectedClients, clientId]);
    } else {
      onSelectionChange(selectedClients.filter(id => id !== clientId));
    }
  };

  const isAllSelected = selectedClients.length === clients.length && clients.length > 0;
  const isPartiallySelected = selectedClients.length > 0 && selectedClients.length < clients.length;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-white', label: 'Active' },
      pending: { color: 'bg-warning text-white', label: 'Pending' },
      inactive: { color: 'bg-error text-white', label: 'Inactive' },
      paused: { color: 'bg-secondary text-white', label: 'Paused' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const planConfig = {
      starter: { color: 'bg-accent-50 text-accent border border-accent-200', label: 'Starter' },
      professional: { color: 'bg-primary-50 text-primary border border-primary-200', label: 'Professional' },
      enterprise: { color: 'bg-success-50 text-success border border-success-200', label: 'Enterprise' },
      custom: { color: 'bg-warning-50 text-warning border border-warning-200', label: 'Custom' }
    };

    const config = planConfig[plan] || planConfig.starter;
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('companyName')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Company</span>
                  {getSortIcon('companyName')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('contactPerson')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Contact Person</span>
                  {getSortIcon('contactPerson')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('planType')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Plan</span>
                  {getSortIcon('planType')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('monthlySpend')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Monthly Spend</span>
                  {getSortIcon('monthlySpend')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-smooth"
                >
                  <span>Last Activity</span>
                  {getSortIcon('lastActivity')}
                </button>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedClients.map((client) => (
              <tr
                key={client.id}
                className={`hover:bg-surface transition-smooth cursor-pointer ${
                  selectedClients.includes(client.id) ? 'bg-primary-50' : ''
                }`}
                onMouseEnter={() => setHoveredRow(client.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onClientSelect(client)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={(e) => handleSelectClient(client.id, e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-medium">
                      {client.companyName.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{client.companyName}</p>
                      <p className="text-xs text-text-muted">{client.industry}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{client.contactPerson}</p>
                    <p className="text-xs text-text-muted">{client.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {getPlanBadge(client.planType)}
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-text-primary">{formatCurrency(client.monthlySpend)}</p>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(client.status)}
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-text-primary">{formatDate(client.lastActivity)}</p>
                </td>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={16}
                      onClick={() => onClientSelect(client)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      iconSize={16}
                      onClick={() => console.log('Edit client:', client.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart3"
                      iconSize={16}
                      onClick={() => console.log('View reports:', client.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No clients found</h3>
          <p className="text-text-muted mb-4">Get started by adding your first client</p>
          <Button variant="primary" iconName="Plus" iconSize={16}>
            Add Client
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientTable;