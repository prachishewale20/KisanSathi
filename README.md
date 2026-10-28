# KisanSaathi (किसान साथी)
> **Grow smart. Harvest right. Sell fair.**  
> *बोओ समझदारी से, बेचो सही दाम पर*  
> *स्मार्ट पिकवा, योग्य काढा, रास्त दरात विका*

A mobile-first web app (PWA) that walks a small farmer in Maharashtra through one complete crop season: grow it right, diagnose problems early, estimate harvest yield & income, monitor wholesale mandi price trends, and list produce directly to buyers with zero middleman commission.

Built for the **Agriculture & Rural Solutions Track**.

---

## 🌾 The Core Modules

| Module | Purpose | Key Capabilities |
| :--- | :--- | :--- |
| **Start (Setup)** | Setup in < 30s | Sowing date, land area in acres, Maharashtra district, crop selection (Tomato, Onion, Soybean), 1-click demo button |
| **Grow** | Crop stage timeline & weekly care | Day-by-day progress bar, water requirements, nutrient doses, organic remedies, common pests watch-out, interactive task checklist |
| **Check** | Crop symptom helper | Free text description in EN / HI / MR, 2-3 interactive follow-up questions, likely cause with confidence rating, low-cost organic options, weather & spray alert (Open-Meteo), Web Speech read-aloud, and health severity multiplier |
| **Estimate** | Yield and income projection | Real-time mathematical formula linked to health factor: $\text{Yield} = \text{Area} \times \text{Avg Yield} \times \text{Health Factor}$, income range based on recent mandi arrivals |
| **Market** | Mandi price trends & What to grow | 90-day wholesale price trend chart (Recharts), trend badge (rising, steady, falling), algorithm-based "What to Grow Next" with mandatory farmer risk note |
| **Sell** | Direct farmer sell board | Post produce (quintals, asking price, village, 10-digit phone number with validation), browse listings (newest first), click-to-call, copy phone, zero commission disclaimer |
| **Settings** | Vernacular & comfort options | Instant toggle between English, Hindi, and Marathi; Simple Mode (large text & high contrast for bright sunlight) |

---

## 🎨 Brand & Visual Identity (SRS Aligned)

- **Primary**: Forest Green (`#2F6B4F`)
- **Background**: Warm Cream (`#FAF7F0`)
- **Surface**: Sage Mist (`#E4EDE6`)
- **Text**: Charcoal (`#1F2A24`)
- **Accent**: Harvest Amber (`#E0A83B`)
- **Alert**: Clay Red (`#C4553D`)
- **Typography**: Poppins (headings & key metrics), Inter (body), Noto Sans Devanagari (Hindi & Marathi)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your mobile browser or desktop browser (responsive 360px mobile viewport centered at 960px).

### 3. Build for Production
```bash
npm run build
npm start
```

---

## ⏱️ 3-Minute Hackathon Demo Script

1. **Problem (30s)**: Small farmers in Maharashtra lose income because expert advice is slow, English-only, and mandi prices fluctuate unpredictably.
2. **Start Screen (20s)**: Click **"Try 1-Click Demo"** (Tomato, 40 days ago, 2 acres, Nashik).
3. **Grow Tab (30s)**: Show the current stage (Vegetative Growth & Staking), expected harvest date, water requirements, and check off a weekly task.
4. **Check Tab (40s)**: Type or click *"Leaves yellow and curling upwards"*, answer the quick follow-up questions, show the diagnosis (Tomato Leaf Curl Virus / Whiteflies), low-cost organic remedy (Neem oil + yellow sticky cards), weather spray warning, and Web Speech read-aloud. Select **"Moderate"** severity.
5. **Estimate Tab (30s)**: Show how the yield and income dropped proportionally (-25%) in real time due to the reported pest severity.
6. **Market Tab (20s)**: Show the 90-day price trend chart, the trend badge, and the "What to Grow Next" recommendation with the risk warning.
7. **Sell Board (10s)**: Demonstrate posting produce and the instant click-to-call feature.
8. **Close**: *"Existing apps answer one question each. KisanSaathi answers the farmer's whole season."*

