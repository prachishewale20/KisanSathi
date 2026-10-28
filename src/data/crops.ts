import { CropData } from '../types';

export const CROPS_DATA: Record<string, CropData> = {
  tomato: {
    id: 'tomato',
    name: {
      en: 'Tomato',
      hi: 'टमाटर',
      mr: 'टोमॅटो',
    },
    hindiName: 'टमाटर',
    marathiName: 'टोमॅटो',
    seasonLengthDays: 120,
    avgYieldPerAcreQuintal: 80,
    approxPricePerQuintal: 1800,
    stages: [
      {
        id: 'establishment',
        name: {
          en: 'Establishment & Rooting',
          hi: 'स्थापना एवं जड़ पकड़ना',
          mr: 'रोप स्थिरीकरण आणि मुळांची वाढ',
        },
        startDay: 0,
        endDay: 20,
        waterNeed: {
          en: 'Light, frequent irrigation every 2-3 days. Soil should stay moist, not waterlogged.',
          hi: 'हर 2-3 दिन में हल्की सिंचाई। मिट्टी में नमी रहे, पानी जमा न होने दें।',
          mr: 'दर २-३ दिवसांनी हलके पाणी द्या. माती ओलसर असावी, पण पाणी साचू देऊ नका.',
        },
        nutrientInput: {
          en: 'Apply 19:19:19 NPK starter or well-decomposed FYM (Farm Yard Manure).',
          hi: '19:19:19 एनपीके या अच्छी तरह सड़ी हुई गोबर की खाद डालें।',
          mr: '१९:१९:१९ विद्राव्य खत किंवा चांगले कुजलेले शेणखत द्या.',
        },
        organicAlternative: {
          en: 'Drenching with Jeevamrut (200L/acre) or Trichoderma viride to prevent seedling rot.',
          hi: 'जीवामृत (200 ली/एकड़) या ट्राइकोडर्मा का घोल डालकर जड़ सड़न से बचाएं।',
          mr: 'रोप मर रोखण्यासाठी २०० लिटर जीवामृत किंवा ट्रायकोडर्माचे ड्रेन्चिंग करा.',
        },
        commonProblems: {
          en: ['Damping off (seedling rot)', 'Cutworms', 'Transplant shock'],
          hi: ['पौध का गलना (डैम्पिंग ऑफ)', 'कटवर्म (जड़ काटने वाला कीड़ा)', 'रोपाई का झटका'],
          mr: ['रोपांची मान कुजणे (मर रोग)', 'खोडकिडे', 'पुनर्लागवडीचा ताण'],
        },
        tasks: [
          {
            id: 't-est-1',
            en: 'Check field for missing or wilted seedlings and gap-fill within day 7.',
            hi: '7 दिनों के भीतर सूखे पौधों की जगह नए पौधे लगाएं (गैप-फिलिंग)।',
            mr: '७ दिवसांच्या आत सुकलेल्या रोपांच्या जागी नवीन रोपे लावा (नागे भरणे).',
          },
          {
            id: 't-est-2',
            en: 'Apply light weeding around root zones without disturbing soil depth.',
            hi: 'जड़ों के पास से हल्के हाथ से खरपतवार निकालें।',
            mr: 'मुळांना इजा न करता रोपांभोवतीची हलकी खुरपणी करा.',
          },
          {
            id: 't-est-3',
            en: 'Set up yellow sticky traps (4-6 traps/acre) to monitor whiteflies.',
            hi: 'सफेद मक्खी की निगरानी के लिए पीले चिपचिपे ट्रैप (4-6 प्रति एकड़) लगाएं।',
            mr: 'पांढरी माशीच्या नियंत्रणासाठी एकरी ४-६ पिवळे चिकट सापळे लावा.',
          },
        ],
      },
      {
        id: 'vegetative',
        name: {
          en: 'Vegetative Growth & Staking',
          hi: 'वानस्पतिक वृद्धि एवं सहारा देना',
          mr: 'शाकीय वाढ आणि बांबू-तारेचा आधार',
        },
        startDay: 21,
        endDay: 45,
        waterNeed: {
          en: 'Moderate watering every 4-5 days. Drip irrigation recommended (2 hours/day).',
          hi: 'हर 4-5 दिन में मध्यम सिंचाई। ड्रिप हो तो दिन में 2 घंटे चलाएं।',
          mr: 'दर ४-५ दिवसांनी मध्यम पाणी द्या. ठिबक असल्यास दिवसातून २ तास चालवा.',
        },
        nutrientInput: {
          en: 'Top-dress with Urea (25 kg/acre) + Micronutrient spray (Zinc & Boron).',
          hi: 'यूरिया (25 किलो/एकड़) और सूक्ष्म पोषक तत्वों (जिंक, बोरॉन) का छिड़काव करें।',
          mr: 'युरिया (२५ किलो/एकर) आणि सूक्ष्म अन्नद्रव्ये (झिंक व बोरॉन) फवारणी करा.',
        },
        organicAlternative: {
          en: 'Spray Vermiwash (10%) + Neem oil (5ml/L) to prevent leaf miners and aphids.',
          hi: 'वर्मीवॉश (10%) + नीम का तेल (5 मिली/ली) छिड़कें कीड़ों से बचाव हेतु।',
          mr: 'वर्मीवॉश (१०%) + निंबोळी अर्क (५ मिली/लिटर) फवारून मावा व नागअळी रोखा.',
        },
        commonProblems: {
          en: ['Leaf curl virus (spread by whitefly)', 'Early blight', 'Leaf miner tunnels'],
          hi: ['पत्ती मरोड़ रोग (लीफ कर्ल)', 'अगेती झुलसा (अर्ली ब्लाइट)', 'लीफ माइनर कीड़े'],
          mr: ['चुरडा-मुरडा (व्हायरस)', 'करपा रोग', 'नागअळीचा प्रादुर्भाव'],
        },
        tasks: [
          {
            id: 't-veg-1',
            en: 'Erect bamboo stakes and tie wires to train tomato branches upright.',
            hi: 'बांस और तार लगाकर पौधों को ऊपर चढ़ाने का काम पूरा करें।',
            mr: 'टोमॅटोच्या झाडांना बांबू आणि तारेचा आधार देऊन बांधणी करा.',
          },
          {
            id: 't-veg-2',
            en: 'Prune lower yellowing suckers touching wet soil to stop fungal entry.',
            hi: 'जमीन को छूने वाली निचली पत्तियों और अतिरिक्त शाखाओं की छंटाई करें।',
            mr: 'जमिनीला टेकणाऱ्या खालच्या पिवळ्या पानांची आणि फुटव्यांची छाटणी करा.',
          },
          {
            id: 't-veg-3',
            en: 'Inspect leaf undersides for whitefly nymphs or spider mites.',
            hi: 'पत्तियों के नीचे सफेद मक्खी या मकड़ी के जाले की जांच करें।',
            mr: 'पानांच्या मागच्या बाजूला पांढरी माशी किंवा लाल कोळी आहेत का ते तपासा.',
          },
        ],
      },
      {
        id: 'flowering',
        name: {
          en: 'Flowering & Fruit Setting',
          hi: 'फूल आना एवं फल बनना',
          mr: 'फुलधारणा आणि फळधारणा',
        },
        startDay: 46,
        endDay: 65,
        waterNeed: {
          en: 'Consistent moisture is critical. Sudden moisture swings cause flower drop.',
          hi: 'समान नमी बनाए रखें। पानी के उतार-चढ़ाव से फूल गिर सकते हैं।',
          mr: 'जमिनीतील ओलावा स्थिर ठेवा. पाणी कमी-जास्त झाल्यास फुलगळ होते.',
        },
        nutrientInput: {
          en: 'Apply 13:00:45 (Potassium Nitrate) or 0:52:34 (MKP) + Calcium-Boron foliar spray.',
          hi: '13:00:45 या 0:52:34 का छिड़काव और फूल झड़ने से रोकने हेतु कैल्शियम-बोरॉन स्प्रे।',
          mr: '१३:००:४५ किंवा ०:५२:३४ खत आणि फुलगळ थांबवण्यासाठी कॅल्शियम-बोरॉन फवारणी करा.',
        },
        organicAlternative: {
          en: 'Sour buttermilk spray (50ml/L water) or Dashparni ark for fungal resistance.',
          hi: 'खट्टी छाछ (50 मिली/लीटर) या दशपर्णी अर्क का छिड़काव करें।',
          mr: 'आंबट ताक (५० मिली/लिटर) किंवा दशपर्णी अर्काची प्रतिबंधक फवारणी करा.',
        },
        commonProblems: {
          en: ['Flower drop due to heat or moisture shock', 'Fruit borer moths', 'Blossom end rot'],
          hi: ['फूलों का झड़ना', 'फल छेदक इल्ली (फ्रूट बोरर)', 'ब्लॉसम एंड रॉट (फल का नीचे से सड़ना)'],
          mr: ['फुलगळ', 'फळ पोखरणाऱ्या अळ्या', 'कॅल्शियम कमतरतेमुळे फळे तडकणे/काळे पडणे'],
        },
        tasks: [
          {
            id: 't-flw-1',
            en: 'Install pheromone traps (Helilure) for fruit borer monitoring (5/acre).',
            hi: 'फल छेदक इल्ली के लिए फेरोमोन ट्रैप (5 प्रति एकड़) लगाएं।',
            mr: 'फळ पोखरणाऱ्या अळीसाठी एकरी ५ कामगंध (फेरोमोन) सापळे लावा.',
          },
          {
            id: 't-flw-2',
            en: 'Spray Calcium + Boron to prevent blossom end rot on emerging fruits.',
            hi: 'छोटे फलों को सड़ने व फटने से बचाने के लिए बोरॉन का छिड़काव करें।',
            mr: 'फळे तडकणे रोखण्यासाठी आणि सेटिंग वाढवण्यासाठी बोरॉनची फवारणी करा.',
          },
        ],
      },
      {
        id: 'fruiting',
        name: {
          en: 'Fruit Development & Ripening',
          hi: 'फलों का विकास एवं पकना',
          mr: 'फळांचा विकास आणि पक्वता',
        },
        startDay: 66,
        endDay: 95,
        waterNeed: {
          en: 'Deep watering every 3-4 days. Avoid overhead spraying to protect ripening fruits.',
          hi: 'हर 3-4 दिन में गहरी सिंचाई। पके फलों पर ऊपर से पानी न डालें।',
          mr: 'दर ३-४ दिवसांनी व्यवस्थित पाणी द्या. फळांवर पाणी उडणार नाही याची काळजी घ्या.',
        },
        nutrientInput: {
          en: 'Apply Sulphate of Potash (0:0:50) for fruit firmness, weight, and shine.',
          hi: 'फलों की चमक, वजन व मिठास के लिए 0:0:50 (पोटाश) दें।',
          mr: 'फळांचा आकार, चकाकी आणि वजन वाढवण्यासाठी ०:०:५० (पोटॅश) द्या.',
        },
        organicAlternative: {
          en: 'Wood ash dusting around plants for potassium; Bacillus thuringiensis (Bt) for caterpillars.',
          hi: 'पौधों के चारों ओर लकड़ी की राख डालें; इल्लियों के लिए बीटी (Bt) घोल का प्रयोग करें।',
          mr: 'पोटॅशसाठी झाडाभोवती लाकडाची राख टाका; अळी नियंत्रणासाठी बीटी (Bt) वापरा.',
        },
        commonProblems: {
          en: ['Fruit borer holes', 'Sunscald on exposed fruits', 'Late blight on leaves'],
          hi: ['फलों में छेद करने वाली इल्ली', 'धूप से फल का जलना (सनस्काल्ड)', 'पछेती झुलसा'],
          mr: ['फळ पोखरणारी अळी', 'उन्हामुळे फळे डागाळणे', 'लेट ब्लाइट (तांबेरा/करपा)'],
        },
        tasks: [
          {
            id: 't-frt-1',
            en: 'Hand-pick and safely dispose of any borer-infested fruits immediately.',
            hi: 'कीड़ा लगे फलों को तुरंत तोड़कर खेत से दूर जमीन में गाड़ दें।',
            mr: 'अळी लागलेली खराब फळे वेचून शेताबाहेर खड्ड्यात पुरा.',
          },
          {
            id: 't-frt-2',
            en: 'Check local mandi prices in Market tab to plan upcoming pickings.',
            hi: 'मार्केट टैब में आज के मंडी भाव देखकर पहली तुड़ाई की तैयारी करें।',
            mr: 'मार्केट टॅबमध्ये आजचे बाजारभाव तपासा आणि पहिल्या तोडणीचे नियोजन करा.',
          },
        ],
      },
      {
        id: 'harvest',
        name: {
          en: 'Harvest & Post-Harvest Care',
          hi: 'तुड़ाई एवं मंडी तैयारी',
          mr: 'काढणी व बाजारपेठ प्रतवारी',
        },
        startDay: 96,
        endDay: 120,
        waterNeed: {
          en: 'Reduce watering 24 hours before harvest to maintain fruit shelf life.',
          hi: 'तुड़ाई से 24 घंटे पहले पानी बंद कर दें ताकि फल जल्दी खराब न हों।',
          mr: 'तोडणीच्या २४ तास आधी पाणी बंद करा, जेणेकरून फळांची टिकवण क्षमता वाढेल.',
        },
        nutrientInput: {
          en: 'Light micronutrient booster if multiple pickings are scheduled.',
          hi: 'अगली तुड़ाई के लिए हल्का सूक्ष्म पोषक तत्व स्प्रे करें।',
          mr: 'पुढील तोडण्या चांगल्या येण्यासाठी हलके सूक्ष्म अन्नद्रव्य फवारा.',
        },
        organicAlternative: {
          en: 'Clean crates washed in mild neem solution before packing.',
          hi: 'फलों को रखने वाले क्रेट्स को साफ व छायादार स्थान पर रखें।',
          mr: 'तोडणी केलेले टोमॅटो सावलीत आणि स्वच्छ क्रेट्समध्ये ठेवा.',
        },
        commonProblems: {
          en: ['Bruising during transport', 'Over-ripening in field', 'Price crashes at mandi'],
          hi: ['परिवहन में फल दबना', 'खेत में फल अधिक पकना', 'मंडी में अचानक भाव गिरना'],
          mr: ['वाहतुकीत फळे दबणे', 'झाडावरच फळे जास्त पिकणे', 'बाजारात भाव गडगडणे'],
        },
        tasks: [
          {
            id: 't-hrv-1',
            en: 'Harvest at breaker/pink stage for distant markets; red ripe for local mandis.',
            hi: 'दूर की मंडी के लिए हल्के लाल (गुलाबी) और स्थानीय बाजार के लिए पके फल तोड़ें।',
            mr: 'दूरच्या बाजारासाठी हिरवे-तांबूस आणि स्थानिक बाजारासाठी लाल पिकलेले टोमॅटो तोडा.',
          },
          {
            id: 't-hrv-2',
            en: 'List your expected harvest on the KisanSaathi Sell Board for direct buyer leads.',
            hi: 'किसान साथी के सेल बोर्ड पर अपनी उपज का विवरण डालें ताकि खरीदार संपर्क करें।',
            mr: 'किसान साथीच्या विक्री फलकावर (Sell Board) नोंदणी करा जेणेकरून व्यापारी थेट संपर्क करतील.',
          },
        ],
      },
    ],
  },
  onion: {
    id: 'onion',
    name: {
      en: 'Onion (Kharif / Late Kharif)',
      hi: 'प्याज (खरीफ / लेट खरीफ)',
      mr: 'कांदा (खरीप / रांगडा कांदा)',
    },
    hindiName: 'प्याज',
    marathiName: 'कांदा',
    seasonLengthDays: 130,
    avgYieldPerAcreQuintal: 80,
    approxPricePerQuintal: 2200,
    stages: [
      {
        id: 'establishment',
        name: {
          en: 'Establishment & Root Setting',
          hi: 'रोपाई एवं जड़ स्थापना',
          mr: 'पुनर्लागवड व मुळांची पकड',
        },
        startDay: 0,
        endDay: 25,
        waterNeed: {
          en: 'Keep soil consistently damp for first 15 days so seedlings do not dry out.',
          hi: 'पहले 15 दिनों तक हल्की नमी बनाए रखें ताकि नन्हे पौधे सूखें नहीं।',
          mr: 'लागवडीनंतर पहिले १५ दिवस जमिनीत हलका ओलावा कायम ठेवा.',
        },
        nutrientInput: {
          en: 'Basal dose: DAP (50 kg) + Muriate of Potash (30 kg) + Sulphur (10 kg/acre).',
          hi: 'बुवाई के समय: डीएपी (50 किलो) + पोटाश (30 किलो) + सल्फर (10 किलो/एकड़)।',
          mr: 'बेसल डोस: डीएपी (५० किलो) + पोटॅश (३० किलो) + गंधक (१० किलो/एकर).',
        },
        organicAlternative: {
          en: 'Seedling dip in Azospirillum and PSB slurry before transplanting.',
          hi: 'रोपाई से पहले जड़ों को एजोस्पिरिलम और पीएसबी घोल में डुबोएं।',
          mr: 'रोपांची मुळे ॲझोस्पिरिलम आणि पीएसबीच्या द्रवात बुडवून मगच लावा.',
        },
        commonProblems: {
          en: ['Root rot', 'Thrips on young leaves', 'Weed competition'],
          hi: ['जड़ गलन', 'नन्हे पौधों पर थ्रिप्स (चूसा कीड़ा)', 'खरपतवार की अधिकता'],
          mr: ['मुळे कुजणे', 'कोवळ्या पातीवर फुलकिडे (थ्रिप्स)', 'तणांची स्पर्धा'],
        },
        tasks: [
          {
            id: 'o-est-1',
            en: 'Gap-fill seedlings within 10 days of transplanting.',
            hi: 'रोपाई के 10 दिनों के अंदर छूटी जगहों पर नए पौधे लगाएं।',
            mr: 'लागवडीनंतर १० दिवसांच्या आत नागे भरून घ्या.',
          },
          {
            id: 'o-est-2',
            en: 'First shallow hoeing to break crust and eliminate emerging weeds.',
            hi: 'खरपतवार हटाने के लिए पहली हल्की खुरपाई करें।',
            mr: 'तण काढण्यासाठी आणि माती भुसभुशीत करण्यासाठी पहिली खुरपणी करा.',
          },
        ],
      },
      {
        id: 'leaf_growth',
        name: {
          en: 'Leaf & Foliage Growth',
          hi: 'पत्तियों की वृद्धि (हरियाली)',
          mr: 'पातीची आणि शाकीय वाढ',
        },
        startDay: 26,
        endDay: 70,
        waterNeed: {
          en: 'Irrigate every 6-7 days depending on temperature. Avoid stagnant water.',
          hi: 'हर 6-7 दिन में मौसम अनुसार पानी दें। क्यारी में पानी न भरने दें।',
          mr: 'हवामानानुसार दर ६-७ दिवसांनी पाणी द्या. वाफ्यात पाणी साचणार नाही याची दक्षता घ्या.',
        },
        nutrientInput: {
          en: 'Split Urea application (25 kg/acre at 30 days and 20 kg at 50 days) + Sulphur.',
          hi: 'यूरिया की दूसरी खुराक (30वें व 50वें दिन) और सल्फर का उपयोग करें।',
          mr: '३० आणि ५० दिवसांनी युरियाचा हप्ता (२५ किलो/एकर) आणि सल्फर द्या.',
        },
        organicAlternative: {
          en: 'Spray 5% Neem seed kernel extract (NSKE) + Gomutra spray for leaf vigor.',
          hi: 'नीम बीज अर्क (NSKE 5%) और गौमूत्र का छिड़काव करें।',
          mr: '५% निंबोळी अर्क आणि गोमूत्राची फवारणी करून पातीला ताकद द्या.',
        },
        commonProblems: {
          en: ['Thrips silver streaks on leaves', 'Purple blotch fungal infection', 'Nitrogen yellowing'],
          hi: ['पत्तियों पर चांदी जैसे सफेद धब्बे (थ्रिप्स)', 'बैंगनी धब्बा रोग (पर्पल ब्लॉच)', 'पत्तियों का पीला पड़ना'],
          mr: ['पातीवर चंदेरी ठिपके व पिळ पडणे (थ्रिप्स)', 'जांभळा करपा रोग', 'पाती पिवळी पडणे'],
        },
        tasks: [
          {
            id: 'o-veg-1',
            en: 'Inspect inner leaf folds for thrips insects (tiny yellow-brown pests).',
            hi: 'पत्तियों के अंदरूनी हिस्से में थ्रिप्स कीड़ों की जांच करें।',
            mr: 'कांद्याच्या पातीचा पोंगा उघडून बारीक पिवळे-तपकिरी थ्रिप्स तपासा.',
          },
          {
            id: 'o-veg-2',
            en: 'Spray preventative fungicide (Mancozeb or Copper Oxychloride) before cloudy/rainy days.',
            hi: 'बादल या बारिश की संभावना से पहले फफूंदनाशक का छिड़काव करें।',
            mr: 'ढगाळ वातावरण असल्यास करपा रोखण्यासाठी बुरशीनाशकाची प्रतिबंधक फवारणी करा.',
          },
        ],
      },
      {
        id: 'bulb_formation',
        name: {
          en: 'Bulb Formation & Swelling',
          hi: 'कंद (गांठ) बनना व फूलना',
          mr: 'कांदा पोसणे (कंद फुगवण)',
        },
        startDay: 71,
        endDay: 110,
        waterNeed: {
          en: 'Regular light watering. Do not let soil dry out completely or crack.',
          hi: 'हल्की और नियमित सिंचाई करें। मिट्टी में दरारें न पड़ने दें।',
          mr: 'नियमित हलके पाणी द्या. जमिनीला भेगा पडू देऊ नका.',
        },
        nutrientInput: {
          en: 'Stop Nitrogen! Apply 0:0:50 (Potash) + 0:52:34 to encourage bulb density.',
          hi: 'यूरिया बंद करें! कंद के आकार व वजन के लिए पोटाश (0:0:50) दें।',
          mr: 'युरिया पूर्णपणे बंद करा! कांदा फुगवणीसाठी ०:०:५० (पोटॅश) द्या.',
        },
        organicAlternative: {
          en: 'Spray seaweed extract or humic acid for bulb expansion and shine.',
          hi: 'कंद को ठोस बनाने के लिए सीवीड (समुद्री शैवाल अर्क) का छिड़काव करें।',
          mr: 'कांद्याची चकाकी आणि आकार वाढवण्यासाठी समुद्री शेवाळ अर्क फवारा.',
        },
        commonProblems: {
          en: ['Premature bolting (flowering stalks)', 'Stempylium blight', 'Bulb rot from excessive water'],
          hi: ['समय से पहले फूल की डंडी निकलना (डोंगरे)', 'स्टेमफिलियम ब्लाइट', 'अधिक पानी से कंद सड़ना'],
          mr: ['अकाली डोंगरे येणे (फुले येणे)', 'कांदा सडणे', 'पाती सुकणे'],
        },
        tasks: [
          {
            id: 'o-blb-1',
            en: 'Snap off any premature flower stalks (bolters) immediately.',
            hi: 'अगर कोई फूल की डंडी (डोंगरा) दिखे तो उसे तुरंत तोड़ दें।',
            mr: 'कांद्यामध्ये आलेले डोंगरे (फुले) ताबडतोब मोडून टाका.',
          },
          {
            id: 'o-blb-2',
            en: 'Check soil moisture before every irrigation; avoid standing water around necks.',
            hi: 'पानी देने से पहले मिट्टी की नमी परखें; कंद के पास पानी जमा न होने दें।',
            mr: 'कांद्याच्या मानेजवळ पाणी साचणार नाही याची खात्री करूनच पाणी द्या.',
          },
        ],
      },
      {
        id: 'maturity_harvest',
        name: {
          en: 'Maturity, Neck Fall & Harvest',
          hi: 'परिपक्वता, गर्दन झुकना एवं तुड़ाई',
          mr: 'कांदा पक्वता, मान पडणे व काढणी',
        },
        startDay: 111,
        endDay: 130,
        waterNeed: {
          en: 'Completely stop irrigation 10-15 days before harvest for dry outer scales.',
          hi: 'तुड़ाई से 10-15 दिन पहले पानी पूरी तरह बंद कर दें ताकि प्याज सूखे और टिकाऊ बने।',
          mr: 'काढणीच्या १०-१५ दिवस आधी पाणी पूर्ण बंद करा जेणेकरून कांद्याचे आवरण कडक होईल.',
        },
        nutrientInput: {
          en: 'No nutrients needed. Allow natural foliage drying.',
          hi: 'किसी खाद की आवश्यकता नहीं है। पत्तियों को प्राकृतिक रूप से सूखने दें।',
          mr: 'कोणतेही खत देऊ नका. पात नैसर्गिकरीत्या वाळू द्या.',
        },
        organicAlternative: {
          en: 'Field curing in shade windrows for 5-7 days before clipping.',
          hi: 'उखाड़ने के बाद प्याज को 5-7 दिन छाया में सुखाएं (क्यूरिंग)।',
          mr: 'काढणीनंतर कांदे ५-७ दिवस सावलीत किंवा पातीने झाकून वाळवा (क्युरिंग).',
        },
        commonProblems: {
          en: ['Neck rot in storage', 'Sunburn if cured under intense direct sun', 'Sprouting'],
          hi: ['भंडारण में गर्दन सड़न', 'कड़ी धूप से प्याज का जलना', 'उगने की समस्या'],
          mr: ['साठवणुकीत मान कुजणे', 'कडक उन्हामुळे कांदा डागाळणे', 'कोंब फुटणे'],
        },
        tasks: [
          {
            id: 'o-hrv-1',
            en: 'Harvest when 50-70% of plant tops have naturally fallen over (neck fall).',
            hi: 'जब 50-70% पौधों की गर्दन झुककर गिर जाए तब प्याज निकालें।',
            mr: 'जेव्हा शेतातील ५०-७०% कांद्याची मान पडेल, तेव्हाच काढणी सुरू करा.',
          },
          {
            id: 'o-hrv-2',
            en: 'Leave 2-3 cm neck when cutting foliage; never cut flush with bulb.',
            hi: 'पत्तियां काटते समय कंद के ऊपर 2-3 सेमी गर्दन छोड़ें।',
            mr: 'कांद्याची पात कापताना मानेवर २-३ सेमी देठ शिल्लक ठेवा.',
          },
          {
            id: 'o-hrv-3',
            en: 'Check Lasalgaon and Nashik mandi trends in Market tab before dispatching.',
            hi: 'मंडी भेजने से पहले लासलगांव व नासिक मंडी के ताज़ा भाव देखें।',
            mr: 'माल बाजारात नेण्यापूर्वी लासलगाव व नाशिक बाजार समितीचे दर तपासा.',
          },
        ],
      },
    ],
  },
  soybean: {
    id: 'soybean',
    name: {
      en: 'Soybean',
      hi: 'सोयाबीन',
      mr: 'सोयाबीन',
    },
    hindiName: 'सोयाबीन',
    marathiName: 'सोयाबीन',
    seasonLengthDays: 105,
    avgYieldPerAcreQuintal: 4, // SRS baseline 4 quintals, standard range 4-8 quintals
    approxPricePerQuintal: 4600,
    stages: [
      {
        id: 'germination',
        name: {
          en: 'Sowing & Germination',
          hi: 'बुवाई एवं अंकुरण',
          mr: 'पेरणी व उगवण',
        },
        startDay: 0,
        endDay: 10,
        waterNeed: {
          en: 'Moist seedbed required. Avoid water stagnation after heavy monsoon showers.',
          hi: 'अंकुरण के लिए पर्याप्त नमी आवश्यक है। भारी बारिश का पानी खेत में रुकने न दें।',
          mr: 'उगवणीसाठी वाफ्यात योग्य ओलावा हवा. पावसाचे पाणी साचून राहू नये.',
        },
        nutrientInput: {
          en: 'Basal: 10:26:26 (50 kg) or Single Super Phosphate (SSP - 100 kg/acre).',
          hi: 'बुवाई पर: 10:26:26 या एसएसपी (100 किलो/एकड़) डालें।',
          mr: 'पेरणीवेळी: १०:२६:२६ किंवा सिंगल सुपर फॉस्फेट (१०० किलो/एकर) द्या.',
        },
        organicAlternative: {
          en: 'Seed treatment with Rhizobium japonicum and Trichoderma powder (5g/kg seed).',
          hi: 'राइजोबियम और ट्राइकोडर्मा से बीजोपचार अवश्य करें (5 ग्राम/किलो बीज)।',
          mr: 'रायझोबियम आणि ट्रायकोडर्मा जिवाणू संवर्धकाची बीजप्रक्रिया (५ ग्रॅम/किलो) करा.',
        },
        commonProblems: {
          en: ['Poor germination due to deep sowing', 'Girdle beetle on young shoots', 'Seed rot'],
          hi: ['ज्यादा गहराई में बीज दबने से कम अंकुरण', 'गर्डल बीटल (चक्र भृंग)', 'बीज सड़न'],
          mr: ['खोल पेरणीमुळे उगवण न होणे', 'खोडकिडा किंवा गर्डल बीटल', 'बीज कुजणे'],
        },
        tasks: [
          {
            id: 's-gem-1',
            en: 'Check germination count by day 7 (target 25-30 healthy seedlings/meter row).',
            hi: '7वें दिन खेत में पौधों की संख्या की जांच करें।',
            mr: '७ व्या दिवशी एका मीटर ओळीत २५-३० रोपे उगवली आहेत का ते तपासा.',
          },
          {
            id: 's-gem-2',
            en: 'Ensure proper drainage channels to let excess monsoon rain flow out.',
            hi: 'अधिक बारिश का पानी निकालने के लिए खेत में जल निकासी नाली बनाएं।',
            mr: 'अतिरिक्त पावसाचे पाणी वाहून जाण्यासाठी शेतात चर (पाटा) काढा.',
          },
        ],
      },
      {
        id: 'vegetative',
        name: {
          en: 'Vegetative Growth & Root Nodules',
          hi: 'वानस्पतिक वृद्धि एवं जड़ ग्रंथियां',
          mr: 'शाकीय वाढ व मुळांवरील गाठी',
        },
        startDay: 11,
        endDay: 35,
        waterNeed: {
          en: 'Rainfed crop; if dry spell extends beyond 10-12 days, provide protective irrigation.',
          hi: 'यदि 10-12 दिनों तक बारिश न हो, तो जीवन रक्षक हल्की सिंचाई करें।',
          mr: 'पावसाचा खंड १०-१२ दिवसांपेक्षा जास्त पडल्यास संरक्षित पाणी द्या.',
        },
        nutrientInput: {
          en: 'Foliar spray of 19:19:19 (100g/pump) at 25-30 days to boost tillering.',
          hi: '25-30 दिनों पर 19:19:19 (100 ग्राम प्रति पंप) का छिड़काव करें।',
          mr: '२५-३० दिवसांनी १९:१९:१९ विद्राव्य खताची (१०० ग्रॅम/पंप) फवारणी करा.',
        },
        organicAlternative: {
          en: 'Dashparni ark or Neem oil (1500 ppm) spray for chewing caterpillars.',
          hi: 'हरी इल्ली के लिए दशपर्णी अर्क या नीम तेल (5 मिली/लीटर) छिड़कें।',
          mr: 'पाने खाणाऱ्या अळ्यांसाठी दशपर्णी अर्क किंवा निंबोळी तेलाची फवारणी करा.',
        },
        commonProblems: {
          en: ['Stem fly (stunted seedlings)', 'Semilooper green caterpillar', 'Broadleaf weeds'],
          hi: ['तना मक्खी (स्टेम फ्लाई)', 'सेमीलूपर हरी इल्ली', 'चौड़ी पत्ती वाले खरपतवार'],
          mr: ['खोडमाशी', 'उंटअळी (सेमीलूपर)', 'रुंद पानांचे तण'],
        },
        tasks: [
          {
            id: 's-veg-1',
            en: 'Complete inter-cultivation (kolpa/hoeing) around day 20-25 before canopy closes.',
            hi: '20-25 दिनों में कोल्पा चलाकर खरपतवार नष्ट करें और मिट्टी चढ़ाएं।',
            mr: '२० ते २५ व्या दिवशी कोळपणी करून तण काढून घ्या आणि झाडांना भर द्या.',
          },
          {
            id: 's-veg-2',
            en: 'Inspect root nodules: pink inside indicates active nitrogen fixation.',
            hi: 'पौधे की जड़ों को धोकर देखें; गुलाबी गांठें मतलब भरपूर नाइट्रोजन बन रहा है।',
            mr: 'झाडाची मुळे तपासून पाहा; मुळांवरील गाठी आतून गुलाबी असल्यास नत्र योग्य तयार होत आहे.',
          },
        ],
      },
      {
        id: 'flowering',
        name: {
          en: 'Flowering & Nodule Peak',
          hi: 'फूल आना (क्रांतिक अवस्था)',
          mr: 'फुलधारणा (अत्यंत संवेदनशील टप्पा)',
        },
        startDay: 36,
        endDay: 55,
        waterNeed: {
          en: 'Most moisture-sensitive stage! Moisture stress will cause massive flower drop.',
          hi: 'अत्यंत संवेदनशील समय! इस समय सूखा पड़ने पर फूल झड़ जाएंगे, सिंचाई अवश्य करें।',
          mr: 'पाण्याचा ताण अजिबात पडू देऊ नका; अन्यथा मोठ्या प्रमाणात फुलगळ होईल.',
        },
        nutrientInput: {
          en: 'Foliar spray of 13:00:45 + Boron (1g/L) to maximize pod set.',
          hi: 'फूलों से फलियां बनने के लिए 13:00:45 और बोरॉन का छिड़काव करें।',
          mr: 'फुलगळ थांबवून शेंगा धरण्यासाठी १३:००:४५ आणि बोरॉन (१ ग्रॅम/लिटर) फवारा.',
        },
        organicAlternative: {
          en: 'Pheromone traps (Spodolure) for tobacco caterpillar (Spodoptera litura).',
          hi: 'स्पोडोप्टेरा इल्ली की निगरानी के लिए फेरोमोन ट्रैप लगाएं।',
          mr: 'लष्करी अळीच्या नियंत्रणासाठी कामगंध सापळे लावा.',
        },
        commonProblems: {
          en: ['Spodoptera caterpillar defoliation', 'Rhizoctonia aerial blight', 'Flower shedding'],
          hi: ['तंबाकू की इल्ली द्वारा पत्तियां खाना', 'हवाई झुलसा रोग', 'फूल गिरना'],
          mr: ['तंबाखूची लष्करी अळी', 'करपा रोग', 'फुलगळ'],
        },
        tasks: [
          {
            id: 's-flw-1',
            en: 'Never spray heavy insecticides during peak morning pollinator activity.',
            hi: 'सुबह के समय जब मधुमक्खियां सक्रिय हों, तब कोई तेज़ कीटनाशक न छिड़कें।',
            mr: 'सकाळी मधमाश्या असताना तीव्र कीटकनाशकांची फवारणी टाळा.',
          },
          {
            id: 's-flw-2',
            en: 'Scout leaves for cluster egg masses of Spodoptera and crush them.',
            hi: 'पत्तियों पर इल्लियों के अंडों के गुच्छे देखें और उन्हें नष्ट करें।',
            mr: 'पानांच्या खालील बाजूस लष्करी अळीचे अंड्यांचे पुंजके नष्ट करा.',
          },
        ],
      },
      {
        id: 'pod_fill',
        name: {
          en: 'Pod Development & Grain Filling',
          hi: 'फलियों का विकास एवं दाना भरना',
          mr: 'शेंगा भरणे व दाण्यांचा विकास',
        },
        startDay: 56,
        endDay: 85,
        waterNeed: {
          en: 'Adequate moisture determines grain size and boldness. Protect from dry spells.',
          hi: 'दाने के मोटे होने के लिए नमी जरूरी है। जरूरत हो तो सिंचाई दें।',
          mr: 'दाणे टपोरे भरण्यासाठी जमिनीत ओलावा आवश्यक आहे. गरज पडल्यास पाणी द्या.',
        },
        nutrientInput: {
          en: 'Spray 0:52:34 or 0:0:50 (Potash) for solid grain weight.',
          hi: 'दानों के वजन व चमक के लिए 0:0:50 (पोटाश) का छिड़काव करें।',
          mr: 'दाण्यांचे वजन व चकाकी वाढवण्यासाठी ०:०:५० (पोटॅश) फवारा.',
        },
        organicAlternative: {
          en: 'Apply Beauveria bassiana (biopesticide) to control pod borer larvae.',
          hi: 'फली छेदक इल्लियों के लिए बवेरिया बैसियाना जैविक फफूंद का छिड़काव करें।',
          mr: 'शेंग पोखरणारी अळी रोखण्यासाठी बिव्हेरिया बॅसियाना जैविक कीटकनाशक वापरा.',
        },
        commonProblems: {
          en: ['Pod borer piercing seeds', 'Rust fungus', 'Premature yellowing due to root stress'],
          hi: ['फली छेदक इल्ली (दानों को खाना)', 'सोयाबीन गेरुआ (रस्ट रोग)', 'असामयिक पीलापन'],
          mr: ['शेंग पोखरणारी अळी', 'तांबेरा रोग (रस्ट)', 'शेंगा भरण्याआधी पाने पिवळी पडणे'],
        },
        tasks: [
          {
            id: 's-pod-1',
            en: 'Check pods for pinhead borer entry holes.',
            hi: 'फलियों में बारीक छेद की जांच करें।',
            mr: 'शेंगांवर अळीने पाडलेली बारीक छिद्रे आहेत का ते तपासा.',
          },
          {
            id: 's-pod-2',
            en: 'Check weather forecast: if continuous rain predicted, drain field edges.',
            hi: 'मौसम का पूर्वानुमान देखें और पानी निकासी की व्यवस्था चुस्त रखें।',
            mr: 'हवामान अंदाज तपासा; सतत पाऊस असल्यास पाणी शेतात साचू देऊ नका.',
          },
        ],
      },
      {
        id: 'maturity_harvest',
        name: {
          en: 'Maturity & Pod Harvesting',
          hi: 'परिपक्वता एवं कटाई',
          mr: 'पक्वता, पाने गळणे व काढणी',
        },
        startDay: 86,
        endDay: 105,
        waterNeed: {
          en: 'No irrigation. Leaves naturally yellow and drop, pods turn golden brown.',
          hi: 'सिंचाई की कोई आवश्यकता नहीं। पत्तियां गिर जाएंगी और फलियां सुनहरी हो जाएंगी।',
          mr: 'पाण्याची गरज नाही. सर्व पाने गळून पडतात आणि शेंगा तांबूस-तपकिरी होतात.',
        },
        nutrientInput: {
          en: 'None needed.',
          hi: 'कोई खाद न डालें।',
          mr: 'खताची आवश्यकता नाही.',
        },
        organicAlternative: {
          en: 'Dry threshing on clean tarpaulin to prevent seed contamination.',
          hi: 'साफ तिरपाल पर मड़ाई करें ताकि मिट्टी न मिले।',
          mr: 'स्वच्छ ताडपत्रीवर मळणी करा जेणेकरून दाण्यांमध्ये कचरा व माती जाणार नाही.',
        },
        commonProblems: {
          en: ['Pod shattering if harvest is delayed', 'Rain damage on ripe standing crop', 'Mold in storage'],
          hi: ['देरी से कटाई पर फलियों का खेत में चिटकना', 'पकी फसल पर बेमौसम बारिश', 'भंडारण में फफूंद'],
          mr: ['काढणी उशिरा झाल्यास शेंगा फुटणे व दाणे सांडणे', 'अवकाळी पाऊस', 'साठवणीत बुरशी'],
        },
        tasks: [
          {
            id: 's-hrv-1',
            en: 'Harvest when pods rattle when shaken and seed moisture drops to ~14-15%.',
            hi: 'जब फलियों को हिलाने पर दाने बजने लगें तब कटाई शुरू करें।',
            mr: 'शेंगा हलवल्यावर दाण्यांचा खुळखुळ आवाज येऊ लागला की काढणी सुरू करा.',
          },
          {
            id: 's-hrv-2',
            en: 'Post your soybean quantity on KisanSaathi Sell Board to connect with dal millers/traders.',
            hi: 'किसान साथी सेल बोर्ड पर अपनी सोयाबीन उपज लिस्ट करें।',
            mr: 'किसान साथी विक्री फलकावर सोयाबीनची नोंदणी करा जेणेकरून व्यापारी व प्रक्रियादार थेट संपर्क करतील.',
          },
        ],
      },
    ],
  },
};

export const MAHARASHTRA_DISTRICTS = [
  'Ahmednagar',
  'Akola',
  'Amravati',
  'Chhatrapati Sambhajinagar (Aurangabad)',
  'Beed',
  'Bhandara',
  'Buldhana',
  'Chandrapur',
  'Dhule',
  'Gadchiroli',
  'Gondia',
  'Hingoli',
  'Jalgaon',
  'Jalna',
  'Kolhapur',
  'Latur',
  'Mumbai',
  'Nagpur',
  'Nanded',
  'Nandurbar',
  'Nashik',
  'Dharashiv (Osmanabad)',
  'Palghar',
  'Parbhani',
  'Pune',
  'Raigad',
  'Ratnagiri',
  'Sangli',
  'Satara',
  'Sindhudurg',
  'Solapur',
  'Thane',
  'Wardha',
  'Washim',
  'Yavatmal',
];
