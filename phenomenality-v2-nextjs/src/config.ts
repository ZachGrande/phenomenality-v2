import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC86Eh6E-qXceGRFysMiVGh1lYHU33uFIo',
  authDomain: 'phenomenality-v2.firebaseapp.com',
  projectId: 'phenomenality-v2',
  storageBucket: 'phenomenality-v2.appspot.com',
  messagingSenderId: '574507999',
  appId: '1:574507999:web:e4d2dccf5ee809b4d7d26a',
  measurementId: 'G-30RDWK6ZSG',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export default app;
