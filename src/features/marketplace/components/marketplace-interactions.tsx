"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import {
  cartProducts,
  marketplaceOrders,
  orderStatusLabels,
  productFormLabels,
  productStockLabels,
  type MarketplaceProduct,
} from "@/features/marketplace/data/marketplace-data";
import { useLocale } from "@/i18n/LocaleProvider";

import { ProductCard } from "./marketplace-components";
import styles from "./marketplace.module.css";

export function AddToCartButton() {
  const [added, setAdded] = useState(false);
  const { t } = useLocale();
  return (
    <button
      className={`${styles.addButton} ${added ? styles.addedButton : ""}`}
      type="button"
      onClick={() => setAdded(true)}
    >
      {added ? <Check size={17} /> : <ShoppingCart size={17} />}
      {added
        ? t("Added to Cart", "कार्ट में जोड़ा गया")
        : t("Add to Cart", "कार्ट में जोड़ें")}
    </button>
  );
}

export function ProductResults({
  products,
}: {
  products: readonly MarketplaceProduct[];
}) {
  const { t } = useLocale();
  const [brands, setBrands] = useState<string[]>(["IFFCO"]);
  const [forms, setForms] = useState<string[]>(["Prilled", "Liquid"]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (brands.length === 0 || brands.includes(product.brand)) &&
          (forms.length === 0 || forms.includes(product.form)),
      ),
    [brands, forms, products],
  );

  function toggle(
    value: string,
    values: string[],
    update: (next: string[]) => void,
  ) {
    update(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    );
  }

  const filters = (
    <>
      <div className={styles.filterHeading}>
        <strong>{t("Filters", "फ़िल्टर")}</strong>
        <button
          type="button"
          onClick={() => {
            setBrands([]);
            setForms([]);
          }}
        >
          {t("Clear all", "सभी हटाएं")}
        </button>
      </div>
      <fieldset>
        <legend>{t("Categories", "श्रेणियां")}</legend>
        {["Fertilisers", "Seeds", "Pesticides", "Bio Inputs"].map(
          (label, index) => (
            <label key={label}>
              <input defaultChecked={index === 0} type="checkbox" />
              {t(
                label,
                {
                  Fertilisers: "उर्वरक",
                  Seeds: "बीज",
                  Pesticides: "कीटनाशक",
                  "Bio Inputs": "जैविक इनपुट",
                }[label] ?? label,
              )}
              <small>({35 - index * 7})</small>
            </label>
          ),
        )}
      </fieldset>
      <fieldset>
        <legend>{t("Product Type", "उत्पाद का प्रकार")}</legend>
        {["Prilled", "Liquid"].map((form) => (
          <label key={form}>
            <input
              checked={forms.includes(form)}
              onChange={() => toggle(form, forms, setForms)}
              type="checkbox"
            />
            {t(productFormLabels[form as MarketplaceProduct["form"]])}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{t("Brand", "ब्रांड")}</legend>
        <label className={styles.filterSearch}>
          <Search size={15} />
          <input placeholder={t("Search brand", "ब्रांड खोजें")} />
        </label>
        {["IFFCO", "Coromandel", "Kribhco", "NFL"].map((brand) => (
          <label key={brand}>
            <input
              checked={brands.includes(brand)}
              onChange={() => toggle(brand, brands, setBrands)}
              type="checkbox"
            />
            {brand}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{t("Pack Size", "पैक आकार")}</legend>
        {["1 kg", "5 kg", "10 kg", "25 kg", "50 kg"].map((size) => (
          <label key={size}>
            <input defaultChecked={size === "10 kg"} type="checkbox" />
            {t(size, size.replace("kg", "किग्रा"))}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{t("Availability", "उपलब्धता")}</legend>
        <label>
          <input defaultChecked type="checkbox" />
          {t("In Stock", "स्टॉक में")}
        </label>
        <label>
          <input type="checkbox" />
          {t("Limited Stock", "सीमित स्टॉक")}
        </label>
      </fieldset>
    </>
  );

  return (
    <div className={styles.resultsLayout}>
      <button
        className={styles.mobileFilterButton}
        onClick={() => setMobileFiltersOpen((open) => !open)}
        type="button"
      >
        <SlidersHorizontal size={18} /> {t("Filters", "फ़िल्टर")}{" "}
        <ChevronDown size={17} />
      </button>
      <aside
        className={`${styles.filters} ${mobileFiltersOpen ? styles.filtersOpen : ""}`}
      >
        {filters}
      </aside>
      <div className={styles.resultsContent}>
        <div className={styles.resultsToolbar}>
          <span>
            {t(
              `${filtered.length} products shown`,
              `${filtered.length} उत्पाद दिखाए गए`,
            )}
          </span>
          <label>
            {t("Sort by:", "क्रमबद्ध करें:")}
            <select defaultValue="relevance">
              <option value="relevance">{t("Relevance", "प्रासंगिकता")}</option>
              <option value="low">
                {t("Price: Low to High", "मूल्य: कम से अधिक")}
              </option>
              <option value="rating">
                {t("Top Rated", "सर्वोच्च रेटिंग")}
              </option>
            </select>
          </label>
        </div>
        <div className={styles.approvalBanner}>
          {t(
            "✓ All inputs are Government Approved & Quality Assured",
            "✓ सभी इनपुट सरकार द्वारा अनुमोदित और गुणवत्ता सुनिश्चित हैं",
          )}
        </div>
        {filtered.length ? (
          <div className={styles.productGrid}>
            {filtered.map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyResults}>
            <Search size={34} />
            <strong>
              {t("No matching products", "कोई मेल खाता उत्पाद नहीं")}
            </strong>
            <span>
              {t(
                "Clear filters to see all available inputs.",
                "सभी उपलब्ध इनपुट देखने के लिए फ़िल्टर हटाएं।",
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function PurchasePanel() {
  const { t } = useLocale();
  const [pack, setPack] = useState("10 kg");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <aside className={styles.purchasePanel}>
      <div className={styles.detailPrice}>
        ₹266 <small>/ {t("bag", "बैग")}</small>
      </div>
      <p>
        MRP: <del>₹275</del> <strong>{t("(3% OFF)", "(3% छूट)")}</strong>
      </p>
      <label className={styles.optionLabel}>{t("Pack Size", "पैक आकार")}</label>
      <div className={styles.packOptions}>
        {["1 kg", "5 kg", "10 kg", "25 kg", "50 kg"].map((size) => (
          <button
            className={pack === size ? styles.selectedPack : ""}
            onClick={() => setPack(size)}
            type="button"
            key={size}
          >
            {t(size, size.replace("kg", "किग्रा"))}
          </button>
        ))}
      </div>
      <label className={styles.optionLabel}>{t("Quantity", "मात्रा")}</label>
      <div className={styles.quantityRow}>
        <button
          aria-label={t("Decrease quantity", "मात्रा घटाएं")}
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          type="button"
        >
          <Minus size={17} />
        </button>
        <strong>{quantity}</strong>
        <button
          aria-label={t("Increase quantity", "मात्रा बढ़ाएं")}
          onClick={() => setQuantity((value) => value + 1)}
          type="button"
        >
          <Plus size={17} />
        </button>
        <span>
          ({quantity} {t(quantity > 1 ? "bags" : "bag", "बैग")})
        </span>
      </div>
      <div className={styles.stockLine}>
        {t("In Stock", "स्टॉक में")}{" "}
        <span>{t("(2,450 bags available)", "(2,450 बैग उपलब्ध)")}</span>
      </div>
      <button
        className={styles.primaryMarketButton}
        onClick={() => setAdded(true)}
        type="button"
      >
        {added ? <Check size={19} /> : <ShoppingCart size={19} />}{" "}
        {added
          ? t("Added to Cart", "कार्ट में जोड़ा गया")
          : t("Add to Cart", "कार्ट में जोड़ें")}
      </button>
      <button className={styles.secondaryMarketButton} type="button">
        {t("Buy Now", "अभी खरीदें")}
      </button>
      <div className={styles.deliveryCard}>
        <strong>
          {t(
            "Deliver to: Ram Prasad Farm",
            "यहां डिलीवर करें: राम प्रसाद फार्म",
          )}
        </strong>
        <span>
          {t("Amhara, Bihta, Patna, Bihar", "अमहरा, बिहटा, पटना, बिहार")}
        </span>
        <p>
          {t("Delivery by 22 May", "22 मई तक डिलीवरी")} ·{" "}
          <b>{t("₹40 FREE", "₹40 मुफ़्त")}</b>
        </p>
      </div>
    </aside>
  );
}

const initialQuantities = [2, 1, 2, 1];

export function CartManager() {
  const { locale, t } = useLocale();
  const [quantities, setQuantities] = useState(initialQuantities);
  const [removed, setRemoved] = useState<string[]>([]);
  const visibleProducts = cartProducts.filter(
    (product) => !removed.includes(product.slug),
  );
  const subtotal = cartProducts.reduce(
    (total, product, index) =>
      removed.includes(product.slug)
        ? total
        : total + product.price * (quantities[index] ?? 1),
    0,
  );

  function updateQuantity(index: number, delta: number) {
    setQuantities((current) =>
      current.map((quantity, itemIndex) =>
        itemIndex === index ? Math.max(1, quantity + delta) : quantity,
      ),
    );
  }

  return (
    <div className={styles.cartLayout}>
      <div className={styles.cartItems}>
        {visibleProducts.map((product) => {
          const index = cartProducts.findIndex(
            (item) => item.slug === product.slug,
          );
          const quantity = quantities[index] ?? 1;
          return (
            <article className={styles.cartItem} key={product.slug}>
              <div className={styles.cartProductImage}>
                <Image
                  src={product.image}
                  alt={t(product.name)}
                  fill
                  sizes="120px"
                />
              </div>
              <div className={styles.cartProductInfo}>
                <h2>{t(product.name)}</h2>
                <span className={styles.approvedPill}>
                  {t("Government Approved", "सरकार द्वारा अनुमोदित")}
                </span>
                <small>
                  {t("Seller", "विक्रेता")}: {product.seller}
                </small>
                <small>
                  {t("Rating", "रेटिंग")}: {product.rating} ★ ({product.reviews}
                  )
                </small>
                <strong
                  className={
                    product.stock === "Limited Stock"
                      ? styles.limited
                      : styles.inStock
                  }
                >
                  {t(productStockLabels[product.stock])}
                </strong>
                <small>
                  {t("Delivery by", "डिलीवरी की तारीख")} {t(product.delivery)}
                </small>
              </div>
              <div className={styles.cartPack}>
                <strong>
                  {t(
                    product.packSize,
                    product.packSize
                      .replace("kg", "किग्रा")
                      .replace("ml", "मि.ली."),
                  )}
                </strong>
                <small>({t(productFormLabels[product.form])})</small>
              </div>
              <div className={styles.cartUnitPrice}>
                <strong>₹{product.price}</strong>
                <small>/{t("bag", "बैग")}</small>
                <del>₹{product.mrp}</del>
              </div>
              <div className={styles.cartQuantity}>
                <div>
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    aria-label={t("Decrease quantity", "मात्रा घटाएं")}
                    type="button"
                  >
                    <Minus size={15} />
                  </button>
                  <strong>{quantity}</strong>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    aria-label={t("Increase quantity", "मात्रा बढ़ाएं")}
                    type="button"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <button type="button">
                  <Heart size={15} /> {t("Save for later", "बाद के लिए सहेजें")}
                </button>
                <button
                  onClick={() =>
                    setRemoved((current) => [...current, product.slug])
                  }
                  type="button"
                >
                  <Trash2 size={15} /> {t("Remove", "हटाएं")}
                </button>
              </div>
              <strong className={styles.cartLineTotal}>
                ₹{product.price * quantity}
              </strong>
            </article>
          );
        })}
        {!visibleProducts.length ? (
          <div className={styles.emptyResults}>
            <ShoppingCart size={35} />
            <strong>{t("Your cart is empty", "आपकी कार्ट खाली है")}</strong>
            <span>
              {t(
                "Add products to continue.",
                "जारी रखने के लिए उत्पाद जोड़ें।",
              )}
            </span>
          </div>
        ) : null}
      </div>
      <aside className={styles.cartRail}>
        <section className={styles.addressCard}>
          <span>{t("Deliver to", "यहां डिलीवर करें")}</span>
          <strong>{t("Ram Prasad Farm", "राम प्रसाद फार्म")}</strong>
          <p>
            {t("Field 1, Pusa Basmati 1121", "खेत 1, पूसा बासमती 1121")}
            <br />
            {t("Amhara, Bihta", "अमहरा, बिहटा")}
            <br />
            {t("Patna, Bihar", "पटना, बिहार")} – 801103
          </p>
          <b>
            {t("Expected Delivery", "अनुमानित डिलीवरी")}
            <br />
            {t("22 – 23 May 2024", "22 – 23 मई 2024")}
          </b>
        </section>
        <section className={styles.summaryCard}>
          <h2>{t("Price Details", "मूल्य विवरण")}</h2>
          <dl>
            <div>
              <dt>{t("Subtotal", "उप-योग")}</dt>
              <dd>
                ₹{subtotal.toLocaleString(locale === "hi" ? "hi-IN" : "en-IN")}
              </dd>
            </div>
            <div>
              <dt>{t("Discount on MRP", "MRP पर छूट")}</dt>
              <dd className={styles.saving}>− ₹92</dd>
            </div>
            <div>
              <dt>{t("Shipping Charges", "शिपिंग शुल्क")}</dt>
              <dd className={styles.saving}>{t("FREE", "मुफ़्त")}</dd>
            </div>
            <div>
              <dt>{t("Handling Charges", "हैंडलिंग शुल्क")}</dt>
              <dd>₹25</dd>
            </div>
          </dl>
          <div className={styles.totalPayable}>
            <span>
              {t("Total Payable", "कुल देय")}
              <small>{t("Inclusive of all taxes", "सभी करों सहित")}</small>
            </span>
            <strong>
              ₹
              {Math.max(0, subtotal - 67).toLocaleString(
                locale === "hi" ? "hi-IN" : "en-IN",
              )}
            </strong>
          </div>
        </section>
        {visibleProducts.length ? (
          <Link
            className={styles.primaryMarketButton}
            href="/marketplace/checkout"
          >
            {t("Proceed to Checkout", "चेकआउट पर जाएं")}
          </Link>
        ) : (
          <span className={styles.primaryMarketButton} aria-disabled="true">
            {t("Proceed to Checkout", "चेकआउट पर जाएं")}
          </span>
        )}
        <Link
          className={styles.secondaryMarketButton}
          href="/marketplace/search"
        >
          {t("Continue Shopping", "खरीदारी जारी रखें")}
        </Link>
      </aside>
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const { t } = useLocale();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("upi");
  const [accepted, setAccepted] = useState(true);

  return (
    <div className={styles.checkoutSections}>
      <section className={styles.checkoutCard}>
        <h2>{t("1. Delivery Address", "1. डिलीवरी का पता")}</h2>
        <strong>
          {t("Ramesh Kumar", "रमेश कुमार")}{" "}
          <span className={styles.approvedPill}>
            {t("Default", "डिफ़ॉल्ट")}
          </span>
        </strong>
        <p>+91 98765 43210</p>
        <p>
          {t(
            "Ram Prasad Farm, Field 1, Pusa Basmati 1121",
            "राम प्रसाद फार्म, खेत 1, पूसा बासमती 1121",
          )}
          <br />
          {t("Amhara, Bihta, Patna, Bihar", "अमहरा, बिहटा, पटना, बिहार")} –
          801103
        </p>
        <div className={styles.availableNote}>
          {t(
            "✓ Delivery available in your area",
            "✓ आपके क्षेत्र में डिलीवरी उपलब्ध है",
          )}
        </div>
      </section>
      <section className={styles.checkoutCard}>
        <h2>{t("2. Delivery Options", "2. डिलीवरी विकल्प")}</h2>
        <label className={delivery === "standard" ? styles.optionSelected : ""}>
          <input
            checked={delivery === "standard"}
            onChange={() => setDelivery("standard")}
            type="radio"
          />
          <span>
            <strong>
              {t("Standard Delivery (3–5 Days)", "मानक डिलीवरी (3–5 दिन)")}
            </strong>
            <small>
              {t(
                "Expected delivery by 22 – 23 May 2024",
                "22 – 23 मई 2024 तक अनुमानित डिलीवरी",
              )}
            </small>
          </span>
          <b>{t("FREE", "मुफ़्त")}</b>
        </label>
        <label className={delivery === "express" ? styles.optionSelected : ""}>
          <input
            checked={delivery === "express"}
            onChange={() => setDelivery("express")}
            type="radio"
          />
          <span>
            <strong>
              {t("Express Delivery (1–2 Days)", "एक्सप्रेस डिलीवरी (1–2 दिन)")}
            </strong>
            <small>
              {t(
                "Expected delivery by 20 – 21 May 2024",
                "20 – 21 मई 2024 तक अनुमानित डिलीवरी",
              )}
            </small>
          </span>
          <b>₹120</b>
        </label>
      </section>
      <section className={styles.checkoutCard}>
        <h2>{t("3. Payment Method", "3. भुगतान का तरीका")}</h2>
        {(
          [
            ["upi", "UPI", "Pay using any UPI app"],
            ["cards", "Cards (Debit / Credit)", "Visa, Mastercard, Rupay"],
            ["netbanking", "Net Banking", "All major banks supported"],
            ["wallets", "Wallets", "Paytm, PhonePe, Amazon Pay & more"],
            [
              "cod",
              "Cash on Delivery (COD)",
              "Pay when your order is delivered",
            ],
          ] as const
        ).map(([value, label, detail]) => (
          <label
            className={payment === value ? styles.optionSelected : ""}
            key={value}
          >
            <input
              checked={payment === value}
              onChange={() => setPayment(value)}
              type="radio"
            />
            <span>
              <strong>
                {t(
                  label,
                  {
                    UPI: "UPI",
                    "Cards (Debit / Credit)": "कार्ड (डेबिट / क्रेडिट)",
                    "Net Banking": "नेट बैंकिंग",
                    Wallets: "वॉलेट",
                    "Cash on Delivery (COD)": "कैश ऑन डिलीवरी (COD)",
                  }[label],
                )}
              </strong>
              <small>
                {t(
                  detail,
                  {
                    "Pay using any UPI app": "किसी भी UPI ऐप से भुगतान करें",
                    "Visa, Mastercard, Rupay": "Visa, Mastercard, Rupay",
                    "All major banks supported": "सभी प्रमुख बैंक समर्थित",
                    "Paytm, PhonePe, Amazon Pay & more":
                      "Paytm, PhonePe, Amazon Pay और अन्य",
                    "Pay when your order is delivered":
                      "ऑर्डर मिलने पर भुगतान करें",
                  }[detail],
                )}
              </small>
            </span>
          </label>
        ))}
        <div className={styles.availableNote}>
          {t(
            "✓ Your payments are 100% secure.",
            "✓ आपके भुगतान 100% सुरक्षित हैं।",
          )}
        </div>
      </section>
      <section className={styles.checkoutCard}>
        <h2>{t("4. Review Your Order", "4. अपने ऑर्डर की समीक्षा करें")}</h2>
        {cartProducts.map((product, index) => {
          const quantity = initialQuantities[index] ?? 1;
          return (
            <div className={styles.reviewItem} key={product.slug}>
              <Image
                src={product.image}
                alt={t(product.name)}
                width={48}
                height={62}
              />
              <span>
                <strong>{t(product.name)}</strong>
                <small>
                  {t(
                    product.packSize,
                    product.packSize
                      .replace("kg", "किग्रा")
                      .replace("ml", "मि.ली."),
                  )}
                </small>
              </span>
              <span>
                {t("Qty", "मात्रा")}: {quantity}
              </span>
              <strong>₹{product.price * quantity}</strong>
            </div>
          );
        })}
      </section>
      <label className={styles.termsCheck}>
        <input
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          type="checkbox"
        />
        {t(
          "I agree to the Terms & Conditions, Return Policy and Privacy Policy.",
          "मैं नियम और शर्तें, वापसी नीति और गोपनीयता नीति से सहमत हूं।",
        )}
      </label>
      <button
        className={styles.primaryMarketButton}
        disabled={!accepted}
        onClick={() => router.push("/marketplace/orders?placed=1")}
        type="button"
      >
        {t("Confirm & Place Order", "पुष्टि करें और ऑर्डर दें")}
      </button>
    </div>
  );
}

type OrderStatus =
  | "All Orders"
  | "To Pay"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export function OrdersManager({
  showSuccess = false,
}: {
  showSuccess?: boolean;
}) {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState<OrderStatus>("All Orders");
  const [query, setQuery] = useState("");
  const orders = marketplaceOrders.filter((order) => {
    const matchesStatus =
      status === "All Orders" ||
      (status === "Shipped" && order.status === "In Transit") ||
      order.status === status;
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return (
      matchesStatus &&
      (!normalizedQuery ||
        order.id.toLocaleLowerCase().includes(normalizedQuery) ||
        t(order.product.name)
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery))
    );
  });

  return (
    <>
      {showSuccess ? (
        <div className={styles.orderSuccess}>
          <Check size={21} />
          <span>
            <strong>
              {t("Order placed successfully!", "ऑर्डर सफलतापूर्वक दिया गया!")}
            </strong>
            {t(
              "Your order is confirmed and will be prepared for delivery.",
              "आपका ऑर्डर पक्का हो गया है और डिलीवरी के लिए तैयार किया जाएगा।",
            )}
          </span>
        </div>
      ) : null}
      <div className={styles.orderTabs}>
        {(
          [
            "All Orders",
            "To Pay",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ] as const
        ).map((item) => (
          <button
            className={status === item ? styles.orderTabActive : ""}
            onClick={() => setStatus(item)}
            type="button"
            key={item}
          >
            {t(
              item,
              {
                "All Orders": "सभी ऑर्डर",
                "To Pay": "भुगतान बाकी",
                Processing: "प्रक्रिया में",
                Shipped: "भेज दिया गया",
                Delivered: "डिलीवर हो गया",
                Cancelled: "रद्द",
              }[item],
            )}
          </button>
        ))}
      </div>
      <label className={styles.orderSearch}>
        <Search size={19} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(
            "Search by order ID, product or brand...",
            "ऑर्डर ID, उत्पाद या ब्रांड से खोजें...",
          )}
        />
      </label>
      <div className={styles.orderList}>
        {orders.map((order) => (
          <article className={styles.orderCard} key={order.id}>
            <header>
              <strong>
                {t("Order ID", "ऑर्डर ID")}: {order.id}
              </strong>
              <span>
                {t("Placed on", "ऑर्डर की तारीख")} {t(order.date)}
              </span>
              <b className={styles[`status${order.status.replace(" ", "")}`]}>
                {t(orderStatusLabels[order.status])}
              </b>
            </header>
            <div className={styles.orderBody}>
              <div className={styles.orderProductImage}>
                <Image
                  src={order.product.image}
                  alt={t(order.product.name)}
                  fill
                  sizes="100px"
                />
              </div>
              <div>
                <strong>{t(order.product.name)}</strong>
                <small>
                  {t(
                    order.product.packSize,
                    order.product.packSize
                      .replace("kg", "किग्रा")
                      .replace("ml", "मि.ली."),
                  )}
                </small>
                <small>
                  {t("Qty", "मात्रा")}: {order.quantity}
                </small>
                <b>
                  ₹{order.product.price} / {t("bag", "बैग")}
                </b>
                <em>
                  ₹{order.product.price * order.quantity}{" "}
                  {order.status === "Cancelled"
                    ? t("Refunded", "धनवापसी की गई")
                    : t("Paid", "भुगतान किया गया")}
                </em>
              </div>
              <div>
                <small>
                  {order.status === "Delivered"
                    ? t("Delivered on", "डिलीवरी की तारीख")
                    : t("Expected delivery", "अनुमानित डिलीवरी")}
                </small>
                <strong>{t(order.statusDate)}</strong>
                <small>{t("Delivering to", "यहां डिलीवर होगा")}</small>
                <b>{t("Ram Prasad Farm", "राम प्रसाद फार्म")}</b>
                <small>
                  {t("Amhara, Bihta, Bihar", "अमहरा, बिहटा, बिहार")}
                </small>
              </div>
              <ol className={styles.orderTimeline}>
                <li className={styles.timelineDone}>
                  {t("Order Confirmed", "ऑर्डर की पुष्टि")}
                </li>
                <li
                  className={
                    order.status !== "Processing" &&
                    order.status !== "Cancelled"
                      ? styles.timelineDone
                      : ""
                  }
                >
                  {t("Shipped", "भेज दिया गया")}
                </li>
                <li
                  className={
                    order.status === "In Transit" ||
                    order.status === "Delivered"
                      ? styles.timelineDone
                      : ""
                  }
                >
                  {t("Out for Delivery", "डिलीवरी के लिए निकला")}
                </li>
                <li
                  className={
                    order.status === "Delivered" ? styles.timelineDone : ""
                  }
                >
                  {order.status === "Cancelled"
                    ? t("Cancelled", "रद्द")
                    : t("Delivered", "डिलीवर हो गया")}
                </li>
              </ol>
              <div className={styles.orderButtons}>
                <button type="button">
                  {t("View Details", "विवरण देखें")}
                </button>
                {order.status !== "Cancelled" ? (
                  <button type="button">
                    {t("View Invoice", "इनवॉइस देखें")}
                  </button>
                ) : null}
                {order.status === "Delivered" ? (
                  <button type="button">
                    {t("Reorder", "फिर से ऑर्डर करें")}
                  </button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
        {!orders.length ? (
          <div className={styles.emptyResults}>
            <Search size={34} />
            <strong>{t("No orders found", "कोई ऑर्डर नहीं मिला")}</strong>
            <span>
              {t(
                "Try another status or search term.",
                "दूसरी स्थिति या खोज शब्द आज़माएं।",
              )}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}
