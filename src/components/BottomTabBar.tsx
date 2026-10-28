'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, ShieldAlert, TrendingUp, LineChart, ShoppingBag } from 'lucide-react';

export default function BottomTabBar() {
  const { activeTab, setActiveTab, t } = useApp();

  const tabs = [
    { id: 'grow', label: t('navGrow'), icon: Sprout },
    { id: 'check', label: t('navCheck'), icon: ShieldAlert },
    { id: 'estimate', label: t('navEstimate'), icon: TrendingUp },
    { id: 'market', label: t('navMarket'), icon: LineChart },
    { id: 'sell', label: t('navSell'), icon: ShoppingBag },
  ];

  return (
    <nav 
      aria-label="Main Navigation"
      className="sticky bottom-0 z-40 bg-white border-t border-[#D5E0D7] shadow-lg"
    >
      <div className="grid grid-cols-5 h-16 max-w-[960px] mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] px-1 transition-all relative ${
                isActive
                  ? 'text-forest font-bold'
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              {/* Active top indicator pill */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-forest rounded-b-md" />
              )}

              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110 bg-sage' : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'stroke-[2.5px] text-forest' : 'stroke-[1.75px]'
                  }`}
                />
              </div>

              <span
                className={`text-[11px] leading-tight mt-0.5 truncate max-w-full ${
                  isActive ? 'font-bold text-forest' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

