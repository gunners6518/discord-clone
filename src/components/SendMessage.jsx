import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import SmileyFace from "@material-ui/icons/SentimentVerySatisfied";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions";
import { useSelector } from "react-redux";
//コンテンツの大きさに合わせて高さが変わってくれるテキストエリア
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export const SendMessage = () => {
  // Get store
  const { activeServer, activeTopic } = useSelector((state) => state.chat);
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //chageChatはsendMessage内でのみ扱う
  const [chatMessage, changeChatMessage] = useState("");
  const [emojiMenuVisible, changeEmojiMenuVisible] = useState(false);

  const handleSubmit = (message) => {
    dispatch(sendMessage(message));
    //送信後はTextFieldを空にする
    changeChatMessage("");
  };

  const handleKeyPress = (e) => {
    //Enterキーが押されたら送信する（Shift+Enterは除外）
    if (e.key === "Enter" && !e.shiftKey)
      handleSubmit({
        server: activeServer,
        topic: activeTopic,
        from: userName,
        msg: chatMessage,
      });
  };

  const handleOnChange = (e) => {
    // Catches enters (dont render to screen)
    // Shift enter still works
    if (e.target.value !== "\n") changeChatMessage(e.target.value);
  };

  //絵文字選択したらメッセージに絵文字を加えて絵文字メニュー閉じる
  const handleEmojiClick = (e) => {
    changeChatMessage(chatMessage + e.native);
    changeEmojiMenuVisible(false);
  };

  window.onclick = (e) => {
    if (String(e.target.className).includes("send-message-emoji-menu"))
      changeEmojiMenuVisible(false);
  };

  return (
    <>
      <div className="send-message-border" />
      <div className="send-message-container">
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder={`Message  #${activeTopic}`}
          className="message-text-area"
          value={chatMessage}
          onChange={(e) => handleOnChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <SmileyFace
          className="send-message-emoji-button"
          onClick={() => changeEmojiMenuVisible(!emojiMenuVisible)}
        />
      </div>
      <div
        className={
          emojiMenuVisible
            ? "send-message-emoji-menu show"
            : "send-message-emoji-menu hide"
        }
      >
        <div className="emoji-wrapper">
          <Picker onSelect={(e) => handleEmojiClick(e)} />
        </div>
      </div>
    </>
  );
};
