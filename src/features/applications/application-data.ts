import type {
  DashboardSnapshot,
  LocalizedText,
  SchemeCategory,
  SchemeDetail,
} from "@/domain/models";

export type FarmerApplicationProfile = {
  personal: {
    fullName: LocalizedText;
    farmerId: string;
    janAadhaar: string;
    mobile: string;
    dateOfBirth: LocalizedText;
    gender: LocalizedText;
    category: LocalizedText;
  };
  address: {
    addressLine: LocalizedText;
    village: LocalizedText;
    tehsil: LocalizedText;
    district: LocalizedText;
    state: LocalizedText;
    pinCode: string;
  };
  land: {
    area: string;
    khasraCount: string;
    ownership: LocalizedText;
    crops: LocalizedText;
  };
  bank: {
    bankName: LocalizedText;
    branch: LocalizedText;
    accountNumber: string;
    ifsc: string;
    aadhaarSeeded: LocalizedText;
    ekycStatus: LocalizedText;
  };
};

export type ApplicationDocumentRequirement = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  source: "profile" | "upload";
  required: boolean;
  acceptedFormats: LocalizedText;
};

const text = (en: string, hi: string): LocalizedText => ({ en, hi });
const uploadFormats = text(
  "PDF, JPG or PNG · Max 5 MB",
  "PDF, JPG या PNG · अधिकतम 5 MB",
);

export function buildFarmerApplicationProfile(
  snapshot: DashboardSnapshot,
): FarmerApplicationProfile {
  return {
    personal: {
      fullName: snapshot.farmerName,
      farmerId: snapshot.farmerId,
      janAadhaar: snapshot.janAadhaarMasked,
      mobile: "+91 98XXXXXX56",
      dateOfBirth: text("14 August 1984", "14 अगस्त 1984"),
      gender: text("Male", "पुरुष"),
      category: text("Small farmer", "लघु किसान"),
    },
    address: {
      addressLine: text(
        "Ward 8, Near Gram Panchayat",
        "वार्ड 8, ग्राम पंचायत के पास",
      ),
      village: text("Morija", "मोरीजा"),
      tehsil: text("Chomu", "चौमूं"),
      district: text("Jaipur", "जयपुर"),
      state: text("Rajasthan", "राजस्थान"),
      pinCode: "303702",
    },
    land: {
      area: `${snapshot.landAreaHectares.toFixed(2)} ha`,
      khasraCount: String(snapshot.khasraCount),
      ownership: text(
        "Self-owned and digitally verified",
        "स्वामित्व एवं डिजिटल सत्यापित",
      ),
      crops: text("Wheat, mustard and chickpea", "गेहूं, सरसों और चना"),
    },
    bank: {
      bankName: text("Bank of Baroda", "बैंक ऑफ बड़ौदा"),
      branch: text("Chomu, Jaipur", "चौमूं, जयपुर"),
      accountNumber: "XXXX XXXX 9876",
      ifsc: "BARB0CHOMUX",
      aadhaarSeeded: text("Linked and verified", "लिंक एवं सत्यापित"),
      ekycStatus: text("Completed on 12 May 2026", "12 मई 2026 को पूर्ण"),
    },
  };
}

const commonDocuments: ApplicationDocumentRequirement[] = [
  {
    id: "farmer-identity",
    name: text("Farmer identity and Jan Aadhaar", "किसान पहचान एवं जन आधार"),
    description: text(
      "Verified identity from your Raj Kisan profile.",
      "आपकी राज किसान प्रोफाइल से सत्यापित पहचान।",
    ),
    source: "profile",
    required: true,
    acceptedFormats: text("Verified digital record", "सत्यापित डिजिटल रिकॉर्ड"),
  },
  {
    id: "land-record",
    name: text(
      "Digital land record / Jamabandi",
      "डिजिटल भूमि रिकॉर्ड / जमाबंदी",
    ),
    description: text(
      "Linked land record containing 8 Khasra entries.",
      "8 खसरा प्रविष्टियों वाला लिंक किया गया भूमि रिकॉर्ड।",
    ),
    source: "profile",
    required: true,
    acceptedFormats: text("Verified digital record", "सत्यापित डिजिटल रिकॉर्ड"),
  },
  {
    id: "bank-proof",
    name: text("Bank account proof", "बैंक खाता प्रमाण"),
    description: text(
      "Aadhaar-seeded Bank of Baroda account ending in 9876.",
      "9876 पर समाप्त आधार-लिंक बैंक ऑफ बड़ौदा खाता।",
    ),
    source: "profile",
    required: true,
    acceptedFormats: text("Verified digital record", "सत्यापित डिजिटल रिकॉर्ड"),
  },
];

const categoryDocuments: Record<
  SchemeCategory,
  ApplicationDocumentRequirement[]
