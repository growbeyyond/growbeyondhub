import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentEditor = ({ content, onChange, selectedPlatforms, onMediaUpload }) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [characterCount, setCharacterCount] = useState(0);
  const [showHashtagSuggestions, setShowHashtagSuggestions] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const hashtagSuggestions = [
    '#DigitalMarketing', '#SocialMedia', '#ContentMarketing', '#SEO', '#MarketingTips',
    '#BusinessGrowth', '#OnlineMarketing', '#SocialMediaMarketing', '#ContentStrategy',
    '#MarketingAgency', '#DigitalStrategy', '#BrandAwareness', '#LeadGeneration',
    '#MarketingAutomation', '#SocialMediaTips', '#ContentCreation', '#MarketingTrends'
  ];

  const formatButtons = [
    { id: 'bold', icon: 'Bold', label: 'Bold' },
    { id: 'italic', icon: 'Italic', label: 'Italic' },
    { id: 'underline', icon: 'Underline', label: 'Underline' },
    { id: 'link', icon: 'Link', label: 'Add Link' },
    { id: 'list', icon: 'List', label: 'Bullet List' },
    { id: 'quote', icon: 'Quote', label: 'Quote' }
  ];

  useEffect(() => {
    setCharacterCount(content.length);
  }, [content]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    onChange(newContent);
    setCharacterCount(newContent.length);
  };

  const handleFormat = (format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newContent = content;

    switch (format) {
      case 'bold':
        newContent = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        break;
      case 'italic':
        newContent = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        break;
      case 'underline':
        newContent = content.substring(0, start) + `_${selectedText}_` + content.substring(end);
        break;
      case 'link':
        newContent = content.substring(0, start) + `[${selectedText || 'Link Text'}](URL)` + content.substring(end);
        break;
      case 'list':
        newContent = content.substring(0, start) + `• ${selectedText}` + content.substring(end);
        break;
      case 'quote':
        newContent = content.substring(0, start) + `"${selectedText}"` + content.substring(end);
        break;
    }

    onChange(newContent);
  };

  const handleHashtagClick = (hashtag) => {
    const newContent = content + (content.endsWith(' ') ? '' : ' ') + hashtag + ' ';
    onChange(newContent);
    setShowHashtagSuggestions(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onMediaUpload(files);
    }
  };

  const getCharacterLimitForPlatform = () => {
    const platformLimits = {
      'facebook': 2200,
      'instagram': 2200,
      'twitter': 280,
      'linkedin': 3000,
      'youtube': 5000,
      'tiktok': 2200
    };

    if (selectedPlatforms.length === 0) return 2200;
    return Math.min(...selectedPlatforms.map(p => platformLimits[p] || 2200));
  };

  const characterLimit = getCharacterLimitForPlatform();
  const isOverLimit = characterCount > characterLimit;

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-primary">Content Editor</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 text-sm rounded-md transition-smooth ${
                activeTab === 'editor' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-sm rounded-md transition-smooth ${
                activeTab === 'preview' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        {activeTab === 'editor' && (
          <div className="flex items-center space-x-2 mb-4">
            {formatButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleFormat(button.id)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
                title={button.label}
              >
                <Icon name={button.icon} size={16} />
              </button>
            ))}
            <div className="w-px h-6 bg-border mx-2"></div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
              title="Upload Media"
            >
              <Icon name="Image" size={16} />
            </button>
            <button
              onClick={() => setShowHashtagSuggestions(!showHashtagSuggestions)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-smooth"
              title="Hashtag Suggestions"
            >
              <Icon name="Hash" size={16} />
            </button>
          </div>
        )}

        {/* Character Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">
            {selectedPlatforms.length > 0 
              ? `Optimized for: ${selectedPlatforms.join(', ')}`
              : 'Select platforms for optimization'
            }
          </span>
          <span className={`font-medium ${
            isOverLimit ? 'text-error' : characterCount > characterLimit * 0.8 ? 'text-warning' : 'text-text-muted'
          }`}>
            {characterCount} / {characterLimit}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'editor' ? (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing your content here...\n\nTip: Use @ to mention, # for hashtags, and select text to format."
              className="w-full h-64 px-3 py-2 bg-surface border border-border rounded-md text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            
            {/* Hashtag Suggestions */}
            {showHashtagSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-elevation-2 z-200 max-h-48 overflow-y-auto">
                <div className="p-3 border-b border-border">
                  <h4 className="text-sm font-medium text-text-primary">Suggested Hashtags</h4>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {hashtagSuggestions.map((hashtag, index) => (
                      <button
                        key={index}
                        onClick={() => handleHashtagClick(hashtag)}
                        className="px-2 py-1 text-xs bg-surface border border-border rounded text-text-secondary hover:text-primary hover:border-primary transition-smooth"
                      >
                        {hashtag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-64 p-4 bg-surface border border-border rounded-md overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              {content ? (
                <div className="whitespace-pre-wrap text-text-primary">
                  {content}
                </div>
              ) : (
                <p className="text-text-muted italic">Preview will appear here...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Action Buttons */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Save" iconSize={16}>
              Save Draft
            </Button>
            <Button variant="ghost" size="sm" iconName="Copy" iconSize={16}>
              Copy Text
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Calendar" iconSize={16}>
              Schedule
            </Button>
            <Button variant="primary" size="sm" iconName="Send" iconSize={16}>
              Publish Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;