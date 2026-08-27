'use client';

import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import Welcome from './_assets/encourage-message.svg';

import type { EncouragingMessage } from '@/types/accomplishment';

import styles from '@/app/accomplishments/_styles/page.module.css';
import app from '@/config';

function AddEncouragement() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState(true);
  const [showEncouragingMessageInput, setShowEncouragingMessageInput] =
    useState(true);
  const [encouragingMessage, setEncouragingMessage] = useState('');
  const [items, setItems] = useState<EncouragingMessage[]>([]);

  onAuthStateChanged(auth, () => {
    setIsLoading(false);
  });

  useEffect(() => {
    const dbRef = ref(database, 'users/' + user?.uid + '/messages');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setItems([]);
        return null;
      }
      const keys = Object.keys(data);
      const newItems = keys.map((key) => {
        const currentItem = data[key] as EncouragingMessage;
        currentItem.key = key;
        return currentItem;
      });
      setItems(newItems);
    });
  }, [isLoading, database, user]);

  const addNewEncouragingMessage = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    const newItems = [...items, { description: encouragingMessage }].map(
      (currentItem, index) => ({
        ...currentItem,
        id: index + 1,
        key: index + '',
      }),
    );

    setItems(newItems);
    setEncouragingMessage('');
    update(ref(database, 'users/' + user.uid), {
      messages: newItems,
    });
    setShowEncouragingMessageInput(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (showEncouragingMessageInput) {
    return (
      <div className={styles.outlineBox}>
        <h1 className={styles.h1Accomp}>wonderful accomplishment!</h1>
        <p className={styles['encrg-p']}>
          now write yourself an encouraging message that will be shown you to
          randomly.
        </p>
        <form className={styles.encrgCenter}>
          <textarea
            className={clsx(
              styles.accompTextarea,
              styles['encrg-bottom-padding'],
            )}
            placeholder="example: you've got this!"
            value={encouragingMessage}
            onChange={(event) => {
              setEncouragingMessage(event.target.value);
            }}
            rows={2}
            cols={45}
          />
          <div>
            <button
              className={styles.accomplishmentNext}
              onClick={addNewEncouragingMessage}
            >
              next
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.outlineBox}>
        <h1 className={styles.h1Accomp}>have a lovely day!</h1>
        <p className={styles['encrg-p']}>
          come back tomorrow to add another accomplishment!
        </p>
        <Image
          className={clsx(styles.centerImg, 'h-auto w-2/5')}
          src={Welcome}
          alt="Two people high fiving"
        />
        <br></br>
        <Link
          aria-label="View Accomplishments"
          className={clsx(
            styles.button,
            styles['rmv-underline'],
            styles.viewAccompBtn,
            styles.nextButton,
          )}
          role="button"
          href="/bank"
        >
          view accomplishments
        </Link>
        <br></br>
      </div>
    );
  }
}

export default AddEncouragement;
