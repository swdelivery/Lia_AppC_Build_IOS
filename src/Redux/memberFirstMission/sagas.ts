import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_MEMBER_FIRST_MISSION, TAKE_AWARD_MEMBER_FIRST_MISSION } from "./types";
import { Alert } from "react-native";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";

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

function* takeAwardMemberFirstMission({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.takeAwardMemberFirstMission, payload);
    Alert.alert(data?.message)
    navigation.navigate(ScreenKey.INFO_WALLET_NEW_AFFILIATE)
  } catch (error: any) {
    Alert.alert(error?.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_MEMBER_FIRST_MISSION.REQUEST, getMemberFirstMission),
    takeLatest(TAKE_AWARD_MEMBER_FIRST_MISSION.REQUEST, takeAwardMemberFirstMission),
  ]);
}
