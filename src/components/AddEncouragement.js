import React, { useState, useEffect } from 'react';
import '../css/AddAccomplishment.css';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { map } from '@firebase/util';

import Welcome from '../assets/encourage-message.svg';

function AddEncouragement() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, loading] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState(true);
  const [showEncouragingMessageInput, setShowEncouragingMessageInput] = useState(true);
  const [encouragingMessage, setEncouragingMessage] = useState("");
  const [items, setItems] = useState([]);

  onAuthStateChanged(auth, () => {
    setIsLoading(false);
  })

  useEffect(() => {
    const dbRef = ref(database, 'users/' + user?.uid + '/messages');
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
      })
      setItems(newItems);
    });
  }, [isLoading, database, user]);

  const addNewEncouragingMessage = async (event) => { 
    event.preventDefault();
    let thisEncouragingMessage = {
      description: encouragingMessage
    }
    
    let newItems = items.push(thisEncouragingMessage);
    newItems = map((currentItem, index = 0, newItems) => {
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })

    setItems(newItems);
    setEncouragingMessage("");
    update(ref(database, 'users/' + user.uid), {
        messages: items
    });
    setShowEncouragingMessageInput(false);
  }

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (showEncouragingMessageInput) {
    return (
      <div className='outline-box'>
        <h1 className="h1Accomp">wonderful accomplishment!</h1>
        <p className="encrg-p">now write yourself an encouraging message that will be shown you to randomly.</p>
        <form className="encrgCenter">
          <textarea className="accompTextarea encrg-bottom-padding"
            placeholder="example: you've got this!"
            value={encouragingMessage}
            onChange={(event) => {
              setEncouragingMessage(event.target.value);
            }}
            rows="2" cols="45"
          />
          <div>
            <button className="accomplishment-next" onClick={addNewEncouragingMessage}>next</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className='outline-box'>
        <h1 className="h1Accomp">have a lovely day!</h1>
        <p className="encrg-p">come back tomorrow to add another accomplishment!</p>
        <img className="center-img" src={Welcome} alt="Two people high fiving" width="40%" height="40%"/>
        <br></br>
        <Link aria-label="View Accomplishments" className="button rmv-underline viewAccompBtn" role="button" to="/bank">view accomplishments</Link>
        <br></br>

      </div>
    )
  }
}

export default AddEncouragement;