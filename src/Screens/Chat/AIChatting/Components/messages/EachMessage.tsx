import moment from "moment";
import React, { useMemo } from "react";
import { View } from "react-native";
import * as Color from "src/Constant/Color";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { AIMessage } from "@typings/aichat";
import MessageContent from "./MessageContent";
import MyMessage from "./MyMessage";
import ParticipantMessage from "./ParticipantMessage";
import { Conversation } from "@typings/chat";

type Props = {
  item: AIMessage;
  previousMessage?: AIMessage;
  nextMessage?: AIMessage;
  conversation: Conversation;
};

const EachMessage = (props: Props) => {
  const { item, nextMessage, previousMessage, conversation } = props;

  const isParticipantMessage = useMemo(() => {
    return item?.role == "assistant";
  }, [item]);

  const sameDay = useMemo(() => {
    return (
      nextMessage && !moment(item.created).isSame(nextMessage.created, "day")
    );
  }, [item?._id, nextMessage?._id]);

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
        <ParticipantMessage conversation={conversation}>
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
