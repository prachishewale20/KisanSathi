'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA, MAHARASHTRA_DISTRICTS } from '../data/crops';
import { SAMPLE_PRICES_DATA, getWhatToGrowRecommendation } from '../data/samplePrices';
import { CropId } from '../types';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Lightbulb,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function MarketScreen() {
  const { plan, language, setActiveTab, t } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<CropId>(plan?.crop || 'tomato');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    plan?.district || 'Nashik'
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const priceData = SAMPLE_PRICES_DATA[selectedCrop] || SAMPLE_PRICES_DATA.tomato;
  const recommendation = getWhatToGrowRecommendation();
  const recCrop = CROPS_DATA[recommendation.recommendedCrop];

  // Downsample 90 points to ~18 points for smooth responsive mobile rendering
  const chartData = priceData.history90Days
    .filter((_, idx) => idx % 5 === 0 || idx === priceData.history90Days.length - 1)
    .map((p) => {
      const d = new Date(p.date);
      return {
        date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        price: p.price,
      };
    });

  return (
    <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full animate-fade-in pb-24 space-y-5">
      {/* Top Banner */}
      <div className="bg-sage/70 rounded-card p-4 border border-forest/15">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-forest text-white">
              <LineChartIcon className="w-5 h-5 text-amber" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold font-display text-forest">
                {t('marketHeading')}
              </h2>
              <p className="text-xs md:text-sm text-charcoal-muted">
                {t('marketSubheading')}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber text-charcoal shadow-xs">
            {t('demoDataNoticeFull')}
          </span>
        </div>

        {/* Clear Notice: Not Live Prices */}
        <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber/30 text-[11px] text-charcoal-muted flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-dark shrink-0" />
          <span>
            Notice: These 90-day wholesale trends are pre-compiled demonstration data calibrated for Maharashtra mandis. This MVP does not connect to unverified live price feeds.
          </span>
        </div>
      </div>

      {/* Crop Tabs & District Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Crop Toggle */}
        <div className="flex bg-[#E4EDE6] p-1 rounded-xl border border-forest/20">
          {(['tomato', 'onion', 'soybean'] as CropId[]).map((cId) => {
            const cropInfo = CROPS_DATA[cId];
            const isSelected = selectedCrop === cId;

            return (
              <button
                key={cId}
                onClick={() => setSelectedCrop(cId)}
                className={`flex-1 min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-forest text-white shadow-sm'
                    : 'text-charcoal hover:text-forest'
                }`}
              >
                {cId === 'tomato' ? '🍅 ' : cId === 'onion' ? '🧅 ' : '🌱 '}
                {cropInfo.name[language]}
              </button>
            );
          })}
        </div>

        {/* District Selector (FR-MK5) */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
          <MapPin className="w-4 h-4 text-forest" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="min-h-[38px] px-2.5 py-1 rounded-lg border border-[#C8D6CA] bg-white text-charcoal text-xs font-medium focus:ring-2 focus:ring-forest"
          >
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d} Mandi
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 90-Day Trend Card (FR-MK1, FR-MK2) */}
      <div className="bg-white rounded-card p-4 md:p-5 border border-[#D5E0D7] shadow-sm">
        {/* Metric Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-xs text-charcoal-muted block">
              {t('modalPriceLabel')} ({CROPS_DATA[selectedCrop].name[language]})
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-display font-extrabold text-charcoal tracking-tight">
                ₹{priceData.currentModalPrice}
              </span>
              <span className="text-xs text-charcoal-muted font-medium">
                / {t('quintalsUnit')}
              </span>
            </div>
            <span className="text-[11px] text-charcoal-light">
              Range: ₹{priceData.minPrice} - ₹{priceData.maxPrice} / Qtl
            </span>
          </div>

          {/* Trend Badge (FR-MK2) */}
          <div className="text-right">
            <span className="text-[11px] text-charcoal-muted block mb-1">
              90-Day Wholesale Trend
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                priceData.trendDirection === 'rising'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : priceData.trendDirection === 'falling'
                  ? 'bg-clay/15 text-clay border border-clay/30'
                  : 'bg-amber/20 text-charcoal border border-amber/40'
              }`}
            >
              {priceData.trendDirection === 'rising' ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : priceData.trendDirection === 'falling' ? (
                <TrendingDown className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              <span>
                {priceData.trendDirection === 'rising'
                  ? t('trendBadgeRising')
                  : priceData.trendDirection === 'falling'
                  ? t('trendBadgeFalling')
                  : t('trendBadgeSteady')}{' '}
                ({priceData.trendPercentage > 0 ? `+${priceData.trendPercentage}%` : `${priceData.trendPercentage}%`})
              </span>
            </span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-60 w-full pt-2">
          {isClient ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F6B4F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2F6B4F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#728078' }}
                  tickLine={false}
                  axisLine={{ stroke: '#E4EDE6' }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#728078' }}
                  tickLine={false}
                  axisLine={{ stroke: '#E4EDE6' }}
                  domain={['dataMin - 200', 'dataMax + 200']}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-forest text-white p-2.5 rounded-lg shadow-lg text-xs">
                          <p className="font-semibold text-amber">{label}</p>
                          <p className="font-bold text-sm">
                            ₹{payload[0].value} / Quintal
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#2F6B4F"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-charcoal-light">
              Loading price chart...
            </div>
          )}
        </div>

        {/* Specific Crop Risk Warning (SRS Section 9) */}
        <div className="mt-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 text-xs text-charcoal flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <strong className="font-bold text-charcoal block mb-0.5">
              {t('riskNoteHeading')}:
            </strong>
            <span className="leading-relaxed">
              {priceData.riskNote[language]}
            </span>
          </div>
        </div>
      </div>

      {/* "What To Grow Next" Recommendation (FR-MK3) */}
      <div className="bg-white rounded-card p-5 border-2 border-forest/20 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-amber/20 text-amber-dark">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold font-display text-forest">
            {t('suggestedNextCropHeading')}
          </h3>
        </div>

        <div className="p-4 bg-sage/50 rounded-xl border border-forest/15 my-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {recommendation.recommendedCrop === 'onion' ? '🧅' : '🌱'}
              </span>
              <div>
                <span className="font-display font-extrabold text-lg text-forest">
                  {recCrop.name[language]}
                </span>
                <span className="text-xs text-charcoal-muted block">
                  {recCrop.seasonLengthDays} Days Cycle
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-amber text-charcoal rounded-full shadow-xs">
              Top Recommendation
            </span>
          </div>

          <p className="text-xs md:text-sm text-charcoal leading-relaxed mb-3">
            {recommendation.reason[language]}
          </p>

          {/* Mandatory Risk Warning Attached to Suggestion */}
          <div className="p-2.5 bg-[#FEFAF2] rounded-lg border border-amber/30 text-xs text-charcoal-muted flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-dark shrink-0 mt-0.5" />
            <span className="italic">
              {recommendation.riskWarning[language]}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action: Ready to sell? */}
      <div className="bg-sage/50 border border-forest/20 rounded-card p-4 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-forest block">
            Have produce ready to sell?
          </span>
          <span className="text-xs text-charcoal-muted">
            List directly on the KisanSaathi Sell Board with zero commission.
          </span>
        </div>
        <button
          onClick={() => setActiveTab('sell')}
          className="min-h-[44px] px-3.5 py-2 bg-forest text-white rounded-lg text-xs font-bold hover:bg-forest-dark flex items-center gap-1.5 whitespace-nowrap shadow-sm"
        >
          <span>{t('navSell')}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber" />
        </button>
      </div>
    </div>
  );
}

