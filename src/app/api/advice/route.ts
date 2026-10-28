import { NextResponse } from 'next/server';
import { findMatchingSymptomRule } from '@/data/fallbackAdvice';
import { CropId, Language } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      crop = 'tomato',
      stage = 'vegetative',
      symptoms = '',
      followUpAnswers = {},
      language = 'en',
      district = 'Nashik',
    } = body;

    const lang = (language as Language) || 'en';
    const cropId = (crop as CropId) || 'tomato';

    // 1. Check if LLM API key is present in environment
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (anthropicKey) {
      try {
        const prompt = `You are KisanSaathi, an expert agronomist advising a small farmer in Maharashtra, India.
Farmer details:
- Crop: ${cropId}
- Current Stage: ${stage}
- District: ${district}
- Symptoms described: "${symptoms}"
- Follow-up details: ${JSON.stringify(followUpAnswers)}
- Language requested: ${lang} (English: 'en', Hindi: 'hi', Marathi: 'mr')

Follow these safety rules:
1. Provide practical, low-cost local solutions available in Indian taluka shops.
2. Always provide an organic / indigenous alternative (e.g. Jeevamrut, Dashparni ark, Neem oil).
3. Do NOT recommend extreme hazardous chemicals.
4. If severe, set "needsExpert": true.
5. Provide weather and spray warning (e.g. rain safety).
6. Return purely valid JSON in the exact schema below, in the requested language: ${lang}.

JSON Schema:
{
  "cause": "string",
  "confidence": "low | medium | high",
  "fix": "string",
  "organicOption": "string",
  "estimatedCostInr": 250,
  "todaySteps": ["step 1", "step 2"],
  "thisWeekSteps": ["step 1", "step 2"],
  "weatherWarning": "string",
  "needsExpert": false
}`;

        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (res.ok) {
          const aiData = await res.json();
          const text = aiData.content?.[0]?.text;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return NextResponse.json({
              ...parsed,
              isFallback: false,
            });
          }
        }
      } catch (err) {
        console.warn('Anthropic API call failed, falling back to local agricultural rule engine', err);
      }
    }

    // 2. Fallback Agricultural Expert Engine
    const rule = findMatchingSymptomRule(symptoms, cropId);
    const adviceInLang = rule.advice[lang] || rule.advice.en;

    return NextResponse.json({
      ...adviceInLang,
      isFallback: true,
    });
  } catch (error) {
    console.error('Error in /api/advice:', error);
    return NextResponse.json(
      {
        cause: 'Diagnostic service error. Please check your inputs.',
        confidence: 'low',
        fix: 'Contact local Krishi Vigyan Kendra (KVK) for visual inspection.',
        organicOption: 'Spray fresh Neem oil (5ml/L) as broad-spectrum shield.',
        estimatedCostInr: 150,
        todaySteps: ['Inspect field for spread', 'Isolate severely damaged plants'],
        thisWeekSteps: ['Consult taluka agriculture officer'],
        weatherWarning: 'Do not spray chemicals in wet weather.',
        needsExpert: true,
        isFallback: true,
      },
      { status: 200 }
    );
  }
}

