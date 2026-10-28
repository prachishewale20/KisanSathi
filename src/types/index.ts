export type Language = 'en' | 'hi' | 'mr';

export type CropId = 'tomato' | 'onion' | 'soybean';

export type HealthSeverity = 'none' | 'minor' | 'moderate' | 'severe';

export interface CropStage {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  startDay: number;
  endDay: number;
  waterNeed: {
    en: string;
    hi: string;
    mr: string;
  };
  nutrientInput: {
    en: string;
    hi: string;
    mr: string;
  };
  organicAlternative: {
    en: string;
    hi: string;
    mr: string;
  };
  commonProblems: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  tasks: {
    id: string;
    en: string;
    hi: string;
    mr: string;
  }[];
}

export interface CropData {
  id: CropId;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  hindiName: string;
  marathiName: string;
  seasonLengthDays: number;
  avgYieldPerAcreQuintal: number;
  approxPricePerQuintal: number; // baseline benchmark
  stages: CropStage[];
}

export interface CropPlan {
  crop: CropId;
  sowingDate: string; // YYYY-MM-DD
  areaAcres: number;
  district: string;
  village?: string;
  language: Language;
  healthFactor: number; // 1.0, 0.9, 0.75, 0.5
  healthSeverity: HealthSeverity;
  tasksDone: string[]; // task IDs
  simpleMode?: boolean;
}

export interface AdviceResult {
  cause: string;
  confidence: 'low' | 'medium' | 'high';
  fix: string;
  organicOption: string;
  estimatedCostInr: number;
  todaySteps: string[];
  thisWeekSteps: string[];
  weatherWarning: string;
  severity: HealthSeverity;
  needsExpert: boolean;
  isFallback?: boolean;
}

export interface FollowUpQuestion {
  id: string;
  question: {
    en: string;
    hi: string;
    mr: string;
  };
  options: {
    id: string;
    label: {
      en: string;
      hi: string;
      mr: string;
    };
  }[];
}

export interface PricePoint {
  date: string;
  price: number; // per quintal in INR
  market: string;
}

export interface CropPriceData {
  crop: CropId;
  currentModalPrice: number;
  minPrice: number;
  maxPrice: number;
  trendPercentage: number;
  trendDirection: 'rising' | 'steady' | 'falling';
  riskNote: {
    en: string;
    hi: string;
    mr: string;
  };
  history90Days: PricePoint[];
  isSampleData: boolean;
}

export interface SellListing {
  id: string;
  crop: CropId;
  quantityQuintals: number;
  askingPricePerQuintal: number;
  village: string;
  district: string;
  phone: string;
  createdAt: string;
}
