import React, { useState, useEffect } from 'react';
import '../css/AddAccomplishment.css';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { map } from '@firebase/util';

import WelcomeMessage from '../assets/accomplishment-demo/accomplishment-1.svg';
import DailyAccomplishment from '../assets/accomplishment-demo/accomplishment-2.svg';
import WonderfulAccomplishment from '../assets/accomplishment-demo/accomplishment-3.svg';
import AccomplishmentComplete from '../assets/accomplishment-demo/accomplishment-4.svg';
import SampleBank from '../assets/accomplishment-demo/accomplishment-5.svg';

import TagButtonList from './TagButton.js';

import tags from './tags.js';

function AddAccomplishment() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, loading] = useAuthState(auth);

  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  const titlePlaceholder = "Accomplishment for " + date;

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [accomplishment, setAccomplishment] = useState("");
  const [accomplishmentTags, setAccomplishmentTags] = useState([]);

  const [showWelcome, setShowWelcome] = useState(true);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  const tagColors = ['color1', 'color2', 'color3'];
  // const allTags = ['Technical', 'Soft Skills', 'Kudos'];

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

  useEffect(() => {
    if (items) {
      items.filter((currentItem) => {
        if (currentItem.date === date) {
          setHasLoggedToday(true);
        }
      })
    }
  }, [items]);

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

    // console.log(accomplishmentTags) //tags spits out array based on order on selection of tag
    
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

  /*const editTag = value => {
    let newTags = accomplishmentTags;
    let idName = value.replace(/\s+/g, '');
    document.getElementById(idName).classList.toggle('selected');;
    if (!accomplishmentTags.includes(value)) {
      newTags.push(value)
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    console.log(accomplishmentTags);
    setAccomplishmentTags(newTags);
  }*/

  const toggleTag = value => {
    // console.log("Value", value);
    let newTags = accomplishmentTags;
    if (!accomplishmentTags.includes(value)) {
      newTags.push(value);
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    // console.log(newTags);
    let idName = value.toLowerCase().replace(/\s+/g, '-');
    document.getElementsByClassName(idName)[0].classList.toggle("active");
    setAccomplishmentTags(newTags);
  }

  function advancePage() {
    setShowWelcome(false);
  }

  const toggleHasLoggedToday = () => {
    setHasLoggedToday(!hasLoggedToday);
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
        <h2>Here's what Phenomenality can offer you!</h2>
        <div>
          <img className="demo-photo odd" src={WelcomeMessage} alt="welcome-message"/>
        </div>
        <div>
          <img className="demo-photo even" src={DailyAccomplishment} alt="daily-accomplishment"/>
        </div>
        <div>
          <img className="demo-photo odd" src={WonderfulAccomplishment} alt="wonderful-accomplishment"/>
        </div>
        <div>
          <img className="demo-photo even" src={AccomplishmentComplete} alt="accomplishment-complete"/>
        </div>
        <div>
          <img className="demo-photo odd" src={SampleBank} alt="sample-bank"/>
        </div>
      </div>
    )
  }

  if (showWelcome && hasLoggedToday) {
    return (
      <div>
        <h1 className="h1Accomp">You've already logged an accomplishment today!</h1>
        <p className="encrg-p">Click here to view your logged accomplishments.</p>
        <Link aria-label="View Accomplishments" className="button rmv-underline" role="button" to="/bank">View Accomplishments</Link>
        <p className="encrg-p">If you'd like to add another accomplishment for today, <button onClick={toggleHasLoggedToday}>click here!</button></p>
      </div>
    )
  } else if (showWelcome) {
    return (
      <div className="accomplishments">
        <h1 className="h1Accomp">Hello, {name}!</h1>
        <p className="encrg-p">Sometimes we need to separate our feelings from fact. Take a minute to recognize those feelings, but understand that the feeling will eventually pass.</p>
        <button className="accomplishment-next" onClick={advancePage}>Next</button>
      </div>
    )
  } else {
    return (
      <div>
        <h1 className="h1Accomp">Daily Accomplishment</h1>
        <p className="encrg-p">What would you like to record?</p>
        <div className = "padding">
          <form>
            <h3>Title</h3>
            <textarea 
              className="accompTextarea"
              placeholder={titlePlaceholder}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              rows="2" cols="45">
              </textarea>
            <br></br>
            <h3>Description</h3>
            <textarea 
              className="accompTextarea"
              placeholder="Today I was able to..."
              value={accomplishment}
              onChange={(event) => {
                setAccomplishment(event.target.value);
              }}
              rows="10" cols="45"></textarea>
            <br></br>
            <div id='tagSection'>
              <p><u>Tags</u></p>
              <TagButtonList items={tags}
                  activeTags={accomplishmentTags}
                  toggleTag={toggleTag}
                  color={tagColors}
                  />
            </div>
            <br></br>
            <br></br>
            {/* <button onClick={addNewAccomplishment}>Add accomplishment</button> */}
            <button onClick={addNewAccomplishment}><Link aria-label="Next"
                  className="button rmv-underline"
                  role="button"
                  to="/accomplishments-complete">Next</Link></button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddAccomplishment;