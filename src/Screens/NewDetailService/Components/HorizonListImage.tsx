import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React, { useCallback, useEffect } from "react";
import { _width } from "../../../Constant/Scale";
import useItemExtractor from "../../../Hooks/useItemExtractor";
import Image from "@Components/Image";
import { FileAvatar } from "@typings/common";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import Carousel, {
  PaginationIndicator,
  withCarouselContext,
} from "@r0b0t3d/react-native-carousel";
import { getImageAvataUrl } from "src/utils/avatar";
import { BLUE, SECOND_COLOR } from "@Constant/Color";

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  images: FileAvatar[];
  getColors?: (url: string) => void;
};

const HorizonListImage = ({
  images = [],
  getColors,
  containerStyle,
}: Props) => {
  useEffect(() => {
    handlePageChange(0);
  }, []);

  const handlePageChange = useCallback(
    (index: number) => {
      if (images[index] && getColors) {
        const url = getImageAvataUrl(images[index]);
        getColors(url);
      }
    },
    [images, getColors]
  );

  const _renderItem = ({ item }) => {
    return <Image style={styles.image} avatar={item} />;
  };

  const { keyExtractor } = useItemExtractor<FileAvatar>((item) => item?._id);

  return (
    <View>
      <Carousel
        style={[styles.container, containerStyle]}
        renderItem={_renderItem}
        data={images}
        keyExtractor={keyExtractor}
        onPageChange={handlePageChange}
      />
      {images.length > 1 && (
        <PaginationIndicator
          containerStyle={styles.indicatorContainer}
          indicatorConfigs={{
            indicatorWidth: 8,
            indicatorColor: BLUE,
            indicatorSelectedColor: SECOND_COLOR,
            indicatorSelectedWidth: 18,
            spaceBetween: 4,
          }}
        />
      )}
    </View>
  );
};

export default withCarouselContext(HorizonListImage);

const styles = StyleSheet.create({
  container: {
    height: _width * SERVICE_BANNER_RATIO,
    width: _width,
  },
  image: {
    width: _width,
    height: _width * SERVICE_BANNER_RATIO,
  },
  indicatorContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
