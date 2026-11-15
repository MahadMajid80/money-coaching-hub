# Blog engine (weekly)

Four articles a week (Mon, Tue, Thu, Sat at 07:00 Malta) drafted from Luca's Money Coach columns
(Project docs) following the Blog Content Calendar Sheet. Each Sunday morning:

1. Pick the next 4 rows of the calendar (status "Idea", dates Mon–Sat of the coming week).
2. Read the source columns listed in the row; write each article in markdown (see week-2026-11-16/ for the
   house style: short answer quote first, story, H2 sections, plain numbers, "Frequently asked questions" with
   H3 questions, CTA to /investing-made-simple/ or /services/, education-not-advice footer). Verify every
   fact and figure on the web; compute numbers in code.
3. Covers with covers.py (copy week-2026-11-16/covers_week.py as a model), render with render.js (Playwright),
   convert to webp. Look at every image before using it.
3b. In-article visuals: one per article where there are numbers (chart, comparison table, worksheet or checklist),
   rendered as 1200px-wide brand images (see week-2026-11-16/visuals.py; chart colours were checked with the dataviz
   validator). Place them with a line `{{img:<key>|<alt text that states the data>}}` in the markdown; md2lex turns it
   into an upload node and the migration uploads the image and swaps in its media id. No chart on sensitive stories.
4. Write teasers.py (LinkedIn post per article; link goes in the first comment).
5. Build the migration with build_migration.py (copy and edit the ARTICLES list), register it in
   migrations/index.ts, open a PR. Future-dated posts are saved as drafts plus a `schedulePublish` job
   (waitUntil 05:55 UTC on the day); the daily Vercel cron (06:00 UTC) publishes them. Merge = approval.
   Data migrations must refuse to run when VERCEL_ENV === 'preview' (shared live DB). Right after a merge,
   several server instances can run the migration at the same time: keep the try/catch around the post create
   (it removes the images it uploaded and skips the post if another instance got there first).
6. Build the review page with review.py, publish it as an artifact, set the calendar rows to "Ready for Luca".
