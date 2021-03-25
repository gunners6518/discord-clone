import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";
import { Header } from "./Header";
import { useSelector } from "react-redux";

const user = "terry" + Math.ceil(Math.random() * 100);

export const Dashboard = () => {
  //storeからuseSelectorでstateを受け取っている;
  const chatStore = useSelector((state) => state.chat);

  //chatStore.serversからtopicを受け取る
  const servers = Object.keys(chatStore.servers);
  const topics = Object.keys(chatStore.servers[chatStore.activeServer]);

  return (
    <div>
      <div className="grid-container">
        <div className="sidebar-grid">
          <Sidebar topics={topics} servers={servers} />
        </div>

        <div className="messages-grid">
          <Messages topics={topics} servers={servers} />
        </div>

        <div className="send-messages-grid">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};
