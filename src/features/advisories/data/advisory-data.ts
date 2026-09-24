import type { LucideIcon } from "lucide-react";
import {
  Bug,
  CloudRain,
  CloudSun,
  Droplets,
  FlaskConical,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Tractor,
  TrendingUp,
  Wheat,
} from "lucide-react";
import { localized } from "@/i18n/localized-text";

const advisoryHindi: Record<string, string> = {
  "Leaf Blast Risk Increasing": "पत्ती झुलसा का जोखिम बढ़ रहा है",
  "High Priority": "उच्च प्राथमिकता",
  "Warm and humid conditions with forecasted rain may increase Leaf Blast risk in your paddy.":
    "गर्म और नम मौसम तथा संभावित बारिश आपके धान में पत्ती झुलसा का जोखिम बढ़ा सकती है।",
  "Paddy (Dhan)": "धान",
  "Tillering Stage": "कल्ले निकलने की अवस्था",
  "Field 1": "खेत 1",
  "Recommended Action": "अनुशंसित कार्रवाई",
  "Apply recommended fungicide within next 24 hours.":
    "अगले 24 घंटों में अनुशंसित फफूंदनाशक लगाएं।",
  "View Details": "विवरण देखें",
  "Nitrogen Top Dressing Advisory": "नाइट्रोजन टॉप ड्रेसिंग सलाह",
  Priority: "प्राथमिकता",
  "High humidity may reduce nitrogen use efficiency. Apply top dressing at the right time.":
    "अधिक नमी नाइट्रोजन उपयोग दक्षता घटा सकती है। सही समय पर टॉप ड्रेसिंग करें।",
  "Apply 25 kg Urea per acre in split dose.":
    "25 किग्रा यूरिया प्रति एकड़ विभाजित खुराक में दें।",
  "Rainfall Expected Tomorrow": "कल बारिश की संभावना",
  Weather: "मौसम",
  "Light to moderate rain expected tomorrow evening.":
    "कल शाम हल्की से मध्यम बारिश की संभावना है।",
  "All Fields": "सभी खेत",
  "What to Do": "क्या करें",
  "Postpone pesticide spraying and harvesting operations.":
    "कीटनाशक छिड़काव और कटाई का काम स्थगित करें।",
  "Irrigation Advisory": "सिंचाई सलाह",
  "Crop Care": "फसल देखभाल",
  "Soil moisture is low in Field 2. Irrigate within next 2 days.":
    "खेत 2 में मिट्टी की नमी कम है। अगले 2 दिनों में सिंचाई करें।",
  "Field 2": "खेत 2",
  "Irrigate 4–5 cm water to maintain optimum moisture.":
    "उचित नमी बनाए रखने के लिए 4–5 सेमी पानी दें।",
  "Paddy Market Update": "धान बाजार अपडेट",
  Market: "बाजार",
  "Price for Pusa Basmati 1121 is higher in nearby mandis.":
    "पास की मंडियों में पूसा बासमती 1121 का भाव अधिक है।",
  "Market Insight": "बाजार जानकारी",
  "Consider selling in the next 3–5 days for better returns.":
    "बेहतर लाभ के लिए अगले 3–5 दिनों में बेचने पर विचार करें।",
  "View Market": "बाजार देखें",
  "Spray Window Available": "छिड़काव का समय उपलब्ध",
  "Operation Window": "कार्य समय",
  "Good window for pesticide spraying today from 7:00 AM – 11:00 AM.":
    "आज सुबह 7:00 से 11:00 बजे तक कीटनाशक छिड़काव के लिए अच्छा समय है।",
  "Wind speed and rainfall ideal for safe application.":
    "हवा की गति और बारिश सुरक्षित उपयोग के लिए अनुकूल हैं।",
  "View Window": "समय देखें",
  "Weather & Climate": "मौसम और जलवायु",
  "Weather updates and weather-based advice": "मौसम अपडेट और मौसम आधारित सलाह",
  Irrigation: "सिंचाई",
  "Irrigation planning and water management": "सिंचाई योजना और जल प्रबंधन",
  "Nutrient Management": "पोषक तत्व प्रबंधन",
  "Fertilizer, nutrient and soil health advice":
    "उर्वरक, पोषक तत्व और मिट्टी स्वास्थ्य सलाह",
  "Pest & Disease": "कीट और रोग",
  "Pest & disease alerts and management guidance":
    "कीट व रोग अलर्ट और प्रबंधन मार्गदर्शन",
  "Weed Management": "खरपतवार प्रबंधन",
  "Weed identification and control measures": "खरपतवार पहचान और नियंत्रण उपाय",
  "Plant Protection": "पौध संरक्षण",
  "Pesticide use, safety and application advice":
    "कीटनाशक उपयोग, सुरक्षा और प्रयोग सलाह",
  "Market & Prices": "बाजार और भाव",
  "Market trends, prices and selling opportunities":
    "बाजार रुझान, भाव और बिक्री अवसर",
  "Field Operations": "खेत के कार्य",
  "Best timing for spraying, harvesting and other tasks":
    "छिड़काव, कटाई और अन्य कार्यों का सही समय",
  "Sowing & Planting": "बुवाई और रोपाई",
  "Seed, sowing time and variety guidance":
    "बीज, बुवाई समय और किस्म मार्गदर्शन",
  "Post Harvest": "कटाई के बाद",
  "Harvesting, storage and post-harvest management":
    "कटाई, भंडारण और कटाई-पश्चात प्रबंधन",
  "Livestock Care": "पशुधन देखभाल",
  "Livestock health and management advice": "पशुधन स्वास्थ्य और प्रबंधन सलाह",
  "Advisories for crop health and management":
    "फसल स्वास्थ्य और प्रबंधन की सलाह",
  "20 May 2024, 08:30 AM": "20 मई 2024, 08:30 पूर्वाह्न",
  "20 May 2024, 07:15 AM": "20 मई 2024, 07:15 पूर्वाह्न",
  "20 May 2024, 06:45 AM": "20 मई 2024, 06:45 पूर्वाह्न",
  "19 May 2024, 06:30 PM": "19 मई 2024, 06:30 अपराह्न",
  "19 May 2024, 05:45 PM": "19 मई 2024, 05:45 अपराह्न",
  "19 May 2024, 05:15 PM": "19 मई 2024, 05:15 अपराह्न",
  "Deoria, Gorakhpur, Basti": "देवरिया, गोरखपुर, बस्ती",
};

