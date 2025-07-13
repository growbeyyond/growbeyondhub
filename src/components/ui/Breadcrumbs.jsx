import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', parent: null },
    '/client-management': { label: 'Client Management', parent: null },
    '/content-calendar': { label: 'Content Calendar', parent: null },
    '/content-creation': { label: 'Content Creation', parent: null },
    '/analytics-dashboard': { label: 'Analytics Dashboard', parent: null },
    '/report-builder': { label: 'Report Builder', parent: null }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Home/Dashboard
    breadcrumbs.push({
      label: 'Home',
      path: '/dashboard',
      isActive: false
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          isActive: index === pathSegments.length - 1
        });
      }
    });

    // Remove duplicate home entries
    if (breadcrumbs.length > 1 && breadcrumbs[0].path === breadcrumbs[1].path) {
      breadcrumbs.shift();
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  // Don't render breadcrumbs on dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-muted" 
            />
          )}
          
          {breadcrumb.isActive ? (
            <span className="text-text-primary font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            <button
              onClick={() => handleBreadcrumbClick(breadcrumb.path)}
              className="text-text-secondary hover:text-text-primary transition-smooth"
            >
              {breadcrumb.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;