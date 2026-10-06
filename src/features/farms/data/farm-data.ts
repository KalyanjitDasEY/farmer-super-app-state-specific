import { localized, type LocalizedText } from "@/i18n/localized-text";

export type FarmField = {
  id: string;
  name: LocalizedText;
  khasra: LocalizedText;
  crop: LocalizedText;
  activity: LocalizedText;
  stage: "Growing" | "Tillering" | "Flowering" | "Grand Growth" | "Vegetative";
  area: number;
  image: string;
};

export type Farm = {
  id: string;
  name: LocalizedText;
  location: LocalizedText;
  area: number;
  primary?: boolean;
  image: string;
  fields: readonly FarmField[];
};

export const farms: readonly Farm[] = [
  {
    id: "ram-prasad",
    name: localized("Ram Prasad Farm", "राम प्रसाद फार्म"),
    location: localized(
      "Amhara, Bihta, Patna, Bihar",
      "अमहरा, बिहटा, पटना, बिहार",
    ),
    area: 8.25,
    primary: true,
    image: "/images/authenticated/farms/ram-prasad-farm.jpg",
    fields: [
      {
        id: "ram-field-1",
        name: localized("Field 1", "खेत 1"),
        khasra: localized("Khesra No. 112/1", "खेसरा नं. 112/1"),
        crop: localized("Wheat (HD 2967)", "गेहूं (HD 2967)"),
        activity: localized("Sowing: 20 Nov 2024", "बुवाई: 20 नव॰ 2024"),
        stage: "Growing",
        area: 2.5,
        image: "/images/authenticated/farms/wheat-field.jpg",
      },
      {
        id: "ram-field-2",
        name: localized("Field 2", "खेत 2"),
        khasra: localized("Khesra No. 112/2", "खेसरा नं. 112/2"),
        crop: localized("Paddy (Rajendra Mahsuri)", "धान (राजेंद्र महसूरी)"),
        activity: localized("Sowing: 10 Jun 2024", "बुवाई: 10 जून 2024"),
        stage: "Tillering",
        area: 3,
        image: "/images/authenticated/farms/paddy-field.jpg",
      },
      {
        id: "ram-field-3",
        name: localized("Field 3", "खेत 3"),
        khasra: localized("Khesra No. 112/3", "खेसरा नं. 112/3"),
        crop: localized("Mustard (Pusa Tarak)", "सरसों (पूसा तारक)"),
        activity: localized("Sowing: 05 Oct 2024", "बुवाई: 05 अक्तू॰ 2024"),
        stage: "Flowering",
        area: 2.75,
        image: "/images/authenticated/farms/mustard-field.jpg",
      },
    ],
  },
  {
    id: "shyam-singh",
    name: localized("Shyam Singh Farm", "श्याम सिंह फार्म"),
    location: localized("Danapur, Patna, Bihar", "दानापुर, पटना, बिहार"),
    area: 6.6,
    image: "/images/authenticated/farms/shyam-singh-farm.jpg",
    fields: [
      {
        id: "shyam-field-1",
        name: localized("Field 1", "खेत 1"),
        khasra: localized("Khesra No. 215/1", "खेसरा नं. 215/1"),
        crop: localized("Sugarcane (Co 0238)", "गन्ना (Co 0238)"),
        activity: localized("Planting: 15 Feb 2024", "रोपाई: 15 फ़र॰ 2024"),
        stage: "Grand Growth",
        area: 4,
        image: "/images/authenticated/farms/sugarcane-field.jpg",
      },
      {
        id: "shyam-field-2",
        name: localized("Field 2", "खेत 2"),
        khasra: localized("Khesra No. 215/2", "खेसरा नं. 215/2"),
        crop: localized("Chickpea (JG 11)", "चना (JG 11)"),
        activity: localized("Sowing: 18 Nov 2024", "बुवाई: 18 नव॰ 2024"),
        stage: "Vegetative",
        area: 2.6,
        image: "/images/authenticated/farms/chickpea-field.jpg",
      },
    ],
  },
  {
    id: "maa-sharda",
    name: localized("Maa Sharda Farm", "माँ शारदा फार्म"),
    location: localized("Nalanda, Bihar", "नालंदा, बिहार"),
    area: 3.55,
    image: "/images/authenticated/farms/maa-sharda-farm.jpg",
    fields: [
      {
        id: "sharda-field-1",
        name: localized("Field 1", "खेत 1"),
        khasra: localized("Khesra No. 304/1", "खेसरा नं. 304/1"),
        crop: localized("Paddy (Rajendra Mahsuri)", "धान (राजेंद्र महसूरी)"),
        activity: localized("Sowing: 12 Jun 2024", "बुवाई: 12 जून 2024"),
        stage: "Tillering",
        area: 1.8,
        image: "/images/authenticated/farms/paddy-field.jpg",
      },
      {
        id: "sharda-field-2",
        name: localized("Field 2", "खेत 2"),
        khasra: localized("Khesra No. 304/2", "खेसरा नं. 304/2"),
        crop: localized("Mustard (Pusa Tarak)", "सरसों (पूसा तारक)"),
        activity: localized("Sowing: 08 Oct 2024", "बुवाई: 08 अक्तू॰ 2024"),
        stage: "Flowering",
        area: 1.75,
        image: "/images/authenticated/farms/mustard-field.jpg",
      },
    ],
  },
] as const;

export const farmStageLabels: Record<FarmField["stage"], LocalizedText> = {
  Growing: localized("Growing", "बढ़वार"),
  Tillering: localized("Tillering", "कल्ले निकलना"),
  Flowering: localized("Flowering", "फूल आना"),
  "Grand Growth": localized("Grand Growth", "तीव्र बढ़वार"),
  Vegetative: localized("Vegetative", "वानस्पतिक अवस्था"),
};
