import ActionButton from "@Components/ActionButton/ActionButton";
import Column from "@Components/Column";
import LiAHeader from "@Components/Header/LiAHeader";
import { IconWallet } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";
import {
  BASE_COLOR,
  BLUE_FB,
  BORDER_COLOR,
  PRICE_ORANGE,
  RED,
} from "@Constant/Color";
import { stylesFont } from "@Constant/Font";
import { _moderateScale } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import { createPaymentRequestForWalletCommission } from "@Redux/Action/Affiilate";
import { getInfoUserReducer } from "@Redux/Selectors";
import { getWalletState } from "@Redux/wallet/selectors";
import { isEmpty } from "lodash";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import useConfirmation from "src/Hooks/useConfirmation";
import { useNavigate } from "src/Hooks/useNavigation";

const Withdraw = () => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { navigation } = useNavigate();
  const { data: wallet } = useSelector(getWalletState);
  const { showConfirmation } = useConfirmation();

  const [valueMoney, setValueMoney] = useState("");
  const [valueDescription, setValueDescription] = useState("");

  const _handleOnchangeText = (value) => {
    setValueMoney(
      value
        .split(".")
        .join("")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };
  const _handleConfirm = () => {
    const numberRegex = /^[1-9]\d*$/;
    let checkIsMoney = numberRegex.test(valueMoney?.split(".")?.join(""));
    if (!checkIsMoney) {
      return Alert.alert("Vui lòng nhập đúng định dạng tiền");
    } else {
      showConfirmation(
        "Xác nhận",
        `Xác nhận yêu cầu rút ${valueMoney} VNĐ về tài khoản?`,
        async () => {
          let dataForFetch = {
            amount: Number(valueMoney?.split(".")?.join("")),
            methodCode: "ATM",
            currencyCode: "VND",
            description: valueDescription.trim(),
          };
          let result = await createPaymentRequestForWalletCommission(
            dataForFetch
          );
          if (result?.isAxiosError) return;
          navigation.goBack();
        }
      );
    }
  };

  const isDisabled = useMemo(() => {
    const numberRegex = /^[1-9]\d*$/;
    let checkIsMoney = numberRegex.test(valueMoney?.split(".")?.join(""));
    if (!isEmpty(valueMoney.trim()) && checkIsMoney) {
      return false;
    } else {
      return true;
    }
  }, [valueMoney]);

  return (
    <Screen safeBottom>
      <LiAHeader safeTop title={"Yêu cầu rút tiền"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Column gap={8} margin={8 * 2}>
            <Row gap={8 * 2}>
              <IconWallet />
              <Row gap={8}>
                <Text size={16} weight="bold">
                  Hoa hồng khả dụng:
                </Text>
                <Text color={PRICE_ORANGE} size={16} weight="bold">
                  {formatMonney(wallet?.commissionAmount)} VND
                </Text>
              </Row>
            </Row>
          </Column>

          <Column gap={8} marginTop={0} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Nhập số tiền muốn rút <Text color={RED}>*</Text>
            </Text>
            <TextInput
              onChangeText={(e) => _handleOnchangeText(e)}
              value={valueMoney}
              keyboardType={"number-pad"}
              placeholder="0"
              style={styles.textInput}
            />
          </Column>

          <Column gap={8} marginTop={0} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Ghi chú
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(e) => setValueDescription(e)}
                value={valueDescription}
                placeholder={"Nhập ghi chú"}
                multiline
              />
            </View>
          </Column>

          <Column gap={8} marginTop={0} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Thông tin ngân hàng của bạn
            </Text>

            <Column gap={8}>
              <Column gap={4}>
                <Text>Tên ngân hàng:</Text>
                <Text weight="bold" color={BLUE_FB}>
                  {infoUser?.bankAccount?.bankName}
                </Text>
              </Column>
              <Column gap={4}>
                <Text>Số tài khoản:</Text>
                <Text weight="bold" color={BLUE_FB}>
                  {infoUser?.bankAccount?.accountNumber}
                </Text>
              </Column>
              <Column gap={4}>
                <Text>Tên chủ thẻ:</Text>
                <Text weight="bold" color={BLUE_FB}>
                  {infoUser?.bankAccount?.ownerName}
                </Text>
              </Column>
              {infoUser?.bankAccount?.bankBranch ? (
                <Column gap={4}>
                  <Text>Tên chi nhánh:</Text>
                  <Text weight="bold" color={BLUE_FB}>
                    {infoUser?.bankAccount?.bankBranch}
                  </Text>
                </Column>
              ) : (
                <></>
              )}
            </Column>
          </Column>
        </ScrollView>
      </KeyboardAvoidingView>

      <ActionButton
        disabled={isDisabled}
        onPress={_handleConfirm}
        title={"Xác nhận"}
      />
    </Screen>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  btnUpdateInfoBank: {
    paddingHorizontal: 8 * 2,
    paddingVertical: 8,
    backgroundColor: BLUE_FB,
    alignSelf: "flex-start",
    borderRadius: 4,
  },
  inputContainer: {
    minHeight: _moderateScale(8 * 10),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: _moderateScale(8),
    padding: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BORDER_COLOR,
    padding: 8 * 2,
    fontSize: 18,
    color: PRICE_ORANGE,
    ...stylesFont.fontNolanBold,
  },
});
