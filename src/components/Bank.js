import React, { useEffect, useState } from 'react';
import '../css/Bank.css';
import { useAuthState } from "react-firebase-hooks/auth";
import app from '../config';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';

import 'firebase/auth';
import 'firebase/database';

import CardList from './Card.js';
import { map } from '@firebase/util';

function Bank(props) {

  const auth = getAuth(app);
  const database = getDatabase(app);

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [accomplishment, setAccomplishment] = useState("");
  const [status, setStatus] = useState("success");
  const [tags, setTags] = useState([]);

  const [filter, setFilter] = useState("none");
  
  // console.log("Current state:", items);

  // console.log("Loading", loading);

  // console.log("user", user);

  // console.log("Tags", tags);
  // console.log("Filtering by", filter);

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

  const addNewAccomplishment = async (event) => {
    event.preventDefault();
    let thisAccomplishment = {
      complete: true,
      description: accomplishment,
      id: items.length + 1,
      key: items.length + "",
      status: status,
      tags: tags
    }
    let newItems = items.push(thisAccomplishment);
    newItems = map((currentItem, index = 0, newItems) => {
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })
    setItems(newItems);
    setAccomplishment("");
    update(ref(database, 'users/' + user.uid), {
        data: items
    });
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

  const editTag = value => {
    let newTags = tags;
    if (!tags.includes(value)) {
      newTags.push(value)
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    setTags(newTags);
  }

  const entriesToShow = items.filter((currentItem) => {
    return (filter === "none" || currentItem.tags?.includes(filter));
  });

  function entryForm() {
   return (
      <div>
        <p>Bank Page</p>
        <form>
        <h4>What's something you're proud of?</h4>
        <p><em>This only works if you are already logged in.</em></p>
        <input
          placeholder="Today I was able to..."
          value={accomplishment}
          onChange={(event) => {
            setAccomplishment(event.target.value);
          }}
        />
        <br></br>
        <input
          type="radio"
          value="success"
          name="status"
          defaultChecked={status === "success"}
          onChange={e => setStatus(e.currentTarget.value)}
        /> Success
        <br></br>
        <input
          type="radio"
          value="question-unanswered"
          name="status"
          onChange={e => setStatus(e.currentTarget.value)}
        /> Question (Unanswered)
        <br></br>
        <p><u>Tags</u></p>
        <input
          type="checkbox"
          value="technical"
          name="tag"
          onChange={e => editTag(e.currentTarget.value)}
        /> Technical
        <br></br>
        <input
          type="checkbox"
          value="soft skills"
          name="tag"
          onChange={e => editTag(e.currentTarget.value)}
        /> Soft Skills
        <br></br>
        <br></br>
        <button onClick={addNewAccomplishment}>Add accomplishment</button>
        </form>
        <br></br>
        <h4>Want to filter by a specific tag?</h4>
        <input
          type="radio"
          value="none"
          name="filter"
          defaultChecked={true}
          onChange={e => setFilter(e.currentTarget.value)}
        /> None
        <input
          type="radio"
          value="technical"
          name="filter"
          onChange={e => setFilter(e.currentTarget.value)}
        /> Technical
        <input
          type="radio"
          value="soft skills"
          name="filter"
          onChange={e => setFilter(e.currentTarget.value)}
        /> Soft Skills
      </div>
    )
  }

  if (items.length > 0) {
    return (
      <div>
        {entryForm()}
        <h2 className="bank-title">Your Bank</h2>
        <CardList items={entriesToShow} deleteCard={deleteCard} filter={filter}/>
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
        {entryForm()}
      </div>

    )
  }

  /*return (
    <div>
      <p>{text}</p>
    </div>
  );*/
}

export default Bank;