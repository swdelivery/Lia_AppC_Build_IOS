import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { FileUpload } from "@typings/common";
import { getImageAvataUrl } from "src/utils/avatar";
import useVisible from "src/Hooks/useVisible";
import Row from "@Components/Row";
import { Diamond1Icon } from "src/SGV";

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
      <Diamond1Icon width={10} height={10} />
      <Text color={"#F8E6D0"} weight="bold" size={10} left={4} bottom={2}>
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

export function Certificates({
  data,
  scrollEnabled = false,
}: {
  data: FileUpload[];
  scrollEnabled?: boolean;
}) {
  function renderContent() {
    return data.map((item, idx) => {
      return (
        <Certificate
          item={item}
          key={item._id}
          backgroundColor={idx % 2 === 0 ? "#414378" : "#151617"}
        />
      );
    });
  }

  console.log({ scrollEnabled });

  if (scrollEnabled) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontal}
      >
        {renderContent()}
      </ScrollView>
    );
  }

  return (
    <Row flexWrap="wrap" gap={4} top={4}>
      {renderContent()}
    </Row>
  );
}

export default Certificate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
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
  horizontal: {
    gap: 4,
    paddingTop: 4,
  },
});
