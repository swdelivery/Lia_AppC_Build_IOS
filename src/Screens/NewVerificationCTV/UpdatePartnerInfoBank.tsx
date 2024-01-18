import ActionButton from "@Components/ActionButton/ActionButton";
import Column from "@Components/Column";
import LiAHeader from "@Components/Header/LiAHeader";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";
import { BASE_COLOR, BORDER_COLOR, RED } from "@Constant/Color";
import ScreenKey from "@Navigation/ScreenKey";
import { createCollaboratorRequest } from "@Redux/Action/Affiilate";
import { uploadModule } from "@Redux/Action/BookingAction";
import { isEmpty } from "lodash";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";

const UpdatePartnerInfoBank = (props) => {
  const { navigate } = useNavigate();

  const [valueBankName, setValueBankName] = useState("");
  const [valueBankId, setValueBankId] = useState("");
  const [valueBankOwner, setValueBankOwner] = useState("");
  const [valueBankBranch, setValueBankBranch] = useState("");

  const _handleConfirm = async () => {
    let { frontCmnd, backCmnd } = props?.route?.params?.dataCmnd;
    let listImages = [frontCmnd, backCmnd].map((i, index) => {
      return {
        uri: i.path,
        width: i.width,
        height: i.height,
        mime: i.mime,
        type: i.mime,
        name: `${i.modificationDate}_${index}`,
      };
    });

    let resultUploadImageMessage = await uploadModule({
      moduleName: "collaboratorRequest",
      files: listImages,
    });
    if (resultUploadImageMessage?.isAxiosError) return;
    let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(
      (item) => item._id
    );

    let body = {
      idImages: listIdImageHasUpload,
      bankAccount: {
        bankName: valueBankName,
        bankBranch: valueBankBranch,
        ownerName: valueBankOwner,
        accountNumber: valueBankId,
      },
    };
    let result = await createCollaboratorRequest(body);
    if (result?.isAxiosError) return;
    navigate(ScreenKey.CURR_COLLAB_REQUEST)();
  };

  const isDisabled = useMemo(() => {
    if (
      !isEmpty(valueBankName.trim()) &&
      !isEmpty(valueBankId.trim()) &&
      !isEmpty(valueBankOwner.trim())
    ) {
      return false;
    } else {
      return true;
    }
  }, [valueBankName, valueBankId, valueBankOwner]);

  return (
    <Screen safeBottom>
      <LiAHeader safeTop title={"Cập nhật thông tin ngân hàng"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Column gap={8} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Tên ngân hàng <Text color={RED}>*</Text>
            </Text>
            <TextInput
              placeholder="Nhấn để chọn ngân hàng"
              onPressIn={navigate(ScreenKey.LIST_BANK_FOR_WITHDRAW, {
                flag: "confirm",
                setBankName: setValueBankName,
              })}
              onChangeText={(e) => setValueBankName(e)}
              value={valueBankName}
              style={styles.textInput}
            />
          </Column>
          <Column gap={8} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Số tài khoản <Text color={RED}>*</Text>
            </Text>
            <TextInput
              placeholder="Nhập số tài khoản"
              onChangeText={(e) => setValueBankId(e)}
              value={valueBankId}
              style={styles.textInput}
            />
          </Column>
          <Column gap={8} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Tên chủ thẻ <Text color={RED}>*</Text>
            </Text>
            <TextInput
              onBlur={() => {
                setValueBankOwner(valueBankOwner.toUpperCase());
              }}
              placeholder="Nhập tên chủ thẻ"
              onChangeText={(e) => setValueBankOwner(e)}
              value={valueBankOwner}
              style={styles.textInput}
            />
          </Column>
          <Column gap={8} margin={8 * 2}>
            <Text weight="bold" color={BASE_COLOR}>
              Tên chi nhánh
            </Text>
            <TextInput
              placeholder="Nhập tên chi nhánh"
              onChangeText={(e) => setValueBankBranch(e)}
              value={valueBankBranch}
              style={styles.textInput}
            />
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

export default UpdatePartnerInfoBank;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BORDER_COLOR,
    padding: 8 * 2,
    paddingVertical: 8,
    fontSize: 16,
    height: 8 * 6,
    // ...stylesFont.fontNolanBold
  },
});
