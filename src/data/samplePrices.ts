import { CropId, CropPriceData, PricePoint } from '../types';

function generate90DayPrices(
  basePrice: number,
  volatility: number,
  trendMultiplier: number,
  marketName: string
): PricePoint[] {
  const points: PricePoint[] = [];
  const now = new Date(); // anchor to current date

  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Progression factor from -0.5 to +0.5 over 90 days
    const progress = (89 - i) / 89;
    
    // Wave oscillation + slight random walk + overall trend
    const cycle = Math.sin((progress * Math.PI * 4)) * (basePrice * volatility * 0.4);
    const trendEffect = basePrice * (trendMultiplier - 1) * progress;
    const dayVariation = (Math.sin(i * 13) * 0.5) * (basePrice * volatility * 0.6);

    const price = Math.round(basePrice + trendEffect + cycle + dayVariation);
    points.push({
      date: dateStr,
      price: Math.max(400, price),
      market: marketName,
    });
  }
  return points;
}

export const SAMPLE_PRICES_DATA: Record<CropId, CropPriceData> = (() => {
  // 1. Tomato: Rising trend (+28%) over 90 days in Nashik/Pimpalgaon
  const tomatoPoints = generate90DayPrices(1450, 0.18, 1.35, 'Pimpalgaon Mandi (Nashik)');
  
  // 2. Onion: Moderate Steady-to-Rising (+9%) in Lasalgaon
  const onionPoints = generate90DayPrices(2050, 0.12, 1.10, 'Lasalgaon Mandi (Nashik)');

  // 3. Soybean: Steady / Rangebound (+2%) in Latur / Akola
  const soybeanPoints = generate90DayPrices(4600, 0.05, 1.02, 'Latur APMC');

  function calculateTrendStats(points: PricePoint[], crop: CropId): CropPriceData {
    // Average of first 7 days (days 83-90 ago)
    const oldSlice = points.slice(0, 7);
    const oldAvg = oldSlice.reduce((sum, p) => sum + p.price, 0) / oldSlice.length;

    // Average of last 7 days (most recent)
    const recentSlice = points.slice(-7);
    const recentAvg = recentSlice.reduce((sum, p) => sum + p.price, 0) / recentSlice.length;

    const trendPct = Math.round(((recentAvg - oldAvg) / oldAvg) * 100);

    let trendDirection: 'rising' | 'steady' | 'falling' = 'steady';
    if (trendPct > 10) trendDirection = 'rising';
    else if (trendPct < -10) trendDirection = 'falling';

    const prices = points.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const currentModalPrice = points[points.length - 1].price;

    let riskNote = {
      en: 'Prices are influenced by arrivals from neighboring states. High current prices often attract over-planting for next season.',
      hi: 'वर्तमान में ऊंचे भाव देखकर सभी किसान वही फसल बो देते हैं, जिससे कटाई के समय भाव गिरने का जोखिम रहता है।',
      mr: 'सध्याचे उच्च दर पाहून पुढील हंगामात अति-लागवड झाल्यास काढणीच्या वेळी दर कोसळण्याचा धोका असतो.',
    };

    if (crop === 'tomato') {
      riskNote = {
        en: 'Perishable crop risk: Tomato prices have high weekly volatility (+/- 35%). Do not base next season purely on this month\'s spike.',
        hi: 'नाशवान फसल चेतावनी: टमाटर के भावों में तेजी से उतार-चढ़ाव आता है। आज की तेजी देखकर पूरी जमीन में केवल टमाटर न लगाएं।',
        mr: 'नाशवंत पीक इशारा: टोमॅटोच्या दरात दर आठवड्याला मोठी तफावत (+/- ३५%) होते. आजचे वाढीव दर पाहून संपूर्ण क्षेत्रात टोमॅटो लावू नका.',
      };
    } else if (crop === 'onion') {
      riskNote = {
        en: 'Storage & export risk: Onion prices are strongly linked to government export policies and storage arrivals from Lasalgaon.',
        hi: 'निर्यात नीति चेतावनी: प्याज के भाव सरकारी निर्यात शुल्क और बड़े व्यापारियों की भंडारण आवक से सीधे प्रभावित होते हैं।',
        mr: 'निर्यात व साठवणूक इशारा: कांद्याचे दर सरकारी निर्यात धोरणे आणि नाशिक-लासलगाव साठवणुकीवर अवलंबून असतात.',
      };
    } else if (crop === 'soybean') {
      riskNote = {
        en: 'Stable grain: Soybean has government MSP backing and predictable industrial oil demand, giving the lowest price drop risk.',
        hi: 'न्यूनतम समर्थन मूल्य (MSP) का सहारा: सोयाबीन में भारी गिरावट का जोखिम सबसे कम रहता है क्योंकि तेल मिलों की मांग स्थिर है।',
        mr: 'स्थिर हमीभाव: सोयाबीनला सरकारी हमीभाव (MSP) आणि खाद्यतेल कारखान्यांची कायम मागणी असल्याने दर गडगडण्याचा धोका सर्वात कमी असतो.',
      };
    }

    return {
      crop,
      currentModalPrice,
      minPrice,
      maxPrice,
      trendPercentage: trendPct,
      trendDirection,
      riskNote,
      history90Days: points,
      isSampleData: true,
    };
  }

  return {
    tomato: calculateTrendStats(tomatoPoints, 'tomato'),
    onion: calculateTrendStats(onionPoints, 'onion'),
    soybean: calculateTrendStats(soybeanPoints, 'soybean'),
  };
})();

export function getWhatToGrowRecommendation() {
  // Score based on trend and stability
  // Tomato: High trend but higher risk
  // Onion: Good return with moderate stability
  // Soybean: Highest stability, lowest risk
  return {
    recommendedCrop: 'onion' as CropId,
    reason: {
      en: 'Onion currently shows the best balance of steady wholesale price strength (+9% 90-day trend) and good post-monsoon storage life in Maharashtra.',
      hi: 'महाराष्ट्र में प्याज 90 दिनों के स्थिर भाव रुझान (+9%) और अच्छी भंडारण क्षमता के साथ सबसे संतुलित विकल्प दिख रहा है।',
      mr: 'महाराष्ट्रात कांदा सध्या ९० दिवसांचा स्थिर व वाढता कल (+९%) आणि उत्तम साठवणूक क्षमतेमुळे सर्वात संतुलित पीक पर्याय ठरत आहे.',
    },
    riskWarning: {
      en: 'Caution: Prices can change significantly by your harvest time in 120-130 days. Stagger planting dates and check storage facilities.',
      hi: 'सावधानी: 120-130 दिनों बाद आपकी फसल तैयार होने तक भाव बदल सकते हैं। किस्तों में बुवाई करें और भंडारण की व्यवस्था रखें।',
      mr: 'दक्षता: पुढील १२०-१३० दिवसांत तुमचा माल तयार होईपर्यंत बाजारभावात बदल होऊ शकतात. टप्प्याटप्प्याने लागवड करा.',
    },
  };
}
