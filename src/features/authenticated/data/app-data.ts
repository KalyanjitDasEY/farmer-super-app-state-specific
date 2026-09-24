import type { LucideIcon } from "lucide-react";
import {
  Bug,
  CirclePlay,
  ClipboardCheck,
  CloudSun,
  HandCoins,
  Handshake,
  LayoutGrid,
  Leaf,
  Lightbulb,
  Microscope,
  ScanLine,
  Sprout,
  Store,
  Tractor,
  TrendingUp,
  Wheat,
} from "lucide-react";

import { localized, type LocalizedText } from "@/i18n/localized-text";

export interface AppService {
  id?: string;
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  icon: LucideIcon;
  tone: "green" | "blue" | "orange" | "purple" | "pink" | "teal";
  featured?: boolean;
  badge?: LocalizedText;
}

export const appServices: readonly AppService[] = [
  {
    title: localized("Crop Doctor", "फसल डॉक्टर"),
    description: localized(
      "Diagnose & get solutions",
      "समस्या पहचानें और समाधान पाएं",
    ),
    href: "/crop-doctor",
    icon: Microscope,
    tone: "green",
    featured: true,
  },
  {
    title: localized("Weather", "मौसम"),
    description: localized(
      "Live updates & forecast",
      "लाइव अपडेट और पूर्वानुमान",
    ),
    href: "/weather",
    icon: CloudSun,
    tone: "blue",
  },
  {
    title: localized("My Advisories", "मेरी सलाह"),
    description: localized(
      "Personalised tasks & alerts",
      "व्यक्तिगत कार्य और अलर्ट",
    ),
    href: "/advisories",
    icon: ClipboardCheck,
    tone: "teal",
  },
  {
    title: localized("Leaf Colour Check", "पत्ती रंग जांच"),
    description: localized(
      "Check crop nitrogen status instantly",
      "फसल की नाइट्रोजन स्थिति तुरंत जांचें",
    ),
    href: "/leaf-colour-check",
    icon: Leaf,
    tone: "green",
  },
  {
    title: localized("NutriCheck", "न्यूट्रीचेक"),
    description: localized(
      "Detect nutrient deficiencies",
      "पोषक तत्वों की कमी पहचानें",
    ),
    href: "/nutricheck",
    icon: ScanLine,
    tone: "pink",
  },
  {
    title: localized("Pests & Diseases", "कीट और रोग"),
    description: localized(
      "Identify & manage problems",
      "समस्याएं पहचानें और प्रबंधित करें",
    ),
    href: "/pest-disease",
    icon: Bug,
    tone: "green",
  },
  {
    title: localized("Krishi Inputs", "कृषि इनपुट"),
    description: localized(
      "Seeds, fertilisers, pesticides & more",
      "बीज, उर्वरक, कीटनाशक और अन्य",
    ),
    href: "/marketplace",
    icon: Store,
    tone: "orange",
  },
  {
    title: localized("Pashu Bazaar", "पशु बाजार"),
    description: localized(
      "Buy & sell livestock easily",
      "पशुधन आसानी से खरीदें और बेचें",
    ),
    href: "/pashu-bazaar",
    icon: Wheat,
    tone: "purple",
  },
  {
    title: localized("Book Machinery", "मशीनरी बुक करें"),
    description: localized(
      "Rent/Book farm machinery",
      "कृषि मशीनरी किराये पर लें/बुक करें",
    ),
    href: "/machinery",
    icon: Tractor,
    tone: "green",
  },
  {
    title: localized("Market Prices", "बाजार भाव"),
    description: localized(
      "Live mandi prices & trends",
      "लाइव मंडी भाव और रुझान",
    ),
    href: "/mandi",
    icon: TrendingUp,
    tone: "orange",
  },
  {
    title: localized("My Farm", "मेरा खेत"),
    description: localized(
      "My fields, crops & records",
      "मेरे खेत, फसलें और रिकॉर्ड",
    ),
    href: "/farms",
    icon: Sprout,
    tone: "green",
  },
  {
    title: localized("FPO & Services", "एफपीओ और सेवाएं"),
    description: localized(
      "Connect with FPOs & services",
      "एफपीओ और सेवाओं से जुड़ें",
    ),
    href: "/more#fpo",
    icon: Handshake,
    tone: "teal",
  },
  {
    title: localized("Finance & Loans", "वित्त और ऋण"),
    description: localized("Loans, insurance & schemes", "ऋण, बीमा और योजनाएं"),
    href: "/more#finance",
    icon: HandCoins,
    tone: "green",
  },
  {
    title: localized("Training & Videos", "प्रशिक्षण और वीडियो"),
    description: localized(
      "Learn & grow with videos",
      "वीडियो से सीखें और आगे बढ़ें",
    ),
    href: "/more#training",
    icon: CirclePlay,
    tone: "purple",
  },
  {
    id: "startups",
    title: localized("Startups", "स्टार्टअप"),
    description: localized(
      "Discover innovative agri-tech products and services",
      "नवीन कृषि-तकनीक उत्पाद और सेवाएं खोजें",
    ),
    href: "/startups",
    icon: Lightbulb,
    tone: "orange",
    badge: localized("NEW", "नया"),
  },
  {
    title: localized("More Services", "और सेवाएं"),
    description: localized("Explore all services", "सभी सेवाएं देखें"),
    href: "/more",
    icon: LayoutGrid,
    tone: "green",
  },
] as const;