> = {
  equipment: [
    {
      id: "equipment-quotation",
      name: text(
        "Machinery quotation / Proforma invoice",
        "मशीनरी कोटेशन / प्रोफार्मा इनवॉइस",
      ),
      description: text(
        "Quotation from an approved machinery dealer showing model and price.",
        "मॉडल एवं मूल्य सहित अनुमोदित मशीनरी विक्रेता का कोटेशन।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
    {
      id: "equipment-declaration",
      name: text("Farmer machinery declaration", "किसान मशीनरी घोषणा-पत्र"),
      description: text(
        "Signed declaration confirming the proposed machinery purchase.",
        "प्रस्तावित मशीनरी खरीद की पुष्टि करने वाला हस्ताक्षरित घोषणा-पत्र।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  income: [
    {
      id: "income-declaration",
      name: text("Beneficiary self-declaration", "लाभार्थी स्व-घोषणा"),
      description: text(
        "Signed declaration confirming eligibility and exclusion conditions.",
        "पात्रता एवं अपवर्जन शर्तों की पुष्टि करने वाला हस्ताक्षरित घोषणा-पत्र।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  irrigation: [
    {
      id: "site-plan",
      name: text(
        "Site plan and field photographs",
        "स्थल योजना एवं खेत के फोटो",
      ),
      description: text(
        "Current photographs and a basic plan of the proposed irrigation site.",
        "प्रस्तावित सिंचाई स्थल के वर्तमान फोटो एवं मूल योजना।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
    {
      id: "project-estimate",
      name: text("Project cost estimate", "परियोजना लागत अनुमान"),
      description: text(
        "Estimate from an authorised supplier or contractor.",
        "अधिकृत आपूर्तिकर्ता या ठेकेदार से प्राप्त अनुमान।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  insurance: [
    {
      id: "crop-certificate",
      name: text("Crop sowing certificate", "फसल बुवाई प्रमाण-पत्र"),
      description: text(
        "Current-season crop and sowing details issued or countersigned locally.",
        "स्थानीय रूप से जारी या प्रतिहस्ताक्षरित वर्तमान मौसम की फसल एवं बुवाई जानकारी।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  livestock: [
    {
      id: "animal-record",
      name: text(
        "Animal photograph and health record",
        "पशु फोटो एवं स्वास्थ्य रिकॉर्ड",
      ),
      description: text(
        "Recent animal photograph with veterinary health or vaccination record.",
        "पशु का हाल का फोटो एवं पशु चिकित्सा स्वास्थ्य या टीकाकरण रिकॉर्ड।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  production: [
    {
      id: "production-plan",
      name: text("Crop production plan", "फसल उत्पादन योजना"),
      description: text(
        "Crop, season, area and proposed activity details.",
        "फसल, मौसम, क्षेत्र एवं प्रस्तावित गतिविधि का विवरण।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  marketing: [
    {
      id: "produce-record",
      name: text("Produce and sale details", "उपज एवं बिक्री विवरण"),
      description: text(
        "Recent produce quantity, quality and proposed market information.",
        "हाल की उपज मात्रा, गुणवत्ता एवं प्रस्तावित बाजार की जानकारी।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  soil: [
    {
      id: "field-map",
      name: text("Field map / sample location", "खेत नक्शा / नमूना स्थान"),
      description: text(
        "Map or photograph identifying the field for the requested soil service.",
        "मांगी गई मृदा सेवा के लिए खेत की पहचान करने वाला नक्शा या फोटो।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
  other: [
    {
      id: "scheme-declaration",
      name: text("Scheme declaration", "योजना घोषणा-पत्र"),
      description: text(
        "Signed declaration requested for this scheme.",
        "इस योजना के लिए आवश्यक हस्ताक्षरित घोषणा-पत्र।",
      ),
      source: "upload",
      required: true,
      acceptedFormats: uploadFormats,
    },
  ],
};

const recognizedProfileDocument = (name: string) => {
  const normalized = name.toLocaleLowerCase("en");
  if (/identity|aadhaar/.test(normalized)) return "farmer-identity";
  if (/land|jamabandi|khasra/.test(normalized)) return "land-record";
  if (/bank|passbook/.test(normalized)) return "bank-proof";
  return null;
};

export function getApplicationDocumentRequirements(
  scheme: SchemeDetail,
): ApplicationDocumentRequirement[] {
  const schemeSpecific = scheme.documents.flatMap((document, index) => {
    const profileDocumentId = recognizedProfileDocument(document.en);
    if (profileDocumentId) return [];
    return [
      {
        id: `scheme-document-${index + 1}`,
        name: document,
        description: text(
          "This document is specifically requested by the selected scheme.",
          "यह दस्तावेज विशेष रूप से चयनित योजना के लिए आवश्यक है।",
        ),
        source: "upload" as const,
        required: true,
        acceptedFormats: uploadFormats,
      },
    ];
  });

  const documents = [
    ...commonDocuments,
    ...schemeSpecific,
    ...categoryDocuments[scheme.category],
  ];

  return documents.filter(
    (document, index) =>
      documents.findIndex((item) => item.id === document.id) === index,
  );
}
