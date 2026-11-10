import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenCrisisModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenCrisisModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single Text Element per Top Bar Contract) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
            aria-label="MindPulse Home"
          >
            <span className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-teal-800 transition-colors shrink-0">
              M
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              MindPulse
            </span>
          </button>

          {/* Zone 2: 4-5 Single-Line Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'home' ? 'text-teal-800 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('assessments')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'assessments' ? 'text-teal-800 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Assessments
            </button>
            <button
              onClick={() => handleNavClick('self-care')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'self-care' ? 'text-teal-800 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Self-Care Tools
            </button>
            <button
              onClick={() => handleNavClick('education')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'education' ? 'text-teal-800 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Wellness Library
            </button>
            <button
              onClick={() => handleNavClick('crisis-directory')}
              className={`hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'crisis-directory' ? 'text-rose-700 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Crisis Directory
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Emergency Hotline Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCrisisModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap"
              title="Immediate crisis help & emergency hotlines"
              aria-label="Open emergency crisis assistance"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
              <span className="hidden sm:inline">Crisis Help</span>
            </button>

            <button
              onClick={() => handleNavClick('assessments')}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors shadow-xs whitespace-nowrap"
            >
              Start Assessment
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('assessments')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'assessments' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Assessments (Stress, Anxiety, Depression)
          </button>
          <button
            onClick={() => handleNavClick('self-care')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'self-care' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Self-Care Toolkit (Breathing, Grounding, Journal)
          </button>
          <button
            onClick={() => handleNavClick('education')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'education' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Mental Wellness Educational Hub
          </button>
          <button
            onClick={() => handleNavClick('progress')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'progress' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Progress & Session History
          </button>
          <button
            onClick={() => handleNavClick('crisis-directory')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 flex items-center justify-between"
          >
            <span>Verified Emergency Directory</span>
            <PhoneCall className="w-4 h-4 text-rose-600" />
          </button>
        </div>
      )}
    </header>
  );
};
