import _isEmpty from "lodash/isEmpty";
import React, { memo, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
// REDUX
import { useDispatch } from "react-redux";
import { navigation } from "../../../../rootNavigation";
import { FROM_GROUP_CHAT_ID } from "../../../Constant/Flag";
import GlobalStore from "../../../Constant/GlobalStore";
import { _heightScale } from "../../../Constant/Scale";
import ScreenKey from "../../../Navigation/ScreenKey";
import {
  getConversationByIdForPartner,
  getDataPartnerMessage,
} from "../../../Redux/Action/MessageActionV2";
import { getStringeeToken } from "../../../Redux/Action/StringeeAction";
import * as ActionType from "../../../Redux/Constants/ActionType";
import Store from "../../../Redux/store";
import Header from "./Header";
import InputChat from "./InputChat";
import ListMessages from "./ListMessages";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Screen from "@Components/Screen";

const Chatting = (props) => {
  const clientRef = useRef("client");

  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    // _getStringeeToken()

    if (props?.route?.params?.flag == FROM_GROUP_CHAT_ID) {
      fetchAPIGroupChatByCode(props.route.params.propsData._id);
    }

    return () => {
      Store.dispatch({
        type: ActionType.CLEAR_DATA_CURR_CHATTING,
        payload: null,
      });
      GlobalStore.xyzc = null;
    };
  }, []);

  const _getStringeeToken = async () => {
    let result = await getStringeeToken();
    // console.log();
    if (result?.isAxiosError) return;
    // console.log({ clientRef });

    await clientRef?.current?.connect(result?.data?.data?.token);
    console.log({ clientId: clientRef?.current?.getId() });
    setClientId(clientRef?.current?.getId());
  };

  const fetchAPIGroupChatByCode = async (conversationId) => {
    if (!_isEmpty(conversationId)) {
      let resultGetConversationByIdForPartner =
        await getConversationByIdForPartner(conversationId);
      if (resultGetConversationByIdForPartner.isAxiosError) return;

      Store.dispatch({
        type: ActionType.SAVE_INFO_CURR_CHATTING,
        payload: {
          data: resultGetConversationByIdForPartner?.data?.data,
        },
      });

      let resultGetDataPartnerMessage = await getDataPartnerMessage({
        condition: {
          conversationId: conversationId,
        },
        // sort: {
        //     created: -1
        // },
        limit: 20,
        page: 1,
      });
      if (resultGetDataPartnerMessage.isAxiosError) return;

      Store.dispatch({
        type: ActionType.SAVE_LIST_MESSAGE_CURR_CHATTING,
        payload: {
          data: resultGetDataPartnerMessage?.data?.data,
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-bottom}
      behavior="padding"
      style={styles.content}
    >
      <Screen safeBottom>
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

export default Chatting;
