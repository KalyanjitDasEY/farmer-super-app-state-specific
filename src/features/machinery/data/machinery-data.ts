import { localized, type LocalizedText } from "@/i18n/localized-text";

export type Machine = {
  name: LocalizedText;
  category: LocalizedText;
  image: string;
  provider: string;
  rating: string;
  reviews: number;
  distance: LocalizedText;
  price: number;
  coverage: LocalizedText;
  description: LocalizedText;
  specifications: readonly LocalizedText[];
};

export const machines: readonly Machine[] = [
  {
    name: localized(
      "Tractor (45 HP) with Mould Board Plough",
      "मोल्ड बोर्ड हल के साथ ट्रैक्टर (45 HP)",
    ),
    category: localized("Tillage / Ploughing", "जुताई / हल चलाना"),
    image: "/images/authenticated/machinery/tractor-blue.jpg",
    provider: "Krishna FPO Society",
    rating: "4.6",
    reviews: 128,
    distance: localized("6.2 km away", "6.2 किमी दूर"),
    price: 1450,
    coverage: localized("2.5 - 3.5 Acre/Hour", "2.5 - 3.5 एकड़/घंटा"),
    description: localized(
      "Best for primary tillage in medium to heavy soil.",
      "मध्यम से भारी मिट्टी में प्राथमिक जुताई के लिए सर्वोत्तम।",
    ),
    specifications: [
      localized("Power: 45 HP", "पावर: 45 HP"),
      localized("Drive: 4WD", "ड्राइव: 4WD"),
      localized("Plough: 2 Bottom", "हल: 2 बॉटम"),
      localized("Depth: 6 - 9 inch", "गहराई: 6 - 9 इंच"),
    ],
  },
  {
    name: localized("Rotavator (6 Feet)", "रोटावेटर (6 फीट)"),
    category: localized("Secondary Tillage", "द्वितीयक जुताई"),
    image: "/images/authenticated/machinery/rotavator.jpg",
    provider: "Sarita Agro Services",
    rating: "4.5",
    reviews: 96,
    distance: localized("7.8 km away", "7.8 किमी दूर"),
    price: 1250,
    coverage: localized("1.5 - 2.5 Acre/Hour", "1.5 - 2.5 एकड़/घंटा"),
    description: localized(
      "For secondary tillage and seedbed preparation.",
      "द्वितीयक जुताई और बीज क्यारी तैयार करने के लिए।",
    ),
    specifications: [
      localized("Working Width: 6 ft", "कार्य चौड़ाई: 6 फीट"),
      localized("HP Required: 35+", "आवश्यक HP: 35+"),
      localized("Blades: 36", "ब्लेड: 36"),
      localized("Depth: 4 - 6 inch", "गहराई: 4 - 6 इंच"),
    ],
  },
  {
    name: localized("Seed Drill (Happy Seeder)", "सीड ड्रिल (हैप्पी सीडर)"),
    category: localized("Sowing", "बुवाई"),
    image: "/images/authenticated/machinery/seed-drill.jpg",
    provider: "Bihta CHC",
    rating: "4.7",
    reviews: 74,
    distance: localized("6.1 km away", "6.1 किमी दूर"),
    price: 1200,
    coverage: localized("1.5 - 2.0 Acre/Hour", "1.5 - 2.0 एकड़/घंटा"),
    description: localized(
      "Line sowing with residue management.",
      "फसल अवशेष प्रबंधन के साथ कतार में बुवाई।",
    ),
    specifications: [
      localized("Rows: 11", "कतारें: 11"),
      localized("Row Spacing: 8 inch", "कतार दूरी: 8 इंच"),
      localized("Seed Type: Fine/Grain", "बीज प्रकार: महीन/अनाज"),
      localized("HP Required: 40+", "आवश्यक HP: 40+"),
    ],
  },
  {
    name: localized("Combine Harvester", "कंबाइन हार्वेस्टर"),
    category: localized("Harvesting", "कटाई"),
    image: "/images/authenticated/machinery/combine-harvester.jpg",
    provider: "Mishra Agro Works",
    rating: "4.4",
    reviews: 53,
    distance: localized("9.3 km away", "9.3 किमी दूर"),
    price: 5800,
    coverage: localized("1.5 - 2.5 Acre/Hour", "1.5 - 2.5 एकड़/घंटा"),
    description: localized(
      "Grain harvesting and threshing in one pass.",
      "एक ही बार में अनाज की कटाई और मड़ाई।",
    ),
    specifications: [
      localized("Cutting Width: 10 ft", "कटाई चौड़ाई: 10 फीट"),
      localized("Grain Tank: 2000 Ltr", "अनाज टैंक: 2000 लीटर"),
      localized("HP Required: 70+", "आवश्यक HP: 70+"),
      localized("Suitable Crop: Paddy", "उपयुक्त फसल: धान"),
    ],
  },
] as const;