export const notifications = [
  {
    title: localized("Rain expected tomorrow", "कल बारिश की संभावना"),
    detail: localized(
      "Avoid irrigation and pesticide spray for the next 24 hours.",
      "अगले 24 घंटों तक सिंचाई और कीटनाशक छिड़काव न करें।",
    ),
    time: localized("10 min ago", "10 मिनट पहले"),
    kind: localized("Weather", "मौसम"),
  },
  {
    title: localized("Crop advisory for Paddy", "धान के लिए फसल सलाह"),
    detail: localized(
      "Your crop is entering tillering stage. Check the recommended tasks.",
      "आपकी फसल कल्ले निकलने की अवस्था में है। सुझाए गए कार्य देखें।",
    ),
    time: localized("2 hours ago", "2 घंटे पहले"),
    kind: localized("Advisory", "सलाह"),
  },
  {
    title: localized("Diagnosis report is ready", "निदान रिपोर्ट तैयार है"),
    detail: localized(
      "Brown Spot was identified in Field 1 with 78% confidence.",
      "खेत 1 में 78% विश्वसनीयता के साथ भूरा धब्बा पहचाना गया।",
    ),
    time: localized("Yesterday", "कल"),
    kind: localized("Crop Doctor", "फसल डॉक्टर"),
  },
  {
    title: localized("Mandi price increased", "मंडी भाव बढ़ा"),
    detail: localized(
      "Paddy price at Karnal mandi is up by ₹85 per quintal.",
      "करनाल मंडी में धान का भाव ₹85 प्रति क्विंटल बढ़ा।",
    ),
    time: localized("Yesterday", "कल"),
    kind: localized("Market", "बाजार"),
  },
] as const;

export const diagnosisRecords = [
  {
    disease: localized("Brown Spot", "भूरा धब्बा"),
    crop: localized("Paddy (Dhan) · Field 1", "धान · खेत 1"),
    date: localized("28 May 2024 · 10:24 AM", "28 मई 2024 · 10:24 पूर्वाह्न"),
    confidence: "78%",
    level: localized("Moderate", "मध्यम"),
    status: localized("Confirmed", "पुष्टि हुई"),
    treatment: localized(
      "Tricyclazole 75% WP · 0.6 g/L",
      "Tricyclazole 75% WP · 0.6 ग्राम/लीटर",
    ),
    image: "/images/authenticated/brown-spot.jpg",
  },
  {
    disease: localized("Leaf Blast", "पत्ती झुलसा"),
    crop: localized("Paddy (Dhan) · Field 1", "धान · खेत 1"),
    date: localized("24 May 2024 · 8:15 AM", "24 मई 2024 · 8:15 पूर्वाह्न"),
    confidence: "62%",
    level: localized("Moderate", "मध्यम"),
    status: localized("Confirmed", "पुष्टि हुई"),
    treatment: localized(
      "Hexaconazole 5% EC · 1.0 ml/L",
      "Hexaconazole 5% EC · 1.0 मिली/लीटर",
    ),
    image: "/images/authenticated/leaf-blast.jpg",
  },
  {
    disease: localized("Bacterial Leaf Spot", "जीवाणु पत्ती धब्बा"),
    crop: localized("Paddy (Dhan) · Field 2", "धान · खेत 2"),
    date: localized("20 May 2024 · 6:40 PM", "20 मई 2024 · 6:40 अपराह्न"),
    confidence: "38%",
    level: localized("Low", "कम"),
    status: localized("Low Confidence", "कम विश्वसनीयता"),
    treatment: localized("Connect with Expert", "विशेषज्ञ से जुड़ें"),
    image: "/images/authenticated/bacterial-leaf.jpg",
  },
  {
    disease: localized("Sheath Blight", "शीथ ब्लाइट"),
    crop: localized("Paddy (Dhan) · Field 1", "धान · खेत 1"),
    date: localized("15 May 2024 · 9:30 AM", "15 मई 2024 · 9:30 पूर्वाह्न"),
    confidence: "85%",
    level: localized("High", "अधिक"),
    status: localized("Confirmed", "पुष्टि हुई"),
    treatment: localized(
      "Validamycin 3% L · 2.0 ml/L",
      "Validamycin 3% L · 2.0 मिली/लीटर",
    ),
    image: "/images/authenticated/sheath-blight.jpg",
  },
  {
    disease: localized("Tungro Disease", "टुंग्रो रोग"),
    crop: localized("Paddy (Dhan) · Field 1", "धान · खेत 1"),
    date: localized("10 May 2024 · 11:05 AM", "10 मई 2024 · 11:05 पूर्वाह्न"),
    confidence: "28%",
    level: localized("Low", "कम"),
    status: localized("Expert Consulted", "विशेषज्ञ से परामर्श"),
    treatment: localized("Response received 11 May", "उत्तर 11 मई को मिला"),
    image: "/images/authenticated/tungro.jpg",
  },
] as const;
