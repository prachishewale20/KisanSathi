'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import {
  Calendar,
  Droplets,
  Sprout,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function GrowScreen() {
  const { plan, toggleTask, language, setActiveTab, t } = useApp();

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
  const rawDate = new Date(plan.sowingDate);
  const sowingDateObj = isNaN(rawDate.getTime()) ? new Date() : rawDate;
  const now = new Date();
  
  // Calculate elapsed days safely
  const diffTime = now.getTime() - sowingDateObj.getTime();
  const elapsedDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const totalDays = crop.seasonLengthDays;
  const currentDay = Math.min(elapsedDays, totalDays);

  // Harvest date calculation
  const harvestDateObj = new Date(sowingDateObj);
  harvestDateObj.setDate(harvestDateObj.getDate() + totalDays);
  const harvestDateStr = harvestDateObj.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Calculate current stage
  const currentStage =
    crop.stages.find((s) => currentDay >= s.startDay && currentDay <= s.endDay) ||
    crop.stages[crop.stages.length - 1];

  const currentStageIndex = crop.stages.findIndex((s) => s.id === currentStage.id);
  const progressPercent = Math.min(100, Math.round((currentDay / totalDays) * 100));
  const daysLeft = Math.max(0, totalDays - currentDay);

  const tasksDone = plan.tasksDone || [];

  return (
    <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full animate-fade-in pb-24 space-y-5">
      {/* Top Crop & Stage Header Card */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {plan.crop === 'tomato' ? '🍅' : plan.crop === 'onion' ? '🧅' : '🌱'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display text-forest">
                  {crop.name[language]}
                </h2>
                <span className="text-xs px-2 py-0.5 bg-sage text-forest font-semibold rounded-full">
                  {plan.areaAcres} {plan.areaAcres === 1 ? 'Acre' : 'Acres'}
                </span>
              </div>
              <p className="text-xs text-charcoal-muted mt-0.5">
                {plan.village ? `${plan.village}, ` : ''}{plan.district} • Sown: {plan.sowingDate}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('start')}
            className="text-xs text-forest hover:text-forest-dark font-semibold px-2.5 py-1 rounded bg-cream hover:bg-cream-dark transition-colors border border-forest/20"
          >
            Change
          </button>
        </div>

        {/* Progress Bar & Stage Indicator */}
        <div className="space-y-2 mt-4 pt-4 border-t border-[#EAEFEA]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-charcoal flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-forest" />
              {t('dayOfSeason', { day: currentDay, total: totalDays })}
            </span>
            <span className="font-semibold text-amber-dark">
              {t('daysRemaining', { days: daysLeft })}
            </span>
          </div>

          {/* Bar track */}
          <div className="w-full bg-[#E4EDE6] rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-forest h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-1"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse"></span>
            </div>
          </div>

          {/* Stages pill tracker */}
          <div className="flex justify-between items-center text-[11px] text-charcoal-muted pt-1 px-0.5">
            {crop.stages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={stage.id}
                  className={`flex flex-col items-center text-center ${
                    isCurrent ? 'font-bold text-forest' : isPast ? 'text-charcoal-muted' : 'opacity-50'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full mb-1 transition-all ${
                      isCurrent
                        ? 'bg-amber ring-2 ring-forest scale-125'
                        : isPast
                        ? 'bg-forest'
                        : 'bg-[#C2D4C6]'
                    }`}
                  />
                  <span className="hidden sm:inline-block max-w-[80px] truncate text-[10px]">
                    {stage.name[language]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Stage Badge Banner */}
        <div className="mt-4 p-3 bg-sage/60 rounded-xl border border-forest/15 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-forest block">
              {t('cropStage')} ({currentStage.startDay} - {currentStage.endDay} days)
            </span>
            <span className="text-base font-bold font-display text-charcoal">
              {currentStage.name[language]}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-charcoal-muted block">
              {t('expectedHarvestDate')}
            </span>
            <span className="text-xs font-bold text-forest flex items-center gap-1 justify-end">
              <Calendar className="w-3.5 h-3.5 text-forest" />
              {harvestDateStr}
            </span>
          </div>
        </div>
      </div>

      {/* Stage Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Water Requirement */}
        <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-sm">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Droplets className="w-4 h-4" />
            </div>
            <span>{t('waterSection')}</span>
          </div>
          <p className="text-sm text-charcoal leading-relaxed bg-[#F7FAF8] p-3 rounded-lg border border-[#E4ECE6]">
            {currentStage.waterNeed[language]}
          </p>
        </div>

        {/* Nutrient & Fertilizer */}
        <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-sm">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Sprout className="w-4 h-4" />
            </div>
            <span>{t('nutrientSection')}</span>
          </div>
          <p className="text-sm text-charcoal leading-relaxed bg-[#F7FAF8] p-3 rounded-lg border border-[#E4ECE6]">
            {currentStage.nutrientInput[language]}
          </p>
        </div>

        {/* Low-cost Organic Remedy */}
        <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-forest font-semibold text-sm">
            <div className="p-1.5 rounded-lg bg-amber/20 text-amber-dark">
              <Leaf className="w-4 h-4" />
            </div>
            <span>{t('organicSection')}</span>
          </div>
          <p className="text-sm text-charcoal leading-relaxed bg-[#FEFAF2] p-3 rounded-lg border border-amber/25 text-charcoal">
            {currentStage.organicAlternative[language]}
          </p>
        </div>

        {/* Common Problems Watchout */}
        <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-clay font-semibold text-sm">
            <div className="p-1.5 rounded-lg bg-clay/10 text-clay">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span>{t('watchOutSection')}</span>
          </div>
          <ul className="text-sm space-y-1.5 bg-[#FDF7F5] p-3 rounded-lg border border-clay/20">
            {currentStage.commonProblems[language].map((prob, i) => (
              <li key={i} className="flex items-start gap-2 text-charcoal text-xs sm:text-sm">
                <span className="text-clay font-bold mt-0.5">•</span>
                <span>{prob}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Weekly Action Checklist (FR-GR6) */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sage text-forest">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-display text-forest">
              {t('weeklyTasksHeading')}
            </h3>
          </div>
          <span className="text-xs text-charcoal-muted font-medium">
            {currentStage.tasks.filter((t) => tasksDone.includes(t.id)).length} / {currentStage.tasks.length} Done
          </span>
        </div>

        <div className="space-y-2.5">
          {currentStage.tasks.map((task) => {
            const isCompleted = tasksDone.includes(task.id);

            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all active:scale-[0.99] select-none ${
                  isCompleted
                    ? 'bg-sage/40 border-forest/30 text-charcoal-muted'
                    : 'bg-[#F9FCFA] border-[#D5E0D7] hover:border-forest/50 text-charcoal'
                }`}
              >
                <div className="mt-0.5 text-forest">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-forest fill-forest/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-charcoal-light hover:text-forest" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm leading-snug ${
                      isCompleted ? 'line-through text-charcoal-muted' : 'font-medium'
                    }`}
                  >
                    {task[language]}
                  </p>
                  <span className="text-[10px] uppercase font-semibold text-forest mt-1 inline-block">
                    {isCompleted ? t('taskDone') : t('taskPending')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shortcut Callout to Check Tab */}
      <div className="bg-sage/50 border border-forest/20 rounded-card p-4 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-forest block">
            Notice pests, yellow leaves, or spots?
          </span>
          <span className="text-xs text-charcoal-muted">
            Ask our AI symptom helper for a low-cost organic remedy and spray warnings.
          </span>
        </div>
        <button
          onClick={() => setActiveTab('check')}
          className="min-h-[44px] px-3.5 py-2 bg-forest text-white rounded-lg text-xs font-bold hover:bg-forest-dark flex items-center gap-1.5 whitespace-nowrap shadow-sm"
        >
          <span>{t('navCheck')}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber" />
        </button>
      </div>
    </div>
  );
}

