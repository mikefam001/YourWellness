import React, { useState, useEffect, useRef } from 'react';
import {
  Wind,
  Brain,
  FileText,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Heart,
  ChevronRight,
  ShieldCheck,
  Save,
} from 'lucide-react';
import {
  BREATHING_TECHNIQUES,
  GROUNDING_54321_STEPS,
  COGNITIVE_REFRAME_QUESTIONS,
} from '../data/selfCareTools';
import { BreathingTechniqueId, DailyPlannerEntry } from '../types/wellness';

export const SelfCareToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'grounding' | 'planner' | 'reframe'>('breathing');

  // ================= 1. BREATHING STATE =================
  const [selectedTechId, setSelectedTechId] = useState<BreathingTechniqueId>('box');
  const [isBreathingRunning, setIsBreathingRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const currentTechnique =
    BREATHING_TECHNIQUES.find((t) => t.id === selectedTechId) || BREATHING_TECHNIQUES[0];
  const currentPhase = currentTechnique.phases[currentPhaseIndex];

  // Timer effect for breathing
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isBreathingRunning) {
      timer = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Advance phase
            const nextPhaseIndex = (currentPhaseIndex + 1) % currentTechnique.phases.length;
            if (nextPhaseIndex === 0) {
              setCompletedCycles((c) => c + 1);
            }
            setCurrentPhaseIndex(nextPhaseIndex);
            return currentTechnique.phases[nextPhaseIndex].durationSeconds;
          }
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBreathingRunning, currentPhaseIndex, currentTechnique]);

  const handleSelectTechnique = (techId: BreathingTechniqueId) => {
    setSelectedTechId(techId);
    setIsBreathingRunning(false);
    const tech = BREATHING_TECHNIQUES.find((t) => t.id === techId) || BREATHING_TECHNIQUES[0];
    setCurrentPhaseIndex(0);
    setPhaseSecondsLeft(tech.phases[0].durationSeconds);
    setCompletedCycles(0);
  };

  const resetBreathing = () => {
    setIsBreathingRunning(false);
    setCurrentPhaseIndex(0);
    setPhaseSecondsLeft(currentTechnique.phases[0].durationSeconds);
    setCompletedCycles(0);
  };

  // ================= 2. GROUNDING STATE =================
  const [groundingInputs, setGroundingInputs] = useState<Record<number, string>>({});
  const [activeGroundingStep, setActiveGroundingStep] = useState(0);
  const [isGroundingComplete, setIsGroundingComplete] = useState(false);

  const handleGroundingInputChange = (stepCount: number, text: string) => {
    setGroundingInputs((prev) => ({
      ...prev,
      [stepCount]: text,
    }));
  };

  // ================= 3. DAILY PLANNER STATE =================
  const [moodRating, setMoodRating] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [gratitudes, setGratitudes] = useState<[string, string, string]>([
    'A quiet morning moment',
    'A warm beverage or good meal',
    'My body supporting me today',
  ]);
  const [mainGoal, setMainGoal] = useState<string>('Take a 15-minute restorative walk without phone');
  const [plannerSaved, setPlannerSaved] = useState(false);

  const handleSavePlanner = () => {
    setPlannerSaved(true);
    setTimeout(() => setPlannerSaved(false), 3000);
  };

  // ================= 4. COGNITIVE REFRAME STATE =================
  const [reframeAnswers, setReframeAnswers] = useState<Record<string, string>>({
    cr_worry: '',
    cr_control: '',
    cr_uncontrolled: '',
    cr_microstep: '',
  });
  const [reframeSaved, setReframeSaved] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full px-3 py-1">
          <Wind className="w-3.5 h-3.5 text-teal-700" />
          <span>Interactive Self-Care Toolkit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Practical Mind-Body Regulation Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ground your nervous system in real-time. Practice guided diaphragmatic pacing, sensory grounding, daily mood tracking, and cognitive reframing. Completely private and accessible anytime.
        </p>
      </div>

      {/* Segmented Tab Controls */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-2xl">
        <button
          onClick={() => setActiveTab('breathing')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'breathing'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>Breathing Pacer</span>
        </button>

        <button
          onClick={() => setActiveTab('grounding')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'grounding'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>5-4-3-2-1 Grounding</span>
        </button>

        <button
          onClick={() => setActiveTab('planner')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'planner'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Daily Wellness Check-In</span>
        </button>

        <button
          onClick={() => setActiveTab('reframe')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'reframe'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Worry Journal & Reframe</span>
        </button>
      </div>

      {/* ================= TAB 1: BREATHING PACER ================= */}
      {activeTab === 'breathing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-slate-900">
                Choose a Breathing Pattern
              </h2>

              <div className="space-y-3">
                {BREATHING_TECHNIQUES.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => handleSelectTechnique(tech.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      selectedTechId === tech.id
                        ? 'border-teal-700 bg-teal-50/70 text-teal-950 font-semibold ring-1 ring-teal-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{tech.title}</span>
                      <span className="text-xs text-slate-400">
                        {tech.phases.map((p) => `${p.durationSeconds}s`).join('-')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {tech.purpose}
                    </p>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700 block">Clinical Note:</strong>
                {currentTechnique.clinicalNote}
              </div>
            </div>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-[460px] text-center shadow-xs space-y-8">
            {/* Cycle Counter */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              <span>Cycle: {completedCycles} of {currentTechnique.totalCyclesRecommended} recommended</span>
            </div>

            {/* Dynamic Visual Breathing Circle */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                  currentPhase.name === 'Inhale'
                    ? 'scale-110 bg-teal-100/60 border border-teal-300'
                    : currentPhase.name === 'Exhale'
                    ? 'scale-90 bg-teal-50/40 border border-teal-200'
                    : 'scale-100 bg-teal-100/30 border border-teal-200'
                }`}
              />

              {/* Core Breathing Orb */}
              <div
                className={`relative z-10 w-44 h-44 rounded-full flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out shadow-lg ${
                  currentPhase.name === 'Inhale'
                    ? 'scale-110 bg-gradient-to-tr from-teal-700 to-teal-600'
                    : currentPhase.name === 'Exhale'
                    ? 'scale-90 bg-gradient-to-tr from-teal-800 to-slate-800'
                    : 'scale-100 bg-gradient-to-tr from-teal-700 to-slate-700'
                }`}
              >
                <span className="text-xs uppercase tracking-widest font-semibold opacity-90">
                  {currentPhase.name}
                </span>
                <span className="text-4xl font-extrabold font-mono mt-1">
                  {phaseSecondsLeft}s
                </span>
              </div>
            </div>

            {/* Instruction Cues */}
            <div className="space-y-1 max-w-md">
              <h3 className="text-base font-bold text-slate-900">
                {currentPhase.instruction}
              </h3>
              <p className="text-xs text-slate-500">
                Keep posture upright, shoulders relaxed, and breathe into your lower diaphragm.
              </p>
            </div>

            {/* Interactive Play / Pause / Reset Bar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                className={`inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl transition-colors shadow-md ${
                  isBreathingRunning
                    ? 'bg-slate-800 hover:bg-slate-900'
                    : 'bg-teal-800 hover:bg-teal-900'
                }`}
              >
                {isBreathingRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Exercise</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>{completedCycles > 0 ? 'Resume' : 'Start Breathing Exercise'}</span>
                  </>
                )}
              </button>

              <button
                onClick={resetBreathing}
                className="p-3 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                title="Reset Exercise"
                aria-label="Reset breathing exercise"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: 5-4-3-2-1 GROUNDING ================= */}
      {activeTab === 'grounding' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              5-4-3-2-1 Sensory Grounding Technique
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When panic, racing thoughts, or dissociation occur, anchoring to physical sensory perception interrupts amygdala hyperarousal. Step through each sense below.
            </p>
          </div>

          <div className="space-y-6">
            {GROUNDING_54321_STEPS.map((step, idx) => {
              const isCurrent = idx === activeGroundingStep;
              const hasInput = (groundingInputs[step.count] || '').trim().length > 0;

              return (
                <div
                  key={step.count}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-teal-700 bg-teal-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-teal-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                          {step.count}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">
                          {step.sense}: {step.prompt}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {step.instruction}
                      </p>
                    </div>

                    {hasInput && (
                      <span className="text-xs font-semibold text-teal-800 flex items-center gap-1 shrink-0 pt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Noted</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pl-8">
                    <input
                      type="text"
                      value={groundingInputs[step.count] || ''}
                      onChange={(e) => handleGroundingInputChange(step.count, e.target.value)}
                      placeholder={step.placeholder}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Take a slow, deep breath after finishing all five senses.
            </span>
            <button
              onClick={() => setIsGroundingComplete(true)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors shadow-xs"
            >
              Finish Grounding Exercise
            </button>
          </div>

          {isGroundingComplete && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Exercise completed. Notice the sensation of your feet on the floor and the steady rhythm of your breathing. You are present and safe in this moment.
              </span>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: DAILY PLANNER ================= */}
      {activeTab === 'planner' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Daily Wellness & Mood Check-In
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consistently noting mood, sleep, and small moments of gratitude builds psychological self-awareness. Stored locally in your session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mood Rating */}
            <div className="space-y-3 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. How is your overall mood today?
              </label>
              <div className="grid grid-cols-5 gap-2 pt-2">
                {[
                  { val: 1, label: 'Very Low' },
                  { val: 2, label: 'Low' },
                  { val: 3, label: 'Balanced' },
                  { val: 4, label: 'Good' },
                  { val: 5, label: 'Thriving' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setMoodRating(item.val)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      moodRating === item.val
                        ? 'border-teal-700 bg-teal-700 text-white font-bold shadow-xs'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-lg font-mono font-bold">{item.val}</span>
                    <span className="block text-[10px] mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Rating */}
            <div className="space-y-3 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Sleep Last Night
                </label>
                <span className="text-xs font-mono font-bold text-teal-800">
                  {sleepHours} Hours
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={0.5}
                value={sleepHours}
                onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                className="w-full accent-teal-700 cursor-pointer mt-4"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>3 hrs</span>
                <span>7–8 hrs (Optimal)</span>
                <span>12 hrs</span>
              </div>
            </div>
          </div>

          {/* 3 Gratitude Prompts */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              3. Three Small Things I Appreciate Today
            </label>
            <div className="space-y-2.5">
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  value={gratitudes[idx]}
                  onChange={(e) => {
                    const updated = [...gratitudes] as [string, string, string];
                    updated[idx] = e.target.value;
                    setGratitudes(updated);
                  }}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  placeholder={`Gratitude #${idx + 1}...`}
                />
              ))}
            </div>
          </div>

          {/* Wellness Goal */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              4. My Single Compassionate Wellness Intention for Today
            </label>
            <input
              type="text"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              placeholder="e.g. Taking a 15-minute walk without phone, hydrating well, or sleeping by 10:30 PM..."
            />
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>In-memory private log</span>
            </div>
            <button
              onClick={handleSavePlanner}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{plannerSaved ? 'Check-In Saved!' : 'Save Daily Check-In'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 4: WORRY JOURNAL & COGNITIVE REFRAME ================= */}
      {activeTab === 'reframe' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Worry Journal & Cognitive Reframe
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cognitive reframing dismantles catastrophic thinking by separating controllable actions from uncontrollable circumstances. Answer the four reflective prompts below.
            </p>
          </div>

          <div className="space-y-6">
            {COGNITIVE_REFRAME_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  {q.label}
                </label>
                <textarea
                  rows={3}
                  value={reframeAnswers[q.id] || ''}
                  onChange={(e) =>
                    setReframeAnswers({
                      ...reframeAnswers,
                      [q.id]: e.target.value,
                    })
                  }
                  placeholder={q.placeholder}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Reflections remain strictly in your active browser session.
            </span>
            <button
              onClick={() => {
                setReframeSaved(true);
                setTimeout(() => setReframeSaved(false), 2500);
              }}
              className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors shadow-xs"
            >
              {reframeSaved ? 'Reflections Saved!' : 'Save Reflection'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
