import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    fork(require("./home/sagas").default),
    fork(require("./branch/sagas").default),
    fork(require("./service/sagas").default),
    fork(require("./doctor/sagas").default),
    fork(require("./practitioner/sagas").default),
    fork(require("./material/sagas").default),
    fork(require("./booking/sagas").default),
    fork(require("./user/sagas").default),
    fork(require("./insurance/sagas").default),
    fork(require("./voucher/sagas").default),
    fork(require("./modal/sagas").default),
    fork(require("./chat/sagas").default),
    fork(require("./resultcanningeyes/sagas").default),
    fork(require("./relatives/sagas").default),
    fork(require("./aichat/sagas").default),
    fork(require("./newfeeds/sagas").default),
    fork(require("./wallet/sagas").default),
  ]);
}
