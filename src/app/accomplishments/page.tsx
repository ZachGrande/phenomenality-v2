'use client';

import { useState, useEffect } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import app from '../../config';
import LinkButton from '../_components/LinkButton';

import WelcomeMessage from './_assets/accomplishment-demo/accomplishment-1.png';
import DailyAccomplishment from './_assets/accomplishment-demo/accomplishment-2.png';
import WonderfulAccomplishment from './_assets/accomplishment-demo/accomplishment-3.png';
import AccomplishmentComplete from './_assets/accomplishment-demo/accomplishment-4.png';
import SampleBank from './_assets/accomplishment-demo/accomplishment-5.png';
import SampleBankFilter from './_assets/accomplishment-demo/accomplishment-6.png';
import Welcome from './_assets/welcome-message.svg';
import TagButtonList from './_components/TagButton';
import tags from './_components/tags';

import type { Accomplishment } from '@/types/accomplishment';

function AddAccomplishment() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  const titlePlaceholder = 'accomplishment for ' + date;

  const [items, setItems] = useState<Accomplishment[]>([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [accomplishment, setAccomplishment] = useState('');
  const [accomplishmentTags, setAccomplishmentTags] = useState<string[]>([]);
  const [accomplishmentDescription, setAccomplishmentDescription] =
    useState('');

  const [showWelcome, setShowWelcome] = useState(true);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  onAuthStateChanged(auth, () => {
    setIsLoading(false);
  });

  useEffect(() => {
    const dbRef = ref(database, 'users/' + user?.uid + '/data');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setItems([]);
        return null;
      }
      const keys = Object.keys(data);
      const newItems = keys.map((key) => {
        const currentItem = data[key];
        currentItem.key = key;
        return currentItem;
      });
      setItems(newItems);
    });
  }, [isLoading, database, user]);

  useEffect(() => {
    const dbRef = ref(database, 'users/' + user?.uid + '/user');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setName('');
        return null;
      }
      const currentName = data.firstName;
      setName(currentName);
    });
  }, [isLoading, database, user]);

  useEffect(() => {
    if (items) {
      const hasLogged = items.some((currentItem) => currentItem.date === date);
      setHasLoggedToday(hasLogged);
    }
  }, [items, date]);

  useEffect(() => {
    let shortAccomp = accomplishment.substring(0, 100);
    if (accomplishment.length > 100) {
      shortAccomp += '...';
    }
    setAccomplishmentDescription(shortAccomp);
  }, [accomplishment]);

  const addNewAccomplishment = async () => {
    if (!user) {
      return;
    }

    const thisAccomplishment = {
      title: title,
      description: accomplishment,
      descriptionDisplay: accomplishmentDescription,
      tags: accomplishmentTags,
      date: date,
    };

    const newItems = [...items, thisAccomplishment].map(
      (currentItem, index) => ({
        ...currentItem,
        id: index + 1,
        key: index + '',
      }),
    );

    setItems(newItems);
    setTitle('');
    setAccomplishment('');
    await update(ref(database, 'users/' + user.uid), {
      data: newItems,
    });
  };

  const submitAccomplishment = async (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    await addNewAccomplishment();
    setIsSubmitting(true);
  };

  /*const editTag = value => {
    let newTags = accomplishmentTags;
    let idName = value.replace(/\s+/g, '');
    document.getElementById(idName).classList.toggle('selected');;
    if (!accomplishmentTags.includes(value)) {
      newTags.push(value)
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    console.log(accomplishmentTags);
    setAccomplishmentTags(newTags);
  }*/

  const toggleTag = (value: string) => {
    setAccomplishmentTags((prev) =>
      prev.includes(value)
        ? prev.filter((tag) => tag !== value)
        : [...prev, value],
    );
  };

  function advancePage() {
    setShowWelcome(false);
  }

  const toggleHasLoggedToday = () => {
    setHasLoggedToday(!hasLoggedToday);
    setShowWelcome(false);
  };

  if (isLoading) {
    return <p className="font-sans font-light">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="mx-8 flex flex-col justify-center">
        <h1 className="font-display text-base font-normal">
          you haven&apos;t logged in yet!
        </h1>
        <p className="font-sans font-light">
          sign in to begin logging your accomplishments.
        </p>
        <LinkButton
          aria-label="Sign in"
          href="/authentication"
          className="w-fit"
        >
          sign in
        </LinkButton>
        <h2 className="text-center font-display">
          here&apos;s what phenomenality can offer you!
        </h2>
        <div>
          <Image
            className="mx-auto block h-auto w-full max-w-375 bg-transparent p-4 md:p-8"
            src={WelcomeMessage}
            alt="welcome-message"
            width={2876}
            height={1794}
          />
        </div>
        <div>
          <Image
            className="mx-auto block h-auto w-full max-w-375 bg-transparent p-4 md:p-8"
            src={DailyAccomplishment}
            alt="daily-accomplishment"
            width={2872}
            height={1800}
          />
        </div>
        <div>
          <Image
            className="mx-auto block h-auto w-full max-w-375 bg-transparent p-4 md:p-8"
            src={WonderfulAccomplishment}
            alt="wonderful-accomplishment"
          />
        </div>
        <div>
          <Image
            className="mx-auto block h-auto w-full max-w-375 bg-transparent p-4 md:p-8"
            src={AccomplishmentComplete}
            alt="accomplishment-complete"
          />
        </div>
        <div>
          <Image
            className="mx-auto block h-auto w-full max-w-375 bg-transparent p-4 md:p-8"
            src={SampleBank}
            alt="sample-bank"
          />
        </div>
        <div>
          <Image
            className="mx-auto block h-auto w-full max-w-375 bg-transparent p-4 md:p-8"
            src={SampleBankFilter}
            alt="sample-bank-filter"
          />
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (isSubmitting) {
          router.push('/accomplishments-complete');
        }
      }}
    >
      {showWelcome && hasLoggedToday ? (
        <motion.div
          key="already-logged"
          className="m-12.5 flex flex-col items-center px-18.75 py-12.5 outline-1 outline-border-subtle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <h1 className="ml-[0.5em] font-display text-4xl font-normal">
            you&apos;ve already logged an accomplishment today!
          </h1>
          <div className="flex flex-row">
            <div className="flex flex-col items-center">
              <p className="m-5 font-sans font-light">
                visit your bank to view your accomplishments.
              </p>
              <LinkButton
                aria-label="View Accomplishments"
                href="/bank"
                className="ml-8 h-11.25 w-fit"
              >
                view accomplishments
              </LinkButton>
            </div>
            <div className="flex flex-col items-center">
              <p className="m-5 font-sans font-light">
                or add another accomplishment for today.
              </p>
              <motion.button
                className="ml-8 h-11.25"
                onClick={toggleHasLoggedToday}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                add new accomplishment
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : showWelcome ? (
        <motion.div
          key="welcome"
          className="m-12.5 flex flex-col items-center px-18.75 py-12.5 outline-1 outline-border-subtle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <h1 className="ml-[0.5em] font-display text-4xl font-normal">
            hello, {name}!
          </h1>
          <p className="m-5 font-sans text-2xl font-light">
            great work today! keep moving forward and record an accomplishment!
          </p>
          <Image
            className="mx-auto block h-auto w-[30%]"
            src={Welcome}
            alt="Person sitting in chair reading book"
          />
          <motion.button
            className="mt-4"
            onClick={advancePage}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            next
          </motion.button>
        </motion.div>
      ) : !isSubmitting ? (
        <motion.div
          key="form"
          className="m-12.5 flex flex-col items-center px-18.75 py-12.5 outline-1 outline-border-subtle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <h1 className="ml-[0.5em] font-display text-4xl font-normal">
            daily accomplishment
          </h1>
          <p className="m-5 font-sans font-light">
            what would you like to record?
          </p>
          <div>
            <form className="flex flex-col items-center gap-4">
              <textarea
                className="w-4/5 rounded-panel border border-border-subtle p-3 font-sans text-base"
                id="accomplishment-title"
                name="title"
                aria-label="Accomplishment title"
                placeholder={titlePlaceholder}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                rows={2}
                cols={45}
              ></textarea>
              <textarea
                className="w-4/5 rounded-panel border border-border-subtle p-3 font-sans text-base"
                id="accomplishment-description"
                name="description"
                aria-label="Accomplishment description"
                placeholder="description"
                value={accomplishment}
                onChange={(event) => {
                  setAccomplishment(event.target.value);
                }}
                rows={10}
                cols={45}
              ></textarea>
              <div id="tagSection">
                <p className="text-left font-sans text-[1.75rem] font-normal">
                  add a tag to your post so you can find it later!
                </p>
                <TagButtonList
                  items={tags}
                  activeTags={accomplishmentTags}
                  toggleTag={toggleTag}
                />
              </div>
              <LinkButton
                aria-label="Next"
                href="/accomplishments-complete"
                onClick={submitAccomplishment}
                className="w-fit self-end"
              >
                next
              </LinkButton>
            </form>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default AddAccomplishment;
