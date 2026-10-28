'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Settings,
  Globe,
  Eye,
  Trash2,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function SettingsScreen() {
  const {
    language,
    setLanguage,
    simpleMode,
    setSimpleMode,
    plan,
    resetPlan,
    setActiveTab,
    t,
  } = useApp();

  const handleReset = () => {
    if (confirm(t('resetConfirm'))) {
      resetPlan();
      setActiveTab('start');
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full animate-fade-in pb-24 space-y-5">
      {/* Top Banner */}
      <div className="bg-sage/70 rounded-card p-4 border border-forest/15">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-forest text-white">
            <Settings className="w-5 h-5 text-amber" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold font-display text-forest">
              {t('settingsHeading')}
            </h2>
            <p className="text-xs md:text-sm text-charcoal-muted">
              {t('settingsSubheading')}
            </p>
          </div>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-forest font-bold text-sm">
          <Globe className="w-4 h-4 text-forest" />
          <span>{t('chooseLanguage')}</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: 'en', label: 'English', desc: 'Standard' },
            { id: 'hi', label: 'हिन्दी', desc: 'हिंदी भाषा' },
            { id: 'mr', label: 'मराठी', desc: 'स्थानिक भाषा' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id as Language)}
              className={`min-h-[52px] p-2.5 rounded-xl border text-center transition-all ${
                language === item.id
                  ? 'bg-forest text-white border-forest font-bold shadow-sm'
                  : 'bg-white text-charcoal border-[#D5E0D7] hover:border-forest/50'
              }`}
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <div className={`text-[10px] ${language === item.id ? 'text-sage-light' : 'text-charcoal-muted'}`}>
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Simple Mode Toggle (FR-G5) */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-forest font-bold text-sm">
              <Eye className="w-4 h-4 text-forest" />
              <span>{t('simpleModeLabel')}</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('simpleModeDesc')}
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={simpleMode}
              onChange={(e) => setSimpleMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#C8D6CA] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest"></div>
          </label>
        </div>
      </div>

      {/* Active Crop Plan Summary & Reset */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-forest">
          Current Crop Season Plan
        </h3>

        {plan ? (
          <div className="p-3 bg-sage/40 rounded-xl border border-forest/15 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Crop:</span>
              <strong className="text-charcoal capitalize">{plan.crop}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Sowing Date:</span>
              <strong className="text-charcoal">{plan.sowingDate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Area:</span>
              <strong className="text-charcoal">{plan.areaAcres} Acres</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Location:</span>
              <strong className="text-charcoal">
                {plan.village ? `${plan.village}, ` : ''}{plan.district}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Crop Health Factor:</span>
              <strong className="text-forest font-bold">
                {plan.healthFactor} ({plan.healthSeverity})
              </strong>
            </div>
          </div>
        ) : (
          <p className="text-xs text-charcoal-muted">No crop plan active.</p>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setActiveTab('start')}
            className="flex-1 min-h-[44px] py-2 px-3 bg-forest hover:bg-forest-dark text-white rounded-lg text-xs font-bold transition-all text-center"
          >
            {plan ? 'Edit Plan Details' : 'Create New Plan'}
          </button>

          {plan && (
            <button
              onClick={handleReset}
              className="min-h-[44px] py-2 px-3 bg-clay/10 hover:bg-clay/20 text-clay border border-clay/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('btnReset')}</span>
            </button>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm space-y-2 text-xs">
        <div className="flex items-center gap-2 text-forest font-bold text-sm">
          <Info className="w-4 h-4 text-forest" />
          <span>{t('aboutKisanSaathi')}</span>
        </div>
        <p className="text-charcoal-muted leading-relaxed">
          {t('aboutText')}
        </p>
        <div className="pt-2 border-t border-[#EAEFEA] flex flex-wrap gap-2 text-[11px] text-charcoal-light">
          <span>Track: Agriculture & Rural Solutions</span>
          <span>•</span>
          <span>Oct 2026 Release</span>
          <span>•</span>
          <span>Open-Meteo & Agmarknet Fallback Ready</span>
        </div>
      </div>
    </div>
  );
}

