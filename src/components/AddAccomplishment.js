import React, { useState, useEffect } from 'react';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";

function AddAccomplishment() {

  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, loading] = useAuthState(auth);

  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <p>Hello</p>
  )
}

export default AddAccomplishment;