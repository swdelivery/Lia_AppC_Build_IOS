import Screen from "@Components/Screen";
import ScreenKey from "@Navigation/ScreenKey";
import { getInfoUserReducer } from "@Redux/Selectors";
import { getListAIMessages } from "@Redux/aichat/actions";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import InputChat from "./Components/InputChat";
import ListMessages from "./Components/ListMessages";

type ScreenK = typeof ScreenKey.CHATTING;

const AIChatting = () => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { infoUser } = useSelector(getInfoUserReducer);

  useEffect(() => {
    dispatch(
      getListAIMessages.request({
        condition: {
          partnerId: { equal: infoUser?._id },
        },
        page: 1,
        limit: 10,
      })
    );
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-bottom}
      behavior="padding"
      style={styles.content}
    >
      <Screen safeBottom backgroundColor="#EEF2F1">
        <Header />
        <ListMessages />
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

export default AIChatting;
