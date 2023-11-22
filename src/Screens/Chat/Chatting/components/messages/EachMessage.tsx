import { isEmpty } from "lodash";
import moment from "moment";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { useSelector } from "react-redux";
import FastImage from "src/Components/Image/FastImage";
import * as Color from "src/Constant/Color";
import { BG_GREY_OPACITY_5, GREY_FOR_TITLE } from "src/Constant/Color";
import { stylesFont } from "src/Constant/Font";
import { sizeIcon } from "src/Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "src/Constant/Scale";
import { styleElement } from "src/Constant/StyleElement";
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from "src/Constant/Url";
import SystemMessage from "./SystemMessage";
import { Message } from "@typings/chat";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { getInfoUserReducer } from "@Redux/Selectors";
import MyMessage from "./MyMessage";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import MessageConten from "./MessageContent";
import MessageContent from "./MessageContent";
import { getConversationState } from "@Redux/chat/selectors";
import ParticipantMessage from "./ParticipantMessage";

type Props = {
  item: Message;
  previousMessage?: Message;
  nextMessage?: Message;
  isOnline?: boolean;
};

const EachMessage = (props: Props) => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { item, nextMessage, previousMessage, isOnline } = props;

  const isParticipantMessage = useMemo(() => {
    return (
      item.senderId !== infoUser._id ||
      item.type === "chatgpt" ||
      item.type === "template"
    );
  }, [item]);

  const sameDay = useMemo(() => {
    return (
      nextMessage && !moment(item.created).isSame(nextMessage.created, "day")
    );
  }, [item?._id, nextMessage?._id]);

  if (item.isSystemNotification) {
    return <SystemMessage item={item} />;
  }

  return (
    <View>
      {sameDay && (
        <Column
          alignSelf="center"
          backgroundColor={Color.WHITE}
          paddingHorizontal={20}
          borderRadius={5}
          height={25}
          justifyContent="center"
          marginBottom={20}
          marginTop={10}
        >
          <Text color={Color.BLACK} size={10}>
            {moment(item.created).format("LL")}
          </Text>
        </Column>
      )}

      {isParticipantMessage ? (
        <ParticipantMessage
          item={item}
          nextMessage={nextMessage}
          isOnline={isOnline}
        >
          <MessageContent item={item} />
        </ParticipantMessage>
      ) : (
        <MyMessage item={item} isLatest={!previousMessage}>
          <MessageContent item={item} isMyMessage />
        </MyMessage>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: _moderateScale(40),
    height: _moderateScale(40),
    borderRadius: _moderateScale(20),
    borderWidth: _moderateScale(1),
    borderColor: Color.BG_GREY_OPACITY,
  },
  avatarSm: {
    width: _moderateScale(30),
    height: _moderateScale(30),
    borderRadius: _moderateScale(15),
    borderWidth: _moderateScale(1),
    borderColor: Color.BG_GREY_OPACITY,
  },
  btnSeen: {
    paddingHorizontal: _moderateScale(8 * 1.2),
    paddingVertical: _moderateScale(2),
    backgroundColor: Color.BG_GREY_OPACITY_9,
    borderRadius: _moderateScale(8),
    marginTop: _moderateScale(8),
    marginBottom: _moderateScale(8 * 5),
    flexDirection: "row",
    alignItems: "center",
  },
  btnSendDone: {
    paddingHorizontal: _moderateScale(8 * 1.2),
    paddingVertical: _moderateScale(2),
    backgroundColor: Color.BG_GREY_OPACITY_9,
    borderRadius: _moderateScale(8),
    marginTop: _moderateScale(8),
    marginBottom: _moderateScale(8 * 5),
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    width: _width,
    marginBottom: _heightScale(4),
    // flexDirection: 'row',
  },
  message__content: {
    minWidth: _widthScale(100),
    maxWidth: _widthScale(230),
    backgroundColor: Color.WHITE,
    padding: _moderateScale(12),
    paddingBottom: _moderateScale(8),
    marginLeft: _widthScale(8),
    borderRadius: _moderateScale(8),
  },
  imagesWrap: {
    width: _widthScale(250),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    borderRadius: _moderateScale(10),
    overflow: "hidden",
  },
  systemMessage__content: {
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(4),
    textAlign: "center",
    fontSize: _moderateScale(12),
    color: GREY_FOR_TITLE,
  },
});

export default EachMessage;
