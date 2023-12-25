import _isEmpty from "lodash/isEmpty";
import React, { useCallback } from "react";
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
import useVisible from "src/Hooks/useVisible";
import SocketInstance from "SocketInstance";
import { CSS_SEND_MESSAGE } from "src/Sockets/type";
import { StatusBar } from "@Components/StatusBar";

type ScreenK = typeof ScreenKey.CHATTING;

const Chatting = () => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { conversation } = useNavigationParams<ScreenK>();
  const imageActions = useVisible();

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
        <StatusBar />
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
