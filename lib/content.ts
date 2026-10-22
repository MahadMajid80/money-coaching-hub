// All homepage copy and links live here, so text and URLs can be changed
// without touching the layout.

export const SITE = "https://moneycoachinghub.com";

export const links = {
  bookCall: `${SITE}/contact-us/`,
  // TODO: replace with the investing course page / application form when ready.
  courseApply: `${SITE}/contact-us/`,
  courseDetails: `${SITE}/contact-us/`,
  workshopEnquiry: `${SITE}/services/financial-workshops/`,
  quiz: `${SITE}/take-money-type-quiz/`,
  about: `${SITE}/about-us/`,
  blog: `${SITE}/blog/`,
  reviews: `${SITE}/about-us/`,
  sendStory: `${SITE}/contact-us/`,
  crypto: `${SITE}/crypto-made-simple-the-online-course/`,
  column: "https://timesofmalta.com/author/luca-caruana.537",
  privacy: `${SITE}/privacy-policy/`,
  cookies: `${SITE}/cookie-policy/`,
  terms: `${SITE}/terms-and-conditions/`,
};

export const nav = [
  { label: "Investing Course", href: "#course" },
  { label: "Coaching", href: "#coaching" },
  { label: "Companies", href: "#companies" },
  { label: "Column", href: "#column" },
  { label: "Money Types", href: "#types" },
  { label: "Blog", href: "#blog" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/moneycoachluca/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/money-coaching-hub/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575551973728" },
];

export const clients = ["HSBC", "PwC Malta", "MeDirect", "Thomas Smith", "Alf Mizzi & Sons", "Nectar", "Deriv"];

export const course = {
  name: "Investing Made Simple",
  eyebrow: "Bestselling course · Taught in Maltese",
  intro:
    'The course that took hundreds of Maltese professionals from "I don\'t know where to start" to their first investment, in four weeks. No jargon, no products pushed, no pressure.',
  points: [
    "4 live online sessions, recorded if you miss one",
    "Cohort WhatsApp group and lifetime access to the materials",
    "Education only: you decide what to buy, never a sales pitch",
  ],
  startDate: "11 January 2027",
  startShort: "11 Jan 2027",
  format: "Every Monday, 4 weeks",
  price: "€175",
  sessions: ["Mon 11 Jan", "Mon 18 Jan", "Mon 25 Jan", "Mon 1 Feb"],
  quote: {
    text: "Luca helped me understand all I needed to know to start investing. 10/10!",
    name: "Angele Azzopardi",
    role: "Freelance Creative Director",
    photo: "/images/reviews/angele-azzopardi.webp",
  },
};

export const concerns = [
  "I earn well. So why is there nothing left on the 28th?",
  "My partner and I only talk about money when we're fighting about it.",
  "I've been meaning to start investing for three years.",
  "I'm 38 and I still don't have an emergency fund.",
  "Everyone thinks I'm doing fine. I'm not.",
  "I don't open the bills. I know, I know.",
];

export const services = [
  {
    tag: "Single session",
    title: "One Time Session",
    blurb: "A focused deep-dive on one money question. Property or stocks? Pay the loan or invest?",
    href: `${SITE}/services/one-time-session/`,
    cta: "Learn more",
  },
  {
    tag: "Most popular",
    title: "Individual Coaching",
    blurb: "A one-to-one journey to rewrite your money story, build habits and start investing with confidence.",
    href: `${SITE}/services/individual-coaching/`,
    cta: "Learn more",
    featured: true,
  },
  {
    tag: "For two",
    title: "Couples Coaching",
    blurb: "Talk about money without the awkwardness, align your goals and plan your future together.",
    href: `${SITE}/services/couples-coaching/`,
    cta: "Learn more",
  },
  {
    tag: "For teams",
    title: "Financial Workshops",
    blurb: "The psychology of money for your workforce. Delivered for HSBC, PwC Malta, MeDirect and more.",
    href: "#companies",
    cta: "For companies",
  },
];

export const stats = [
  { value: "300+", label: "clients coached" },
  { value: "1,000+", label: "workshop participants" },
  { value: "70+", label: "Times of Malta columns" },
];

export const workshopQuote = {
  text: "Luca is the only person that addresses the psychological aspect of money, and that part got people the most involved and intrigued.",
  name: "Christine Borg",
  role: "Engagement & Culture Manager, HSBC",
  photo: "/images/reviews/christine-borg.webp",
};

const TOM = "https://timesofmalta.com/article/";

export const columnFeatured = {
  date: "17 Oct 2026",
  title: "'My wife earns three times my salary, and it's secretly getting to me'",
  summary: "A man struggles to come to terms with the financial gap between him and his spouse.",
  href: `${TOM}my-wife-earns-me-secretly-getting-me.1135550`,
};

export const columnList = [
  {
    date: "3 Oct 2026",
    title: "'I own seven properties and make up to €16,000 a month. And I still can't stop'",
    href: `${TOM}i-seven-properties-make-16000-month-still-cant-stop.1134896`,
  },
  {
    date: "19 Sep 2026",
    title: "'I gave 15 years to my mother. Now she’s gone and I have nothing'",
    href: `${TOM}gave-years-mother-now-gone-nothing.1134342`,
  },
  {
    date: "5 Sep 2026",
    title: "'I've been in the same job 12 years. The salary is decent, but I feel empty'",
    href: `${TOM}ive-job-12-years-salary-decent-feel-empty.1133548`,
  },
  {
    date: "22 Aug 2026",
    title: "'I'm 29, I've saved €25,000, and I still can't leave home'",
    href: `${TOM}im-29-saved-25000-still-cant-leave-home.1132962`,
  },
  {
    date: "25 Jul 2026",
    title: "'My husband wants us to go on a €10k holiday. I want to invest it. Who’s right?'",
    href: `${TOM}husband-wants-us-go-10k-holiday-want-invest-it-right.1131858`,
  },
  {
    date: "11 Jul 2026",
    title: "'We have €400k saved, two rental properties and a pension. What is missing?'",
    href: `${TOM}we-400k-saved-two-rental-properties-pension-missing.1131226`,
  },
];

export const reviews = [
  {
    text: "I was a mess when we started. Just 2 months later I'm already seeing the improvement on paper and mentally.",
    name: "Lorraine Sammut",
    role: "Key Account Manager",
    photo: "/images/reviews/lorraine-sammut.webp",
  },
  {
    text: "Luca doesn't dictate investment choices. He opens up a world of possibilities so I can decide.",
    name: "Carmelo Romano",
    role: "CTO",
    photo: "/images/reviews/carmelo-romano.webp",
  },
  {
    text: "I appreciate Luca's no-BS, no bells-and-whistles approach. Practical solutions I can repeat.",
    name: "Hannah Cremona",
    role: "Business Strategist & Mentor",
    photo: "/images/reviews/hannah-cremona.webp",
  },
];

export const moneyTypes = ["Innocent", "Victim", "Warrior", "Martyr", "Fool", "Creator", "Tyrant", "Magician"];

export const posts = [
  {
    category: "Investing",
    date: "Sep 2025",
    title: "Investing for Children: Smarter Strategies Beyond Child Savings Plans",
    image: "/images/blog-investing-for-children.webp",
    href: `${SITE}/blog/`,
  },
  {
    category: "Family budgeting",
    date: "Aug 2025",
    title: "Couples Financial Counseling: What Happens When One Partner Is a Millionaire?",
    image: "/images/blog-couples-millionaire.webp",
    href: `${SITE}/blog/`,
  },
  {
    category: "Investing",
    date: "Aug 2025",
    title: "Why I'm Shifting Focus to Artificial Intelligence Stocks",
    image: "/images/blog-ai-stocks.webp",
    href: `${SITE}/blog/`,
  },
];
