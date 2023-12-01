import React, { memo, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Header from "../../Components/Header/Header";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import {
  BG_BEAUTY,
  SECOND_COLOR,
  WHITE,
  BASE_COLOR,
  GREY,
  BG_GREY_OPACITY_2,
} from "../../Constant/Color";
import { _moderateScale, _heightScale } from "../../Constant/Scale";
import { getBookingDataForPartner } from "../../Redux/Action/BookingAction";
// import ItemDiary from './Components/ItemDiary';
import ItemCreate from "./Components/ItemCreate";
import {
  getTreatmentDetail,
  getTreatmentDetailNotDispatch,
} from "../../Redux/Action/InfoAction";
import { useSelector, useDispatch } from "react-redux";
import { getPartnerDiary } from "../../Redux/Action/PartnerDiary";
import { styleElement } from "../../Constant/StyleElement";
import { sizeIcon } from "../../Constant/Icon";
import { stylesFont } from "../../Constant/Font";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { getPartnerDiaryv2 } from "../../Redux/Action/Diary";
import ItemDiary from "../MyPersonalPage/Components/ItemDiary";
import Screen from "@Components/Screen";
import LiAHeader from "@Components/Header/LiAHeader";

const index = memo((props) => {
  // const partnerDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.listPartnerDiary)
  const [refresh, setRefresh] = useState(false);

  const [listPartnerDiary, setListPartnerDiary] = useState([]);

  useEffect(() => {
    // dispatch(getPartnerDiary())
    // alert('alo')
    _getPartnerDiary();
  }, []);

  const _getPartnerDiary = async () => {
    let result = await getPartnerDiaryv2({});
    if (result?.isAxiosError) return;
    setListPartnerDiary(result?.data?.data);
  };

  const _onRefresh = () => {
    setRefresh(true);
    _getPartnerDiary();
    // dispatch(getPartnerDiary())
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  return (
    <Screen style={styles.container}>
      <LiAHeader safeTop title="Nhật ký của bạn" />
      {listPartnerDiary?.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                _onRefresh();
              }}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: _moderateScale(8 * 0),
            paddingTop: _moderateScale(8),
          }}
        >
          {/* <ItemCreate /> */}
          {listPartnerDiary?.map((item, index) => {
            return (
              // <ItemDiary data={item} key={item?._id} index={index} />
              // <View style={{height:200}}>
              //     <Text>awd</Text>
              // </View>
              <ItemDiary data={item} />
            );
          })}
          <View style={{ height: 50 }} />
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              ...stylesFont.fontNolan500,
              fontSize: _moderateScale(14),
              color: GREY,
              fontStyle: "italic",
            }}
          >
            Chưa có dữ liệu
          </Text>
        </View>
      )}
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default index;
