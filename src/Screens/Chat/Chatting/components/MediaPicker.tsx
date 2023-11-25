import BottomSheet from "@Components/BottomSheet";
import { uploadModule } from "@Redux/Action/BookingAction";
import React, { useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { delay } from "src/utils/common";
import DialogConfirmInput from "@Components/Dialog/ConfirmTextInput";
import useVisible from "src/Hooks/useVisible";
import { LoadingModal } from "@Components/Loading/LoadingView";
import withPortal from "@Components/withPortal";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  visible: boolean;
  onClose: () => void;
  onMessage: (message: any) => void;
};

function MediaPicker({ visible, onClose, onMessage }: Props) {
  const listVideoForUpload = useRef<any[]>([]);
  const confirmVideo = useVisible();
  const uploading = useVisible();

  const openCamera = useCallback(() => {
    ImageCropPicker.openCamera({
      // width: _moderateScale(160 * 10),
      // height: _moderateScale(160 * 10),
      // cropping: true,
      mediaType: "photo",
      compressImageQuality: 0.5,
    })
      .then(async (images) => {
        let listImages = [images].map((i, index) => {
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            type: i.mime,
            name: `${i.modificationDate}_${index}`,
          };
        });
        let resultUploadImageMessage = await uploadModule({
          moduleName: "chatMessage",
          files: listImages,
        });
        if (resultUploadImageMessage.isAxiosError) return;

        let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(
          (item) => item._id
        );
        onMessage({
          type: "image",
          images: listIdImageHasUpload,
        });
      })
      .catch((e) => {});
  }, [onMessage]);

  const pickImages = useCallback(async () => {
    await delay(500);
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 6,
      mediaType: "photo",
      // cropping:true,
      compressImageQuality: 0.5,
      compressImageMaxWidth: 700,
      // compressVideoPreset:'LowQuality'
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
        let resultUploadImageMessage = await uploadModule({
          moduleName: "chatMessage",
          files: listImages,
        });

        if (resultUploadImageMessage.isAxiosError) return;
        let listIdImageHasUpload = resultUploadImageMessage?.data?.data.map(
          (item) => item._id
        );
        onMessage({
          type: "image",
          images: listIdImageHasUpload,
        });
      })
      .catch((e) => {});
  }, []);

  const pickVideo = useCallback(async () => {
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 1,
      mediaType: "video",
      // cropping:true,
      compressImageQuality: 0.5,
      compressVideoPreset: "MediumQuality",
    })
      .then(async (images) => {
        listVideoForUpload.current = images;
        confirmVideo.show();
      })
      .catch((e) => {});
  }, []);

  const handleConfirmVideo = useCallback(
    async (textInput) => {
      uploading.show();

      let listImages = listVideoForUpload.current.map((i, index) => {
        if (index > 0) return;
        return {
          uri: i.path,
          width: i.width,
          height: i.height,
          mime: i.mime,
          type: i.mime,
          name: textInput,
        };
      });
      let resultUploadImageMessage = await uploadModule({
        moduleName: "chatMessage",
        files: listImages,
      });
      if (resultUploadImageMessage.isAxiosError) return;

      let listIdImageHasUpload = resultUploadImageMessage?.data?.data?.map(
        (item) => item._id
      );
      onMessage({
        type: "video",
        videos: listIdImageHasUpload,
      });
      uploading.hide();
    },
    [onMessage]
  );

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <BottomSheet.MenuItem title="Mở Camera" center onPress={openCamera} />
      <BottomSheet.MenuItem
        title="Chọn Video từ thư viện"
        center
        onPress={pickVideo}
      />
      <BottomSheet.MenuItem
        title="Chọn ảnh từ thư viện"
        center
        onPress={pickImages}
      />
      <BottomSheet.MenuItem title="Hủy" center type="negative" />

      <DialogConfirmInput
        title={"Tải Video"}
        message={"Nhập tên hiển thị Video \n vào bên dưới"}
        handleCancel={confirmVideo.hide}
        handleConfirm={handleConfirmVideo}
        visible={confirmVideo.visible}
      />
      <LoadingModal visible={uploading.visible} message="Đang gửi Video..." />
    </BottomSheet>
  );
}

export default withPortal(MediaPicker);
