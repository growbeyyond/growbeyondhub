import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContentTypeSelector = ({ selectedType, onTypeChange }) => {
  const contentTypes = [
    {
      id: 'social-post',
      name: 'Social Media Post',
      icon: 'MessageSquare',
      description: 'Create engaging social media content'
    },
    {
      id: 'blog-post',
      name: 'Blog Article',
      icon: 'FileText',
      description: 'Write comprehensive blog articles'
    },
    {
      id: 'video-script',
      name: 'Video Script',
      icon: 'Video',
      description: 'Script for video content'
    },
    {
      id: 'email-campaign',
      name: 'Email Campaign',
      icon: 'Mail',
      description: 'Email marketing content'
    },
    {
      id: 'ad-copy',
      name: 'Ad Copy',
      icon: 'Target',
      description: 'Advertising copy and headlines'
    },
    {
      id: 'infographic',
      name: 'Infographic',
      icon: 'BarChart3',
      description: 'Visual data presentation'
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-text-primary mb-4">Content Type</h3>
      <div className="space-y-2">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-md text-left transition-smooth ${
              selectedType === type.id
                ? 'bg-primary text-white' :'bg-surface hover:bg-surface-100 text-text-primary'
            }`}
          >
            <Icon 
              name={type.icon} 
              size={20} 
              className={selectedType === type.id ? 'text-white' : 'text-text-muted'} 
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                selectedType === type.id ? 'text-white' : 'text-text-primary'
              }`}>
                {type.name}
              </p>
              <p className={`text-xs ${
                selectedType === type.id ? 'text-white text-opacity-80' : 'text-text-muted'
              }`}>
                {type.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeSelector;