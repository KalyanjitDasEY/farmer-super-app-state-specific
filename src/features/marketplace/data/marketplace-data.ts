import { localized, type LocalizedText } from "@/i18n/localized-text";

export type MarketplaceProduct = {
  slug: string;
  name: LocalizedText;
  shortName: LocalizedText;
  brand: string;
  form: "Prilled" | "Liquid";
  packSize: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: string;
  seller: string;
  delivery: LocalizedText;
  stock: "In Stock" | "Limited Stock";
  image: string;
  badge?: LocalizedText;
};

export const marketplaceProducts: readonly MarketplaceProduct[] = [
  {
    slug: "iffco-urea",
    name: localized(
      "IFFCO Urea 46% N (Prilled)",
      "इफको यूरिया 46% N (प्रिल्ड)",
    ),
    shortName: localized("IFFCO Urea 46% N", "इफको यूरिया 46% N"),
    brand: "IFFCO",
    form: "Prilled",
    packSize: "10 kg",
    price: 266,
    mrp: 275,
    rating: 4.6,
    reviews: "2.3K",
    seller: "IFFCO Kisan Kendra",
    delivery: localized("22 May", "22 मई"),
    stock: "In Stock",
    image: "/images/authenticated/marketplace/iffco-urea.png",
    badge: localized("Bestseller", "सबसे अधिक बिकने वाला"),
  },
  {
    slug: "kribhco-bharat-urea",
    name: localized(
      "Kribhco Bharat Urea (Prilled)",
      "कृभको भारत यूरिया (प्रिल्ड)",
    ),
    shortName: localized("Kribhco Bharat Urea", "कृभको भारत यूरिया"),
    brand: "Kribhco",
    form: "Prilled",
    packSize: "10 kg",
    price: 265,
    mrp: 273,
    rating: 4.5,
    reviews: "1.8K",
    seller: "Kribhco Retail",
    delivery: localized("22 May", "22 मई"),
    stock: "In Stock",
    image: "/images/authenticated/marketplace/kribhco-urea.png",
  },
  {
    slug: "coromandel-gromor-urea",
    name: localized(
      "Coromandel Gromor Urea (Prilled)",
      "कोरोमंडल ग्रोमोर यूरिया (प्रिल्ड)",
    ),
    shortName: localized("Coromandel Gromor Urea", "कोरोमंडल ग्रोमोर यूरिया"),
    brand: "Coromandel",
    form: "Prilled",
    packSize: "10 kg",
    price: 268,
    mrp: 278,
    rating: 4.4,
    reviews: "1.2K",
    seller: "Coromandel Store",
    delivery: localized("23 May", "23 मई"),
    stock: "Limited Stock",
    image: "/images/authenticated/marketplace/coromandel-urea.png",
    badge: localized("Popular", "लोकप्रिय"),
  },
  {
    slug: "nfl-urea",
    name: localized("NFL Urea 46% N (Prilled)", "NFL यूरिया 46% N (प्रिल्ड)"),
    shortName: localized("NFL Urea 46% N", "NFL यूरिया 46% N"),
    brand: "NFL",
    form: "Prilled",
    packSize: "10 kg",
    price: 262,
    mrp: 270,
    rating: 4.4,
    reviews: "980",
    seller: "NFL Kisan Store",
    delivery: localized("22 May", "22 मई"),
    stock: "In Stock",
    image: "/images/authenticated/marketplace/nfl-urea.png",
  },
  {
    slug: "iffco-urea-25",
    name: localized("IFFCO Urea 46% N", "इफको यूरिया 46% N"),
    shortName: localized("IFFCO Urea 46% N", "इफको यूरिया 46% N"),
    brand: "IFFCO",
    form: "Prilled",
    packSize: "25 kg",
    price: 655,
    mrp: 667,
    rating: 4.6,
    reviews: "2.3K",
    seller: "IFFCO Kisan Kendra",
    delivery: localized("23 May", "23 मई"),
    stock: "In Stock",
    image: "/images/authenticated/marketplace/iffco-urea.png",
    badge: localized("Save ₹12", "₹12 बचाएं"),
  },
  {
    slug: "coromandel-urea-25",
    name: localized("Coromandel Gromor Urea", "कोरोमंडल ग्रोमोर यूरिया"),
    shortName: localized("Coromandel Gromor Urea", "कोरोमंडल ग्रोमोर यूरिया"),
    brand: "Coromandel",
    form: "Prilled",
    packSize: "25 kg",
    price: 660,
    mrp: 672,
    rating: 4.4,
    reviews: "1.2K",
    seller: "Coromandel Store",
    delivery: localized("24 May", "24 मई"),
    stock: "Limited Stock",
    image: "/images/authenticated/marketplace/coromandel-urea.png",
  },
  {
    slug: "iffco-nano-urea",
    name: localized("IFFCO Nano Urea (Liquid)", "इफको नैनो यूरिया (तरल)"),
    shortName: localized("IFFCO Nano Urea", "इफको नैनो यूरिया"),
    brand: "IFFCO",
    form: "Liquid",
    packSize: "500 ml",
    price: 240,
    mrp: 250,
    rating: 4.6,
    reviews: "3.1K",
    seller: "IFFCO Kisan Kendra",
    delivery: localized("22 May", "22 मई"),
    stock: "In Stock",
    image: "/images/authenticated/marketplace/nano-urea.png",
    badge: localized("Liquid", "तरल"),
  },
  {
    slug: "kribhco-nano-urea",
    name: localized("Kribhco Nano Urea", "कृभको नैनो यूरिया"),
    shortName: localized("Kribhco Nano Urea", "कृभको नैनो यूरिया"),
    brand: "Kribhco",
    form: "Liquid",
    packSize: "500 ml",
    price: 235,
    mrp: 245,
    rating: 4.5,
    reviews: "1.1K",
    seller: "Kribhco Retail",
    delivery: localized("22 May", "22 मई"),
    stock: "In Stock",
    image: "/images/authenticated/marketplace/nano-urea.png",
    badge: localized("Liquid", "तरल"),
  },
] as const;

