import Image from "@Components/Image";
import { _moderateScale, _widthScale } from "@Constant/Scale";
import { Message } from "@typings/chat";
import { FileAvatar } from "@typings/common";
import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import useVisible from "src/Hooks/useVisible";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  item: Message;
};

export default function ImageMessage({ item }: Props) {
  const imageViewer = useVisible<number>();

  const images = useMemo(() => {
    return item.images.map((item) => {
      return {
        uri: getImageAvataUrl(item),
      };
    });
  }, [item]);

  const handleImagePress = useCallback(
    (index: number) => () => {
      imageViewer.show(index);
    },
    []
  );

  const multipleImagesContainer = useMemo(() => {
    return {
      width:
        item?.images?.length > 3
          ? _widthScale(250) / 3
          : _widthScale(250) / item.images.length,
      height:
        item?.images?.length > 3
          ? _widthScale(230) / 3
          : _widthScale(230) / item.images.length,
      borderWidth: _moderateScale(1),
      borderColor: "#fff",
    };
  }, [item]);

  return (
    <>
      {item?.images?.length === 1 && (
        <>
          <TouchableOpacity
            onPress={handleImagePress(0)}
            // onPress={() => {
            //   props.setListImagesSeeCurr(item?.images, 0);
            //   // setShowListImagesSee(true)
            // }}
            // onLongPress={() => {
            //     props?.setCurrMessageForRemove(item)
            //     props?.setIsShowModalRemoveMessage(true)
            // }}
            activeOpacity={0.8}
            style={styles.imageSingle}
          >
            <Image auto style={styles.imageSingle} avatar={item.images[0]} />
          </TouchableOpacity>
        </>
      )}
      {item?.images?.length > 1 &&
        item?.images?.map((itemChild, index) => {
          return (
            <>
              <TouchableOpacity
                // onLongPress={() => {
                //     props?.setCurrMessageForRemove(item)
                //     props?.setIsShowModalRemoveMessage(true)
                // }}
                onPress={handleImagePress(index)}
                key={itemChild._id}
                activeOpacity={0.8}
                style={multipleImagesContainer}
              >
                <Image style={styles.image} avatar={itemChild} />
              </TouchableOpacity>
            </>
          );
        })}

      <EnhancedImageViewing
        images={images}
        onRequestClose={imageViewer.hide}
        imageIndex={imageViewer.selectedItem.current}
        visible={imageViewer.visible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageSingle: {
    width: _widthScale(250),
    borderRadius: 5,
  },
  image: { width: "100%", height: "100%" },
});
