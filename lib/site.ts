// Site-wide navigation, links and contact details.

export const SITE_URL = "https://moneycoachinghub.com";
export const EMAIL = "info@moneycoachinghub.com";

export type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

export const mainNav: NavItem[] = [
  {
    label: "Courses",
    href: "/investing-made-simple/",
    children: [
      { label: "Investing Made Simple", href: "/investing-made-simple/", note: "Next cohort 11 Jan 2027" },
      { label: "Crypto Made Simple", href: "/crypto-made-simple-the-online-course/", note: "4-week online course" },
      { label: "Crypto Masterclass", href: "/crypto-masterclass/", note: "Free live session" },
      { label: "Technical Analysis Bootcamp", href: "/technical-analysis-bootcamp/" },
      { label: "Money Management Masterclass", href: "/money-management-masterclass/" },
    ],
  },
  {
    label: "Coaching",
    href: "/services/",
    children: [
      { label: "All services", href: "/services/" },
      { label: "One Time Session", href: "/services/one-time-session/" },
      { label: "Individual Coaching", href: "/services/individual-coaching/" },
      { label: "Couples Coaching", href: "/services/couples-coaching/" },
      { label: "Build your €10,000 Investment House", href: "/portfolio-management/", note: "Free interactive tool" },
    ],
  },
  { label: "Companies", href: "/services/financial-workshops/" },
  {
    label: "Money Types",
    href: "/take-money-type-quiz/",
    children: [
      { label: "Take the quiz", href: "/take-money-type-quiz/" },
      { label: "The 8 money types", href: "/the-8-money-archetypes/" },
    ],
  },
  {
    label: "Knowledge Hub",
    href: "/blog/",
    children: [
      { label: "All articles", href: "/blog/" },
      { label: "Investment Coaching", href: "/category/investment-coaching/" },
      { label: "Family Budgeting", href: "/category/family-budgeting/" },
      { label: "Money Mindset", href: "/category/money-mindset/" },
      { label: "Smart Financial Choices", href: "/category/smart-financial-choices/" },
      { label: "Employee Financial Wellness", href: "/category/employee-financial-wellness/" },
    ],
  },
  { label: "About", href: "/money-coaching-mindset-budgeting/" },
];

export const bookCall = "/contact-us/";

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/moneycoachluca/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/money-coaching-hub/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575551973728" },
];

export const footerNav = [
  {
    title: "Learn",
    links: [
      { label: "Investing Made Simple", href: "/investing-made-simple/" },
      { label: "Crypto Made Simple", href: "/crypto-made-simple-the-online-course/" },
      { label: "Technical Analysis Bootcamp", href: "/technical-analysis-bootcamp/" },
      { label: "Money Management Masterclass", href: "/money-management-masterclass/" },
      { label: "Knowledge Hub", href: "/blog/" },
    ],
  },
  {
    title: "Coaching",
    links: [
      { label: "One Time Session", href: "/services/one-time-session/" },
      { label: "Individual Coaching", href: "/services/individual-coaching/" },
      { label: "Couples Coaching", href: "/services/couples-coaching/" },
      { label: "For Companies", href: "/services/financial-workshops/" },
      { label: "€10,000 Investment House", href: "/portfolio-management/" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About Money Coaching Hub", href: "/money-coaching-mindset-budgeting/" },
      { label: "Meet Luca", href: "/luca/" },
      { label: "Money Type Quiz", href: "/take-money-type-quiz/" },
      { label: "The 8 Money Types", href: "/the-8-money-archetypes/" },
      { label: "Contact", href: "/contact-us/" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Cookies", href: "/cookie-policy/" },
  { label: "Terms", href: "/website-terms-and-conditions/" },
];
