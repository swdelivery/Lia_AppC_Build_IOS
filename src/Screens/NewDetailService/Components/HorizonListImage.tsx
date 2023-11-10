import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { _width } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";
import { useSelector } from "react-redux";
import { getServiceDetailsState } from "@Redux/service/selectors";
import { URL_ORIGINAL } from "@Constant/Url";
import useItemExtractor from "../../../Hooks/useItemExtractor";

const HEIGHT_IMAGE_SERVICE = (_width * 926) / 1242;

const HorizonListImage = () => {

  const { data } = useSelector(getServiceDetailsState);

  const _renderItem = ({item, index}) => {
    return (
      <FastImage
        style={{
          width: _width,
          height: HEIGHT_IMAGE_SERVICE,
        }}
        source={{
          uri: `${URL_ORIGINAL}${item?.link}`
        }}
      />
    )
  }

  const { keyExtractor } = useItemExtractor((item) => item._id);

  return (
    <FlatList
      horizontal
      pagingEnabled
      renderItem={_renderItem}
      data={data?.representationFileArr}
      keyExtractor={keyExtractor}
    />
  );
};

export default HorizonListImage;

const styles = StyleSheet.create({});
