import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDjA-znwghydUMgqux3K1hPOoJAtE3B-zo",
  authDomain: "moviesandmore-df541.firebaseapp.com",
  databaseURL: "https://moviesandmore-df541.firebaseio.com",
  projectId: "moviesandmore-df541",
  storageBucket: "moviesandmore-df541.appspot.com",
  messagingSenderId: "100996449146",
  appId: "1:100996449146:web:9f72cfeb5520a7f9e6ccc3",
  measurementId: "G-2TFYNEHRMP"
}

firebase.initializeApp(config);

export default firebase;