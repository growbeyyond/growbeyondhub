import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TopContentWidget = ({ topContent }) => {
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'blog':
        return 'FileText';
      case 'video':
        return 'Video';
      case 'image':
        return 'Image';
      case 'social':
        return 'Share2';
      default:
        return 'FileText';
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'blog':
        return 'text-primary bg-primary-50';
      case 'video':
        return 'text-error bg-error-50';
      case 'image':
        return 'text-success bg-success-50';
      case 'social':
        return 'text-accent bg-accent-50';
      default:
        return 'text-text-muted bg-surface';
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Top Performing Content</h3>
        <button className="text-text-muted hover:text-text-primary transition-smooth">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {topContent.map((content, index) => (
          <div key={content.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface transition-smooth">
            {/* Rank Badge */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index === 0 ? 'bg-warning text-white' :
              index === 1 ? 'bg-text-muted text-white' :
              index === 2 ? 'bg-warning-100 text-warning': 'bg-surface text-text-muted'
            }`}>
              {index + 1}
            </div>

            {/* Content Thumbnail */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex-shrink-0">
              {content.thumbnail ? (
                <Image 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${getContentTypeColor(content.type)}`}>
                  <Icon name={getContentTypeIcon(content.type)} size={20} />
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary truncate mb-1">
                {content.title}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-text-muted mb-2">
                <span className="capitalize">{content.type}</span>
                <span>•</span>
                <span>{content.client}</span>
                <span>•</span>
                <span>{content.publishDate}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} className="text-text-muted" />
                  <span className="text-text-primary font-medium">
                    {content.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={12} className="text-text-muted" />
                  <span className="text-text-primary font-medium">
                    {content.engagement.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Share2" size={12} className="text-text-muted" />
                  <span className="text-text-primary font-medium">
                    {content.shares.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="flex flex-col items-end">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                content.performanceChange >= 0 
                  ? 'bg-success-50 text-success' :'bg-error-50 text-error'
              }`}>
                <Icon 
                  name={content.performanceChange >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={10} 
                  className="mr-1" 
                />
                {Math.abs(content.performanceChange)}%
              </div>
              <span className="text-xs text-text-muted mt-1">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
          View All Content Performance
        </button>
      </div>
    </div>
  );
};

export default TopContentWidget;