export type CropId = "paddy" | "pearl-millet" | "maize" | "groundnut";

export type CropPlan = {
  id: CropId;
  name: string;
  variety: string;
  image: string;
  stageName: string;
  stageAdvice: string;
  nextActivity: string;
  recommendation: string;
  stages: ReadonlyArray<{
    name: string;
    dates: string;
    status: "completed" | "current" | "upcoming";
    advice: string;
  }>;
};

export const locations = [
  "Morija, Chomu, Jaipur, Rajasthan",
  "Govindgarh, Chomu, Jaipur, Rajasthan",
  "Kaladera, Chomu, Jaipur, Rajasthan",
] as const;

export const seasons = ["Kharif 2026", "Rabi 2026-27", "Zaid 2027"] as const;

export const cropPlans: Record<CropId, CropPlan> = {
  paddy: {
    id: "paddy",
    name: "Paddy (Dhan)",
    variety: "PR-126",
    image: "/images/authenticated/farms/paddy-field.jpg",
    stageName: "Transplanting",
    stageAdvice:
      "Timely transplanting ensures good tillering and better yield. Maintain a water level of 2-3 cm.",
    nextActivity: "Basal Fertilizer",
    recommendation: "25 kg Urea / Acre",
    stages: [
      {
        name: "Land Preparation",
        dates: "01 May - 20 May",
        status: "completed",
        advice: "Level the field and prepare well-puddled soil.",
      },
      {
        name: "Nursery Preparation",
        dates: "15 May - 10 Jun",
        status: "completed",
        advice: "Use healthy, treated seed in a raised nursery bed.",
      },
      {
        name: "Transplanting",
        dates: "15 Jun - 30 Jun",
        status: "current",
        advice:
          "Timely transplanting ensures good tillering and better yield. Maintain a water level of 2-3 cm.",
      },
      {
        name: "Basal Fertilizer",
        dates: "01 Jul - 10 Jul",
        status: "upcoming",
        advice: "Apply the recommended basal dose evenly after soil testing.",
      },
      {
        name: "Top Dressing (1st)",
        dates: "15 Jul - 25 Jul",
        status: "upcoming",
        advice: "Apply nitrogen when the crop starts active tillering.",
      },
      {
        name: "Flowering",
        dates: "20 Sep - 05 Oct",
        status: "upcoming",
        advice: "Avoid moisture stress and monitor leaf folder activity.",
      },
      {
        name: "Harvesting",
        dates: "20 Oct - 10 Nov",
        status: "upcoming",
        advice: "Harvest when 80-85% of grains turn golden yellow.",
      },
    ],
  },
  "pearl-millet": {
    id: "pearl-millet",
    name: "Pearl Millet (Bajra)",
    variety: "HHB 67 Improved",
    image: "/images/authenticated/dashboard-wheat.jpg",
    stageName: "Sowing",
    stageAdvice:
      "Sow in rows after effective monsoon rainfall and keep a uniform plant population.",
    nextActivity: "Gap Filling & Thinning",
    recommendation: "Maintain 10-12 cm plant spacing",
    stages: [
      {
        name: "Land Preparation",
        dates: "01 Jun - 20 Jun",
        status: "completed",
        advice: "Use one deep ploughing followed by two harrowings.",
      },
      {
        name: "Seed Treatment",
        dates: "20 Jun - 25 Jun",
        status: "completed",
        advice: "Treat certified seed before sowing.",
      },
      {
        name: "Sowing",
        dates: "25 Jun - 10 Jul",
        status: "current",
        advice:
          "Sow in rows after effective monsoon rainfall and keep a uniform plant population.",
      },
      {
        name: "Gap Filling & Thinning",
        dates: "10 Jul - 20 Jul",
        status: "upcoming",
        advice: "Thin crowded seedlings and fill gaps within two weeks.",
      },
      {
        name: "Top Dressing",
        dates: "20 Jul - 05 Aug",
        status: "upcoming",
        advice: "Apply nitrogen when adequate soil moisture is available.",
      },
      {
        name: "Earhead Formation",
        dates: "25 Aug - 15 Sep",
        status: "upcoming",
        advice: "Monitor downy mildew and maintain field sanitation.",
      },
      {
        name: "Harvesting",
        dates: "20 Sep - 10 Oct",
        status: "upcoming",
        advice: "Harvest mature earheads before grain shedding starts.",
      },
    ],
  },
  maize: {
    id: "maize",
    name: "Maize (Makka)",
    variety: "HQPM-1",
    image: "/images/authenticated/pest-disease/crop-maize.jpg",
    stageName: "Sowing",
    stageAdvice:
      "Place seed at uniform depth in moist soil and maintain proper row spacing.",
    nextActivity: "First Weeding",
    recommendation: "Complete 20-25 days after sowing",
    stages: [
      {
        name: "Land Preparation",
        dates: "01 Jun - 15 Jun",
        status: "completed",
        advice: "Prepare a fine seedbed with good drainage.",
      },
      {
        name: "Seed Treatment",
        dates: "15 Jun - 20 Jun",
        status: "completed",
        advice: "Use treated hybrid seed suitable for Rajasthan.",
      },
      {
        name: "Sowing",
        dates: "20 Jun - 05 Jul",
        status: "current",
        advice:
          "Place seed at uniform depth in moist soil and maintain proper row spacing.",
      },
      {
        name: "First Weeding",
        dates: "15 Jul - 25 Jul",
        status: "upcoming",
        advice: "Remove weeds before they compete with the young crop.",
      },
      {
        name: "Top Dressing",
        dates: "30 Jul - 10 Aug",
        status: "upcoming",
        advice: "Side-dress nitrogen and irrigate lightly if required.",
      },
      {
        name: "Tasseling",
        dates: "25 Aug - 10 Sep",
        status: "upcoming",
        advice: "Prevent moisture stress during tasseling and silking.",
      },
      {
        name: "Harvesting",
        dates: "25 Sep - 15 Oct",
        status: "upcoming",
        advice: "Harvest when husks dry and grains become firm.",
      },
    ],
  },
  groundnut: {
    id: "groundnut",
    name: "Groundnut (Moongfali)",
    variety: "RG 425",
    image: "/images/authenticated/farms/chickpea-field.jpg",
    stageName: "Sowing",
    stageAdvice:
      "Sow treated kernels in moist, well-drained soil at the recommended spacing.",
    nextActivity: "Gypsum Application",
    recommendation: "Apply at flowering as advised",
    stages: [
      {
        name: "Land Preparation",
        dates: "01 Jun - 15 Jun",
        status: "completed",
        advice: "Prepare loose soil with good drainage.",
      },
      {
        name: "Seed Treatment",
        dates: "15 Jun - 20 Jun",
        status: "completed",
        advice: "Treat kernels with recommended fungicide and culture.",
      },
      {
        name: "Sowing",
        dates: "20 Jun - 05 Jul",
        status: "current",
        advice:
          "Sow treated kernels in moist, well-drained soil at the recommended spacing.",
      },
      {
        name: "Gypsum Application",
        dates: "20 Jul - 05 Aug",
        status: "upcoming",
        advice: "Apply gypsum near the plant row at flowering.",
      },
      {
        name: "Interculture",
        dates: "25 Jul - 10 Aug",
        status: "upcoming",
        advice: "Control weeds before pegging starts.",
      },
      {
        name: "Pod Development",
        dates: "20 Aug - 20 Sep",
        status: "upcoming",
        advice: "Maintain moisture while avoiding waterlogging.",
      },
      {
        name: "Harvesting",
        dates: "25 Sep - 20 Oct",
        status: "upcoming",
        advice: "Lift plants when inner shells show dark markings.",
      },
    ],
  },
};

