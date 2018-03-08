import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { Provider } from "unstated";

import "./assets/styles/base.scss";
import Root from "./layout/Root";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <MemoryRouter initialEntries={["/scripts"]}>
    <Provider>
      <Root />
    </Provider>
  </MemoryRouter>,
  rootEl
);