export type Provider = {
  name: string;
  type: LocalizedText;
  distance: LocalizedText;
  rating: string;
  reviews: number;
  price: number;
  time: LocalizedText;
  image: string;
  included: readonly LocalizedText[];
};

export const providers: readonly Provider[] = [
  {
    name: "Krishna FPO Society",
    type: localized("FPO", "FPO"),
    distance: localized("6.2 km away", "6.2 किमी दूर"),
    rating: "4.6",
    reviews: 128,
    price: 1450,
    time: localized("08:00 AM", "08:00 पूर्वाह्न"),
    image: "/images/authenticated/machinery/provider-tractor-1.jpg",
    included: [
      localized("Operator Included", "ऑपरेटर शामिल"),
      localized("Fuel Included", "ईंधन शामिल"),
      localized("Transport Extra", "परिवहन अतिरिक्त"),
    ],
  },
  {
    name: "Sarita Agro Services",
    type: localized("CHC", "CHC"),
    distance: localized("7.8 km away", "7.8 किमी दूर"),
    rating: "4.5",
    reviews: 96,
    price: 1550,
    time: localized("09:00 AM", "09:00 पूर्वाह्न"),
    image: "/images/authenticated/machinery/provider-tractor-2.jpg",
    included: [
      localized("Operator Included", "ऑपरेटर शामिल"),
      localized("Fuel Extra", "ईंधन अतिरिक्त"),
      localized("Transport Available", "परिवहन उपलब्ध"),
    ],
  },
  {
    name: "Bihta CHC",
    type: localized("CHC", "CHC"),
    distance: localized("9.5 km away", "9.5 किमी दूर"),
    rating: "4.4",
    reviews: 74,
    price: 1650,
    time: localized("10:00 AM", "10:00 पूर्वाह्न"),
    image: "/images/authenticated/machinery/provider-tractor-3.jpg",
    included: [
      localized("Operator Extra", "ऑपरेटर अतिरिक्त"),
      localized("Fuel Extra", "ईंधन अतिरिक्त"),
      localized("Transport Extra", "परिवहन अतिरिक्त"),
    ],
  },
  {
    name: "Mishra Agro Works",
    type: localized("Private", "निजी"),
    distance: localized("12.1 km away", "12.1 किमी दूर"),
    rating: "4.3",
    reviews: 53,
    price: 1750,
    time: localized("11:00 AM", "11:00 पूर्वाह्न"),
    image: "/images/authenticated/machinery/provider-tractor-2.jpg",
    included: [
      localized("Operator Included", "ऑपरेटर शामिल"),
      localized("Fuel Included", "ईंधन शामिल"),
      localized("Transport Extra", "परिवहन अतिरिक्त"),
    ],
  },
  {
    name: "Kisan Seva Kendra",
    type: localized("FPO", "FPO"),
    distance: localized("14.7 km away", "14.7 किमी दूर"),
    rating: "4.2",
    reviews: 41,
    price: 1800,
    time: localized("08:00 AM", "08:00 पूर्वाह्न"),
    image: "/images/authenticated/machinery/provider-tractor-1.jpg",
    included: [
      localized("Operator Included", "ऑपरेटर शामिल"),
      localized("Fuel Extra", "ईंधन अतिरिक्त"),
      localized("Transport Available", "परिवहन उपलब्ध"),
    ],
  },
  {
    name: "Jai Kisan CHC",
    type: localized("CHC", "CHC"),
    distance: localized("18.9 km away", "18.9 किमी दूर"),
    rating: "4.1",
    reviews: 32,
    price: 1950,
    time: localized("08:00 AM", "08:00 पूर्वाह्न"),
    image: "/images/authenticated/machinery/provider-tractor-3.jpg",
    included: [
      localized("Operator Extra", "ऑपरेटर अतिरिक्त"),
      localized("Fuel Extra", "ईंधन अतिरिक्त"),
      localized("Transport Extra", "परिवहन अतिरिक्त"),
    ],
  },
] as const;

export const machineryCategories = [
  localized("Tractors", "ट्रैक्टर"),
  localized("Tillage (Ploughing)", "जुताई (हल चलाना)"),
  localized("Sowing & Planting", "बुवाई और रोपाई"),
  localized("Harvesting", "कटाई"),
  localized("Transport", "परिवहन"),
  localized("Irrigation", "सिंचाई"),
  localized("Post Harvest", "कटाई के बाद"),
  localized("Crop Care Equipment", "फसल देखभाल उपकरण"),
  localized("Earth Moving", "मिट्टी हटाने के उपकरण"),
  localized("Custom Hiring Services", "कस्टम हायरिंग सेवाएँ"),
  localized("FPO Machinery Bank", "FPO मशीनरी बैंक"),
  localized("All Categories", "सभी श्रेणियाँ"),
] as const;
