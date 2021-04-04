import React, { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { signIn, signOut } from "../actions";

export const GoogleOAuth = () => {
  // Get store state
  const user = useSelector((state) => state.user);

  // Dispatch
  const dispatch = useDispatch();

  // When app loads, grab users initial data
  // Includes all channels, history and settings
  let auth = useRef();
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "193248965975-lm5drb0mkrhepcipvomamrjamgcfopkq.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          console.log(window.gapi.auth2.getAuthInstance());
          console.log("auth", auth);
          onAuthChange(auth.current.isSignedIn.get());
          // Listen for changes
          auth.current.isSignedIn.listen(() => {
            onAuthChange(auth.current.isSignedIn.get());
          });
        });
    });
  }, []);

  const onLoginButtonClick = (action) => {
    if (action === "login") auth.current.signIn();
    else auth.current.signOut();
  };

  const text = `タイトル：` + user.isSignedIn;

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const { Eea, ig, U3 } = auth.current.currentUser.get().getBasicProfile();
      dispatch(signIn({ userId: Eea, userName: ig, userEmail: U3 }));
    } else dispatch(signOut(auth.current.currentUser.get().getId()));
  };

  return (
    <div>
      {user.isSignedIn ? (
        <Button onClick={() => onLoginButtonClick("logout")}>Sign Out</Button>
      ) : (
        <Button onClick={() => onLoginButtonClick("login")}>Sign In</Button>
      )}
      <p>{text}</p>
    </div>
  );
};
