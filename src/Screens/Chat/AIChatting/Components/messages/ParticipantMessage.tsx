import Column from "@Components/Column";
import { IconAI } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, BG_GREY_OPACITY, ONLINE, WHITE } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { AIMessage } from "@typings/aichat";
import { Conversation } from "@typings/chat";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  conversation: Conversation;
};

export default function ParticipantMessage({ conversation, children }: Props) {
  return (
    <Row alignItems="flex-start" paddingHorizontal={15} marginBottom={15}>
      <Column width={35} height={30} right={10} marginTop={15}>
        <IconAI color={BASE_COLOR} />
      </Column>
      <Column flex={1} alignItems="flex-start">
        <Column marginRight={30}>
          <Text weight="bold" size={12} bottom={2}>
            {conversation.name}
          </Text>
          <Column backgroundColor={WHITE} borderRadius={5} overflow="hidden">
            {children}
          </Column>
        </Column>
      </Column>
    </Row>
  );
}
