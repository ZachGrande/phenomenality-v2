import { useEffect, useState } from 'react';

import { getDatabase, onValue, ref } from 'firebase/database';

import type { User } from 'firebase/auth';

import app from '@/config';

const noItems: never[] = [];

/**
 * Live list stored at `users/{uid}/{path}`. Each item gets its database key
 * attached. Unsubscribes on unmount and whenever the user changes.
 */
export default function useUserCollection<T extends { key: string }>(
  user: User | null | undefined,
  path: string,
  initialItems: T[] = [],
) {
  const [items, setItems] = useState<T[]>(initialItems);

  useEffect(() => {
    if (!user) {
      return;
    }

    const dbRef = ref(getDatabase(app), `users/${user.uid}/${path}`);
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val() as Record<string, T> | T[] | null;
      setItems(
        data
          ? Object.entries(data).map(([key, item]) => ({ ...item, key }))
          : [],
      );
    });
  }, [user, path]);

  return [user ? items : noItems, setItems] as const;
}
