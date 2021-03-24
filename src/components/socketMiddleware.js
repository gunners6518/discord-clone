import io from "socket.io-client";

import { SEND_MESSAGE, UPDATE_CHAT } from "../actions/types";

export const socketMiddleware = (baseUrl) => {
  return (storeAPI) => {
    let socket = io(baseUrl);

    //データを受け取ったらreducerでdispatchを実行する
    socket.on("simple-chat", (message) => {
      storeAPI.dispatch({
        type: UPDATE_CHAT,
        payload: message,
      });
    });

    //「SEND_MESSAGE」 actionが行われたらsocketにemitする
    return (next) => (action) => {
      if (action.type === SEND_MESSAGE) {
        socket.emit("simple-chat", action.payload);
        return;
      }

      return next(action);
    };
  };
};
