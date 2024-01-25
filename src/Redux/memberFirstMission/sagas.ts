import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_MEMBER_FIRST_MISSION } from "./types";

function* getMemberFirstMission({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getMemberFirstMission, payload);
    yield put(
      actions.getMemberFirstMission.success({
        data,
      })
    );
  } catch (error: any) {
    console.log({ error });
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_MEMBER_FIRST_MISSION.REQUEST, getMemberFirstMission),
  ]);
}
