import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/**
 * The public site reads content through a cache (lib/cms/read.ts). Every save or delete in the
 * dashboard clears it, so changes show on the site straight away.
 */
async function refresh() {
  try {
    const { revalidatePath, revalidateTag } = await import("next/cache");
    revalidateTag("cms", { expire: 0 });
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
