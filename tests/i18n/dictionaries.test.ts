import { describe, expect, it } from "vitest";

import { getDictionary } from "@/i18n/dictionaries";

describe("localization dictionaries", () => {
  it("contains the same keys in both locales", () => {
    expect(Object.keys(getDictionary("hi")).sort()).toEqual(
      Object.keys(getDictionary("en")).sort(),
    );
  });

  it("provides farmer-facing Hindi for primary navigation", () => {
    const dictionary = getDictionary("hi");
    expect(dictionary["common.home"]).toBe("होम");
    expect(dictionary["gateway.login"]).toBe("किसान लॉगिन");
  });

  it("provides Hindi names and descriptions for home services", () => {
    const dictionary = getDictionary("hi");

    expect(dictionary["common.patna"]).toBe("पटना");
    expect(dictionary["common.bihar"]).toBe("बिहार");
    expect(dictionary["home.service.inputs"]).toBe("कृषि सामग्री विक्रेता");
    expect(dictionary["home.service.rewards"]).toBe("किसान पुरस्कार");
    expect(dictionary["home.service.food"]).toBe("किसान भोजन सेवाएं");
    expect(dictionary["home.service.schemeDiscoveryDescription"]).toBe(
      "योजनाएं देखें और आवेदन करें",
    );
    expect(dictionary["home.service.startupsDescription"]).toBe(
      "नई कृषि-तकनीक सेवाएं खोजें",
    );
  });

  it("does not fall back to English for profile drawer labels", () => {
    const dictionary = getDictionary("hi");

    expect(dictionary["common.close"]).toBe("बंद करें");
    expect(dictionary["home.aadhaar"]).toBe("आधार");
    expect(dictionary["home.landSummary"]).toBe("भूमि सारांश");
    expect(dictionary["home.cadastral"]).toBe("भू-अभिलेख सारांश");
    expect(dictionary["home.ekyc"]).toBe("ई-केवाईसी स्थिति");
    expect(dictionary["home.applications"]).toBe("आवेदन");
    expect(dictionary["register.verified"]).toBe("पहचान सत्यापित");
    expect(dictionary["profile.notice"]).toBe(
      "सुरक्षित बैकएंड एकीकरण के बाद प्रोफाइल संपादन उपलब्ध होगा।",
    );
  });
});
