// Luca in the media: interviews, column pieces, TV, podcasts and talks.
// Newest first is applied on the page. `featured` puts an item in the large card at the top.
// Only a headline, a one-line summary and one short quote of Luca's are shown; the link goes to the original.

export type MediaItem = {
  outlet: string;
  type: "Interview" | "Opinion" | "Profile" | "News" | "TV" | "Podcast" | "Talk" | "Video";
  date?: string; // YYYY-MM-DD; items without a date go last
  youtubeId?: string; // plays on the page
  listenUrl?: string; // e.g. Spotify
  title: string;
  summary: string;
  quote?: string;
  byline?: string;
  url: string;
  featured?: boolean;
};

export const mediaItems: MediaItem[] = [
  {
    outlet: "Times of Malta",
    type: "Interview",
    date: "2023-04-15",
    title: "Big salaries, no wealth: some high earners are struggling to manage their funds",
    summary:
      "Luca on why some people become “poor” just as their salary rises, and why high earners find it so hard to ask for help.",
    quote: "Knowing how to make money is not the same as knowing how to keep it.",
    byline: "Mark Laurence Zammit",
    url: "https://timesofmalta.com/article/big-salaries-no-wealth-high-earners-struggling-manage-funds.1024433",
    featured: true,
  },
  {
    outlet: "Lovin Malta",
    type: "Interview",
    date: "2023-12-09",
    title: "‘The Silent Sufferers’: Money coach says Malta’s sore lack of financial literacy is more problematic than we think",
    summary: "Why well-paid professionals can still struggle in silence, held back by shame about money.",
    quote: "These people are well paid but still find it difficult to make ends meet.",
    byline: "Ana Tortell",
    url: "https://lovinmalta.com/malta/the-silent-sufferers-money-coach-says-maltas-sore-lack-of-financial-literacy-is-more-problematic-than-we-think/",
  },
  {
    outlet: "Lovin Malta",
    type: "Interview",
    date: "2023-02-13",
    title: "Malta’s first ‘money coach’ plans to put an end to your bad cash habits once and for all",
    summary: "Malta’s first certified money coach on working with the psychology behind money habits, not investment tips.",
    quote: "Unlike financial coaching, money coaching starts from the psychological side before going to the practical side.",
    byline: "Tim Diacono",
    url: "https://lovinmalta.com/lifestyle/interview/maltas-first-money-coach-plans-to-put-an-end-to-your-bad-cash-habits-once-and-for-all/",
  },
  {
    outlet: "Who’s Who Malta",
    type: "Profile",
    date: "2024-02-15",
    title: "‘The fundamentals of financial wellbeing are universal,’ says money coach Luca Caruana",
    summary: "How a childhood shaped by family money stress led Luca to financial literacy and workplace financial wellbeing.",
    quote: "Financial literacy should start in schools. It’s a life skill, as essential as reading and writing.",
    url: "https://whoswho.mt/en/the-fundamentals-of-financial-wellbeing-are-universal-says-money-coach-luca-caruana",
  },
  {
    outlet: "Malta CEOs",
    type: "News",
    date: "2026-05-05",
    title: "Money coach proposes mandatory financial education at Maltese schools",
    summary: "Luca’s financial wellness manifesto ahead of the general election, with five proposals starting in secondary school.",
    quote: "Property cannot be the only path to wealth.",
    byline: "Tim Diacono",
    url: "https://maltaceos.mt/money-coach-proposes-mandatory-financial-education-at-maltese-schools/",
  },
  {
    outlet: "Malta CEOs",
    type: "Opinion",
    date: "2026-10-29",
    title: "The €1,000 question the Budget never asked",
    summary: "Budget 2027 raised incomes but ignored how people manage money. Luca’s proposals for Budget 2028.",
    quote: "The Budget 2027 put money in people’s pockets, but did nothing for how they handle money.",
    byline: "Luca Caruana",
    url: "https://maltaceos.mt/the-e1000-question-the-budget-never-asked/",
  },
  {
    outlet: "GROWTHSchema podcast",
    type: "Podcast",
    date: "2025-02-12",
    title: "Luca Caruana on turning financial instability into a mission",
    summary:
      "How Luca’s early experiences of his family’s money struggles shaped his work, and how he balances saving for the future with enjoying the present.",
    youtubeId: "gC10znOEumI",
    listenUrl: "https://open.spotify.com/episode/2KDmUm6TetJ1nMcoJQIB2J",
    url: "https://www.youtube.com/watch?v=gC10znOEumI",
  },
  {
    outlet: "The SMARTA Podcast",
    type: "Podcast",
    title: "What they don’t teach you about money",
    summary:
      "With host Sonia Marta: the emotional side of money, starting small, emergency funds, the Happy Money Fund and the mental blocks that hold people back.",
    youtubeId: "APBAWMqBxMo",
    url: "https://www.youtube.com/watch?v=APBAWMqBxMo",
  },
  {
    outlet: "YouTube · in Maltese",
    type: "Video",
    title: "Can anyone become rich? Planning ahead for when you need the money",
    summary:
      "A conversation in Maltese on planning for the future, whether anyone can become rich and what being rich really means, with practical ideas for using money wisely.",
    youtubeId: "jrp2c9KAooo",
    url: "https://www.youtube.com/watch?v=jrp2c9KAooo",
  },
];
