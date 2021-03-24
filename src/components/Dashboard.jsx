import React, { useContext, useState } from "react";
import { Topics } from "./Topics";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";
import { Header } from "./Header";
import { useSelector } from "react-redux";

const user = "terry" + Math.ceil(Math.random() * 100);

export const Dashboard = () => {
  //storeからuseSelectorでstateを受け取っている;
  const chatStore = useSelector((state) => state.chat);

  // chatsからtopic一覧を抜き出す
  const topics = Object.keys(chatStore);

  //localStateで定義してpropsでset関数を渡す
  const [chatMessage, changeChatMessage] = useState("");
  const [activeTopic, changeActiveTopic] = useState(topics[0]);

  return (
    <div>
      <Header activeTopic={activeTopic} />
      <div className="grid-container">
        <Topics topics={topics} changeActiveTopic={changeActiveTopic} />
        <Messages activeTopic={activeTopic} />
        <SendMessage
          chatMessage={chatMessage}
          changeChatMessage={changeChatMessage}
          user={user}
          activeTopic={activeTopic}
        />
      </div>
    </div>
  );
};
