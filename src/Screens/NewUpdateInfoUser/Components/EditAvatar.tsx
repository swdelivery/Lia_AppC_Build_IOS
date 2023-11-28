import Avatar from '@Components/Avatar'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale } from '@Constant/Scale'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from "react-native-image-crop-picker";
import { isEmpty } from 'lodash'
import { uploadModule } from '@Redux/Action/BookingAction'
import { updateProfilePartner } from '@Redux/Action/ProfileAction'
import ImageView from "react-native-image-viewing";
import { URL_ORIGINAL } from '@Constant/Url'
import useVisible from 'src/Hooks/useVisible'

const EditAvatar = () => {

  const infoUser = useSelector(state => state?.infoUserReducer?.infoUser)
  const dispatch = useDispatch();

  const imageViewing = useVisible();


  const _handlePickAvatar = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      multiple: false,
      mediaType: "photo",
      compressImageQuality: 1,
    }).then(async (image) => {
      console.log({ image });
      let newImage = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
        type: image.mime,
        name: `${image.modificationDate}_${0}`,
        isLocal: true,
      };

      if (!isEmpty(newImage)) {
        let listImages = [newImage];
        let resultUploadImage = await uploadModule({
          moduleName: "partner",
          files: listImages,
        });
        if (resultUploadImage.isAxiosError) return;
        let listIdImageHasUpload = resultUploadImage?.data?.data.map(
          (item) => item._id
        );
        dispatch(updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] }));
      }

    });
  };

  return (
    <>
      <ImageView
        images={[
          `${URL_ORIGINAL}${infoUser?.fileAvatar?.link}`,
        ].map((item) => {
          return {
            uri: item,
          };
        })}
        onRequestClose={imageViewing.hide}
        imageIndex={0}
        visible={imageViewing.visible}
      />
      <TouchableOpacity
        onPress={imageViewing.show}
        style={styles.container}>
        <Avatar
          circle
          avatar={infoUser?.fileAvatar}
          size={8 * 10} />
        <TouchableOpacity
          onPress={_handlePickAvatar}
          style={styles.camera}>
          <Image
            style={[sizeIcon.xs]}
            source={require('../../../Icon/camera_blue.png')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  )
}

export default EditAvatar

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: -8,
    width: _moderateScale(8 * 3.5),
    height: _moderateScale(8 * 3.5),
    borderRadius: _moderateScale(8 * 3.5 / 2),
    borderWidth: 2,
    borderColor: BASE_COLOR,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    alignSelf: 'center',
    margin: 8 * 3
  }
})
