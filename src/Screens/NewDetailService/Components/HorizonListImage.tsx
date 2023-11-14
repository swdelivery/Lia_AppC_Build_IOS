import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { _width } from "../../../Constant/Scale";
import useItemExtractor from "../../../Hooks/useItemExtractor";
import { Service } from "@typings/serviceGroup";
import Image from "@Components/Image";
import { FileAvatar } from "@typings/common";

const HEIGHT_IMAGE_SERVICE = (_width * 926) / 1242;

type Props = {
  service: Service;
};

const HorizonListImage = ({ service }: Props) => {
  const _renderItem = ({ item, index }) => {
    return <Image style={styles.image} avatar={item} />;
  };

  const { keyExtractor } = useItemExtractor<FileAvatar>((item) => item._id);

  return (
    <FlatList
      horizontal
      pagingEnabled
      renderItem={_renderItem}
      data={service?.representationFileArr}
      keyExtractor={keyExtractor}
    />
  );
};

export default HorizonListImage;

const styles = StyleSheet.create({
  image: {
    width: _width,
    height: HEIGHT_IMAGE_SERVICE,
  },
});
