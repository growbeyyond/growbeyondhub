import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddClientModal = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: '',
    industry: 'technology',
    website: '',
    description: '',
    
    // Contact Info
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    
    // Plan & Billing
    planType: 'professional',
    monthlySpend: 2500,
    billingCycle: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    
    // Team Assignment
    accountManager: 'john-doe',
    teamMembers: []
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'Building' },
    { id: 2, title: 'Contact Details', icon: 'User' },
    { id: 3, title: 'Plan & Billing', icon: 'CreditCard' },
    { id: 4, title: 'Team Assignment', icon: 'Users' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.website.trim()) newErrors.website = 'Website is required';
        break;
      case 2:
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        break;
      case 3:
        if (!formData.monthlySpend || formData.monthlySpend <= 0) newErrors.monthlySpend = 'Monthly spend must be greater than 0';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSave(formData);
      onClose();
      // Reset form
      setFormData({
        companyName: '',
        industry: 'technology',
        website: '',
        description: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        planType: 'professional',
        monthlySpend: 2500,
        billingCycle: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        accountManager: 'john-doe',
        teamMembers: []
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company Name *
              </label>
              <Input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
                className={errors.companyName ? 'border-error' : ''}
              />
              {errors.companyName && (
                <p className="text-xs text-error mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Industry
              </label>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Website *
              </label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.com"
                className={errors.website ? 'border-error' : ''}
              />
              {errors.website && (
                <p className="text-xs text-error mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the company and their business"
                rows={4}
                className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contact Person *
              </label>
              <Input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Primary contact name"
                className={errors.contactPerson ? 'border-error' : ''}
              />
              {errors.contactPerson && (
                <p className="text-xs text-error mt-1">{errors.contactPerson}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@company.com"
                className={errors.email ? 'border-error' : ''}
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={errors.phone ? 'border-error' : ''}
              />
              {errors.phone && (
                <p className="text-xs text-error mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Business Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Complete business address"
                rows={3}
                className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Plan Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'starter', label: 'Starter', price: '$500-$1,500', features: 'Basic social media management' },
                  { value: 'professional', label: 'Professional', price: '$1,500-$5,000', features: 'Full marketing suite' },
                  { value: 'enterprise', label: 'Enterprise', price: '$5,000+', features: 'Custom solutions' },
                  { value: 'custom', label: 'Custom', price: 'Variable', features: 'Tailored package' }
                ].map((plan) => (
                  <div
                    key={plan.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
                      formData.planType === plan.value
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                    }`}
                    onClick={() => handleInputChange('planType', plan.value)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        checked={formData.planType === plan.value}
                        onChange={() => handleInputChange('planType', plan.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="font-medium text-text-primary">{plan.label}</span>
                    </div>
                    <p className="text-sm text-primary font-medium">{plan.price}</p>
                    <p className="text-xs text-text-muted">{plan.features}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Monthly Spend *
              </label>
              <Input
                type="number"
                value={formData.monthlySpend}
                onChange={(e) => handleInputChange('monthlySpend', parseInt(e.target.value))}
                placeholder="2500"
                className={errors.monthlySpend ? 'border-error' : ''}
              />
              {errors.monthlySpend && (
                <p className="text-xs text-error mt-1">{errors.monthlySpend}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Billing Cycle
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) => handleInputChange('billingCycle', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Start Date
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Account Manager
              </label>
              <select
                value={formData.accountManager}
                onChange={(e) => handleInputChange('accountManager', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="john-doe">John Doe</option>
                <option value="sarah-johnson">Sarah Johnson</option>
                <option value="mike-chen">Mike Chen</option>
                <option value="emily-davis">Emily Davis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Additional Team Members
              </label>
              <div className="space-y-2">
                {[
                  { id: 'content-strategist', name: 'Content Strategist', assigned: false },
                  { id: 'seo-specialist', name: 'SEO Specialist', assigned: true },
                  { id: 'social-media-manager', name: 'Social Media Manager', assigned: true },
                  { id: 'graphic-designer', name: 'Graphic Designer', assigned: false }
                ].map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <input
                      type="checkbox"
                      checked={member.assigned}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-primary">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent-50 p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Setup Summary</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-text-muted">Company:</span> {formData.companyName}</p>
                <p><span className="text-text-muted">Contact:</span> {formData.contactPerson}</p>
                <p><span className="text-text-muted">Plan:</span> {formData.planType} (${formData.monthlySpend}/month)</p>
                <p><span className="text-text-muted">Manager:</span> {formData.accountManager.replace('-', ' ')}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-background rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Add New Client</h2>
            <p className="text-sm text-text-muted">Step {currentStep} of {steps.length}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-primary text-white' :'bg-surface text-text-muted border border-border'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-text-primary">{steps[currentStep - 1].title}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconSize={16}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < steps.length ? (
              <Button
                variant="primary"
                onClick={handleNext}
                iconName="ChevronRight"
                iconSize={16}
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                iconName="Check"
                iconSize={16}
              >
                Create Client
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;