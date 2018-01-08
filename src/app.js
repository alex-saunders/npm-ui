import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import "material-components-web/dist/material-components-web.css";

import "./assets/css/base.scss";

import Root from "./containers/root";

import configureStore from "./redux/configure-store";

const rootEl = document.getElementById("root");

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter initialEntries={["/scripts"]}>
      <Root />
    </MemoryRouter>
  </Provider>,
  rootEl
);
