'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import { Language } from '../types';
import { Sprout, Settings, Eye, Globe } from 'lucide-react';

export default function Header() {
  const { plan, language, setLanguage, simpleMode, setSimpleMode, activeTab, setActiveTab, t } = useApp();

  const currentCrop = plan ? CROPS_DATA[plan.crop] : null;

  return (
    <header className="sticky top-0 z-40 bg-forest text-white shadow-md">
      {/* Top utility row */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-forest-light/40 text-xs">
        <div className="flex items-center gap-1.5 opacity-90">
          <span className="inline-block w-2 h-2 rounded-full bg-amber animate-pulse"></span>
          <span className="font-medium tracking-wide">Maharashtra Farmer MVP</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Simple Mode Toggle */}
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              simpleMode
                ? 'bg-amber text-charcoal font-semibold shadow-sm'
                : 'bg-forest-light/60 hover:bg-forest-light text-white'
            }`}
            title="Toggle Simple Mode"
            aria-label="Toggle Simple Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{simpleMode ? 'Simple ON' : 'Simple Mode'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-forest-dark/80 rounded-md p-0.5 border border-forest-light/30">
            <Globe className="w-3.5 h-3.5 ml-1 mr-0.5 text-sage-light opacity-80" />
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  language === lang
                    ? 'bg-amber text-charcoal font-bold'
                    : 'text-sage-light hover:text-white'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Brand & Crop Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div 
          onClick={() => {
            if (plan) setActiveTab('grow');
            else setActiveTab('start');
          }}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <div className="w-10 h-10 rounded-xl bg-amber/20 border border-amber/40 flex items-center justify-center text-amber shadow-inner">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight">
                {t('appName')}
              </h1>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-amber text-charcoal rounded">
                MVP
              </span>
            </div>
            <p className="text-xs text-sage-light/80 line-clamp-1">{t('tagline')}</p>
          </div>
        </div>

        {/* Plan status pill or settings button */}
        <div className="flex items-center gap-2">
          {plan && currentCrop && (
            <button
              onClick={() => setActiveTab('start')}
              className="hidden sm:flex flex-col items-end px-3 py-1 bg-forest-dark/70 hover:bg-forest-dark rounded-lg border border-forest-light/40 transition-colors text-right"
              title="Edit crop plan"
            >
              <span className="text-xs font-semibold text-amber flex items-center gap-1">
                {currentCrop.name[language]} ({plan.areaAcres} ac)
              </span>
              <span className="text-[10px] text-sage-light/80">
                {plan.district} • Edit
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2.5 rounded-lg border transition-colors ${
              activeTab === 'settings'
                ? 'bg-amber text-charcoal border-amber font-bold'
                : 'bg-forest-light/40 text-sage-light border-forest-light/40 hover:bg-forest-light hover:text-white'
            }`}
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile active crop bar */}
      {plan && currentCrop && (
        <div className="sm:hidden px-4 py-1.5 bg-forest-dark/95 border-t border-forest-light/30 flex items-center justify-between text-xs">
          <span className="text-sage-light flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber"></span>
            <span>
              {currentCrop.name[language]} • {plan.areaAcres} Acres • {plan.district}
            </span>
          </span>
          <button
            onClick={() => setActiveTab('start')}
            className="text-[11px] text-amber hover:underline font-medium"
          >
            Change
          </button>
        </div>
      )}
    </header>
  );
}
