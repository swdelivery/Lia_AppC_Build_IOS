import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { BASE_COLOR, BLACK, BLACK_OPACITY_7, BLACK_OPACITY_8, WHITE } from "@Constant/Color";
import { Conversation } from "@typings/chat";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import Avatar from "@Components/Avatar";
import moment from "moment";
import useCallbackItem from "src/Hooks/useCallbackItem";
import { IconAI } from "@Components/Icon/Icon";
import { useSelector } from "react-redux";
import { getInfoUserReducer } from "@Redux/Selectors";

type Props = {
  item: Conversation;
  onPress: (item: Conversation) => void;
};

const ItemLastedMessage = ({ item, onPress }: Props) => {
  const trigger = useCallbackItem(item);
  const { infoUser } = useSelector(getInfoUserReducer);

  const assignedUser = useMemo(() => {
    return item.assignedUsers[0];
  }, [item]);

  const isSeen = useMemo(() => {
    return item.type === "assistant" || item.latestMessage?.isPartnerSeen;
  }, [item]);

  const lastMessageContent = useMemo(() => {
    const prefix =
      infoUser?._id === item?.latestMessage?.senderId ? "Bạn: " : ``;
    let content = "";
    switch (item.latestMessage?.type) {
      case "video":
        content = `[ Video ]`;
        break;
      case "image":
        content = `[ Hình ảnh ]`;
        break;
      case "document":
        content = `[ Tài liệu ]`;
        break;
      case "template":
        content = item.latestMessage?.content;
        break;
      default:
        content = item.latestMessage?.content;
        break;
    }
    return `${prefix}${content}`;
  }, [item, infoUser]);

  const lastMessageTime = useMemo(() => {
    if (!item.latestMessage?.created) {
      return "";
    }
    const created = moment(item.latestMessage?.created);
    if (
      created.clone().startOf("days").diff(moment().startOf("days"), "day") < -1
    ) {
      return created.format("DD/MM/YYYY");
    }
    return moment(item.latestMessage?.created).fromNow();
  }, [item.latestMessage?.created]);

  return (
    <Pressable onPress={trigger(onPress)}>
      <Row gap={_moderateScale(8 * 2)} paddingVertical={8}>
        {item?.type === "consultation" ? (
          <Image
            resizeMode="cover"
            source={require("src/NewImage/logoLiA.png")}
            style={styles.avatar}
          />
        ) : item.type === "assistant" ? (
          <IconAI width={45} height={45} color={BASE_COLOR} />
        ) : (
          <Avatar
            size={45}
            style={styles.avatar}
            avatar={assignedUser?.profile?.fileAvatar}
          />
        )}
        <Column gap={_moderateScale(4)} flex={1}>
          <Text weight={isSeen ? "bold" : "bold"} color={isSeen ? BLACK_OPACITY_7 : BLACK} size={14}>
            {item.type === "assistant" || item.type === "consultation"
              ? item.name
              : assignedUser?.name}
          </Text>
          <Text weight={isSeen ? "regular" : "bold"} numberOfLines={1}>
            {lastMessageContent}
          </Text>
        </Column>
        <Column gap={_moderateScale(4)} alignItems="flex-end">
          <Text weight={isSeen ? "regular" : "bold"} fontStyle="italic">
            {lastMessageTime}
          </Text>
          {!isSeen ? (
            <View style={styles.countBox}>
              <Text weight="bold" size={12} color={WHITE}>
                {item.unreadCount}
              </Text>
            </View>
          ) : (
            <View style={styles.countBoxBlank} />
          )}
        </Column>
      </Row>
    </Pressable>
  );
};

export const PLACEHOLDER_HEIGHT = 60;

export function Placeholder() {
  return (
    <Column height={PLACEHOLDER_HEIGHT}>
      <ContentLoader>
        <Circle x="20" y="20" r="20" />
        <Rect x="60" y="0" rx="4" ry="4" width="30%" height="13" />
        <Rect x="60" y="20" rx="3" ry="3" width="100%" height="15" />
      </ContentLoader>
    </Column>
  );
}

export default ItemLastedMessage;

const styles = StyleSheet.create({
  countBoxBlank: {
    width: 8 * 5,
    height: 8 * 2,
  },
  countBox: {
    width: 8 * 5,
    height: 8 * 2,
    borderRadius: 4,
    backgroundColor: "#EB4303",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 70 / 2,
  },
});
