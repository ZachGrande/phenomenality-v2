'use client';

import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';

import app from '../../config';
import TagButtonList from '../accomplishments/_components/TagButton';
import allTags from '../accomplishments/_components/tags';

import CardList from './_components/Card';
import TagList from './_components/Tag';
import popupStyles from './_styles/Popup.module.css';

import type { Accomplishment } from '@/types/accomplishment';

import 'firebase/auth';
import 'firebase/database';

function Bank() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  // const allTags = ['Technical', 'Soft Skills', 'Kudos', 'Award',
  //  'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'];

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [items, setItems] = useState<Accomplishment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //NEED TO CHANGE FILTER TYPE TO ARRAY ??
  const [filter, setFilter] = useState('none');

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(-1);
  const [existingDescription, setExistingDescription] = useState('');
  const [existingTitle, setExistingTitle] = useState('');
  const [existingTags, setExistingTags] = useState<string[]>([]);

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
    /*} else {
    console.log("Did not retrieve user location from database");
    }*/
  }, [isLoading, database, user]);

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

  const viewCard = (id: number) => {
    setShowViewPopup(true);
    const viewItem = items.filter((currentItem) => {
      if (currentItem.id === id) {
        return currentItem;
      }
      return null;
    });
    setExistingDescription(viewItem[0].description);
    setExistingTitle(viewItem[0].title);
    setExistingTags(viewItem[0].tags);
  };

  const toggleFilter = (value: string) => {
    setFilter((current) => (current === value ? 'none' : value));
  };

  function closeEditForm() {
    setShowEditPopup(false);
  }

  function closeViewForm() {
    setShowViewPopup(false);
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
        <div className={popupStyles.overlay} onClick={closeEditForm} />
        <div className={popupStyles.formPopup} id="popupForm">
          <form
            action="/action_page.php"
            className="max-w-125 rounded-panel bg-surface p-5"
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
              <button type="button" className="m-4 w-fit" onClick={submitForm}>
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
          viewCard={viewCard}
        />
      </div>
    );
  } else if (items.length > 0 && showViewPopup) {
    return (
      <div>
        <div className={popupStyles.overlay} onClick={closeViewForm} />
        <div className={popupStyles.formPopup} id="popupForm">
          <form className="max-w-125 rounded-panel bg-surface p-5">
            <h3>expanded view</h3>
            <label className="font-display" htmlFor="viewTitle">
              title
            </label>
            <p
              className="rounded-panel bg-surface p-2 outline-1 outline-border-subtle"
              id="viewTitle"
            >
              {existingTitle}
            </p>
            <label className="font-display" htmlFor="viewDescription">
              description
            </label>
            <p
              className="rounded-panel bg-surface p-2 outline-1 outline-border-subtle"
              id="viewDescription"
            >
              {existingDescription}
            </p>
            <label className="font-display" htmlFor="viewTags">
              tags
            </label>
            <div className="tags-background">
              <TagList items={existingTags} />
            </div>
            <div className="flex flex-wrap justify-center text-center">
              <button
                type="button"
                className="m-4 w-fit bg-muted"
                onClick={closeViewForm}
              >
                close
              </button>
            </div>
          </form>
        </div>
        <div className="mx-auto w-full max-w-6xl px-3">
          <h1 className="font-display text-4xl font-normal">
            all accomplishments
          </h1>
          <div className="mt-4">{tagListContainer()}</div>
          <CardList
            items={entriesToShow}
            deleteCard={deleteCard}
            editCard={editCard}
            viewCard={viewCard}
          />
        </div>
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
          viewCard={viewCard}
        />
      </div>
    );
  } else if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-3 py-12 text-center">
        <p className="text-inactive-text">Loading your card list.</p>
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
