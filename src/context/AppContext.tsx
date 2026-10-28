'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CropPlan, Language, HealthSeverity, CropId } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  plan: CropPlan | null;
  language: Language;
  simpleMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setLanguage: (lang: Language) => void;
  setSimpleMode: (enabled: boolean) => void;
  savePlan: (newPlan: Partial<CropPlan>) => void;
  toggleTask: (taskId: string) => void;
  setHealthSeverity: (severity: HealthSeverity) => void;
  resetPlan: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const STORAGE_KEY = 'kisansaathi_crop_plan_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<CropPlan | null>(null);
  const [language, setLanguageState] = useState<Language>('en');
  const [simpleMode, setSimpleModeState] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('grow');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount (FR-G3)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPlan(parsed);
        if (parsed.language) setLanguageState(parsed.language);
        if (parsed.simpleMode !== undefined) setSimpleModeState(parsed.simpleMode);
      }
    } catch (e) {
      console.error('Failed to load plan from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever plan, language, or simpleMode changes
  const persistPlan = (updated: CropPlan | null) => {
    setPlan(updated);
    try {
      if (updated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (plan) {
      const updated = { ...plan, language: lang };
      persistPlan(updated);
    }
  };

  const setSimpleMode = (enabled: boolean) => {
    setSimpleModeState(enabled);
    if (plan) {
      const updated = { ...plan, simpleMode: enabled };
      persistPlan(updated);
    }
  };

  const savePlan = (partial: Partial<CropPlan>) => {
    const defaultSeverities: Record<HealthSeverity, number> = {
      none: 1.0,
      minor: 0.9,
      moderate: 0.75,
      severe: 0.5,
    };

    const severity = partial.healthSeverity || plan?.healthSeverity || 'none';
    const healthFactor = defaultSeverities[severity];

    const updated: CropPlan = {
      crop: partial.crop || plan?.crop || 'tomato',
      sowingDate: partial.sowingDate || plan?.sowingDate || new Date().toISOString().split('T')[0],
      areaAcres: Number(partial.areaAcres ?? plan?.areaAcres ?? 2),
      district: partial.district || plan?.district || 'Nashik',
      village: partial.village ?? plan?.village ?? '',
      language: partial.language || language,
      healthFactor,
      healthSeverity: severity,
      tasksDone: partial.tasksDone || plan?.tasksDone || [],
      simpleMode: partial.simpleMode ?? simpleMode,
    };

    persistPlan(updated);
    setActiveTab('grow');
  };

  const toggleTask = (taskId: string) => {
    if (!plan) return;
    const currentTasks = plan.tasksDone || [];
    const exists = currentTasks.includes(taskId);
    const updatedTasks = exists
      ? currentTasks.filter((id) => id !== taskId)
      : [...currentTasks, taskId];

    const updated = { ...plan, tasksDone: updatedTasks };
    persistPlan(updated);
  };

  const setHealthSeverity = (severity: HealthSeverity) => {
    if (!plan) return;
    const factorMap: Record<HealthSeverity, number> = {
      none: 1.0,
      minor: 0.9,
      moderate: 0.75,
      severe: 0.5,
    };
    const updated = {
      ...plan,
      healthSeverity: severity,
      healthFactor: factorMap[severity],
    };
    persistPlan(updated);
  };

  const resetPlan = () => {
    persistPlan(null);
  };

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    let str = dict[key] || TRANSLATIONS.en[key] || key;

    if (replacements) {
      for (const [k, v] of Object.entries(replacements)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return str;
  };

  if (!isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-forest">
        <div className="w-8 h-8 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        plan,
        language,
        simpleMode,
        activeTab,
        setActiveTab,
        setLanguage,
        setSimpleMode,
        savePlan,
        toggleTask,
        setHealthSeverity,
        resetPlan,
        t,
      }}
    >
      <div className={simpleMode ? 'simple-mode' : ''}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

