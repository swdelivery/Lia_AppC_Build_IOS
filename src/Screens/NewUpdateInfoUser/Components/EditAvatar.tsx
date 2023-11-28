import Avatar from '@Components/Avatar'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale } from '@Constant/Scale'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

const EditAvatar = () => {

  const infoUser = useSelector(state => state?.infoUserReducer?.infoUser)

  return (
    <View style={styles.container}>
      <Avatar
        circle
        avatar={infoUser?.fileAvatar}
        size={8 * 10} />
      <TouchableOpacity style={styles.camera}>
        <Image
          style={[sizeIcon.xs]}
          source={require('../../../Icon/camera_blue.png')}
        />
      </TouchableOpacity>
    </View>
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
