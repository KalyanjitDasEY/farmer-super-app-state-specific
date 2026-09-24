import { localized } from "@/i18n/localized-text";

const pestHindi: Record<string, string> = {
  "Yellow Stem Borer": "पीला तना छेदक",
  "Blast (Leaf)": "पत्ती ब्लास्ट",
  "Brown Planthopper": "भूरा फुदका",
  "Bacterial Leaf Blight": "जीवाणु पत्ती झुलसा",
  "Gall Midge": "गॉल मिज",
  "Sheath Blight": "शीथ ब्लाइट",
  "Insect Pest": "कीट",
  Disease: "रोग",
  "High Risk": "उच्च जोखिम",
  "Moderate Risk": "मध्यम जोखिम",
  "Low Risk": "कम जोखिम",
  "Warm and humid conditions": "गर्म और नम मौसम",
  "High humidity and heavy dew": "अधिक नमी और भारी ओस",
  "Warm weather and dry spells": "गर्म मौसम और सूखे अंतराल",
  "High humidity and rain splash": "अधिक नमी और बारिश की छींटें",
  "High humidity": "अधिक नमी",
  "High humidity and dense crop": "अधिक नमी और घनी फसल",
  "Larva bores into stem causing dead hearts and white heads.":
    "लार्वा तने में छेद कर मृत तना और सफेद बालियां पैदा करता है।",
  "Spindle-shaped lesions on leaves; severe attack reduces yield.":
    "पत्तियों पर तकली आकार के घाव; गंभीर प्रकोप से उपज घटती है।",
  "Sucks sap from the plant and causes hopper burn in severe attacks.":
    "पौधे का रस चूसता है और गंभीर प्रकोप में हॉपर बर्न करता है।",
  "Yellowing of leaf margins that can lead to drying of leaves.":
    "पत्ती किनारों का पीलापन जो पत्तियों को सुखा सकता है।",
  "Midges cause gall formation on spikelets and shriveled grains.":
    "मिज बालियों पर गांठ और सिकुड़े दाने बनाते हैं।",
  "Irregular lesions on the sheath with whitish fungal growth.":
    "पत्ती आवरण पर अनियमित घाव और सफेद फफूंद वृद्धि।",
  "Tillering – Panicle Initiation": "कल्ले निकलने से बाली बनने तक",
  "Tillering – Flowering": "कल्ले निकलने से फूल आने तक",
  "Tillering – Milk": "कल्ले निकलने से दूधिया अवस्था तक",
  "Panicle Initiation – Flowering": "बाली बनने से फूल आने तक",
  "Tillering – Booting": "कल्ले निकलने से बूटिंग तक",
  "Paddy (Dhan)": "धान",
  Wheat: "गेहूं",
  Maize: "मक्का",
  Cotton: "कपास",
  Sugarcane: "गन्ना",
  Mustard: "सरसों",
};
export const pestText = (value: string) =>
  localized(value, pestHindi[value] ?? value);

export type RiskLevel = "High Risk" | "Moderate Risk" | "Low Risk";

export interface PestRisk {
  slug: string;
  title: string;
  scientificName: string;
  category: "Insect Pest" | "Disease";
  description: string;
  stage: string;
  condition: string;
  risk: RiskLevel;
  image: string;
}

export const pestRisks: readonly PestRisk[] = [
  {
    slug: "yellow-stem-borer",
    title: "Yellow Stem Borer",
    scientificName: "Scirpophaga incertulas",
    category: "Insect Pest",
    description: "Larva bores into stem causing dead hearts and white heads.",
    stage: "Tillering – Panicle Initiation",
    condition: "Warm and humid conditions",
    risk: "High Risk",
    image: "/images/authenticated/pest-disease/yellow-stem-borer.jpg",
  },
  {
    slug: "blast-leaf",
    title: "Blast (Leaf)",
    scientificName: "Magnaporthe oryzae",
    category: "Disease",
    description:
      "Spindle-shaped lesions on leaves; severe attack reduces yield.",
    stage: "Tillering – Flowering",
    condition: "High humidity and heavy dew",
    risk: "High Risk",
    image: "/images/authenticated/pest-disease/blast-leaf.jpg",
  },
  {
    slug: "brown-planthopper",
    title: "Brown Planthopper",
    scientificName: "Nilaparvata lugens",
    category: "Insect Pest",
    description:
      "Sucks sap from the plant and causes hopper burn in severe attacks.",
    stage: "Tillering – Milk",
    condition: "Warm weather and dry spells",
    risk: "High Risk",
    image: "/images/authenticated/pest-disease/brown-planthopper.jpg",
  },
  {
    slug: "bacterial-leaf-blight",
    title: "Bacterial Leaf Blight",
    scientificName: "Xanthomonas oryzae pv. oryzae",
    category: "Disease",
    description: "Yellowing of leaf margins that can lead to drying of leaves.",
    stage: "Tillering – Panicle Initiation",
    condition: "High humidity and rain splash",
    risk: "Moderate Risk",
    image: "/images/authenticated/pest-disease/bacterial-leaf-blight.jpg",
  },
  {
    slug: "gall-midge",
    title: "Gall Midge",
    scientificName: "Orseolia oryzae",
    category: "Insect Pest",
    description:
      "Midges cause gall formation on spikelets and shriveled grains.",
    stage: "Panicle Initiation – Flowering",
    condition: "High humidity",
    risk: "Low Risk",
    image: "/images/authenticated/pest-disease/gall-midge.jpg",
  },
  {
    slug: "sheath-blight",
    title: "Sheath Blight",
    scientificName: "Rhizoctonia solani",
    category: "Disease",
    description: "Irregular lesions on the sheath with whitish fungal growth.",
    stage: "Tillering – Booting",
    condition: "High humidity and dense crop",
    risk: "Low Risk",
    image: "/images/authenticated/pest-disease/sheath-blight.jpg",
  },
] as const;

export const cropOptions = [
  {
    name: "Paddy (Dhan)",
    image: "/images/authenticated/pest-disease/crop-paddy.jpg",
  },
  { name: "Wheat", image: "/images/authenticated/pest-disease/crop-wheat.jpg" },
  { name: "Maize", image: "/images/authenticated/pest-disease/crop-maize.jpg" },
  {
    name: "Cotton",
    image: "/images/authenticated/pest-disease/crop-cotton.jpg",
  },
  {
    name: "Sugarcane",
    image: "/images/authenticated/pest-disease/crop-sugarcane.jpg",
  },
  {
    name: "Mustard",
    image: "/images/authenticated/pest-disease/crop-mustard.jpg",
  },
] as const;
