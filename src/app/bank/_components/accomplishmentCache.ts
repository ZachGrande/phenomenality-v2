import type { Accomplishment } from '@/types/accomplishment';

/**
 * Last-seen accomplishment list, scoped to the user who loaded it. Lets the
 * bank and view pages render synchronously during client navigation so the
 * card morph has both ends of the pair in the same commit.
 */
let cache: { uid: string; items: Accomplishment[] } | null = null;

export function cacheAccomplishments(uid: string, items: Accomplishment[]) {
  cache = { uid, items };
}

export function getCachedAccomplishments(uid: string | undefined) {
  return uid && cache?.uid === uid ? cache.items : null;
}

export function getCachedAccomplishment(uid: string | undefined, key: string) {
  return (
    getCachedAccomplishments(uid)?.find((item) => item.key === key) ?? null
  );
}
