import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";

export const SignIn = () => {
  const auth = firebase.auth();

  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Button className="sign-in" variant="contained" onClick={SignInWithGoogle}>
      Sign in with Google
    </Button>
  );
};
