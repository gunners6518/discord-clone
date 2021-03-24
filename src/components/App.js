import React from "react";
import "./App.css";
import { Dashboard } from "./Dashboard";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  //カラーパレット追加
  palette: {
    //ダークモード
    type: "dark",
    primary: {
      main: "#7289da",
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
};
