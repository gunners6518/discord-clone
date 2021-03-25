import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chip, Icon } from "@material-ui/core";

export const Messages = () => {
  // Get store
  const { activeServer, activeTopic } = useSelector((state) => state.chat);

  let messageContainer;
  useEffect(() => {
    messageContainer.scrollIntoView();
  });

  //storeからchatを取ってくる
  const chatStore = useSelector((state) => state.chat);
  console.log(activeTopic);

  return (
    <div className="messages-container">
      {chatStore.servers[activeServer][activeTopic].map((message, i) => (
        <div className="message" key={i}>
          <Chip
            avatar={<Icon>person</Icon>}
            label={message.from + " " + message.msg}
          />
        </div>
      ))}
      <div ref={(element) => (messageContainer = element)}></div>
    </div>
  );
};
