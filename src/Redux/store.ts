import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./Reducers/RootReducer";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];
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

sagaMiddleware.run(rootSaga);

export default store;
