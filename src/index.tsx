import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app/App";
import store from "./store";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { Provider } from "react-redux";
initializeIcons();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
