import ScreenKey from "@Navigation/ScreenKey";
import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { navigation } from "rootNavigation";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_INFO_BRANCH_BY_CODE, PARTNER_CHECKIN_BOOKING } from "./types";

function* getInfoBranchByCode({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getInfoBranchByCode, payload);
    yield put(
      actions.getInfoBranchByCode.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}
function* partnerCheckInBooking({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.partnerCheckInBooking, payload);
    navigation.goBack()
    navigation.navigate(ScreenKey.LIST_BOOKING)
    Alert.alert(data?.message);
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_INFO_BRANCH_BY_CODE.REQUEST, getInfoBranchByCode),
    takeLatest(PARTNER_CHECKIN_BOOKING.REQUEST, partnerCheckInBooking),
  ]);
}
