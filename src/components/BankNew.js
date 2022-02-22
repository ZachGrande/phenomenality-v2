import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from 'firebase';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';

// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

function BankNew(props) {
  const text = "New bank";

  const auth = getAuth(app);
  const database = getDatabase(app);

  const [user, loading, error] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("Current state:", items);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  });

  useEffect(() => {
    if (isLoading === false) {
      // console.log("User", user.uid);
      const dbRef = ref(database, 'users/' + user.uid + '/data');
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data === undefined) {
          setItems([]);
          return null;
        }
        const keys = Object.keys(data);
        console.log("Keys", keys);
        const newItems = keys.map((key) => {
          const currentItem  = data[key];
          currentItem.key = key;
          console.log("Current item", key, currentItem);
          return currentItem;
        })
        console.log("New items!", newItems);
        setItems(newItems);
        // setItems(data);
        // updateItems(data);
        /*console.log(data);
        if (data !== items) {
          console.log("About to update state");
          console.log("Items", items);
          // setItems(data);
        }*/
      });
    } else {
      console.log("Did not retrieve user location from database");
    }
  }, []);

  const updateItems = (data) => {
    setItems(data);
  }

  /*const auth = getAuth(app);
  const database = getDatabase(app);

  const [user, setUser] = useState();
  const [items, setItems] = useState();

  useEffect(() => {
    // const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
    const authUnregisterFunction = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    })
    return function cleanup() {
      authUnregisterFunction();
    }
  })*/

  /*useEffect(() => {
    let isMounted = true;
    let cancel = false;
    if (user !== undefined) {
      console.log("User id", user.id);
      const dbRef = ref(database, 'users/' + user.id + '/data');
      // onValue(dbRef, (snapshot) => {
      dbRef.onValue((snapshot) => {
        if (cancel) return;
        const data = snapshot.val();
        // if (isMounted) { setItems(data)};
        setItems(data);
      });
      return () => { cancel = true };
    }
  }, []);*/

  // console.log(items);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default BankNew;