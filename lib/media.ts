// Luca in the media: interviews, column pieces, TV, podcasts and talks.
// Newest first is applied on the page. `featured` puts an item in the large card at the top.
// Only a headline, a one-line summary and one short quote of Luca's are shown; the link goes to the original.

export type MediaItem = {
  outlet: string;
  type: "Interview" | "Column" | "TV" | "Podcast" | "Talk" | "Article";
  date: string; // YYYY-MM-DD
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
];
