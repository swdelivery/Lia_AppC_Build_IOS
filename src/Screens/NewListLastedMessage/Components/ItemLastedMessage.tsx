import { Pressable, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { WHITE } from "@Constant/Color";
import { LastMessage } from "@typings/chat";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import Avatar from "@Components/Avatar";
import { useSelector } from "react-redux";
import { getInfoUserReducer } from "@Redux/Selectors";
import moment from "moment";
import useCallbackItem from "src/Hooks/useCallbackItem";

type Props = {
  item: LastMessage;
  onPress: (item: LastMessage) => void;
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
        <Avatar
          size={_moderateScale(8 * 5)}
          style={styles.avatar}
          avatar={assignedUser?.profile?.fileAvatar}
        />
        <Column gap={_moderateScale(4)} flex={1}>
          <Text weight={isSeen ? "regular" : "bold"}>{assignedUser?.name}</Text>
          <Text
            size={12}
            weight={isSeen ? "regular" : "bold"}
            numberOfLines={1}
          >
            {item.latestMessage?.content}
          </Text>
        </Column>
        <Column gap={_moderateScale(4)} alignItems="flex-end">
          <Text weight="bold" size={12}>
            {item.latestMessage?.created
              ? moment(item.latestMessage?.created).fromNow()
              : ""}
          </Text>
          <View style={styles.countBox}>
            <Text weight="bold" size={12} color={WHITE}>
              +5
            </Text>
          </View>
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
  countBox: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 2),
    borderRadius: _moderateScale(4),
    backgroundColor: "#EB4303",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
  },
});
