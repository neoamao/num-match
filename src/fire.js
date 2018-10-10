import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCfy4HiH6tRdtb545-GCXehz4ScaHlYvmM",
    authDomain: "num-match.firebaseapp.com",
    databaseURL: "https://num-match.firebaseio.com",
    projectId: "num-match",
    storageBucket: "num-match.appspot.com",
    messagingSenderId: "587662517170"
  };
var fire = firebase.initializeApp(config);
export default fire;