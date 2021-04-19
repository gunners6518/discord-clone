import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SignOut } from "./SignOut";
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
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { changeServer, changeTopic } from "../actions";

//firestore
import firebase from "firebase/app";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

export const Sidebar = ({ changeDrawerVisible }) => {
  // Get store state
  const chatStore = useSelector((state) => state.chat);
  const servers = Object.keys(chatStore.servers);
  const topics = Object.keys(chatStore.servers[chatStore.activeServer]);
  const { activeServer } = chatStore;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  //server名リネーム時のstate
  const [serverValue, setServerValue] = useState(activeServer);

  //firestoreの認証情報を取得
  const firestore = firebase.firestore();
  const messagesRef = firestore
    .collection("messages")
    .doc("7Hi1AhTdk81JbNI8Lx5n");

  const setNewName = async (e) => {
    e.preventDefault();

    await messagesRef.update({
      server: serverValue,
    });
    console.log(messagesRef);
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
          {/* form-sample */}
          <ListItem className="title-container">
            <form onSubmit={setNewName} className="">
              <input
                type="text"
                value={serverValue}
                onChange={(e) => setServerValue(e.target.value)}
              />
              <input type="submit" value="更新" />
            </form>
            {/* 仮でserverValueを置く todo:chatStoreを更新 */}
            {serverValue}
          </ListItem>
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
            <ListItemText primary={user.userName} />
            <SignOut />
          </ListItem>
        </div>
      </div>
    </div>
  );
};
