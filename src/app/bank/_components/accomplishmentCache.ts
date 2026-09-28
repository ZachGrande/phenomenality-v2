import type { Accomplishment } from '@/types/accomplishment';

const accomplishments = new Map<string, Accomplishment>();

export function getCachedAccomplishment(key: string) {
  return accomplishments.get(key) ?? null;
}

export function cacheAccomplishment(accomplishment: Accomplishment) {
  accomplishments.set(accomplishment.key, accomplishment);
}
