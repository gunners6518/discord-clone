import React, { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import GoogleLogout from "react-google-login";

import { signIn, signOut } from "../actions";

export const GoogleOAuth2 = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user somehow
  };

  const responseGoogle = (response) => {
    console.log(response);
    // console.log(response.profileObj);
  };

  const onLoginButtonClick = (action) => {
    if (action === "login") {
      signIn();
      console.log(user);
      console.log("ログイン");
      responseGoogle();
    } else {
      signOut();
      console.log(user);
      responseGoogle();
    }
  };

  const onLoginFailure = () => {
    console.log("failure");
  };

  const text = `タイトル：` + user.isSignedIn;
  return (
    <>
      {user.isSignedIn ? (
        <GoogleLogout
          buttonText="signOut"
          onLogoutSuccess={onLoginButtonClick("logout")}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId="193248965975-lm5drb0mkrhepcipvomamrjamgcfopkq.apps.googleusercontent.com"
          buttonText="signIn"
          onSuccess={onLoginButtonClick("login")}
          onFailure={onLoginFailure()}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
      <p>{text}</p>
    </>
  );
};
