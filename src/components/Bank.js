import React, { useEffect, useState } from 'react';
import '../css/Bank.css';
import { useAuthState } from "react-firebase-hooks/auth";
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Form from './Form.js';
import TagButtonList from './TagButton.js';
import allTags from './tags.js';
import '../css/Popup.css';

import 'firebase/auth';
import 'firebase/database';

import CardList from './Card.js';
import TagList from './Tag.js';

import '../css/Bank.css';

function Bank() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  // const allTags = ['Technical', 'Soft Skills', 'Kudos', 'Award',
  //  'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'];

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //NEED TO CHANGE FILTER TYPE TO ARRAY ?? 
  const [filter, setFilter] = useState("none");

  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  useEffect(() => {
    // console.log(tags);
    console.log("Tags");
  }, [tags]);

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

  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(-1);
  const [currentViewId, setCurrentViewId] = useState(-1);
  const [existingDescription, setExistingDescription] = useState("");
  const [existingTitle, setExistingTitle] = useState("");
  const [existingTags, setExistingTags] = useState("");

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
    setExistingTitle(editItem[0].title);
    setExistingTags(editItem[0].tags);
  }

  const viewCard = id => {
    setShowViewPopup(true);
    setCurrentViewId(id);
    let viewItem = items.filter((currentItem) => {
      if (currentItem.id === id) {
        return currentItem;
      }
    });
    setExistingDescription(viewItem[0].description);
    setExistingTitle(viewItem[0].title);
    setExistingTags(viewItem[0].tags);
  }

  const toggleFilter = value => {
    if (filter === value) {
      setFilter("none");
    } else {
      setFilter(value);
    }
    let idName = value.toLowerCase().replace(/\s+/g, '-');
    document.getElementsByClassName(idName)[0].classList.toggle("active");
  }

  function closeEditForm() {
    setShowEditPopup(false);
  }

  function closeViewForm() {
    setShowViewPopup(false);
  }

  function submitForm() {
    let shortAccomp = existingDescription.substring(0, 100);
    if (existingDescription.length > 100) {
      shortAccomp += "...";
    }

    let newItems = items.filter((currentItem) => {
      if (currentItem.id === currentEditId) {
        currentItem.description = existingDescription;
        currentItem.descriptionDisplay = shortAccomp;
        currentItem.title = existingTitle;
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
        {/* <Form items={items}
          setItems={setItems}
          database={database}
          user={user}
          /> */}
        <div className="formPopup" id="popupForm">
          <form action="/action_page.php" className="formContainer">
            <h3>edit accomplishment {currentEditId}</h3>
            <label htmlFor="editTitle">title</label>
            <input type="text"
                   id="editTitle"
                   value={existingTitle}
                   onChange={(event) => {
                     setExistingTitle(event.target.value);
              }}
              name="editTitle"></input>
              <label htmlFor="editDescription">description</label>
            <input type="text"
                   id="editDescription"
                   value={existingDescription}
                   onChange={(event) => {
                     setExistingDescription(event.target.value);
              }}
              name="editDescription"></input>
                          <TagList items={existingTags} />
            <div className="popup-btn-center">
            <button type="button" className="btn" onClick={submitForm}>update</button>
            <button type="button" className="btn cancel" onClick={closeEditForm}>cancel</button>
         </div>
          </form>
        </div>
        <h1 className="bank-h1">all accomplishments</h1> 
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard} viewCard={viewCard}/>
      </div>
    )
  } else if (items.length > 0 && showViewPopup) { 
    return(
<div>
        {/* <Form items={items}
          setItems={setItems}
          database={database}
          user={user}
          /> */}
        <div className="formPopup" id="popupForm">
          <form className="formContainer">
            <h3>expanded view</h3>
            <label htmlFor="viewTitle">title</label>
            <p className = "p-background" id="viewTitle">{existingTitle}</p>
            <label htmlFor="viewDescription">description</label>
            <p className = "p-background" id="viewDescription">{existingDescription}</p>
            <label htmlFor="viewTags">tags</label>
            <div className="tags-background">
              <TagList items={existingTags} />
            </div>
            <div className="popup-btn-center">
              <button type="button" className="btn cancel" onClick={closeViewForm}>close</button>
            </div>
          </form>
        </div>
        <h1 className="bank-h1">all accomplishments</h1> 
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard} viewCard={viewCard}/>
      </div> )
  } 
  else if (items.length > 0) {
    return (
      <div>
        <div className="card-list">
        <h1 className="bank-h1">all accomplishments</h1>


        <div>
          <h2 className="tag-title">filter for tags</h2>
          <TagButtonList items={allTags}
            activeTags={tags}
            toggleTag={toggleFilter}
          />
        </div>
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard} viewCard={viewCard}/>
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <p>Loading your card list.</p>
    )
  } else {
    return (
      <div>
        <p>you have not added to your credibility bank!</p>
        <Form items={items}
                   setItems={setItems}
                   database={database}
                   user={user}/>
      </div>

    )
  }
}

export default Bank;