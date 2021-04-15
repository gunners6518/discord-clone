import React, { useState } from "react";
import { TextField } from "@material-ui/core";

//firestore
import firebase from "firebase/app";
import "firebase/firestore";

export const CreateJoinModal = async (props) => {
  const [serverName, setServerName] = useState("");
  //firestoreの認証情報を取得
  const firestore = firebase.firestore();
  const messages = await firestore.collection("messages").doc().get();

  const { handleModalSuccess, modalType } = props;

  // Handles keypress and calls the callback method
  const handleKeyPress = (e, callbackMethod) => {
    if (e.key === "Enter") {
      callbackMethod();
    }
  };

  console.log(messages);

  // const newValue = messages.data();

  // Method to handle renaming of servers
  // const renameServer = async (serverName) => {
  //   console.log(messages.data());
  //   messages.update();
  // };

  return (
    <TextField
      id="create-channel-field"
      label="Channel Name"
      value={serverName}
      onChange={(e) => setServerName(e.target.value)}
      margin="dense"
      variant="outlined"
    />
  );
};
