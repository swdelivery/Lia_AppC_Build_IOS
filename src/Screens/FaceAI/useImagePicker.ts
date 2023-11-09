import { useEffect } from "react";
import ImageCropPicker from "react-native-image-crop-picker";

export default function useImagePicker(callback: (path: string) => void) {
  useEffect(() => {
    ImageCropPicker.openPicker({
      width: 1024,
      height: 1024,
      cropping: false,
      multiple: false,
      mediaType: "photo",
      // compressImageQuality: 0.5
    }).then(async (image) => {
      callback(image.path);
    });
  }, []);
}
