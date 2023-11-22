import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { isEmpty } from "lodash";
import React from "react";
import { View, StyleSheet } from "react-native";
import { DotIndicator } from "react-native-indicators";

type Props = {
  users: any[];
};

export default function Typing({ users }: Props) {
  if (isEmpty(users)) {
    return null;
  }
  return (
    <View style={styles.container}>
      {
        <View style={styles.typingContainer}>
          <View>
            <DotIndicator size={_moderateScale(4)} color="grey" />
          </View>
          <Text left={_moderateScale(8)}>Đang nhập</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: -32,
  },
  typingContainer: {
    height: _moderateScale(8 * 4),
    backgroundColor: "rgba(255, 255, 255,0.9)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8),
  },
});
