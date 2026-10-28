'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import StartScreen from '../components/StartScreen';
import GrowScreen from '../components/GrowScreen';
import CheckScreen from '../components/CheckScreen';
import EstimateScreen from '../components/EstimateScreen';
import MarketScreen from '../components/MarketScreen';
import SellScreen from '../components/SellScreen';
import SettingsScreen from '../components/SettingsScreen';

function MainApp() {
  const { plan, activeTab } = useApp();

  // If no plan is created yet, force start screen setup
  const currentView = !plan ? 'start' : activeTab;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-cream">
      <Header />

      <main className="flex-1 flex flex-col">
        {currentView === 'start' && <StartScreen />}
        {currentView === 'grow' && <GrowScreen />}
        {currentView === 'check' && <CheckScreen />}
        {currentView === 'estimate' && <EstimateScreen />}
        {currentView === 'market' && <MarketScreen />}
        {currentView === 'sell' && <SellScreen />}
        {currentView === 'settings' && <SettingsScreen />}
      </main>

      {/* Persistent bottom tab bar (only show once user has a plan or if navigating) */}
      {plan && <BottomTabBar />}
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

