import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import AnalyticsDashboard from "pages/analytics-dashboard";
import ReportBuilder from "pages/report-builder";
import ContentCalendar from "pages/content-calendar";
import ClientManagement from "pages/client-management";
import ContentCreation from "pages/content-creation";
import Signin from "pages/auth/Signin";
import Signup from "pages/auth/Signup";
import Profile from "pages/auth/Profile";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Authentication routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Application routes - accessible in preview mode */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/report-builder" element={<ReportBuilder />} />
        <Route path="/content-calendar" element={<ContentCalendar />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/content-creation" element={<ContentCreation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;