// Cached reads from the dashboard's database, for the public site.
// Pages are still built on every visit (so the per-visit security nonce stays), but the content
// comes from Next's data cache instead of the database: no Payload start-up or Turso round trips
// on a cache hit. Every save in the dashboard clears the cache (payload/hooks/revalidate.ts), each
// new deployment starts fresh, and entries also refresh on their own after an hour.
// Drafts and previews always read live.
import "server-only";
import { unstable_cache } from "next/cache";
import type { Payload } from "payload";
import { cms } from "./payload";

export const CMS_TAG = "cms";
// A new deployment starts with a fresh cache (content added by migrations shows straight away).
const BUILD = process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_GIT_COMMIT_SHA || "local";

type Find = Payload["find"];
type FindGlobal = Payload["findGlobal"];
type Count = Payload["count"];
type Method = "find" | "findGlobal" | "count";

function call<T>(method: Method, args: Record<string, unknown>): Promise<T> {
  const live = async () => {
    const payload = await cms();
    return (payload[method] as (a: unknown) => Promise<T>)(args);
  };
  // Drafts, previews and anything that bypasses access control are never cached.
  if (args.draft || args.overrideAccess || args.req) return live();
  return unstable_cache(live, [CMS_TAG, BUILD, method, JSON.stringify(args)], { tags: [CMS_TAG], revalidate: 3600 })();
}

/** Same calls as the Payload client (find, findGlobal, count), answered from the cache when possible. */
export async function cmsRead() {
  return {
    find: ((args) => call("find", args as never)) as Find,
    findGlobal: ((args) => call("findGlobal", args as never)) as FindGlobal,
    count: ((args) => call("count", args as never)) as Count,
  };
}
