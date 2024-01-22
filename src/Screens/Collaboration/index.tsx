import Screen from "@Components/Screen";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Banner from "./components/Banner";
import Text from "@Components/Text";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import Column from "@Components/Column";
import StickyBackground from "@Components/StickyBackground";
import PhoneInput from "@Components/PhoneInput";
import { FormTextInput } from "@Components/TextInput";
import useFormData, {
  emailField,
  phoneField,
  requiredField,
} from "src/Hooks/useFormData";
import { CallingCode } from "react-native-country-picker-modal";
import CollaborationType from "./components/CollaborationType";
import useVisible from "src/Hooks/useVisible";
import Button from "@Components/Button/Button";
import LiAHeader from "@Components/Header/LiAHeader";
import { useNavigate } from "src/Hooks/useNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CollaborationTypePicker from "./components/CollaborationTypePicker";
import useApi from "src/Hooks/services/useApi";
import PartnerService from "src/Services/PartnerService";
import { LoadingModal } from "@Components/Loading/LoadingView";
import Toast from "react-native-toast-message";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";

const emailValidation = (value: string) => {
  if (!value) {
    return "";
  }
  return emailField(value);
};

type FormType = {
  name: string;
  phone: string;
  callingCode: CallingCode;
  email: string;
  collaborationType: string;
};

export default function Collaboration() {
  const { navigation } = useNavigate();
  const collaborationTypePicker = useVisible();
  const scrollY = useSharedValue(0);
  const { isLoading, performRequest } = useApi(
    PartnerService.requestCollab,
    null
  );
  const { bottom } = useSafeAreaInsets();

  const formData = useFormData<FormType>(
    {
      name: "",
      phone: "",
      callingCode: "84",
      email: "",
      collaborationType: "",
    },
    (values) => {
      if (!formData.checkValid()) {
        return;
      }
      const payload = {
        name: values.name,
        phone: {
          nationCode: "+" + values.callingCode,
          phoneNumber: values.phone,
        },
        email: values.email,
        collabForm: values.collaborationType,
      };
      performRequest(payload);
      Toast.show({
        text1: "Gửi yêu cầu thành công",
        type: "success",
      });
      navigation.goBack();
    },
    {
      validates: {
        name: requiredField,
        phone: phoneField,
        email: emailValidation,
        collaborationType: requiredField,
      },
    }
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen safeBottom>
      <Banner scrollY={scrollY} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styleElement.flex}
      >
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={styles.contentContainer}
        >
          <Column backgroundColor={WHITE}>
            <Column
              alignItems="center"
              gap={4}
              marginVertical={16}
              backgroundColor={"white"}
            >
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
                error={formData.errors.name}
              />
              <PhoneInput
                label="Số điện thoại"
                content={formData.values.phone}
                countryCallingCode={formData.values.callingCode}
                onSelectionCallingCode={formData.updateValue("callingCode")}
                onChangeText={formData.updateValue("phone")}
                onBlur={formData.validate("phone")}
                errorMessage={formData.errors.phone}
              />
              <FormTextInput
                placeholder="Email"
                value={formData.values.email}
                onChangeText={formData.updateValue("email")}
                onBlur={formData.validate("email")}
                error={formData.errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Column>
            <Column
              backgroundColor={"#F3F4F9"}
              height={5}
              marginVertical={26}
            />
            <CollaborationType
              value={formData.values.collaborationType}
              onPress={collaborationTypePicker.show}
              error={formData.errors.collaborationType}
            />

            <Column flex={1} />
          </Column>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
      <Button.Gradient
        title="Gửi thông tin"
        containerStyle={styles.button}
        titleSize={20}
        horizontal
        colors={["#2A78BD", "#21587E"]}
        onPress={formData.submit}
      />
      <LiAHeader
        safeTop
        title=""
        containerStyle={styles.header}
        onBackPress={navigation.goBack}
      />
      <CollaborationTypePicker
        visible={collaborationTypePicker.visible}
        onClose={collaborationTypePicker.hide}
        onCollaborationType={formData.updateValue("collaborationType")}
      />

      <LoadingModal visible={isLoading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: (_width * 9) / 16,
    paddingBottom: 100,
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  bottomSheet: {
    backgroundColor: "transparent",
  },
  button: {
    alignSelf: "center",
    height: 41,
    width: 200,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginVertical: 8,
  },
  header: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});
