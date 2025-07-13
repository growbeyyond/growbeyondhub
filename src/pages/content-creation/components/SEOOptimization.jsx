import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SEOOptimization = ({ content, onOptimize }) => {
  const [seoScore, setSeoScore] = useState(0);
  const [seoAnalysis, setSeoAnalysis] = useState({
    readability: 0,
    keywordDensity: 0,
    contentLength: 0,
    headings: 0,
    links: 0,
    images: 0
  });
  const [suggestions, setSuggestions] = useState([]);
  const [targetKeywords, setTargetKeywords] = useState(['digital marketing', 'social media', 'content strategy']);

  useEffect(() => {
    analyzeSEO();
  }, [content]);

  const analyzeSEO = () => {
    if (!content) {
      setSeoScore(0);
      setSuggestions([]);
      return;
    }

    const analysis = {
      readability: calculateReadability(content),
      keywordDensity: calculateKeywordDensity(content),
      contentLength: content.length,
      headings: (content.match(/#{1,6}\s/g) || []).length,
      links: (content.match(/\[.*?\]\(.*?\)/g) || []).length,
      images: (content.match(/!\[.*?\]\(.*?\)/g) || []).length
    };

    setSeoAnalysis(analysis);

    // Calculate overall score
    let score = 0;
    const suggestions = [];

    // Readability (30%)
    if (analysis.readability >= 60) {
      score += 30;
    } else {
      suggestions.push({
        type: 'warning',
        title: 'Improve Readability',
        description: 'Use shorter sentences and simpler words to improve readability.',
        action: 'Simplify Language'
      });
    }

    // Content Length (25%)
    if (analysis.contentLength >= 300 && analysis.contentLength <= 2000) {
      score += 25;
    } else if (analysis.contentLength < 300) {
      suggestions.push({
        type: 'error',
        title: 'Content Too Short',
        description: 'Add more content to reach at least 300 characters for better SEO.',
        action: 'Expand Content'
      });
    } else {
      suggestions.push({
        type: 'warning',
        title: 'Content Too Long',
        description: 'Consider breaking down long content for better engagement.',
        action: 'Shorten Content'
      });
    }

    // Keyword Density (20%)
    if (analysis.keywordDensity >= 1 && analysis.keywordDensity <= 3) {
      score += 20;
    } else if (analysis.keywordDensity < 1) {
      suggestions.push({
        type: 'warning',
        title: 'Low Keyword Density',
        description: 'Include target keywords more naturally in your content.',
        action: 'Add Keywords'
      });
    } else {
      suggestions.push({
        type: 'error',
        title: 'Keyword Stuffing',
        description: 'Reduce keyword usage to avoid over-optimization.',
        action: 'Reduce Keywords'
      });
    }

    // Headings (15%)
    if (analysis.headings >= 1) {
      score += 15;
    } else {
      suggestions.push({
        type: 'info',
        title: 'Add Headings',
        description: 'Use headings to structure your content better.',
        action: 'Add Headings'
      });
    }

    // Links (10%)
    if (analysis.links >= 1) {
      score += 10;
    } else {
      suggestions.push({
        type: 'info',
        title: 'Add Links',
        description: 'Include relevant links to improve content value.',
        action: 'Add Links'
      });
    }

    setSeoScore(score);
    setSuggestions(suggestions);
  };

  const calculateReadability = (text) => {
    // Simplified readability calculation
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const avgWordsPerSentence = words.length / sentences.length || 0;
    
    // Simple readability score (higher is better)
    return Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2));
  };

  const calculateKeywordDensity = (text) => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const totalWords = words.length;
    
    if (totalWords === 0) return 0;
    
    let keywordCount = 0;
    targetKeywords.forEach(keyword => {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      for (let i = 0; i <= words.length - keywordWords.length; i++) {
        const phrase = words.slice(i, i + keywordWords.length).join(' ');
        if (phrase === keyword.toLowerCase()) {
          keywordCount++;
        }
      }
    });
    
    return (keywordCount / totalWords) * 100;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
      default:
        return 'text-accent';
    }
  };

  const handleOptimize = (suggestion) => {
    onOptimize?.(suggestion);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Search" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-text-primary">SEO Optimization</h3>
      </div>

      {/* SEO Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Overall SEO Score</span>
          <span className={`text-lg font-bold ${getScoreColor(seoScore)}`}>
            {seoScore}/100
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getScoreBackground(seoScore)}`}
            style={{ width: `${seoScore}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-muted mt-1">
          {seoScore >= 80 ? 'Excellent' : seoScore >= 60 ? 'Good' : 'Needs Improvement'}
        </p>
      </div>

      {/* SEO Metrics */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Content Analysis</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Readability</span>
              <span className={`text-sm font-medium ${
                seoAnalysis.readability >= 60 ? 'text-success' : 'text-warning'
              }`}>
                {Math.round(seoAnalysis.readability)}%
              </span>
            </div>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Length</span>
              <span className={`text-sm font-medium ${
                seoAnalysis.contentLength >= 300 ? 'text-success' : 'text-warning'
              }`}>
                {seoAnalysis.contentLength}
              </span>
            </div>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Keywords</span>
              <span className={`text-sm font-medium ${
                seoAnalysis.keywordDensity >= 1 && seoAnalysis.keywordDensity <= 3 ? 'text-success' : 'text-warning'
              }`}>
                {seoAnalysis.keywordDensity.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Headings</span>
              <span className={`text-sm font-medium ${
                seoAnalysis.headings >= 1 ? 'text-success' : 'text-warning'
              }`}>
                {seoAnalysis.headings}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Keywords */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Target Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {targetKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-md border border-primary-100"
            >
              {keyword}
            </span>
          ))}
          <button className="px-2 py-1 bg-surface border border-border text-text-muted text-xs rounded-md hover:bg-surface-100 transition-smooth">
            + Add Keyword
          </button>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Optimization Suggestions</h4>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-surface rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <Icon
                    name={getSuggestionIcon(suggestion.type)}
                    size={16}
                    className={`mt-0.5 ${getSuggestionColor(suggestion.type)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-text-primary">
                      {suggestion.title}
                    </h5>
                    <p className="text-xs text-text-muted mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleOptimize(suggestion)}
                  >
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Zap"
          iconSize={16}
          onClick={() => onOptimize?.({ type: 'auto-optimize' })}
        >
          Auto-Optimize Content
        </Button>
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="BarChart3"
          iconSize={16}
        >
          View Detailed Analysis
        </Button>
      </div>
    </div>
  );
};

export default SEOOptimization;