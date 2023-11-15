import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import { _width } from "../../../Constant/Scale";
import useItemExtractor from "../../../Hooks/useItemExtractor";
import { Service } from "@typings/serviceGroup";
import Image from "@Components/Image";
import { FileAvatar } from "@typings/common";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import Carousel, { withCarouselContext } from "@r0b0t3d/react-native-carousel";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  service: Service;
  getColors: (url: string) => void;
};

const HorizonListImage = ({ service, getColors }: Props) => {
  const data = useMemo(() => {
    return service?.representationFileArr || [];
  }, [service]);

  useEffect(() => {
    handlePageChange(0);
  }, []);

  const handlePageChange = useCallback(
    (index: number) => {
      if (data[index]) {
        const url = getImageAvataUrl(data[index]);
        getColors(url);
      }
    },
    [data, getColors]
  );

  const _renderItem = ({ item }) => {
    return <Image style={styles.image} avatar={item} />;
  };

  const { keyExtractor } = useItemExtractor<FileAvatar>((item) => item._id);

  return (
    <Carousel
      style={styles.container}
      renderItem={_renderItem}
      data={data}
      keyExtractor={keyExtractor}
      onPageChange={handlePageChange}
    />
  );
};

export default withCarouselContext(HorizonListImage);

const styles = StyleSheet.create({
  container: {},
  image: {
    width: _width,
    height: _width * SERVICE_BANNER_RATIO,
  },
});
