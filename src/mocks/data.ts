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
      text("Land record (Khata/Khesra)", "भूमि रिकॉर्ड (खाता/खेसरा)"),
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
    id: "bihar-irrigation",
    code: "BI-IRR-DEMO",
    jurisdiction: "bihar",
    category: "irrigation",
    title: text(
      "Bihar Irrigation Support (Demo)",
      "बिहार सिंचाई सहायता (डेमो)",
    ),
    summary: text(
      "Support for water harvesting and irrigation structures.",
      "जल संचयन और सिंचाई संरचनाओं के लिए सहायता।",
    ),
    benefit: text("Check official guidelines", "आधिकारिक दिशा-निर्देश देखें"),
    purpose: text(
      "Improve local water security.",
      "स्थानीय जल सुरक्षा बेहतर करना।",
    ),
    description: text(
      "Illustrative support for approved water conservation works.",
      "स्वीकृत जल संरक्षण कार्यों के लिए सांकेतिक सहायता।",
    ),
    eligibility: [text("Bihar resident farmer.", "बिहार निवासी किसान।")],
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
    id: "bihar-crop-support",
    code: "BI-CROP-DEMO",
    jurisdiction: "bihar",
    category: "insurance",
    title: text("Bihar Crop Support (Demo)", "बिहार फसल सहायता (डेमो)"),
    summary: text(
      "Illustrative crop-risk support for Bihar farmers.",
      "बिहार के किसानों के लिए सांकेतिक फसल जोखिम सहायता।",
    ),
    benefit: text("Check official guidelines", "आधिकारिक दिशा-निर्देश देखें"),
    purpose: text("Reduce crop-risk impact.", "फसल जोखिम का प्रभाव कम करना।"),
    description: text(
      "Illustrative insurance support.",
      "सांकेतिक बीमा सहायता।",
    ),
    eligibility: [text("Bihar farmer.", "बिहार का किसान।")],
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
    code: "BI-LIVE-DEMO",
    jurisdiction: "bihar",
    category: "livestock",
    title: text("Bihar Livestock Support (Demo)", "बिहार पशुधन सहायता (डेमो)"),
    summary: text(
      "Illustrative support for dairy and livestock development.",
      "डेयरी और पशुधन विकास के लिए सांकेतिक सहायता।",
    ),
    benefit: text("Check official guidelines", "आधिकारिक दिशा-निर्देश देखें"),
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
    name: text("Agriculture Department, Bihar", "कृषि विभाग, बिहार"),
    description: text(
      "Crop production, extension, and farmer support.",
      "फसल उत्पादन, विस्तार और किसान सहायता।",
    ),
    type: "department",
    available: true,
  },
  {
    id: "horticulture",
    name: text("Directorate of Horticulture, Bihar", "उद्यान निदेशालय, बिहार"),
    description: text(
      "Fruits, vegetables, spices, and flowers.",
      "फल, सब्जियां, मसाले और फूल।",
    ),
    type: "department",
    available: true,
  },
  {
    id: "marketing",
    name: text("Agriculture Marketing (Demo)", "कृषि विपणन (डेमो)"),
    description: text("Markets, mandis, and trade.", "बाजार, मंडी और व्यापार।"),
    type: "department",
    available: true,
  },
  {
    id: "bihar-marketing",
    name: text("Bihar Market Services (Demo)", "बिहार बाजार सेवाएं (डेमो)"),
    description: text(
      "Market infrastructure and farmer welfare.",
      "बाजार ढांचा और किसान कल्याण।",
    ),
    type: "agency",
    available: true,
  },
  {
    id: "bihar-recruitment",
    name: text("Agriculture Recruitment (Demo)", "कृषि भर्ती (डेमो)"),
    description: text(
      "Recruitment information for relevant services.",
      "संबंधित सेवाओं की भर्ती जानकारी।",
    ),
    type: "agency",
    available: false,
  },
  {
    id: "bihar-seeds",
    name: text("Bihar Seed Services (Demo)", "बिहार बीज सेवाएं (डेमो)"),
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
  farmerId: "BR23F12345678",
  aadhaarMasked: "XXXX XXXX 9012",
  landAreaHectares: 3.62,
  khasraCount: 8,
  applicationCount: 4,
  benefitAmount: 6_000,
  temperatureCelsius: 32,
  mandiPrices: [
    { commodity: text("Wheat", "गेहूं"), price: 2_275, change: 25 },
    { commodity: text("Paddy", "धान"), price: 2_320, change: 40 },
    { commodity: text("Maize", "मक्का"), price: 2_140, change: -10 },
  ],
  updatedAt: "2026-09-22T09:15:00+05:30",
};

export const mockLocations: {
  districts: AdministrativeArea[];
  tehsils: AdministrativeArea[];
  villages: AdministrativeArea[];
} = {
  districts: [
    { id: "patna", name: text("Patna", "पटना") },
    { id: "nalanda", name: text("Nalanda", "नालंदा") },
    { id: "muzaffarpur", name: text("Muzaffarpur", "मुजफ्फरपुर") },
  ],
  tehsils: [
    { id: "bihta", parentId: "patna", name: text("Bihta", "बिहटा") },
    { id: "danapur", parentId: "patna", name: text("Danapur", "दानापुर") },
    {
      id: "silao",
      parentId: "nalanda",
      name: text("Silao", "सिलाव"),
    },
    { id: "kanti", parentId: "muzaffarpur", name: text("Kanti", "कांटी") },
  ],
  villages: [
    { id: "amhara", parentId: "bihta", name: text("Amhara", "अमहरा") },
    { id: "kanhauli", parentId: "bihta", name: text("Kanhauli", "कन्हौली") },
    { id: "shahpur", parentId: "danapur", name: text("Shahpur", "शाहपुर") },
    {
      id: "nanand",
      parentId: "silao",
      name: text("Nanand", "नानंद"),
    },
    { id: "panapur", parentId: "kanti", name: text("Panapur", "पनापुर") },
  ],
};

export const mockBeneficiaryStatus: BeneficiaryStatus = {
  schemeId: "pm-kisan",
  registrationNumberMasked: "BR20XXXXXXXXXX",
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
