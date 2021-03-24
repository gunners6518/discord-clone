import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions";

export const SendMessage = ({
  chatMessage,
  changeChatMessage,
  activeTopic,
  user,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (message) => {
    dispatch(sendMessage(message));
    //送信後はTextFieldを空にする
    changeChatMessage("");
  };

  const handleKeyPress = (e) => {
    //Enterキーが押されたら送信する
    if (e.key === "Enter")
      handleSubmit({ topic: activeTopic, from: user, msg: chatMessage });
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
