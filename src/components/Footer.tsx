import React from 'react';
import { ShieldCheck, HeartHandshake, AlertTriangle, Trash2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenCrisisModal: () => void;
  onResetAllData: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCrisisModal,
  onResetAllData,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer Highlight Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-400" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Clinical Screening & Medical Disclaimer
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                This application provides educational information and mental health screening support. It does not diagnose, treat, or replace consultation with a qualified healthcare professional. If you are in crisis or having thoughts of self-harm, please access immediate professional or emergency support.
              </p>
            </div>
            <button
              onClick={onOpenCrisisModal}
              className="sm:ml-auto px-4 py-2 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap shrink-0"
            >
              Get Crisis Support
            </button>
          </div>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-sm">
          {/* Col 1: Platform Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                M
              </span>
              <span className="text-base font-bold text-white tracking-tight">MindPulse</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An evidence-informed mental wellness screening and educational platform. Powered by validated clinical instruments (PSS-10, GAD-7, PHQ-9) and 100% private, client-side deterministic algorithms.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Zero server tracking · In-memory privacy</span>
            </div>
          </div>

          {/* Col 2: Assessment Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Screening Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('assessment-runner', 'stress')}
                  className="hover:text-white transition-colors text-left"
                >
                  Perceived Stress Scale (PSS-10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment-runner', 'anxiety')}
                  className="hover:text-white transition-colors text-left"
                >
                  Generalized Anxiety Scale (GAD-7)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment-runner', 'depression')}
                  className="hover:text-white transition-colors text-left"
                >
                  Depression Questionnaire (PHQ-9)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment-runner', 'combined')}
                  className="hover:text-white transition-colors text-left font-medium text-teal-400"
                >
                  Combined Mental Wellness Evaluation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessments')}
                  className="hover:text-white transition-colors text-left"
                >
                  Assessment Center Overview
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Self-Care & Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Wellness & Self-Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('self-care')}
                  className="hover:text-white transition-colors text-left"
                >
                  Box & 4-7-8 Breathing Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('self-care')}
                  className="hover:text-white transition-colors text-left"
                >
                  5-4-3-2-1 Sensory Grounding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('self-care')}
                  className="hover:text-white transition-colors text-left"
                >
                  Daily Wellness & Mood Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-white transition-colors text-left"
                >
                  Clinical Articles & Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('progress')}
                  className="hover:text-white transition-colors text-left"
                >
                  Session Progress & Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Crisis & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Safety, Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('crisis-directory')}
                  className="hover:text-rose-400 transition-colors text-left font-medium text-rose-300"
                >
                  Verified Emergency Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-white transition-colors text-left"
                >
                  Medical Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy (No Data Storage)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-white transition-colors text-left"
                >
                  WCAG 2.2 AA Accessibility
                </button>
              </li>
              <li>
                <button
                  onClick={onResetAllData}
                  className="hover:text-rose-300 transition-colors text-left flex items-center gap-1.5 text-slate-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset All Active Session Data</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MindPulse. Built for psychological education and screening literacy.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <HeartHandshake className="w-4 h-4 text-teal-400" aria-hidden="true" />
              Evidence-Informed Healthcare Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
