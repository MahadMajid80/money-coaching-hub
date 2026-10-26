// Money Type Quiz: the 78 words from the original quiz, in the original order.
// Each word counts towards one money type. Results are the share of each type's
// words the person ticked.
//
// NOTE: the original quiz scored on the server (WordPress plugin "moneycoach4.0"),
// so its exact word-to-type mapping wasn't visible. The mapping below follows the
// type descriptions in Money Magic. If you have the plugin, replace WORD_TYPES with
// its mapping.

export type TypeSlug = "innocent" | "victim" | "warrior" | "martyr" | "fool" | "creator" | "tyrant" | "magician";

export const WORDS = [
  "Anxious", "Prone to blame", "Highly emotional",
  "Lives in past", "Financially irresponsible", "Seeks rescue",
  "Trusting", "Feels powerless", "Unforgiving",
  "Addictive", "Self-fulfilling prophecy", "Powerful",
  "Naive", "Disciplined", "Goal-oriented",
  "Feels betrayed", "Confident", "Calculating",
  "Highly critical", "Judgmental", "Lives for today",
  "Rescuer", "Careless", "Generous",
  "Resourceful", "Conscious", "Guided by faith",
  "Manipulative", "Happy-go-lucky", "Discerning",
  "Controlling", "Long-suffering", "Caretaker",
  "Self-sacrificing", "Passive-aggressive", "Resentful",
  "Compassionate", "Wise", "Restless",
  "Undisciplined", "Financially successful", "Fearful",
  "Impulsive", "Optimistic", "Overly generous",
  "Adventurous", "Love/hate relationship", "Enlightened",
  "Detached", "Materialistic", "Reclusive",
  "Internally motivated", "Authentic", "Non-materialistic",
  "Balanced", "Unattached", "Indecisive",
  "Passive", "Financially dependent", "Seeks security",
  "Non-confrontational", "Represses feelings & beliefs", "Secretive",
  "Creative", "Obsessive/compulsive", "Collaborative",
  "Transforms reality", "Unsupported", "Over-indulgent",
  "Spiritual", "Reckless", "Loyal",
  "Oppressive", "Angry", "Conflicted",
  "Perfectionist", "Resistant", "Cautious",
] as const;

export const WORD_TYPES: Record<TypeSlug, string[]> = {
  innocent: ["Anxious", "Trusting", "Naive", "Fearful", "Indecisive", "Passive", "Financially dependent", "Seeks security", "Non-confrontational", "Represses feelings & beliefs"],
  victim: ["Prone to blame", "Lives in past", "Seeks rescue", "Feels powerless", "Self-fulfilling prophecy", "Feels betrayed", "Addictive", "Unsupported", "Angry", "Financially irresponsible"],
  warrior: ["Powerful", "Disciplined", "Goal-oriented", "Confident", "Calculating", "Resourceful", "Financially successful", "Internally motivated", "Cautious"],
  martyr: ["Highly emotional", "Highly critical", "Judgmental", "Rescuer", "Caretaker", "Self-sacrificing", "Long-suffering", "Passive-aggressive", "Resentful", "Overly generous", "Perfectionist", "Loyal"],
  fool: ["Lives for today", "Careless", "Happy-go-lucky", "Impulsive", "Optimistic", "Adventurous", "Reckless", "Restless", "Undisciplined", "Over-indulgent"],
  creator: ["Love/hate relationship", "Non-materialistic", "Spiritual", "Creative", "Authentic", "Detached", "Reclusive", "Conflicted", "Resistant", "Unattached"],
  tyrant: ["Unforgiving", "Manipulative", "Controlling", "Materialistic", "Secretive", "Obsessive/compulsive", "Oppressive"],
  magician: ["Generous", "Conscious", "Guided by faith", "Discerning", "Compassionate", "Wise", "Enlightened", "Balanced", "Collaborative", "Transforms reality"],
};

export function score(selected: Set<string>) {
  return (Object.keys(WORD_TYPES) as TypeSlug[])
    .map((t) => {
      const words = WORD_TYPES[t];
      const hits = words.filter((w) => selected.has(w)).length;
      return { type: t, hits, pct: Math.round((hits / words.length) * 100) };
    })
    .sort((a, b) => b.pct - a.pct || b.hits - a.hits);
}
