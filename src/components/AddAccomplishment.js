import React, { useState, useEffect } from 'react';
import '../css/AddAccomplishment.css';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';

function AddAccomplishment() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, loading] = useAuthState(auth);

  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        <h1>Enter accomplishment</h1>
      </div>
    )
  }
}

export default AddAccomplishment;