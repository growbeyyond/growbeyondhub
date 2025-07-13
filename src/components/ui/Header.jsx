import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import GlobalSearch from './GlobalSearch';
import NotificationCenter from './NotificationCenter';

const Header = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut, loading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" iconName="Menu" iconSize={20} />
          </div>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-text-primary hidden sm:block">
              GrowBeyondHub
            </span>
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <GlobalSearch />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" iconName="Search" iconSize={20} />
          </div>

          {/* Notifications */}
          <NotificationCenter />

          {/* User Profile / Auth */}
          {loading ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user && userProfile ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface transition-colors"
              >
                <div className="w-8 h-8 bg-primary text-white rounded-full text-sm font-medium flex items-center justify-center">
                  {userProfile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-text-primary">
                    {userProfile?.full_name}
                  </p>
                  <p className="text-xs text-text-muted capitalize">
                    {userProfile?.role?.replace('_', ' ')}
                  </p>
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-muted" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-elevation-2 py-1 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">
                      {userProfile?.full_name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {userProfile?.email}
                    </p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Icon name="BarChart3" size={16} />
                    <span>Dashboard</span>
                  </Link>
                  
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:bg-surface"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <GlobalSearch />
      </div>

      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;