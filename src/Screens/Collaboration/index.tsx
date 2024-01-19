import Screen from "@Components/Screen";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Banner from "./components/Banner";
import Text from "@Components/Text";
import { BASE_COLOR, BORDER_INPUT_TEXT } from "@Constant/Color";
import Column from "@Components/Column";
import StickyBackground from "@Components/StickyBackground";
import PhoneInput from "@Components/PhoneInput";
import { FormTextInput } from "@Components/TextInput";
import useFormData from "src/Hooks/useFormData";
import { CallingCode } from "react-native-country-picker-modal";
import CollaborationType from "./components/CollaborationType";
import BottomSheet from "@Components/BottomSheet";
import useVisible from "src/Hooks/useVisible";
import useAnimatedVisible from "src/Hooks/useAnimatedVisible";
import Button from "@Components/Button/Button";
import LiAHeader from "@Components/Header/LiAHeader";
import { useNavigate } from "src/Hooks/useNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormType = {
  name: string;
  phone: string;
  countryCode: CallingCode;
  email: string;
};

export default function Collaboration() {
  const { navigation } = useNavigate();
  const collaborationTypePicker = useVisible();
  const { top } = useSafeAreaInsets();

  const formData = useFormData<FormType>({
    name: "",
    phone: "",
    countryCode: "84",
    email: "",
  });

  return (
    <Screen safeBottom>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StickyBackground backgroundColor={BASE_COLOR} />
        <Banner />
        <Column alignItems="center" gap={4} marginVertical={16}>
          <Text size={18} color={BASE_COLOR} weight="bold">
            Liên hệ - hợp tác
          </Text>
          <Text textAlign="center" color={"#373435"} size={16}>
            {
              "LiA hân hạnh đồng hành cùng bạn trong việc\nlàm đẹp dành cho mọi người"
            }
          </Text>
        </Column>
        <Column marginHorizontal={16} gap={16}>
          <FormTextInput
            placeholder="Họ tên"
            value={formData.values.name}
            onChangeText={formData.updateValue("name")}
          />
          <PhoneInput
            label="Số điện thoại"
            content={formData.values.phone}
            countryCallingCode={formData.values.countryCode}
          />
          <FormTextInput
            placeholder="Email"
            value={formData.values.email}
            onChangeText={formData.updateValue("email")}
          />
        </Column>
        <Column backgroundColor={"#F3F4F9"} height={5} marginVertical={26} />
        <CollaborationType onPress={collaborationTypePicker.show} />

        <Column flex={1} />
        <Button.Gradient
          title="Gửi thông tin"
          containerStyle={styles.button}
          titleSize={20}
          horizontal
          colors={["#2A78BD", "#21587E"]}
        />
      </ScrollView>
      <LiAHeader
        title=""
        containerStyle={[styles.header, { marginTop: top }]}
        onBackPress={navigation.goBack}
      />
      <BottomSheet
        visible={collaborationTypePicker.visible}
        onClose={collaborationTypePicker.hide}
        hideNavigator
        contentContainerStyle={styles.bottomSheet}
      >
        <Column
          backgroundColor={"white"}
          marginHorizontal={16}
          borderRadius={12}
        >
          <Column
            height={57}
            alignItems="center"
            justifyContent="center"
            borderBottomWidth={1}
            borderBottomColor={BORDER_INPUT_TEXT}
          >
            <Text size={18}>Tôi là Bác sĩ</Text>
          </Column>
          <Column
            height={57}
            alignItems="center"
            justifyContent="center"
            borderBottomWidth={1}
            borderBottomColor={BORDER_INPUT_TEXT}
          >
            <Text size={18}>Bệnh viện thẩm mỹ</Text>
          </Column>
          <Column height={57} alignItems="center" justifyContent="center">
            <Text size={18}>Phòng khám, spa, cơ sở y tế</Text>
          </Column>
        </Column>
        <Column
          alignSelf="center"
          borderWidth={1}
          borderColor={"white"}
          borderRadius={8}
          paddingHorizontal={8}
          paddingVertical={4}
          marginVertical={16}
        >
          <Text color={"white"} size={18}>
            Quay lại
          </Text>
        </Column>
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  bottomSheet: {
    backgroundColor: "transparent",
  },
  button: {
    alignSelf: "center",
    height: 48,
    width: 200,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  header: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});