export const cartProducts = marketplaceProducts.slice(0, 4);

export const marketplaceCategories = [
  {
    name: localized("Seeds", "बीज"),
    detail: localized(
      "High quality seeds for better yield",
      "बेहतर उपज के लिए उच्च गुणवत्ता वाले बीज",
    ),
    tone: "green",
  },
  {
    name: localized("Fertilisers", "उर्वरक"),
    detail: localized(
      "Balanced nutrition for healthy crops",
      "स्वस्थ फसलों के लिए संतुलित पोषण",
    ),
    tone: "blue",
  },
  {
    name: localized("Pesticides", "कीटनाशक"),
    detail: localized(
      "Effective protection from pests",
      "कीटों से प्रभावी सुरक्षा",
    ),
    tone: "orange",
  },
  {
    name: localized("Bio Inputs", "जैविक इनपुट"),
    detail: localized(
      "Eco-friendly farming solutions",
      "पर्यावरण-अनुकूल खेती समाधान",
    ),
    tone: "green",
  },
  {
    name: localized("Plant Growth Promoters", "पौध वृद्धि संवर्धक"),
    detail: localized(
      "Boost growth and productivity",
      "वृद्धि और उत्पादकता बढ़ाएं",
    ),
    tone: "purple",
  },
  {
    name: localized("Micronutrients", "सूक्ष्म पोषक तत्व"),
    detail: localized(
      "Essential nutrients for crop health",
      "फसल के स्वास्थ्य के लिए आवश्यक पोषक तत्व",
    ),
    tone: "blue",
  },
  {
    name: localized("Soil & Crop Care", "मिट्टी और फसल देखभाल"),
    detail: localized(
      "Improve soil health and crop quality",
      "मिट्टी का स्वास्थ्य और फसल की गुणवत्ता सुधारें",
    ),
    tone: "brown",
  },
  {
    name: localized("Farm Accessories", "कृषि सहायक उपकरण"),
    detail: localized(
      "Sprayers, drip systems and tools",
      "स्प्रेयर, ड्रिप सिस्टम और औजार",
    ),
    tone: "yellow",
  },
  {
    name: localized("Organic Inputs", "जैविक कृषि इनपुट"),
    detail: localized("Natural farming solutions", "प्राकृतिक खेती समाधान"),
    tone: "green",
  },
  {
    name: localized("Animal Feed", "पशु आहार"),
    detail: localized(
      "Nutritious feed for livestock",
      "पशुधन के लिए पौष्टिक आहार",
    ),
    tone: "orange",
  },
] as const;

