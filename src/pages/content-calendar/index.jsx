import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import CalendarHeader from './components/CalendarHeader';
import ContentLibrary from './components/ContentLibrary';
import CalendarGrid from './components/CalendarGrid';
import DayDetailsPanel from './components/DayDetailsPanel';
import BulkActionsBar from './components/BulkActionsBar';

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data for clients
  const clients = [
    { id: 1, name: 'TechCorp Solutions', status: 'active', avatar: 'TC' },
    { id: 2, name: 'RetailPlus Inc', status: 'active', avatar: 'RP' },
    { id: 3, name: 'HealthFirst Medical', status: 'active', avatar: 'HF' },
    { id: 4, name: 'EcoGreen Energy', status: 'pending', avatar: 'EG' },
    { id: 5, name: 'FinanceFlow Ltd', status: 'active', avatar: 'FF' }
  ];

  // Mock scheduled content data
  const [scheduledContent, setScheduledContent] = useState([
    {
      id: 1,
      title: "Summer Sale Launch",
      description: "Announcing our biggest summer sale with up to 50% off on selected items. Don\'t miss out on these amazing deals!",
      platform: "facebook",
      type: "post",
      scheduledDate: "2024-01-20",
      scheduledTime: "09:00",
      status: "scheduled",
      clientId: 2,
      clientName: "RetailPlus Inc",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Tech Innovation Story",
      description: "Behind the scenes look at our latest AI development process and the team making it happen.",
      platform: "instagram",
      type: "story",
      scheduledDate: "2024-01-20",
      scheduledTime: "14:30",
      status: "draft",
      clientId: 1,
      clientName: "TechCorp Solutions",
      thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Health Tips Video",
      description: "Weekly health tips featuring nutrition advice and exercise routines for a healthier lifestyle.",
      platform: "youtube",
      type: "video",
      scheduledDate: "2024-01-21",
      scheduledTime: "10:00",
      status: "published",
      clientId: 3,
      clientName: "HealthFirst Medical",
      thumbnail: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Green Energy Solutions",
      description: "Showcasing our latest solar panel installations and their impact on reducing carbon footprint.",
      platform: "linkedin",
      type: "post",
      scheduledDate: "2024-01-22",
      scheduledTime: "11:15",
      status: "scheduled",
      clientId: 4,
      clientName: "EcoGreen Energy",
      thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Financial Planning Tips",
      description: "Expert advice on investment strategies and financial planning for young professionals.",
      platform: "twitter",
      type: "post",
      scheduledDate: "2024-01-23",
      scheduledTime: "16:45",
      status: "draft",
      clientId: 5,
      clientName: "FinanceFlow Ltd",
      thumbnail: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Product Demo Reel",
      description: "Quick demonstration of our new mobile app features and user interface improvements.",
      platform: "instagram",
      type: "reel",
      scheduledDate: "2024-01-24",
      scheduledTime: "13:20",
      status: "scheduled",
      clientId: 1,
      clientName: "TechCorp Solutions",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/06/15/mobile-phone-1867510_1280.jpg?w=300&h=200&fit=crop"
    }
  ]);

  // Filter content based on selected client
  const filteredContent = selectedClient === 'all' 
    ? scheduledContent 
    : scheduledContent.filter(content => content.clientId === parseInt(selectedClient));

  const handleDateNavigation = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleContentDrop = (contentData, targetDate) => {
    const newContent = {
      ...contentData,
      id: Date.now(),
      scheduledDate: targetDate.toISOString().split('T')[0],
      scheduledTime: "09:00",
      status: "draft",
      clientId: 1,
      clientName: "TechCorp Solutions"
    };
    
    setScheduledContent(prev => [...prev, newContent]);
  };

  const handleContentCreate = (newContent) => {
    setScheduledContent(prev => [...prev, newContent]);
  };

  const handleContentDrag = (content) => {
    console.log('Content being dragged:', content);
  };

  const handleBulkDelete = (items) => {
    const itemIds = items.map(item => item.id);
    setScheduledContent(prev => prev.filter(content => !itemIds.includes(content.id)));
    setSelectedItems([]);
  };

  const handleBulkStatusChange = (items, newStatus) => {
    const itemIds = items.map(item => item.id);
    setScheduledContent(prev => 
      prev.map(content => 
        itemIds.includes(content.id) 
          ? { ...content, status: newStatus }
          : content
      )
    );
    setSelectedItems([]);
  };

  const handleBulkMove = (items) => {
    console.log('Moving items:', items);
    // Handle bulk move logic
  };

  const handleSelectAll = () => {
    setSelectedItems([...filteredContent]);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-60">
          <div className="p-6">
            <Breadcrumbs />
            
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Content Calendar
              </h1>
              <p className="text-text-secondary">
                Plan, schedule, and manage content across all your clients and social platforms
              </p>
            </div>

            {/* Calendar Header */}
            <CalendarHeader
              currentDate={currentDate}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              onDateNavigation={handleDateNavigation}
              selectedClient={selectedClient}
              onClientChange={handleClientChange}
              clients={clients}
            />

            {/* Main Calendar Layout */}
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
              {/* Content Library - Left Sidebar */}
              <div className="col-span-3 hidden lg:block">
                <ContentLibrary onContentDrag={handleContentDrag} />
              </div>

              {/* Calendar Grid - Main Area */}
              <div className="col-span-12 lg:col-span-6">
                <CalendarGrid
                  currentDate={currentDate}
                  viewMode={viewMode}
                  scheduledContent={filteredContent}
                  onDateSelect={handleDateSelect}
                  onContentDrop={handleContentDrop}
                  selectedDate={selectedDate}
                  clients={clients}
                />
              </div>

              {/* Day Details Panel - Right Sidebar */}
              <div className="col-span-3 hidden lg:block">
                <DayDetailsPanel
                  selectedDate={selectedDate}
                  scheduledContent={filteredContent}
                  onContentCreate={handleContentCreate}
                  clients={clients}
                />
              </div>
            </div>

            {/* Bulk Actions Bar */}
            <BulkActionsBar
              selectedItems={selectedItems}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkDelete={handleBulkDelete}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkMove={handleBulkMove}
              totalItems={filteredContent.length}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentCalendar;