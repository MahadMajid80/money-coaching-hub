import type { ServerProps } from "payload";
import { SeedButton } from "./SeedButton";
import { WordPressImportButton } from "./WordPressImportButton";

const card: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "16px 18px",
  borderRadius: 12,
  border: "1px solid var(--theme-elevation-150)",
  background: "var(--theme-elevation-0)",
  textDecoration: "none",
  color: "inherit",
};

const shortcuts = [
  { href: "/admin/collections/posts/create", title: "Write a blog post", text: "Draft, schedule or publish an article" },
  { href: "/admin/collections/courses", title: "Course dates & prices", text: "Dates, prices, Stripe links, sessions" },
  { href: "/admin/globals/page-home", title: "Edit the homepage", text: "Every text, button and photo" },
  { href: "/admin/collections/testimonials", title: "Reviews", text: "Add a review and choose where it shows" },
  { href: "/admin/collections/columns/create", title: "Add a column link", text: "Your latest Times of Malta article" },
  { href: "/admin/collections/media", title: "Photos & files", text: "Upload images, set the focus point" },
  { href: "/admin/collections/enquiries", title: "Enquiries", text: "Messages sent through the site" },
  { href: "/admin/globals/site-settings", title: "Menu, footer & SEO", text: "Logo, menu, announcement bar, tracking" },
];

export async function Welcome({ payload, user }: ServerProps) {
  let newEnquiries = 0;
  let empty = false;
  let wpImported = 0;
  try {
    empty = (await payload.count({ collection: "courses" })).totalDocs === 0;
  } catch {}
  try {
    wpImported = (await payload.count({ collection: "posts", where: { wpId: { exists: true } } })).totalDocs;
  } catch {}
  try {
    const r = await payload.count({ collection: "enquiries", where: { handled: { not_equals: true } } });
    newEnquiries = r.totalDocs;
  } catch {}
  const name = (user as { name?: string } | undefined)?.name?.split(" ")[0];
  return (
    <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0 }}>Hello{name ? `, ${name}` : ""} 👋</h2>
          <p style={{ margin: "6px 0 0", opacity: 0.8 }}>
            Everything on moneycoachinghub.com is editable here. Changes show on the site as soon as you press Save or Publish.
          </p>
        </div>
        <a href="/" target="_blank" rel="noopener" className="btn btn--style-primary btn--size-medium" style={{ margin: 0 }}>
          View the website ↗
        </a>
      </div>
      {empty && <SeedButton />}
      {!empty && wpImported < 10 && <WordPressImportButton />}
      {newEnquiries > 0 && (
        <a href="/admin/collections/enquiries?where[handled][not_equals]=true" style={{ ...card, borderColor: "#FAAC15", background: "rgba(250,172,21,.12)" }}>
          <strong>
            {newEnquiries} new {newEnquiries === 1 ? "enquiry" : "enquiries"} waiting
          </strong>
          <span style={{ opacity: 0.8 }}>Open the inbox →</span>
        </a>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {shortcuts.map((s) => (
          <a key={s.href} href={s.href} style={card}>
            <strong>{s.title}</strong>
            <span style={{ fontSize: 13, opacity: 0.75 }}>{s.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
