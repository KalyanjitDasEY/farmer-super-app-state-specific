export type AnimalStatus =
  | "Active"
  | "Under Review"
  | "Correction Required"
  | "Reserved"
  | "Sold"
  | "Draft"
  | "Rejected";

export const animalStatusText: Record<AnimalStatus, LocalizedText> = {
  Active: localized("Active", "सक्रिय"),
  "Under Review": localized("Under Review", "समीक्षाधीन"),
  "Correction Required": localized("Correction Required", "सुधार आवश्यक"),
  Reserved: localized("Reserved", "आरक्षित"),
  Sold: localized("Sold", "बिक चुका"),
  Draft: localized("Draft", "मसौदा"),
  Rejected: localized("Rejected", "अस्वीकृत"),
};

export interface AnimalListing {
  slug: string;
  name: LocalizedText;
  breed: string;
  category: LocalizedText;
  age: LocalizedText;
  production: LocalizedText;
  extra: LocalizedText;
  price: string;
  seller: string;
  rating: string;
  reviews: number;
  distance: LocalizedText;
  location: LocalizedText;
  image: string;
  status?: AnimalStatus;
}

export const animals: readonly AnimalListing[] = [
  {
    slug: "hf-cow",
    name: localized("HF Cow", "HF गाय"),
    breed: "HF (Holstein Friesian)",
    category: localized("Milking", "दुधारू"),
    age: localized("3 Years 2 Months", "3 वर्ष 2 महीने"),
    production: localized("22–25 Ltr/Day", "22–25 लीटर/दिन"),
    extra: localized("Pregnant: 3 Months", "गर्भवती: 3 महीने"),
    price: "₹78,000",
    seller: "Suresh Dairy Farm",
    rating: "4.6",
    reviews: 28,
    distance: localized("5 km away", "5 किमी दूर"),
    location: localized(
      "Amhara, Bihta, Patna, Bihar",
      "अमहरा, बिहटा, पटना, बिहार",
    ),
    image: "/images/authenticated/pashu-bazaar/hf-cow.jpg",
    status: "Active",
  },
  {
    slug: "sahiwal-cow",
    name: localized("Sahiwal Cow", "साहीवाल गाय"),
    breed: "Sahiwal",
    category: localized("Milking", "दुधारू"),
    age: localized("4 Years", "4 वर्ष"),
    production: localized("15–18 Ltr/Day", "15–18 लीटर/दिन"),
    extra: localized("Pregnant: 2 Months", "गर्भवती: 2 महीने"),
    price: "₹65,000",
    seller: "Gopal Livestock Farm",
    rating: "4.5",
    reviews: 19,
    distance: localized("8 km away", "8 किमी दूर"),
    location: localized("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/sahiwal-cow.jpg",
    status: "Under Review",
  },
  {
    slug: "murrah-buffalo",
    name: localized("Murrah Buffalo", "मुर्रा भैंस"),
    breed: "Murrah",
    category: localized("Milking", "दुधारू"),
    age: localized("4 Years 6 Months", "4 वर्ष 6 महीने"),
    production: localized("16–18 Ltr/Day", "16–18 लीटर/दिन"),
    extra: localized("Pregnant: 4 Months", "गर्भवती: 4 महीने"),
    price: "₹92,000",
    seller: "Krishna Dairy Farm",
    rating: "4.7",
    reviews: 36,
    distance: localized("6 km away", "6 किमी दूर"),
    location: localized(
      "Shahpur, Bihta, Patna, Bihar",
      "शाहपुर, बिहटा, पटना, बिहार",
    ),
    image: "/images/authenticated/pashu-bazaar/murrah-buffalo.jpg",
    status: "Reserved",
  },
  {
    slug: "gir-cow",
    name: localized("Gir Cow", "गिर गाय"),
    breed: "Gir",
    category: localized("Milking", "दुधारू"),
    age: localized("2 Years 8 Months", "2 वर्ष 8 महीने"),
    production: localized("10–12 Ltr/Day", "10–12 लीटर/दिन"),
    extra: localized("Pregnant: 2 Months", "गर्भवती: 2 महीने"),
    price: "₹55,000",
    seller: "Gir Gaushala",
    rating: "4.4",
    reviews: 17,
    distance: localized("12 km away", "12 किमी दूर"),
    location: localized("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/gir-cow.jpg",
    status: "Correction Required",
  },
  {
    slug: "murrah-buffalo-two",
    name: localized("Murrah Buffalo", "मुर्रा भैंस"),
    breed: "Murrah",
    category: localized("Milking", "दुधारू"),
    age: localized("3 Years", "3 वर्ष"),
    production: localized("14–16 Ltr/Day", "14–16 लीटर/दिन"),
    extra: localized("Pregnant: 3 Months", "गर्भवती: 3 महीने"),
    price: "₹88,000",
    seller: "Verma Dairy Farm",
    rating: "4.6",
    reviews: 22,
    distance: localized("9 km away", "9 किमी दूर"),
    location: localized("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/murrah-buffalo-2.jpg",
  },
  {
    slug: "jersey-cow",
    name: localized("Jersey Cow", "जर्सी गाय"),
    breed: "Jersey",
    category: localized("Milking", "दुधारू"),
    age: localized("5 Years", "5 वर्ष"),
    production: localized("12–14 Ltr/Day", "12–14 लीटर/दिन"),
    extra: localized("Pregnant: 4 Months", "गर्भवती: 4 महीने"),
    price: "₹72,000",
    seller: "Shiv Dairy Farm",
    rating: "4.5",
    reviews: 15,
    distance: localized("7 km away", "7 किमी दूर"),
    location: localized("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/jersey-cow.jpg",
  },
  {
    slug: "sahiwal-bull",
    name: localized("Sahiwal Bull", "साहीवाल बैल"),
    breed: "Sahiwal",
    category: localized("Breeding", "प्रजनन"),
    age: localized("3 Years 6 Months", "3 वर्ष 6 महीने"),
    production: localized("≈450 kg", "≈450 किग्रा"),
    extra: localized("Breed Quality: Pure", "नस्ल गुणवत्ता: शुद्ध"),
    price: "₹1,05,000",
    seller: "Sharma Cattle Farm",
    rating: "4.6",
    reviews: 18,
    distance: localized("10 km away", "10 किमी दूर"),
    location: localized("Danapur, Patna, Bihar", "दानापुर, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/sahiwal-bull.jpg",
  },
  {
    slug: "hf-cow-two",
    name: localized("HF Cow", "HF गाय"),
    breed: "HF",
    category: localized("Milking", "दुधारू"),
    age: localized("2 Years 4 Months", "2 वर्ष 4 महीने"),
    production: localized("18–20 Ltr/Day", "18–20 लीटर/दिन"),
    extra: localized("Pregnant: 1 Month", "गर्भवती: 1 महीना"),
    price: "₹70,000",
    seller: "Kisan Dairy Co-op",
    rating: "4.5",
    reviews: 21,
    distance: localized("4 km away", "4 किमी दूर"),
    location: localized(
      "Amhara, Bihta, Patna, Bihar",
      "अमहरा, बिहटा, पटना, बिहार",
    ),
    image: "/images/authenticated/pashu-bazaar/hf-cow-2.jpg",
  },
  {
    slug: "banni-buffalo",
    name: localized("Banni Buffalo", "बन्नी भैंस"),
    breed: "Banni",
    category: localized("Milking", "दुधारू"),
    age: localized("5 Years", "5 वर्ष"),
    production: localized("8–10 Ltr/Day", "8–10 लीटर/दिन"),
    extra: localized("Pregnant: 5 Months", "गर्भवती: 5 महीने"),
    price: "₹60,000",
    seller: "Nalanda Livestock Farm",
    rating: "4.3",
    reviews: 11,
    distance: localized("80 km away", "80 किमी दूर"),
    location: localized("Nalanda, Bihar", "नालंदा, बिहार"),
    image: "/images/authenticated/pashu-bazaar/banni-buffalo.jpg",
  },
  {
    slug: "beetal-goat",
    name: localized("Beetal Goat", "बीटल बकरी"),
    breed: "Beetal",
    category: localized("Breeding", "प्रजनन"),
    age: localized("1 Year 6 Months", "1 वर्ष 6 महीने"),
    production: localized("≈32 kg", "≈32 किग्रा"),
    extra: localized("Gender: Male", "लिंग: नर"),
    price: "₹14,500",
    seller: "Pathan Goat Farm",
    rating: "4.4",
    reviews: 13,
    distance: localized("6 km away", "6 किमी दूर"),
    location: localized(
      "Shahpur, Bihta, Patna, Bihar",
      "शाहपुर, बिहटा, पटना, बिहार",
    ),
    image: "/images/authenticated/pashu-bazaar/beetal-goat.jpg",
    status: "Sold",
  },
  {
    slug: "jamunapari-goat",
    name: localized("Jamunapari Goat", "जमुनापारी बकरी"),
    breed: "Jamunapari",
    category: localized("Breeding", "प्रजनन"),
    age: localized("1 Year 8 Months", "1 वर्ष 8 महीने"),
    production: localized("≈28 kg", "≈28 किग्रा"),
    extra: localized("Gender: Female", "लिंग: मादा"),
    price: "₹16,000",
    seller: "Aziz Goat Farm",
    rating: "4.5",
    reviews: 16,
    distance: localized("8 km away", "8 किमी दूर"),
    location: localized("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/jamunapari-goat.jpg",
    status: "Draft",
  },
  {
    slug: "malpura-sheep",
    name: localized("Local Sheep", "स्थानीय भेड़"),
    breed: "Local",
    category: localized("Breeding", "प्रजनन"),
    age: localized("1 Year", "1 वर्ष"),
    production: localized("≈35 kg", "≈35 किग्रा"),
    extra: localized("Gender: Male", "लिंग: नर"),
    price: "₹9,500",
    seller: "Bihta Sheep Farm",
    rating: "4.2",
    reviews: 9,
    distance: localized("10 km away", "10 किमी दूर"),
    location: localized("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार"),
    image: "/images/authenticated/pashu-bazaar/malpura-sheep.jpg",
    status: "Rejected",
  },
] as const;

export const animalCategories = [
  {
    name: "Cattle",
    label: localized("Cattle", "गाय-बैल"),
    count: "1,245",
    image: "/images/authenticated/pashu-bazaar/hf-cow.jpg",
  },
  {
    name: "Buffalo",
    label: localized("Buffalo", "भैंस"),
    count: "856",
    image: "/images/authenticated/pashu-bazaar/murrah-buffalo.jpg",
  },
  {
    name: "Goat",
    label: localized("Goat", "बकरी"),
    count: "1,532",
    image: "/images/authenticated/pashu-bazaar/beetal-goat.jpg",
  },
  {
    name: "Sheep",
    label: localized("Sheep", "भेड़"),
    count: "612",
    image: "/images/authenticated/pashu-bazaar/malpura-sheep.jpg",
  },
  {
    name: "Poultry",
    label: localized("Poultry", "मुर्गी पालन"),
    count: "1,120",
    image: "/images/authenticated/dashboard-wheat.jpg",
  },
] as const;
import { localized, type LocalizedText } from "@/i18n/localized-text";
