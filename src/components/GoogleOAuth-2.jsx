import React, { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";

import { signIn, signOut } from "../actions";

export const GoogleOAuth2 = () => {
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
    console.log(response.profileObj);
  };

  return (
    <GoogleLogin
      clientId="193248965975-lm5drb0mkrhepcipvomamrjamgcfopkq.apps.googleusercontent.com"
      buttonText="Log in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
