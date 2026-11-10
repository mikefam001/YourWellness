import React, { useState } from 'react';
import { Phone, AlertCircle, X, Shield, Globe, ExternalLink } from 'lucide-react';
import { CRISIS_DIRECTORY } from '../data/crisisContacts';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCountry?: string;
  isHighRiskEnforced?: boolean;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({
  isOpen,
  onClose,
  defaultCountry = 'NG',
  isHighRiskEnforced = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    CRISIS_DIRECTORY[defaultCountry] ? defaultCountry : 'NG'
  );

  if (!isOpen) return null;

  const countryInfo = CRISIS_DIRECTORY[selectedCountry] || CRISIS_DIRECTORY['OTHER'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-dialog-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-rose-200 overflow-hidden my-8">
        {/* Header Alert Ribbon */}
        <div className="bg-rose-600 px-6 py-5 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 id="crisis-dialog-title" className="text-xl font-bold tracking-tight">
                Immediate Crisis & Emergency Support
              </h2>
              <p className="text-sm text-rose-100 mt-0.5">
                Confidential, free assistance is available 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>
          {!isHighRiskEnforced && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close crisis support modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Urgent Directive Box */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 md:p-5">
            <h3 className="text-base font-semibold text-rose-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
              If you or someone you know is in immediate physical danger:
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-rose-900/90 list-disc list-inside">
              <li>
                Call emergency services immediately (<span className="font-bold text-rose-950">{countryInfo.generalEmergencyNumber}</span>) or go to the nearest hospital emergency department.
              </li>
              <li>Reach out to a trusted family member, friend, or neighbor who can stay with you right now.</li>
              <li>Step away from any objects or environments that could be used for self-harm.</li>
            </ul>
          </div>

          {/* Country Selector */}
          <div className="space-y-2">
            <label htmlFor="country-select" className="block text-sm font-semibold text-slate-800">
              Select Your Country for Verified Local Helplines:
            </label>
            <div className="relative">
              <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                <option value="NG">Nigeria (SURPIN, LASEMA, She Writes Woman)</option>
                <option value="US">United States (988 Lifeline, Crisis Text Line)</option>
                <option value="GB">United Kingdom (NHS 111, Samaritans, 999)</option>
                <option value="CA">Canada (988 Suicide Crisis Helpline, 911)</option>
                <option value="AU">Australia (Lifeline 13 11 14, 000)</option>
                <option value="OTHER">International / Other Nations</option>
              </select>
            </div>
            <p className="text-xs text-slate-500">
              Showing verified emergency and suicide prevention contacts for <strong className="text-slate-700">{countryInfo.countryName}</strong>.
            </p>
          </div>

          {/* Contacts List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Contacts for {countryInfo.countryName}
            </h4>

            {countryInfo.contacts.map((contact) => (
              <div
                key={contact.id}
                className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{contact.name}</h5>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{contact.operatingHours}</span>
                      <span aria-hidden="true">·</span>
                      <span>{contact.freephone ? 'Freephone / Toll-Free' : 'Standard local rate'}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">{contact.notes}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {contact.telephone && (
                      <a
                        href={`tel:${contact.telephone}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap"
                        aria-label={`Call ${contact.name} at ${contact.telephone}`}
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Call {contact.telephone}</span>
                      </a>
                    )}
                    {contact.website && (
                      <a
                        href={contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        aria-label={`Visit ${contact.name} official website (opens in new tab)`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Global Fallback Directory Link */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-400" aria-hidden="true" />
              Not listed here? Worldwide directory at Befrienders & Find A Helpline.
            </span>
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-700 hover:text-teal-800 underline underline-offset-2"
            >
              findahelpline.com
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 max-w-md">
            MindPulse provides educational screening support and does not replace emergency clinical services.
          </p>
          {!isHighRiskEnforced ? (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              I Understand, Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
