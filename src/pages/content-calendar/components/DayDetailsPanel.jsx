import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const DayDetailsPanel = ({ selectedDate, scheduledContent, onContentCreate, clients }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddForm, setQuickAddForm] = useState({
    title: '',
    platform: 'facebook',
    time: '09:00',
    client: '',
    type: 'post'
  });

  const dayContent = scheduledContent.filter(content => {
    if (!selectedDate) return false;
    const dateStr = selectedDate.toISOString().split('T')[0];
    return content.scheduledDate === dateStr;
  }).sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'Youtube',
      twitter: 'Twitter',
      linkedin: 'Linkedin'
    };
    return icons[platform] || 'Globe';
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-accent text-white',
      published: 'bg-success text-white',
      draft: 'bg-warning text-white',
      failed: 'bg-error text-white'
    };
    return colors[status] || 'bg-secondary text-white';
  };

  const getTypeIcon = (type) => {
    const icons = {
      post: 'FileText',
      story: 'Image',
      video: 'Video',
      reel: 'Film'
    };
    return icons[type] || 'FileText';
  };

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    if (!quickAddForm.title.trim() || !quickAddForm.client) return;

    const newContent = {
      id: Date.now(),
      title: quickAddForm.title,
      platform: quickAddForm.platform,
      scheduledTime: quickAddForm.time,
      scheduledDate: selectedDate.toISOString().split('T')[0],
      clientId: parseInt(quickAddForm.client),
      clientName: clients.find(c => c.id === parseInt(quickAddForm.client))?.name || '',
      type: quickAddForm.type,
      status: 'draft',
      description: `Quick add content for ${quickAddForm.platform}`,
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop"
    };

    onContentCreate?.(newContent);
    setQuickAddForm({
      title: '',
      platform: 'facebook',
      time: '09:00',
      client: '',
      type: 'post'
    });
    setShowQuickAdd(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  if (!selectedDate) {
    return (
      <div className="bg-background border-l border-border h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-heading font-semibold text-text-primary">
            Day Details
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Select a date to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-text-primary">
            {formatDate(selectedDate)}
          </h3>
          {isToday(selectedDate) && (
            <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
              Today
            </span>
          )}
        </div>
        <p className="text-sm text-text-muted">
          {dayContent.length} {dayContent.length === 1 ? 'post' : 'posts'} scheduled
        </p>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto">
        {dayContent.length > 0 ? (
          <div className="p-4 space-y-4">
            {dayContent.map(content => (
              <div
                key={content.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-smooth"
              >
                <div className="flex items-start space-x-3">
                  <Image
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={getPlatformIcon(content.platform)} 
                        size={16} 
                        className="text-text-muted" 
                      />
                      <Icon 
                        name={getTypeIcon(content.type)} 
                        size={14} 
                        className="text-text-muted" 
                      />
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(content.status)}`}>
                        {content.status}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-text-primary mb-1">
                      {content.title}
                    </h4>
                    
                    <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                      {content.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{content.clientName}</span>
                      <span>{content.scheduledTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-border">
                  <Button variant="ghost" size="xs" iconName="Edit" iconSize={14}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="xs" iconName="Copy" iconSize={14}>
                    Duplicate
                  </Button>
                  <Button variant="ghost" size="xs" iconName="Trash2" iconSize={14}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-muted mb-2">No content scheduled</p>
              <p className="text-sm text-text-muted">
                Add content to this date to get started
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Form */}
      {showQuickAdd && (
        <div className="border-t border-border p-4 bg-surface">
          <form onSubmit={handleQuickAddSubmit} className="space-y-3">
            <div>
              <Input
                type="text"
                placeholder="Content title..."
                value={quickAddForm.title}
                onChange={(e) => setQuickAddForm(prev => ({ ...prev, title: e.target.value }))}
                className="text-sm"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <select
                value={quickAddForm.platform}
                onChange={(e) => setQuickAddForm(prev => ({ ...prev, platform: e.target.value }))}
                className="appearance-none bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
              
              <select
                value={quickAddForm.type}
                onChange={(e) => setQuickAddForm(prev => ({ ...prev, type: e.target.value }))}
                className="appearance-none bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="post">Post</option>
                <option value="story">Story</option>
                <option value="video">Video</option>
                <option value="reel">Reel</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="time"
                value={quickAddForm.time}
                onChange={(e) => setQuickAddForm(prev => ({ ...prev, time: e.target.value }))}
                className="text-sm"
              />
              
              <select
                value={quickAddForm.client}
                onChange={(e) => setQuickAddForm(prev => ({ ...prev, client: e.target.value }))}
                className="appearance-none bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="flex-1"
              >
                Add Content
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowQuickAdd(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {!showQuickAdd && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            iconName="Plus"
            iconSize={16}
            onClick={() => setShowQuickAdd(true)}
          >
            Quick Add Content
          </Button>
        )}
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

export default DayDetailsPanel;