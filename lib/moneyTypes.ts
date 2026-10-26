// The eight money types (archetypes), from Money Magic by Deborah L. Price, as used on Money Coaching Hub.

export type MoneyType = {
  slug: string;
  name: string;
  short: string;
  mantra?: string[];
  body: string[];
};

export const moneyTypes: MoneyType[] = [
  {
    slug: "innocent",
    name: "The Innocent",
    short: "Avoids looking at money and hopes it works out.",
    mantra: ["It's all too hard! Where do I begin?", "I don't know anything about this stuff!", "Why does thinking about money have to be so stressful?"],
    body: [
      "The Innocent is someone who may lack the confidence to navigate finances, and as a result frequently feels overwhelmed or anxious. Insecurities show up in inner dialogue such as “I'm not good with money” or “it's too complicated for me”, making it difficult to trust their own judgment.",
      "This makes them reliant on others' opinions, which can leave them financially vulnerable. Most of us start out in life with no experience of managing our finances. As we grow, some take it upon themselves to learn, but for Innocents, money can seem daunting, and they'd rather someone else made the decisions.",
    ],
  },
  {
    slug: "victim",
    name: "The Victim",
    short: "Feels money happens to them, not by them.",
    body: [
      "The Victim is stuck in a cycle of blaming external forces for their financial troubles. While they may have endured unfortunate circumstances, Victims don't take the responsibility or action that would give them the chance to improve their situation, and often look for others to carry the burden instead.",
      "This can arise from difficult childhoods, feeling betrayed by others, or past financial loss, trapping them in a self-fulfilling prophecy. Unprocessed pain leads to thoughts like “what's the point” and “nothing good ever happens”, leaving them looking for validation and rescue.",
    ],
  },
  {
    slug: "warrior",
    name: "The Warrior",
    short: "In the driving seat: decisive and goal-driven.",
    body: [
      "Warriors are powerful and confident, but in a balanced way. They understand how to take control of their finances and make wise investment decisions that work for them.",
      "They don't rely too heavily on advice from others, believing in themselves as they make financial choices guided by intuition and logic. Setting goals with rationality and discipline lets them implement creative money-making solutions while staying focused on the path towards prosperity.",
    ],
  },
  {
    slug: "martyr",
    name: "The Martyr",
    short: "Takes care of everyone else's needs first.",
    body: [
      "Martyrs are known for their selflessness and generosity, often putting the needs of others before their own finances. However, they often attach strings to their good deeds, expecting something in return that may not be realistic, which can leave them feeling let down over time.",
      "Martyrdom is often tied to perfectionism and control. What if Martyrs put themselves first for once? With mindful money management, they could receive the same support they so readily give out.",
    ],
  },
  {
    slug: "fool",
    name: "The Fool",
    short: "Loves risk, lives for today, and money slips away.",
    body: [
      "The Fool loves taking risks and has no fear of leaving financial success to chance. They take a carefree attitude towards money, focusing more on the adventure than on securing a safe fortune, and are always ready for new opportunities.",
      "The Fool is a true optimist. They draw in money with ease but find it hard to keep, driven by a desire for instant gratification: “if I don't try it now, when will I?” Staying grounded takes the kind of self-restraint that comes naturally to the Warrior.",
    ],
  },
  {
    slug: "creator",
    name: "The Creator / Artist",
    short: "Wants freedom, but has a love/hate relationship with money.",
    body: [
      "Creators and Artists, who often travel a spiritual or creative path, know the love/hate relationship they have with money. They want to be financially free but may reject the materialistic values that come with it, leading to financial blocks and the stereotype of “the starving artist”.",
      "Creators should strive for balance between their material needs and spiritual goals. Managed consciously, a healthy relationship with money can support your creative pursuits and your life purpose.",
    ],
  },
  {
    slug: "tyrant",
    name: "The Tyrant",
    short: "Uses money to stay in control.",
    mantra: ["Money buys happiness.", "I must win, no matter what price I pay."],
    body: [
      "Tyrants fear a loss of control and use money as a tool to exert influence: an overdeveloped Warrior, driven by the need for dominance and power rather than care for others.",
      "Despite appearances, Tyrants are often plagued with insecurity, feeling incomplete or unfulfilled, which can lead to deep unhappiness. They often pursue money to gain control over the world around them.",
    ],
  },
  {
    slug: "magician",
    name: "The Magician",
    short: "Calm, confident and in control.",
    body: [
      "Magicians have a unique money wisdom, unlocked by exploring their money story and making peace with family financial dynamics. Their thoughtful approach lets them make smart decisions aligned with what matters most: feeling secure today and prepared for the future.",
      "Magicians enjoy clarity around needs versus wants and confidence in their financial choices, leading to real freedom from day-to-day money stress. They see money as an ally, trust that their needs will be met, and let their values guide their decisions.",
    ],
  },
];
