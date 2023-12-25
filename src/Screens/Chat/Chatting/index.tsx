import _isEmpty from "lodash/isEmpty";
import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { _heightScale } from "../../../Constant/Scale";
import Header from "./components/Header";
import InputChat from "./components/InputChat";
import ListMessages from "./components/ListMessages";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Screen from "@Components/Screen";
import ScreenKey from "@Navigation/ScreenKey";
import { useFocused, useNavigationParams } from "src/Hooks/useNavigation";
import { useDispatch } from "react-redux";
import { getConversationDetails } from "@Redux/chat/actions";
import { StatusBar } from "@Components/StatusBar";

type ScreenK = typeof ScreenKey.CHATTING;

const Chatting = () => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { conversation } = useNavigationParams<ScreenK>();

  useFocused(() => {
    dispatch(getConversationDetails.request(conversation));
  });

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-bottom}
      behavior="padding"
      style={styles.content}
    >
      <Screen safeBottom>
        <Header conversation={conversation} />
        <ListMessages conversation={conversation} />
        <InputChat />
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});

export default Chatting;
