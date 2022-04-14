import React, { useEffect, useState } from 'react';
import '../css/Bank.css';
import { useAuthState } from "react-firebase-hooks/auth";
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Form from './Form.js';
import '../css/Popup.css';

import 'firebase/auth';
import 'firebase/database';

import CardList from './Card.js';

function Bank() {

  const auth = getAuth(app);
  const database = getDatabase(app);

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState("none");

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(-1);
  const [existingDescription, setExistingDescription] = useState("");

  onAuthStateChanged(auth, () => {
    setIsLoading(false);
  })

  useEffect(() => {
    // if (isLoading !== false) {
    // console.log("User", user.uid);
    const dbRef = ref(database, 'users/' + user?.uid + '/data');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (data === null) {
        setItems([]);
        return null;
      }
      const keys = Object.keys(data);
      // console.log("Keys", keys);
      const newItems = keys.map((key) => {
        const currentItem = data[key];
        currentItem.key = key;
        // console.log("Current item", key, currentItem);
        return currentItem;
      })
      // console.log("New items!", newItems);
      setItems(newItems);
    });
    // } else {
    // console.log("Did not retrieve user location from database");
    // }
  }, [isLoading, database, user]);

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  const deleteCard = id => {
    // console.log("Button pushed for card", id);
    let newItems = items.filter((currentItem) => {
      // console.log(currentItem.id, id, currentItem.id !== id)
      return currentItem.id !== id;
    })
    // console.log("Initial new items", newItems);
    newItems = newItems.map((currentItem, index = 0) => {
      // console.log(currentItem);
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })
    setItems(newItems);
    // console.log("New items", newItems);
    update(ref(database, 'users/' + user.uid), {
      data: newItems
    });
  }

  const editCard = id => {
    setShowEditPopup(true);
    setCurrentEditId(id);
    let editItem = items.filter((currentItem) => {
      if (currentItem.id === id) {
        return currentItem;
      }
    });
    setExistingDescription(editItem[0].description);
  }

  function closeForm() {
    setShowEditPopup(false);
  }

  function submitForm() {
    console.log("submit Form clicked");

    let newItems = items.filter((currentItem) => {
      if (currentItem.id === currentEditId) {
        currentItem.description = existingDescription;
      }
      return currentItem;
    })
    newItems = newItems.map((currentItem, index = 0) => {
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })
    setItems(newItems);
    update(ref(database, 'users/' + user.uid), {
      data: newItems
    });
    setShowEditPopup(false);
  }

  const entriesToShow = items.filter((currentItem) => {
    return (filter === "none" || currentItem.tags?.includes(filter));
  });

  if (items.length > 0 && showEditPopup) {
    return (
      <div>
        <Form items={items}
          setItems={setItems}
          database={database}
          user={user}
          setFilter={setFilter} />
        <h2 className="bank-title">Your Bank</h2>
        <div className="formPopup" id="popupForm">
          {/* this is an action for when the enter button is clicked? */}
          <form action="/action_page.php" className="formContainer">
            <h3>Edit Accomplishment {currentEditId}</h3>
            <label htmlFor="editDescription">Description</label>
            <input type="text"
                   id="editDescription"
                   value={existingDescription}
                   onChange={(event) => {
                    setExistingDescription(event.target.value);
                  }}
                   name="editDescription"></input>
            <button type="button" className="btn" onClick={submitForm}>Update</button>
            <button type="button" className="btn cancel" onClick={closeForm}>Cancel</button>
          </form>
        </div>
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard} />
      </div>
    )
  } else if (items.length > 0) {
    return (
      <div>
        <Form items={items}
          setItems={setItems}
          database={database}
          user={user}
          setFilter={setFilter} />
        <h2 className="bank-title">Your Bank</h2>
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard} />
      </div>
    )
  } else if (loading) { // does not work at the moment
    return (
      <p>Loading your card list.</p>
    )
  } else {
    return (
      <div>
        <p>You have not added to your credibility bank!</p>
        <Form items={items}
          setItems={setItems}
          database={database}
          user={user}
          setFilter={setFilter} />
      </div>

    )
  }
}

export default Bank;