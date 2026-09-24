import { localized } from "@/i18n/localized-text";

const soilHindi: Record<string, string> = {
  "pH (Soil Reaction)": "pH (मिट्टी की प्रतिक्रिया)",
  "EC (Electrical Conductivity)": "EC (विद्युत चालकता)",
  "Nitrogen (Available)": "नाइट्रोजन (उपलब्ध)",
  "Phosphorus (Available)": "फॉस्फोरस (उपलब्ध)",
  "Potassium (Available)": "पोटैशियम (उपलब्ध)",
  Sulphur: "सल्फर",
  Zinc: "जिंक",
  Iron: "आयरन",
  "Organic Carbon": "जैविक कार्बन",
  "Apply balanced nitrogen as per crop requirement.":
    "फसल की आवश्यकता के अनुसार संतुलित नाइट्रोजन दें।",
  "Maintain phosphorus levels with DAP / SSP.":
    "DAP / SSP से फॉस्फोरस स्तर बनाए रखें।",
  "Improve organic carbon by adding FYM / compost.":
    "FYM / कम्पोस्ट डालकर जैविक कार्बन सुधारें।",
  "Apply zinc sulphate to correct zinc deficiency.":
    "जिंक की कमी सुधारने के लिए जिंक सल्फेट डालें।",
  "1 application": "1 बार प्रयोग",
  "Once in a season": "मौसम में एक बार",
};
export const soilText = (value: string) =>
  localized(value, soilHindi[value] ?? value);

export type SoilStatus = "normal" | "low" | "medium" | "high" | "sufficient";

export type SoilParameter = {
  symbol: string;
  tone: "blue" | "green" | "orange" | "purple" | "teal";
  parameter: string;
  result: string;
  unit: string;
  status: SoilStatus;
  recommendedRange: string;
};

export const soilParameters: readonly SoilParameter[] = [
  {
    symbol: "pH",
    tone: "blue",
    parameter: "pH (Soil Reaction)",
    result: "7.6",
    unit: "–",
    status: "normal",
    recommendedRange: "6.5 – 7.5",
  },
  {
    symbol: "EC",
    tone: "blue",
    parameter: "EC (Electrical Conductivity)",
    result: "0.42",
    unit: "dS/m",
    status: "normal",
    recommendedRange: "< 1.0",
  },
  {
    symbol: "N",
    tone: "green",
    parameter: "Nitrogen (Available)",
    result: "248",
    unit: "kg/ha",
    status: "low",
    recommendedRange: "> 280",
  },
  {
    symbol: "P",
    tone: "orange",
    parameter: "Phosphorus (Available)",
    result: "18",
    unit: "kg/ha",
    status: "medium",
    recommendedRange: "16 – 30",
  },
  {
    symbol: "K",
    tone: "purple",
    parameter: "Potassium (Available)",
    result: "312",
    unit: "kg/ha",
    status: "high",
    recommendedRange: "> 250",
  },
  {
    symbol: "S",
    tone: "blue",
    parameter: "Sulphur",
    result: "14",
    unit: "ppm",
    status: "medium",
    recommendedRange: "10 – 20",
  },
  {
    symbol: "Zn",
    tone: "teal",
    parameter: "Zinc",
    result: "0.65",
    unit: "ppm",
    status: "low",
    recommendedRange: "> 0.7",
  },
  {
    symbol: "Fe",
    tone: "blue",
    parameter: "Iron",
    result: "4.8",
    unit: "ppm",
    status: "sufficient",
    recommendedRange: "> 4.5",
  },
  {
    symbol: "OC",
    tone: "purple",
    parameter: "Organic Carbon",
    result: "0.62",
    unit: "%",
    status: "low",
    recommendedRange: "> 0.75",
  },
] as const;

export const keyRecommendations = [
  {
    symbol: "N",
    tone: "green",
    text: "Apply balanced nitrogen as per crop requirement.",
  },
  {
    symbol: "P",
    tone: "orange",
    text: "Maintain phosphorus levels with DAP / SSP.",
  },
  {
    symbol: "OC",
    tone: "purple",
    text: "Improve organic carbon by adding FYM / compost.",
  },
  {
    symbol: "Zn",
    tone: "teal",
    text: "Apply zinc sulphate to correct zinc deficiency.",
  },
] as const;

export const nutrientRecommendations = [
  {
    formula: "N",
    tone: "green",
    amount: "120 – 140",
    unit: "kg/ha",
    note: "Urea: 260 – 300 kg/ha",
  },
  {
    formula: "P₂O₅",
    tone: "orange",
    amount: "50 – 60",
    unit: "kg/ha",
    note: "DAP: 110 – 130 kg/ha",
  },
  {
    formula: "K₂O",
    tone: "purple",
    amount: "40 – 50",
    unit: "kg/ha",
    note: "MOP: 65 – 80 kg/ha",
  },
  {
    formula: "ZnSO₄",
    tone: "teal",
    amount: "25",
    unit: "kg/ha",
    note: "1 application",
  },
  {
    formula: "FYM",
    tone: "brown",
    amount: "5 – 10",
    unit: "tonnes/ha",
    note: "Once in a season",
  },
] as const;
