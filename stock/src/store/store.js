import { createStore, compose, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";

import rootReducer from "../reducer";

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = applyMiddleware(promiseMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middleware));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducer", () =>
      store.replaceReducer(require("../reducer").default)
    );
  }

  return store;
}
