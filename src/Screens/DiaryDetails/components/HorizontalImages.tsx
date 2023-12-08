import Column from "@Components/Column";
import Image from "@Components/Image";
import Text from "@Components/Text";
import { FileAvatar } from "@typings/common";
import React, { useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import useVisible from "src/Hooks/useVisible";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  title: string;
  images: FileAvatar[];
};

export default function HorizontalImages({ title, images = [] }: Props) {
  const imageViewer = useVisible<number>();

  const viewableImages = useMemo(() => {
    return images.map((item) => {
      return {
        uri: getImageAvataUrl(item),
      };
    });
  }, [images]);

  const handleImagePress = useCallback(
    (index: number) => () => {
      imageViewer.show(index);
    },
    []
  );

  function renderItem(item: FileAvatar, index: number) {
    return (
      <Pressable key={item._id} onPress={handleImagePress(index)}>
        <Image avatar={item} style={styles.image} />
      </Pressable>
    );
  }

  return (
    <Column marginTop={15} gap={15}>
      <Text left={25}>{title}</Text>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {images.map(renderItem)}
      </ScrollView>

      <EnhancedImageViewing
        images={viewableImages}
        onRequestClose={imageViewer.hide}
        imageIndex={imageViewer.selectedItem.current}
        visible={imageViewer.visible}
      />
    </Column>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 5,
  },
});
