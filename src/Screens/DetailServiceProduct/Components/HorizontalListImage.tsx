import { FlatList, StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { _width } from "@Constant/Scale";
import { FileAvatar } from "@typings/common";
import Image from "@Components/Image";

type Props = {
  images: FileAvatar[];
};

const HorizontalListImage = memo(({ images }: Props) => {
  const _renderItemImage = ({ item, index }) => {
    return <Image resizeMode="cover" style={styles.image} avatar={item} />;
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled={true}
        data={images}
        renderItem={_renderItemImage}
      />
    </View>
  );
});

export default HorizontalListImage;

const styles = StyleSheet.create({
  image: {
    width: _width,
    height: _width / 2,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.3)",
  },
});
