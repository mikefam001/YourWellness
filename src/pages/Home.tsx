import React from 'react';
import {
  Brain,
  ShieldCheck,
  Clock,
  ArrowRight,
  Wind,
  CheckCircle2,
  FileText,
  Activity,
  Heart,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenCrisisModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenCrisisModal }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-12 bg-gradient-to-b from-teal-50/50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-100/60 rounded-full px-3 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                <span>100% In-Browser Privacy · No Account · No Data Stored</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Understand Your Mind.{' '}
                <span className="text-teal-800">Take Charge of Your Well-being.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                A clinically informed, completely confidential screening platform. Evaluate stress, anxiety, and depressive symptoms using standardized instruments, receive transparent score breakdowns, and explore personalized evidence-based coping strategies.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('assessments')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors shadow-md hover:shadow-lg"
                >
                  <span>Start Mental Health Assessment</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => onNavigate('self-care')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Wind className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>Explore Self-Care Toolkit</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                  Validated Scales (PSS-10, GAD-7, PHQ-9)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                  Zero Third-Party AI Transmission
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                  Deterministic Scoring
                </span>
              </div>
            </div>

            {/* Right Column: Visual Feature Stage */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                    Clinical Screening Modules
                  </span>
                  <span className="text-xs text-slate-500">Ages 18+</span>
                </div>

                {/* Micro Item 1: Stress */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-teal-200 transition-colors flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">Stress Screening (PSS-10)</span>
                    <span className="text-xs text-slate-500">Perceived overload & coping balance</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    3 min
                  </span>
                </div>

                {/* Micro Item 2: Anxiety */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-teal-200 transition-colors flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">Anxiety Screening (GAD-7)</span>
                    <span className="text-xs text-slate-500">Excessive worry, nervousness & restlessness</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    3 min
                  </span>
                </div>

                {/* Micro Item 3: Depression */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-teal-200 transition-colors flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">Depression Screening (PHQ-9)</span>
                    <span className="text-xs text-slate-500">Mood, anhedonia, fatigue & safety screening</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    4 min
                  </span>
                </div>

                {/* Combined Callout */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('assessment-runner', 'combined')}
                    className="w-full py-2.5 px-4 text-xs font-bold text-teal-900 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Or Take Combined Assessment (~8-10 min)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Assessment Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Select an Individual Assessment
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Choose a targeted screening module below or complete all three together. Each assessment uses standardized scoring rules and generates a customized four-stage action plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Stress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all hover:border-teal-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Activity className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Stress Assessment</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">PSS-10</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    ~3–4 min
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates perceived stress levels, feelings of being overwhelmed, somatic muscle tension, emotional exhaustion, and your ability to cope with unexpected life events.
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Evaluates:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Perceived lack of control</li>
                  <li>Overloaded daily bandwidth</li>
                  <li>Somatic & physical tension</li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('assessment-runner', 'stress')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Start Stress Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Anxiety */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all hover:border-teal-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Brain className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Anxiety Assessment</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">GAD-7 Standardized</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    ~3 min
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Investigates persistent nervousness, uncontrollable worry, restlessness, irritability, apprehensive dread, and occupational/relational interference.
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Evaluates:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Inability to control worry</li>
                  <li>Autonomic restlessness</li>
                  <li>Functional impairment rating</li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('assessment-runner', 'anxiety')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Start Anxiety Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Depression */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all hover:border-teal-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                <Heart className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Depression Assessment</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">PHQ-9 Standardized</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    ~4 min
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Screens for anhedonia, persistent low mood, sleep disruptions, fatigue, appetite changes, feelings of worthlessness, concentration difficulties, and safety indicators.
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Evaluates:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Loss of interest or pleasure</li>
                  <li>Psychomotor changes & fatigue</li>
                  <li>Clinical safety priority check</li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('assessment-runner', 'depression')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Start Depression Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Combined Assessment Prominent Strip */}
        <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Recommended for Complete Overview
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Combined Mental Wellness Screening
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete the PSS-10 stress scale, GAD-7 anxiety scale, and PHQ-9 depression scale in a unified guided experience. Generates separate, unblended scores with comparative clinical insights.
            </p>
          </div>
          <button
            onClick={() => onNavigate('assessment-runner', 'combined')}
            className="px-6 py-3.5 text-sm font-bold text-slate-900 bg-teal-400 rounded-xl hover:bg-teal-300 transition-colors shrink-0 whitespace-nowrap shadow-md"
          >
            Start Combined Assessment (~8–10 min)
          </button>
        </div>
      </section>

      {/* 3. How It Works (4 Clean Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How the Platform Works
            </h2>
            <p className="text-sm text-slate-600">
              A transparent, clinically grounded four-step protocol designed with user safety and zero-data retention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                Step 01
              </span>
              <h3 className="text-base font-bold text-slate-900">Answer Validated Questions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Respond to established psychometric questions (PSS-10, GAD-7, PHQ-9) measuring recent frequency of symptoms.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                Step 02
              </span>
              <h3 className="text-base font-bold text-slate-900">Provide Lifestyle Context</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share optional details on sleep duration, caffeine intake, workplace stressors, and symptom persistence.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                Step 03
              </span>
              <h3 className="text-base font-bold text-slate-900">Deterministic Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations execute locally in your browser. No black-box AI estimates or arbitrary single-number composite grades.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                Step 04
              </span>
              <h3 className="text-base font-bold text-slate-900">Personalized Action Plan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive practical steps for today, the next 7 days, long-term habits, and clear thresholds for seeking professional care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Mental Wellness Matters */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Clinical Significance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Early Awareness Precedes Effective Recovery
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Stress, anxiety, and depression are among the most common human experiences, yet individuals frequently wait months or years before recognizing that their symptoms have crossed from ordinary life pressure into clinical conditions.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Validated screening tools do not replace doctors, but they provide objective vocabulary, highlight unnoticed warning signs, and offer evidence-informed guidance on when professional medical or psychological evaluation is appropriate.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('education')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 hover:text-teal-900 underline underline-offset-4"
                >
                  <span>Browse Evidence-Informed Clinical Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Destigmatizing Support</h4>
                <p className="text-slate-600">
                  Mental health conditions are biological and psychological realities, not weaknesses of character or willpower.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Comorbidity Awareness</h4>
                <p className="text-slate-600">
                  Stress, anxiety, and low mood frequently coexist. Recognizing their distinct mechanisms enables targeted coping.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Objective Tracking</h4>
                <p className="text-slate-600">
                  Quantified screening metrics help articulate specific symptom patterns when speaking with your physician.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Safety Prioritization</h4>
                <p className="text-slate-600">
                  Immediate emergency pathways ensure high-risk indicators are met with direct, verified human assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Self-Care Toolkit Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Interactive Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Practical Self-Care Toolkit
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Immediate evidence-based exercises to regulate autonomic arousal and restore mental clarity.
            </p>
          </div>
          <button
            onClick={() => onNavigate('self-care')}
            className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1 shrink-0"
          >
            <span>Open Full Toolkit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool 1 */}
          <div
            onClick={() => onNavigate('self-care')}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Interactive Breathing Pacer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guided visual pacing for Box Breathing (4-4-4-4) and 4-7-8 relaxing breath with cycle counter and autonomic calming cues.
            </p>
            <span className="inline-block text-xs font-bold text-teal-800 pt-1">
              Start Breathing Exercise →
            </span>
          </div>

          {/* Tool 2 */}
          <div
            onClick={() => onNavigate('self-care')}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">5-4-3-2-1 Sensory Grounding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Step-by-step sensory checklist to de-escalate acute panic, reduce dissociative feelings, and anchor to the present moment.
            </p>
            <span className="inline-block text-xs font-bold text-teal-800 pt-1">
              Launch Grounding Tool →
            </span>
          </div>

          {/* Tool 3 */}
          <div
            onClick={() => onNavigate('self-care')}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Daily Wellness Planner & Journal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Daily mood rating, sleep log, gratitude entries, and cognitive reframing prompts stored privately in your session.
            </p>
            <span className="inline-block text-xs font-bold text-teal-800 pt-1">
              Open Daily Planner →
            </span>
          </div>
        </div>
      </section>

      {/* 6. Medical Disclaimer Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                Important Clinical Information
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                MindPulse is an educational screening platform, not a medical device. Automated screening scores do not constitute a psychiatric or psychological diagnosis. If you are experiencing distress, speak with a registered physician or therapist.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCrisisModal}
            className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Emergency Hotlines
          </button>
        </div>
      </section>
    </div>
  );
};