export function isCropId(value: string | undefined): value is CropId {
  return Boolean(value && value in cropPlans);
}

const cropPlannerTextHindi: Readonly<Record<string, string>> = {
  "Morija, Chomu, Jaipur, Rajasthan": "मोरीजा, चौमूं, जयपुर, राजस्थान",
  "Govindgarh, Chomu, Jaipur, Rajasthan": "गोविंदगढ़, चौमूं, जयपुर, राजस्थान",
  "Kaladera, Chomu, Jaipur, Rajasthan": "कालाडेरा, चौमूं, जयपुर, राजस्थान",
  "Kharif 2026": "खरीफ 2026",
  "Rabi 2026-27": "रबी 2026-27",
  "Zaid 2027": "ज़ायद 2027",
  "Paddy (Dhan)": "धान",
  "Pearl Millet (Bajra)": "बाजरा",
  "Maize (Makka)": "मक्का",
  "Groundnut (Moongfali)": "मूंगफली",
  Transplanting: "रोपाई",
  Sowing: "बुवाई",
  "Land Preparation": "खेत की तैयारी",
  "Nursery Preparation": "नर्सरी की तैयारी",
  "Basal Fertilizer": "आधार उर्वरक",
  "Top Dressing (1st)": "ऊपरी उर्वरक (पहला)",
  Flowering: "फूल आना",
  Harvesting: "कटाई",
  "Seed Treatment": "बीज उपचार",
  "Gap Filling & Thinning": "रिक्त स्थान भरना और छंटाई",
  "Top Dressing": "ऊपरी उर्वरक",
  "Earhead Formation": "बालियों का बनना",
  "First Weeding": "पहली निराई",
  Tasseling: "मंजरी निकलना",
  "Gypsum Application": "जिप्सम का प्रयोग",
  Interculture: "अंतर-खेती",
  "Pod Development": "फली का विकास",
  "01 May - 20 May": "01 मई - 20 मई",
  "15 May - 10 Jun": "15 मई - 10 जून",
  "15 Jun - 30 Jun": "15 जून - 30 जून",
  "01 Jul - 10 Jul": "01 जुलाई - 10 जुलाई",
  "15 Jul - 25 Jul": "15 जुलाई - 25 जुलाई",
  "20 Sep - 05 Oct": "20 सितंबर - 05 अक्टूबर",
  "20 Oct - 10 Nov": "20 अक्टूबर - 10 नवंबर",
  "01 Jun - 20 Jun": "01 जून - 20 जून",
  "20 Jun - 25 Jun": "20 जून - 25 जून",
  "25 Jun - 10 Jul": "25 जून - 10 जुलाई",
  "10 Jul - 20 Jul": "10 जुलाई - 20 जुलाई",
  "20 Jul - 05 Aug": "20 जुलाई - 05 अगस्त",
  "25 Aug - 15 Sep": "25 अगस्त - 15 सितंबर",
  "20 Sep - 10 Oct": "20 सितंबर - 10 अक्टूबर",
  "01 Jun - 15 Jun": "01 जून - 15 जून",
  "15 Jun - 20 Jun": "15 जून - 20 जून",
  "20 Jun - 05 Jul": "20 जून - 05 जुलाई",
  "30 Jul - 10 Aug": "30 जुलाई - 10 अगस्त",
  "25 Aug - 10 Sep": "25 अगस्त - 10 सितंबर",
  "25 Sep - 15 Oct": "25 सितंबर - 15 अक्टूबर",
  "25 Jul - 10 Aug": "25 जुलाई - 10 अगस्त",
  "20 Aug - 20 Sep": "20 अगस्त - 20 सितंबर",
  "25 Sep - 20 Oct": "25 सितंबर - 20 अक्टूबर",
  "Timely transplanting ensures good tillering and better yield. Maintain a water level of 2-3 cm.":
    "समय पर रोपाई से अच्छी कल्ले निकलती हैं और उपज बेहतर होती है। पानी का स्तर 2-3 सेमी रखें।",
  "25 kg Urea / Acre": "25 किग्रा यूरिया / एकड़",
  "Level the field and prepare well-puddled soil.":
    "खेत को समतल करें और अच्छी तरह मचाई हुई मिट्टी तैयार करें।",
  "Use healthy, treated seed in a raised nursery bed.":
    "ऊंची नर्सरी क्यारी में स्वस्थ, उपचारित बीज का उपयोग करें।",
  "Apply the recommended basal dose evenly after soil testing.":
    "मिट्टी की जांच के बाद सुझाई गई आधार मात्रा समान रूप से डालें।",
  "Apply nitrogen when the crop starts active tillering.":
    "फसल में सक्रिय कल्ले निकलने पर नाइट्रोजन डालें।",
  "Avoid moisture stress and monitor leaf folder activity.":
    "नमी की कमी से बचाएं और पत्ती लपेटक की निगरानी करें।",
  "Harvest when 80-85% of grains turn golden yellow.":
    "80-85% दाने सुनहरे पीले होने पर कटाई करें।",
  "Sow in rows after effective monsoon rainfall and keep a uniform plant population.":
    "पर्याप्त मानसूनी वर्षा के बाद कतारों में बुवाई करें और पौधों की संख्या समान रखें।",
  "Maintain 10-12 cm plant spacing": "पौधों के बीच 10-12 सेमी दूरी रखें",
  "Use one deep ploughing followed by two harrowings.":
    "एक गहरी जुताई के बाद दो बार हैरो चलाएं।",
  "Treat certified seed before sowing.":
    "बुवाई से पहले प्रमाणित बीज का उपचार करें।",
  "Thin crowded seedlings and fill gaps within two weeks.":
    "घने पौधों की छंटाई करें और दो सप्ताह में रिक्त स्थान भरें।",
  "Apply nitrogen when adequate soil moisture is available.":
    "मिट्टी में पर्याप्त नमी होने पर नाइट्रोजन डालें।",
  "Monitor downy mildew and maintain field sanitation.":
    "मृदुरोमिल आसिता की निगरानी करें और खेत साफ रखें।",
  "Harvest mature earheads before grain shedding starts.":
    "दाने झड़ने से पहले पकी बालियों की कटाई करें।",
  "Place seed at uniform depth in moist soil and maintain proper row spacing.":
    "नम मिट्टी में बीज समान गहराई पर डालें और कतारों की उचित दूरी रखें।",
  "Complete 20-25 days after sowing": "बुवाई के 20-25 दिन बाद पूरा करें",
  "Prepare a fine seedbed with good drainage.":
    "अच्छी जल निकासी वाली महीन बीज शैया तैयार करें।",
  "Use treated hybrid seed suitable for Rajasthan.":
    "राजस्थान के लिए उपयुक्त उपचारित संकर बीज का उपयोग करें।",
  "Remove weeds before they compete with the young crop.":
    "खरपतवारों को नई फसल से प्रतिस्पर्धा करने से पहले हटाएं।",
  "Side-dress nitrogen and irrigate lightly if required.":
    "नाइट्रोजन किनारे से डालें और जरूरत हो तो हल्की सिंचाई करें।",
  "Prevent moisture stress during tasseling and silking.":
    "मंजरी और रेशे निकलने के समय नमी की कमी न होने दें।",
  "Harvest when husks dry and grains become firm.":
    "भुट्टे का आवरण सूखने और दाने सख्त होने पर कटाई करें।",
  "Sow treated kernels in moist, well-drained soil at the recommended spacing.":
    "उपचारित दानों को नम, अच्छी जल निकासी वाली मिट्टी में सुझाई गई दूरी पर बोएं।",
  "Apply at flowering as advised": "सलाह के अनुसार फूल आने पर डालें",
  "Prepare loose soil with good drainage.":
    "अच्छी जल निकासी वाली भुरभुरी मिट्टी तैयार करें।",
  "Treat kernels with recommended fungicide and culture.":
    "दाने को सुझाए गए फफूंदनाशक और कल्चर से उपचारित करें।",
  "Apply gypsum near the plant row at flowering.":
    "फूल आने पर पौधों की कतार के पास जिप्सम डालें।",
  "Control weeds before pegging starts.":
    "पेगिंग शुरू होने से पहले खरपतवार नियंत्रित करें।",
  "Maintain moisture while avoiding waterlogging.":
    "जलभराव से बचते हुए नमी बनाए रखें।",
  "Lift plants when inner shells show dark markings.":
    "फलियों के अंदर गहरे निशान दिखने पर पौधे उखाड़ें।",
};

export function translateCropPlannerText(t: Translator, value: string): string {
  return t(value, cropPlannerTextHindi[value] ?? value);
}
import type { Translator } from "@/i18n/localized-text";
