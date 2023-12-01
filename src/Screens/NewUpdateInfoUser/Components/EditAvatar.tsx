import Avatar from '@Components/Avatar'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale } from '@Constant/Scale'
import { URL_ORIGINAL } from '@Constant/Url'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import ImageView from "react-native-image-viewing"
import { useSelector } from 'react-redux'
import useVisible from 'src/Hooks/useVisible'

const EditAvatar = ({ cameraPicker }) => {

  const infoUser = useSelector(state => state?.infoUserReducer?.infoUser)

  const imageViewing = useVisible();


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
          onPress={cameraPicker.show}
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
