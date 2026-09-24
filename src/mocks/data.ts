import type {
  AdministrativeArea,
  BeneficiaryStatus,
  DashboardSnapshot,
  Department,
  SchemeDetail,
} from "@/domain/models";

const text = (en: string, hi: string) => ({ en, hi });

export const mockSchemes: SchemeDetail[] = [
  {
    id: "pm-kisan",
    code: "PMKISAN",
    jurisdiction: "central",
    category: "income",
    title: text("PM-KISAN Samman Nidhi", "पीएम-किसान सम्मान निधि"),
    summary: text(
      "Income support for eligible landholding farmer families.",
      "पात्र भूमिधारक किसान परिवारों के लिए आय सहायता।",
    ),
    benefit: text("₹6,000 per year", "₹6,000 प्रति वर्ष"),
    purpose: text(
      "Support the financial needs of small and marginal farmer families.",
      "छोटे और सीमांत किसान परिवारों की आर्थिक जरूरतों में सहायता।",
    ),
    description: text(
      "Eligible families receive three equal installments through Direct Benefit Transfer after verification.",
      "सत्यापन के बाद पात्र परिवारों को प्रत्यक्ष लाभ अंतरण से तीन समान किस्तें मिलती हैं।",
    ),
    eligibility: [
      text(
        "Landholding farmer family with cultivable land.",
        "खेती योग्य भूमि वाला किसान परिवार।",
      ),
      text(
        "Valid identity linked with mobile and bank account.",
        "मोबाइल और बैंक खाते से जुड़ी वैध पहचान।",
      ),
      text(
        "Land records must pass official verification.",
        "भूमि रिकॉर्ड का आधिकारिक सत्यापन जरूरी है।",
      ),
    ],
    documents: [
      text("Aadhaar card", "आधार कार्ड"),
      text("Land record (Khasra/Khatauni)", "भूमि रिकॉर्ड (खसरा/खतौनी)"),
      text("Bank account details", "बैंक खाते का विवरण"),
      text("Recent photograph if requested", "मांगे जाने पर हाल का फोटो"),
    ],
    features: [
      text("Direct Benefit Transfer", "प्रत्यक्ष लाभ अंतरण"),
      text("Three installments of ₹2,000", "₹2,000 की तीन किस्तें"),
      text("Nationwide central scheme", "देशव्यापी केंद्रीय योजना"),
    ],
    updatedAt: "2026-09-18T09:15:00+05:30",
  },
  {
    id: "jal-swavalamban",
    code: "MJSY",
    jurisdiction: "rajasthan",
    category: "irrigation",
    title: text(
      "Mukhyamantri Jal Swavalamban Abhiyan",
      "मुख्यमंत्री जल स्वावलंबन अभियान",
    ),
    summary: text(
      "Support for water harvesting and irrigation structures.",
      "जल संचयन और सिंचाई संरचनाओं के लिए सहायता।",
    ),
    benefit: text("Up to 50% of project cost", "परियोजना लागत का 50% तक"),
    purpose: text(
      "Improve local water security.",
      "स्थानीय जल सुरक्षा बेहतर करना।",
    ),
    description: text(
      "Illustrative support for approved water conservation works.",
      "स्वीकृत जल संरक्षण कार्यों के लिए सांकेतिक सहायता।",
    ),
    eligibility: [text("Rajasthan resident farmer.", "राजस्थान निवासी किसान।")],
    documents: [text("Land record", "भूमि रिकॉर्ड")],
    features: [text("Water conservation", "जल संरक्षण")],
    updatedAt: "2026-09-15T10:00:00+05:30",
  },
  {
    id: "smam",
    code: "SMAM",
    jurisdiction: "central",
    category: "equipment",
    title: text(
      "Sub-Mission on Agricultural Mechanization",
      "कृषि यंत्रीकरण उप-मिशन",
    ),
    summary: text(
      "Support for purchasing approved farm machinery.",
      "स्वीकृत कृषि मशीनरी खरीदने के लिए सहायता।",
    ),
    benefit: text("Up to 40% subsidy", "40% तक सब्सिडी"),
    purpose: text(
      "Improve access to machinery.",
      "मशीनरी तक पहुंच बेहतर करना।",
    ),
    description: text(
      "Illustrative machinery support.",
      "सांकेतिक मशीनरी सहायता।",
    ),
    eligibility: [text("Eligible farmer applicant.", "पात्र किसान आवेदक।")],
    documents: [text("Farmer identity", "किसान पहचान")],
    features: [text("Approved equipment", "स्वीकृत उपकरण")],
    updatedAt: "2026-09-10T10:00:00+05:30",
  },
  {
    id: "rajasthan-kisan-bima",
    code: "RKB",
    jurisdiction: "rajasthan",
    category: "insurance",
    title: text("Rajasthan Kisan Bima Yojana", "राजस्थान किसान बीमा योजना"),
    summary: text(
      "Illustrative crop-risk protection for Rajasthan farmers.",
      "राजस्थान किसानों के लिए सांकेतिक फसल जोखिम सुरक्षा।",
    ),
    benefit: text("Premium support up to 80%", "प्रीमियम में 80% तक सहायता"),
    purpose: text("Reduce crop-risk impact.", "फसल जोखिम का प्रभाव कम करना।"),
    description: text(
      "Illustrative insurance support.",
      "सांकेतिक बीमा सहायता।",
    ),
    eligibility: [text("Rajasthan farmer.", "राजस्थान का किसान।")],
    documents: [text("Crop and land details", "फसल और भूमि विवरण")],
    features: [text("Risk protection", "जोखिम सुरक्षा")],
    updatedAt: "2026-09-08T10:00:00+05:30",
  },
  {
    id: "fasal-bima",
    code: "PMFBY",
    jurisdiction: "central",
    category: "insurance",
    title: text("PM Fasal Bima Yojana", "प्रधानमंत्री फसल बीमा योजना"),
    summary: text(
      "Crop insurance support against covered losses.",
      "कवर किए गए नुकसान के लिए फसल बीमा सहायता।",
    ),
    benefit: text("Financial protection", "वित्तीय सुरक्षा"),
    purpose: text("Protect covered crops.", "कवर की गई फसलों की सुरक्षा।"),
    description: text("Illustrative insurance listing.", "सांकेतिक बीमा सूची।"),
    eligibility: [text("Eligible notified crop.", "पात्र अधिसूचित फसल।")],
    documents: [text("Sowing declaration", "बुवाई घोषणा")],
    features: [text("Crop cover", "फसल कवर")],
    updatedAt: "2026-09-05T10:00:00+05:30",
  },
  {
    id: "pashudhan-vikas",
    code: "PVY",
    jurisdiction: "rajasthan",
    category: "livestock",
    title: text("Pashudhan Vikas Yojana", "पशुधन विकास योजना"),
    summary: text(
      "Illustrative support for dairy and livestock development.",
      "डेयरी और पशुधन विकास के लिए सांकेतिक सहायता।",
    ),
    benefit: text("Up to 50% subsidy", "50% तक सब्सिडी"),
    purpose: text(
      "Support livestock livelihoods.",
      "पशुधन आजीविका में सहायता।",
    ),
    description: text(
      "Illustrative livestock support.",
      "सांकेतिक पशुधन सहायता।",
    ),
    eligibility: [text("Livestock farmer.", "पशुपालक किसान।")],
    documents: [text("Livestock details", "पशुधन विवरण")],
    features: [text("Livelihood support", "आजीविका सहायता")],
    updatedAt: "2026-09-01T10:00:00+05:30",
  },
];

