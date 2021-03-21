import React from "react";

import { Chip, Icon } from "@material-ui/core";

export const Messages = ({ chats, activeTopic }) => {
  return (
    <div className="messages-container">
      {chats[activeTopic].map((message, i) => (
        <div className="messages" key={i}>
          <Chip
            avatar={<Icon>person</Icon>}
            label={message.from + " " + message.msg}
          />
        </div>
      ))}
    </div>
  );
};
