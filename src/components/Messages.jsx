import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { Header } from "./Header";

//firestore
import firebase from "firebase/app";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

export const Messages = () => {
  //storeからchatを取ってくる
  const chatStore = useSelector((state) => state.chat);
  const servers = Object.keys(chatStore.servers);
  const topics = Object.keys(chatStore.servers[chatStore.activeServer]);
  const { activeServer, activeTopic } = chatStore;

  // ref
  let messageContainer;

  //firestoreの認証情報を取得
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  //firestoreから取得
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);

  useEffect(() => {
    messageContainer.scrollIntoView();
  });

  return (
    <>
      {/* HeaderをMessageエリアの中に入れた */}
      <Header topics={topics} servers={servers}></Header>
      <div className="messages-container">
        <List>
          {messages &&
            messages.map(
              (message, i) =>
                message.topic === activeTopic &&
                message.server === activeServer && (
                  <ListItem className="message" key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <img
                          src={process.env.PUBLIC_URL + "/user.png"}
                          alt="user icon"
                          height="48"
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message.from}
                      secondary={message.msg}
                      className="message-text"
                    />
                  </ListItem>
                )
            )}
        </List>
        <div ref={(element) => (messageContainer = element)}></div>
      </div>
    </>
  );
};
