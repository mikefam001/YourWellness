import React, { useState } from 'react';
import {
  PhoneCall,
  ShieldAlert,
  Globe,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Heart,
  LifeBuoy,
} from 'lucide-react';
import { CRISIS_DIRECTORY } from '../data/crisisContacts';

export const CrisisDirectory: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('NG');
  const countryData = CRISIS_DIRECTORY[selectedCountry] || CRISIS_DIRECTORY['OTHER'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-50 rounded-full px-3 py-1">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>24/7 Verified Emergency Helplines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Emergency Crisis & Support Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          If you or someone you care about is experiencing suicidal thoughts, acute psychological distress, or feels unsafe, free and confidential support is available 24/7.
        </p>
      </div>

      {/* Immediate Emergency Action Box */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-600 text-white rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-rose-950">
              In an Immediate Life-Threatening Emergency:
            </h2>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
              If someone is in immediate danger of taking their life, hurting themselves, or requires urgent medical resuscitation, do not wait.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-rose-900">
          <div className="p-4 bg-white/80 rounded-xl border border-rose-200">
            <strong className="block text-sm font-bold text-rose-950">1. Emergency Services</strong>
            <p className="mt-1">
              Call emergency dispatch ({countryData.generalEmergencyNumber}) or go directly to the nearest hospital emergency room.
            </p>
          </div>
          <div className="p-4 bg-white/80 rounded-xl border border-rose-200">
            <strong className="block text-sm font-bold text-rose-950">2. Stay with a Person</strong>
            <p className="mt-1">
              Ask a trusted friend, family member, or neighbor to stay with you physically or on the phone until help arrives.
            </p>
          </div>
          <div className="p-4 bg-white/80 rounded-xl border border-rose-200">
            <strong className="block text-sm font-bold text-rose-950">3. Remove Access</strong>
            <p className="mt-1">
              Put physical distance between yourself and any objects, medications, or locations that could be used for self-harm.
            </p>
          </div>
        </div>
      </div>

      {/* Country Selection Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label htmlFor="country-filter" className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Select Country / Region:
          </label>
          <div className="relative min-w-[280px]">
            <select
              id="country-filter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            >
              <option value="NG">Nigeria (SURPIN, LASEMA, She Writes Woman)</option>
              <option value="US">United States (988 Lifeline, Crisis Text Line)</option>
              <option value="GB">United Kingdom (NHS 111, Samaritans, 999)</option>
              <option value="CA">Canada (988 Suicide Crisis Helpline, 911)</option>
              <option value="AU">Australia (Lifeline 13 11 14, 000)</option>
              <option value="OTHER">International / Global Directory</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          {countryData.description}
        </p>
      </div>

      {/* Verified Contacts List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Verified Crisis Helplines for {countryData.countryName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countryData.contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{contact.name}</h3>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {contact.freephone ? 'Toll-Free' : 'Standard'}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  <span>Hours: {contact.operatingHours}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {contact.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                {contact.telephone && (
                  <a
                    href={`tel:${contact.telephone}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
                    aria-label={`Call ${contact.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {contact.telephone}</span>
                  </a>
                )}
                {contact.sms && (
                  <a
                    href={`sms:${contact.sms}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    aria-label={`Text ${contact.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                    <span>Text {contact.sms}</span>
                  </a>
                )}
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    aria-label={`Visit ${contact.name} website`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Directories Box */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-teal-700 shrink-0" />
          <div className="text-xs text-slate-600">
            <strong className="block text-slate-900 font-semibold">Living outside the listed countries?</strong>
            Access Befrienders Worldwide or Find A Helpline to locate verified crisis lines in over 130 nations.
          </div>
        </div>
        <a
          href="https://findahelpline.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-teal-800 bg-white border border-teal-200 rounded-xl hover:bg-teal-50 transition-colors shrink-0"
        >
          <span>Visit findahelpline.com</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
