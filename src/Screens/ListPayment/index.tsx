import React, { memo, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { _moderateScale } from "../../Constant/Scale";
import { GREY, BG_BEAUTY } from "../../Constant/Color";
import { styleElement } from "../../Constant/StyleElement";
import { stylesFont } from "../../Constant/Font";
import { getPayment } from "../../Redux/Action/InfoAction";
import ItemBookingV2 from "./Components/ItemBookingV2";

const ListPayment = memo((props) => {
  const [listPayment, setListPayment] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  useEffect(() => {
    _getListPaymentForPartner();
  }, []);

  const _getListPaymentForPartner = async () => {
    const condition = {
      paymentFor: {
        notIn: ["WHEEL_TURN", "WALLET"],
      },
      isRefund: { equal: false },
    };
    let resultPayment = await getPayment({
      limit: 1000,
      page: 1,
      condition,
    });
    setIsFirstLoaded(true);
    if (resultPayment?.isAxiosError) return;
    setListPayment(resultPayment);
  };

  const _onRefresh = () => {
    setRefresh(true);
    _getListPaymentForPartner();
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBarCustom barStyle={'dark-content'}  bgColor={WHITE}/> */}
      {/* <Header title={"Danh sách thanh toán"} /> */}
      {isFirstLoaded ? (
        <>
          {listPayment?.length > 0 ? (
            <>
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
                  paddingHorizontal: _moderateScale(8 * 2),
                  paddingTop: _moderateScale(8),
                }}
              >
                {listPayment?.map((item, index) => {
                  return <ItemBookingV2 data={item} key={item?._id} />;
                })}
                <View style={{ height: 50 }} />
              </ScrollView>
            </>
          ) : (
            <View style={[{ flex: 1 }, styleElement.centerChild]}>
              <Text
                style={{
                  ...stylesFont.fontNolan500,
                  fontSize: _moderateScale(14),
                  color: GREY,
                  fontStyle: "italic",
                }}
              >
                Dữ liệu trống
              </Text>
            </View>
          )}
        </>
      ) : (
        <></>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_BEAUTY,
  },
});

export default ListPayment;
