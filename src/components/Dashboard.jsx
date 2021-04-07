import React from "react";
import { Sidebar } from "./Sidebar";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";

export const Dashboard = () => {
  return (
    <div>
      <div className="grid-container">
        <div className="sidebar-grid">
          <Sidebar />
        </div>

        <div className="messages-grid">
          <Messages />
        </div>

        <div className="send-messages-grid">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};
