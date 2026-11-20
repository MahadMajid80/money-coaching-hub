// Free tools listed on /tools/. A tool without href shows as "Coming soon".
export type Tool = { title: string; text: string; href?: string; icon: string };

export const TOOLS: Tool[] = [
  { title: "Compound interest calculator", text: "See what your savings and monthly investments could grow into, and how much is growth.", href: "/tools/compound-interest-calculator/", icon: "📈" },
  { title: "€10,000 Investment House", text: "Build a €10,000 portfolio brick by brick and see the 10, 20 and 30-year picture.", href: "/portfolio-management/", icon: "🏠" },
  { title: "Home loan calculator", text: "Monthly repayments, total interest, and what paying a little extra saves you.", icon: "🔑" },
  { title: "Wedding budget calculator", text: "What a Maltese wedding really costs, and how much to save each month to get there.", icon: "💍" },
];
