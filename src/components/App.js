import React from "react";
import "./App.css";
import { Dashboard } from "./Dashboard";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { config } from "./../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "16px",
        backgroundColor: "black",
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: "#202225",
        color: "white",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#36393E",
        position: "absolute",
      },
    },
  },
  //カラーパレット追加
  palette: {
    //ダークモード
    type: "dark",
    primary: {
      main: "#7289da",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const auth = firebase.auth();

export const App = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const [user] = useAuthState(auth);
  return (
    <>
      <header>
        <h1></h1>
        <SignOut />
      </header>
      <ThemeProvider theme={theme}>
        {user ? <Dashboard /> : <SignIn />}
      </ThemeProvider>
    </>
  );
};
