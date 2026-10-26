export type Testimonial = { text: string; name: string; role: string; photo?: string; tags: ("coaching" | "workshop" | "course")[] };

// Real client testimonials from the current website.
export const testimonials: Testimonial[] = [
  {
    name: "Lorraine Sammut",
    role: "Key Account Manager",
    photo: "/images/reviews/lorraine-sammut.webp",
    tags: ["coaching"],
    text: "He has all the qualities of a coach. I was a mess when we started and you really helped me in many more ways than I thought you could. Thanks to your feedback I learned that I'm great with short term goals and what I lacked was guidance for long term ones. I put what you said into practice and just 2 months later I'm already seeing the improvement on paper & mentally.",
  },
  {
    name: "Carmelo Romano",
    role: "CTO",
    photo: "/images/reviews/carmelo-romano.webp",
    tags: ["coaching", "course"],
    text: "Unlike a traditional financial advisor, Luca does not dictate investment choices; instead, he expertly opens up a world of possibilities, enabling me to make informed decisions about my savings.",
  },
  {
    name: "Hannah Cremona",
    role: "Entrepreneur",
    photo: "/images/reviews/hannah-cremona.webp",
    tags: ["coaching"],
    text: "As a very practical person myself I appreciate Luca's no BS and no-bells and whistles approach. He was able to give me practical and easy-to-implement solutions with a structure that I can repeat.",
  },
  {
    name: "Chris Cascun",
    role: "CTO",
    tags: ["coaching", "course"],
    text: "I already had some good knowledge of the subjects discussed but he did very well at explaining the missing gaps, and providing insights on the tools and strategies to use for investing and the way to look at finances.",
  },
  {
    name: "Laura Zahra",
    role: "HR Manager",
    tags: ["coaching"],
    text: "Not only is he an expert on the topic, but he is able to explain principles in the simplest of ways and makes discussions around finances less awkward and uncomfortable. I would strongly recommend working with Luca especially if you have a financial goal to reach.",
  },
  {
    name: "Ieva Strekaite",
    role: "Entrepreneur",
    tags: ["coaching"],
    text: "The model Luca has shifted my understanding of money, my relationship with money and eventually brought awareness to my true potential, which allowed me to get back to the business idea that was long on my mind.",
  },
  {
    name: "Marlene Agius",
    role: "Gestalt Psychotherapist",
    tags: ["coaching"],
    text: "Luca has exceeded our expectations by actively listening to our needs. He presented multiple tailored scenarios that allowed us to choose the best path for our financial goals. His guidance created a supportive environment, instilling confidence in our financial decisions.",
  },
  {
    name: "Angele Azzopardi",
    role: "Freelance Creative Director",
    photo: "/images/reviews/angele-azzopardi.webp",
    tags: ["course"],
    text: "Luca helped me understand all I needed to know to start investing. 10/10!",
  },
  {
    name: "Christine Borg",
    role: "Engagement & Culture Manager, HSBC",
    photo: "/images/reviews/christine-borg.webp",
    tags: ["workshop"],
    text: "The session itself was engaging, simple yet effective and refreshing. I have personally attended and organised many workshops regarding money but Luca is the only person that addresses the psychological aspect of money, and that part was definitely what got people most involved and intrigued.",
  },
  {
    name: "Liana Naudi",
    role: "HR Leader, Thomas Smith Group",
    tags: ["workshop"],
    text: "He delivered a presentation to employees on the psychology of money, while exploring and discussing ways one can secure a financial future. Creating awareness helps create more equipped individuals. If you have not yet considered organising such a workshop for your employees, I recommend you get in touch with Luca.",
  },
  {
    name: "Nicole Mangion",
    role: "HR Executive, AMSM",
    tags: ["workshop"],
    text: "Very happy to have worked with Luca to provide money management workshops to our employees. Luca was very easy to work with, and the workshop itself was very well-structured. Useful supporting material was also provided to all attendees.",
  },
  {
    name: "Maria Psaila",
    role: "Training Development Executive, Nectar",
    tags: ["workshop"],
    text: "I really enjoyed the informative session and Luca's approach to presenting his material. Luca is a wonderful, engaging presenter and very easy to listen to.",
  },
  {
    name: "Alexia Cordina",
    role: "Head of People and Culture, 9H Digital",
    tags: ["workshop"],
    text: "We are delighted to endorse Luca and his sessions. The presentation was both captivating and informative, providing our workforce with valuable insights.",
  },
  {
    name: "Abraham Azzopardi",
    role: "International Trainer",
    tags: ["workshop"],
    text: "I had the pleasure of running a week-long training on Financial Literacy together with Luca in Estonia. Luca has the ability to keep the audience listening and to pass on knowledge in an innovative way.",
  },
];

export const byTag = (tag: Testimonial["tags"][number], n = 3) => testimonials.filter((t) => t.tags.includes(tag)).slice(0, n);
