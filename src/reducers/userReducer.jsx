import { SIGN_IN, SIGN_OUT } from "../actions/types";

const initialState = {
  isSignedIn: false,
  isAdmin: false,
  userName: "terry" + Math.floor(Math.random(0) * 100),
  userEmail: null,
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
        userEmail: action.payload.userEmail,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        userName: "terry" + Math.floor(Math.random(0) * 100),
      };
    default:
      return state;
  }
};
