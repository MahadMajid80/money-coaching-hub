// Free tools listed on /tools/ and in the Money Tools menu. A tool without href shows as "Coming soon".
export type Tool = { title: string; text: string; href?: string; icon: string };

export const TOOLS: Tool[] = [
  { title: "Compound interest calculator", text: "See what your savings and monthly investments could grow into, and how much is growth.", href: "/tools/compound-interest-calculator/", icon: "📈" },
  { title: "Home loan calculator", text: "Your monthly repayment, the total interest, and what paying a little extra saves you.", href: "/tools/home-loan-calculator/", icon: "🔑" },
  { title: "Emergency fund calculator", text: "How big your safety net should be, based on your essentials, and when you'll get there.", href: "/tools/emergency-fund-calculator/", icon: "🛟" },
  { title: "Wedding budget calculator", text: "What your wedding could cost all in, per guest, and how much to save each month.", href: "/tools/wedding-budget-calculator/", icon: "💍" },
  { title: "How long will my money last?", text: "How many years your savings or pension pot lasts at the amount you'd like to take.", href: "/tools/how-long-will-my-money-last/", icon: "⏳" },
  { title: "Buy now, pay later calculator", text: "What a pay-later plan really costs on top, and the yearly interest rate it equals.", href: "/tools/buy-now-pay-later-calculator/", icon: "🛒" },
  { title: "€10,000 Investment House", text: "Build a €10,000 portfolio brick by brick and see the 10, 20 and 30-year picture.", href: "/portfolio-management/", icon: "🏠" },
];
