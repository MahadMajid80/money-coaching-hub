import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/**
 * The site reads content straight from the database on every request, so there is
 * no cache to clear today. These hooks are kept as the single place to add cache
 * clearing later (for example if pages are made static for speed).
 */
async function refresh() {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    // Not running inside Next (e.g. the seed script) – nothing to clear.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await refresh();
  return doc;
};
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await refresh();
  return doc;
};
export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  await refresh();
  return doc;
};
