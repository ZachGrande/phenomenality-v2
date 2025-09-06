'use client';

import React, { useState, useEffect } from 'react';

import styles from './_styles/page.module.sass';
import clsx from 'clsx';
import { map } from '@firebase/util';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import Image from 'next/image';

import app from '../../config';
import WelcomeMessage from './_assets/accomplishment-demo/accomplishment-1.png';
import DailyAccomplishment from './_assets/accomplishment-demo/accomplishment-2.png';
import WonderfulAccomplishment from './_assets/accomplishment-demo/accomplishment-3.png';
import AccomplishmentComplete from './_assets/accomplishment-demo/accomplishment-4.png';
import SampleBank from './_assets/accomplishment-demo/accomplishment-5.png';
import SampleBankFilter from './_assets/accomplishment-demo/accomplishment-6.png';
import Welcome from './_assets/welcome-message.svg';

import TagButtonList from './_components/TagButton';
import tags from './_components/tags';

function AddAccomplishment() {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user] = useAuthState(auth);

  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  const titlePlaceholder = 'accomplishment for ' + date;

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [accomplishment, setAccomplishment] = useState('');
  const [accomplishmentTags, setAccomplishmentTags] = useState([]);
  const [accomplishmentDescription, setAccomplishmentDescription] =
    useState('');

  const [showWelcome, setShowWelcome] = useState(true);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  onAuthStateChanged(auth, () => {
    setIsLoading(false);
  });

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
      });
      setItems(newItems);
    });
  }, [isLoading, database, user]);

  useEffect(() => {
    const dbRef = ref(database, 'users/' + user?.uid + '/user');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setName('');
        return null;
      }
      const currentName = data.firstName;
      setName(currentName);
    });
  }, [isLoading, database, user]);

  useEffect(() => {
    if (items) {
      const hasLogged = items.some((currentItem) => currentItem.date === date);
      setHasLoggedToday(hasLogged);
    }
  }, [items, date]);

  useEffect(() => {
    let shortAccomp = accomplishment.substring(0, 100);
    if (accomplishment.length > 100) {
      shortAccomp += '...';
    }
    setAccomplishmentDescription(shortAccomp);
  }, [accomplishment]);

  const addNewAccomplishment = async (event) => {
    event.preventDefault();
    const thisAccomplishment = {
      title: title,
      description: accomplishment,
      descriptionDisplay: accomplishmentDescription,
      id: items.length + 1,
      key: items.length + '',
      tags: accomplishmentTags,
      date: date,
    };

    // console.log(accomplishmentTags) //tags spits out array based on order on selection of tag

    let newItems = items.push(thisAccomplishment);
    newItems = map((currentItem, index = 0, _newItems) => {
      currentItem.id = index + 1;
      currentItem.key = index + '';
      index = index + 1;
      return currentItem;
    });

    setItems(newItems);
    setTitle('');
    setAccomplishment('');
    update(ref(database, 'users/' + user.uid), {
      data: items,
    });
  };

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

  const toggleTag = (value) => {
    // console.log("Value", value);
    const newTags = accomplishmentTags;
    if (!accomplishmentTags.includes(value)) {
      newTags.push(value);
    } else {
      const index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }

    const idName = value.toLowerCase().replace(/\s+/g, '-');
    document.getElementsByClassName(idName)[0].classList.toggle('active');
    setAccomplishmentTags(newTags);
  };

  function advancePage() {
    setShowWelcome(false);
  }

  const toggleHasLoggedToday = () => {
    setHasLoggedToday(!hasLoggedToday);
    setShowWelcome(false);
  };

  if (isLoading) {
    return <p className={styles.p}>Loading...</p>;
  }

  if (!user) {
    return (
      <div className={styles.accomplishmentsSignedOut}>
        <h1 className={styles.h1}>you haven't logged in yet!</h1>
        <p className={styles.p}>sign in to begin logging your accomplishments.</p>
        <Link
          aria-label="Sign in"
          className={clsx('button', styles.button, styles['rmv-underline'])}
          role="button"
          href="/authentication"
        >
          sign in
        </Link>
        <h2 className={clsx(styles.photoHeader, styles.bloop)}>
          here's what phenomenality can offer you!
        </h2>
        <div>
          <Image
            className={clsx(styles.demoPhoto, styles.odd)}
            src={WelcomeMessage}
            alt="welcome-message"
            width={2876}
            height={1794}
          />
        </div>
        <div>
          <Image
            className={clsx(styles.demoPhoto, styles.even)}
            src={DailyAccomplishment}
            alt="daily-accomplishment"
            width={2872}
            height={1800}
          />
        </div>
        <div>
          <Image
            className={clsx(styles.demoPhoto, styles.odd)}
            src={WonderfulAccomplishment}
            alt="wonderful-accomplishment"
          />
        </div>
        <div>
          <Image
            className={clsx(styles.demoPhoto, styles.even)}
            src={AccomplishmentComplete}
            alt="accomplishment-complete"
          />
        </div>
        <div>
          <Image className={clsx(styles.demoPhoto, styles.odd)} src={SampleBank} alt="sample-bank" />
        </div>
        <div>
          <Image
            className={clsx(styles.demoPhoto, styles.odd)}
            src={SampleBankFilter}
            alt="sample-bank-filter"
          />
        </div>
      </div>
    );
  }

  if (showWelcome && hasLoggedToday) {
    return (
      <div className="outline-box">
        <h1 className={clsx(styles.h1, styles.h1Accomp)}>
          you've already logged an accomplishment today!
        </h1>
        <div className="accompText">
          <div className="backToBank">
            <p className={clsx(styles['encrg-p'], styles.p)}>
              visit your bank to view your accomplishments.
            </p>
            <Link
              aria-label="View Accomplishments"
              className="button rmv-underline viewAccompBtn2"
              role="button"
              href="/bank"
            >
              view accomplishments
            </Link>
          </div>
          <div className="addNewAccomp">
            <p className={clsx(styles['encrg-p'], styles.p)}>or add another accomplishment for today.</p>
            <button className="clickHereBtn" onClick={toggleHasLoggedToday}>
              add new accomplishment
            </button>
          </div>
        </div>
      </div>
    );
  } else if (showWelcome) {
    return (
      <div className="accomplishments outline-box">
        <h1 className={clsx(styles.h1, styles.h1Accomp)}>hello, {name}!</h1>
        <p className={clsx(styles['encrg-p'], styles.p)}>
          great work today! keep moving forward and record an accomplishment!
        </p>
        <Image
          className="center-img"
          src={Welcome}
          alt="Person sitting in chair reading book"
          width="30%"
          height="30%"
        />
        <br></br>
        <button className="accomplishment-next" onClick={advancePage}>
          next
        </button>
        <br></br>
        <br></br>
      </div>
    );
  } else {
    return (
      <div className="outline-box add-accomp">
        <h1 className={clsx(styles.h1, styles.h1Accomp)}>daily accomplishment</h1>
        <p className={clsx(styles['encrg-p'], styles.p)}>what would you like to record?</p>
        <div className="padding">
          <form>
            <textarea
              className="accompTextarea"
              placeholder={titlePlaceholder}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              rows="2"
              cols="45"
            ></textarea>
            <br></br>
            <br></br>
            <textarea
              className="accompTextarea"
              placeholder="description"
              value={accomplishment}
              onChange={(event) => {
                setAccomplishment(event.target.value);
              }}
              rows="10"
              cols="45"
            ></textarea>
            <br></br>
            <br></br>
            <br></br>
            <div id="tagSection">
              <p className={clsx(styles['tag-title'], styles.p)}>
                add a tag to your post so you can find it later!
              </p>
              <TagButtonList
                items={tags}
                activeTags={accomplishmentTags}
                toggleTag={toggleTag}
              />
            </div>
            <br></br>
            <br></br>
            {/* <button onClick={addNewAccomplishment}>Add accomplishment</button> */}
            {/* this button is strange */}
            <button className="nextBtn" onClick={addNewAccomplishment}>
              <Link
                aria-label="Next"
                className="nextButton rmv-underline nextBtn"
                role="button"
                href="/accomplishments-complete"
              >
                next
              </Link>
            </button>
            <br></br>
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAccomplishment;
