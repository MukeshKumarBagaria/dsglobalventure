/**
 * DS Construction — copy for /ds-construction (a DS Global Ventures business).
 * Same claims policy as the rest of the site: services and working practices only — no certifications, client
 * names or other figures until the client supplies them. The `highlights` figures come from the client's page design.
 */

export const construction = {
  name: "DS Construction",
  descriptor: "Premium & Government Construction",
  parent: "A DS Global Ventures company",
  tagline: "Built for generations. Delivered with precision.",
  description:
    "DS Construction delivers design-build, civil and finishing works for premium private clients and government departments — planned, documented and built to the approved specification.",
};

export const constructionNav = [
  { label: "Sectors", href: "#sectors" },
  { label: "Expertise", href: "#expertise" },
  { label: "Approach", href: "#approach" },
  { label: "Standards", href: "#standards" },
  { label: "Contact", href: "#contact" },
] as const;

export type HighlightIcon = "award" | "layers" | "shield" | "hardhat";

/** The strip under the hero. */
export const highlights: { icon: HighlightIcon; value: string; label: string }[] = [
  { icon: "award", value: "10+", label: "Years of Experience" },
  { icon: "layers", value: "100+", label: "Projects Delivered" },
  { icon: "shield", value: "Government Approved", label: "Vendor & Contractors" },
  { icon: "hardhat", value: "End-to-End", label: "Design to Execution" },
];

export type SectorIcon = "civic" | "residence" | "tower";

/** `id` anchors each card (`#sector-<id>`) for the header's Sectors menu and the hero links. */
export const sectors: { id: string; numeral: string; icon: SectorIcon; title: string; text: string; points: string[] }[] = [
  {
    id: "government",
    numeral: "I",
    icon: "civic",
    title: "Government & Public Works",
    text: "Civil, institutional and public-infrastructure works executed to tender specifications, approved drawings and departmental documentation requirements.",
    points: ["Tender & contract documentation", "Measurement & billing records", "Specification-compliant materials"],
  },
  {
    id: "residences",
    numeral: "II",
    icon: "residence",
    title: "Premium Residences",
    text: "Villas, bungalows and private homes built with the detailing, material control and site discipline that discerning owners expect.",
    points: ["Architect-led detailing", "Premium finishes & joinery", "One accountable site team"],
  },
  {
    id: "commercial",
    numeral: "III",
    icon: "tower",
    title: "Commercial & Institutional",
    text: "Offices, showrooms, hospitality, education and healthcare buildings — delivered to programme, with clear reporting at every stage.",
    points: ["Milestone-based programmes", "Coordinated structure & services", "Progress reporting to stakeholders"],
  },
];

export const expertise: { title: string; text: string }[] = [
  { title: "Design & Build", text: "One contract from concept to completion — design coordination, approvals support and construction under a single team." },
  { title: "Civil & Structural Works", text: "Foundations, RCC frames, masonry and site development, executed to the structural drawings and approved specifications." },
  { title: "Government Contracts", text: "Execution of public works to tender conditions, with the documentation, measurements and inspections the contract requires." },
  { title: "Project Management", text: "Planning, scheduling, procurement and site supervision, with progress reported against agreed milestones." },
  { title: "Interiors & Premium Finishes", text: "Stone, timber, glazing and bespoke joinery — finishing work that holds up to close inspection." },
  { title: "Renovation & Extensions", text: "Upgrades, additions and restoration of existing buildings, planned around occupied sites where needed." },
];

export const approach: { title: string; text: string }[] = [
  { title: "Brief & Site Study", text: "Requirements, site conditions, budget and timelines are understood before anything is priced." },
  { title: "Drawings & Approvals", text: "Design, drawings and specifications are finalised and the necessary approvals pursued." },
  { title: "Estimation & Programme", text: "A transparent estimate and a milestone programme agreed with you in writing." },
  { title: "Construction & Quality Checks", text: "Work proceeds to the approved drawings, with stage-wise inspections and records." },
  { title: "Handover & After-care", text: "Snag-free handover with documentation, followed by support through the defect-liability period." },
];

export const standards: { title: string; text: string }[] = [
  {
    title: "Documentation You Can Audit",
    text: "Measurements, bills, material approvals and test reports maintained as the contract requires — ready for inspection at any stage.",
  },
  {
    title: "Specification First",
    text: "Materials, makes and methods follow the approved specification. Substitutions are proposed in writing, never assumed.",
  },
  {
    title: "Safety on Every Site",
    text: "Site safety practices, protective equipment and housekeeping treated as part of the work, not an addition to it.",
  },
  {
    title: "Programme Discipline",
    text: "Milestones planned up front and progress reported against them, so clients and departments always know where the project stands.",
  },
];

export const enquiryChecklist = [
  "Project type and location",
  "Approximate built-up area or scope of work",
  "Drawings or tender documents, if available",
  "Target start date and completion timeline",
];
