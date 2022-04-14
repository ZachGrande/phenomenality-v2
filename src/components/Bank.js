import React, { useEffect, useState } from 'react';
import '../css/Bank.css';
import { useAuthState } from "react-firebase-hooks/auth";
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Form from './Form.js';

import 'firebase/auth';
import 'firebase/database';

import CardList from './Card.js';

import '../css/Form.css';

function Bank() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  const allTags = ['Technical', 'Soft Skills', 'Kudos', 'Award',
   'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'];

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //NEED TO CHANGE FILTER TYPE TO ARRAY ?? 
  //const [filter, setFilter] = useState("none");

  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  //want to also add a search enter button ??
  //use tags to search accomplishments
  //add client side verification - warning for tags that doesn't exist in search bar or if tag already selected
  //autocomplete tags
  //add client side verification - must include tag to accomplishment
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    //only allows users to input tag that exists in allTag array
    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();

      if (allTags.map(tag => tag.toLowerCase()).includes(trimmedInput.toLowerCase())) {
        setTags(prevState => [...prevState, trimmedInput]);
        setInput('');
      }
    }

  };

  //DELETING TAG NO LONGER WORKS
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
    console.log("delete tag work?")
  }

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
    let newItems = items.filter((currentItem) => {
      if (currentItem.id === id) {
        var edit_description = window.prompt("Edit your accomplishment description", currentItem.description);
        // var edit_tags = window.prompt("Edit your tags"); HOLD OFF FOR TIFF
        currentItem.description = edit_description;
        // currentItem.tags = edit_tags; HOLD OFF FOR TIFF 
      }
      return currentItem;
    })
    setItems(newItems);
    update(ref(database, 'users/' + user.uid), {
      data: newItems
    });
  }

  //HERE IS FILTERING METHOD
  const entriesToShow = items.filter((currentItem) => {
    if(tags.length <= 0) { // handles if no tags are searched 
      return currentItem;
    }
    
    console.log(currentItem);
    console.log("accomplishment tags: " + currentItem.tags);
    console.log("search tags: " + tags);
    let boolean = currentItem.tags.every(element => { return tags.includes(element)});

    if (boolean) {
      return currentItem;
    }
  });

  if (items.length > 0) {
    return (
      <div>
        <Form items={items}
                   setItems={setItems}
                   database={database}
                   user={user}
                  //  setFilter={setFilter}
                   />
        <h2 className="bank-title">Your Bank</h2>
        <h4>Want to filter by a specific tag?</h4>
       {/* <input
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
       /> Soft Skills */}
       <br />
          {/* <ul>
            {["Item1", "Item2", "Item3"].map(item =>
            <li key="{item}">{item}</li>
            )}
          </ul> UPDATE THE LIST OF TAGS BASED ON WHAT EXISTS IN SEARCH BAR*/}
       <div className="container">
          {/* {tags.map((tag) => <div className="tag">{tag}</div>)} */}
          <input
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
          <br />
          {tags.map((tag, index) => (
            <div className="tag">
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
        </div>
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard}/>
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
                   //setFilter={setFilter}
                   />
      </div>

    )
  }
}

export default Bank;