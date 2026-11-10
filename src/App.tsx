import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CrisisModal } from './components/CrisisModal';
import { Home } from './pages/Home';
import { AssessmentCenter } from './pages/AssessmentCenter';
import { AssessmentRunner } from './pages/AssessmentRunner';
import { ResultsView } from './pages/ResultsView';
import { SelfCareToolkit } from './pages/SelfCareToolkit';
import { EducationCenter } from './pages/EducationCenter';
import { CrisisDirectory } from './pages/CrisisDirectory';
import { ProgressInsights } from './pages/ProgressInsights';
import { LegalDisclaimer } from './pages/LegalDisclaimer';
import {
  AssessmentCategory,
  ComprehensiveAssessmentReport,
  StoredSessionProgress,
} from './types/assessment';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [assessmentCategory, setAssessmentCategory] = useState<AssessmentCategory>('combined');
  const [activeReport, setActiveReport] = useState<ComprehensiveAssessmentReport | null>(null);
  const [progressHistory, setProgressHistory] = useState<StoredSessionProgress[]>([]);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  // Navigation router
  const handleNavigate = (view: string, param?: string) => {
    if (view === 'assessment-runner' && param) {
      setAssessmentCategory(param as AssessmentCategory);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = (category: AssessmentCategory) => {
    setAssessmentCategory(category);
    setCurrentView('assessment-runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (report: ComprehensiveAssessmentReport) => {
    setActiveReport(report);

    // Save into active session progress history
    const newEntry: StoredSessionProgress = {
      id: report.id,
      date: report.timestamp,
      category: report.completedCategories,
      stressScore: report.results.stress?.score,
      anxietyScore: report.results.anxiety?.score,
      depressionScore: report.results.depression?.score,
      stressSeverity: report.results.stress?.severityLabel,
      anxietySeverity: report.results.anxiety?.severityLabel,
      depressionSeverity: report.results.depression?.severityLabel,
      isHighRisk: report.safetyFlags.isHighRisk,
    };

    setProgressHistory((prev) => [newEntry, ...prev]);

    // Navigate to results
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAllData = () => {
    setActiveReport(null);
    setProgressHistory([]);
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Reset Confirmation Toast */}
      {resetNotice && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg border border-slate-700 flex items-center gap-2">
          <span>All session assessment responses have been permanently wiped.</span>
        </div>
      )}

      {/* Top Bar Contract Compliant Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
      />

      {/* Main Viewport Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
          />
        )}

        {currentView === 'assessments' && (
          <AssessmentCenter
            onStartAssessment={handleStartAssessment}
            onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
          />
        )}

        {currentView === 'assessment-runner' && (
          <AssessmentRunner
            category={assessmentCategory}
            onComplete={handleAssessmentComplete}
            onCancel={() => handleNavigate('assessments')}
            onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
          />
        )}

        {currentView === 'results' && activeReport && (
          <ResultsView
            report={activeReport}
            onRetake={() => handleStartAssessment(activeReport.completedCategories)}
            onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {/* If results accessed without active report, redirect gently to assessments */}
        {currentView === 'results' && !activeReport && (
          <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900">No Assessment Results in Current Session</h2>
            <p className="text-xs text-slate-500">
              Please take an assessment to generate your personalized clinical screening summary.
            </p>
            <button
              onClick={() => handleNavigate('assessments')}
              className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors"
            >
              Go to Assessment Center
            </button>
          </div>
        )}

        {currentView === 'self-care' && <SelfCareToolkit />}

        {currentView === 'education' && <EducationCenter />}

        {currentView === 'crisis-directory' && <CrisisDirectory />}

        {currentView === 'progress' && (
          <ProgressInsights
            progressList={progressHistory}
            onClearProgress={() => setProgressHistory([])}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'legal' && <LegalDisclaimer />}
      </main>

      {/* Comprehensive Medical & Legal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCrisisModal={() => setIsCrisisModalOpen(true)}
        onResetAllData={handleResetAllData}
      />

      {/* Global Crisis Support Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        defaultCountry="NG"
      />
    </div>
  );
}
