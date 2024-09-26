import { React, useState, useEffect } from 'react';
import '../styles/Authentication.sass';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { ref, set, update, onValue } from 'firebase/database';
import useFirebase from '../hooks/useFirebase';

function createEntryForUserInDatabase(user) {
  const { database } = useFirebase;
  set(ref(database, 'users/' + user.uid), {
    email: user.email,
  });
}

function Authentication() {
  const { user, auth, database } = useFirebase();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const [loginPage, setLoginPage] = useState(true);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [welcomeName, setWelcomeName] = useState(null);

  console.log(auth);

  onAuthStateChanged(auth, () => {
    setLoading(false);
  })

  useEffect(() => {
    setLoading(true);
    const dbRef = ref(database, 'users/' + user?.uid + '/user');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.firstName) {
        setWelcomeName(data.firstName);
      }

    });
  }, [database, user]);

  const register = async () => {
    setLoading(true);
    try {
      // setLoading(true);
      setFirstTimeUser(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword)
      createEntryForUserInDatabase(user.user);
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      // setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword);
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
  };

  const buildProfile = async () => {
    setLoading(true);
    toggleFirstTimeUser();

    let currentInitials = firstName.charAt(0).toUpperCase() +
                   lastName.charAt(0).toUpperCase();

    updateProfile(auth.currentUser, {
      displayName: currentInitials
    }).then(() => {
      update(ref(database, 'users/' + user.uid + '/user'), {
        firstName: firstName,
        lastName: lastName,
        initials: currentInitials,
        position: position
      });
    }).catch((error) => {
      console.log("Error updating profile", error);
    })
  }

  const toggleLogin = () => {
    setLoginPage(!loginPage);
  }

  const toggleFirstTimeUser = () => {
    setFirstTimeUser(!firstTimeUser);
  }

  if (loading) {
    return (
      <div className="auth">
        <h1>LOADING ASSETS</h1>
      </div>
    )
  }

  if (!user) {
    if (loginPage) {
      return (
        <div className="auth">
          <h3>Welcome Back</h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <br />
          <input placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={login}>Sign In</button>
          <p>Don't have an account? <button onClick={toggleLogin}>Register today.</button></p>
        </div>
      )
    } else {
      return (
      <div className="auth">
        <h3>Register</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <br />
        <input placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={register}>Create User</button>
        <p>Already have an account? <button onClick={toggleLogin}>Sign in.</button></p>
      </div>
      )
    }
  } else {
    if (firstTimeUser) {
      return (
        <div className="auth">
          <h1>Build Profile</h1>
          <h4>First Name</h4>
          <input
            placeholder="John"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <br />
          <h4>Last Name</h4>
          <input
            placeholder="Smith"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <br />
          <h4>What's your current job title?</h4>
          <input
            placeholder="Software Engineer"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={buildProfile}>I'm done setting up my profile.</button>
        </div>
      )
    }
    return (
      <div className="auth">
        {/* {welcomeName ?
          <h2>Welcome back, {welcomeName}</h2> :
          <h2></h2>} */}
        <h2>Welcome back, {welcomeName}!</h2>
        <button onClick={toggleFirstTimeUser}>Edit Profile</button>
        <br />
        {/* <h4>Update Information</h4>
        <h4>Want to change your name? Enter it here.</h4>
        <input
          placeholder="John Appleseed"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
        <br />
        <button onClick={updateDisplayName}>Update Profile</button>
        <h4>User Logged In:</h4> */}
        {/* <p>{user.displayName !== null ? user.displayName : "You have not set a name"}</p> */}
        {/* <p>{user?.displayName}</p>
        {user?.email} */}
        <br></br>
        <button onClick={logout}>Sign Out</button>
      </div>
    )
  }
}

export default Authentication;
