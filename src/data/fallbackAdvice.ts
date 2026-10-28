import { AdviceResult, FollowUpQuestion, Language, CropId } from '../types/index';

export interface SymptomRule {
  id: string;
  keywords: string[];
  crop?: CropId;
  followUps: FollowUpQuestion[];
  advice: Record<Language, AdviceResult>;
}

export const FALLBACK_SYMPTOM_RULES: SymptomRule[] = [
  {
    id: 'leaf-curl-whitefly',
    keywords: ['curl', 'curling', 'yellow', 'चूसा', 'मरोड़', 'चुरडा', 'पिवळी', 'पांढरी माशी', 'whitefly'],
    crop: 'tomato',
    followUps: [
      {
        id: 'q-curl-direction',
        question: {
          en: 'Are the leaf edges curling upwards or downwards?',
          hi: 'क्या पत्तियों के किनारे ऊपर की ओर मुड़ रहे हैं या नीचे?',
          mr: 'पानांच्या कडा वरच्या बाजूला वळत आहेत की खाली?',
        },
        options: [
          {
            id: 'upward',
            label: {
              en: 'Curling upwards like a cup (with pale yellowing)',
              hi: 'कटोरी की तरह ऊपर मुड़ रहे हैं (हल्के पीलेपन के साथ)',
              mr: 'वाटीसारखे वरच्या बाजूला वळत आहेत (पिवळेपणासह)',
            },
          },
          {
            id: 'downward',
            label: {
              en: 'Curling downwards (leaves leathery or deformed)',
              hi: 'नीचे की तरफ मुड़ रहे हैं',
              mr: 'खाली वळत आहेत आणि पाने जाड वाटत आहेत',
            },
          },
        ],
      },
      {
        id: 'q-pests-underside',
        question: {
          en: 'Do you see tiny white flying insects when shaking the plant?',
          hi: 'पौधे को हिलाने पर क्या छोटी सफेद मक्खियां उड़ती दिखती हैं?',
          mr: 'झाड हलवल्यावर पानांमागून बारीक पांढऱ्या माश्या उडताना दिसतात का?',
        },
        options: [
          {
            id: 'yes-whiteflies',
            label: {
              en: 'Yes, lots of tiny white flies',
              hi: 'हां, बहुत सारी सफेद मक्खियां उड़ती हैं',
              mr: 'होय, खूप बारीक पांढऱ्या माश्या उडतात',
            },
          },
          {
            id: 'no-pests',
            label: {
              en: 'No visible flies, but leaves are brittle',
              hi: 'नहीं, कीड़े नहीं दिख रहे पर पत्तियां कड़क हैं',
              mr: 'नाही, पण पाने कोरडी व कडक झाली आहेत',
            },
          },
        ],
      },
    ],
    advice: {
      en: {
        cause: 'Tomato Leaf Curl Virus (ToLCV) transmitted by Whiteflies (Bemisia tabaci)',
        confidence: 'high',
        fix: 'Spray systemic insecticide for vector control: Acetamiprid 20% SP (0.5g/L) or Diafenthiuron 50% WP (1g/L).',
        organicOption: 'Erect yellow sticky cards (10/acre) + spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 1500ppm (5ml/L) with 1ml soap solution.',
        estimatedCostInr: 280,
        todaySteps: [
          'Install yellow sticky traps immediately at canopy height to capture adult whiteflies.',
          'Gently pull out and bury any heavily stunted viral plants (they act as infection reservoir).',
        ],
        thisWeekSteps: [
          'Spray Neem oil or organic biopesticide in late evening (never in harsh afternoon sun).',
          'Avoid excessive chemical nitrogen (Urea) which attracts more soft-bodied sap-sucking pests.',
        ],
        weatherWarning: 'Do not spray if rain is predicted within 18 hours or if wind speed exceeds 15 km/h.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      hi: {
        cause: 'टमाटर पत्ती मरोड़ विषाणु (ToLCV) - सफेद मक्खी द्वारा फैलाया गया वायरस',
        confidence: 'high',
        fix: 'सफेद मक्खी नियंत्रण हेतु: एसीटामिप्रिड 20% एसपी (0.5 ग्राम/ली) या डायफेन्थियुरॉन (1 ग्राम/ली) का छिड़काव।',
        organicOption: 'खेत में पीले चिपचिपे कार्ड (10 प्रति एकड़) लगाएं + नीम का तेल 1500 ppm (5 मिली/लीटर) शैम्पू घोल के साथ मिलाकर छिड़कें।',
        estimatedCostInr: 280,
        todaySteps: [
          'तुरंत पौधों की ऊंचाई पर पीले चिपचिपे ट्रैप लगाएं ताकि सफेद मक्खी उसपर चिपक जाए।',
          'जिस पौधे में रोग बहुत ज्यादा बढ़ चुका हो, उसे उखाड़कर दूर गड्ढे में गाड़ दें।',
        ],
        thisWeekSteps: [
          'शाम 4 बजे के बाद नीम तेल अथवा कीटनाशक का महीन छिड़काव करें।',
          'यूरिया का अधिक प्रयोग न करें, क्योंकि ज्यादा कोमल पत्तियों पर रसचूसक कीड़े तेजी से बढ़ते हैं।',
        ],
        weatherWarning: 'यदि अगले 18 घंटों में बारिश की संभावना हो या तेज हवा चले, तो छिड़काव न करें।',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      mr: {
        cause: 'टोमॅटोवरील चुरडा-मुरडा (व्हायरस) - पांढऱ्या माशीमुळे झालेला प्रसार',
        confidence: 'high',
        fix: 'पांढरी माशी नियंत्रणासाठी ॲसिटामिप्रीड २०% एसपी (०.५ ग्रॅम/लिटर) किंवा डायफेंथियुरॉन (१ ग्रॅम/लिटर) फवारा.',
        organicOption: 'एकरी १० पिवळे चिकट सापळे लावा + ५% निंबोळी अर्क किंवा कडुलिंब तेल (५ मिली/लिटर) फवारा.',
        estimatedCostInr: 280,
        todaySteps: [
          'पिकाच्या उंचीवर पिवळे चिकट सापळे त्वरित लावा जेणेकरून पांढऱ्या माश्या त्यावर अडकतील.',
          'अतिबाधित आणि चुरडलेली रोपे मुळासकट उपटून शेताबाहेर खड्ड्यात नष्ट करा.',
        ],
        thisWeekSteps: [
          'उन्हाची तीव्रता कमी झाल्यावर (संध्याकाळी) निंबोळी अर्काची फवारणी करा.',
          'युरियाचा अतिरेक टाळा, कारण कोवळ्या वाढीवर रसशोषक किडींचा प्रादुर्भाव वेगाने वाढतो.',
        ],
        weatherWarning: 'पुढील १८ तासांत पावसाची शक्यता असल्यास किंवा जोराचा वारा असल्यास फवारणी करू नका.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
    },
  },
  {
    id: 'fruit-borer-caterpillar',
    keywords: ['borer', 'hole', 'caterpillar', 'इल्ली', 'छेद', 'अळी', 'फळ पोखर', 'fruit rot'],
    crop: 'tomato',
    followUps: [
      {
        id: 'q-hole-appearance',
        question: {
          en: 'Where do you see the damage on the tomatoes?',
          hi: 'टमाटर पर नुकसान कहां दिखाई दे रहा है?',
          mr: 'टोमॅटोवर नुकसान नक्की कुठे दिसत आहे?',
        },
        options: [
          {
            id: 'circular-holes',
            label: {
              en: 'Round circular holes near the fruit calyx with caterpillar feces',
              hi: 'फल के डंठल के पास गोल छेद और अंदर कीड़ा/मल',
              mr: 'देठाजवळ गोल छिद्र आणि आत विष्ठा/अळी',
            },
          },
          {
            id: 'soft-decay',
            label: {
              en: 'Watery soft rot spreading across bottom of fruit',
              hi: 'फल के नीचे से सड़न व बदबू',
              mr: 'फळाच्या खालच्या भागातून पाणी सुटून सडणे',
            },
          },
        ],
      },
      {
        id: 'q-caterpillar-seen',
        question: {
          en: 'Have you spotted green or striped caterpillars on leaves or fruits?',
          hi: 'क्या पत्तियों या फलों पर हरी या धारीदार इल्लियां दिखी हैं?',
          mr: 'पानांवर किंवा फळांवर हिरव्या अथवा पट्टेरी अळ्या दिसल्या आहेत का?',
        },
        options: [
          {
            id: 'yes-caterpillars',
            label: {
              en: 'Yes, seen crawling caterpillars',
              hi: 'हां, रेंगती हुई इल्लियां दिखी हैं',
              mr: 'होय, फळांवर अळ्या फिरताना दिसत आहेत',
            },
          },
          {
            id: 'only-holes',
            label: {
              en: 'Only holes, but saw moths flying at dusk',
              hi: 'सिर्फ छेद हैं, शाम को पतंगे उड़ते दिखे हैं',
              mr: 'फक्त छिद्रे आहेत, संध्याकाळी पतंग उडताना दिसतात',
            },
          },
        ],
      },
    ],
    advice: {
      en: {
        cause: 'Tomato Fruit Borer (Helicoverpa armigera)',
        confidence: 'high',
        fix: 'Spray Chlorantraniliprole 18.5% SC (0.3 ml/L) or Emamectin Benzoate 5% SG (0.5g/L).',
        organicOption: 'Apply Bacillus thuringiensis (Bt @ 2g/L) or spray Dashparni ark (50ml/pump). Hand-pick affected fruits.',
        estimatedCostInr: 340,
        todaySteps: [
          'Hand-pick all bored/holed tomatoes and destroy them off the field.',
          'Install 5 Helilure pheromone traps per acre to disrupt mating cycles.',
        ],
        thisWeekSteps: [
          'Spray biopesticide or low-toxicity ovicide during evening hours when larvae emerge.',
          'Plant marigold (african marigold) along field borders as trap crop for next cycle.',
        ],
        weatherWarning: 'Avoid chemical spraying under heavy dews or imminent rainfall.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      hi: {
        cause: 'टमाटर फल छेदक इल्ली (हेलिकोवर्पा आर्मिगेरा)',
        confidence: 'high',
        fix: 'इमामेक्टिन बेंजोएट 5% एसजी (0.5 ग्राम/लीटर) या कोराजन (0.3 मिली/लीटर) का छिड़काव करें।',
        organicOption: 'बीटी (Bt जीवाणु पाउडर 2 ग्राम/ली) या दशपर्णी अर्क का छिड़काव। कीड़ा लगे फल हाथ से तोड़ें।',
        estimatedCostInr: 340,
        todaySteps: [
          'जिन फलों में छेद हो चुके हैं, उन्हें तुरंत तोड़कर खेत से दूर नष्ट करें।',
          'नर पतंगों को फंसाने के लिए एक एकड़ में 5 फेरोमोन ट्रैप लगाएं।',
        ],
        thisWeekSteps: [
          'शाम के समय जब इल्लियां बाहर आती हैं, तब कीटनाशक या बीटी का छिड़काव करें।',
          'अगली बार खेत की मेड़ों पर गेंदे के पौधे (ट्रैप क्रॉप) अवश्य लगाएं।',
        ],
        weatherWarning: 'तेज बारिश की संभावना हो तो छिड़काव टालें, दवा धुल जाएगी।',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      mr: {
        cause: 'टोमॅटो फळ पोखरणारी अळी (हेलिकोव्हर्पा)',
        confidence: 'high',
        fix: 'इमामेक्टिन बेंझोएट ५% एसजी (०.५ ग्रॅम/लिटर) किंवा क्लोरँट्रानिलीप्रोल (०.३ मिली/लिटर) फवारा.',
        organicOption: 'बॅसिलस थुरिंगिएन्सिस (बीटी पावडर २ ग्रॅम/लिटर) किंवा दशपर्णी अर्क फवारा. किडलेली फळे हाताने वेचा.',
        estimatedCostInr: 340,
        todaySteps: [
          'छिद्र पडलेली सर्व फळे झाडावरून तोडून शेताबाहेर खड्ड्यात गाडून टाका.',
          'एकरी ५ कामगंध (फेरोमोन) सापळे लावा जेणेकरून नर पतंग पकडले जातील.',
        ],
        thisWeekSteps: [
          'संध्याकाळच्या वेळी फवारणी करा, कारण अळ्या रात्रीच्या वेळी जास्त सक्रिय असतात.',
          'शेताच्या बांधावर झेंडूची झाडे सापळा पीक म्हणून लावा.',
        ],
        weatherWarning: 'पावसाची शक्यता असल्यास फवारणी करू नका, औषध वाहून जाईल.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
    },
  },
  {
    id: 'onion-thrips-purple-blotch',
    keywords: ['onion', 'purple', 'blotch', 'thrips', 'कांदा', 'जांभळा', 'करपा', 'थ्रिप्स', 'silver'],
    crop: 'onion',
    followUps: [
      {
        id: 'q-leaf-markings',
        question: {
          en: 'What kind of markings do you observe on the onion foliage?',
          hi: 'प्याज की पत्तियों पर किस तरह के निशान दिखाई दे रहे हैं?',
          mr: 'कांद्याच्या पातीवर नक्की कशा प्रकारचे डाग दिसत आहेत?',
        },
        options: [
          {
            id: 'purple-oval-spots',
            label: {
              en: 'Sunken oval spots that turn purple-brown with yellow halo',
              hi: 'बैंगनी-भूरे लंबे धब्बे जिनके किनारे पीले हैं (पर्पल ब्लॉच)',
              mr: 'मध्यभागी जांभळे-तपकिरी आणि कडा पिवळसर असलेले लांबट डाग',
            },
          },
          {
            id: 'silvery-streaks',
            label: {
              en: 'Silvery white streaks and curling leaf tips',
              hi: 'चांदी जैसे चमकीले सफेद निशान और मुड़ती हुई पत्तियां',
              mr: 'पातीवर चंदेरी चट्टे आणि पात वाकडीतिकडी होणे',
            },
          },
        ],
      },
      {
        id: 'q-weather-conditions',
        question: {
          en: 'Has the recent weather been cloudy, humid, or drizzly?',
          hi: 'क्या पिछले कुछ दिनों से मौसम बादलों वाला या उमस भरा रहा है?',
          mr: 'गेल्या काही दिवसांत ढगाळ किंवा दमट हवामान होते का?',
        },
        options: [
          {
            id: 'humid-cloudy',
            label: {
              en: 'Yes, cloudy skies and warm humid mornings',
              hi: 'हां, बादल छाए हुए हैं और हवा में नमी है',
              mr: 'होय, ढगाळ आणि दमट हवामान आहे',
            },
          },
          {
            id: 'dry-windy',
            label: {
              en: 'No, dry and hot weather',
              hi: 'नहीं, सूखा और गर्म मौसम है',
              mr: 'नाही, कोरडे आणि उष्ण हवामान आहे',
            },
          },
        ],
      },
    ],
    advice: {
      en: {
        cause: 'Onion Purple Blotch (Alternaria porri) combined with Thrips infestation',
        confidence: 'high',
        fix: 'Spray Difenoconazole 25% EC (1ml/L) + Fipronil 5% SC (1.5ml/L) with a non-ionic sticker (Spreader @ 0.5ml/L).',
        organicOption: 'Spray Sour Buttermilk (50ml/L) + 5% Neem oil. Always add sticker/soap because onion leaves have waxy cuticle.',
        estimatedCostInr: 320,
        todaySteps: [
          'Add a spreader/sticker (अप्सरा/स्टिकर) to every spray solution so it sticks to the waxy vertical onion leaf.',
          'Drain any standing water from beds to curb fungal sporulation.',
        ],
        thisWeekSteps: [
          'Rotate fungicides (switch to Mancozeb 75% WP @ 2.5g/L after 8 days).',
          'Keep field free of onion cull piles and weed hosts.',
        ],
        weatherWarning: 'Crucial: Spray only when leaves are completely dry from morning dew. Do not spray within 6 hours of rain.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      hi: {
        cause: 'प्याज का बैंगनी धब्बा रोग (पर्पल ब्लॉच) एवं थ्रिप्स (रस चूसक कीट)',
        confidence: 'high',
        fix: 'डिफेनोकोनाजोल (1 मिली/ली) + फिप्रोनिल (1.5 मिली/ली) का छिड़काव। साथ में स्टिकर/गोंद जरूर मिलाएं।',
        organicOption: 'खट्टी छाछ (50 मिली/लीटर) + नीम का तेल (5 मिली/ली)। प्याज की पत्ती पर मोमी परत होती है, अतः साबुन/स्टिकर अवश्य डालें।',
        estimatedCostInr: 320,
        todaySteps: [
          'छिड़काव में स्टिकर (चिपकाने वाला घोल) जरूर मिलाएं ताकि दवा खड़ी पत्ती से बह न जाए।',
          'क्यारियों से फालतू पानी तुरंत निकालें।',
        ],
        thisWeekSteps: [
          '8 दिन बाद दूसरा छिड़काव मैंकोजेब (2.5 ग्राम/लीटर) का बदल कर करें।',
          'खेत के आसपास सड़ा हुआ प्याज या खरपतवार न जमा होने दें।',
        ],
        weatherWarning: 'पत्तियों से सुबह की ओस सूखने के बाद ही छिड़काव करें। बारिश से पहले छिड़काव व्यर्थ रहेगा।',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      mr: {
        cause: 'कांद्यावरील जांभळा करपा (पर्पल ब्लॉच) आणि थ्रिप्स (फुलकिडे)',
        confidence: 'high',
        fix: 'डायफेनोकोनाझोल (१ मिली/लिटर) + फिप्रोनिल (१.५ मिली/लिटर) + स्टिकर (०.५ मिली/लिटर) एकत्र करून फवारा.',
        organicOption: 'आंबट ताक (५० मिली/लिटर) + निंबोळी अर्क (५ मिली/लिटर). कांद्याच्या पातीवर मेणाचा थर असल्याने स्टिकर मिसळणे अनिवार्य आहे.',
        estimatedCostInr: 320,
        todaySteps: [
          'फवारणीच्या पाण्यात स्टिकर (चिकटणारा डिंक) नक्की टाका, अन्यथा औषध पातीवरून ओघळून जाईल.',
          'वाफ्यांमध्ये पाणी साचले असल्यास त्वरित चर काढून बाहेर काढा.',
        ],
        thisWeekSteps: [
          '८ दिवसांनी बुरशीनाशक बदलून मॅन्कोझेब (२.५ ग्रॅम/लिटर) ची फवारणी करा.',
          'शेतातील तण आणि खराब कांदा गोळा करून नष्ट करा.',
        ],
        weatherWarning: 'सकाळचे दव सुकल्यानंतरच फवारणी करा. पाऊस येणार असल्यास फवारणी करू नका.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
    },
  },
  {
    id: 'soybean-semilooper-caterpillar',
    keywords: ['soybean', 'leaves eaten', 'holes in leaves', 'caterpillar', 'सोयाबीन', 'अळी', 'पाने खाल्ली', 'उंटअळी'],
    crop: 'soybean',
    followUps: [
      {
        id: 'q-soybean-chewing',
        question: {
          en: 'How are the leaves being damaged?',
          hi: 'पत्तियों का नुकसान किस तरह दिख रहा है?',
          mr: 'पानांचे नुकसान कशा प्रकारे दिसत आहे?',
        },
        options: [
          {
            id: 'skeletonized',
            label: {
              en: 'Leaves eaten into lace-like skeletons or big ragged holes',
              hi: 'पत्तियों में बड़े छेद हैं, सिर्फ नसें बची हैं (जाली बन गई है)',
              mr: 'पानांची फक्त चाळण झाली आहे आणि शिरा उरल्या आहेत',
            },
          },
          {
            id: 'girdled-stem',
            label: {
              en: 'Ring-like cut on main stem and drooping upper leaves',
              hi: 'मुख्य तने पर छल्लेदार कट लगा है और ऊपर की पत्तियां लटक रही हैं',
              mr: 'खोडावर बांगडीसारखा गोल खाच आणि शेंड्याची पाने वाळलेली',
            },
          },
        ],
      },
      {
        id: 'q-soybean-stage',
        question: {
          en: 'Is the soybean currently at flowering or pod stage?',
          hi: 'क्या सोयाबीन में अभी फूल आ रहे हैं या फलियां बन रही हैं?',
          mr: 'सोयाबीन सध्या फुलोऱ्यात आहे की शेंगा भरण्याच्या अवस्थेत?',
        },
        options: [
          {
            id: 'flowering',
            label: {
              en: 'Flowering stage (delicate flowers open)',
              hi: 'फूल आने की अवस्था में है',
              mr: 'फुलोऱ्याच्या संवेदनशील अवस्थेत आहे',
            },
          },
          {
            id: 'pod-development',
            label: {
              en: 'Pod filling stage',
              hi: 'फलियां बन चुकी हैं',
              mr: 'शेंगा भरण्याचा टप्पा सुरू आहे',
            },
          },
        ],
      },
    ],
    advice: {
      en: {
        cause: 'Soybean Semilooper (Chrysodeixis acuta) & Tobacco Caterpillar (Spodoptera litura)',
        confidence: 'high',
        fix: 'Spray Chlorantraniliprole 18.5% SC (0.3 ml/L) or Flubendiamide 39.35% SC (0.5 ml/L).',
        organicOption: 'Spray Beauveria bassiana or Nomuraea rileyi (5g/L) + Neem oil 1500ppm (5ml/L). Bird perches (T-shaped bamboo sticks, 15/acre) encourage predator birds.',
        estimatedCostInr: 310,
        todaySteps: [
          'Install T-shaped bamboo bird perches (15 per acre) across the soybean field so birds can hunt caterpillars.',
          'Crush any egg masses visible on the lower leaf surfaces.',
        ],
        thisWeekSteps: [
          'If flowering is ongoing, spray after 4:00 PM to prevent harm to honeybees and natural pollinators.',
          'Maintain clean bunds free of weed species like Parthenium.',
        ],
        weatherWarning: 'Wait for monsoon showers to pause. Rain within 2 hours washes off biopesticides.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      hi: {
        cause: 'सोयाबीन की सेमीलूपर (उंट इल्ली) एवं तंबाकू की इल्ली',
        confidence: 'high',
        fix: 'फ्लूबेंडियामाइड (0.5 मिली/ली) या कोराजन (0.3 मिली/लीटर) का छिड़काव करें।',
        organicOption: 'बवेरिया बैसियाना जैविक फफूंद (5 ग्राम/ली) + नीम तेल। खेत में पक्षियों के बैठने के लिए टी (T) आकार की खूंटियां (15/एकड़) लगाएं।',
        estimatedCostInr: 310,
        todaySteps: [
          'खेत में 15 टी-आकार के बांस के डंडे लगाएं ताकि पक्षी बैठकर इल्लियों को खा सकें।',
          'पत्तियों के नीचे इल्लियों के अंडों के गुच्छे दिखें तो उन्हें मसल दें।',
        ],
        thisWeekSteps: [
          'अगर फसल में फूल खिले हों, तो शाम 4 बजे के बाद ही छिड़काव करें ताकि मधुमक्खियों को नुकसान न पहुंचे।',
          'मेड़ों से गाजरघास और खरपतवार हटाएं।',
        ],
        weatherWarning: 'बारिश रुकने पर ही छिड़काव करें। कम से कम 2 घंटे धूप या सूखा मौसम जरूरी है।',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      mr: {
        cause: 'सोयाबीनवरील उंटअळी (सेमीलूपर) आणि तंबाखूची लष्करी अळी',
        confidence: 'high',
        fix: 'फ्लुबेंडियामाईड (०.५ मिली/लिटर) किंवा कोराजन (०.३ मिली/लिटर) ची फवारणी करा.',
        organicOption: 'बिव्हेरिया बॅसियाना (५ ग्रॅम/लिटर) + निंबोळी अर्क. शेतात पक्षी थांबण्यासाठी इंग्रजी \'T\' आकाराचे १५ बांबूचे थांबे लावा.',
        estimatedCostInr: 310,
        todaySteps: [
          'शेतात एकरी १५ \'टी\' आकाराचे पक्षी थांबे लावा जेणेकरून पक्षी बसून अळ्या वेचून खातील.',
          'पानांखाली दिसणारे अंड्यांचे पुंजके त्वरित नष्ट करा.',
        ],
        thisWeekSteps: [
          'पिकात फुले असल्यास मधमाश्यांचे रक्षण करण्यासाठी संध्याकाळी ४ नंतरच फवारणी करा.',
          'बांधावरील गाजरगवत व इतर तण नष्ट करा.',
        ],
        weatherWarning: 'पाऊस उघडल्यावरच फवारणी करा; किमान २ तास पाऊस न पडल्यास औषधाचा चांगला परिणाम मिळतो.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
    },
  },
  {
    id: 'general-fungal-blight',
    keywords: ['spot', 'blight', 'black', 'dry', 'दाग', 'करपा', 'झुलसा', 'बुरशी', 'rot', 'brown'],
    followUps: [
      {
        id: 'q-spot-shape',
        question: {
          en: 'What do the spots look like?',
          hi: 'धब्बे कैसे दिखाई दे रहे हैं?',
          mr: 'डाग नक्की कसे दिसत आहेत?',
        },
        options: [
          {
            id: 'concentric-rings',
            label: {
              en: 'Target-board like concentric rings on older leaves',
              hi: 'पुराने पत्तों पर गोल छल्लेदार काले-भूरे धब्बे',
              mr: 'जुन्या पानांवर काळे-तपकिरी गोल कडे असलेले डाग',
            },
          },
          {
            id: 'water-soaked',
            label: {
              en: 'Dark water-soaked patches spreading quickly',
              hi: 'पानी से भीगे हुए काले धब्बे जो तेजी से फैल रहे हैं',
              mr: 'पाण्यासारखे भिजलेले काळपट डाग जे वेगाने पसरत आहेत',
            },
          },
        ],
      },
    ],
    advice: {
      en: {
        cause: 'Early / Late Fungal Blight (Alternaria / Phytophthora)',
        confidence: 'medium',
        fix: 'Spray Mancozeb 75% WP (2.5g/L) or Copper Oxychloride 50% WP (3g/L).',
        organicOption: 'Spray fermented sour buttermilk (100ml/L) or Trichoderma viride foliar spray (5g/L). Remove severely blighted lower leaves.',
        estimatedCostInr: 220,
        todaySteps: [
          'Clip and safely dispose of lower infected leaves touching soil.',
          'Ensure furrow water doesn\'t flood planting ridges.',
        ],
        thisWeekSteps: [
          'Repeat protective copper spray if cloudy weather persists for 3 consecutive days.',
          'Avoid overhead sprinkler watering which splashes fungal spores.',
        ],
        weatherWarning: 'Do not spray when plants are wet with morning dew. Wait until leaves dry out.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      hi: {
        cause: 'फफूंद जनित झुलसा रोग (अगेती / पछेती ब्लाइट)',
        confidence: 'medium',
        fix: 'मैंकोजेब 75% डब्लूपी (2.5 ग्राम/ली) या कॉपर ऑक्सीक्लोराइड (3 ग्राम/ली) का छिड़काव करें।',
        organicOption: 'खट्टी छाछ (100 मिली/लीटर) या ट्राइकोडर्मा घोल का छिड़काव। निचली रोगी पत्तियों को तोड़कर नष्ट करें।',
        estimatedCostInr: 220,
        todaySteps: [
          'जमीन को छूने वाली बीमार पत्तियों को काटकर खेत से बाहर निकालें।',
          'पौधों की जड़ों में पानी भरने न दें।',
        ],
        thisWeekSteps: [
          'यदि 3 दिनों तक लगातार बादल रहें तो कॉपर फफूंदनाशक का दोबारा छिड़काव करें।',
          'ऊपर से फव्वारा सिंचाई न करें, इससे फफूंद के जीवाणु अन्य पत्तियों में फैलते हैं।',
        ],
        weatherWarning: 'सुबह जब पत्तियों पर ओस हो तब दवा न छिड़कें। पत्ते सूखने की प्रतीक्षा करें।',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
      mr: {
        cause: 'बुरशीजन्य करपा रोग (अल्टरनेरिया / फायटोफ्थोरा ब्लाइट)',
        confidence: 'medium',
        fix: 'मॅन्कोझेब ७५% डब्ल्यूपी (२.५ ग्रॅम/लिटर) किंवा कॉपर ऑक्सिक्लोराईड (३ ग्रॅम/लिटर) फवारा.',
        organicOption: 'आंबट ताक (१०० मिली/लिटर) किंवा ट्रायकोडर्मा (५ ग्रॅम/लिटर) फवारा. जमिनीला टेकलेली रोगट पाने छाटून टाका.',
        estimatedCostInr: 220,
        todaySteps: [
          'रोगट झालेली खालची पाने काढून शेताबाहेर नष्ट करा.',
          'झाडांच्या मुळाशी पाणी साचू देऊ नका.',
        ],
        thisWeekSteps: [
          'ढगाळ हवामान टिकून राहिल्यास ८ दिवसांनी प्रतिबंधक बुरशीनाशकाची दुसरी फवारणी करा.',
          'स्प्रिंकलरने पाणी देणे टाळा, कारण पाण्याचे थेंब उडाल्याने बुरशी इतर निरोगी पानांवर पसरते.',
        ],
        weatherWarning: 'पानांवर दव असताना फवारणी करू नका. पाने वाळल्यावरच औषध फवारा.',
        severity: 'moderate',
        needsExpert: false,
        isFallback: true,
      },
    },
  },
];

export function findMatchingSymptomRule(text: string, crop?: CropId): SymptomRule {
  const lower = text.toLowerCase();
  
  // First attempt: match crop and keywords
  for (const rule of FALLBACK_SYMPTOM_RULES) {
    if (rule.crop && crop && rule.crop !== crop) continue;
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return rule;
      }
    }
  }

  // Second attempt: match keywords regardless of crop
  for (const rule of FALLBACK_SYMPTOM_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return rule;
      }
    }
  }

  // Default fallback: general fungal / blight
  return FALLBACK_SYMPTOM_RULES[FALLBACK_SYMPTOM_RULES.length - 1];
}

