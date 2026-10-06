import type { LucideIcon } from "lucide-react";
import {
  Beef,
  Droplets,
  Leaf,
  Plane,
  RadioTower,
  Sprout,
  Zap,
} from "lucide-react";

import type { Translator } from "@/i18n/localized-text";

export type StartupCategory =
  | "all"
  | "farm-machinery"
  | "water-conservation"
  | "nutrient-pest"
  | "renewable-energy"
  | "digital-iot"
  | "agri-drones"
  | "animal-feed";

export interface StartupSolution {
  name: string;
  description: string;
  image: string;
}

export interface Startup {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  category: Exclude<StartupCategory, "all">;
  categoryLabel: string;
  description: string;
  about: string;
  state: string;
  city: string;
  year: number;
  rating: number;
  reviews: number;
  farmers: string;
  products: number;
  statesCovered: number;
  icon: LucideIcon;
  tone: "green" | "blue" | "lime" | "orange" | "purple" | "teal";
  heroImage: string;
  solutions: readonly StartupSolution[];
}

export const startupCategories: ReadonlyArray<{
  id: StartupCategory;
  label: string;
  count: number;
}> = [
  { id: "all", label: "All", count: 31 },
  { id: "farm-machinery", label: "Farm Machinery", count: 7 },
  { id: "water-conservation", label: "Water Conservation", count: 4 },
  { id: "nutrient-pest", label: "Nutrient & Pest", count: 6 },
  { id: "renewable-energy", label: "Renewable Energy", count: 3 },
  { id: "digital-iot", label: "Digital Technologies / IoT", count: 5 },
  { id: "agri-drones", label: "Agri Drones", count: 3 },
  { id: "animal-feed", label: "Animal Feed", count: 3 },
];

const startupImages = "/images/authenticated/startups";

