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

import Welcome from '../assets/welcome-message.png';

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
  const [accomplishmentDescription, setAccomplishmentDescription] = useState("");

  const [showWelcome, setShowWelcome] = useState(true);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

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

  useEffect(() => {
    let shortAccomp = accomplishment.substring(0, 100);
    if (accomplishment.length > 100) {
      shortAccomp += "...";
    }
    setAccomplishmentDescription(shortAccomp);
  }, [accomplishment]);

  const addNewAccomplishment = async (event) => { 
    event.preventDefault();
    let thisAccomplishment = {
      title: title,
      description: accomplishment,
      descriptionDisplay: accomplishmentDescription,
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
      <div className="accomp-signedout">
        <h1>You haven't logged in yet!</h1>
        <p>Sign in to begin logging your accomplishments.</p>
        <Link aria-label="Sign in" className="button rmv-underline" role="button" to="/authentication">Sign in</Link>
        <h2 className="photo-header">Here's what Phenomenality can offer you!</h2>
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
      <div className='outline-box'>
        <h1 className="h1Accomp">You've already logged an accomplishment today!</h1>
        <p className="encrg-p">Visit your bank to view your accomplishments.</p>
        <Link aria-label="View Accomplishments" className="button rmv-underline viewAccompBtn2" role="button" to="/bank">View Accomplishments</Link>
        <p className="encrg-p">Or add another accomplishment for today.</p> 
        <button className="clickHereBtn" onClick={toggleHasLoggedToday}>Add New Accomplishment</button>
      </div>
    )
  } else if (showWelcome) {
    return (
      <div className="accomplishments outline-box">
        <h1 className="h1Accomp">Hello, {name}!</h1>
        <p className="encrg-p">Sometimes we need to separate our feelings from fact. Take a minute to recognize those feelings, but understand that the feeling will eventually pass.</p>
        <img className="center-img" src={Welcome} alt="Person sitting in chair reading book" width="40%" height="40%"/>
        <br></br>
        <button className="accomplishment-next" onClick={advancePage}>Next</button>
        <br></br>
        <br></br>
      </div>
    )
  } else {
    return (
      <div className='outline-box add-accomp'>
        <h1 className="h1Accomp">Daily Accomplishment</h1>
        <p className="encrg-p">What would you like to record?</p>
        <div className = "padding">
          <form>
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
            <br></br>
            <textarea 
              className="accompTextarea"
              placeholder="Description"
              value={accomplishment}
              onChange={(event) => {
                setAccomplishment(event.target.value);
              }}
              rows="10" cols="45"></textarea>
            <br></br>
            <br></br>
            <br></br>
            <div id='tagSection'>
              <p className="tag-title">Add a tag to your post so you can find it later!</p>
              <TagButtonList items={tags}
                  activeTags={accomplishmentTags}
                  toggleTag={toggleTag}
                  />
            </div>
            <br></br>
            <br></br>
            {/* <button onClick={addNewAccomplishment}>Add accomplishment</button> */}
            {/* this button is strange */}
            <button className="nextBtn" onClick={addNewAccomplishment}><Link aria-label="Next"
                  className="button rmv-underline nextBtn"
                  role="button"
                  to="/accomplishments-complete">Next</Link></button>
            <br></br>
            <br></br>

          </form>
        </div>
      </div>
    )
  }
}

export default AddAccomplishment;