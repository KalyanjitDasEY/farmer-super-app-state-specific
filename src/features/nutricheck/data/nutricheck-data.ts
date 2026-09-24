import { localized } from "@/i18n/localized-text";

const nutriHindi: Record<string, string> = {
  Nitrogen: "नाइट्रोजन",
  Phosphorus: "फॉस्फोरस",
  Potassium: "पोटैशियम",
  Sulphur: "सल्फर",
  Zinc: "जिंक",
  Iron: "आयरन",
  "Nitrogen Deficiency": "नाइट्रोजन की कमी",
  "Phosphorus Deficiency": "फॉस्फोरस की कमी",
  "Potassium Deficiency": "पोटैशियम की कमी",
  "Zinc Deficiency": "जिंक की कमी",
  "Iron Deficiency": "आयरन की कमी",
  "Yellowing of older leaves, stunted growth, poor tillering":
    "पुरानी पत्तियों का पीलापन, कम वृद्धि और कम कल्ले",
  "Purplish leaves, slow growth, poor root development":
    "बैंगनी पत्तियां, धीमी वृद्धि और जड़ों का कम विकास",
  "Yellowing and scorching of leaf margins, weak stems":
    "पत्ती किनारों का पीला और झुलसना, कमजोर तने",
  "Yellow stripes between veins on younger leaves":
    "नई पत्तियों में शिराओं के बीच पीली धारियां",
  "Yellowing between veins of younger leaves":
    "नई पत्तियों में शिराओं के बीच पीलापन",
  High: "अधिक",
  Medium: "मध्यम",
  "Older Leaves": "पुरानी पत्तियां",
  "Leaves, Roots": "पत्तियां, जड़ें",
  "Leaf Margins, Tips": "पत्ती किनारे और सिरे",
  "Younger Leaves": "नई पत्तियां",
  "Deficiency Guide": "कमी मार्गदर्शिका",
  Recommendation: "सिफारिश",
  Reference: "संदर्भ",
  "Nitrogen Deficiency in Paddy (Dhan)": "धान में नाइट्रोजन की कमी",
  "Symptoms, causes and correction measures": "लक्षण, कारण और सुधार उपाय",
  "Nutrient Recommendation – Urea Top Dress": "पोषक सिफारिश – यूरिया टॉप ड्रेस",
  "Based on LCC value 2.6 (Optimal)": "LCC मान 2.6 (उचित) पर आधारित",
  "Phosphorus Deficiency in Paddy (Dhan)": "धान में फॉस्फोरस की कमी",
  "Purple leaves, poor root development": "बैंगनी पत्तियां, जड़ों का कम विकास",
  "Balanced Nutrition for Paddy (Dhan)": "धान के लिए संतुलित पोषण",
  "Complete nutrient management guide": "संपूर्ण पोषक प्रबंधन मार्गदर्शिका",
  "Potassium Deficiency in Paddy (Dhan)": "धान में पोटैशियम की कमी",
  "Yellowing and scorching at leaf margins": "पत्ती किनारों का पीला और झुलसना",
  "Paddy – Nutrient Schedule": "धान – पोषक कार्यक्रम",
  "Crop-stage-wise nutrient management plan":
    "फसल अवस्था के अनुसार पोषक प्रबंधन योजना",
  "Urea 25 kg/acre": "यूरिया 25 किग्रा/एकड़",
  "20 May 2024": "20 मई 2024",
  "18 May 2024": "18 मई 2024",
  "15 May 2024": "15 मई 2024",
  "12 May 2024": "12 मई 2024",
  "10 May 2024": "10 मई 2024",
};

export const nutriText = (value: string) =>
  localized(value, nutriHindi[value] ?? value);

export type NutrientTone =
  "nitrogen" | "phosphorus" | "potassium" | "sulphur" | "zinc" | "iron";

export interface Nutrient {
  symbol: string;
  name: string;
  problems: number;
  tone: NutrientTone;
}

export interface Deficiency {
  symbol: string;
  title: string;
  description: string;
  severity: "High" | "Medium";
  affectedPart: string;
  image: string;
  tone: NutrientTone;
}

export const nutrients: readonly Nutrient[] = [
  { symbol: "N", name: "Nitrogen", problems: 12, tone: "nitrogen" },
  { symbol: "P", name: "Phosphorus", problems: 10, tone: "phosphorus" },
  { symbol: "K", name: "Potassium", problems: 10, tone: "potassium" },
  { symbol: "S", name: "Sulphur", problems: 8, tone: "sulphur" },
  { symbol: "Zn", name: "Zinc", problems: 9, tone: "zinc" },
  { symbol: "Fe", name: "Iron", problems: 7, tone: "iron" },
] as const;

export const deficiencies: readonly Deficiency[] = [
  {
    symbol: "N",
    title: "Nitrogen Deficiency",
    description: "Yellowing of older leaves, stunted growth, poor tillering",
    severity: "High",
    affectedPart: "Older Leaves",
    image: "/images/authenticated/nutricheck/nitrogen.jpg",
    tone: "nitrogen",
  },
  {
    symbol: "P",
    title: "Phosphorus Deficiency",
    description: "Purplish leaves, slow growth, poor root development",
    severity: "Medium",
    affectedPart: "Leaves, Roots",
    image: "/images/authenticated/nutricheck/phosphorus.jpg",
    tone: "phosphorus",
  },
  {
    symbol: "K",
    title: "Potassium Deficiency",
    description: "Yellowing and scorching of leaf margins, weak stems",
    severity: "Medium",
    affectedPart: "Leaf Margins, Tips",
    image: "/images/authenticated/nutricheck/potassium.jpg",
    tone: "potassium",
  },
  {
    symbol: "Zn",
    title: "Zinc Deficiency",
    description: "Yellow stripes between veins on younger leaves",
    severity: "Medium",
    affectedPart: "Younger Leaves",
    image: "/images/authenticated/nutricheck/zinc.jpg",
    tone: "zinc",
  },
  {
    symbol: "Fe",
    title: "Iron Deficiency",
    description: "Yellowing between veins of younger leaves",
    severity: "High",
    affectedPart: "Younger Leaves",
    image: "/images/authenticated/nutricheck/nitrogen.jpg",
    tone: "iron",
  },
] as const;

export const savedItems = [
  {
    title: "Nitrogen Deficiency in Paddy (Dhan)",
    description: "Symptoms, causes and correction measures",
    type: "Deficiency Guide",
    date: "20 May 2024",
    image: "/images/authenticated/nutricheck/nitrogen.jpg",
    nutrient: "Nitrogen",
    tone: "nitrogen" as const,
  },
  {
    title: "Nutrient Recommendation – Urea Top Dress",
    description: "Based on LCC value 2.6 (Optimal)",
    type: "Recommendation",
    date: "20 May 2024",
    image: "/images/authenticated/nutricheck/healthy-leaf-check.jpg",
    nutrient: "Urea 25 kg/acre",
    tone: "nitrogen" as const,
  },
  {
    title: "Phosphorus Deficiency in Paddy (Dhan)",
    description: "Purple leaves, poor root development",
    type: "Deficiency Guide",
    date: "18 May 2024",
    image: "/images/authenticated/nutricheck/phosphorus.jpg",
    nutrient: "Phosphorus",
    tone: "phosphorus" as const,
  },
  {
    title: "Balanced Nutrition for Paddy (Dhan)",
    description: "Complete nutrient management guide",
    type: "Reference",
    date: "15 May 2024",
    image: "/images/authenticated/nutricheck/nitrogen-bag.jpg",
    nutrient: "N · P · K",
    tone: "potassium" as const,
  },
  {
    title: "Potassium Deficiency in Paddy (Dhan)",
    description: "Yellowing and scorching at leaf margins",
    type: "Deficiency Guide",
    date: "12 May 2024",
    image: "/images/authenticated/nutricheck/potassium.jpg",
    nutrient: "Potassium",
    tone: "potassium" as const,
  },
  {
    title: "Paddy – Nutrient Schedule",
    description: "Crop-stage-wise nutrient management plan",
    type: "Recommendation",
    date: "10 May 2024",
    image: "/images/authenticated/dashboard-paddy.jpg",
    nutrient: "N · P · K · Zn",
    tone: "zinc" as const,
  },
] as const;
