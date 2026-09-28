'use client';

import { Suspense, ViewTransition, useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import app from '../../../config';
import { getCachedAccomplishment } from '../_components/accomplishmentCache';
import TagList from '../_components/Tag';

import type { Accomplishment } from '@/types/accomplishment';

function AccomplishmentViewContent() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, loading] = useAuthState(auth);
  const searchParams = useSearchParams();
  const accomplishmentKey = searchParams.get('key');
  const cachedAccomplishment = accomplishmentKey
    ? getCachedAccomplishment(accomplishmentKey)
    : null;
  const [accomplishment, setAccomplishment] = useState<Accomplishment | null>(
    cachedAccomplishment,
  );
  const [isLoading, setIsLoading] = useState(!cachedAccomplishment);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user || !accomplishmentKey) {
      setIsLoading(false);
      return;
    }

    const accomplishmentRef = ref(
      database,
      `users/${user.uid}/data/${accomplishmentKey}`,
    );
    const unsubscribe = onValue(accomplishmentRef, (snapshot) => {
      const data = snapshot.val();
      setAccomplishment(data ? { ...data, key: accomplishmentKey } : null);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [accomplishmentKey, database, loading, user]);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-3xl px-3 py-12 text-center">
        <p className="text-inactive-text">Loading accomplishment...</p>
      </main>
    );
  }

  if (!accomplishment || !accomplishmentKey) {
    return (
      <main className="mx-auto w-full max-w-3xl px-3 py-12 text-center">
        <h1 className="font-display text-4xl font-normal">
          Accomplishment not found
        </h1>
        <Link className="mt-6 inline-block text-brand" href="/bank">
          Return to your bank
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-3 py-6">
      <ViewTransition
        name={`accomplishment-${accomplishmentKey}`}
        share="morph"
        default="none"
      >
        <article className="rounded-card bg-cream p-6 font-sans shadow-elevate sm:p-8">
          <p className="font-sans text-sm text-inactive-text">
            {accomplishment.date}
          </p>
          <h1 className="mt-2 font-display text-4xl font-normal">
            {accomplishment.title}
          </h1>
          <p className="mt-6 whitespace-pre-wrap font-sans text-base leading-7">
            {accomplishment.description}
          </p>
          <div className="mt-6">
            <TagList items={accomplishment.tags} />
          </div>
        </article>
      </ViewTransition>
      <Link
        className="mt-6 inline-block text-brand"
        href="/bank"
        transitionTypes={['nav-back']}
      >
        Return to your bank
      </Link>
    </main>
  );
}

function AccomplishmentView() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-3xl px-3 py-12 text-center">
          <p className="text-inactive-text">Loading accomplishment...</p>
        </main>
      }
    >
      <AccomplishmentViewContent />
    </Suspense>
  );
}

export default AccomplishmentView;
