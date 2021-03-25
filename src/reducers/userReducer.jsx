import { SIGN_IN, SIGN_OUT } from "../actions/types";

const initialState = {
  isSignedIn: false,
  isAdmin: false,
  userId: null,
  userName: "anonymous" + Math.floor(Math.random(0) * 100),
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        //payloadにこのactionだとuserデータが入っている
        userId: action.payload.userId,
        userName: action.payload.userName,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        userName: "anonymous" + Math.random(0) * 100,
      };
    default:
      return state;
  }
};
