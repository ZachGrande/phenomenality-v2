import { useState, useEffect } from 'react';
import app from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  const [database, setDatabase] = useState({});

  useEffect(() => {
    // Initialize Firebase auth
    const authentication = getAuth(app);
    setAuth(authentication);

    // Initialize Firebase database
    const db = getDatabase(app);
    setDatabase(db);

    // if (window.location.hostname === "localhost") {
    //   connectDatabaseEmulator(database, "127.0.0.1", 9000);
    // } 

    // Listen for auth state changes
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

  }, [auth, database]);

  // console.log(user);

  return { app, user, auth, database};
};

export default useFirebase;