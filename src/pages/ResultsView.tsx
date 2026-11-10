import React, { useState } from 'react';
import {
  Download,
  Printer,
  RotateCcw,
  Share2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  PhoneCall,
  Info,
} from 'lucide-react';
import { ComprehensiveAssessmentReport, AssessmentResultItem } from '../types/assessment';
import { generateAssessmentPDF, exportReportAsJSON } from '../assessment-engine/pdfGenerator';

interface ResultsViewProps {
  report: ComprehensiveAssessmentReport;
  onRetake: () => void;
  onOpenCrisisModal: () => void;
  onNavigate: (view: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  report,
  onRetake,
  onOpenCrisisModal,
  onNavigate,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plan' | 'printPreview'>('overview');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    generateAssessmentPDF(report);
  };

  const handleCopySummary = () => {
    const textSummary = `MindPulse Mental Wellness Screening Summary
Assessment Date: ${new Date(report.timestamp).toLocaleDateString()}
Category: ${report.completedCategories.toUpperCase()}

${report.results.stress ? `Stress (PSS-10): ${report.results.stress.score}/40 - ${report.results.stress.severityLabel}\n` : ''}${
      report.results.anxiety ? `Anxiety (GAD-7): ${report.results.anxiety.score}/21 - ${report.results.anxiety.severityLabel}\n` : ''
    }${report.results.depression ? `Depression (PHQ-9): ${report.results.depression.score}/27 - ${report.results.depression.severityLabel}\n` : ''}
Note: This screening report is educational and does not constitute a medical diagnosis.`;

    navigator.clipboard.writeText(textSummary).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const resultsList = Object.values(report.results).filter(
    (item): item is AssessmentResultItem => item !== undefined
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Toolbar (Hidden in print) */}
      <div className="no-print space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full px-3 py-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Assessment Completed · In-Browser Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personalized Screening Findings & Action Plan
            </h1>
            <p className="text-xs text-slate-500">
              Generated on {new Date(report.timestamp).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
              title="Download formatted PDF report"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
              title="Print official clinical summary"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              title="Copy summary text"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={onRetake}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Urgent Safety Alert Banner (if triggered) */}
      {report.safetyFlags.isHighRisk && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-600 text-white rounded-xl shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-rose-950">
                Safety Priority Alert: Immediate Support Recommended
              </h2>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                Your responses indicated thoughts of self-harm, suicidal distress, or an unsafe environment. While psychometric screening tools calculate numerical symptom indices, positive safety indications override questionnaire numbers. You deserve compassionate, prompt human care.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenCrisisModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Connect with Verified Crisis Support</span>
            </button>
            <span className="text-xs text-rose-800">
              Free, confidential 24/7 helplines in Nigeria, US, UK, Canada, Australia & worldwide.
            </span>
          </div>
        </div>
      )}

      {/* 3. Results Overview Cards (Distinct, Unblended Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Screening Results by Clinical Domain
          </h2>
          <span className="text-xs text-slate-500">
            Validated cut-off classifications
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultsList.map((item) => {
            const percent = Math.min(100, Math.round((item.score / item.maxScore) * 100));

            // Severity styling
            let badgeBg = 'bg-slate-100 text-slate-800 border-slate-300';
            let barColor = 'bg-teal-700';

            if (item.severityLevel === 'severe' || item.severityLevel === 'moderately_severe') {
              badgeBg = 'bg-rose-50 text-rose-900 border-rose-300';
              barColor = 'bg-rose-600';
            } else if (item.severityLevel === 'moderate') {
              badgeBg = 'bg-amber-50 text-amber-900 border-amber-300';
              barColor = 'bg-amber-500';
            } else if (item.severityLevel === 'mild') {
              badgeBg = 'bg-blue-50 text-blue-900 border-blue-300';
              barColor = 'bg-blue-600';
            } else {
              badgeBg = 'bg-emerald-50 text-emerald-900 border-emerald-300';
              barColor = 'bg-emerald-600';
            }

            return (
              <div
                key={item.category}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 capitalize">
                        {item.category} Screening
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {item.instrumentName}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md border ${badgeBg} whitespace-nowrap`}
                    >
                      {item.severityLabel}
                    </span>
                  </div>

                  {/* Score & Gauge Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-slate-500">Calculated Score</span>
                      <span className="text-2xl font-bold font-mono text-slate-900">
                        {item.score}{' '}
                        <span className="text-xs font-normal text-slate-400">/ {item.maxScore}</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Clinical Meaning */}
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {item.clinicalMeaning}
                  </p>

