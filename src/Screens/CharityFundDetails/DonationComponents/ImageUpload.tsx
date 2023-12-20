import Column from '@Components/Column'
import { IconUpload } from '@Components/Icon/Icon'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, RED } from '@Constant/Color'
import { selectImage } from '@Redux/charity/actions'
import { getDataCreateDonateState } from '@Redux/charity/selectors'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { useDispatch, useSelector } from 'react-redux'

const ImageUpload = () => {
  const dispatch = useDispatch()
  const { images } = useSelector(getDataCreateDonateState)

  const _handlePickImage = async () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
      compressImageMaxWidth: 700,
    }).then(async (image) => {
      dispatch(selectImage([image]))
    }).catch(e => { });
  }

  return (
    <Column
      gap={8}
      marginTop={8}
      alignItems='flex-start'
      margin={8 * 2}>
      <Text>
        Hình ảnh chuyển khoản <Text color={RED} weight='bold'>*</Text>
      </Text>
      {
        images?.length > 0 ?
          <TouchableOpacity
            onPress={_handlePickImage}>
            <Image
              style={{
                borderRadius: 4,
                width: 8 * 20,
                height: 8 * 20 * images[0]?.height / images[0]?.width,
              }}
              source={{ uri: `${images[0]?.path}` }} />
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={_handlePickImage}
            style={styles.btnAddImage}>
            <Column
              alignItems='center'
              gap={8}>
              <IconUpload />
              <Text
                size={14}
                color={GREY}>
                Tải hình ảnh lên
              </Text>
            </Column>
          </TouchableOpacity>
      }
    </Column>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 8 * 20,
    height: 8 * 32,
    borderRadius: 4,
  },
  btnAddImage: {
    width: 8 * 20,
    height: 8 * 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default ImageUpload

