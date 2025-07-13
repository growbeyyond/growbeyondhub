import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformPreview = ({ content, selectedPlatforms, mediaFiles }) => {
  const [activePreview, setActivePreview] = useState(selectedPlatforms[0] || 'facebook');

  const platformConfigs = {
    facebook: {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      maxChars: 2200,
      aspectRatio: '16:9'
    },
    instagram: {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      maxChars: 2200,
      aspectRatio: '1:1'
    },
    twitter: {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      bgColor: 'bg-blue-50',
      maxChars: 280,
      aspectRatio: '16:9'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      maxChars: 3000,
      aspectRatio: '1.91:1'
    },
    youtube: {
      name: 'YouTube',
      icon: 'Youtube',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      maxChars: 5000,
      aspectRatio: '16:9'
    },
    tiktok: {
      name: 'TikTok',
      icon: 'Music',
      color: 'text-black',
      bgColor: 'bg-gray-50',
      maxChars: 2200,
      aspectRatio: '9:16'
    }
  };

  const mockUser = {
    name: "TechCorp Solutions",
    username: "@techcorp",
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face",
    verified: true
  };

  const formatContent = (text, platform) => {
    const config = platformConfigs[platform];
    if (!config) return text;

    let formattedText = text;
    
    // Truncate if over limit
    if (formattedText.length > config.maxChars) {
      formattedText = formattedText.substring(0, config.maxChars - 3) + '...';
    }

    // Format hashtags
    formattedText = formattedText.replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>');
    
    // Format mentions
    formattedText = formattedText.replace(/@(\w+)/g, '<span class="text-primary font-medium">@$1</span>');
    
    // Format URLs
    formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<span class="text-primary underline">$1</span>');

    return formattedText;
  };

  const renderPlatformPreview = (platform) => {
    const config = platformConfigs[platform];
    if (!config) return null;

    const formattedContent = formatContent(content, platform);

    switch (platform) {
      case 'facebook':
        return (
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center space-x-3">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <h4 className="font-medium text-text-primary">{mockUser.name}</h4>
                  {mockUser.verified && (
                    <Icon name="CheckCircle" size={16} className="text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-text-muted">2 hours ago • 🌍</p>
              </div>
              <button className="p-1 text-text-muted hover:text-text-primary">
                <Icon name="MoreHorizontal" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <div 
                className="text-text-primary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </div>

            {/* Media */}
            {mediaFiles && mediaFiles.length > 0 && (
              <div className="px-4 pb-3">
                <div className="bg-surface rounded-lg p-8 text-center">
                  <Icon name="Image" size={32} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Media Preview</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="ThumbsUp" size={20} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="MessageCircle" size={20} />
                    <span className="text-sm">Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="Share" size={20} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'instagram':
        return (
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center space-x-3">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{mockUser.username}</h4>
              </div>
              <button className="p-1 text-text-primary">
                <Icon name="MoreHorizontal" size={20} />
              </button>
            </div>

            {/* Media */}
            <div className="aspect-square bg-surface flex items-center justify-center">
              <div className="text-center">
                <Icon name="Image" size={48} className="text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted">1080 x 1080</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Icon name="Heart" size={24} className="text-text-primary" />
                  <Icon name="MessageCircle" size={24} className="text-text-primary" />
                  <Icon name="Send" size={24} className="text-text-primary" />
                </div>
                <Icon name="Bookmark" size={24} className="text-text-primary" />
              </div>
              
              <p className="text-sm font-medium text-text-primary mb-2">1,234 likes</p>
              
              <div className="text-sm">
                <span className="font-medium text-text-primary">{mockUser.username}</span>
                <span 
                  className="text-text-primary ml-2"
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
              </div>
            </div>
          </div>
        );

      case 'twitter':
        return (
          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex space-x-3">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  <h4 className="font-medium text-text-primary">{mockUser.name}</h4>
                  {mockUser.verified && (
                    <Icon name="CheckCircle" size={16} className="text-blue-500" />
                  )}
                  <span className="text-text-muted">{mockUser.username}</span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-muted">2h</span>
                </div>
                
                <div 
                  className="text-text-primary leading-relaxed mb-3"
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
                />

                {/* Media */}
                {mediaFiles && mediaFiles.length > 0 && (
                  <div className="mb-3 bg-surface rounded-lg p-6 text-center">
                    <Icon name="Image" size={24} className="text-text-muted mx-auto mb-1" />
                    <p className="text-xs text-text-muted">Media Preview</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-text-muted max-w-md">
                  <button className="flex items-center space-x-2 hover:text-blue-500">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">12</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-500">
                    <Icon name="Repeat2" size={16} />
                    <span className="text-sm">5</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-red-500">
                    <Icon name="Heart" size={16} />
                    <span className="text-sm">23</span>
                  </button>
                  <button className="hover:text-blue-500">
                    <Icon name="Share" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'linkedin':
        return (
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center space-x-3">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{mockUser.name}</h4>
                <p className="text-sm text-text-muted">Digital Marketing Agency • 1st</p>
                <p className="text-xs text-text-muted">2 hours ago • 🌍</p>
              </div>
              <button className="p-1 text-text-muted hover:text-text-primary">
                <Icon name="MoreHorizontal" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <div 
                className="text-text-primary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </div>

            {/* Media */}
            {mediaFiles && mediaFiles.length > 0 && (
              <div className="px-4 pb-3">
                <div className="bg-surface rounded-lg p-8 text-center">
                  <Icon name="Image" size={32} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Media Preview</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="ThumbsUp" size={20} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="MessageCircle" size={20} />
                    <span className="text-sm">Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="Share" size={20} />
                    <span className="text-sm">Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-muted hover:text-primary">
                    <Icon name="Send" size={20} />
                    <span className="text-sm">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-surface border border-border rounded-lg p-8 text-center">
            <Icon name="Monitor" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">Preview not available for {config.name}</p>
          </div>
        );
    }
  };

  if (selectedPlatforms.length === 0) {
    return (
      <div className="bg-background border border-border rounded-lg p-8 text-center">
        <Icon name="Eye" size={32} className="text-text-muted mx-auto mb-3" />
        <h3 className="font-medium text-text-primary mb-2">Platform Preview</h3>
        <p className="text-sm text-text-muted">Select platforms to see how your content will appear</p>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-4">Platform Preview</h3>
        
        {/* Platform Tabs */}
        <div className="flex space-x-1 overflow-x-auto">
          {selectedPlatforms.map((platform) => {
            const config = platformConfigs[platform];
            return (
              <button
                key={platform}
                onClick={() => setActivePreview(platform)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap ${
                  activePreview === platform
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon 
                  name={config.icon} 
                  size={16} 
                  className={activePreview === platform ? 'text-white' : config.color} 
                />
                <span>{config.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        {renderPlatformPreview(activePreview)}
      </div>

      {/* Character Count for Active Platform */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">
            Character count for {platformConfigs[activePreview]?.name}
          </span>
          <span className={`font-medium ${
            content.length > platformConfigs[activePreview]?.maxChars 
              ? 'text-error' 
              : content.length > platformConfigs[activePreview]?.maxChars * 0.8 
                ? 'text-warning' :'text-success'
          }`}>
            {content.length} / {platformConfigs[activePreview]?.maxChars}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlatformPreview;