import Avatar from "@Components/Avatar";
import Column from "@Components/Column";
import FastImage from "@Components/FastImage";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BG_GREY_OPACITY, ONLINE, WHITE } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { getConversationState } from "@Redux/chat/selectors";
import { Message } from "@typings/chat";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

type Props = {
  item: Message;
  nextMessage?: Message;
  previousMessage?: Message;
  children: React.ReactNode;
  isOnline?: boolean;
};

export default function ParticipantMessage({
  item,
  children,
  nextMessage,
  isOnline,
}: Props) {
  const { data: conversation } = useSelector(getConversationState);

  const shouldShowName = useMemo(() => {
    if (nextMessage) {
      return nextMessage.senderId !== item.senderId && item.type !== "chatgpt";
    }
    return false;
  }, [item, nextMessage]);

  const shouldShowAvatar = useMemo(() => {
    if (nextMessage) {
      return (
        nextMessage.senderId !== item.senderId ||
        ((nextMessage.type === "chatgpt" || item.type === "chatgpt") &&
          nextMessage.type !== item.type) ||
        ((nextMessage.type === "template" || item.type === "template") &&
          nextMessage.type !== item.type)
      );
    }
    return true;
  }, [item, nextMessage]);

  const user = useMemo(() => {
    return conversation.assignedUsers.find((u) => u.userId === item.senderId);
  }, [conversation]);

  function renderAvatar() {
    if (item.type === "chatgpt" || item.type === "template") {
      return (
        <FastImage
          style={[styles.avatarSm]}
          source={require("src/Icon/a_timeline.png")}
        />
      );
    }
    return (
      <>
        <Avatar
          avatar={user?.profile?.fileAvatar}
          size={30}
          circle
        />
        {isOnline && <View style={styles.onlineIndicator} />}
      </>
    );
  }

  return (
    <Row alignItems="flex-start" paddingHorizontal={15} marginBottom={15}>
      <Column
        width={35}
        height={30}
        right={10}
        marginTop={shouldShowName ? 15 : 0}
      >
        {shouldShowAvatar && renderAvatar()}
      </Column>
      <Column flex={1} alignItems="flex-start">
        <Column marginRight={30}>
          {shouldShowName && (
            <Text weight="bold" size={12} bottom={2}>
              {user?.name}
            </Text>
          )}
          <Column
            backgroundColor={
              item.type !== "image" &&
                item.type !== "video" &&
                item.type !== "document"
                ? WHITE
                : "transparent"
            }
            borderRadius={5}
            overflow="hidden"
          >
            {children}
          </Column>
        </Column>
      </Column>
    </Row>
  );
}

const styles = StyleSheet.create({
  avatarSm: {
    width: _moderateScale(30),
    height: _moderateScale(30),
    borderRadius: _moderateScale(15),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY,
  },
  onlineIndicator: {
    position: "absolute",
    zIndex: 1,
    bottom: _moderateScale(-2),
    right: _moderateScale(-2),
    width: _moderateScale(8 * 1.75),
    height: _moderateScale(8 * 1.75),
    borderWidth: _moderateScale(2),
    borderColor: WHITE,
    borderRadius: _moderateScale(9),
    backgroundColor: ONLINE,
  },
});
