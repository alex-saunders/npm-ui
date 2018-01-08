import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import allReducers from "./reducers";

let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  const logger = createLogger({
    collapsed: true,
    duration: false,
    diff: true
  });
  middleware = [...middleware, logger];
}

export default function configureStore() {
  return createStore(allReducers, applyMiddleware(...middleware));
}