export const advisoryText = (value: string) =>
  localized(value, advisoryHindi[value] ?? value);

export type AdvisoryTone =
  "red" | "orange" | "blue" | "green" | "purple" | "teal";

export interface AdvisoryItem {
  slug: string;
  title: string;
  label: string;
  description: string;
  date: string;
  scope: string[];
  actionLabel: string;
  action: string;
  buttonLabel: string;
  tone: AdvisoryTone;
  icon: LucideIcon;
}

export interface AdvisoryCategory {
  title: string;
  description: string;
  count: number;
  tone: AdvisoryTone;
  icon: LucideIcon;
}

export const advisoryFeed: readonly AdvisoryItem[] = [
  {
    slug: "leaf-blast",
    title: "Leaf Blast Risk Increasing",
    label: "High Priority",
    description:
      "Warm and humid conditions with forecasted rain may increase Leaf Blast risk in your paddy.",
    date: "20 May 2024, 08:30 AM",
    scope: ["Paddy (Dhan)", "Tillering Stage", "Field 1"],
    actionLabel: "Recommended Action",
    action: "Apply recommended fungicide within next 24 hours.",
    buttonLabel: "View Details",
    tone: "red",
    icon: Bug,
  },
  {
    slug: "nitrogen-top-dressing",
    title: "Nitrogen Top Dressing Advisory",
    label: "Priority",
    description:
      "High humidity may reduce nitrogen use efficiency. Apply top dressing at the right time.",
    date: "20 May 2024, 07:15 AM",
    scope: ["Paddy (Dhan)", "Tillering Stage", "Field 1"],
    actionLabel: "Recommended Action",
    action: "Apply 25 kg Urea per acre in split dose.",
    buttonLabel: "View Details",
    tone: "orange",
    icon: Leaf,
  },
  {
    slug: "rainfall-expected",
    title: "Rainfall Expected Tomorrow",
    label: "Weather",
    description: "Light to moderate rain expected tomorrow evening.",
    date: "20 May 2024, 06:45 AM",
    scope: ["All Fields"],
    actionLabel: "What to Do",
    action: "Postpone pesticide spraying and harvesting operations.",
    buttonLabel: "View Details",
    tone: "blue",
    icon: CloudRain,
  },
  {
    slug: "irrigation-advisory",
    title: "Irrigation Advisory",
    label: "Crop Care",
    description:
      "Soil moisture is low in Field 2. Irrigate within next 2 days.",
    date: "19 May 2024, 06:30 PM",
    scope: ["Field 2"],
    actionLabel: "Recommended Action",
    action: "Irrigate 4–5 cm water to maintain optimum moisture.",
    buttonLabel: "View Details",
    tone: "green",
    icon: Sprout,
  },
  {
    slug: "paddy-market-update",
    title: "Paddy Market Update",
    label: "Market",
    description: "Price for Pusa Basmati 1121 is higher in nearby mandis.",
    date: "19 May 2024, 05:45 PM",
    scope: ["Deoria, Gorakhpur, Basti"],
    actionLabel: "Market Insight",
    action: "Consider selling in the next 3–5 days for better returns.",
    buttonLabel: "View Market",
    tone: "purple",
    icon: TrendingUp,
  },
  {
    slug: "spray-window",
    title: "Spray Window Available",
    label: "Operation Window",
    description:
      "Good window for pesticide spraying today from 7:00 AM – 11:00 AM.",
    date: "19 May 2024, 05:15 PM",
    scope: ["Field 1"],
    actionLabel: "Operation Window",
    action: "Wind speed and rainfall ideal for safe application.",
    buttonLabel: "View Window",
    tone: "teal",
    icon: Tractor,
  },
] as const;

