import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { WHITE } from "@Constant/Color";
import { Conversation } from "@typings/chat";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import Avatar from "@Components/Avatar";
import { useSelector } from "react-redux";
import { getInfoUserReducer } from "@Redux/Selectors";
import moment from "moment";
import useCallbackItem from "src/Hooks/useCallbackItem";

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
    return item.latestMessage
      ? item.latestMessage.viewerUserIdArr.includes(infoUser._id)
      : false;
  }, [item, infoUser]);

  return (
    <Pressable onPress={trigger(onPress)}>
      <Row gap={_moderateScale(8 * 2)} paddingVertical={8}>
        {item?.type === "consultation" ? (
          <Image
            resizeMode="cover"
            source={require("src/NewImage/logoLiA.png")}
            style={styles.avatar}
          />
        ) : (
          <Avatar
            size={_moderateScale(8 * 5)}
            style={styles.avatar}
            avatar={assignedUser?.profile?.fileAvatar}
          />
        )}
        <Column gap={_moderateScale(4)} flex={1}>
          <Text weight={item.latestMessage?.isPartnerSeen ? "regular" : "bold"}>
            {item.type === "consultation" ? item.name : assignedUser?.name}
          </Text>
          <Text
            size={12}
            weight={item.latestMessage?.isPartnerSeen ? "regular" : "bold"}
            numberOfLines={1}
          >
            {item.latestMessage?.content}
          </Text>
        </Column>
        <Column gap={_moderateScale(4)} alignItems="flex-end">
          <Text
            weight={item.latestMessage?.isPartnerSeen ? "regular" : "bold"}
            size={12}
          >
            {item.latestMessage?.created
              ? moment(item.latestMessage?.created).fromNow()
              : ""}
          </Text>
          {!item.latestMessage?.isPartnerSeen ? (
            <View style={styles.countBox}>
              <Text weight="bold" size={12} color={WHITE}>
                Mới
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
    width: 8 * 5,
    height: 8 * 5,
    borderRadius: (8 * 5) / 2,
  },
});
