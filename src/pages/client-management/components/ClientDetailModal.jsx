import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientDetailModal = ({ client, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(client || {});

  if (!isOpen || !client) return null;

  const tabs = [
    { id: 'account', label: 'Account Info', icon: 'User' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'team', label: 'Team Access', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving client data:', formData);
    setIsEditing(false);
    // Handle save logic here
  };

  const handleCancel = () => {
    setFormData(client);
    setIsEditing(false);
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center text-xl font-bold">
          {client.companyName.split(' ').map(word => word[0]).join('').substring(0, 2)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">{client.companyName}</h3>
          <p className="text-text-muted">{client.industry}</p>
          <div className="mt-2">{getStatusBadge(client.status)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Company Name</label>
          {isEditing ? (
            <Input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
          ) : (
            <p className="text-sm text-text-secondary">{client.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Industry</label>
          {isEditing ? (
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="finance">Finance & Banking</option>
              <option value="education">Education</option>
              <option value="real-estate">Real Estate</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="text-sm text-text-secondary capitalize">{client.industry}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Contact Person</label>
          {isEditing ? (
            <Input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            />
          ) : (
            <p className="text-sm text-text-secondary">{client.contactPerson}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
          {isEditing ? (
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          ) : (
            <p className="text-sm text-text-secondary">{client.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          ) : (
            <p className="text-sm text-text-secondary">{client.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
          {isEditing ? (
            <Input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          ) : (
            <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
              {client.website}
            </a>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Company Description</label>
        {isEditing ? (
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        ) : (
          <p className="text-sm text-text-secondary">{client.description}</p>
        )}
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-4 rounded-lg">
          <h4 className="font-medium text-text-primary mb-2">Current Plan</h4>
          <p className="text-2xl font-bold text-primary mb-1">{formatCurrency(client.monthlySpend)}</p>
          <p className="text-sm text-text-muted capitalize">{client.planType} Plan</p>
        </div>

        <div className="bg-surface p-4 rounded-lg">
          <h4 className="font-medium text-text-primary mb-2">Next Billing Date</h4>
          <p className="text-lg font-semibold text-text-primary">March 15, 2024</p>
          <p className="text-sm text-text-muted">Auto-renewal enabled</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-text-primary mb-4">Billing History</h4>
        <div className="space-y-3">
          {[
            { date: '2024-02-15', amount: client.monthlySpend, status: 'paid', invoice: 'INV-2024-002' },
            { date: '2024-01-15', amount: client.monthlySpend, status: 'paid', invoice: 'INV-2024-001' },
            { date: '2023-12-15', amount: client.monthlySpend, status: 'paid', invoice: 'INV-2023-012' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{bill.invoice}</p>
                <p className="text-xs text-text-muted">{new Date(bill.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{formatCurrency(bill.amount)}</p>
                <span className="text-xs bg-success text-white px-2 py-1 rounded-full">Paid</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-text-primary">Team Members</h4>
        <Button variant="primary" size="sm" iconName="Plus" iconSize={16}>
          Add Member
        </Button>
      </div>

      <div className="space-y-3">
        {[
          { name: 'John Doe', role: 'Account Manager', email: 'john@growbeyondhub.com', access: 'Full Access' },
          { name: 'Sarah Johnson', role: 'Content Strategist', email: 'sarah@growbeyondhub.com', access: 'Content Only' },
          { name: 'Mike Chen', role: 'SEO Specialist', email: 'mike@growbeyondhub.com', access: 'SEO Tools' }
        ].map((member, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{member.name}</p>
                <p className="text-xs text-text-muted">{member.role} • {member.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-primary">{member.access}</p>
              <Button variant="ghost" size="xs" iconName="Settings" iconSize={14}>
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-text-primary mb-4">Notification Preferences</h4>
        <div className="space-y-3">
          {[
            { label: 'Email notifications for campaign updates', checked: true },
            { label: 'SMS alerts for urgent issues', checked: false },
            { label: 'Weekly performance reports', checked: true },
            { label: 'Monthly billing reminders', checked: true }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <span className="text-sm text-text-primary">{setting.label}</span>
              <input
                type="checkbox"
                checked={setting.checked}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-text-primary mb-4">Account Actions</h4>
        <div className="space-y-3">
          <Button variant="outline" fullWidth iconName="Download" iconSize={16}>
            Export Client Data
          </Button>
          <Button variant="outline" fullWidth iconName="Archive" iconSize={16}>
            Archive Account
          </Button>
          <Button variant="danger" fullWidth iconName="Trash2" iconSize={16}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-background rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">Client Details</h2>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconSize={16}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  iconName="Save"
                  iconSize={16}
                >
                  Save
                </Button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'account' && renderAccountTab()}
          {activeTab === 'billing' && renderBillingTab()}
          {activeTab === 'team' && renderTeamTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;