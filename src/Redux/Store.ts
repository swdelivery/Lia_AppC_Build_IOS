import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./Reducers/RootReducer";

const middlewares = [thunk];
const enhancers: any[] = [];
enhancers.push(applyMiddleware(...middlewares));

if (__DEV__) {
  // @ts-ignore
  const reactotronEnhancer =
    // @ts-ignore
    require("../utils/reactotronConfig").default.createEnhancer();
  enhancers.push(reactotronEnhancer);
}

const store = createStore(rootReducer, compose(...enhancers));

export default store;
