'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA, MAHARASHTRA_DISTRICTS } from '../data/crops';
import { CropId, Language } from '../types';
import { Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StartScreen() {
  const { plan, savePlan, language, setLanguage, t } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<CropId>(plan?.crop || 'tomato');
  
  // Calculate default sowing date: 40 days ago so demo lands right in Vegetative/Flowering stage!
  const getDaysAgoDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };

  const [sowingDate, setSowingDate] = useState<string>(
    plan?.sowingDate || getDaysAgoDate(40)
  );
  const [areaAcres, setAreaAcres] = useState<number>(plan?.areaAcres || 2);
  const [district, setDistrict] = useState<string>(plan?.district || 'Nashik');
  const [village, setVillage] = useState<string>(plan?.village || 'Ozar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePlan({
      crop: selectedCrop,
      sowingDate,
      areaAcres: Number(areaAcres),
      district,
      village,
      language,
    });
  };

  const handleQuickDemo = () => {
    setLanguage('en');
    setSelectedCrop('tomato');
    const demoDate = getDaysAgoDate(40);
    setSowingDate(demoDate);
    setAreaAcres(2);
    setDistrict('Nashik');
    setVillage('Dindori');
    savePlan({
      crop: 'tomato',
      sowingDate: demoDate,
      areaAcres: 2,
      district: 'Nashik',
      village: 'Dindori',
      language: 'en',
      healthFactor: 1.0,
      healthSeverity: 'none',
      tasksDone: [],
    });
  };

  return (
    <div className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full animate-fade-in pb-20">
      {/* Intro banner */}
      <div className="bg-sage/70 rounded-card p-4 md:p-5 border border-forest/15 mb-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-display text-forest mb-1">
              {t('setupTitle')}
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {t('setupSubtitle')}
            </p>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 bg-amber text-charcoal font-bold text-xs rounded-full shadow-sm whitespace-nowrap">
            &lt; 30 Seconds
          </span>
        </div>

        {/* 1-Click Demo Shortcut */}
        <div className="mt-4 pt-3 border-t border-forest/15 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-charcoal font-medium">
            Judging or testing right now?
          </span>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-forest text-white rounded-lg text-xs font-semibold hover:bg-forest-dark transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span>{t('setupQuickDemo')}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            1. {t('chooseLanguage')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'en', label: 'English', sub: 'Default' },
              { id: 'hi', label: 'हिन्दी', sub: 'हिंदी' },
              { id: 'mr', label: 'मराठी', sub: 'महाराष्ट्र' },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setLanguage(item.id as Language)}
                className={`min-h-[48px] p-2.5 rounded-card border text-center transition-all ${
                  language === item.id
                    ? 'border-forest bg-forest text-white shadow-sm font-bold'
                    : 'border-[#D5E0D7] bg-white text-charcoal hover:border-forest/50'
                }`}
              >
                <div className="text-sm font-semibold">{item.label}</div>
                <div className={`text-[10px] ${language === item.id ? 'text-sage-light' : 'text-charcoal-light'}`}>
                  {item.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Crop Selection */}
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            2. {t('chooseCrop')}
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(['tomato', 'onion', 'soybean'] as CropId[]).map((cropId) => {
              const crop = CROPS_DATA[cropId];
              const isSelected = selectedCrop === cropId;
              const emoji = cropId === 'tomato' ? '🍅' : cropId === 'onion' ? '🧅' : '🌱';

              return (
                <button
                  type="button"
                  key={cropId}
                  onClick={() => setSelectedCrop(cropId)}
                  className={`min-h-[72px] p-3 rounded-card border text-left flex flex-col justify-between transition-all relative ${
                    isSelected
                      ? 'border-forest bg-white ring-2 ring-forest shadow-sm'
                      : 'border-[#D5E0D7] bg-white hover:border-forest/40'
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-forest absolute top-2 right-2" />
                  )}
                  <span className="text-2xl mb-1">{emoji}</span>
                  <div>
                    <span className="block font-bold text-sm text-charcoal leading-tight">
                      {crop.name[language]}
                    </span>
                    <span className="text-[11px] text-charcoal-muted">
                      {crop.seasonLengthDays} days
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sowing Date with Quick Shortcuts */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-charcoal flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-forest" />
              <span>3. {t('sowingDateLabel')}</span>
            </label>
          </div>
          <p className="text-xs text-charcoal-muted mb-2">
            {t('sowingDateHelp')}
          </p>

          <input
            type="date"
            value={sowingDate}
            onChange={(e) => setSowingDate(e.target.value)}
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-card border border-[#C8D6CA] bg-white text-charcoal text-sm font-medium focus:ring-2 focus:ring-forest focus:border-forest"
            required
          />

          {/* Quick Date Pills */}
          <div className="flex flex-wrap gap-2 mt-2.5">
            {[
              { label: t('shortcutToday'), days: 0 },
              { label: t('shortcut20Days'), days: 20 },
              { label: t('shortcut40Days'), days: 40 },
              { label: t('shortcut70Days'), days: 70 },
            ].map((chip) => {
              const targetDate = getDaysAgoDate(chip.days);
              const isActive = sowingDate === targetDate;

              return (
                <button
                  type="button"
                  key={chip.days}
                  onClick={() => setSowingDate(targetDate)}
                  className={`text-xs px-2.5 py-1.5 rounded-full border transition-all ${
                    isActive
                      ? 'bg-amber text-charcoal font-bold border-amber shadow-xs'
                      : 'bg-sage/40 text-charcoal border-forest/20 hover:bg-sage'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Land Area (Acres) */}
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            4. {t('landAreaLabel')}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.25"
              min="0.25"
              max="100"
              value={areaAcres}
              onChange={(e) => setAreaAcres(Math.max(0.25, parseFloat(e.target.value) || 1))}
              className="w-32 min-h-[48px] px-3.5 py-2 rounded-card border border-[#C8D6CA] bg-white text-charcoal text-base font-bold focus:ring-2 focus:ring-forest"
              required
            />
            <div className="flex gap-1.5">
              {[1, 2, 3, 5].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAreaAcres(val)}
                  className={`min-h-[40px] px-3 py-1 text-xs rounded-lg border font-semibold ${
                    areaAcres === val
                      ? 'bg-forest text-white border-forest'
                      : 'bg-white text-charcoal border-[#D5E0D7]'
                  }`}
                >
                  {val} {val === 1 ? 'Acre' : 'Acres'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* District & Village */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest" />
              <span>5. {t('districtLabel')}</span>
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full min-h-[48px] px-3 py-2 rounded-card border border-[#C8D6CA] bg-white text-charcoal text-sm font-medium focus:ring-2 focus:ring-forest"
            >
              {MAHARASHTRA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5">
              {t('villageLabel')}
            </label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder="e.g. Ozar, Niphad, Baramati"
              className="w-full min-h-[48px] px-3.5 py-2 rounded-card border border-[#C8D6CA] bg-white text-charcoal text-sm focus:ring-2 focus:ring-forest"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full min-h-[48px] py-3.5 px-4 bg-forest hover:bg-forest-dark active:scale-[0.99] text-white font-bold text-base rounded-card shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{plan ? t('btnUpdatePlan') : t('btnStartPlan')}</span>
            <span className="text-amber">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
