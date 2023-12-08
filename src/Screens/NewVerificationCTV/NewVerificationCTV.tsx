import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import ActionSheetBottom from "@Components/ModalBottom/ActionSheetBottom"
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { RED } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import ScreenKey from '@Navigation/ScreenKey'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import ImagePicker from "react-native-image-crop-picker"
import { useNavigate } from 'src/Hooks/useNavigation'
import useVisible from 'src/Hooks/useVisible'

const NewVerificationCTV = () => {
  const { navigate } = useNavigate()
  const cameraPicker = useVisible();

  const [currChoiceCamera, setCurrChoiceCamera] = useState(null)
  const [frontCmnd, setFrontCmnd] = useState({})
  const [backCmnd, setBackCmnd] = useState({})

  useEffect(() => {
    if (currChoiceCamera) {
      cameraPicker.show()
    }
  }, [currChoiceCamera])

  const _handleConfirm = () => {
    if (isEmpty(frontCmnd) && isEmpty(backCmnd)) {
      return Alert.alert('Vui lòng cập nhật đầy đủ hình ảnh')
    }
    navigate(ScreenKey.UPDATE_PARTNER_INFO_BANK, { dataCmnd: { frontCmnd, backCmnd } })()
  }
  const _handleConfirmBottomSheet = (data) => {
    if (data?.type == "gallery") {
      pickGallery(currChoiceCamera)
    }
    if (data?.type == "camera") {
      pickCamera(currChoiceCamera)
    }
  }

  const pickCamera = (currChoiceCamera) => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
      width: 425,
      height: 260,
      multiple: false
    }).then(async (image) => {
      if (currChoiceCamera == 'front') {
        setFrontCmnd(image)
      }
      if (currChoiceCamera == 'back') {
        setBackCmnd(image)
      }
    }).catch(e => {
    });
  }
  const pickGallery = async (currChoiceCamera) => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.5,
      width: 425,
      height: 260
    }).then(async (image) => {
      if (currChoiceCamera == 'front') {
        setFrontCmnd(image)
      }
      if (currChoiceCamera == 'back') {
        setBackCmnd(image)
      }
    }).catch(e => {
    });
  }


  return (
    <Screen safeBottom>
      <LiAHeader
        safeTop
        title={"Xác thực danh tính"} />

      <ScrollView>
        <Column
          gap={8}
          alignSelf='center'
          margin={8 * 2}>
          <Text
            style={{ textAlign: 'center' }}
            size={14}
            weight='bold' >
            Chụp chứng minh nhân dân của bạn
          </Text>
          <Text
            style={{ textAlign: 'center' }}
            size={14}>
            Để bảo đảm sự an toàn của bạn và các thành viên khác trong cộng đồng, việc xác thực danh tính sẽ giúp bạn trở nên tin cậy hơn.
          </Text>
          <Text
            style={{ textAlign: 'center' }}
            size={14}>
            Đừng lo lắng, chúng tôi không tiết lộ thông tin của bạn với bất kì ai
          </Text>
        </Column>

        <Column gap={8 * 3}>
          <Column
            gap={8}
            alignItems='center'>
            <TouchableOpacity onPress={() => {
              setCurrChoiceCamera('front')
            }}>
              {
                frontCmnd?.path ?
                  <Image
                    style={styles.imageCMND}
                    source={{ uri: `${frontCmnd?.path}` }} />
                  :
                  <Image
                    style={styles.imageCMND}
                    source={require('../../NewIcon/frontCmnd.png')} />
              }
              <Image
                style={styles.iconCamera}
                source={require('../../NewIcon/cam.png')} />
            </TouchableOpacity>
            <Text>
              Mặt trước
            </Text>
          </Column>
          <Column
            gap={8}
            alignItems='center'>
            <TouchableOpacity onPress={() => {
              setCurrChoiceCamera('back')
            }}>
              {
                backCmnd?.path ?
                  <Image
                    style={styles.imageCMND}
                    source={{ uri: `${backCmnd?.path}` }} />
                  :
                  <Image
                    style={styles.imageCMND}
                    source={require('../../NewIcon/backCmnd.png')} />
              }
              <Image
                style={styles.iconCamera}
                source={require('../../NewIcon/cam.png')} />
            </TouchableOpacity>
            <Text>
              Mặt sau
            </Text>
          </Column>
        </Column>

        <Column
          gap={8}
          alignSelf='center'
          margin={8 * 2}>
          <Text
            color={RED}
            style={{ textAlign: 'center' }}
            size={14}>
            *Bạn cần hình ảnh chứng thực của cả mặt trước và sau của chứng minh nhân dân
          </Text>
        </Column>
      </ScrollView>
      <ActionButton
        onPress={_handleConfirm}
        title='Xác nhận' />
      <ActionSheetBottom
        onConfirm={_handleConfirmBottomSheet}
        indexRed={2}
        options={[
          { name: "Mở camera", type: "camera" },
          { name: "Chọn ảnh từ thư viện", type: "gallery" },
          { name: "Đóng", type: "cancel" },
        ]}
        onClose={() => {
          setCurrChoiceCamera(null)
          cameraPicker.hide()
        }}
        visible={cameraPicker?.visible}
      />
    </Screen>
  )
}


export default NewVerificationCTV

const styles = StyleSheet.create({
  iconCamera: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -_moderateScale(8 * 2),
    right: -_moderateScale(8 * 2)
  },
  imageCMND: {
    width: _moderateScale(8 * 25),
    height: _moderateScale(8 * 17),
    resizeMode: 'contain',
    borderRadius: 8
  }
})
