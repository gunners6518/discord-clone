import React, { createContext, useReducer } from "react";
import io from "socket.io-client";
export const CTX = createContext();

const baseUrl = "http://localhost:3001";

const initialState = {
  general: [
    { from: "terry", msg: "hello" },
    { from: "akita", msg: "hi!!" },
  ],
  react: [],
  sports: [],
  business: [],
  politics: [],
};

const chatReducer = (state, action) => {
  const { topic, from, msg } = action.payload;
  switch (action.type) {
    case "UPDATE_CHATS":
      return {
        ...state,
        [topic]: [...state[topic], { from: from, msg: msg }],
      };
    default:
      return state;
  }
};

let socket;

const sendChatAction = (message) => {
  socket.emit("simple-chat", message);
};

export const Store = (props) => {
  const [chats, chatDispatch] = useReducer(chatReducer, initialState);

  if (!socket) {
    socket = io(":3001");
    socket.on("simple-chat", (msg) => {
      const action = { type: "UPDATE_CHATS", payload: msg };
      chatDispatch(action);
    });
  }

  return (
    // Providerを使ってchats、sendChatActionをCTXに格納してDashboardコンポーネントに渡している
    <CTX.Provider value={{ chats, sendChatAction }}>
      {props.children}
    </CTX.Provider>
  );
};