export const startups: readonly Startup[] = [
  {
    slug: "agrotech-solutions",
    name: "AgroTech Solutions",
    brand: "AgroTech",
    tagline: "Smart Farming",
    category: "farm-machinery",
    categoryLabel: "Farm Machinery",
    description: "AI-powered implements and precision farming solutions.",
    about:
      "At AgroTech, we build affordable, technology-driven solutions that help farmers increase productivity, reduce input costs and make data-driven decisions for sustainable farming.",
    state: "Bihar",
    city: "Patna",
    year: 2019,
    rating: 4.6,
    reviews: 28,
    farmers: "1.2K+",
    products: 7,
    statesCovered: 8,
    icon: Sprout,
    tone: "green",
    heroImage: `${startupImages}/agrotech-field-device.jpg`,
    solutions: [
      {
        name: "AgroSense IoT",
        description:
          "Real-time field monitoring of soil, weather and crop health.",
        image: `${startupImages}/agrosense-iot.jpg`,
      },
      {
        name: "AgroDrone X",
        description: "Drone-based spraying, scouting and crop analysis.",
        image: `${startupImages}/agrodrone-x.jpg`,
      },
      {
        name: "AgroScan App",
        description: "AI-powered pest & disease detection and advisory app.",
        image: `${startupImages}/agroscan-app.jpg`,
      },
      {
        name: "Smart Sprayer",
        description:
          "Precision sprayer with variable rate application technology.",
        image: `${startupImages}/smart-sprayer.jpg`,
      },
      {
        name: "AgroAnalytics",
        description: "Data insights and recommendations for better decisions.",
        image: `${startupImages}/agroanalytics.jpg`,
      },
    ],
  },
  {
    slug: "jalrakshak-innovations",
    name: "JalRakshak Innovations",
    brand: "JalRakshak",
    tagline: "Save Water",
    category: "water-conservation",
    categoryLabel: "Water Conservation",
    description: "Smart irrigation systems & water management technologies.",
    about:
      "JalRakshak develops connected irrigation and water-management tools that help farms conserve water without compromising crop health or productivity.",
    state: "Maharashtra",
    city: "Pune",
    year: 2020,
    rating: 4.4,
    reviews: 17,
    farmers: "860+",
    products: 4,
    statesCovered: 5,
    icon: Droplets,
    tone: "blue",
    heroImage: "/images/authenticated/weather/paddy-field.jpg",
    solutions: [
      {
        name: "AquaSense",
        description: "Live soil-moisture and irrigation monitoring.",
        image: `${startupImages}/agrosense-iot.jpg`,
      },
      {
        name: "SmartDrip",
        description: "Automated drip irrigation for precise watering.",
        image: `${startupImages}/smart-sprayer.jpg`,
      },
      {
        name: "Jal Planner",
        description: "Water budgeting and irrigation advisory.",
        image: `${startupImages}/agroscan-app.jpg`,
      },
    ],
  },
  {
    slug: "nutricare-biotech",
    name: "NutriCare Biotech",
    brand: "NutriCare",
    tagline: "Better Crops",
    category: "nutrient-pest",
    categoryLabel: "Nutrient & Pest Management",
    description:
      "Bio-fertilizers and biopesticides for healthy and higher yield.",
    about:
      "NutriCare combines biological crop inputs with practical field guidance to improve soil health, manage pests and support stronger harvests.",
    state: "Karnataka",
    city: "Bengaluru",
    year: 2018,
    rating: 4.7,
    reviews: 32,
    farmers: "2.1K+",
    products: 9,
    statesCovered: 11,
    icon: Leaf,
    tone: "lime",
    heroImage: "/images/authenticated/nutricheck/hero-leaf.jpg",
    solutions: [
      {
        name: "BioGrow",
        description: "Bio-fertilizer for balanced crop nutrition.",
        image: "/images/authenticated/nutricheck/nitrogen-bag.jpg",
      },
      {
        name: "PestGuard",
        description: "Biological crop protection for common pests.",
        image: "/images/authenticated/pest-disease/brown-planthopper.jpg",
      },
      {
        name: "NutriScan",
        description: "Mobile nutrient deficiency detection.",
        image: `${startupImages}/agroscan-app.jpg`,
      },
    ],
  },
  {
    slug: "greenvolt-energy",
    name: "GreenVolt Energy",
    brand: "GreenVolt",
    tagline: "Energy for Growth",
    category: "renewable-energy",
    categoryLabel: "Renewable Energy",
    description: "Solar pumps and clean energy solutions for agriculture.",
    about:
      "GreenVolt makes reliable renewable-energy products for irrigation, field operations and rural enterprises, reducing energy costs for farmers.",
    state: "Bihar",
    city: "Muzaffarpur",
    year: 2021,
    rating: 4.3,
    reviews: 14,
    farmers: "640+",
    products: 5,
    statesCovered: 6,
    icon: Zap,
    tone: "orange",
    heroImage: `${startupImages}/agrotech-field-device.jpg`,
    solutions: [
      {
        name: "Solar Pump",
        description: "Efficient solar irrigation for farms.",
        image: `${startupImages}/media-solar.jpg`,
      },
      {
        name: "Farm Solar Kit",
        description: "Clean power for equipment and field lighting.",
        image: `${startupImages}/agrotech-field-device.jpg`,
      },
      {
        name: "BioEnergy Unit",
        description: "Convert farm waste into usable energy.",
        image: "/images/authenticated/farms/wheat-field.jpg",
      },
    ],
  },
  {
    slug: "kisanconnect-iot",
    name: "KisanConnect IoT",
    brand: "KisanConnect",
    tagline: "IoT for Farms",
    category: "digital-iot",
    categoryLabel: "Digital Technologies / IoT",
    description:
      "Sensors, IoT devices & analytics for real-time farm insights.",
    about:
      "KisanConnect brings farm sensors, weather observations and crop analytics into one simple platform for timely, informed decisions.",
    state: "Punjab",
    city: "Ludhiana",
    year: 2020,
    rating: 4.5,
    reviews: 21,
    farmers: "1.5K+",
    products: 6,
    statesCovered: 9,
    icon: RadioTower,
    tone: "purple",
    heroImage: `${startupImages}/media-app.jpg`,
    solutions: [
      {
        name: "Farm IoT Hub",
        description: "Connect and manage field devices in one place.",
        image: `${startupImages}/agrosense-iot.jpg`,
      },
      {
        name: "Sensor Grid",
        description: "Monitor soil, weather and crop conditions.",
        image: `${startupImages}/agrotech-field-device.jpg`,
      },
      {
        name: "Kisan Dashboard",
        description: "Real-time alerts, trends and farm insights.",
        image: `${startupImages}/agroanalytics.jpg`,
      },
    ],
  },
  {
    slug: "dronekrishi",
    name: "DroneKrishi",
    brand: "DroneKrishi",
    tagline: "Fly. Monitor. Grow.",
    category: "agri-drones",
    categoryLabel: "Agri Drones",
    description: "Drone solutions for crop monitoring, spraying and mapping.",
    about:
      "DroneKrishi provides trained operators and precision drone services for fast crop scouting, mapping and safe, uniform spraying.",
    state: "Telangana",
    city: "Hyderabad",
    year: 2019,
    rating: 4.8,
    reviews: 19,
    farmers: "980+",
    products: 4,
    statesCovered: 7,
    icon: Plane,
    tone: "teal",
    heroImage: `${startupImages}/media-drone.jpg`,
    solutions: [
      {
        name: "SprayDrone X",
        description: "Precision spraying with trained operators.",
        image: `${startupImages}/agrodrone-x.jpg`,
      },
      {
        name: "Crop Mapper",
        description: "Aerial field mapping and crop analysis.",
        image: `${startupImages}/media-drone.jpg`,
      },
      {
        name: "Field Scan",
        description: "Rapid crop-health scouting and reports.",
        image: `${startupImages}/agroanalytics.jpg`,
      },
    ],
  },
  {
    slug: "pashuposhan-labs",
    name: "PashuPoshan Labs",
    brand: "PashuPoshan",
    tagline: "Better Feed",
    category: "animal-feed",
    categoryLabel: "Animal Feed",
    description:
      "Balanced feed technology and nutrition support for healthier livestock.",
    about:
      "PashuPoshan develops practical feed formulations and livestock nutrition tools that help farmers improve animal health, milk yield and farm income.",
    state: "Haryana",
    city: "Karnal",
    year: 2021,
    rating: 4.5,
    reviews: 16,
    farmers: "720+",
    products: 5,
    statesCovered: 4,
    icon: Beef,
    tone: "orange",
    heroImage: "/images/authenticated/pashu-bazaar/cattle-hero.jpg",
    solutions: [
      {
        name: "Smart Feed Mix",
        description: "Balanced nutrition for dairy animals.",
        image: "/images/authenticated/pashu-bazaar/hf-cow.jpg",
      },
      {
        name: "Feed Planner",
        description: "Daily ration planning for better animal health.",
        image: `${startupImages}/agroscan-app.jpg`,
      },
      {
        name: "Nutrition Support",
        description: "Expert-guided livestock feeding advisory.",
        image: "/images/authenticated/pashu-bazaar/gir-cow.jpg",
      },
    ],
  },
] as const;

