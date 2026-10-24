'use client';

import React, { useState } from 'react';

import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';

import Welcome from './_assets/encourage-message.svg';

import type { EncouragingMessage } from '@/types/accomplishment';

import LinkButton from '@/app/_components/LinkButton';
import StepPanel from '@/app/_components/StepPanel';
import { pressable } from '@/app/_lib/motion';
import useUserCollection from '@/app/_lib/useUserCollection';
import app from '@/config';

function AddEncouragement() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, isLoading] = useAuthState(auth);

  const [showEncouragingMessageInput, setShowEncouragingMessageInput] =
    useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [encouragingMessage, setEncouragingMessage] = useState('');
  const [items, setItems] = useUserCollection<EncouragingMessage>(
    user,
    'messages',
  );

  const addNewEncouragingMessage = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
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
        <StepPanel key="encouragement-form">
          <h1 className="ml-[0.5em] font-display text-4xl font-normal">
            wonderful accomplishment!
          </h1>
          <p className="m-5 font-sans">
            now write yourself an encouraging message that will be shown you to
            randomly.
          </p>
          <form className="m-8 text-center" onSubmit={addNewEncouragingMessage}>
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
              <motion.button type="submit" {...pressable}>
                next
              </motion.button>
            </div>
          </form>
        </StepPanel>
      ) : !showEncouragingMessageInput ? (
        <StepPanel key="closing-message">
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
          <LinkButton href="/bank" className="mt-4 w-fit self-end">
            view accomplishments
          </LinkButton>
        </StepPanel>
      ) : null}
    </AnimatePresence>
  );
}

export default AddEncouragement;
