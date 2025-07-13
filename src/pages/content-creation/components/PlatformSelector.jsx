import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformSelector = ({ selectedPlatforms, onPlatformToggle }) => {
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      charLimit: 2200
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      charLimit: 2200
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      bgColor: 'bg-blue-50',
      charLimit: 280
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      charLimit: 3000
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'Youtube',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      charLimit: 5000
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'Music',
      color: 'text-black',
      bgColor: 'bg-gray-50',
      charLimit: 2200
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-text-primary mb-4">Publishing Platforms</h3>
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformToggle(platform.id)}
            className={`flex items-center space-x-2 p-3 rounded-md border transition-smooth ${
              selectedPlatforms.includes(platform.id)
                ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:bg-surface-100 text-text-secondary'
            }`}
          >
            <div className={`w-6 h-6 rounded flex items-center justify-center ${
              selectedPlatforms.includes(platform.id) ? platform.bgColor : 'bg-surface'
            }`}>
              <Icon 
                name={platform.icon} 
                size={14} 
                className={selectedPlatforms.includes(platform.id) ? platform.color : 'text-text-muted'} 
              />
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}
      </div>
      
      {selectedPlatforms.length > 0 && (
        <div className="mt-4 p-3 bg-accent-50 rounded-md">
          <p className="text-xs text-accent font-medium mb-2">Character Limits:</p>
          <div className="space-y-1">
            {platforms
              .filter(p => selectedPlatforms.includes(p.id))
              .map(platform => (
                <div key={platform.id} className="flex justify-between text-xs">
                  <span className="text-text-secondary">{platform.name}:</span>
                  <span className="text-text-primary font-medium">{platform.charLimit} chars</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;