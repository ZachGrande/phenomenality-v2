'use client';

import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';

import app from '../../config';
import useUserCollection from '../_lib/useUserCollection';
import TagButtonList from '../accomplishments/_components/TagButton';
import allTags from '../accomplishments/_components/tags';

import {
  cacheAccomplishments,
  getCachedAccomplishments,
} from './_components/accomplishmentCache';
import CardList from './_components/Card';
import TagList from './_components/Tag';

import type { Accomplishment } from '@/types/accomplishment';

import 'firebase/auth';
import 'firebase/database';

function Bank() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  // const allTags = ['Technical', 'Soft Skills', 'Kudos', 'Award',
  //  'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'];

  // const [user, loading, error] = useAuthState(auth);
  const [user, isLoading] = useAuthState(auth);
  // Seeding from the cache lets the cards render in the navigation commit, so
  // returning from /bank/view can reverse the card morph.
  const [items, setItems] = useUserCollection<Accomplishment>(
    user,
    'data',
    getCachedAccomplishments(user?.uid) ?? [],
  );

  //NEED TO CHANGE FILTER TYPE TO ARRAY ??
  const [filter, setFilter] = useState('none');

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(-1);
  const [existingDescription, setExistingDescription] = useState('');
  const [existingTitle, setExistingTitle] = useState('');
  const [existingTags, setExistingTags] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      cacheAccomplishments(user.uid, items);
    }
  }, [user, items]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-3 py-12 text-center">
        <p className="text-inactive-text">Loading...</p>
      </div>
    );
  }

  const deleteCard = (id: number) => {
    if (!user) {
      return;
    }
    let newItems = items.filter((currentItem) => {
      return currentItem.id !== id;
    });
    newItems = newItems.map((currentItem, index = 0) => {
      currentItem.id = index + 1;
      currentItem.key = index + '';
      index = index + 1;
      return currentItem;
    });
    setItems(newItems);
    update(ref(database, 'users/' + user.uid), {
      data: newItems,
    });
  };

  const editCard = (id: number) => {
    setShowEditPopup(true);
    setCurrentEditId(id);
    const editItem = items.filter((currentItem) => {
      if (currentItem.id === id) {
        return currentItem;
      }
      return null;
    });
    setExistingDescription(editItem[0].description);
    setExistingTitle(editItem[0].title);
    setExistingTags(editItem[0].tags);
  };

  const toggleFilter = (value: string) => {
    setFilter((current) => (current === value ? 'none' : value));
  };

  function closeEditForm() {
    setShowEditPopup(false);
  }

  function submitForm() {
    if (!user) {
      return;
    }

    let shortAccomp = existingDescription.substring(0, 100);
    if (existingDescription.length > 100) {
      shortAccomp += '...';
    }

    let newItems = items.filter((currentItem) => {
      if (currentItem.id === currentEditId) {
        currentItem.description = existingDescription;
        currentItem.descriptionDisplay = shortAccomp;
        currentItem.title = existingTitle;
      }
      return currentItem;
    });
    newItems = newItems.map((currentItem, index = 0) => {
      currentItem.id = index + 1;
      currentItem.key = index + '';
      index = index + 1;
      return currentItem;
    });
    setItems(newItems);
    update(ref(database, 'users/' + user.uid), {
      data: newItems,
    });
    setShowEditPopup(false);
  }

  const entriesToShow = items.filter((currentItem) => {
    return filter === 'none' || currentItem.tags?.includes(filter);
  });

  function tagListContainer() {
    return (
      <div className="rounded-panel bg-surface p-5 shadow-card">
        <h2 className="font-display text-[1.75rem] font-normal">filter tags</h2>
        <p className="mt-1 mb-4 text-center font-sans text-base text-inactive-text">
          select a tag you would like to filter through your accomplishments
          with!
        </p>
        <TagButtonList
          items={allTags}
          activeTags={filter === 'none' ? [] : [filter]}
          toggleTag={toggleFilter}
        />
      </div>
    );
  }

  if (items.length > 0 && showEditPopup) {
    // TODO: Place form popup in a separate component
    return (
      <div className="mx-auto w-full max-w-6xl px-3">
        <div
          className="fixed inset-0 z-9 bg-black/25"
          onClick={closeEditForm}
        />
        <div
          className="fixed top-[24%] left-1/2 z-10 w-1/2 max-w-125 -translate-x-1/2 translate-y-[5%] rounded-panel shadow-popup outline-1 outline-border-subtle"
          id="popupForm"
        >
          <form
            className="max-w-125 rounded-panel bg-surface p-5"
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <h3>edit accomplishment {currentEditId}</h3>
            <label className="font-display" htmlFor="editTitle">
              title
            </label>
            <input
              className="mt-1.25 mb-5 w-full border-none bg-field p-3.75 focus:bg-field-focus"
              type="text"
              id="editTitle"
              value={existingTitle}
              onChange={(event) => {
                setExistingTitle(event.target.value);
              }}
              name="editTitle"
            ></input>
            <label className="font-display" htmlFor="editDescription">
              description
            </label>
            <input
              className="mt-1.25 mb-5 w-full border-none bg-field p-3.75 focus:bg-field-focus"
              type="text"
              id="editDescription"
              value={existingDescription}
              onChange={(event) => {
                setExistingDescription(event.target.value);
              }}
              name="editDescription"
            ></input>
            <TagList items={existingTags} />
            <div className="flex flex-wrap justify-center text-center">
              <button type="submit" className="m-4 w-fit">
                update
              </button>
              <button
                type="button"
                className="m-4 w-fit bg-muted"
                onClick={closeEditForm}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
        <h1 className="font-display text-4xl font-normal">
          all accomplishments
        </h1>
        <div className="mt-4">{tagListContainer()}</div>
        <CardList
          items={entriesToShow}
          deleteCard={deleteCard}
          editCard={editCard}
        />
      </div>
    );
  } else if (items.length > 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-3 py-6">
        <h1 className="font-display text-4xl font-normal">
          all accomplishments
        </h1>
        <div className="mt-4">{tagListContainer()}</div>
        <CardList
          items={entriesToShow}
          deleteCard={deleteCard}
          editCard={editCard}
        />
      </div>
    );
  } else {
    return (
      <div className="mx-auto w-full max-w-6xl px-3 py-6">
        <h1 className="font-display text-4xl font-normal">
          You have not added to your accomplishment bank!
        </h1>
        {/* TODO: This should not be visible if no accomplishments are present */}
        <div className="mt-4">{tagListContainer()}</div>
      </div>
    );
  }
}

export default Bank;
