import React, { useState } from 'react';
import {
  TrendingUp,
  RotateCcw,
  Trash2,
  ShieldAlert,
  ArrowRight,
  Info,
  Calendar,
} from 'lucide-react';
import { StoredSessionProgress } from '../types/assessment';

interface ProgressInsightsProps {
  progressList: StoredSessionProgress[];
  onClearProgress: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const ProgressInsights: React.FC<ProgressInsightsProps> = ({
  progressList,
  onClearProgress,
  onNavigate,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full px-3 py-1">
          <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
          <span>Session History & Trends</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Progress & Assessment History
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Review screening scores completed during your active session. Tracking trends across standardized scales (PSS-10, GAD-7, PHQ-9) helps identify whether coping strategies are stabilizing symptoms.
        </p>
      </div>

      {/* Privacy Notice Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2 text-xs text-slate-600">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-700" />
          <span>Browser Session Storage Policy</span>
        </h3>
        <p className="leading-relaxed">
          MindPulse stores assessment history exclusively in your local browser memory for this session. It is never transmitted across the network. If you close your browser or click "Erase All Data", all records disappear permanently.
        </p>
      </div>

      {/* History Table or Empty State */}
      {progressList.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700">
            <TrendingUp className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No Assessment Records Found in This Session</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Take a stress, anxiety, or depression screening to see your results tracked here. All calculations run client-side.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('assessments')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors shadow-xs"
            >
              <span>Explore Assessment Modules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Completed Assessments ({progressList.length})
            </h2>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Erase All Session History</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Assessment Scope</th>
                  <th className="py-3 px-3">Stress (PSS-10)</th>
                  <th className="py-3 px-3">Anxiety (GAD-7)</th>
                  <th className="py-3 px-3">Depression (PHQ-9)</th>
                  <th className="py-3 px-3 text-right">Safety Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progressList.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 text-slate-600 font-mono">
                      {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 capitalize">
                      {entry.category} Screening
                    </td>
                    <td className="py-3 px-3">
                      {entry.stressScore !== undefined ? (
                        <span className="font-mono font-semibold text-slate-800">
                          {entry.stressScore}/40 ({entry.stressSeverity})
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {entry.anxietyScore !== undefined ? (
                        <span className="font-mono font-semibold text-slate-800">
                          {entry.anxietyScore}/21 ({entry.anxietySeverity})
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {entry.depressionScore !== undefined ? (
                        <span className="font-mono font-semibold text-slate-800">
                          {entry.depressionScore}/27 ({entry.depressionSeverity})
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {entry.isHighRisk ? (
                        <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                          Safety Flag
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">Standard</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-xs text-slate-500 leading-relaxed">
            Note: Changes in screening scores reflect self-reported symptom frequency and do not replace formal clinical assessment of improvement or remission.
          </div>
        </div>
      )}

      {/* Erase Modal */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Erase Session History?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This action will permanently delete all assessment scores from this browser session. This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearProgress();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Yes, Erase All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
