import { NextResponse } from 'next/server';

const DISTRICT_COORDS: Record<string, { lat: number; lon: number }> = {
  Nashik: { lat: 19.9975, lon: 73.7898 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Ahmednagar: { lat: 19.0948, lon: 74.7480 },
  Latur: { lat: 18.4088, lon: 76.5604 },
  Nagpur: { lat: 21.1458, lon: 79.0882 },
  'Chhatrapati Sambhajinagar (Aurangabad)': { lat: 19.8762, lon: 75.3433 },
  Solapur: { lat: 17.6599, lon: 75.9064 },
  Kolhapur: { lat: 16.7050, lon: 74.2433 },
  Jalgaon: { lat: 21.0077, lon: 75.5626 },
  Amravati: { lat: 20.9374, lon: 77.7796 },
  Default: { lat: 19.7515, lon: 75.7139 },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district') || 'Nashik';
  const coords = DISTRICT_COORDS[district] || DISTRICT_COORDS.Default;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=precipitation_sum,precipitation_probability_max,temperature_2m_max,wind_speed_10m_max&timezone=Asia%2FKolkata&forecast_days=3`;
    
    // 3 second timeout for robust mobile experience
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const rainToday = data.daily?.precipitation_sum?.[0] || 0;
    const rainProb = data.daily?.precipitation_probability_max?.[0] || 0;
    const windSpeed = data.daily?.wind_speed_10m_max?.[0] || 10;
    const tempMax = data.daily?.temperature_2m_max?.[0] || 32;

    const willRainSoon = rainToday > 2.0 || rainProb > 45;

    let warningEn = willRainSoon
      ? `Rain alert (${rainProb}% chance, ~${rainToday}mm expected). Do NOT spray chemicals or foliar nutrients in the next 24 hours.`
      : `Weather favorable for spraying. Max temp: ${tempMax}°C, Wind: ${windSpeed} km/h. Best to spray in early morning or late afternoon.`;

    let warningHi = willRainSoon
      ? `बारिश की चेतावनी (${rainProb}% संभावना, ~${rainToday} मिमी वर्षा)। अगले 24 घंटों में कीटनाशक या खाद का छिड़काव न करें।`
      : `छिड़काव हेतु मौसम अनुकूल है। अधिकतम तापमान: ${tempMax}°C, हवा: ${windSpeed} किमी/घंटा। सुबह या शाम को छिड़काव करें।`;

    let warningMr = willRainSoon
      ? `पावसाचा इशारा (${rainProb}% शक्यता, ~${rainToday} मिमी पाऊस). पुढील २४ तासांत कोणतीही औषध किंवा खत फवारणी करू नका.`
      : `फवारणीसाठी हवामान अनुकूल आहे. कमाल तापमान: ${tempMax}°C, वारा: ${windSpeed} किमी/तास. सकाळी किंवा संध्याकाळी फवारणी करा.`;

    return NextResponse.json({
      success: true,
      district,
      willRainSoon,
      precipitationProb: rainProb,
      precipitationMm: rainToday,
      temperatureMax: tempMax,
      windSpeedKmH: windSpeed,
      warnings: {
        en: warningEn,
        hi: warningHi,
        mr: warningMr,
      },
      isLive: true,
    });
  } catch (err) {
    // Graceful fallback conforming to NFR-5 and Section 10
    return NextResponse.json({
      success: true,
      district,
      willRainSoon: false,
      precipitationProb: 20,
      precipitationMm: 0,
      temperatureMax: 31,
      windSpeedKmH: 10,
      warnings: {
        en: 'Weather service offline. As a general rule, do not spray if dark rain clouds are visible overhead.',
        hi: 'मौसम सेवा ऑफलाइन है। सामान्य नियम अनुसार यदि आसमान में काले बादल हों तो छिड़काव टालें।',
        mr: 'हवामान सेवा ऑफलाइन आहे. सामान्य नियम: आभाळ भरून आलेले असल्यास फवारणी करू नका.',
      },
      isLive: false,
    });
  }
}
