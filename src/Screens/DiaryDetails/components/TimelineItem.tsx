import Column from "@Components/Column";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, BLACK, BORDER_COLOR, RED, WHITE } from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import { uploadModule } from "@Redux/Action/BookingAction";
import ModalEditDescriptionDailyDiary from "@Screens/CreateNewFeed/Component/ModalEditDescriptionDailyDiary";
import { FileAvatar } from "@typings/common";
import { DailyDiary } from "@typings/diary";
import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import EnhancedImageViewing from "react-native-image-viewing";
import useVisible from "src/Hooks/useVisible";
import { ImageIcon } from "src/SGV";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  item: DailyDiary;
  isFirst?: boolean;
  onItemUpdate?: (item: Partial<DailyDiary>) => void;
};

export default function TimelineItem({ item, isFirst, onItemUpdate }: Props) {
  const inputPopup = useVisible();
  const imageViewer = useVisible<number>();

  const viewableImages = useMemo(() => {
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

  const handleConfirmDescription = useCallback(
    (_id: string, description: string) => {
      onItemUpdate({ _id, description });
    },
    []
  );

  const handleAddImage = useCallback(async () => {
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 6,
      mediaType: "photo",
      compressImageQuality: 0.5,
      compressImageMaxWidth: 700,
    })
      .then(async (images) => {
        let listImages = images.map((i, index) => {
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            type: i.mime,
            name: `${i.modificationDate}_${index}`,
          };
        });
        console.log({ listImages });
        let resultUploadImage = await uploadModule({
          moduleName: "partnerDiary",
          files: listImages,
        });
        if (resultUploadImage?.isAxiosError) return;

        let listIdImageHasUpload = resultUploadImage?.data?.data?.map(
          (item) => item?._id
        );
        onItemUpdate({
          _id: item?._id,
          // @ts-ignore
          images: item.images
            .map((i) => {
              return i._id;
            })
            .concat(listIdImageHasUpload),
        });
      })
      .catch((e) => { });
  }, [item, onItemUpdate]);

  const _handleDeleteImageDailyDiary = useCallback(
    (index: number) => () => {
      onItemUpdate({
        _id: item?._id,
        // @ts-ignore
        images: item.images
          .map((i) => {
            return i._id;
          })
          .filter((i, idx) => idx !== index),
      });
    },
    [item, onItemUpdate]
  );

  function renderImage(image: FileAvatar, index: number) {
    return (
      <Column key={image._id} width={80} height={88} paddingTop={8}>
        <Pressable onPress={handleImagePress(index)} style={styles.image}>
          <Image avatar={image} style={styleElement.flex} />
        </Pressable>
        {!item.isSyncingTreatment && (
          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={_handleDeleteImageDailyDiary(index)}
            style={styles.removeButton}
          >
            <Column width={8} height={2} backgroundColor={WHITE} />
          </TouchableOpacity>
        )}
      </Column>
    );
  }

  return (
    <Row gap={10} alignItems="stretch">
      <Column width={10} alignItems="center">
        <Column
          width={1}
          backgroundColor={isFirst ? "white" : BORDER_COLOR}
          height={7}
        />
        <Column
          width={7}
          height={7}
          borderRadius={4}
          backgroundColor={BASE_COLOR}
        />
        <Column width={1} backgroundColor={BORDER_COLOR} flex={1} />
      </Column>
      <Column paddingBottom={15} gap={10} flex={1}>
        <Text color={BLACK}>{moment(item.date).format("DD/MM/YYYY")}</Text>
        <Column
          borderWidth={1}
          borderColor={BORDER_COLOR}
          borderRadius={5}
          paddingHorizontal={8}
          height={30}
          justifyContent="center"
          onPress={item.isSyncingTreatment ? undefined : inputPopup.show}
        >
          <Text fontStyle={item.description ? "normal" : "italic"}>
            {item?.description
              ? item?.description
              : !item.isSyncingTreatment
                ? "Chạm để thêm nội dung"
                : ""}
          </Text>
        </Column>
        <Row gap={8} flexWrap="wrap" alignItems="flex-end">
          {item.images.map(renderImage)}
          {!item.isSyncingTreatment && (
            <Column
              justifyContent="center"
              alignItems="center"
              width={80}
              height={80}
              borderWidth={1}
              borderColor={BORDER_COLOR}
              borderRadius={5}
              borderStyle="dashed"
              onPress={handleAddImage}
            >
              <ImageIcon color={"#D9D9D9"} width={30} height={30} />
            </Column>
          )}
        </Row>
      </Column>

      <ModalEditDescriptionDailyDiary
        confirmEditDescription={handleConfirmDescription}
        hide={inputPopup.hide}
        data={item}
        show={inputPopup.visible}
      />
      <EnhancedImageViewing
        images={viewableImages}
        onRequestClose={imageViewer.hide}
        imageIndex={imageViewer.selectedItem.current}
        visible={imageViewer.visible}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  removeButton: {
    position: "absolute",
    right: -4,
    top: 0,
    width: 15,
    aspectRatio: 1,
    backgroundColor: RED,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    overflow: "hidden",
    borderRadius: 5,
    flex: 1,
  },
});
