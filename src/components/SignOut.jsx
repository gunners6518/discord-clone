import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const SignOut = () => {
  const auth = firebase.auth();
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};
