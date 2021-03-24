import React, { useEffect } from "react";

import { Chip, Icon } from "@material-ui/core";

export const Messages = ({ chats, activeTopic }) => {
  let messageContainer;
  useEffect(() => {
    messageContainer.scrollIntoView();
  });

  return (
    <div className="messages-flex-container">
      <div className="messages-container">
        {chats[activeTopic].map((message, i) => (
          <div className="message" key={i}>
            <Chip
              avatar={<Icon>person</Icon>}
              label={message.from + " " + message.msg}
            />
          </div>
        ))}
        <div ref={(element) => (messageContainer = element)}></div>
      </div>
    </div>
  );
};