export const mockDepartments: Department[] = [
  {
    id: "agriculture",
    name: text("Agriculture Department", "कृषि विभाग"),
    description: text(
      "Crop production, extension, and farmer support.",
      "फसल उत्पादन, विस्तार और किसान सहायता।",
    ),
    type: "department",
    available: true,
  },
  {
    id: "horticulture",
    name: text("Horticulture Department", "उद्यानिकी विभाग"),
    description: text(
      "Fruits, vegetables, spices, and flowers.",
      "फल, सब्जियां, मसाले और फूल।",
    ),
    type: "department",
    available: true,
  },
  {
    id: "marketing",
    name: text("Agriculture Marketing Department", "कृषि विपणन विभाग"),
    description: text("Markets, mandis, and trade.", "बाजार, मंडी और व्यापार।"),
    type: "department",
    available: true,
  },
  {
    id: "rsamb",
    name: text(
      "Rajasthan State Agricultural Marketing Board",
      "राजस्थान राज्य कृषि विपणन बोर्ड",
    ),
    description: text(
      "Market infrastructure and farmer welfare.",
      "बाजार ढांचा और किसान कल्याण।",
    ),
    type: "agency",
    available: true,
  },
  {
    id: "rssc",
    name: text(
      "Rajasthan Staff Selection Commission",
      "राजस्थान कर्मचारी चयन आयोग",
    ),
    description: text(
      "Recruitment information for relevant services.",
      "संबंधित सेवाओं की भर्ती जानकारी।",
    ),
    type: "agency",
    available: false,
  },
  {
    id: "rssoca",
    name: text(
      "Rajasthan State Seeds & Organic Certification Agency",
      "राजस्थान राज्य बीज एवं जैविक प्रमाणीकरण संस्था",
    ),
    description: text(
      "Seed certification and quality control.",
      "बीज प्रमाणीकरण और गुणवत्ता नियंत्रण।",
    ),
    type: "agency",
    available: true,
  },
];

