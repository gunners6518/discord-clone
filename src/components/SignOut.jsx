import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const SignOut = () => {
  const auth = firebase.auth();
  return (
    auth.currentUser && (
      <Button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    )
  );
};
