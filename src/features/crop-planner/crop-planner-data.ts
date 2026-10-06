export type CropId = "paddy" | "arhar" | "maize" | "moong";

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
  "Amhara, Bihta, Patna, Bihar",
  "Danapur, Patna, Bihar",
  "Nalanda, Bihar",
  "Muzaffarpur, Bihar",
] as const;

export const seasons = ["Kharif 2026", "Rabi 2026-27", "Zaid 2027"] as const;

export const cropPlans: Record<CropId, CropPlan> = {
  paddy: {
    id: "paddy",
    name: "Paddy (Dhan)",
    variety: "Rajendra Mahsuri",
    image: "/images/authenticated/farms/paddy-field.jpg",
    stageName: "Transplanting",
    stageAdvice:
      "Timely transplanting ensures good tillering and better yield. Maintain a water level of 2-3 cm.",
    nextActivity: "Basal Fertilizer",
    recommendation: "Use soil test guidance for nutrients",
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
  arhar: {
    id: "arhar",
    name: "Pigeon Pea (Arhar)",
    variety: "Bahar",
    image: "/images/authenticated/farms/chickpea-field.jpg",
    stageName: "Sowing",
    stageAdvice:
      "Sow in well-drained soil after the monsoon begins; leave space for branching.",
    nextActivity: "First Weeding",
    recommendation: "Weed early and avoid waterlogging",
    stages: [
      {
        name: "Land Preparation",
        dates: "01 Jun - 20 Jun",
        status: "completed",
        advice: "Prepare a well-drained seedbed before the monsoon.",
      },
      {
        name: "Seed Treatment",
        dates: "20 Jun - 25 Jun",
        status: "completed",
        advice: "Treat seed and use locally suitable varieties.",
      },
      {
        name: "Sowing",
        dates: "25 Jun - 10 Jul",
        status: "current",
        advice:
          "Sow in well-drained soil after the monsoon begins; leave space for branching.",
      },
      {
        name: "First Weeding",
        dates: "10 Jul - 20 Jul",
        status: "upcoming",
        advice: "Remove weeds while plants are young.",
      },
      {
        name: "Drainage Check",
        dates: "20 Jul - 05 Aug",
        status: "upcoming",
        advice: "Keep drainage channels clear during heavy rain.",
      },
      {
        name: "Flowering",
        dates: "01 Nov - 30 Nov",
        status: "upcoming",
        advice: "Monitor pod borers and follow local advisory guidance.",
      },
      {
        name: "Harvesting",
        dates: "15 Jan - 15 Feb",
        status: "upcoming",
        advice: "Harvest when most pods are dry.",
      },
    ],
  },
  maize: {
    id: "maize",
    name: "Maize (Makka)",
    variety: "Shaktiman-5",
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
        advice:
          "Use treated seed suited to local rainfall and soil conditions.",
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
  moong: {
    id: "moong",
    name: "Green Gram (Moong)",
    variety: "Samrat",
    image: "/images/authenticated/farms/chickpea-field.jpg",
    stageName: "Sowing",
    stageAdvice:
      "Sow treated seed in well-drained soil after the monsoon begins.",
    nextActivity: "First Weeding",
    recommendation: "Remove weeds before flowering",
    stages: [
      {
        name: "Land Preparation",
        dates: "01 Jun - 15 Jun",
        status: "completed",
        advice: "Prepare a well-drained seedbed.",
      },
      {
        name: "Seed Treatment",
        dates: "15 Jun - 20 Jun",
        status: "completed",
        advice: "Treat seed with locally recommended Rhizobium culture.",
      },
      {
        name: "Sowing",
        dates: "20 Jun - 05 Jul",
        status: "current",
        advice:
          "Sow treated seed in well-drained soil after the monsoon begins.",
      },
      {
        name: "First Weeding",
        dates: "20 Jul - 05 Aug",
        status: "upcoming",
        advice: "Remove weeds while seedlings are young.",
      },
      {
        name: "Flowering",
        dates: "25 Jul - 10 Aug",
        status: "upcoming",
        advice: "Watch for pests and avoid standing water.",
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
        advice: "Pick mature pods in several rounds to reduce losses.",
      },
    ],
  },
};

export function isCropId(value: string | undefined): value is CropId {
  return Boolean(value && value in cropPlans);
}

const cropPlannerTextHindi: Readonly<Record<string, string>> = {
  "Amhara, Bihta, Patna, Bihar": "अमहरा, बिहटा, पटना, बिहार",
  "Danapur, Patna, Bihar": "दानापुर, पटना, बिहार",
  "Nalanda, Bihar": "नालंदा, बिहार",
  "Muzaffarpur, Bihar": "मुजफ्फरपुर, बिहार",
  "Kharif 2026": "खरीफ 2026",
  "Rabi 2026-27": "रबी 2026-27",
  "Zaid 2027": "ज़ायद 2027",
  "Paddy (Dhan)": "धान",
  "Pigeon Pea (Arhar)": "अरहर",
  "Maize (Makka)": "मक्का",
  "Green Gram (Moong)": "मूंग",
  Transplanting: "रोपाई",
  Sowing: "बुवाई",
  "Land Preparation": "खेत की तैयारी",
  "Nursery Preparation": "नर्सरी की तैयारी",
  "Basal Fertilizer": "आधार उर्वरक",
  "Top Dressing (1st)": "ऊपरी उर्वरक (पहला)",
  Flowering: "फूल आना",
  Harvesting: "कटाई",
  "Seed Treatment": "बीज उपचार",
  "Drainage Check": "जल निकासी की जांच",
  "First Weeding": "पहली निराई",
  Tasseling: "मंजरी निकलना",
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
  "01 Nov - 30 Nov": "01 नवंबर - 30 नवंबर",
  "15 Jan - 15 Feb": "15 जनवरी - 15 फ़रवरी",
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
  "Use soil test guidance for nutrients":
    "पोषक तत्वों के लिए मिट्टी जांच के अनुसार सलाह लें",
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
  "Sow in well-drained soil after the monsoon begins; leave space for branching.":
    "मानसून शुरू होने पर अच्छी जल निकासी वाली मिट्टी में बुवाई करें और शाखाओं के लिए जगह रखें।",
  "Weed early and avoid waterlogging": "जल्दी निराई करें और जलभराव से बचें",
  "Prepare a well-drained seedbed before the monsoon.":
    "मानसून से पहले अच्छी जल निकासी वाली बीज शैया तैयार करें।",
  "Treat seed and use locally suitable varieties.":
    "बीज उपचार करें और स्थानीय परिस्थितियों के अनुकूल किस्में लें।",
  "Remove weeds while plants are young.": "पौधे छोटे हों तभी खरपतवार हटाएं।",
  "Keep drainage channels clear during heavy rain.":
    "तेज बारिश में जल निकासी की नालियां साफ रखें।",
  "Monitor pod borers and follow local advisory guidance.":
    "फली छेदक की निगरानी करें और स्थानीय सलाह का पालन करें।",
  "Harvest when most pods are dry.": "अधिकांश फलियां सूख जाने पर कटाई करें।",
  "Place seed at uniform depth in moist soil and maintain proper row spacing.":
    "नम मिट्टी में बीज समान गहराई पर डालें और कतारों की उचित दूरी रखें।",
  "Complete 20-25 days after sowing": "बुवाई के 20-25 दिन बाद पूरा करें",
  "Prepare a fine seedbed with good drainage.":
    "अच्छी जल निकासी वाली महीन बीज शैया तैयार करें।",
  "Use treated seed suited to local rainfall and soil conditions.":
    "स्थानीय वर्षा और मिट्टी के अनुकूल उपचारित बीज का उपयोग करें।",
  "Remove weeds before they compete with the young crop.":
    "खरपतवारों को नई फसल से प्रतिस्पर्धा करने से पहले हटाएं।",
  "Side-dress nitrogen and irrigate lightly if required.":
    "नाइट्रोजन किनारे से डालें और जरूरत हो तो हल्की सिंचाई करें।",
  "Prevent moisture stress during tasseling and silking.":
    "मंजरी और रेशे निकलने के समय नमी की कमी न होने दें।",
  "Harvest when husks dry and grains become firm.":
    "भुट्टे का आवरण सूखने और दाने सख्त होने पर कटाई करें।",
  "Sow treated seed in well-drained soil after the monsoon begins.":
    "मानसून शुरू होने पर उपचारित बीज अच्छी जल निकासी वाली मिट्टी में बोएं।",
  "Remove weeds before flowering": "फूल आने से पहले खरपतवार हटाएं",
  "Prepare a well-drained seedbed.":
    "अच्छी जल निकासी वाली बीज शैया तैयार करें।",
  "Treat seed with locally recommended Rhizobium culture.":
    "स्थानीय सलाह के अनुसार राइजोबियम कल्चर से बीज उपचार करें।",
  "Remove weeds while seedlings are young.":
    "अंकुर छोटे हों तभी खरपतवार हटाएं।",
  "Watch for pests and avoid standing water.":
    "कीटों पर नजर रखें और पानी जमा न होने दें।",
  "Maintain moisture while avoiding waterlogging.":
    "जलभराव से बचते हुए नमी बनाए रखें।",
  "Pick mature pods in several rounds to reduce losses.":
    "नुकसान कम करने के लिए पकी फलियां कई बार में तोड़ें।",
};

export function translateCropPlannerText(t: Translator, value: string): string {
  return t(value, cropPlannerTextHindi[value] ?? value);
}
import type { Translator } from "@/i18n/localized-text";
