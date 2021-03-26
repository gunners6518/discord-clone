import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";
import { useSelector } from "react-redux";
import { getInitialData } from "../actions";
import { useDispatch } from "react-redux";

export const Dashboard = () => {
  //storeからuseSelectorでstateを受け取っている;
  const chatStore = useSelector((state) => state.chat);

  //chatStoreからserver一覧を取得
  const servers = Object.keys(chatStore.servers);
  //activeserverのtopic一覧を取得
  const topics = Object.keys(chatStore.servers[chatStore.activeServer]);

  const dispatch = useDispatch();

  // ロード時にユーザーの初期データを所得
  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

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
