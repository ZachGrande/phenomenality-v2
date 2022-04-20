import React, { useState, useEffect } from 'react';
import '../css/AddAccomplishment.css';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { map } from '@firebase/util';

function AddAccomplishment() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, loading] = useAuthState(auth);

  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [accomplishment, setAccomplishment] = useState("");
  const [accomplishmentTags, setAccomplishmentTags] = useState([]);

  const [showWelcome, setShowWelcome] = useState(true);

  onAuthStateChanged(auth, () => {
    setIsLoading(false);
  })

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
      })
      setItems(newItems);
    });
  }, [isLoading, database, user]);

  useEffect(() => {
    const dbRef = ref(database, 'users/' + user?.uid + '/user');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setName("");
        return null;
      }
      const currentName = data.firstName;
      setName(currentName);
    });
  }, [isLoading, database, user]);

  const addNewAccomplishment = async (event) => { 
    event.preventDefault();
    let thisAccomplishment = {
      title: title,
      description: accomplishment,
      id: items.length + 1,
      key: items.length + "",
      tags: accomplishmentTags,
      date: date
    }

    console.log(accomplishmentTags) //tags spits out array based on order on selection of tag
    
    let newItems = items.push(thisAccomplishment);
    newItems = map((currentItem, index = 0, newItems) => {
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })

    setItems(newItems);
    setTitle("");
    setAccomplishment("");
    update(ref(database, 'users/' + user.uid), {
        data: items
    });
  }

  const editTag = value => {
    let newTags = accomplishmentTags;
    if (!accomplishmentTags.includes(value)) {
      newTags.push(value)
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    setAccomplishmentTags(newTags);
  }

  function advancePage() {
    setShowWelcome(false);
  }

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (!user) {
    return (
      <div>
        <h1>You haven't logged in yet!</h1>
        <p>Sign in to begin logging your accomplishments.</p>
        <Link aria-label="Sign in" className="button rmv-underline" role="button" to="/authentication">Sign in</Link>
      </div>
    )
  }

  if (showWelcome) {
    return (
      <div className="accomplishments">
        <h1>Hello, {name}!</h1>
        <p>Sometimes we need to separate our feelings from fact. Take a minute to recognize those feelings, but understand that the feeling will eventually pass.</p>
        <button className="accomplishment-next" onClick={advancePage}>Next</button>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Daily Accomplishment</h1>
        <p>What would you like to record?</p>
        <div className = "padding">
          <form>
            <input
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <br></br>
            <input
              placeholder="Today I was able to..."
              value={accomplishment}
              onChange={(event) => {
                setAccomplishment(event.target.value);
              }}
            />
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
        </div>
      </div>
    )
  }
}

export default AddAccomplishment;