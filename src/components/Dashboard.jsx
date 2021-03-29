import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";
import { useSelector } from "react-redux";
import { getInitialData } from "../actions";
import { useDispatch } from "react-redux";

export const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //ユーザーのサインイン状態が変わる度にデータを取ってくる
  useEffect(() => {
    if (user.isSignedIn) {
      dispatch(getInitialData());
    }
  }, [dispatch, user.isSignedIn]);

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