export const comparisonRows = [
  {
    label: localized("Nitrogen (N)", "नाइट्रोजन (N)"),
    values: ["46%", "46%", "46%", "46%"],
  },
  {
    label: localized("Form", "रूप"),
    values: Array(4).fill(localized("Prilled", "प्रिल्ड")),
  },
  {
    label: localized("Packing Size", "पैकिंग आकार"),
    values: Array(4).fill(localized("10 kg", "10 किग्रा")),
  },
  {
    label: localized("Price (MRP)", "मूल्य (MRP)"),
    values: ["₹275", "₹273", "₹278", "₹270"],
  },
  {
    label: localized("Selling Price", "बिक्री मूल्य"),
    values: ["₹266", "₹265", "₹268", "₹262"],
    highlight: true,
  },
  {
    label: localized("Cost per kg", "प्रति किग्रा लागत"),
    values: ["₹26.60", "₹26.50", "₹26.80", "₹26.20"],
    highlight: true,
  },
  {
    label: localized("Nutrient Use Efficiency", "पोषक तत्व उपयोग दक्षता"),
    values: Array(4).fill(localized("High", "उच्च")),
    highlight: true,
  },
  {
    label: localized("Moisture Content", "नमी की मात्रा"),
    values: ["≤ 0.5%", "≤ 0.5%", "≤ 0.5%", "≤ 0.5%"],
  },
  {
    label: localized("Recommended Crops", "अनुशंसित फसलें"),
    values: Array(4).fill(localized("All Crops", "सभी फसलें")),
  },
  {
    label: localized("Best For", "सबसे उपयुक्त"),
    values: [
      localized("All-round performance", "सर्वांगीण प्रदर्शन"),
      localized("High yield & quality", "उच्च उपज और गुणवत्ता"),
      localized("Balanced growth & yield", "संतुलित वृद्धि और उपज"),
      localized("General nutrition", "सामान्य पोषण"),
    ],
  },
  {
    label: localized("Certifications", "प्रमाणन"),
    values: ["FCO, BIS", "FCO, BIS", "FCO, BIS", "FCO, BIS"],
  },
  {
    label: localized("Government Approved", "सरकार द्वारा अनुमोदित"),
    values: Array(4).fill(localized("Yes", "हां")),
    highlight: true,
  },
  {
    label: localized("Seller", "विक्रेता"),
    values: [
      "IFFCO Kisan Kendra",
      "Kribhco Retail",
      "Coromandel Store",
      "NFL Kisan Store",
    ],
  },
  {
    label: localized("Delivery by", "डिलीवरी की तारीख"),
    values: [
      localized("22 May", "22 मई"),
      localized("22 May", "22 मई"),
      localized("23 May", "23 मई"),
      localized("22 May", "22 मई"),
    ],
  },
  {
    label: localized("Availability", "उपलब्धता"),
    values: [
      localized("In Stock", "स्टॉक में"),
      localized("In Stock", "स्टॉक में"),
      localized("Limited Stock", "सीमित स्टॉक"),
      localized("In Stock", "स्टॉक में"),
    ],
    highlight: true,
  },
  {
    label: localized("Return Policy", "वापसी नीति"),
    values: Array(4).fill(
      localized("7-day easy return", "7 दिन में आसान वापसी"),
    ),
  },
] as const;

export type MarketplaceOrder = {
  id: string;
  product: MarketplaceProduct;
  quantity: number;
  date: LocalizedText;
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
  statusDate: LocalizedText;
};

function productAt(index: number): MarketplaceProduct {
  const product = marketplaceProducts[index];
  if (!product) {
    throw new Error(`Marketplace product ${index} is not configured.`);
  }
  return product;
}

export const marketplaceOrders: readonly MarketplaceOrder[] = [
  {
    id: "BV-240518-00123",
    product: productAt(0),
    quantity: 2,
    date: localized("18 May 2024, 08:30 AM", "18 मई 2024, सुबह 08:30"),
    status: "Delivered",
    statusDate: localized("21 May 2024", "21 मई 2024"),
  },
  {
    id: "BV-240517-00098",
    product: productAt(1),
    quantity: 1,
    date: localized("17 May 2024, 06:20 PM", "17 मई 2024, शाम 06:20"),
    status: "In Transit",
    statusDate: localized("22 – 23 May 2024", "22 – 23 मई 2024"),
  },
  {
    id: "BV-240515-00076",
    product: productAt(2),
    quantity: 2,
    date: localized("15 May 2024, 09:10 AM", "15 मई 2024, सुबह 09:10"),
    status: "Processing",
    statusDate: localized("20 – 21 May 2024", "20 – 21 मई 2024"),
  },
  {
    id: "BV-240510-00045",
    product: productAt(6),
    quantity: 4,
    date: localized("10 May 2024, 11:30 AM", "10 मई 2024, सुबह 11:30"),
    status: "Delivered",
    statusDate: localized("13 May 2024", "13 मई 2024"),
  },
  {
    id: "BV-240508-00031",
    product: productAt(3),
    quantity: 1,
    date: localized("08 May 2024, 02:45 PM", "08 मई 2024, दोपहर 02:45"),
    status: "Cancelled",
    statusDate: localized("08 May 2024", "08 मई 2024"),
  },
] as const;

export const productFormLabels: Record<
  MarketplaceProduct["form"],
  LocalizedText
> = {
  Prilled: localized("Prilled", "प्रिल्ड"),
  Liquid: localized("Liquid", "तरल"),
};

export const productStockLabels: Record<
  MarketplaceProduct["stock"],
  LocalizedText
> = {
  "In Stock": localized("In Stock", "स्टॉक में"),
  "Limited Stock": localized("Limited Stock", "सीमित स्टॉक"),
};

export const orderStatusLabels: Record<
  MarketplaceOrder["status"],
  LocalizedText
> = {
  Delivered: localized("Delivered", "डिलीवर हो गया"),
  "In Transit": localized("In Transit", "रास्ते में"),
  Processing: localized("Processing", "प्रक्रिया में"),
  Cancelled: localized("Cancelled", "रद्द"),
};
