import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import { Topics } from "./Topics";

export const Header = ({ topics, activeTopic }) => {
  const [drawerVisible, changeDrawerVisible] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menu-burger-button"
        >
          <MenuIcon onClick={() => changeDrawerVisible(true)} />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={drawerVisible}
          onClose={() => changeDrawerVisible(false)}
        >
          <Topics topics={topics} activeTopic={activeTopic} />
        </SwipeableDrawer>
        <Typography variant="h6">{activeTopic}</Typography>
      </Toolbar>
    </AppBar>
  );
};