export const mockDashboard: DashboardSnapshot = {
  farmerName: text("Ramesh Kumar", "रमेश कुमार"),
  farmerId: "RJ23F12345678",
  janAadhaarMasked: "1234 5678 9012",
  landAreaHectares: 3.62,
  khasraCount: 8,
  applicationCount: 4,
  benefitAmount: 6_000,
  temperatureCelsius: 32,
  mandiPrices: [
    { commodity: text("Wheat", "गेहूं"), price: 2_275, change: 25 },
    { commodity: text("Mustard", "सरसों"), price: 5_620, change: 40 },
    { commodity: text("Gram", "चना"), price: 5_140, change: -10 },
  ],
  updatedAt: "2026-09-22T09:15:00+05:30",
};

export const mockLocations: {
  districts: AdministrativeArea[];
  tehsils: AdministrativeArea[];
  villages: AdministrativeArea[];
} = {
  districts: [
    { id: "jaipur", name: text("Jaipur", "जयपुर") },
    { id: "ajmer", name: text("Ajmer", "अजमेर") },
    { id: "jodhpur", name: text("Jodhpur", "जोधपुर") },
  ],
  tehsils: [
    { id: "sanganer", parentId: "jaipur", name: text("Sanganer", "सांगानेर") },
    { id: "chomu", parentId: "jaipur", name: text("Chomu", "चौमूं") },
    {
      id: "kishangarh",
      parentId: "ajmer",
      name: text("Kishangarh", "किशनगढ़"),
    },
    { id: "osian", parentId: "jodhpur", name: text("Osian", "ओसियां") },
  ],
  villages: [
    { id: "vatika", parentId: "sanganer", name: text("Vatika", "वाटिका") },
    { id: "kalwara", parentId: "sanganer", name: text("Kalwara", "कलवाड़ा") },
    { id: "morija", parentId: "chomu", name: text("Morija", "मोरीजा") },
    {
      id: "tilonia",
      parentId: "kishangarh",
      name: text("Tilonia", "तिलोनिया"),
    },
    { id: "khetasar", parentId: "osian", name: text("Khetasar", "खेतासर") },
  ],
};

export const mockBeneficiaryStatus: BeneficiaryStatus = {
  schemeId: "pm-kisan",
  registrationNumberMasked: "RJ20XXXXXXXXXX",
  farmerName: "Ramesh Kumar",
  aadhaarSeeded: true,
  ekycVerifiedAt: "2024-05-12T10:30:00+05:30",
  landAreaHectares: 3.62,
  khasraCount: 8,
  installments: [
    {
      sequence: 1,
      amount: 2_000,
      paidAt: "2024-06-15T10:00:00+05:30",
      bankReferenceMasked: "XXXXXX9876",
    },
    {
      sequence: 2,
      amount: 2_000,
      paidAt: "2024-10-15T10:00:00+05:30",
      bankReferenceMasked: "XXXXXX4321",
    },
    {
      sequence: 3,
      amount: 2_000,
      paidAt: "2025-02-15T10:00:00+05:30",
      bankReferenceMasked: "XXXXXX6789",
    },
  ],
};
