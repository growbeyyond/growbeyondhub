import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIGenerationTools = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedLength, setSelectedLength] = useState('medium');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(false);

  const toneOptions = [
    { id: 'professional', name: 'Professional', icon: 'Briefcase' },
    { id: 'casual', name: 'Casual', icon: 'Coffee' },
    { id: 'friendly', name: 'Friendly', icon: 'Heart' },
    { id: 'authoritative', name: 'Authoritative', icon: 'Shield' },
    { id: 'playful', name: 'Playful', icon: 'Smile' },
    { id: 'inspirational', name: 'Inspirational', icon: 'Star' }
  ];

  const lengthOptions = [
    { id: 'short', name: 'Short', description: '50-100 words' },
    { id: 'medium', name: 'Medium', description: '100-200 words' },
    { id: 'long', name: 'Long', description: '200+ words' }
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    const generationConfig = {
      prompt: prompt.trim(),
      tone: selectedTone,
      length: selectedLength,
      includeHashtags,
      includeEmojis
    };
    
    onGenerate(generationConfig);
  };

  const quickPrompts = [
    "Create a post about digital marketing trends",
    "Write about the importance of social media strategy",
    "Generate content about SEO best practices",
    "Create a motivational business post",
    "Write about customer success stories",
    "Generate content about team collaboration"
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">AI Content Generator</h3>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Content Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what content you want to create..."
          className="w-full h-24 px-3 py-2 bg-surface border border-border rounded-md text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      {/* Quick Prompts */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Quick Prompts
        </label>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.slice(0, 3).map((quickPrompt, index) => (
            <button
              key={index}
              onClick={() => setPrompt(quickPrompt)}
              className="text-xs px-2 py-1 bg-surface border border-border rounded text-text-secondary hover:text-text-primary hover:bg-surface-100 transition-smooth"
            >
              {quickPrompt}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tone of Voice
        </label>
        <div className="grid grid-cols-2 gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              className={`flex items-center space-x-2 p-2 rounded-md text-left transition-smooth ${
                selectedTone === tone.id
                  ? 'bg-primary text-white' :'bg-surface hover:bg-surface-100 text-text-secondary'
              }`}
            >
              <Icon 
                name={tone.icon} 
                size={16} 
                className={selectedTone === tone.id ? 'text-white' : 'text-text-muted'} 
              />
              <span className="text-xs font-medium">{tone.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Length Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Content Length
        </label>
        <div className="space-y-2">
          {lengthOptions.map((length) => (
            <button
              key={length.id}
              onClick={() => setSelectedLength(length.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-smooth ${
                selectedLength === length.id
                  ? 'bg-primary text-white' :'bg-surface hover:bg-surface-100 text-text-secondary'
              }`}
            >
              <span className="text-sm font-medium">{length.name}</span>
              <span className={`text-xs ${
                selectedLength === length.id ? 'text-white text-opacity-80' : 'text-text-muted'
              }`}>
                {length.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary">Include Hashtags</label>
          <button
            onClick={() => setIncludeHashtags(!includeHashtags)}
            className={`w-10 h-6 rounded-full transition-smooth ${
              includeHashtags ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              includeHashtags ? 'translate-x-5' : 'translate-x-1'
            }`}></div>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary">Include Emojis</label>
          <button
            onClick={() => setIncludeEmojis(!includeEmojis)}
            className={`w-10 h-6 rounded-full transition-smooth ${
              includeEmojis ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              includeEmojis ? 'translate-x-5' : 'translate-x-1'
            }`}></div>
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        variant="primary"
        fullWidth
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        loading={isGenerating}
        iconName="Sparkles"
        iconSize={16}
      >
        {isGenerating ? 'Generating...' : 'Generate Content'}
      </Button>
    </div>
  );
};

export default AIGenerationTools;