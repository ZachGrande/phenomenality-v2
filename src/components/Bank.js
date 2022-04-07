import React, { useEffect, useState } from 'react';
import '../css/Bank.css';
import { useAuthState } from "react-firebase-hooks/auth";
import app from '../config';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Form from './Form.js';

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

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

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
          const currentItem  = data[key];
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

  // I'm assuming the editCard function could go after this ? 
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

  const entriesToShow = items.filter((currentItem) => {
    return (filter === "none" || currentItem.tags?.includes(filter));
  });

  if (items.length > 0) {
    return (
      <div>
        <Form items={items}
                   setItems={setItems}
                   database={database}
                   user={user}
                   setFilter={setFilter}/>
        <h2 className="bank-title">Your Bank</h2>
        <CardList items={entriesToShow} deleteCard={deleteCard}/>
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
                   setFilter={setFilter}/>
      </div>

    )
  }
}

export default Bank;