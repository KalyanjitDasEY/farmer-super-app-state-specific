import { localized } from "@/i18n/localized-text";

const leafHindi: Record<string, string> = {
  "Light Green": "हल्का हरा",
  Green: "हरा",
  "Dark Green": "गहरा हरा",
  "Very Dark Green": "बहुत गहरा हरा",
  "Deep Green": "घना हरा",
  High: "अधिक",
  Medium: "मध्यम",
  Low: "कम",
  Optimal: "उचित",
  Sunny: "धूप",
  Cloudy: "बादल",
  "Partly Cloudy": "आंशिक बादल",
  Yellow: "पीला",
  "No Top Dress": "टॉप ड्रेस नहीं",
  Maintain: "बनाए रखें",
  Urea: "यूरिया",
  "Skip Nitrogen": "नाइट्रोजन न दें",
  "Check Irrigation": "सिंचाई जांचें",
  "28 May 2024": "28 मई 2024",
  "24 May 2024": "24 मई 2024",
  "20 May 2024": "20 मई 2024",
  "17 May 2024": "17 मई 2024",
  "12 May 2024": "12 मई 2024",
  "07 May 2024": "07 मई 2024",
  "10:31 AM": "10:31 पूर्वाह्न",
  "09:15 AM": "09:15 पूर्वाह्न",
  "08:40 AM": "08:40 पूर्वाह्न",
  "09:05 AM": "09:05 पूर्वाह्न",
  "08:30 AM": "08:30 पूर्वाह्न",
  "08:20 AM": "08:20 पूर्वाह्न",
  "04 Jun 2024": "04 जून 2024",
  "31 May 2024": "31 मई 2024",
  "27 May 2024": "27 मई 2024",
  "19 May 2024": "19 मई 2024",
  "14 May 2024": "14 मई 2024",
};

export const leafText = (value: string) =>
  localized(value, leafHindi[value] ?? value);

export const leafColourScale = [
  { value: 4, label: "Light Green", status: "High", color: "#a9c83d" },
  { value: 3, label: "Green", status: "", color: "#78a916" },
  { value: 2, label: "Dark Green", status: "Medium", color: "#5f8e0c" },
  { value: 1, label: "Very Dark Green", status: "", color: "#2e6f13" },
  { value: 0, label: "Deep Green", status: "Low", color: "#075326" },
] as const;

export const capturedReadings = [
  2.3, 2.6, 3.1, 2.8, 3.0, 2.7, 2.4, 2.9, 2.1, 3.4,
] as const;

export type HistoryReading = {
  date: string;
  time: string;
  weather: string;
  value: number;
  status: "Optimal" | "Low" | "High";
  colour: string;
  reassessment: string;
  action: string;
  dose: string;
};

export const historyReadings: readonly HistoryReading[] = [
  {
    date: "28 May 2024",
    time: "10:31 AM",
    weather: "Sunny",
    value: 2.8,
    status: "Optimal",
    colour: "Green",
    reassessment: "04 Jun 2024",
    action: "No Top Dress",
    dose: "Maintain",
  },
  {
    date: "24 May 2024",
    time: "09:15 AM",
    weather: "Sunny",
    value: 2.1,
    status: "Low",
    colour: "Yellow",
    reassessment: "31 May 2024",
    action: "Urea",
    dose: "25 kg/acre",
  },
  {
    date: "20 May 2024",
    time: "08:40 AM",
    weather: "Partly Cloudy",
    value: 2.6,
    status: "Optimal",
    colour: "Green",
    reassessment: "27 May 2024",
    action: "No Top Dress",
    dose: "Maintain",
  },
  {
    date: "17 May 2024",
    time: "09:05 AM",
    weather: "Sunny",
    value: 4.4,
    status: "High",
    colour: "Dark Green",
    reassessment: "24 May 2024",
    action: "Skip Nitrogen",
    dose: "Check Irrigation",
  },
  {
    date: "12 May 2024",
    time: "08:30 AM",
    weather: "Cloudy",
    value: 2.3,
    status: "Low",
    colour: "Yellow",
    reassessment: "19 May 2024",
    action: "Urea",
    dose: "25 kg/acre",
  },
  {
    date: "07 May 2024",
    time: "08:20 AM",
    weather: "Sunny",
    value: 2.9,
    status: "Optimal",
    colour: "Green",
    reassessment: "14 May 2024",
    action: "No Top Dress",
    dose: "Maintain",
  },
] as const;

export const recentAssessments = historyReadings.slice(0, 3);
