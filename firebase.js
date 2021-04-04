import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAF3CjfgL0L4-B97NX4BJBTqYPi2hegZJA",
  authDomain: "discord-clone-30241.firebaseapp.com",
  databaseURL: "https:/discord-clone-30241.firebaseio.com",
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