export const advisoryCategories: readonly AdvisoryCategory[] = [
  {
    title: "Crop Care",
    description: "Advisories for crop health and management",
    count: 24,
    tone: "green",
    icon: Leaf,
  },
  {
    title: "Weather & Climate",
    description: "Weather updates and weather-based advice",
    count: 18,
    tone: "orange",
    icon: CloudSun,
  },
  {
    title: "Irrigation",
    description: "Irrigation planning and water management",
    count: 12,
    tone: "blue",
    icon: Droplets,
  },
  {
    title: "Nutrient Management",
    description: "Fertilizer, nutrient and soil health advice",
    count: 16,
    tone: "orange",
    icon: PackageCheck,
  },
  {
    title: "Pest & Disease",
    description: "Pest & disease alerts and management guidance",
    count: 22,
    tone: "purple",
    icon: Bug,
  },
  {
    title: "Weed Management",
    description: "Weed identification and control measures",
    count: 8,
    tone: "green",
    icon: Sprout,
  },
  {
    title: "Plant Protection",
    description: "Pesticide use, safety and application advice",
    count: 15,
    tone: "blue",
    icon: FlaskConical,
  },
  {
    title: "Market & Prices",
    description: "Market trends, prices and selling opportunities",
    count: 10,
    tone: "red",
    icon: TrendingUp,
  },
  {
    title: "Field Operations",
    description: "Best timing for spraying, harvesting and other tasks",
    count: 14,
    tone: "teal",
    icon: Tractor,
  },
  {
    title: "Sowing & Planting",
    description: "Seed, sowing time and variety guidance",
    count: 9,
    tone: "green",
    icon: Sprout,
  },
  {
    title: "Post Harvest",
    description: "Harvesting, storage and post-harvest management",
    count: 7,
    tone: "orange",
    icon: Wheat,
  },
  {
    title: "Livestock Care",
    description: "Livestock health and management advice",
    count: 6,
    tone: "blue",
    icon: ShieldCheck,
  },
] as const;
