import {
  SEND_MESSAGE,
  UPDATE_CHAT,
  CHANGE_SERVER,
  CHANGE_TOPIC,
  SIGN_IN,
  SIGN_OUT,
  GET_INITIAL_DATA,
} from "./types";
import axios from "axios";

const baseUrl = "http://localhost:3001";

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const updateChat = (message) => ({
  type: UPDATE_CHAT,
  payload: message,
});

export const changeServer = (server) => ({
  type: CHANGE_SERVER,
  payload: server,
});

export const changeTopic = (server) => ({
  type: CHANGE_TOPIC,
  payload: server,
});

export const getInitialData = (oAuthData) => async (dispatch) => {
  let url = `${baseUrl}/user?`;
  const res = await axios.get(url);
  dispatch({ type: GET_INITIAL_DATA, payload: res.data });
};

//サインイン時に、ユーザーが存在しない場合はバックエンドにポストしてユーザーを作成する。
export const signIn = (user) => async (dispatch) => {
  let url = `${baseUrl}/user?userId=${user.userId}&userName=${user.userName}`;
  const res = axios.post(url);
  //resがtrueならユーザーは存在するのでsignInする
  if (res) {
    dispatch({ type: SIGN_IN, payload: user });
  }
};

export const signOut = (user) => ({
  type: SIGN_OUT,
  payload: user,
});
