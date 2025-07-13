import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ClientContextSelector from '../../components/ui/ClientContextSelector';

import Button from '../../components/ui/Button';

// Import page-specific components
import ContentTypeSelector from './components/ContentTypeSelector';
import PlatformSelector from './components/PlatformSelector';
import AIGenerationTools from './components/AIGenerationTools';
import ContentEditor from './components/ContentEditor';
import PlatformPreview from './components/PlatformPreview';
import SEOOptimization from './components/SEOOptimization';
import SchedulingPanel from './components/SchedulingPanel';

const ContentCreation = () => {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState({
    id: 1,
    name: 'TechCorp Solutions',
    avatar: 'TC',
    industry: 'Technology',
    status: 'active'
  });

  // Content creation state
  const [contentType, setContentType] = useState('social-post');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'instagram']);
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePanel, setActivePanel] = useState('editor'); // editor, preview, seo, schedule

  // Content versions for history
  const [contentVersions, setContentVersions] = useState([
    {
      id: 1,
      content: `🚀 Exciting news! We're launching our new digital marketing automation platform next month.\n\nKey features:\n✅ AI-powered content generation\n✅ Multi-platform scheduling\n✅ Advanced analytics dashboard\n✅ Client collaboration tools\n\nStay tuned for early access! #DigitalMarketing #MarketingAutomation #TechInnovation`,
      timestamp: new Date(Date.now() - 3600000),
      platforms: ['facebook', 'linkedin'],
      type: 'social-post'
    },
    {
      id: 2,
      content: `Transform your marketing strategy with data-driven insights! 📊\n\nOur latest case study shows how TechCorp increased their lead generation by 300% using our integrated approach.\n\nRead the full story: [link]\n\n#MarketingSuccess #LeadGeneration #CaseStudy`,
      timestamp: new Date(Date.now() - 7200000),
      platforms: ['twitter', 'linkedin'],
      type: 'social-post'
    }
  ]);

  const [savedDrafts, setSavedDrafts] = useState([
    {
      id: 1,
      title: 'Q1 Marketing Campaign Launch',
      content: 'Exciting announcement coming soon about our Q1 initiatives...',
      platforms: ['facebook', 'instagram', 'linkedin'],
      lastModified: new Date(Date.now() - 1800000),
      type: 'social-post'
    },
    {
      id: 2,
      title: 'Customer Success Story - RetailPlus',
      content: 'Amazing results achieved with our client RetailPlus...',
      platforms: ['linkedin'],
      lastModified: new Date(Date.now() - 3600000),
      type: 'blog-post'
    }
  ]);

  // Handle AI content generation
  const handleAIGeneration = async (generationConfig) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = generateMockContent(generationConfig);
      setContent(generatedContent);
      
      // Add to version history
      const newVersion = {
        id: contentVersions.length + 1,
        content: generatedContent,
        timestamp: new Date(),
        platforms: selectedPlatforms,
        type: contentType,
        generatedWith: generationConfig
      };
      setContentVersions(prev => [newVersion, ...prev]);
      
      setIsGenerating(false);
    }, 2000);
  };

  const generateMockContent = (config) => {
    const { prompt, tone, length, includeHashtags, includeEmojis } = config;
    
    let baseContent = '';
    
    // Generate content based on prompt and tone
    if (prompt.toLowerCase().includes('marketing')) {
      baseContent = tone === 'professional' 
        ? `Effective digital marketing strategies require a comprehensive approach that combines data-driven insights with creative execution. By leveraging advanced analytics and automation tools, businesses can optimize their marketing efforts and achieve measurable results.`
        : `🚀 Ready to supercharge your marketing game? Let's dive into some game-changing strategies that will transform your business! From social media magic to SEO wizardry, we've got you covered.`;
    } else if (prompt.toLowerCase().includes('social media')) {
      baseContent = tone === 'professional'
        ? `Social media marketing has evolved into a sophisticated discipline that requires strategic planning, consistent execution, and continuous optimization. Success depends on understanding your audience and delivering value through every interaction.`
        : `📱 Social media isn't just about posting pretty pictures anymore! It's about building genuine connections, sparking conversations, and creating communities that love your brand.`;
    } else {
      baseContent = tone === 'professional' ? `In today's competitive business landscape, organizations must adapt quickly to changing market conditions and customer expectations. Strategic planning and execution are essential for sustainable growth.`
        : `💡 Innovation is the key to staying ahead! Whether you're a startup or an established business, embracing change and thinking outside the box will set you apart from the competition.`;
    }

    // Adjust length
    if (length === 'short') {
      baseContent = baseContent.substring(0, 100) + '...';
    } else if (length === 'long') {
      baseContent += `\n\nKey benefits include:\n• Increased brand awareness\n• Better customer engagement\n• Higher conversion rates\n• Improved ROI\n\nReady to get started? Contact us today to learn more about how we can help transform your business.`;
    }

    // Add hashtags if requested
    if (includeHashtags) {
      const hashtags = ['#DigitalMarketing', '#BusinessGrowth', '#MarketingStrategy', '#SocialMedia'];
      baseContent += `\n\n${hashtags.slice(0, 3).join(' ')}`;
    }

    // Add emojis if requested and not already present
    if (includeEmojis && !baseContent.includes('🚀') && !baseContent.includes('📱')) {
      baseContent = '✨ ' + baseContent;
    }

    return baseContent;
  };

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleMediaUpload = (files) => {
    setMediaFiles(prev => [...prev, ...files]);
  };

  const handleSEOOptimize = (suggestion) => {
    console.log('SEO Optimization:', suggestion);
    // Handle SEO optimization suggestions
  };

  const handleSchedule = (scheduleData) => {
    console.log('Schedule Content:', scheduleData);
    // Handle content scheduling
  };

  const handleSaveDraft = () => {
    const newDraft = {
      id: savedDrafts.length + 1,
      title: `Draft - ${new Date().toLocaleDateString()}`,
      content,
      platforms: selectedPlatforms,
      lastModified: new Date(),
      type: contentType
    };
    setSavedDrafts(prev => [newDraft, ...prev]);
  };

  const handleLoadDraft = (draft) => {
    setContent(draft.content);
    setSelectedPlatforms(draft.platforms);
    setContentType(draft.type);
  };

  const handleRestoreVersion = (version) => {
    setContent(version.content);
    setSelectedPlatforms(version.platforms);
    setContentType(version.type);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-60 p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">Content Creation</h1>
                <p className="text-text-secondary mt-1">
                  Create, optimize, and schedule engaging content across multiple platforms
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="History" iconSize={16}>
                  Version History
                </Button>
                <Button variant="outline" size="sm" iconName="Save" iconSize={16} onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button variant="primary" size="sm" iconName="Send" iconSize={16}>
                  Publish
                </Button>
              </div>
            </div>

            {/* Client Context */}
            <div className="mb-6">
              <div className="max-w-sm">
                <ClientContextSelector
                  selectedClient={selectedClient}
                  onClientChange={setSelectedClient}
                />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Panel - Tools & Settings */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <ContentTypeSelector
                  selectedType={contentType}
                  onTypeChange={setContentType}
                />
                
                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onPlatformToggle={handlePlatformToggle}
                />
                
                <AIGenerationTools
                  onGenerate={handleAIGeneration}
                  isGenerating={isGenerating}
                />

                {/* Saved Drafts */}
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="font-heading font-semibold text-text-primary mb-4">Saved Drafts</h3>
                  <div className="space-y-2">
                    {savedDrafts.slice(0, 3).map((draft) => (
                      <button
                        key={draft.id}
                        onClick={() => handleLoadDraft(draft)}
                        className="w-full text-left p-3 bg-surface hover:bg-surface-100 rounded-md transition-smooth"
                      >
                        <p className="text-sm font-medium text-text-primary truncate">
                          {draft.title}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {draft.lastModified.toLocaleDateString()}
                        </p>
                      </button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" fullWidth className="mt-3">
                    View All Drafts
                  </Button>
                </div>
              </div>

              {/* Center Panel - Content Editor */}
              <div className="col-span-12 lg:col-span-6">
                <div className="space-y-6">
                  <ContentEditor
                    content={content}
                    onChange={setContent}
                    selectedPlatforms={selectedPlatforms}
                    onMediaUpload={handleMediaUpload}
                  />

                  {/* Mobile Panel Selector */}
                  <div className="lg:hidden">
                    <div className="flex space-x-2 mb-4">
                      <button
                        onClick={() => setActivePanel('preview')}
                        className={`flex-1 py-2 px-3 text-sm rounded-md transition-smooth ${
                          activePanel === 'preview' ?'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setActivePanel('seo')}
                        className={`flex-1 py-2 px-3 text-sm rounded-md transition-smooth ${
                          activePanel === 'seo' ?'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        SEO
                      </button>
                      <button
                        onClick={() => setActivePanel('schedule')}
                        className={`flex-1 py-2 px-3 text-sm rounded-md transition-smooth ${
                          activePanel === 'schedule' ?'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        Schedule
                      </button>
                    </div>

                    {activePanel === 'preview' && (
                      <PlatformPreview
                        content={content}
                        selectedPlatforms={selectedPlatforms}
                        mediaFiles={mediaFiles}
                      />
                    )}
                    {activePanel === 'seo' && (
                      <SEOOptimization
                        content={content}
                        onOptimize={handleSEOOptimize}
                      />
                    )}
                    {activePanel === 'schedule' && (
                      <SchedulingPanel
                        onSchedule={handleSchedule}
                        selectedPlatforms={selectedPlatforms}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel - Preview & Tools */}
              <div className="hidden lg:block col-span-3 space-y-6">
                <PlatformPreview
                  content={content}
                  selectedPlatforms={selectedPlatforms}
                  mediaFiles={mediaFiles}
                />
                
                <SEOOptimization
                  content={content}
                  onOptimize={handleSEOOptimize}
                />
                
                <SchedulingPanel
                  onSchedule={handleSchedule}
                  selectedPlatforms={selectedPlatforms}
                />
              </div>
            </div>

            {/* Version History Modal Trigger */}
            {contentVersions.length > 0 && (
              <div className="mt-8 bg-background border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-text-primary">Recent Versions</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-2">
                  {contentVersions.slice(0, 2).map((version) => (
                    <div key={version.id} className="flex items-center justify-between p-3 bg-surface rounded-md">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary truncate">
                          {version.content.substring(0, 60)}...
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {version.timestamp.toLocaleString()} • {version.platforms.join(', ')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleRestoreVersion(version)}
                      >
                        Restore
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentCreation;