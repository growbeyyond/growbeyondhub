import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ContentLibrary = ({ onContentDrag }) => {
  const [activeTab, setActiveTab] = useState('drafts');
  const [searchQuery, setSearchQuery] = useState('');

  const contentItems = {
    drafts: [
      {
        id: 1,
        title: "Summer Sale Announcement",
        type: "post",
        platform: "facebook",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
        client: "RetailPlus Inc",
        status: "draft",
        createdAt: "2024-01-15"
      },
      {
        id: 2,
        title: "Tech Innovation Story",
        type: "story",
        platform: "instagram",
        thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=300&h=200&fit=crop",
        client: "TechCorp Solutions",
        status: "draft",
        createdAt: "2024-01-14"
      },
      {
        id: 3,
        title: "Health Tips Video",
        type: "video",
        platform: "youtube",
        thumbnail: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=300&h=200&fit=crop",
        client: "HealthFirst Medical",
        status: "draft",
        createdAt: "2024-01-13"
      }
    ],
    templates: [
      {
        id: 4,
        title: "Product Launch Template",
        type: "template",
        platform: "multi",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
        client: "Template",
        status: "template",
        createdAt: "2024-01-10"
      },
      {
        id: 5,
        title: "Event Promotion Template",
        type: "template",
        platform: "multi",
        thumbnail: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=300&h=200&fit=crop",
        client: "Template",
        status: "template",
        createdAt: "2024-01-08"
      }
    ],
    assets: [
      {
        id: 6,
        title: "Brand Logo Collection",
        type: "image",
        platform: "multi",
        thumbnail: "https://images.pixabay.com/photo/2016/12/27/13/10/logo-1933884_1280.png?w=300&h=200&fit=crop",
        client: "Assets",
        status: "asset",
        createdAt: "2024-01-05"
      },
      {
        id: 7,
        title: "Stock Photos Bundle",
        type: "image",
        platform: "multi",
        thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
        client: "Assets",
        status: "asset",
        createdAt: "2024-01-03"
      }
    ]
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'Youtube',
      twitter: 'Twitter',
      linkedin: 'Linkedin',
      multi: 'Globe'
    };
    return icons[platform] || 'Globe';
  };

  const getTypeIcon = (type) => {
    const icons = {
      post: 'FileText',
      story: 'Image',
      video: 'Video',
      template: 'Layout',
      image: 'Image'
    };
    return icons[type] || 'FileText';
  };

  const filteredItems = contentItems[activeTab]?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.client.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    onContentDrag?.(item);
  };

  return (
    <div className="bg-background border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary mb-3">
          Content Library
        </h3>
        
        {/* Search */}
        <div className="relative mb-3">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
          />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-border rounded-md placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {[
            { key: 'drafts', label: 'Drafts', count: contentItems.drafts.length },
            { key: 'templates', label: 'Templates', count: contentItems.templates.length },
            { key: 'assets', label: 'Assets', count: contentItems.assets.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-2 py-1 text-xs rounded transition-smooth ${
                activeTab === tab.key
                  ? 'bg-primary text-white' :'text-text-muted hover:text-text-primary hover:bg-surface'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredItems.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className="bg-surface border border-border rounded-lg p-3 cursor-move hover:shadow-md transition-smooth group"
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center">
                  <Icon 
                    name={getPlatformIcon(item.platform)} 
                    size={12} 
                    className="text-text-muted" 
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {item.title}
                  </h4>
                  <Icon 
                    name={getTypeIcon(item.type)} 
                    size={14} 
                    className="text-text-muted ml-2" 
                  />
                </div>
                <p className="text-xs text-text-muted mt-1 truncate">
                  {item.client}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Drag Indicator */}
            <div className="mt-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="GripVertical" size={16} className="text-text-muted" />
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">No content found</p>
            <p className="text-xs text-text-muted mt-1">
              {searchQuery ? 'Try different keywords' : 'Create your first content'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          iconName="Plus"
          iconSize={16}
        >
          Create New
        </Button>
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="Sparkles"
          iconSize={16}
        >
          Generate with AI
        </Button>
      </div>
    </div>
  );
};

export default ContentLibrary;