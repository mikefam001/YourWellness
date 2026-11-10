import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, Lock } from 'lucide-react';

export const LegalDisclaimer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'medical' | 'privacy' | 'terms' | 'accessibility'>('medical');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full px-3 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          <span>Governance & Policies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Clinical Governance, Privacy & Terms
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          MindPulse is dedicated to clinical transparency, rigorous privacy architecture, and universal digital accessibility. Review our governance statements below.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-xl">
        <button
          onClick={() => setActiveTab('medical')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'medical'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Medical Disclaimer
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Privacy Architecture
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'terms'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Terms of Use
        </button>
        <button
          onClick={() => setActiveTab('accessibility')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'accessibility'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Accessibility (WCAG 2.2 AA)
        </button>
      </div>

      {/* ================= SECTION 1: MEDICAL DISCLAIMER ================= */}
      {activeTab === 'medical' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-rose-700">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-lg font-bold text-slate-900">
              Comprehensive Clinical & Medical Disclaimer
            </h2>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 font-medium">
            MANDATORY NOTICE: THIS APPLICATION DOES NOT PROVIDE MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">1. Screening vs. Clinical Diagnosis</h3>
            <p>
              The psychometric instruments implemented in this application — including the Perceived Stress Scale (PSS-10), Generalized Anxiety Disorder 7-item scale (GAD-7), and Patient Health Questionnaire-9 (PHQ-9) — are standardized screening tools developed for research and clinical triage.
            </p>
            <p>
              An automated score is indicative of self-reported symptom frequency over a specific timeframe; it is <strong>not</strong> a medical or psychological diagnosis. An official diagnosis requires a comprehensive clinical evaluation conducted in-person or via secure telehealth by a licensed medical doctor, psychiatrist, or clinical psychologist.
            </p>

            <h3 className="font-bold text-slate-900 text-base">2. Medication & Treatment Governance</h3>
            <p>
              MindPulse does not prescribe medications, recommend changing prescribed dosages, or advise discontinuing medical treatments. Never ignore, delay, or modify advice provided by your personal physician because of information received through this web application.
            </p>

            <h3 className="font-bold text-slate-900 text-base">3. Emergency Situations & Immediate Risk</h3>
            <p>
              If you are having thoughts of suicide, intending to harm yourself, or experiencing a medical emergency, do not wait for an online assessment. Call 988 (USA/Canada), 112 (Nigeria/Europe), 999 (UK), 000 (Australia), or go directly to the nearest hospital emergency room.
            </p>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: PRIVACY ARCHITECTURE ================= */}
      {activeTab === 'privacy' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-teal-700">
            <Lock className="w-6 h-6" />
            <h2 className="text-lg font-bold text-slate-900">
              Zero-Data Retention Privacy Architecture
            </h2>
          </div>

          <div className="space-y-4">
            <p>
              Because mental health information is among the most sensitive personal data that exists, MindPulse is engineered with a strict <strong>zero-data retention architecture</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-semibold">No Remote Database</strong>
                <p className="text-xs text-slate-600">
                  There is no database connected to this application. Answers are not saved to any cloud storage.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-semibold">100% In-Browser Scoring</strong>
                <p className="text-xs text-slate-600">
                  Scoring algorithms execute in client-side JavaScript. No responses are transmitted over the web.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-semibold">No Third-Party AI API Calls</strong>
                <p className="text-xs text-slate-600">
                  Your assessment questions are never fed into generative AI APIs or third-party training data pipelines.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-semibold">Instant Data Erasure</strong>
                <p className="text-xs text-slate-600">
                  Closing your browser tab or clicking "Reset Session" immediately wipes all in-memory variables.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: TERMS OF USE ================= */}
      {activeTab === 'terms' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-slate-800">
            <FileText className="w-6 h-6" />
            <h2 className="text-lg font-bold text-slate-900">
              Terms of Use
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">1. Intended Audience</h3>
            <p>
              This application is designed for informational and self-reflection use by adults aged 18 and older. Minors are directed to seek guidance from parents, guardians, pediatricians, or designated youth helplines.
            </p>

            <h3 className="font-bold text-slate-900 text-base">2. User Responsibility</h3>
            <p>
              You acknowledge that you are using this platform voluntarily for wellness awareness. You agree that MindPulse and its contributors shall not be held liable for any actions, omissions, or decisions made based on screening scores.
            </p>

            <h3 className="font-bold text-slate-900 text-base">3. Intellectual Property of Instruments</h3>
            <p>
              The PSS-10 (Cohen et al., 1983), GAD-7 (Spitzer et al., 2006), and PHQ-9 (Kroenke et al., 2001) are cited and administered in accordance with established public domain and clinical research licensing principles.
            </p>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: ACCESSIBILITY STATEMENT ================= */}
      {activeTab === 'accessibility' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-teal-800">
            <CheckCircle2 className="w-6 h-6" />
            <h2 className="text-lg font-bold text-slate-900">
              WCAG 2.2 AA Accessibility Conformance
            </h2>
          </div>

          <div className="space-y-4">
            <p>
              MindPulse is committed to ensuring digital accessibility for individuals with diverse sensory, motor, and cognitive abilities. The interface is engineered to conform with Web Content Accessibility Guidelines (WCAG) 2.2 Level AA:
            </p>

            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Keyboard Navigation:</strong> All interactive elements, radio options, and modal dialogs are fully navigable via standard keyboard inputs (Tab, Shift+Tab, Enter, Space).</li>
              <li><strong>Visible Focus Indicators:</strong> High-contrast focus rings highlight active controls for keyboard users.</li>
              <li><strong>Sufficient Contrast:</strong> All body typography meets or exceeds the mandatory 4.5:1 contrast ratio against light backgrounds (with 3:1 for large display headings).</li>
              <li><strong>Non-Hue-Only Status:</strong> Clinical severity and status alerts are always conveyed through explicit text labels and semantic icons, never through color alone.</li>
              <li><strong>Semantic HTML:</strong> Proper heading hierarchy (h1 through h4), ARIA live announcements, and descriptive label associations.</li>
              <li><strong>Reduced Motion:</strong> Animations respect system <code>prefers-reduced-motion</code> settings.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
