import Column from "@Components/Column";
import IconButton from "@Components/IconButton";
import Text from "@Components/Text";
import { sizeIcon } from "@Constant/Icon";
import { _heightScale, _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { Message } from "@typings/chat";
import moment from "moment";
import React from "react";
import { Image } from "react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Color from "src/Constant/Color";
import useCacheFile from "src/Hooks/useCacheFile";

type Props = {
  item: Message;
  isMyMessage: boolean;
};

export default function VideoMessage({ item, isMyMessage }: Props) {
  const { isExist, isLoading, openFile } = useCacheFile(item?.videos[0]);
  const backgroundColor = isMyMessage ? Color.SENDER_BG : Color.RECEIVER_BG;

  function renderDownloadIcon() {
    return (
      <IconButton
        size={32}
        borderRadius={16}
        backgroundColor={backgroundColor}
        right={8}
        left={8}
        isLoading={isLoading}
      >
        <Image
          style={sizeIcon.xxs}
          source={require("src/Icon/download_black.png")}
        />
      </IconButton>
    );
  }

  return (
    <TouchableOpacity
      // onLongPress={() => {
      //     props?.setCurrMessageForRemove(item)
      //     props?.setIsShowModalRemoveMessage(true)
      // }}
      style={[styleElement.rowAliCenter]}
      onPress={openFile}
    >
      {!isExist && isMyMessage && renderDownloadIcon()}
      <Column
        backgroundColor={backgroundColor}
        borderRadius={5}
        paddingHorizontal={10}
        paddingVertical={5}
      >
        <View>
          <Text
            color={Color.SENDER_COLOR_TEXT}
            textDecorationLine="underline"
            size={12}
          >
            {item?.videos[0]?.originalName}
          </Text>
          <Text
            style={styles.time}
            size={10}
            top={5}
            bottom={5}
            color={"#8A8A8E"}
          >
            {moment(item.created).format("HH:mm")}
          </Text>
        </View>
      </Column>
      {!isExist && !isMyMessage && renderDownloadIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  time: {
    textAlign: "right",
  },
});
