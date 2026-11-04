// The editable fields of each designed page, generated from the page designs.
// Each page has sections; each section has text, links and images with their
// original content as the default.
import home from "@/content/page-schemas/home.json";
import investing from "@/content/page-schemas/investing.json";
import coaching from "@/content/page-schemas/coaching.json";
import workshops from "@/content/page-schemas/workshops.json";
import contact from "@/content/page-schemas/contact.json";
import quiz from "@/content/page-schemas/quiz.json";
import moneyTypes from "@/content/page-schemas/money-types.json";
import house from "@/content/page-schemas/house.json";
import sideHustle from "@/content/page-schemas/side-hustle.json";
import luca from "@/content/page-schemas/luca.json";

export type SchemaField = {
  name: string;
  label: string;
  kind: string;
  type: "text" | "textarea" | "upload" | "checkbox";
  default: string | boolean;
  styled?: boolean;
};
export type PageSchema = { slug: string; label: string; groups: { name: string; label: string; fields: SchemaField[] }[] };

export const pageSchemas = [home, investing, coaching, workshops, contact, quiz, moneyTypes, house, sideHustle, luca] as PageSchema[];

/** Public path of each page, for "view on site" links. */
export const pagePaths: Record<string, string> = {
  home: "/",
  investing: "/investing-made-simple/",
  coaching: "/services/",
  workshops: "/services/financial-workshops/",
  contact: "/contact-us/",
  quiz: "/take-money-type-quiz/",
  "money-types": "/the-8-money-archetypes/",
  house: "/portfolio-management/",
  "side-hustle": "/side-hustle/",
  luca: "/luca/",
};
