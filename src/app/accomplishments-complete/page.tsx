'use client';

import React, { useState, useEffect } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';

import Welcome from './_assets/encourage-message.svg';

import type { EncouragingMessage } from '@/types/accomplishment';

import LinkButton from '@/app/_components/LinkButton';
import app from '@/config';

function AddEncouragement() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState(true);
  const [showEncouragingMessageInput, setShowEncouragingMessageInput] =
    useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    await update(ref(database, 'users/' + user.uid), {
      messages: newItems,
    });
    setIsSubmitting(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (isSubmitting) {
          setShowEncouragingMessageInput(false);
        }
      }}
    >
      {showEncouragingMessageInput && !isSubmitting ? (
        <motion.div
          key="encouragement-form"
          className="m-12.5 flex flex-col items-center px-18.75 py-12.5 outline-1 outline-border-subtle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <h1 className="ml-[0.5em] font-display text-4xl font-normal">
            wonderful accomplishment!
          </h1>
          <p className="m-5 font-sans">
            now write yourself an encouraging message that will be shown you to
            randomly.
          </p>
          <form className="m-8 text-center">
            <textarea
              className="mb-8 w-4/5 border border-border-subtle rounded-panel p-3 font-sans text-base"
              placeholder="example: you've got this!"
              value={encouragingMessage}
              onChange={(event) => {
                setEncouragingMessage(event.target.value);
              }}
              rows={2}
              cols={45}
            />
            <div className="flex justify-end">
              <motion.button
                onClick={addNewEncouragingMessage}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                next
              </motion.button>
            </div>
          </form>
        </motion.div>
      ) : !showEncouragingMessageInput ? (
        <motion.div
          key="closing-message"
          className="m-12.5 flex flex-col items-center px-18.75 py-12.5 outline-1 outline-border-subtle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <h1 className="ml-[0.5em] font-display text-4xl font-normal">
            have a lovely day!
          </h1>
          <p className="m-5 font-sans">
            come back tomorrow to add another accomplishment!
          </p>
          <Image
            className="mx-auto block h-auto w-2/5"
            src={Welcome}
            alt="Two people high fiving"
          />
          <LinkButton
            aria-label="View Accomplishments"
            href="/bank"
            className="mt-4 w-fit self-end"
          >
            view accomplishments
          </LinkButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default AddEncouragement;
