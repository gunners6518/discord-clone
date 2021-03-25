import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";
import GroupWork from "@material-ui/icons/GroupWork";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
  TextField,
  Snackbar,
} from "@material-ui/core";

import { changeServer, changeTopic } from "../actions";

export const Sidebar = ({ topics, servers, changeDrawerVisible }) => {
  // Get store state
  const { activeServer } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Local state
  //ユーザーネームを変更できる
  const [userName, changeUserName] = useState(user.userName);
  const [snackBarVisible, changeSnackBarVisible] = useState(false);
  const [snackBarMessage, changeSnackBarMessage] = useState("");

  const handleKeyPress = (e) => {
    console.log("fired");
    if (e.key === "Enter") {
      //Enterで一旦SignInのactionとする
      dispatch({
        type: "SIGN_IN",
        payload: { userId: "1", userName: userName },
      });
      changeSnackBarMessage(`Name changed to : ${userName}`);
      //Snackbarは通知なので一時的にtrueに
      changeSnackBarVisible(true);
      setTimeout(() => changeSnackBarVisible(false), 2000);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="servers-container">
        <List>
          {servers.map((server) => (
            //server部分
            <Tooltip
              title={server}
              key={server}
              placement="right"
              className="server-tooltip"
            >
              <IconButton
                className="server-icon"
                onClick={() => dispatch(changeServer(server))}
              >
                {/* changeServerのactionsを実行している */}
                <GroupWork />
              </IconButton>
            </Tooltip>
          ))}
        </List>
      </div>
      <div className="topics-container">
        <List className="topic-list">
          <ListItem className="title-container">{activeServer}</ListItem>
          {topics.map((topic) => (
            <ListItem
              onClick={(e) => {
                dispatch(changeTopic(topic));
                if (typeof changeDrawerVisible !== "undefined")
                  changeDrawerVisible(false);
              }}
              key={topic}
              button
            >
              <i className="topic-hashtag">#</i>
              <Typography variant="body1">{topic}</Typography>
            </ListItem>
          ))}
        </List>
        <div className="user-options">
          <ListItem className="user-info">
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <TextField
              id="user-name"
              value={userName}
              onChange={(e) => changeUserName(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
          </ListItem>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={snackBarVisible}
            message={snackBarMessage}
          />
        </div>
      </div>
    </div>
  );
};
