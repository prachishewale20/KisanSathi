'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import { findMatchingSymptomRule } from '../data/fallbackAdvice';
import { AdviceResult, FollowUpQuestion, HealthSeverity } from '../types';
import {
  ShieldAlert,
  Search,
  CloudRain,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Stethoscope
} from 'lucide-react';

export default function CheckScreen() {
  const { plan, setHealthSeverity, language, setActiveTab, t } = useApp();

  const [symptomText, setSymptomText] = useState('');
  const [stage, setStage] = useState<'input' | 'followup' | 'result'>('input');
  const [activeFollowUps, setActiveFollowUps] = useState<FollowUpQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdviceResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Weather advisory state
  const [weatherAlert, setWeatherAlert] = useState<string | null>(null);

  // Fetch live weather check for district
  useEffect(() => {
    async function checkWeather() {
      try {
        const district = plan?.district || 'Nashik';
        const res = await fetch(`/api/weather?district=${encodeURIComponent(district)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.warnings && data.warnings[language]) {
            setWeatherAlert(data.warnings[language]);
          }
        }
      } catch (err) {
        console.warn('Weather fetch failed', err);
      }
    }
    checkWeather();
  }, [plan?.district, language]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStartDiagnosis = (textToUse?: string) => {
    const text = textToUse || symptomText;
    if (!text.trim()) return;

    setIsLoading(true);

    // Find rule with follow-ups
    const matchedRule = findMatchingSymptomRule(text, plan?.crop);
    
    if (matchedRule.followUps && matchedRule.followUps.length > 0) {
      setActiveFollowUps(matchedRule.followUps);
      setCurrentQuestionIndex(0);
      setFollowUpAnswers({});
      setStage('followup');
      setIsLoading(false);
    } else {
      fetchAdvice(text, {});
    }
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...followUpAnswers, [questionId]: optionId };
    setFollowUpAnswers(updated);

    if (currentQuestionIndex + 1 < activeFollowUps.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all follow-up questions -> get final advice
      fetchAdvice(symptomText, updated);
    }
  };

  const fetchAdvice = async (symptoms: string, answers: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: plan?.crop || 'tomato',
          stage: 'vegetative',
          symptoms,
          followUpAnswers: answers,
          language,
          district: plan?.district || 'Nashik',
        }),
      });

      if (!response.ok) throw new Error('Advice network error');
      const data: AdviceResult = await response.json();
      
      // If we have live weather alert, enrich result
      if (weatherAlert && (!data.weatherWarning || data.weatherWarning.length < 10)) {
        data.weatherWarning = weatherAlert;
      }

      setResult(data);
      setStage('result');
    } catch (e) {
      console.warn('API error, using local fallback rule', e);
      const rule = findMatchingSymptomRule(symptoms, plan?.crop);
      const fallback = rule.advice[language] || rule.advice.en;
      if (weatherAlert) fallback.weatherWarning = weatherAlert;
      setResult(fallback);
      setStage('result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeverityChange = (severity: HealthSeverity) => {
    setHealthSeverity(severity);
  };

  // Web Speech API text-to-speech (FR-G6)
  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!result) return;

    const speechText = `${result.cause}. ${result.fix}. ${result.organicOption}. ${result.todaySteps.join('. ')}. ${result.weatherWarning}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    
    // Pick speech voice matching language
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly slower for low-literacy clarity

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const resetCheck = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSymptomText('');
    setStage('input');
    setResult(null);
  };

  const quickSymptoms = [
    {
      en: 'Leaves yellow and curling upwards',
      hi: 'पत्तियां पीली पड़कर ऊपर मुड़ रही हैं',
      mr: 'पाने पिवळी पडून वरच्या बाजूस चुरडत आहेत',
    },
    {
      en: 'Fruit or pod borer holes with caterpillars',
      hi: 'फलों में छेद और इल्लियां दिख रही हैं',
      mr: 'फळ पोखरणारी अळी आणि छिद्रे पडली आहेत',
    },
    {
      en: 'Black concentric spots on leaves (Blight)',
      hi: 'पत्तियों पर काले छल्लेदार धब्बे (झुलसा)',
      mr: 'पानांवर काळे-तपकिरी गोल डाग (करपा)',
    },
    {
      en: 'Onion thrips silvery streaks & purple blotch',
      hi: 'प्याज पर चांदी जैसे निशान व बैंगनी धब्बे',
      mr: 'कांद्यावर थ्रिप्स आणि जांभळा करपा',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full animate-fade-in pb-24 space-y-5">
      {/* Top Banner */}
      <div className="bg-sage/70 rounded-card p-4 border border-forest/15">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-forest text-white">
            <Stethoscope className="w-5 h-5 text-amber" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold font-display text-forest">
              {t('checkHeading')}
            </h2>
            <p className="text-xs md:text-sm text-charcoal-muted">
              {t('checkSubheading')}
            </p>
          </div>
        </div>

        {/* Live Weather Quick Pill */}
        {weatherAlert && (
          <div className="mt-3 p-2.5 bg-blue-50/80 rounded-lg border border-blue-200/60 flex items-start gap-2 text-xs text-blue-900">
            <CloudRain className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <span className="leading-snug">{weatherAlert}</span>
          </div>
        )}
      </div>

      {/* STAGE 1: Free Text & Quick Symptom Input */}
      {stage === 'input' && (
        <div className="space-y-4">
          <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-charcoal">
                Describe the problem:
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sage text-forest border border-forest/20">
                {t('demoExpertRuleBadge')}
              </span>
            </div>
            <div className="relative">
              <textarea
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                rows={3}
                placeholder={t('inputPlaceholder')}
                className="w-full p-3.5 rounded-card border border-[#C8D6CA] bg-[#FAFDFB] text-charcoal text-sm focus:ring-2 focus:ring-forest focus:border-forest"
              />
            </div>

            <button
              type="button"
              onClick={() => handleStartDiagnosis()}
              disabled={isLoading || !symptomText.trim()}
              className="mt-3 w-full min-h-[48px] py-3 px-4 bg-forest hover:bg-forest-dark active:scale-[0.99] text-white font-bold text-sm md:text-base rounded-card shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber" />
              <span>{isLoading ? t('btnDiagnosing') : t('btnDiagnose')}</span>
            </button>
          </div>

          {/* Quick Symptom Buttons */}
          <div className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm">
            <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider block mb-2.5">
              {t('quickSymptomsLabel')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickSymptoms.map((qs, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    const text = qs[language];
                    setSymptomText(text);
                    handleStartDiagnosis(text);
                  }}
                  className="min-h-[48px] p-3 text-left bg-[#F8FAF9] hover:bg-sage/50 border border-[#D5E0D7] hover:border-forest rounded-xl text-xs md:text-sm font-medium text-charcoal transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <span className="line-clamp-2">{qs[language]}</span>
                  <span className="text-forest opacity-50 group-hover:opacity-100 font-bold ml-2">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: Interactive Follow-up Questions (FR-CH2) */}
      {stage === 'followup' && activeFollowUps.length > 0 && (
        <div className="bg-white rounded-card p-5 border border-forest/30 shadow-md animate-fade-in space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAEFEA] pb-3">
            <div>
              <span className="text-[11px] font-bold text-amber-dark uppercase tracking-wider">
                {t('followUpTitle', {
                  current: currentQuestionIndex + 1,
                  total: activeFollowUps.length,
                })}
              </span>
              <h3 className="text-base font-bold text-charcoal font-display mt-0.5">
                {activeFollowUps[currentQuestionIndex].question[language]}
              </h3>
            </div>
          </div>

          <p className="text-xs text-charcoal-muted">
            {t('followUpSubtitle')}
          </p>

          <div className="space-y-2.5 pt-1">
            {activeFollowUps[currentQuestionIndex].options.map((opt) => (
              <button
                type="button"
                key={opt.id}
                onClick={() =>
                  handleSelectOption(activeFollowUps[currentQuestionIndex].id, opt.id)
                }
                className="w-full min-h-[52px] p-3.5 text-left rounded-xl border border-[#D5E0D7] bg-[#FAFDFB] hover:bg-sage hover:border-forest text-sm font-semibold text-charcoal transition-all flex items-center justify-between active:scale-[0.99]"
              >
                <span>{opt.label[language]}</span>
                <span className="w-5 h-5 rounded-full border border-forest/30 flex items-center justify-center text-xs text-forest font-bold">
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={resetCheck}
              className="text-charcoal-muted hover:text-charcoal underline"
            >
              Cancel
            </button>
            <span className="text-charcoal-light">
              Step {currentQuestionIndex + 1} of {activeFollowUps.length}
            </span>
          </div>
        </div>
      )}

      {/* STAGE 3: Final Advice Result Card (FR-CH3, CH4, CH5, CH6, FR-G6) */}
      {stage === 'result' && result && (
        <div className="space-y-5 animate-fade-in">
          {/* Main Result Card */}
          <div className="bg-white rounded-card p-5 border-2 border-forest/20 shadow-md">
            {/* Header: Diagnosis & Confidence */}
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EAEFEA] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber/20 text-charcoal">
                    {t('likelyCause')}
                  </span>
                  <span className="text-xs text-charcoal-muted font-medium">
                    {t('confidenceLabel')}:{' '}
                    <strong className="text-forest font-bold capitalize">
                      {result.confidence}
                    </strong>
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-display text-forest">
                  {result.cause}
                </h3>
              </div>

              {/* Read Aloud Button (SpeechSynthesis) */}
              <button
                type="button"
                onClick={toggleSpeech}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSpeaking
                    ? 'bg-clay text-white border-clay animate-pulse'
                    : 'bg-sage hover:bg-sage-dark text-forest border-forest/20'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>{t('btnStopSpeech')}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-forest" />
                    <span>{t('btnReadAloud')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Remedies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-4">
              {/* Organic / Low cost alternative */}
              <div className="p-3.5 rounded-xl bg-[#FEFAF2] border border-amber/30">
                <span className="text-xs font-bold text-amber-dark uppercase tracking-wider block mb-1">
                  🌱 {t('organicSolutionLabel')}
                </span>
                <p className="text-sm font-medium text-charcoal leading-relaxed">
                  {result.organicOption}
                </p>
              </div>

              {/* Standard Treatment */}
              <div className="p-3.5 rounded-xl bg-sage/50 border border-forest/20">
                <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">
                  🧪 {t('standardSolutionLabel')}
                </span>
                <p className="text-sm font-medium text-charcoal leading-relaxed">
                  {result.fix}
                </p>
                <div className="mt-2 pt-2 border-t border-forest/15 flex items-center justify-between text-xs">
                  <span className="text-charcoal-muted">{t('estimatedCostLabel')}:</span>
                  <span className="font-bold text-forest">
                    ~ ₹{result.estimatedCostInr} / Acre
                  </span>
                </div>
              </div>
            </div>

            {/* Steps Today & This Week */}
            <div className="space-y-3 pt-2">
              <div className="bg-[#FAFDFB] p-3 rounded-xl border border-[#D5E0D7]">
                <span className="text-xs font-bold text-forest block mb-1.5">
                  ⚡ {t('todayStepsLabel')}:
                </span>
                <ul className="text-xs md:text-sm space-y-1 text-charcoal">
                  {result.todaySteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-forest font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAFDFB] p-3 rounded-xl border border-[#D5E0D7]">
                <span className="text-xs font-bold text-charcoal-muted block mb-1.5">
                  📅 {t('thisWeekStepsLabel')}:
                </span>
                <ul className="text-xs md:text-sm space-y-1 text-charcoal">
                  {result.thisWeekSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-charcoal-muted font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weather & Spray Warning (FR-CH4) */}
            {result.weatherWarning && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
                <CloudRain className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-bold block mb-0.5">
                    {t('weatherWarningLabel')}
                  </strong>
                  <span>{result.weatherWarning}</span>
                </div>
              </div>
            )}

            {/* Expert confirmation note (FR-CH5) */}
            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{t('expertNote')}</span>
            </div>

            {/* Severe / Moderate Expert Warning Banner (Phase 2 Item 4) */}
            {(plan?.healthSeverity === 'moderate' || plan?.healthSeverity === 'severe' || result.needsExpert) && (
              <div className="mt-3 p-3 bg-clay/10 border-2 border-clay/30 rounded-xl text-xs text-clay font-medium flex items-start gap-2 shadow-xs">
                <AlertOctagon className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">
                    {t('expertConsultUrgent')}
                  </strong>
                  <span className="text-[11px] text-charcoal-muted">
                    Do not rely solely on automated suggestions when symptoms spread across large patches. Always take a fresh physical plant sample to your nearest Krishi Vigyan Kendra (KVK).
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* CRITICAL FEATURE: Severity Selector that changes Health Factor (FR-CH6, UC4, Test T3) */}
          <div className="bg-white rounded-card p-4 md:p-5 border border-forest/20 shadow-sm">
            <h4 className="text-sm md:text-base font-bold font-display text-forest mb-1">
              {t('severitySectionLabel')}
            </h4>
            <p className="text-xs text-charcoal-muted mb-3">
              Marking severity automatically tunes your crop health factor, adjusting yield and income in the Estimate tab.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'none', label: t('severityNone'), factor: '1.00', color: 'border-emerald-500' },
                { id: 'minor', label: t('severityMinor'), factor: '0.90', color: 'border-blue-500' },
                { id: 'moderate', label: t('severityModerate'), factor: '0.75', color: 'border-amber' },
                { id: 'severe', label: t('severitySevere'), factor: '0.50', color: 'border-clay' },
              ].map((sev) => {
                const isSelected = plan?.healthSeverity === sev.id;

                return (
                  <button
                    type="button"
                    key={sev.id}
                    onClick={() => handleSeverityChange(sev.id as HealthSeverity)}
                    className={`min-h-[54px] p-2.5 rounded-xl border text-center transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-forest text-white border-forest ring-2 ring-forest shadow-md font-bold'
                        : 'bg-white text-charcoal border-[#D5E0D7] hover:border-forest/50'
                    }`}
                  >
                    <span className="text-xs font-semibold leading-tight">{sev.label}</span>
                    <span
                      className={`text-[10px] mt-1 font-bold ${
                        isSelected ? 'text-amber' : 'text-charcoal-muted'
                      }`}
                    >
                      Multiplier: {sev.factor}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Impact feedback notice */}
            <div className="mt-3 p-3 bg-sage/60 rounded-xl border border-forest/15 flex items-center justify-between gap-3 text-xs">
              <span className="text-charcoal">
                {t('healthFactorImpact', { factor: plan?.healthFactor || 1.0 })}
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('estimate')}
                className="px-3 py-1.5 bg-forest text-white rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <span>{t('navEstimate')}</span>
                <ArrowRight className="w-3 h-3 text-amber" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetCheck}
              className="flex-1 min-h-[48px] py-2.5 px-4 bg-white border border-[#D5E0D7] hover:border-forest text-charcoal font-semibold text-xs md:text-sm rounded-card flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-forest" />
              <span>{t('btnRestartCheck')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

