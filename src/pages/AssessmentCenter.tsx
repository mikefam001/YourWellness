import React from 'react';
import {
  Activity,
  Brain,
  Heart,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { AssessmentCategory } from '../types/assessment';

interface AssessmentCenterProps {
  onStartAssessment: (category: AssessmentCategory) => void;
  onOpenCrisisModal: () => void;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({
  onStartAssessment,
  onOpenCrisisModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-100/60 rounded-full px-3 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
          <span>Clinical Screening Centre · Age 18+</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Mental Health Assessment Centre
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Select an individual screening or complete a combined assessment. All assessments use standardized scoring rules, preserve complete browser-local privacy, and generate tailored evidence-based recommendations.
        </p>
      </div>

      {/* Pre-Assessment Clinical Guidance Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-700" aria-hidden="true" />
          <span>Before You Begin: Instructions & Privacy Guarantee</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <strong className="text-slate-900 block font-semibold">1. Confidential & In-Memory</strong>
            <p className="leading-relaxed">
              Your responses are processed solely in this browser tab. No database, server storage, or third-party artificial intelligence services are used.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 block font-semibold">2. Timeframe Consistency</strong>
            <p className="leading-relaxed">
              The PSS-10 evaluates the past month, while the GAD-7 and PHQ-9 evaluate how you have been feeling over the last 2 weeks. Answer according to typical experience.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 block font-semibold">3. Screening, Not Diagnosis</strong>
            <p className="leading-relaxed">
              Results highlight symptom severity indicators to guide conversations with your doctor. They do not constitute a medical diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Combined Assessment Card */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-teal-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider">
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Comprehensive Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Combined Mental Wellness Assessment
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Administers all three validated scales (PSS-10 Stress, GAD-7 Anxiety, PHQ-9 Depression) alongside lifestyle and safety checks in one continuous, guided flow. Generates separate, unblended scores with comparative clinical insights.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-teal-200/90 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Estimated Time: ~8–10 minutes
            </span>
            <span>·</span>
            <span>Includes 4-Stage Action Plan</span>
            <span>·</span>
            <span>Printable & PDF Export</span>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onStartAssessment('combined')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-md"
            >
              <span>Begin Combined Assessment</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Individual Screening Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Or Choose an Individual Screening Module
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Module 1: Stress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-teal-200 transition-all space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Stress Assessment</h3>
                <span className="text-xs text-slate-500 block">
                  Perceived Stress Scale (PSS-10) · Cohen et al.
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates how unpredictable, uncontrollable, and overloaded you find your life, along with physical manifestations like somatic muscle tension and exhaustion.
              </p>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">~3–4 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Questions:</span>
                  <span className="font-semibold text-slate-800">10 core + lifestyle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Area:</span>
                  <span className="font-semibold text-slate-800">Coping capacity</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartAssessment('stress')}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Stress Screening</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module 2: Anxiety */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-teal-200 transition-all space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Anxiety Assessment</h3>
                <span className="text-xs text-slate-500 block">
                  Generalized Anxiety Disorder 7-Item (GAD-7)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized clinical scale screening for pervasive worry, restlessness, irritability, and functional disruption across the past 14 days.
              </p>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">~3 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Questions:</span>
                  <span className="font-semibold text-slate-800">7 standardized + context</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Area:</span>
                  <span className="font-semibold text-slate-800">Worry & hyperarousal</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartAssessment('anxiety')}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Anxiety Screening</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module 3: Depression */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-teal-200 transition-all space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Depression Assessment</h3>
                <span className="text-xs text-slate-500 block">
                  Patient Health Questionnaire-9 (PHQ-9)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized clinical scale evaluating anhedonia, low mood, sleep disturbance, psychomotor changes, fatigue, self-worth, and crisis safety.
              </p>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">~4 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Questions:</span>
                  <span className="font-semibold text-slate-800">9 standardized + safety</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Area:</span>
                  <span className="font-semibold text-slate-800">Mood & safety triage</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartAssessment('depression')}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Depression Screening</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice Strip */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
        <span className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          Experiencing acute distress or having thoughts of self-harm?
        </span>
        <button
          onClick={onOpenCrisisModal}
          className="font-bold text-rose-700 hover:text-rose-800 underline underline-offset-2 shrink-0"
        >
          Access Immediate Crisis Directory →
        </button>
      </div>
    </div>
  );
};
