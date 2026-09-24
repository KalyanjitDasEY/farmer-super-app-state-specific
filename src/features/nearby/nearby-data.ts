import {
  FlaskConical,
  PackageCheck,
  ShieldCheck,
  Warehouse,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { localized, type LocalizedText } from "@/i18n/localized-text";

export type NearbyServiceId =
  "seeds" | "fertilizers" | "crop-protection" | "warehouses";

export type NearbySeller = {
  id: string;
  name: string;
  owner: string;
  address: string;
  hours: string;
  phone: string;
  distance: number;
  products: readonly string[];
  rating?: number;
  ratings?: number;
  feature: string;
  capacity?: string;
  availableCapacity?: string;
  availability?: "available" | "full";
  badge: string;
};

export type NearbyServiceConfig = {
  id: NearbyServiceId;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  searchPlaceholder: string;
  typeLabel: string;
  categories: readonly string[];
  verifiedMessage: string;
  tip: string;
  sellers: readonly NearbySeller[];
};

export const nearbyServiceOrder: readonly NearbyServiceId[] = [
  "seeds",
  "fertilizers",
  "crop-protection",
  "warehouses",
];

export const nearbyServices: Record<NearbyServiceId, NearbyServiceConfig> = {
  seeds: {
    id: "seeds",
    title: "Nearby Seed Suppliers",
    shortTitle: "Seed Suppliers",
    description: "Find trusted seed suppliers near your location.",
    icon: Wheat,
    searchPlaceholder: "Search by supplier name, seed type...",
    typeLabel: "Seed Type",
    categories: [
      "All Seeds",
      "Wheat",
      "Paddy",
      "Bajra",
      "Maize",
      "Pulses",
      "Oilseeds",
    ],
    verifiedMessage:
      "Suppliers listed are licensed and verified by the Agriculture Department, Rajasthan.",
    tip: "Buy certified seeds and always ask for a bill and quality certificate.",
    sellers: [
      {
        id: "chomu-krishi-seed",
        name: "Chomu Krishi Seed Center",
        owner: "Ramesh Kumawat",
        address: "Morija Road, Chomu, Jaipur",
        hours: "Open · Closes 6:30 PM",
        phone: "98765 43210",
        distance: 1.2,
        products: ["Wheat", "Paddy", "Mustard", "Bajra", "Maize"],
        rating: 4.8,
        ratings: 142,
        feature: "Quality certified seeds",
        badge: "Verified",
      },
      {
        id: "govindgarh-seeds",
        name: "Govindgarh Balaji Seeds",
        owner: "Mahendra Meena",
        address: "Govindgarh, Chomu, Jaipur",
        hours: "Open · Closes 7:00 PM",
        phone: "98291 23456",
        distance: 4.8,
        products: ["Paddy", "Wheat", "Maize", "Gram", "Moong"],
        rating: 4.6,
        ratings: 108,
        feature: "Certified seasonal varieties",
        badge: "Verified",
      },
      {
        id: "morija-agro-seeds",
        name: "Morija Agro Seeds",
        owner: "Suresh Jat",
        address: "Morija, Chomu, Jaipur",
        hours: "Open · Closes 7:30 PM",
        phone: "87698 76543",
        distance: 8.6,
        products: ["Wheat", "Paddy", "Mustard", "Sunflower", "Bajra"],
        rating: 4.5,
        ratings: 82,
        feature: "Bulk seed orders available",
        badge: "Verified",
      },
      {
        id: "samod-green-seeds",
        name: "Samod Green Grow Seeds",
        owner: "Vikram Singh",
        address: "Samod Road, Chomu, Jaipur",
        hours: "Open · Closes 6:00 PM",
        phone: "90790 12345",
        distance: 12.3,
        products: ["Paddy", "Wheat", "Moong", "Urad", "Soybean"],
        rating: 4.4,
        ratings: 64,
        feature: "Quality certified seeds",
        badge: "Verified",
      },
    ],
  },
  fertilizers: {
    id: "fertilizers",
    title: "Nearby Fertilizer Suppliers",
    shortTitle: "Fertilizer Suppliers",
    description: "Find trusted fertilizer suppliers near your location.",
    icon: PackageCheck,
    searchPlaceholder: "Search supplier name, fertilizer type...",
    typeLabel: "Fertilizer Type",
    categories: [
      "All Fertilizers",
      "Urea",
      "DAP",
      "MOP",
      "NPK",
      "Zinc Sulphate",
      "SSP",
    ],
    verifiedMessage:
      "Suppliers listed are licensed and verified by the Agriculture Department, Rajasthan.",
    tip: "Always check the bill and expiry date. Store fertilizers in a dry and safe place.",
    sellers: [
      {
        id: "shree-krishi-fertilizer",
        name: "Shree Krishi Fertilizer Store",
        owner: "Mahendra Meena",
        address: "Chomu Road, Chomu, Jaipur",
        hours: "Open · 8:00 AM – 7:00 PM",
        phone: "98765 43210",
        distance: 1.2,
        products: [
          "Urea",
          "DAP",
          "MOP",
          "NPK 19:19:19",
          "Zinc Sulphate",
          "SSP",
        ],
        rating: 4.7,
        ratings: 126,
        feature: "Bulk orders available",
        badge: "Verified",
      },
      {
        id: "chomu-agro-care",
        name: "Chomu Agro Care Centre",
        owner: "Ramesh Kumawat",
        address: "Morija, Chomu, Jaipur",
        hours: "Open · 8:30 AM – 6:30 PM",
        phone: "98291 23456",
        distance: 3.6,
        products: [
          "Urea",
          "DAP",
          "NPK 12:32:16",
          "MOP",
          "Zinc Sulphate",
          "Gypsum",
        ],
        rating: 4.5,
        ratings: 94,
        feature: "Soil testing available",
        badge: "Verified",
      },
      {
        id: "kisan-seva-fertilizer",
        name: "Kisan Seva Kendra",
        owner: "Vikram Singh",
        address: "Kaladera, Chomu, Jaipur",
        hours: "Open · 9:00 AM – 6:00 PM",
        phone: "87698 76543",
        distance: 5.8,
        products: [
          "Urea",
          "DAP",
          "MOP",
          "NPK 15:15:15",
          "Zinc Sulphate",
          "SSP",
        ],
        rating: 4.4,
        ratings: 77,
        feature: "Small packs also available",
        badge: "Verified",
      },
      {
        id: "green-field-fertilizer",
        name: "Green Field Agro Store",
        owner: "Suresh Jat",
        address: "Samod Road, Chomu, Jaipur",
        hours: "Open · 8:00 AM – 8:00 PM",
        phone: "90790 12345",
        distance: 8.9,
        products: [
          "Urea",
          "DAP",
          "NPK 10:26:26",
          "MOP",
          "Zinc Sulphate",
          "SSP",
        ],
        rating: 4.3,
        ratings: 68,
        feature: "Home delivery available",
        badge: "Verified",
      },
    ],
  },
  "crop-protection": {
    id: "crop-protection",
    title: "Nearby Crop Protection Products Sellers",
    shortTitle: "Crop Protection Sellers",
    description:
      "Find trusted sellers of pesticides, fungicides, insecticides and more.",
    icon: ShieldCheck,
    searchPlaceholder: "Search seller name or product...",
    typeLabel: "Product Type",
    categories: [
      "All Products",
      "Insecticides",
      "Fungicides",
      "Herbicides",
      "Bio Pesticides",
      "Micronutrients",
    ],
    verifiedMessage:
      "All sellers are licensed and verified by the Agriculture Department, Rajasthan.",
    tip: "Always read the product label and follow the recommended dosage for better crop protection.",
    sellers: [
      {
        id: "krishi-suraksha",
        name: "Krishi Suraksha Kendra",
        owner: "Mahendra Meena",
        address: "Chomu Road, Chomu, Jaipur",
        hours: "Open · 8:00 AM – 7:00 PM",
        phone: "98765 43210",
        distance: 1.3,
        products: [
          "Insecticides",
          "Fungicides",
          "Herbicides",
          "Bio Pesticides",
        ],
        rating: 4.6,
        ratings: 128,
        feature: "Plant protection guidance available",
        badge: "Verified",
      },
      {
        id: "agro-protect",
        name: "Agro Protect Centre",
        owner: "Ramesh Kumawat",
        address: "Morija, Chomu, Jaipur",
        hours: "Open · 8:30 AM – 6:30 PM",
        phone: "98291 23456",
        distance: 3.6,
        products: [
          "Insecticides",
          "Fungicides",
          "Herbicides",
          "Micronutrients",
        ],
        rating: 4.4,
        ratings: 96,
        feature: "Spray equipment available",
        badge: "Verified",
      },
      {
        id: "kisan-crop-care",
        name: "Kisan Crop Care",
        owner: "Vikram Singh",
        address: "Kaladera, Chomu, Jaipur",
        hours: "Open · 9:00 AM – 6:00 PM",
        phone: "87698 76543",
        distance: 5.7,
        products: [
          "Insecticides",
          "Fungicides",
          "Herbicides",
          "Seed Treatment",
        ],
        rating: 4.5,
        ratings: 82,
        feature: "Crop issue consultation available",
        badge: "Verified",
      },
      {
        id: "green-shield",
        name: "Green Shield Agro",
        owner: "Suresh Jat",
        address: "Samod Road, Chomu, Jaipur",
        hours: "Open · 8:00 AM – 6:00 PM",
        phone: "90790 12345",
        distance: 8.9,
        products: [
          "Insecticides",
          "Fungicides",
          "Herbicides",
          "Bio Pesticides",
        ],
        rating: 4.3,
        ratings: 74,
        feature: "Soil conditioners available",
        badge: "Verified",
      },
    ],
  },
  warehouses: {
    id: "warehouses",
    title: "Nearby Warehouse Availability",
    shortTitle: "Warehouse Availability",
    description: "Find government certified warehouses near your location.",
    icon: Warehouse,
    searchPlaceholder: "Search warehouse name or location...",
    typeLabel: "Storage Type",
    categories: [
      "All Types",
      "General Warehouse",
      "Cold Storage",
      "Agri Produce",
      "FPO Warehouse",
      "Private",
    ],
    verifiedMessage:
      "Availability is shown as per the latest update from the Department of Agriculture, Rajasthan.",
    tip: "Book your storage in advance during harvest season to ensure better availability and rates.",
    sellers: [
      {
        id: "chomu-gramin-warehouse",
        name: "Chomu Gramin Warehouse",
        owner: "Department of Agriculture, Rajasthan",
        address: "Chomu, Jaipur, Rajasthan",
        hours: "Open · 9:00 AM – 6:00 PM",
        phone: "98765 43210",
        distance: 1.3,
        products: ["General Warehouse"],
        feature: "Government certified",
        capacity: "5,000 Quintal",
        availableCapacity: "2,350 Quintal (47%)",
        availability: "available",
        badge: "Government",
      },
      {
        id: "govindgarh-cold-storage",
        name: "Govindgarh Cold Storage",
        owner: "Department of Agriculture, Rajasthan",
        address: "Govindgarh, Chomu, Jaipur",
        hours: "Open · 8:00 AM – 5:00 PM",
        phone: "98291 23456",
        distance: 4.7,
        products: ["Cold Storage"],
        feature: "Temperature controlled",
        capacity: "10,000 Quintal",
        availableCapacity: "4,120 Quintal (41%)",
        availability: "available",
        badge: "Cold Storage",
      },
      {
        id: "morija-fpo-warehouse",
        name: "Morija FPO Warehouse",
        owner: "Morija Kisan Producer Company",
        address: "Morija, Chomu, Jaipur",
        hours: "Open · 9:00 AM – 5:00 PM",
        phone: "87698 76543",
        distance: 8.9,
        products: ["FPO Warehouse"],
        feature: "FPO member priority",
        capacity: "2,500 Quintal",
        availableCapacity: "1,100 Quintal (44%)",
        availability: "available",
        badge: "FPO Warehouse",
      },
      {
        id: "samod-private-warehouse",
        name: "Samod Private Warehouse",
        owner: "Private Warehouse",
        address: "Samod Road, Chomu, Jaipur",
        hours: "Open · 9:00 AM – 7:00 PM",
        phone: "90790 12345",
        distance: 18.6,
        products: ["Private"],
        feature: "Advance booking required",
        capacity: "7,000 Quintal",
        availableCapacity: "0 Quintal (0%)",
        availability: "full",
        badge: "Private Warehouse",
      },
    ],
  },
};

export const nearbyHubCards = nearbyServiceOrder.map((id) => {
  const service = nearbyServices[id];
  return {
    id,
    title: service.shortTitle,
    description: service.description,
    icon: service.icon,
    count: localized(
      `${service.sellers.length} verified ${
        id === "warehouses" ? "facilities" : "sellers"
      }`,
      `${service.sellers.length} सत्यापित ${
        id === "warehouses" ? "सुविधाएं" : "विक्रेता"
      }`,
    ),
  };
});

export const nearbyHubIcon = FlaskConical;

const nearbyHindi: Readonly<Record<string, string>> = {
  "Nearby Seed Suppliers": "आस-पास के बीज आपूर्तिकर्ता",
  "Seed Suppliers": "बीज आपूर्तिकर्ता",
  "Find trusted seed suppliers near your location.":
    "अपने स्थान के पास विश्वसनीय बीज आपूर्तिकर्ता खोजें।",
  "Search by supplier name, seed type...":
    "आपूर्तिकर्ता के नाम या बीज के प्रकार से खोजें...",
  "Seed Type": "बीज का प्रकार",
  "All Seeds": "सभी बीज",
  Wheat: "गेहूं",
  Paddy: "धान",
  Bajra: "बाजरा",
  Maize: "मक्का",
  Pulses: "दलहन",
  Oilseeds: "तिलहन",
  Mustard: "सरसों",
  Gram: "चना",
  Moong: "मूंग",
  Sunflower: "सूरजमुखी",
  Urad: "उड़द",
  Soybean: "सोयाबीन",
  "Suppliers listed are licensed and verified by the Agriculture Department, Rajasthan.":
    "सूचीबद्ध आपूर्तिकर्ता राजस्थान कृषि विभाग द्वारा लाइसेंस प्राप्त और सत्यापित हैं।",
  "Buy certified seeds and always ask for a bill and quality certificate.":
    "प्रमाणित बीज खरीदें और हमेशा बिल व गुणवत्ता प्रमाणपत्र मांगें।",
  "Quality certified seeds": "गुणवत्ता प्रमाणित बीज",
  "Certified seasonal varieties": "प्रमाणित मौसमी किस्में",
  "Bulk seed orders available": "थोक बीज ऑर्डर उपलब्ध",
  Verified: "सत्यापित",
  "Nearby Fertilizer Suppliers": "आस-पास के उर्वरक आपूर्तिकर्ता",
  "Fertilizer Suppliers": "उर्वरक आपूर्तिकर्ता",
  "Find trusted fertilizer suppliers near your location.":
    "अपने स्थान के पास विश्वसनीय उर्वरक आपूर्तिकर्ता खोजें।",
  "Search supplier name, fertilizer type...":
    "आपूर्तिकर्ता का नाम या उर्वरक प्रकार खोजें...",
  "Fertilizer Type": "उर्वरक का प्रकार",
  "All Fertilizers": "सभी उर्वरक",
  Urea: "यूरिया",
  "Zinc Sulphate": "जिंक सल्फेट",
  Gypsum: "जिप्सम",
  "Always check the bill and expiry date. Store fertilizers in a dry and safe place.":
    "हमेशा बिल और समाप्ति तिथि जांचें। उर्वरकों को सूखी और सुरक्षित जगह पर रखें।",
  "Bulk orders available": "थोक ऑर्डर उपलब्ध",
  "Soil testing available": "मिट्टी जांच उपलब्ध",
  "Small packs also available": "छोटे पैक भी उपलब्ध",
  "Home delivery available": "होम डिलीवरी उपलब्ध",
  "Nearby Crop Protection Products Sellers":
    "आस-पास के फसल सुरक्षा उत्पाद विक्रेता",
  "Crop Protection Sellers": "फसल सुरक्षा विक्रेता",
  "Find trusted sellers of pesticides, fungicides, insecticides and more.":
    "कीटनाशक, फफूंदनाशक, रोगनाशक और अन्य उत्पादों के विश्वसनीय विक्रेता खोजें।",
  "Search seller name or product...": "विक्रेता का नाम या उत्पाद खोजें...",
  "Product Type": "उत्पाद का प्रकार",
  "All Products": "सभी उत्पाद",
  Insecticides: "कीटनाशक",
  Fungicides: "फफूंदनाशक",
  Herbicides: "खरपतवारनाशक",
  "Bio Pesticides": "जैव कीटनाशक",
  Micronutrients: "सूक्ष्म पोषक तत्व",
  "All sellers are licensed and verified by the Agriculture Department, Rajasthan.":
    "सभी विक्रेता राजस्थान कृषि विभाग द्वारा लाइसेंस प्राप्त और सत्यापित हैं।",
  "Always read the product label and follow the recommended dosage for better crop protection.":
    "बेहतर फसल सुरक्षा के लिए हमेशा उत्पाद का लेबल पढ़ें और अनुशंसित मात्रा का पालन करें।",
  "Plant protection guidance available": "पौध सुरक्षा मार्गदर्शन उपलब्ध",
  "Spray equipment available": "स्प्रे उपकरण उपलब्ध",
  "Seed Treatment": "बीज उपचार",
  "Crop issue consultation available": "फसल समस्या पर परामर्श उपलब्ध",
  "Soil conditioners available": "मृदा सुधारक उपलब्ध",
  "Nearby Warehouse Availability": "आस-पास गोदाम की उपलब्धता",
  "Warehouse Availability": "गोदाम उपलब्धता",
  "Find government certified warehouses near your location.":
    "अपने स्थान के पास सरकार द्वारा प्रमाणित गोदाम खोजें।",
  "Search warehouse name or location...": "गोदाम का नाम या स्थान खोजें...",
  "Storage Type": "भंडारण का प्रकार",
  "All Types": "सभी प्रकार",
  "General Warehouse": "सामान्य गोदाम",
  "Cold Storage": "शीत भंडार",
  "Agri Produce": "कृषि उपज",
  "FPO Warehouse": "FPO गोदाम",
  Private: "निजी",
  "Availability is shown as per the latest update from the Department of Agriculture, Rajasthan.":
    "उपलब्धता राजस्थान कृषि विभाग के नवीनतम अपडेट के अनुसार दिखाई गई है।",
  "Book your storage in advance during harvest season to ensure better availability and rates.":
    "बेहतर उपलब्धता और दरों के लिए कटाई के मौसम में भंडारण पहले से बुक करें।",
  "Department of Agriculture, Rajasthan": "कृषि विभाग, राजस्थान",
  "Government certified": "सरकार द्वारा प्रमाणित",
  "Temperature controlled": "तापमान नियंत्रित",
  "Morija Kisan Producer Company": "मोरीजा किसान उत्पादक कंपनी",
  "FPO member priority": "FPO सदस्यों को प्राथमिकता",
  "Private Warehouse": "निजी गोदाम",
  "Advance booking required": "अग्रिम बुकिंग आवश्यक",
  Government: "सरकारी",
  "Open · Closes 6:30 PM": "खुला · शाम 6:30 बजे बंद",
  "Open · Closes 7:00 PM": "खुला · शाम 7:00 बजे बंद",
  "Open · Closes 7:30 PM": "खुला · शाम 7:30 बजे बंद",
  "Open · Closes 6:00 PM": "खुला · शाम 6:00 बजे बंद",
  "Open · 8:00 AM – 7:00 PM": "खुला · सुबह 8:00 – शाम 7:00",
  "Open · 8:30 AM – 6:30 PM": "खुला · सुबह 8:30 – शाम 6:30",
  "Open · 9:00 AM – 6:00 PM": "खुला · सुबह 9:00 – शाम 6:00",
  "Open · 8:00 AM – 8:00 PM": "खुला · सुबह 8:00 – रात 8:00",
  "Open · 8:00 AM – 6:00 PM": "खुला · सुबह 8:00 – शाम 6:00",
  "Open · 9:00 AM – 5:00 PM": "खुला · सुबह 9:00 – शाम 5:00",
  "Open · 8:00 AM – 5:00 PM": "खुला · सुबह 8:00 – शाम 5:00",
  "Open · 9:00 AM – 7:00 PM": "खुला · सुबह 9:00 – शाम 7:00",
  "5,000 Quintal": "5,000 क्विंटल",
  "2,350 Quintal (47%)": "2,350 क्विंटल (47%)",
  "10,000 Quintal": "10,000 क्विंटल",
  "4,120 Quintal (41%)": "4,120 क्विंटल (41%)",
  "2,500 Quintal": "2,500 क्विंटल",
  "1,100 Quintal (44%)": "1,100 क्विंटल (44%)",
  "7,000 Quintal": "7,000 क्विंटल",
  "0 Quintal (0%)": "0 क्विंटल (0%)",
};

export function nearbyText(value: string): LocalizedText {
  return localized(value, nearbyHindi[value] ?? value);
}
