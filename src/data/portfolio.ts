import type { ServiceSlug } from "./service-details"

export type PortfolioItem = {
  id: string
  name: string
  category: string
  label: "Project showcase"
  summary: string
  problem: string
  solutionOverview: string
  /** Only list features when verified in repo/docs; otherwise leave empty. */
  features: string[]
  /** Only list stack when verified; otherwise leave empty. */
  stack: string[]
  disclaimer: string
  relatedServices: ServiceSlug[]
  mockupVariant: number
}

/**
 * Named builds for portfolio display. Wording stays at showcase level unless
 * feature/stack details are verified — ask NextCoreSoft for a demo walkthrough.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "techwheels-service-management",
    name: "Dealership Service Management System",
    category: "Automotive & service centers",
    label: "Project showcase",
    summary:
      "Management software aimed at service-center or dealership-style operations — jobs, coordination, and service records in one workflow.",
    problem:
      "Teams juggling paper job cards, spreadsheets, or chat threads cannot see open work, assignments, or history for each vehicle or service ticket.",
    solutionOverview:
      "A web-style management system for service operations. Screen-by-screen details are available during a consultation; we do not publish this as a named client case study on the site.",
    features: [],
    stack: [],
    disclaimer:
      "Feature list and technology stack for this build are confirmed in conversation — not listed here until you verify and approve public wording.",
    relatedServices: ["custom-software", "mobile-apps"],
    mockupVariant: 0,
  },
  {
    id: "food-explore",
    name: "Food Explore Application",
    category: "Mobile · discovery & listings",
    label: "Project showcase",
    summary: "A mobile-oriented application for browsing food venues or offerings — structured for discovery rather than generic listings.",
    problem:
      "People looking for food options need a clearer browse-and-compare experience than scattered links or unstructured search results.",
    solutionOverview:
      "An app-style experience for exploring food-related content. Demo flow and modules are shown on request.",
    features: [],
    stack: [],
    disclaimer: "Public feature and stack details pending your verified product brief.",
    relatedServices: ["mobile-apps", "custom-software"],
    mockupVariant: 1,
  },
  {
    id: "pg-booking",
    name: "PG Booking Application",
    category: "Mobile · bookings & accommodation",
    label: "Project showcase",
    summary: "Booking-oriented software for paying-guest (PG) accommodation — inquiries, availability, and reservations.",
    problem:
      "PG operators often manage availability and bookings through calls and messages, which makes double-bookings and follow-ups harder to track.",
    solutionOverview:
      "A booking workflow for PG-style accommodation. Presented as a portfolio demo, not a published client engagement.",
    features: [],
    stack: [],
    disclaimer: "Confirm room rules, payment flow, and admin features with us before any marketing claims.",
    relatedServices: ["mobile-apps", "custom-software"],
    mockupVariant: 2,
  },
  {
    id: "anonymous-chat",
    name: "Anonymous Text & Video Chat Application",
    category: "Real-time communication",
    label: "Project showcase",
    summary:
      "A communication application supporting text and video sessions with anonymity-oriented UX — suitable for moderated or controlled environments only.",
    problem:
      "Some products need real-time chat without exposing identity in the interface; building that safely requires clear moderation and abuse-handling design.",
    solutionOverview:
      "A chat experience with text and video components. Security, moderation, and deployment context are discussed before any production use.",
    features: [],
    stack: [],
    disclaimer: "Not marketed as a consumer anonymous chat product; scope and compliance are project-specific.",
    relatedServices: ["mobile-apps", "cloud-api"],
    mockupVariant: 0,
  },
  {
    id: "pbic-attendance",
    name: "PBIC Attendance and Admin Management System",
    category: "Admin & attendance",
    label: "Project showcase",
    summary: "Administrative software combining attendance tracking with back-office management tasks.",
    problem:
      "Schools, training centers, and similar organizations often record attendance separately from the admin data staff need day to day.",
    solutionOverview:
      "An admin and attendance management system. Detailed modules are shared in a demo, not as verified third-party outcomes.",
    features: [],
    stack: [],
    disclaimer: "Role definitions and reporting should be validated against your institution’s policies.",
    relatedServices: ["custom-software", "cloud-api"],
    mockupVariant: 1,
  },
  {
    id: "leaf-disease-detection",
    name: "Leaf Disease Detection Application",
    category: "AI · image-assisted analysis",
    label: "Project showcase",
    summary:
      "An application that uses image analysis to help identify possible leaf disease patterns — intended as decision support, not a standalone agronomy certification tool.",
    problem:
      "Field teams and growers may need a faster first pass on plant images before expert review, especially when samples are collected in the field.",
    solutionOverview:
      "Image upload and model-assisted suggestions with human review recommended. Accuracy and training data scope are defined per engagement.",
    features: [],
    stack: [],
    disclaimer: "We do not claim clinical or agronomic certification; outputs require human verification.",
    relatedServices: ["ai-automation", "mobile-apps"],
    mockupVariant: 2,
  },
  {
    id: "house-price-prediction",
    name: "House Price Prediction",
    category: "Data · estimation workflow",
    label: "Project showcase",
    summary:
      "A data-driven workflow for exploring house price estimates from property attributes — useful for prototypes and internal analysis, not guaranteed market valuations.",
    problem:
      "Analysts experimenting with pricing models need a controlled interface to enter attributes and see model output without rebuilding notebooks each time.",
    solutionOverview:
      "A prediction-oriented interface backed by a model pipeline. Dataset scope and refresh cadence are agreed per project.",
    features: [],
    stack: [],
    disclaimer: "Not a licensed appraisal tool; estimates are illustrative unless you supply compliant requirements.",
    relatedServices: ["ai-automation", "custom-software"],
    mockupVariant: 0,
  },
  {
    id: "milk-delivery-management",
    name: "Milk Delivery Management App",
    category: "Mobile · delivery operations",
    label: "Project showcase",
    summary: "Operations software for recurring milk delivery — routes, customers, and daily delivery status.",
    problem:
      "Delivery businesses tracking customers and daily drops on paper or messaging apps lose visibility into skips, changes, and collections.",
    solutionOverview:
      "A management app oriented to delivery rounds and customer records. Full feature list available on demo.",
    features: [],
    stack: [],
    disclaimer: "Payment integration and route optimization depend on your operational rules.",
    relatedServices: ["mobile-apps", "custom-software"],
    mockupVariant: 1,
  },
]
