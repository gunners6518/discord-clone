import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions";
import { useSelector } from "react-redux";

export const SendMessage = ({ chatMessage, changeChatMessage, user }) => {
  // Get store
  const { activeServer, activeTopic } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleSubmit = (message) => {
    dispatch(sendMessage(message));
    //送信後はTextFieldを空にする
    changeChatMessage("");
  };

  const handleKeyPress = (e) => {
    //Enterキーが押されたら送信する
    if (e.key === "Enter")
      handleSubmit({
        server: activeServer,
        topic: activeTopic,
        from: user,
        msg: chatMessage,
      });
  };
  return (
    <>
      <div className="send-message-border" />
      <div className="send-messages-grid">
        <div class="send-message-container">
          <TextField
            autoComplete="off"
            color="blue"
            id="filled-name"
            className="message-input"
            label={`Message # ${activeTopic}`}
            value={chatMessage}
            onChange={(e) => changeChatMessage(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        </div>
      </div>
    </>
  );
};
