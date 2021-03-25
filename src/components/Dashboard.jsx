import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";
import { Header } from "./Header";
import { useSelector } from "react-redux";

const user = "terry" + Math.ceil(Math.random() * 100);

export const Dashboard = () => {
  //storeからuseSelectorでstateを受け取っている;
  const chatStore = useSelector((state) => state.chat);

  //サーバー連携のいらないページ単位での変更はlocalStateを使う
  const [chatMessage, changeChatMessage] = useState("");

  //chatStore.serversからtopicを受け取る
  const servers = Object.keys(chatStore.servers);
  const topics = Object.keys(chatStore.servers[chatStore.activeServer]);

  return (
    <div>
      <Header topics={topics} servers={servers} />
      <div className="grid-container">
        <div className="sidebar-grid">
          <Sidebar topics={topics} servers={servers} />
        </div>

        <div className="messages-grid">
          <Messages topics={topics} />
        </div>

        <div className="send-messages-grid">
          <SendMessage
            chatMessage={chatMessage}
            changeChatMessage={changeChatMessage}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};
