import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BLACK_OPACITY_3,
  BLACK_OPACITY_4,
  SENDER_BG,
  WHITE,
} from "@Constant/Color";
import { sizeIcon } from "@Constant/Icon";
import { _heightScale, _width, _widthScale } from "@Constant/Scale";
import { getInfoUserReducer } from "@Redux/Selectors";
import { Message } from "@typings/chat";
import moment from "moment";
import React, { useMemo } from "react";
import { Image } from "react-native";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

type Props = {
  children?: React.ReactNode;
  item: Message;
  isLatest?: boolean;
};

export default function MyMessage({ children, item, isLatest }: Props) {
  const { infoUser } = useSelector(getInfoUserReducer);
  const isSeen = useMemo(() => {
    return item.viewerUserIdArr.some((id) => id !== infoUser._id);
  }, [item]);

  return (
    <View style={styles.container}>
      <Column
        marginLeft={50}
        alignSelf="flex-end"
        backgroundColor={
          item.type !== "image" &&
          item.type !== "video" &&
          item.type !== "document"
            ? SENDER_BG
            : "transparent"
        }
        borderRadius={5}
        overflow="hidden"
      >
        {children}
      </Column>
      {isLatest && (
        <Row
          backgroundColor={BLACK_OPACITY_3}
          alignSelf="flex-end"
          paddingHorizontal={8}
          borderRadius={3}
          marginVertical={15}
          paddingVertical={4}
        >
          <Image
            style={sizeIcon.xxxs}
            source={require("src/Icon/doubleTick_white.png")}
          />
          <Text weight="bold" color={WHITE} size={10} left={3}>
            {isSeen ? "Đã xem" : "Đã gửi"}
          </Text>
        </Row>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    paddingRight: _widthScale(16),
    width: _width,
    marginBottom: 15,
  },
  time: {
    textAlign: "right",
  },
});