export const featuredStartup = startups[0];

export function getStartup(slug: string) {
  return startups.find((startup) => startup.slug === slug);
}

const startupTextHindi: Readonly<Record<string, string>> = {
  All: "सभी",
  "Farm Machinery": "कृषि मशीनरी",
  "Water Conservation": "जल संरक्षण",
  "Nutrient & Pest": "पोषक तत्व और कीट",
  "Nutrient & Pest Management": "पोषक तत्व और कीट प्रबंधन",
  "Renewable Energy": "नवीकरणीय ऊर्जा",
  "Digital Technologies / IoT": "डिजिटल तकनीक / IoT",
  "Agri Drones": "कृषि ड्रोन",
  "Animal Feed": "पशु आहार",
  "Smart Farming": "स्मार्ट खेती",
  "Save Water": "पानी बचाएं",
  "Better Crops": "बेहतर फसलें",
  "Energy for Growth": "विकास के लिए ऊर्जा",
  "IoT for Farms": "खेतों के लिए IoT",
  "Fly. Monitor. Grow.": "उड़ाएं। निगरानी करें। बढ़ाएं।",
  "Better Feed": "बेहतर आहार",
  "AI-powered implements and precision farming solutions.":
    "AI-संचालित उपकरण और सटीक खेती समाधान।",
  "Smart irrigation systems & water management technologies.":
    "स्मार्ट सिंचाई प्रणालियां और जल प्रबंधन तकनीकें।",
  "Bio-fertilizers and biopesticides for healthy and higher yield.":
    "स्वस्थ और अधिक उपज के लिए जैव-उर्वरक और जैव-कीटनाशक।",
  "Solar pumps and clean energy solutions for agriculture.":
    "कृषि के लिए सौर पंप और स्वच्छ ऊर्जा समाधान।",
  "Sensors, IoT devices & analytics for real-time farm insights.":
    "खेत की रीयल-टाइम जानकारी के लिए सेंसर, IoT उपकरण और विश्लेषण।",
  "Drone solutions for crop monitoring, spraying and mapping.":
    "फसल निगरानी, छिड़काव और मानचित्रण के लिए ड्रोन समाधान।",
  "Balanced feed technology and nutrition support for healthier livestock.":
    "स्वस्थ पशुधन के लिए संतुलित आहार तकनीक और पोषण सहायता।",
  "At AgroTech, we build affordable, technology-driven solutions that help farmers increase productivity, reduce input costs and make data-driven decisions for sustainable farming.":
    "AgroTech में हम किफायती, तकनीक-आधारित समाधान बनाते हैं जो किसानों को उत्पादकता बढ़ाने, लागत घटाने और टिकाऊ खेती के लिए आंकड़ों पर आधारित निर्णय लेने में मदद करते हैं।",
  "JalRakshak develops connected irrigation and water-management tools that help farms conserve water without compromising crop health or productivity.":
    "JalRakshak जुड़े हुए सिंचाई और जल-प्रबंधन उपकरण विकसित करता है, जो फसल के स्वास्थ्य या उत्पादकता से समझौता किए बिना पानी बचाने में मदद करते हैं।",
  "NutriCare combines biological crop inputs with practical field guidance to improve soil health, manage pests and support stronger harvests.":
    "NutriCare मिट्टी का स्वास्थ्य सुधारने, कीट प्रबंधन और बेहतर पैदावार के लिए जैविक कृषि आदानों को व्यावहारिक खेत मार्गदर्शन से जोड़ता है।",
  "GreenVolt makes reliable renewable-energy products for irrigation, field operations and rural enterprises, reducing energy costs for farmers.":
    "GreenVolt सिंचाई, खेत कार्य और ग्रामीण उद्यमों के लिए भरोसेमंद नवीकरणीय ऊर्जा उत्पाद बनाता है, जिससे किसानों की ऊर्जा लागत घटती है।",
  "KisanConnect brings farm sensors, weather observations and crop analytics into one simple platform for timely, informed decisions.":
    "KisanConnect समय पर सूचित निर्णयों के लिए खेत सेंसर, मौसम अवलोकन और फसल विश्लेषण को एक सरल मंच पर लाता है।",
  "DroneKrishi provides trained operators and precision drone services for fast crop scouting, mapping and safe, uniform spraying.":
    "DroneKrishi तेज फसल निरीक्षण, मानचित्रण और सुरक्षित, समान छिड़काव के लिए प्रशिक्षित ऑपरेटर और सटीक ड्रोन सेवाएं देता है।",
  "PashuPoshan develops practical feed formulations and livestock nutrition tools that help farmers improve animal health, milk yield and farm income.":
    "PashuPoshan व्यावहारिक आहार मिश्रण और पशु पोषण उपकरण विकसित करता है, जो पशु स्वास्थ्य, दूध उत्पादन और कृषि आय बढ़ाने में मदद करते हैं।",
  "Uttar Pradesh": "उत्तर प्रदेश",
  Maharashtra: "महाराष्ट्र",
  Karnataka: "कर्नाटक",
  Bihar: "बिहार",
  Punjab: "पंजाब",
  Telangana: "तेलंगाना",
  Haryana: "हरियाणा",
  Kanpur: "कानपुर",
  Pune: "पुणे",
  Bengaluru: "बेंगलुरु",
  Patna: "पटना",
  Muzaffarpur: "मुजफ्फरपुर",
  Ludhiana: "लुधियाना",
  Hyderabad: "हैदराबाद",
  Karnal: "करनाल",
  "Real-time field monitoring of soil, weather and crop health.":
    "मिट्टी, मौसम और फसल स्वास्थ्य की रीयल-टाइम निगरानी।",
  "Drone-based spraying, scouting and crop analysis.":
    "ड्रोन-आधारित छिड़काव, निरीक्षण और फसल विश्लेषण।",
  "AI-powered pest & disease detection and advisory app.":
    "AI-संचालित कीट और रोग पहचान तथा सलाह ऐप।",
  "Precision sprayer with variable rate application technology.":
    "परिवर्तनीय दर अनुप्रयोग तकनीक वाला सटीक स्प्रेयर।",
  "Data insights and recommendations for better decisions.":
    "बेहतर निर्णयों के लिए डेटा जानकारी और सुझाव।",
  "Live soil-moisture and irrigation monitoring.":
    "मिट्टी की नमी और सिंचाई की लाइव निगरानी।",
  "Automated drip irrigation for precise watering.":
    "सटीक पानी देने के लिए स्वचालित ड्रिप सिंचाई।",
  "Water budgeting and irrigation advisory.": "जल बजट और सिंचाई सलाह।",
  "Bio-fertilizer for balanced crop nutrition.":
    "संतुलित फसल पोषण के लिए जैव-उर्वरक।",
  "Biological crop protection for common pests.":
    "सामान्य कीटों से जैविक फसल सुरक्षा।",
  "Mobile nutrient deficiency detection.": "मोबाइल पोषक तत्व कमी पहचान।",
  "Efficient solar irrigation for farms.": "खेतों के लिए कुशल सौर सिंचाई।",
  "Clean power for equipment and field lighting.":
    "उपकरण और खेत की रोशनी के लिए स्वच्छ ऊर्जा।",
  "Convert farm waste into usable energy.":
    "कृषि अपशिष्ट को उपयोगी ऊर्जा में बदलें।",
  "Connect and manage field devices in one place.":
    "खेत के उपकरणों को एक ही जगह जोड़ें और प्रबंधित करें।",
  "Monitor soil, weather and crop conditions.":
    "मिट्टी, मौसम और फसल की स्थितियों की निगरानी करें।",
  "Real-time alerts, trends and farm insights.":
    "रीयल-टाइम चेतावनियां, रुझान और खेत की जानकारी।",
  "Precision spraying with trained operators.":
    "प्रशिक्षित ऑपरेटरों के साथ सटीक छिड़काव।",
  "Aerial field mapping and crop analysis.":
    "हवाई खेत मानचित्रण और फसल विश्लेषण।",
  "Rapid crop-health scouting and reports.":
    "तेज फसल-स्वास्थ्य निरीक्षण और रिपोर्ट।",
  "Balanced nutrition for dairy animals.": "दुधारू पशुओं के लिए संतुलित पोषण।",
  "Daily ration planning for better animal health.":
    "बेहतर पशु स्वास्थ्य के लिए दैनिक आहार योजना।",
  "Expert-guided livestock feeding advisory.":
    "विशेषज्ञ-निर्देशित पशु आहार सलाह।",
};

export function translateStartupText(t: Translator, value: string): string {
  return t(value, startupTextHindi[value] ?? value);
}