                  {/* Key Reported Symptoms */}
                  {item.symptomSummary.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-slate-700 block">Reported Indicators:</span>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        {item.symptomSummary.slice(0, 3).map((sym, i) => (
                          <li key={i}>{sym}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Functional Impact:</span>
                  <span className="font-medium text-slate-800 text-right max-w-[160px] truncate">
                    {item.functionalImpact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Personalized 4-Stage Action Plan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Evidence-Informed Guidance
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Your Personalized 4-Stage Action Plan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Practical, evidence-informed steps tailored to your reported symptoms and daily lifestyle context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stage 1: Today */}
          <div className="space-y-3 p-5 rounded-xl bg-teal-50/50 border border-teal-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="text-sm font-bold text-teal-950">Actions to Consider Today</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              {resultsList.flatMap((item) => item.recommendations.today).slice(0, 4).map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Stage 2: Next 7 Days */}
          <div className="space-y-3 p-5 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm font-bold text-blue-950">Actions for the Next 7 Days</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              {resultsList.flatMap((item) => item.recommendations.sevenDays).slice(0, 4).map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Stage 3: Longer-Term Lifestyle Habits */}
          <div className="space-y-3 p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm font-bold text-slate-900">Longer-Term Resilience Habits</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              {resultsList.flatMap((item) => item.recommendations.lifestyle).slice(0, 4).map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Stage 4: When to Seek Professional Medical Care */}
          <div className="space-y-3 p-5 rounded-xl bg-rose-50/50 border border-rose-200">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-rose-700 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="text-sm font-bold text-rose-950">When to Seek Healthcare Care</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              {resultsList.flatMap((item) => item.recommendations.whenToSeekProfessionalHelp).slice(0, 4).map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Link to Self-Care Toolkit */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-900">Need immediate nervous system regulation?</h4>
            <p className="text-xs text-slate-500">Practice guided Box Breathing or 5-4-3-2-1 Sensory Grounding right now.</p>
          </div>
          <button
            onClick={() => onNavigate('self-care')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors shrink-0"
          >
            <span>Open Self-Care Toolkit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Comprehensive Summary & Medical Governance */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-700" />
          <span>Clinical Governance & Interpretation Context</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {report.clinicianSummary}
        </p>
        <p className="text-xs text-slate-500 leading-relaxed">
          Screening scales provide standard statistical cut-offs (e.g. GAD-7 ≥ 10 indicating probable generalized anxiety, PHQ-9 ≥ 10 indicating moderate depressive indicators), but clinical diagnoses require comprehensive clinical interviews, medical rule-outs (such as thyroid or metabolic testing), and ongoing psychiatric evaluation.
        </p>
      </div>

      {/* 6. High-Fidelity Printable Template (Visible strictly during Print) */}
      <div className="print-only hidden p-8 space-y-6 text-black bg-white">
        <div className="border-b-2 border-black pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">MindPulse Screening Summary</h1>
            <p className="text-xs text-gray-600">Client-Side Psychological Screening Assessment</p>
          </div>
          <div className="text-right text-xs">
            <p>Date: {new Date(report.timestamp).toLocaleDateString()}</p>
            <p>Scope: {report.completedCategories.toUpperCase()}</p>
          </div>
        </div>

        {report.safetyFlags.isHighRisk && (
          <div className="border-2 border-red-600 bg-red-50 p-4 rounded text-xs text-red-900 font-bold">
            SAFETY ALERT: User responses indicated self-harm or suicidal distress. Immediate clinical consultation advised.
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase border-b pb-1">Screening Scores & Severity</h2>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Instrument</th>
                <th className="py-2">Score</th>
                <th className="py-2">Severity Classification</th>
                <th className="py-2">Clinical Implication</th>
              </tr>
            </thead>
            <tbody>
              {resultsList.map((item) => (
                <tr key={item.category} className="border-b">
                  <td className="py-2 font-bold">{item.instrumentName}</td>
                  <td className="py-2">{item.score} / {item.maxScore}</td>
                  <td className="py-2 font-semibold">{item.severityLabel}</td>
                  <td className="py-2 text-gray-700">{item.clinicalMeaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 pt-4">
          <h2 className="text-sm font-bold uppercase border-b pb-1">Recommended Next Steps</h2>
          <ul className="text-xs list-disc list-inside space-y-1">
            {resultsList.flatMap((item) => item.recommendations.today).slice(0, 3).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
            {resultsList.flatMap((item) => item.recommendations.whenToSeekProfessionalHelp).slice(0, 2).map((r, i) => (
              <li key={i} className="font-semibold">{r}</li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t text-[10px] text-gray-500 leading-tight">
          Disclaimer: This summary is generated for personal informational and screening purposes only. It does not replace a medical or psychiatric diagnosis. If in crisis, call your local emergency department or 988/112 immediately.
        </div>
      </div>
    </div>
  );
};
