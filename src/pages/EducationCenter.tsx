import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { EDUCATIONAL_ARTICLES } from '../data/educationArticles';
import { EducationalArticle, WellnessArticleCategory } from '../types/wellness';

export const EducationCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WellnessArticleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<EducationalArticle | null>(null);

  const filteredArticles = EDUCATIONAL_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full px-3 py-1">
          <BookOpen className="w-3.5 h-3.5 text-teal-700" />
          <span>Evidence-Informed Educational Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Mental Wellness Library
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Deepen your psychological literacy with research-backed articles on stress physiology, anxiety neuroscience, depressive anhedonia, and lifestyle medicine. Referenced against WHO, APA, and NICE guidelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'stress', label: 'Stress' },
            { id: 'anxiety', label: 'Anxiety' },
            { id: 'depression', label: 'Depression' },
            { id: 'general', label: 'General Wellness' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, symptoms..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-teal-300 hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-teal-800">{article.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-teal-900 transition-colors">
                {article.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-teal-800 flex items-center gap-1">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {article.references.length} Citations
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl space-y-2">
          <p className="text-sm font-semibold text-slate-700">No matching articles found</p>
          <p className="text-xs text-slate-500">Try adjusting your search query or switching categories.</p>
        </div>
      )}

      {/* ================= FULL ARTICLE MODAL ================= */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2 text-xs text-teal-800 font-bold">
                  <span>{activeArticle.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-200 transition-colors shrink-0"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-800 text-sm leading-relaxed">
              {/* Clinical Takeaway Callout */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs text-teal-950 space-y-1">
                <strong className="font-bold uppercase tracking-wider text-teal-800 block">
                  Core Clinical Takeaway
                </strong>
                <p className="leading-relaxed">{activeArticle.clinicalTakeaway}</p>
              </div>

              {/* Body Sections */}
              {activeArticle.content.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900">
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {sec.bulletPoints && (
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside pl-2">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Citations & References */}
              <div className="pt-6 border-t border-slate-200 space-y-2 text-xs text-slate-500">
                <h4 className="font-bold uppercase tracking-wider text-slate-700">
                  Academic References & Guidelines
                </h4>
                <ul className="space-y-1 list-disc list-inside">
                  {activeArticle.references.map((ref, rIdx) => (
                    <li key={rIdx} className="italic">{ref}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>MindPulse Clinical Library</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 font-bold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
