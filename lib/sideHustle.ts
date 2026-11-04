// Side Hustle, Done Right — which stage of the launch the page shows by default,
// and where the booking buttons go. Visitors can also open a stage directly with
// /side-hustle/#notify, /side-hustle/#intro or /side-hustle/#programme.

export const sideHustle = {
  // "notify" until booking opens, then "intro" (the €25 intro session), then "programme".
  stage: "notify" as "notify" | "intro" | "programme",
  // TODO: replace with the Stripe payment links when they exist.
  introCheckout: "/contact-us/?subject=Side%20Hustle%20intro",
  programmeCheckout: "/contact-us/?subject=Side%20Hustle%20programme",
};
