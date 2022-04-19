import React, { useState, useEffect } from 'react';
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

  return (
    <h1>Hello, {name}!</h1>
  )
}

export default AddAccomplishment;