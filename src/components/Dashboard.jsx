import React, { useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { CTX } from "./Store";
import { Topics } from "./Topics";
import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage.jsx";
import { Header } from "./Header";

export const Dashboard = () => {
  //CTXからchatsとsendchatsActionを受け取る
  const { chats, sendChatAction } = useContext(CTX);

  // chatsからtopic一覧を抜き出す
  const topics = Object.keys(chats);

  //localStateで定義してpropsでset関数を渡す
  const [chatMessage, changeChatMessage] = useState("");
  const [activeTopic, changeActiveTopic] = useState(topics[0]);

  const user = "eric" + Math.ceil(Math.random() * 100);

  return (
    <>
      <Header activeTopic={activeTopic} />
      <Container>
        <Paper className="app-container">
          <Topics topics={topics} changeActiveTopic={changeActiveTopic} />
          <Messages chats={chats} activeTopic={activeTopic} />
          <SendMessage
            chatMessage={chatMessage}
            changeChatMessage={changeChatMessage}
            user={user}
            activeTopic={activeTopic}
            sendChatAction={sendChatAction}
          />
        </Paper>
      </Container>
    </>
  );
};
