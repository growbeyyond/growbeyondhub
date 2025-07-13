import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Profile = () => {
  const { user, userProfile, updateProfile, signOut, authError, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    phone: userProfile?.phone || '',
    timezone: userProfile?.timezone || 'UTC'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (authError) clearError();
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await updateProfile(formData);
      
      if (result?.success) {
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.log('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: userProfile?.full_name || '',
      phone: userProfile?.phone || '',
      timezone: userProfile?.timezone || 'UTC'
    });
    setIsEditing(false);
    if (authError) clearError();
    if (successMessage) setSuccessMessage('');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      admin: 'Administrator',
      agency_owner: 'Agency Owner',
      agency_manager: 'Agency Manager',
      content_creator: 'Content Creator',
      client_viewer: 'Client Viewer'
    };
    return roleMap[role] || role;
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Profile Settings
              </h1>
              <p className="text-text-secondary">
                Manage your account information and preferences
              </p>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-green-600" />
                <span className="text-sm text-green-800">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-red-600" />
                <span className="text-sm text-red-800">{authError}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-background border border-border rounded-lg p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary text-white rounded-full text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {userProfile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {userProfile?.full_name}
                  </h3>
                  <p className="text-text-secondary mb-2">{userProfile?.email}</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(userProfile?.subscription_status)}`}>
                      {userProfile?.subscription_status?.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {getRoleDisplayName(userProfile?.role)}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full mb-3"
                    iconName="LogOut"
                    iconSize={16}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-xs font-medium text-text-muted">Member Since</dt>
                      <dd className="text-sm text-text-primary">
                        {new Date(userProfile?.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-text-muted">Last Login</dt>
                      <dd className="text-sm text-text-primary">
                        {userProfile?.last_login_at 
                          ? new Date(userProfile.last_login_at).toLocaleDateString()
                          : 'First time login'
                        }
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-text-muted">User ID</dt>
                      <dd className="text-xs text-text-secondary font-mono break-all">
                        {userProfile?.id}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-background border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary">
                      Personal Information
                    </h3>
                    {!isEditing && (
                      <Button
                        variant="secondary"
                        size="sm"
                        iconName="Edit"
                        iconSize={16}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-text-primary mb-2">
                        Full Name
                      </label>
                      <Input
                        id="full_name"
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={handleChange}
                        disabled={!isEditing || isSubmitting}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userProfile?.email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="mt-1 text-xs text-text-muted">
                        Email cannot be changed. Contact support if you need to update it.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing || isSubmitting}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-text-primary mb-2">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        disabled={!isEditing || isSubmitting}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text-primary disabled:bg-gray-50"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Asia/Kolkata">India</option>
                        <option value="Australia/Sydney">Sydney</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Role
                      </label>
                      <Input
                        value={getRoleDisplayName(userProfile?.role)}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="mt-1 text-xs text-text-muted">
                        Role is managed by your agency administrator.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Subscription Status
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(userProfile?.subscription_status)}`}>
                          {userProfile?.subscription_status?.toUpperCase()}
                        </span>
                        {userProfile?.subscription_ends_at && (
                          <span className="text-sm text-text-muted">
                            until {new Date(userProfile.subscription_ends_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        iconName={isSubmitting ? "Loader2" : "Save"}
                        iconSize={16}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;