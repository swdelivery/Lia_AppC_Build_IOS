import React, { memo, useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  _moderateScale,
  _heightScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";
import {
  WHITE,
  RED,
  BG_GREY_OPACITY_2,
  BLACK_OPACITY_8,
  BLUE_FB,
  BASE_COLOR,
} from "../../Constant/Color";
import { formatMonney, alertCustomNotAction } from "../../Constant/Utils";
import { styleElement } from "../../Constant/StyleElement";
import { sizeIcon } from "../../Constant/Icon";
import { stylesFont } from "../../Constant/Font";
import ScreenKey from "../../Navigation/ScreenKey";
import { useSelector } from "react-redux";
import Header from "../../Components/HeaderLoseWeight/index";
import { createPaymentRequestForWalletCommission } from "../../Redux/Action/Affiilate";
import { getWallet } from "../../Redux/Action/InfoAction";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _isEmpty from "lodash/isEmpty";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import { navigation } from "../../../rootNavigation";
import TextInput from "@Components/TextInput";

const index = memo((props) => {
  const [wallet, setWallet] = useState({});

  const [stk, setStk] = useState("");
  const [moneyForWithdraw, setMoneyForWithdraw] = useState(0);
  const [description, setDescription] = useState("");

  const infoUserRedux = useSelector(
    (state) => state?.infoUserReducer?.infoUser
  );

  useEffect(() => {
    console.log({ props });
    _getWallet();
    setStk(infoUserRedux?.bankAccount?.accountNumber);
  }, []);

  const _getWallet = async () => {
    var data = await getWallet();
    if (data?.isAxiosError) return;
    setWallet(data);
  };

  const _confirmWithDraw = async () => {
    if (_isEmpty(moneyForWithdraw) || _isEmpty(stk)) {
      return alertCustomNotAction("Lỗi", "Điền đầy đủ các trường cần thiết");
    }
    if (isNaN(Number(moneyForWithdraw?.split(".")?.join("")))) {
      return alertCustomNotAction("Lỗi", "Sai định dạng tiền");
    }

    console.log();
    let dataForFetch = {
      amount: Number(moneyForWithdraw?.split(".")?.join("")),
      methodCode: "ATM",
      currencyCode: "VND",
      description: description.trim(),
    };

    console.log({ dataForFetch });
    let result = await createPaymentRequestForWalletCommission(dataForFetch);
    if (result?.isAxiosError) return;

    setStk("");
    setMoneyForWithdraw(0);
    setDescription("");

    _getWallet();
    if (props?.route?.params?._getWallet) {
      props?.route?.params?._getWallet();
    }
    if (props?.route?.params?._getCurrentCommission) {
      props?.route?.params?._getCurrentCommission();
    }
    navigation.navigate(ScreenKey.AFFILIATE);
  };

  return (
    <View style={styles.container}>
      <StatusBarCustom bgColor={WHITE} barStyle={"dark-content"} />
      <View style={{ height: _moderateScale(8) }} />
      <Header title={"Chuyển tiền đến ngân hàng"} />

      <KeyboardAwareScrollView>
        <View
          style={{
            marginTop: _moderateScale(8 * 2),
            paddingHorizontal: _moderateScale(8 * 3),
          }}
        >
          <View style={[styleElement.rowAliCenter]}>
            <Image
              style={[sizeIcon.llg]}
              source={require("../../Icon/a_wallet.png")}
            />

            <View style={{ marginLeft: _moderateScale(8 * 1.5) }}>
              <Text
                style={[
                  stylesFont.fontNolan500,
                  { fontSize: _moderateScale(14) },
                ]}
              >
                Số dư khả dụng
              </Text>
              <Text
                style={[
                  stylesFont.fontNolanBold,
                  { fontSize: _moderateScale(18) },
                ]}
              >
                {formatMonney(wallet?.commissionAmount)} VND
              </Text>
            </View>
          </View>

          <Text
            style={[
              stylesFont.fontNolan,
              {
                fontSize: _moderateScale(16),
                marginTop: _moderateScale(8 * 2),
              },
            ]}
          >
            Thông tin người nhận
          </Text>

          <View
            style={[
              styleElement.rowAliCenter,
              { marginTop: _moderateScale(8) },
            ]}
          >
            {/* <View style={styles.btnBank}>
                            <Image style={styles.logoBank} source={{ uri: `${props?.route?.params?.data?.logo}` }} />
                        </View> */}
            <Text
              style={[
                stylesFont.fontNolanBold,
                {
                  flex: 1,
                  marginLeft: _moderateScale(8),
                  fontSize: _moderateScale(16),
                  color: BLUE_FB,
                },
              ]}
            >
              {/* {`${props?.route?.params?.data?.name} (${props?.route?.params?.data?.short_name})`} */}
              {infoUserRedux?.bankAccount?.ownerName}
            </Text>
          </View>

          <Text
            style={[
              stylesFont.fontNolan,
              {
                fontSize: _moderateScale(16),
                marginTop: _moderateScale(8 * 2),
                color: BLACK_OPACITY_8,
              },
            ]}
          >
            Ngân hàng nhận
          </Text>

          <View
            style={[
              styleElement.rowAliCenter,
              { marginTop: _moderateScale(8) },
            ]}
          >
            {/* <View style={styles.btnBank}>
                            <Image style={styles.logoBank} source={{ uri: `${props?.route?.params?.data?.logo}` }} />
                        </View> */}
            <Text
              style={[
                stylesFont.fontNolanBold,
                {
                  flex: 1,
                  marginLeft: _moderateScale(8),
                  fontSize: _moderateScale(16),
                  color: BLUE_FB,
                },
              ]}
            >
              {/* {`${props?.route?.params?.data?.name} (${props?.route?.params?.data?.short_name})`} */}
              {infoUserRedux?.bankAccount?.bankName}
            </Text>
          </View>

          <Text
            style={[
              stylesFont.fontNolan,
              {
                fontSize: _moderateScale(16),
                marginTop: _moderateScale(8 * 2),
                color: BLACK_OPACITY_8,
              },
            ]}
          >
            Số tài khoản {<Text style={{ color: RED }}>*</Text>}
          </Text>
          <TextInput
            onChangeText={(e) => {
              setStk(e);
            }}
            value={stk}
            // editable={false}
            keyboardType={"number-pad"}
            style={[stylesFont.fontNolanBold, styles.textInputCode]}
            placeholder={"Nhập số tài khoản"}
          />

          <Text
            style={[
              stylesFont.fontNolan,
              {
                fontSize: _moderateScale(16),
                marginTop: _moderateScale(8 * 2),
                color: BLACK_OPACITY_8,
              },
            ]}
          >
            Số tiền rút {<Text style={{ color: RED }}>*</Text>}
          </Text>
          <TextInput
            value={moneyForWithdraw}
            keyboardType={"number-pad"}
            onChangeText={(e) => {
              setMoneyForWithdraw(
                e
                  .split(".")
                  .join("")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              );
            }}
            style={[stylesFont.fontNolanBold, styles.textInputCode]}
            placeholder={"Nhập số tiền muốn rút"}
          />

          <Text
            style={[
              stylesFont.fontNolan,
              {
                fontSize: _moderateScale(16),
                marginTop: _moderateScale(8 * 2),
                color: BLACK_OPACITY_8,
              },
            ]}
          >
            Ghi chú
          </Text>
          <View
            style={{
              minHeight: _moderateScale(8 * 10),
              backgroundColor: BG_GREY_OPACITY_2,
              marginTop: _moderateScale(4),
              borderRadius: _moderateScale(8),
              padding: _moderateScale(8),
              paddingHorizontal: _moderateScale(8 * 1.5),
            }}
          >
            <TextInput
              value={description}
              onChangeText={(e) => {
                setDescription(e);
              }}
              placeholder={"Nhập ghi chú"}
              multiline
              style={{
                flex: 1,
                fontSize: _moderateScale(16),
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity onPress={_confirmWithDraw} style={styles.btnConfirm}>
        <Text
          style={[
            stylesFont.fontNolanBold,
            { fontSize: _moderateScale(16), color: WHITE },
          ]}
        >
          Xác nhận
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  btnConfirm: {
    marginTop: _moderateScale(8 * 5),
    backgroundColor: BASE_COLOR,
    marginBottom: getBottomSpace() + _moderateScale(8),
    marginHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    borderRadius: _moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  textInputCode: {
    letterSpacing: 2,
    fontSize: _moderateScale(16),
    padding: _moderateScale(8),
    backgroundColor: BG_GREY_OPACITY_2,
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    marginTop: _moderateScale(8),
    color: BLUE_FB,
  },
  btnBank: {
    backgroundColor: BG_GREY_OPACITY_2,
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: _moderateScale((8 * 8) / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  logoBank: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    resizeMode: "contain",
  },
  inputHeader: {
    marginHorizontal: _moderateScale(8 * 3),
    marginTop: _moderateScale(8),
    backgroundColor: "rgba(244, 244, 244,0.7)",
    borderRadius: _moderateScale(8),
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    fontSize: _moderateScale(14),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_2,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default index;
