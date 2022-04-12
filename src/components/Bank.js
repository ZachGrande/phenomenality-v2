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
  }

  /*const editCardsss = id => {
    // let newItems = items.filter((currentItem) => {
    //   if (currentItem.id === id) {
    //     var edit_description = window.prompt("Edit your accomplishment description", currentItem.description);
    //     // var edit_tags = window.prompt("Edit your tags"); HOLD OFF FOR TIFF
    //     currentItem.description = edit_description;
    //     // currentItem.tags = edit_tags; HOLD OFF FOR TIFF 
    //   }
    //   return currentItem;
    // })
    // setItems(newItems);
    // update(ref(database, 'users/' + user.uid), {
    //   data: newItems
    // });{
    let newItems = items.filter((currentItem) => {
      //  <style type="text/css">
      //     .formPopup {
      //       display: none;
      //       position: fixed;
      //       left: 45%;
      //       top: 5%;
      //       transform: translate(-50%, 5%);
      //       border: 3px solid #999999;
      //       z-index: 9;
      //     }
      //   </style>
      var oldDescription = ""
      if (currentItem.id === id) {
        console.log("button was clicked with ID", id)
        oldDescription = currentItem.description;
        return (
          <div class="loginPopup">
            <h1>Content</h1>
            <div class="formPopup" id="popupForm">
              {/* what does this do??*/
  //             <form action="/action_page.php" class="formContainer">
  //               <h4>Edit your Accomplishment</h4>
  //               <label for="editDescription">
  //                 <strong>Description</strong>
  //               </label>
  //               {/* might need to make sure that this is updating the current/correct description */}
  //               <input type="text" id="editDescription" value={oldDescription} onChange={e => (currentItem.description = e.currentTarget.value)} name="editDescription"></input>
  //               <button type="button" class="btn success" onClick={submitForm}>Update</button>
  //               <button type="button" class="btn cancel" onClick={closeForm}>Cancel</button>
  //             </form>
  //           </div>
  //         </div>
  //       )
  //     }
  //     console.log("button was clicked after if")

  //     return currentItem;
  //   })
  //   setItems(newItems);
  //   update(ref(database, 'users/' + user.uid), {
  //     data: newItems
  //   });
  // }

  // function submitForm() {
  //   document.getElementById("loginPopup").style.display = "none";
  // }

  function closeForm() {
    console.log("close Form")
    return (
      <div>
        <Form items={items}
          setItems={setItems}
          database={database}
          user={user}
          setFilter={setFilter} />
        <h2 className="bank-title">Your Bank</h2>
        <div className="formPopup" style="display:none" id="popupForm"></div>
        <CardList items={entriesToShow} deleteCard={deleteCard} editCard={editCard} />
      </div>
    )
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
        <h3>Editing card {currentEditId}</h3>
        <div className="formPopup" id="popupForm">
          <form action="/action_page.php" class="formContainer">
            <h4>Edit your Accomplishment</h4>
            <label for="editDescription">
              <strong>Description</strong>
            </label>
            <input type="text" id="editDescription" value="hi :)" name="editDescription"></input>
            <input type="text" id="editTag" value="~will this even need to be here?~" name="editTags"></input>
            <button type="button" class="btn update">Update</button>
            <button type="button" class="btn cancel" onClick={closeForm}>Cancel</button>
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