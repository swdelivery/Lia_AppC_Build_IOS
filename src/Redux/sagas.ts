import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    fork(require("./home/sagas").default),
    fork(require("./branch/sagas").default),
  ]);
}
