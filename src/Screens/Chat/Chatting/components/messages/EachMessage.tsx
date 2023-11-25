import moment from "moment";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import * as Color from "src/Constant/Color";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "src/Constant/Scale";
import SystemMessage from "./SystemMessage";
import { Message } from "@typings/chat";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { getInfoUserReducer } from "@Redux/Selectors";
import MyMessage from "./MyMessage";
import MessageContent from "./MessageContent";
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

export default EachMessage;
