import { ColorValue, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { FileUpload } from "@typings/common";
import { getImageAvataUrl } from "src/utils/avatar";
import useVisible from "src/Hooks/useVisible";
import Row from "@Components/Row";
import { Diamond1Icon } from "src/SGV";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "@Components/StatusBar";
import Column from "@Components/Column";
import IconButton from "@Components/IconButton";

type Props = {
  item: FileUpload;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  onPress?: () => void;
};

const Certificate = ({
  item,
  backgroundColor = "#414378",
  borderColor,
  onPress,
}: Props) => {
  const containerStyle = useMemo(() => {
    return {
      backgroundColor,
      borderColor: borderColor || backgroundColor,
      borderWidth: 1,
    };
  }, [backgroundColor]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Diamond1Icon width={10} height={10} />
      <Text color={"#F8E6D0"} weight="bold" size={10} left={4} bottom={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export function Certificates({
  data,
  scrollEnabled = true,
  borderColor,
}: {
  data: FileUpload[];
  scrollEnabled?: boolean;
  borderColor?: ColorValue;
}) {
  const imageViewer = useVisible<number>();
  const { top } = useSafeAreaInsets();

  const images = useMemo(() => {
    return data.map((item) => ({
      uri: getImageAvataUrl(item.fileUpload),
    }));
  }, [data]);

  const handleCertificatePress = useCallback(
    (idx: number) => () => {
      imageViewer.show(idx);
    },
    []
  );


  function renderContent() {
    return (
      <>
        {data.map((item, idx) => {
          return (
            <Certificate
              item={item}
              key={item.id ?? item._id}
              backgroundColor={idx % 2 === 0 ? "#414378" : "#151617"}
              borderColor={borderColor}
              onPress={handleCertificatePress(idx)}
            />
          );
        })}
        {imageViewer.visible && <StatusBar barStyle="light-content" />}
        <EnhancedImageViewing
          images={images}
          onRequestClose={imageViewer.hide}
          imageIndex={imageViewer.selectedItem.current}
          visible={imageViewer.visible}
          HeaderComponent={({ imageIndex }) => (
            <Row
              marginTop={top}
              justifyContent="center"
              height={45}
              marginHorizontal={16}
            >
              <Column flex={1} />
              <Text color={"white"}>{data[imageIndex].name}</Text>
              <Column flex={1} alignItems="flex-end">
                <IconButton>
                  <Icon name="close" color="white" onPress={imageViewer.hide} />
                </IconButton>
              </Column>
            </Row>
          )}
        />
      </>
    );
  }

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
