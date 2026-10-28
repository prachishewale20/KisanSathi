'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import { SAMPLE_PRICES_DATA } from '../data/samplePrices';
import { HealthSeverity } from '../types';
import {
  TrendingUp,
  Scale,
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  IndianRupee
} from 'lucide-react';

export default function EstimateScreen() {
  const { plan, setHealthSeverity, language, setActiveTab, t } = useApp();

  if (!plan) {
    return (
      <div className="p-8 text-center">
        <p className="text-charcoal mb-4">No active crop plan found.</p>
        <button
          onClick={() => setActiveTab('start')}
          className="px-4 py-2 bg-forest text-white rounded-lg font-bold"
        >
          Start a Crop Plan
        </button>
      </div>
    );
  }

  const crop = CROPS_DATA[plan.crop] || CROPS_DATA.tomato;
  const priceData = SAMPLE_PRICES_DATA[plan.crop] || SAMPLE_PRICES_DATA.tomato;

  const baseYieldPerAcre = crop.avgYieldPerAcreQuintal;
  const area = plan.areaAcres;
  const healthFactor = plan.healthFactor || 1.0;
  const severity = plan.healthSeverity || 'none';

  // Mathematical formula (FR-ES1)
  const expectedYield = Math.round(area * baseYieldPerAcre * healthFactor * 10) / 10;
  const healthyPotentialYield = Math.round(area * baseYieldPerAcre * 10) / 10;

  // Income calculations (FR-ES2, FR-ES3)
  const modalPrice = priceData.currentModalPrice;
  const minPrice = priceData.minPrice;
  const maxPrice = priceData.maxPrice;

  const expectedIncomeModal = Math.round(expectedYield * modalPrice);
  const expectedIncomeLow = Math.round(expectedYield * minPrice);
  const expectedIncomeHigh = Math.round(expectedYield * maxPrice);

  // Harvest date calculation
  const sowingDateObj = new Date(plan.sowingDate);
  const harvestDateObj = new Date(sowingDateObj);
  harvestDateObj.setDate(harvestDateObj.getDate() + crop.seasonLengthDays);
  const harvestDateStr = harvestDateObj.toLocaleDateString(
    language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full animate-fade-in pb-24 space-y-5">
      {/* Top Banner */}
      <div className="bg-sage/70 rounded-card p-4 border border-forest/15">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-forest text-white">
            <Scale className="w-5 h-5 text-amber" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold font-display text-forest">
              {t('estimateHeading')}
            </h2>
            <p className="text-xs md:text-sm text-charcoal-muted">
              {t('estimateSubheading')}
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Estimate Disclaimer Banner (Phase 2 Item 3) */}
      <div className="p-3 bg-amber-50 border-2 border-amber/50 rounded-xl text-xs text-charcoal flex items-start gap-2 shadow-xs">
        <AlertCircle className="w-4 h-4 text-amber-dark shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-charcoal block">
            {t('notGuaranteedNotice')}
          </span>
          <span className="text-[11px] text-charcoal-muted mt-0.5 block">
            Regional starter yield benchmarks: Tomato (80 Q/ac), Onion (80 Q/ac), Soybean (4 Q/ac). Multiplied by health factor: Healthy (1.00), Minor (0.90), Moderate (0.75), Severe (0.50).
          </span>
        </div>
      </div>

      {/* Primary Key Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Yield Estimate Card */}
        <div className="bg-white rounded-card p-5 border-2 border-forest/20 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
            <span className="font-semibold uppercase tracking-wider text-forest">
              {t('yieldCardTitle')}
            </span>
            <span className="text-[11px] px-2 py-0.5 bg-sage text-forest font-bold rounded-full">
              {plan.areaAcres} Acres
            </span>
          </div>

          {/* Big Readable Number (28-36px Poppins as per SRS Section 4) */}
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-4xl md:text-5xl font-display font-extrabold text-charcoal tracking-tight">
              {expectedYield}
            </span>
            <span className="text-base md:text-lg font-bold text-amber-dark">
              {t('quintalsUnit')}
            </span>
          </div>

          <div className="text-xs text-charcoal-muted border-t border-[#EAEFEA] pt-2.5 mt-2 flex items-center justify-between">
            <span>Potential if 100% healthy:</span>
            <span className="font-bold text-charcoal">
              {healthyPotentialYield} Qtl
            </span>
          </div>

          {healthFactor < 1.0 && (
            <div className="mt-2 text-[11px] text-clay font-medium bg-clay/10 p-2 rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                Reduced by {Math.round((1 - healthFactor) * 100)}% due to reported {severity} pest/disease condition.
              </span>
            </div>
          )}
        </div>

        {/* Income Estimate Card */}
        <div className="bg-white rounded-card p-5 border-2 border-amber/40 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
            <span className="font-semibold uppercase tracking-wider text-amber-dark">
              {t('incomeCardTitle')}
            </span>
            <span className="text-[11px] px-2 py-0.5 bg-amber/20 text-charcoal font-bold rounded-full">
              Estimate
            </span>
          </div>

          {/* Big Readable Number (28-36px Poppins as per SRS Section 4) */}
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl md:text-4xl font-display font-extrabold text-forest tracking-tight">
              ₹{expectedIncomeModal.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-xs text-charcoal-muted border-t border-[#EAEFEA] pt-2.5 mt-2">
            <span className="block text-[11px] font-medium text-charcoal-muted mb-0.5">
              {t('rangeLabel')}:
            </span>
            <span className="font-bold text-charcoal text-xs sm:text-sm">
              ₹{expectedIncomeLow.toLocaleString('en-IN')} — ₹{expectedIncomeHigh.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Harvest Date & Market Baseline Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sage text-forest">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-charcoal-muted block">
              {t('expectedHarvestDate')}
            </span>
            <span className="text-sm font-bold text-charcoal font-display">
              {harvestDateStr}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber/20 text-amber-dark">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-charcoal-muted block">
              {t('marketBaselineLabel')}
            </span>
            <span className="text-sm font-bold text-charcoal font-display">
              ₹{modalPrice} / Quintal ({crop.name[language]})
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Crop Health Reactivity Simulator (SRS FR-ES4, Test Case T3) */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-forest/20 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <h3 className="text-sm md:text-base font-bold font-display text-forest">
              {t('healthStatusLabel')} ({Math.round(healthFactor * 100)}%)
            </h3>
          </div>
          <span className="text-xs text-charcoal-muted">
            Tap to test yield reaction:
          </span>
        </div>

        <p className="text-xs text-charcoal-muted mb-3">
          {t('healthExplanation')}
        </p>

        {/* Interactive health toggles */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'none', label: 'Healthy (1.0)', factor: 1.0 },
            { id: 'minor', label: 'Minor (0.9)', factor: 0.9 },
            { id: 'moderate', label: 'Moderate (0.75)', factor: 0.75 },
            { id: 'severe', label: 'Severe (0.5)', factor: 0.5 },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setHealthSeverity(item.id as HealthSeverity)}
              className={`min-h-[48px] p-2 rounded-xl border text-center transition-all ${
                severity === item.id
                  ? 'bg-forest text-white border-forest font-bold shadow-sm'
                  : 'bg-[#FAFDFB] text-charcoal border-[#D5E0D7] hover:border-forest/50'
              }`}
            >
              <div className="text-xs font-semibold">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transparent Formula Calculation Box (NFR-8 Honesty) */}
      <div className="bg-sage/40 rounded-card p-4 border border-forest/15">
        <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-xs md:text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>{t('formulaHeading')}</span>
        </div>
        <div className="space-y-1.5 font-mono text-xs text-charcoal bg-white p-3 rounded-xl border border-[#E2EBE4]">
          <p>
            {t('formulaYield', {
              acres: area,
              base: baseYieldPerAcre,
              hf: healthFactor,
            })}
          </p>
          <p className="text-forest font-bold">
            = {expectedYield} {t('quintalsUnit')}
          </p>
          <div className="border-t border-[#EAEFEA] my-1 pt-1">
            <p>{t('formulaIncome', { price: modalPrice })}</p>
            <p className="text-forest font-bold">
              = ₹{expectedIncomeModal.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        <p className="text-[11px] text-charcoal-muted mt-2 italic">
          {t('estimateDisclaimer')}
        </p>
      </div>

      {/* Navigation shortcuts */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('market')}
          className="flex-1 min-h-[48px] py-2.5 px-4 bg-forest text-white font-bold text-xs md:text-sm rounded-card flex items-center justify-center gap-2 shadow-sm hover:bg-forest-dark"
        >
          <span>Check Mandi Trends</span>
          <ArrowRight className="w-4 h-4 text-amber" />
        </button>
      </div>
    </div>
  );
}

