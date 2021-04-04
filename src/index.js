import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { auth } from "./services/firebase";

import reducers from "./reducers";

const baseUrl = "http://localhost:3001";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, socketMiddleware(baseUrl)))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
