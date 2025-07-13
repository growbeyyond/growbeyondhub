import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContentCard = ({ content, onEdit, onDelete, onDuplicate, onStatusChange }) => {
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

  const getClientColor = (clientId) => {
    const colors = [
      'border-l-primary',
      'border-l-accent',
      'border-l-success',
      'border-l-warning',
      'border-l-error'
    ];
    return colors[clientId % colors.length];
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    const statuses = ['draft', 'scheduled', 'published', 'failed'];
    const currentIndex = statuses.indexOf(content.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    onStatusChange?.(content.id, nextStatus);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-3 hover:shadow-md transition-smooth border-l-4 ${getClientColor(content.clientId)}`}>
      <div className="flex items-start space-x-3">
        {/* Thumbnail */}
        <div className="relative">
          <Image
            src={content.thumbnail}
            alt={content.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center">
            <Icon 
              name={getPlatformIcon(content.platform)} 
              size={12} 
              className="text-text-muted" 
            />
          </div>
        </div>

        {/* Content Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Icon 
              name={getTypeIcon(content.type)} 
              size={14} 
              className="text-text-muted" 
            />
            <button
              onClick={handleStatusClick}
              className={`px-2 py-1 rounded text-xs transition-smooth hover:opacity-80 ${getStatusColor(content.status)}`}
            >
              {content.status}
            </button>
          </div>
          
          <h4 className="font-medium text-text-primary text-sm mb-1 truncate">
            {content.title}
          </h4>
          
          <p className="text-xs text-text-secondary mb-2 line-clamp-2">
            {content.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="truncate">{content.clientName}</span>
            <span>{content.scheduledTime}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-1 mt-3 pt-3 border-t border-border">
        <button
          onClick={() => onEdit?.(content)}
          className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-100 rounded transition-smooth"
          title="Edit"
        >
          <Icon name="Edit" size={14} />
        </button>
        <button
          onClick={() => onDuplicate?.(content)}
          className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-100 rounded transition-smooth"
          title="Duplicate"
        >
          <Icon name="Copy" size={14} />
        </button>
        <button
          onClick={() => onDelete?.(content.id)}
          className="p-1 text-text-muted hover:text-error hover:bg-error-50 rounded transition-smooth"
          title="Delete"
        >
          <Icon name="Trash2" size={14} />
        </button>
      </div>
    </div>
  );
};

export default ContentCard;