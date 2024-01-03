import Column from "@Components/Column";
import { IconAI } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, BG_GREY_OPACITY, ONLINE, WHITE } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { AIMessage } from "@typings/aichat";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  item: AIMessage;
  nextMessage?: AIMessage;
  previousMessage?: AIMessage;
  children: React.ReactNode;
  isOnline?: boolean;
};

export default function ParticipantMessage({
  item,
  children,
  nextMessage,
  isOnline,
}: Props) {

  return (
    <Row alignItems="flex-start" paddingHorizontal={15} marginBottom={15}>
      <Column width={35} height={30} right={10} marginTop={15}>
        <IconAI color={BASE_COLOR} />
      </Column>
      <Column flex={1} alignItems="flex-start">
        <Column marginRight={30}>
          <Text weight="bold" size={12} bottom={2}>
            Trợ lý AI LiA
          </Text>
          <Column backgroundColor={WHITE} borderRadius={5} overflow="hidden">
            {children}
          </Column>
        </Column>
      </Column>
    </Row>
  );
}
