/* global gapi */
import React, { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { signIn, signOut } from "../actions";

//ログイン画面
export const GoogleOAuth = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let auth = useRef();

  useEffect(() => {
    //OAuth接続のおまじない
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "193248965975-lm5drb0mkrhepcipvomamrjamgcfopkq.apps.googleusercontent.com",
          scope: "email",
        })
        // thenを使用することで、処理が成功した場合のみ、処理を進めることができる
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          console.log(auth);
          onAuthChange(auth.current.isSignedIn.get());
          // Listen for changes
          this.auth.isSignedIn.listen(() => {
            onAuthChange(auth.current.isSignedIn.get());
          });
        });
    });
    console.log(auth.current);
  }, []);

  const onLoginButtonClick = (action) => {
    if (action === "login") auth.current.signIn();
    else auth.current.signOut();
  };

  const onAuthChange = (isSignedIn) => {
    //useのsignのstateをdispatchから更新
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
    </div>
  );
};
