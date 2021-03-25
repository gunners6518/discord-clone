import React, { useState } from "react";
import { useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import { Sidebar } from "./Sidebar";

export const Header = ({ topics, servers }) => {
  // Get store
  const { activeTopic } = useSelector((state) => state.chat);
  const [drawerVisible, changeDrawerVisible] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menu-burger-button"
          onClick={() => changeDrawerVisible(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={drawerVisible}
          onClose={() => changeDrawerVisible(false)}
          onOpen={() => null}
        >
          <Sidebar
            topics={topics}
            servers={servers}
            changeDrawerVisible={changeDrawerVisible}
          />
        </SwipeableDrawer>
        <i className="topic-hashtag">#</i>
        <Typography variant="h6"> {activeTopic.toLowerCase()} </Typography>
      </Toolbar>
    </AppBar>
  );
};
