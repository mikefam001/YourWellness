import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Heart,
  Check,
  HelpCircle,
} from 'lucide-react';
import {
  AssessmentCategory,
  ComprehensiveAssessmentReport,
  DemographicContext,
  Question,
} from '../types/assessment';
import { PSS10_QUESTIONS } from '../data/pss10';
import { GAD7_QUESTIONS, GAD_FUNCTIONAL_QUESTION } from '../data/gad7';
import { PHQ9_QUESTIONS, PHQ_FUNCTIONAL_QUESTION } from '../data/phq9';
import { STRESS_CONTEXT_QUESTIONS } from '../data/stressCustom';
import { DIRECT_SAFETY_QUESTIONS } from '../data/safetyQuestions';
import {
  AGE_GROUP_OPTIONS,
  COUNTRY_OPTIONS,
  GENDER_OPTIONS,
  OCCUPATION_OPTIONS,
  SLEEP_HOURS_OPTIONS,
  SLEEP_QUALITY_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  CAFFEINE_OPTIONS,
  MAJOR_STRESSOR_OPTIONS,
  SYMPTOM_DURATION_OPTIONS,
} from '../data/demographics';
import { compileComprehensiveReport, RawAnswers } from '../assessment-engine/scoring';

interface AssessmentRunnerProps {
  category: AssessmentCategory;
  onComplete: (report: ComprehensiveAssessmentReport) => void;
  onCancel: () => void;
  onOpenCrisisModal: () => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  category,
  onComplete,
  onCancel,
  onOpenCrisisModal,
}) => {
  // Step tracking:
  // step 'demographics' -> step 'questions' -> step 'review'
  const [currentStage, setCurrentStage] = useState<'demographics' | 'questions' | 'review'>('demographics');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Demographics state
  const [demographics, setDemographics] = useState<DemographicContext>({
    ageGroup: '25–34 years',
    country: 'Nigeria',
    gender: 'Prefer not to say',
    occupation: 'Full-time employed',
    sleepHours: '7 to 8 hours (Recommended)',
    sleepQuality: 'Fair — occasional waking',
    physicalActivity: 'Moderate (3–4 days weekly)',
    caffeineIntake: 'Moderate (1–2 cups daily)',
    majorStressors: ['Workload & Career Deadlines'],
    symptomDuration: '2 to 4 weeks',
  });

  // Raw Answers map
  const [answers, setAnswers] = useState<RawAnswers>({});
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showUnder18Warning, setShowUnder18Warning] = useState(false);

  // Assemble question sequence based on category
  const buildQuestionList = (): Question[] => {
    const list: Question[] = [];

    if (category === 'stress') {
      list.push(...PSS10_QUESTIONS);
      list.push(...STRESS_CONTEXT_QUESTIONS);
    } else if (category === 'anxiety') {
      list.push(...GAD7_QUESTIONS);
      list.push(GAD_FUNCTIONAL_QUESTION);
    } else if (category === 'depression') {
      list.push(...PHQ9_QUESTIONS);
      list.push(PHQ_FUNCTIONAL_QUESTION);
      list.push(...DIRECT_SAFETY_QUESTIONS);
    } else if (category === 'combined') {
      // 1. Stress
      list.push(...PSS10_QUESTIONS);
      list.push(...STRESS_CONTEXT_QUESTIONS);
      // 2. Anxiety
      list.push(...GAD7_QUESTIONS);
      list.push(GAD_FUNCTIONAL_QUESTION);
      // 3. Depression & Safety
      list.push(...PHQ9_QUESTIONS);
      list.push(PHQ_FUNCTIONAL_QUESTION);
      list.push(...DIRECT_SAFETY_QUESTIONS);
    }

    return list;
  };

  const questions = buildQuestionList();
  const currentQuestion = questions[currentQuestionIndex];

  // Answer handler
  const handleSelectOption = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Safety Trigger: If PHQ-9 Item 9 > 0 or direct safety question indicates intent
    if (
      (questionId === 'phq_9' && value > 0) ||
      (questionId === 'safety_immediate_plan' && value > 0) ||
      (questionId === 'safety_active_thoughts' && value >= 2)
    ) {
      onOpenCrisisModal();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStage('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStage('demographics');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitFinal = () => {
    const report = compileComprehensiveReport(category, answers, demographics);
    onComplete(report);
  };

  const toggleStressor = (stressor: string) => {
    setDemographics((prev) => {
      const current = prev.majorStressors || [];
      const updated = current.includes(stressor)
        ? current.filter((s) => s !== stressor)
        : [...current, stressor];
      return { ...prev, majorStressors: updated };
    });
  };

  // ================= STAGE 1: DEMOGRAPHICS & CONTEXT =================
  if (currentStage === 'demographics') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="space-y-2">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel Assessment</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 pt-2">
            <span>Part 1 of 2: Personal & Lifestyle Context</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Help Us Contextualize Your Responses
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Lifestyle factors such as sleep, workload, and duration of symptoms provide vital context for interpreting screening indicators. All details remain private in your browser tab.
          </p>
        </div>

        {/* 18+ Underage Check Modal */}
        {showUnder18Warning && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">Adult Screening Notice</h4>
                <p className="text-xs text-amber-900/90 leading-relaxed mt-1">
                  These screening tools (PSS-10, GAD-7, PHQ-9) are validated for adults aged 18 and older. If you are under 18, we strongly advise speaking with a parent, school counselor, or pediatrician.
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={onOpenCrisisModal}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700"
              >
                Access Youth & Crisis Lines
              </button>
              <button
                onClick={() => setShowUnder18Warning(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-amber-900 bg-amber-200/60 rounded-lg hover:bg-amber-200"
              >
                I am 18 or older
              </button>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Row 1: Age & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Age Group (18+ Required)
              </label>
              <select
                id="age-select"
                value={demographics.ageGroup}
                onChange={(e) => {
                  setDemographics({ ...demographics, ageGroup: e.target.value });
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {AGE_GROUP_OPTIONS.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="country-select-demo" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Country of Residence
              </label>
              <select
                id="country-select-demo"
                value={demographics.country}
                onChange={(e) => setDemographics({ ...demographics, country: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Gender & Occupation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Gender (Optional)
              </label>
              <select
                id="gender-select"
                value={demographics.gender}
                onChange={(e) => setDemographics({ ...demographics, gender: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="occ-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Employment / Daily Activity
              </label>
              <select
                id="occ-select"
                value={demographics.occupation}
                onChange={(e) => setDemographics({ ...demographics, occupation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {OCCUPATION_OPTIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Sleep Duration & Sleep Quality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="sleep-hours-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Average Sleep Duration
              </label>
              <select
                id="sleep-hours-select"
                value={demographics.sleepHours}
                onChange={(e) => setDemographics({ ...demographics, sleepHours: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {SLEEP_HOURS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sleep-qual-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Recent Sleep Quality
              </label>
              <select
                id="sleep-qual-select"
                value={demographics.sleepQuality}
                onChange={(e) => setDemographics({ ...demographics, sleepQuality: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {SLEEP_QUALITY_OPTIONS.map((sq) => (
                  <option key={sq} value={sq}>
                    {sq}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Physical Activity & Caffeine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="act-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Physical Exercise Frequency
              </label>
              <select
                id="act-select"
                value={demographics.physicalActivity}
                onChange={(e) => setDemographics({ ...demographics, physicalActivity: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {PHYSICAL_ACTIVITY_OPTIONS.map((pa) => (
                  <option key={pa} value={pa}>
                    {pa}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="caff-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Daily Caffeine Intake
              </label>
              <select
                id="caff-select"
                value={demographics.caffeineIntake}
                onChange={(e) => setDemographics({ ...demographics, caffeineIntake: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                {CAFFEINE_OPTIONS.map((caf) => (
                  <option key={caf} value={caf}>
                    {caf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Symptom Duration */}
          <div>
            <label htmlFor="dur-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              How long have you been experiencing these feelings or symptoms?
            </label>
            <select
              id="dur-select"
              value={demographics.symptomDuration}
              onChange={(e) => setDemographics({ ...demographics, symptomDuration: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
            >
              {SYMPTOM_DURATION_OPTIONS.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Major Stressors (Multi-select) */}
          <div className="space-y-2 pt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Primary Stress Factors (Select all that currently apply)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MAJOR_STRESSOR_OPTIONS.map((stressor) => {
                const isSelected = demographics.majorStressors?.includes(stressor);
                return (
                  <button
                    key={stressor}
                    type="button"
                    onClick={() => toggleStressor(stressor)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50/70 text-teal-950 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{stressor}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel Assessment
          </button>
          <button
            onClick={() => {
              setCurrentStage('questions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors shadow-sm"
          >
            <span>Proceed to Questionnaire</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Exit Modal */}
        {showExitConfirm && (
          <ExitConfirmModal
            onConfirm={onCancel}
            onDismiss={() => setShowExitConfirm(false)}
          />
        )}
      </div>
    );
  }

  // ================= STAGE 2: QUESTION BY QUESTION =================
  if (currentStage === 'questions') {
    const totalQuestions = questions.length;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
    const selectedValue = answers[currentQuestion.id];
    const isAnswered = selectedValue !== undefined;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Top Control Ribbon */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={handlePrevQuestion}
            className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentQuestionIndex === 0 ? 'Back to Context' : 'Previous Question'}</span>
          </button>

          <span className="font-mono text-slate-700 font-semibold">
            Question {currentQuestionIndex + 1} of {totalQuestions} ({progressPercent}%)
          </span>

          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-slate-400 hover:text-rose-600 transition-colors"
          >
            Exit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-700 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Instrument Tag */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              {currentQuestion.instrumentName || 'Assessment'}
            </span>
            <span className="text-xs text-slate-400 font-medium capitalize">
              {currentQuestion.category} Evaluation
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentQuestion.text}
            </h2>
            {currentQuestion.subtext && (
              <p className="text-xs text-slate-500 italic leading-relaxed">
                {currentQuestion.subtext}
              </p>
            )}
          </div>

          {/* Answer Options Radio Group */}
          <div className="space-y-3 pt-2" role="radiogroup" aria-label={currentQuestion.text}>
            {currentQuestion.options.map((option) => {
              const isOptionSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isOptionSelected}
                  onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                    isOptionSelected
                      ? 'border-teal-700 bg-teal-50/80 ring-2 ring-teal-600/20 text-teal-950 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <span className="text-sm">{option.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isOptionSelected
                        ? 'border-teal-700 bg-teal-700 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isOptionSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Bottom Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevQuestion}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Previous
          </button>

          <button
            disabled={!isAnswered}
            onClick={handleNextQuestion}
            className={`inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-xl transition-colors shadow-sm ${
              isAnswered
                ? 'bg-teal-800 hover:bg-teal-900 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestionIndex === totalQuestions - 1 ? 'Review Answers' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety Hotline Reminder */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenCrisisModal}
            className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
          >
            Need urgent assistance? Open 24/7 Crisis Hotline Directory
          </button>
        </div>

        {/* Exit Modal */}
        {showExitConfirm && (
          <ExitConfirmModal
            onConfirm={onCancel}
            onDismiss={() => setShowExitConfirm(false)}
          />
        )}
      </div>
    );
  }

  // ================= STAGE 3: REVIEW & SUBMIT =================
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-2">
        <button
          onClick={() => {
            setCurrentStage('questions');
            setCurrentQuestionIndex(questions.length - 1);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Questions</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Review Your Responses Before Submission
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Please confirm your answers. You can edit any item before generating your personalized screening summary and evidence-informed recommendations.
        </p>
      </div>

      {/* Answer Summary Card List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Completed Items ({Object.keys(answers).length} of {questions.length})
          </span>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Ready for local calculation
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[50vh] overflow-y-auto pr-2 space-y-3">
          {questions.map((q, idx) => {
            const val = answers[q.id];
            const chosenOption = q.options.find((opt) => opt.value === val);

            return (
              <div key={q.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <span className="text-xs text-slate-400 font-mono">#{idx + 1} · {q.instrumentName}</span>
                  <p className="text-xs font-medium text-slate-900">{q.text}</p>
                  <p className="text-xs font-semibold text-teal-800">
                    Selected: {chosenOption ? chosenOption.label : 'Not answered'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentStage('questions');
                    setCurrentQuestionIndex(idx);
                  }}
                  className="text-xs font-medium text-slate-500 hover:text-teal-800 underline underline-offset-2 shrink-0 pt-2"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy & Medical Disclaimer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1">
        <strong className="text-slate-900 block font-semibold">Deterministic Calculation & Confidentiality</strong>
        <p>
          Clicking "Generate Clinical Report" will process your scores locally in this browser. MindPulse does not store your answers on any remote server.
        </p>
      </div>

      {/* Bottom Final Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            setCurrentStage('questions');
            setCurrentQuestionIndex(questions.length - 1);
          }}
          className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          Previous
        </button>

        <button
          onClick={handleSubmitFinal}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors shadow-md hover:shadow-lg"
        >
          <span>Generate Assessment Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Exit Modal */}
      {showExitConfirm && (
        <ExitConfirmModal
          onConfirm={onCancel}
          onDismiss={() => setShowExitConfirm(false)}
        />
      )}
    </div>
  );
};

// ================= MODAL: EXIT CONFIRMATION =================
const ExitConfirmModal: React.FC<{
  onConfirm: () => void;
  onDismiss: () => void;
}> = ({ onConfirm, onDismiss }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-base font-bold text-slate-900">Discard Current Assessment?</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Because MindPulse prioritizes your privacy, answers are held in memory only. Leaving now will discard your current progress.
        </p>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Continue Assessment
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
          >
            Discard & Return
          </button>
        </div>
      </div>
    </div>
  );
};
