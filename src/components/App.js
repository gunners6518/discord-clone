import React from "react";
import "./App.css";
import { Dashboard } from "./Dashboard";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
};
