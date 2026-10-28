import { NextResponse } from 'next/server';
import { SAMPLE_PRICES_DATA, getWhatToGrowRecommendation } from '@/data/samplePrices';
import { CropId } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = (searchParams.get('crop') || 'tomato') as CropId;
  const district = searchParams.get('district') || 'Nashik';

  const priceData = SAMPLE_PRICES_DATA[crop] || SAMPLE_PRICES_DATA.tomato;
  const recommendation = getWhatToGrowRecommendation();

  return NextResponse.json({
    success: true,
    district,
    crop,
    priceData,
    allCrops: {
      tomato: {
        currentModalPrice: SAMPLE_PRICES_DATA.tomato.currentModalPrice,
        trendPercentage: SAMPLE_PRICES_DATA.tomato.trendPercentage,
        trendDirection: SAMPLE_PRICES_DATA.tomato.trendDirection,
      },
      onion: {
        currentModalPrice: SAMPLE_PRICES_DATA.onion.currentModalPrice,
        trendPercentage: SAMPLE_PRICES_DATA.onion.trendPercentage,
        trendDirection: SAMPLE_PRICES_DATA.onion.trendDirection,
      },
      soybean: {
        currentModalPrice: SAMPLE_PRICES_DATA.soybean.currentModalPrice,
        trendPercentage: SAMPLE_PRICES_DATA.soybean.trendPercentage,
        trendDirection: SAMPLE_PRICES_DATA.soybean.trendDirection,
      },
    },
    whatToGrow: recommendation,
    isSampleData: true,
  });
}

