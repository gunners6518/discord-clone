import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions";
import { useSelector } from "react-redux";

export const SendMessage = () => {
  // Get store
  const { activeServer, activeTopic } = useSelector((state) => state.chat);
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //chageChatはsendMessage内でのみ扱う
  const [chatMessage, changeChatMessage] = useState("");

  const handleSubmit = (message) => {
    dispatch(sendMessage(message));
    //送信後はTextFieldを空にする
    changeChatMessage("");
  };

  const handleKeyPress = (e) => {
    //Enterキーが押されたら送信する
    if (e.key === "Enter")
      handleSubmit({
        server: activeServer,
        topic: activeTopic,
        from: userName,
        msg: chatMessage,
      });
  };
  return (
    <>
      <div className="send-message-border" />
      <div className="send-messages-grid">
        <div class="send-message-container">
          <TextField
            autoComplete="off"
            color="blue"
            id="filled-name"
            className="message-input"
            label={`Message # ${activeTopic}`}
            value={chatMessage}
            onChange={(e) => changeChatMessage(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        </div>
      </div>
    </>
  );
};
