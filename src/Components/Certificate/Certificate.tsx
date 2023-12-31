import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { FileUpload } from "@typings/common";
import { getImageAvataUrl } from "src/utils/avatar";
import useVisible from "src/Hooks/useVisible";

type Props = {
  item: FileUpload;
  backgroundColor?: string;
};

const Certificate = ({ item, backgroundColor = "#414378" }: Props) => {
  const imageViewer = useVisible();

  const containerStyle = useMemo(() => {
    return {
      backgroundColor,
    };
  }, [backgroundColor]);

  const images = useMemo(() => {
    return [
      {
        uri: getImageAvataUrl(item.fileUpload),
      },
    ];
  }, [item]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={imageViewer.show}
    >
      <Icon name="diamond" color="#F8E6D0" size={12} style={styles.icon} />
      <Text color={"#F8E6D0"} weight="bold" size={10} left={4}>
        {item.name}
      </Text>

      <EnhancedImageViewing
        images={images}
        onRequestClose={imageViewer.hide}
        imageIndex={0}
        visible={imageViewer.visible}
      />
    </TouchableOpacity>
  );
};

export default Certificate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 8 * 1.5,
    height: 8 * 1.5,
    resizeMode: "contain",
    marginRight: 4,
  },
  icon: {
    marginBottom: -2,
  },
  larger: {
    width: 8 * 2,
    height: 8 * 2,
    resizeMode: "contain",
  },
});
