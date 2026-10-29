/** Source: docs/01-WEBSITE-CONTENT.md §2, §3, §6, §7 */

export const capabilities = [
  {
    icon: "Target",
    title: "Specification-Led",
    text: "We start with your grade, purity, packaging and application — not a price list.",
  },
  {
    icon: "FileCheck2",
    title: "Documentation Support",
    text: "COA, SDS/MSDS and specification sheets coordinated as applicable.",
  },
  {
    icon: "Boxes",
    title: "Bulk & Recurring Supply",
    text: "One-time, monthly or contract quantities for industrial buyers.",
  },
  {
    icon: "Headset",
    title: "Responsive Coordination",
    text: "One point of contact from enquiry to dispatch and delivery.",
  },
] as const;

export const keyFacts = [
  { value: 5, label: "Core chemical products" },
  { value: 8, label: "Industry sectors served" },
  { value: 5, label: "Step sourcing process" },
  { value: 6, label: "Days a week support" },
] as const;

export const services = [
  {
    icon: "ArrowLeftRight",
    title: "Chemical Trading",
    text: "Supply of industrial chemicals and raw materials according to customer requirements.",
  },
  {
    icon: "ScanSearch",
    title: "Chemical Sourcing",
    text: "Identification and procurement of products from suitable sources based on specification, quantity and destination.",
  },
  {
    icon: "Container",
    title: "Bulk Supply",
    text: "Solutions for customers requiring commercial and industrial quantities.",
  },
  {
    icon: "Truck",
    title: "Supply Coordination",
    text: "Coordination of packaging, dispatch and delivery requirements.",
  },
  {
    icon: "Headset",
    title: "Customer Support",
    text: "Professional assistance from enquiry through order and delivery coordination.",
  },
] as const;

export const processSteps = [
  { step: "01", title: "Requirement", text: "Share your product name, specification, quantity and delivery location." },
  { step: "02", title: "Sourcing", text: "We identify suitable supply options based on your requirement." },
  {
    step: "03",
    title: "Specification",
    text: "Product specifications and relevant documentation are reviewed as applicable.",
  },
  {
    step: "04",
    title: "Commercials",
    text: "We work toward competitive commercial terms based on quantity, product and destination.",
  },
  {
    step: "05",
    title: "Supply",
    text: "After confirmation of the order, dispatch and delivery coordination is carried out according to agreed terms.",
  },
] as const;

export const mission = [
  "Provide reliable chemical sourcing solutions.",
  "Develop strong and dependable supplier relationships.",
  "Offer competitive commercial solutions.",
  "Support customers with timely supply coordination.",
  "Maintain professional standards in documentation and communication.",
  "Build long-term relationships with customers and suppliers.",
];

export const vision =
  "To build DS Global Ventures into a trusted and professionally recognized chemical trading company with strong sourcing capabilities and long-term customer relationships.";

export const principles = [
  {
    icon: "Search",
    title: "Understand first",
    text: "Specification, application, quantity and destination are clarified before sourcing begins.",
  },
  {
    icon: "Network",
    title: "Source responsibly",
    text: "Supply options are identified from suitable sources based on the stated requirement.",
  },
  {
    icon: "FileCheck2",
    title: "Document properly",
    text: "COA, SDS and specification documents are coordinated as applicable.",
  },
  {
    icon: "MessagesSquare",
    title: "Communicate clearly",
    text: "One point of contact and timely updates from enquiry to delivery.",
  },
  {
    icon: "CalendarClock",
    title: "Execute on time",
    text: "Dispatch and delivery are coordinated according to agreed terms.",
  },
  {
    icon: "Handshake",
    title: "Build relationships",
    text: "We value long-term partnerships with customers and suppliers over one-off transactions.",
  },
] as const;

export const commitmentQuote =
  "Successful chemical trading is not only about price. It is about reliability, communication, product specifications, documentation and timely execution.";

export const documents = [
  { title: "Certificate of Analysis (COA)", text: "Batch-wise test results against the agreed specification." },
  { title: "Safety Data Sheet (SDS/MSDS)", text: "Hazards, handling, storage, PPE and emergency measures." },
  { title: "Product specification", text: "Grade, purity / concentration and key parameters." },
  { title: "Packing details", text: "Packaging type, net weight and marking information." },
  { title: "Batch information", text: "Batch / lot identification for traceability." },
  { title: "Other documentation", text: "Other applicable commercial or technical documentation." },
];

export const specificationParams = [
  "Grade",
  "Purity",
  "Concentration",
  "Packaging",
  "Quantity",
  "Application",
  "Delivery location",
];

export const bulkChecklist = [
  "Product name",
  "Required grade / specification",
  "Monthly / one-time quantity",
  "Packaging requirement",
  "Delivery location",
  "Required delivery schedule",
];

export const supplyModels = [
  { icon: "Zap", title: "One-time requirement", text: "Spot purchase for a specific production run or project." },
  {
    icon: "Repeat",
    title: "Regular / monthly supply",
    text: "Planned quantities on an agreed schedule for continuous production.",
  },
  {
    icon: "Layers",
    title: "Project / contract supply",
    text: "Larger volumes coordinated across multiple dispatches.",
  },
] as const;

export const packagingFormats = [
  { icon: "Cylinder", title: "Drums" },
  { icon: "Package", title: "Bags & jumbo bags" },
  { icon: "Box", title: "IBCs" },
  { icon: "Truck", title: "Bulk tankers / ISO tanks" },
] as const;

export const procurementChallenges = [
  {
    title: "Specification match",
    problem: "Grades, purity and concentration differ between sources.",
    help: "We confirm your specification before identifying supply options.",
  },
  {
    title: "Reliable sources",
    problem: "Finding dependable supply for regular volumes takes time.",
    help: "We work to develop strong and dependable supplier relationships.",
  },
  {
    title: "Commercial terms",
    problem: "Price depends on quantity, packaging and destination.",
    help: "We work toward competitive terms for your quantity and location.",
  },
  {
    title: "Delivery coordination",
    problem: "Dispatch delays can stall production schedules.",
    help: "Packaging, dispatch and delivery are coordinated to agreed terms.",
  },
];

export const homeFaqs = [
  {
    q: "What products does DS Global Ventures supply?",
    a: "We currently focus on Phenol, Paraformaldehyde, Formaldehyde, Methanol and Acetone. Other industrial chemicals can be sourced on request, subject to feasibility.",
  },
  {
    q: "Do you supply bulk quantities?",
    a: "Yes. We work with commercial and industrial quantities, including regular monthly requirements. Share your quantity and schedule for a suitable sourcing solution.",
  },
  {
    q: "Can you provide COA and SDS?",
    a: "Relevant documentation such as COA and SDS/MSDS is coordinated as applicable to the product and transaction.",
  },
  {
    q: "How do I get a price?",
    a: "Prices depend on product, grade, quantity, packaging and delivery location. Send your requirement through the enquiry form, phone or WhatsApp.",
  },
  {
    q: "Which industries do you serve?",
    a: "Resins & adhesives, plywood & laminates, paints & coatings, chemical manufacturing, pharmaceutical, rubber & plastics, construction chemicals, textiles and other industries.",
  },
];
