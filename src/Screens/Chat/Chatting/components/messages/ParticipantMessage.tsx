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
      const isSameMinute =
        new Date(nextMessage.created).getMinutes() ===
        new Date(item.created).getMinutes();
      return (
        nextMessage.senderId !== item.senderId ||
        ((nextMessage.type === "chatgpt" || item.type === "chatgpt") &&
          nextMessage.type !== item.type) ||
        !isSameMinute ||
        ((nextMessage.type === "template" || item.type === "template") &&
          (nextMessage.type !== item.type || !isSameMinute))
      );
    }
    return true;
  }, [item, nextMessage]);

  const user = useMemo(() => {
    return conversation.assignedUsers.find((u) => u.userId === item.senderId);
  }, [conversation]);

  const isRootAccount = user?.name === "root root";

  function renderAvatar() {
    if (item.type === "chatgpt" || item.type === "template" || isRootAccount) {
      return (
        <FastImage
          style={styles.avatarSm}
          source={require("src/NewImage/logoLiA.png")}
        />
      );
    }
    return (
      <>
        <Avatar avatar={user?.profile?.fileAvatar} size={30} circle />
        {isOnline && <View style={styles.onlineIndicator} />}
      </>
    );
  }

  return (
    <Row alignItems="flex-start" paddingHorizontal={15} marginBottom={15}>
      <Column
        width={35}
        height={30}
        marginRight={10}
        marginTop={shouldShowName ? 15 : 0}
      >
        {shouldShowAvatar && renderAvatar()}
      </Column>
      <Column flex={1} alignItems="flex-start">
        <Column marginRight={30}>
          {shouldShowName && (
            <Text weight="bold" size={12} bottom={2}>
              {isRootAccount ? "LiA" : user?.name}
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
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: BG_GREY_OPACITY,
    backgroundColor: "white",
  },
  onlineIndicator: {
    position: "absolute",
    zIndex: 1,
    bottom: -2,
    right: -2,
    width: 8 * 1.75,
    height: 8 * 1.75,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 9,
    backgroundColor: ONLINE,
  },
});
