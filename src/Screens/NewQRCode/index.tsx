import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Screen from '@Components/Screen'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { IconCancelGrey } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import { useNavigate } from 'src/Hooks/useNavigation'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import Column from '@Components/Column'
import { styleElement } from '@Constant/StyleElement'
import { createCheckinBookingForPartner, getBookingDataForPartner } from '@Redux/Action/BookingAction'
import { isEmpty } from 'lodash'
import { BORDER_COLOR } from '@Constant/Color'
import Image from '@Components/Image'
import Toggle from '@Components/Toggle/Toggle'
import moment from 'moment'
import ActionButton from '@Components/ActionButton/ActionButton'
import ScreenKey from '@Navigation/ScreenKey'
import { useDispatch } from 'react-redux'
import { selectBookingForCheckin } from '@Redux/qrCheckin/actions'
import useConfirmation from 'src/Hooks/useConfirmation'
import { Linking } from 'react-native'

const maskRowHeight = 100
const maskColWidth = 500;

const NewQRCode = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { showConfirmation } = useConfirmation();
  const dispatch = useDispatch()
  const { navigation } = useNavigate()
  const device = useCameraDevice("back");

  const [scanningSuccess, setScanningSuccess] = useState(false)
  const [currDataBooking, setCurrDataBooking] = useState({
    show: false,
    data: []
  })
  const [choiceBooking, setChoiceBooking] = useState(null)

  //ASK PERMISSION CAMERA
  useEffect(() => {
    _checkPermission();
  }, []);

  const _checkPermission = async () => {
    let isEnablePerCamera = hasPermission;
    if (!isEnablePerCamera) {
      let result = await requestPermission();
      if (!result) {
        showConfirmation(
          "Cấp quyền truy cập",
          "Hãy bật quyền truy cập máy ảnh để sử dụng chức năng này nhé?",
          async () => {
            await Linking.openSettings();
          }
        );
      }
    }
  };

  const parseMyJson = (data) => {
    try {
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log({ codes })
      if (codes?.length > 0) {
        setScanningSuccess(true)
        let objParsed = parseMyJson(codes[0]?.value);
        console.log({ objParsed });
        if (objParsed?.action == 'checkin') {
          _handleOpenModalListBooking(objParsed)
        }
      }
    }
  })

  const _handleOpenModalListBooking = async (obj) => {
    console.log({ obj });
    let resultGetBookingDataForPartner = await getBookingDataForPartner(
      {
        condition: {
          branchCode: {
            in: [obj?.branchCode]
          },
          status: {
            in: ['WAIT']
          }
        },
        limit: 100,
        sort: {
          "appointmentDateFinal.from.dateTime": 1
        }
      },
    )
    if (resultGetBookingDataForPartner?.isAxiosError) return

    if (resultGetBookingDataForPartner?.data?.data?.length > 0) {
      setCurrDataBooking(old => {
        return {
          ...old,
          show: true,
          data: resultGetBookingDataForPartner?.data?.data
        }
      })
    }

    if (isEmpty(resultGetBookingDataForPartner?.data?.data)) {
      return Alert.alert(
        "Danh sách booking trống",
        "Xác nhận tạo Booking tự động và checkin?",
        [
          {
            text: "Huỷ",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Đồng ý", onPress: async () => {
              let resultCreateCheckinBookingForPartner = await createCheckinBookingForPartner({
                branchCode: obj?.branchCode
              })
              if (resultCreateCheckinBookingForPartner?.isAxiosError) return
              navigation.goBack()
              navigation.navigate(ScreenKey.LIST_BOOKING)()
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  const _handleConfirm = useCallback(() => {
    dispatch(selectBookingForCheckin(choiceBooking))
    navigation.navigate(ScreenKey.PICK_UTILITIES)
  }, [choiceBooking])


  const ItemBooking = ({ data }) => {
    const { services } = data

    const _handlePress = useCallback(() => {
      if (choiceBooking?._id == data?._id) {
        setChoiceBooking(null)
      } else {
        setChoiceBooking(data)
      }
    }, [])

    const isActive = useMemo(() => {
      if (choiceBooking?._id == data?._id) {
        return true
      } else {
        return false
      }
    }, [data, choiceBooking])

    return (
      <Row
        padding={8 * 2}
        borderWidth={1}
        borderColor={BORDER_COLOR}
        borderRadius={8}
        margin={8 * 2}>
        <Row gap={8}>
          <Image
            style={styles.avatarService}
            avatar={services[0]?.service?.representationFileArr[0]} />
          <Column
            gap={8}
            flex={1}>
            <Text
              size={12}
              numberOfLines={2}>
              {services[0]?.service?.name}
            </Text>
            <Row>
              <Text size={12}>
                {moment(data?.appointmentDateFinal?.date).format('DD/MM/YYYY')}
              </Text>
              <Text>-</Text>
              <Text size={12}>
                {moment(data?.appointmentDateFinal?.from?.dateTime).format('HH:mm')}
              </Text>
            </Row>
          </Column>
          <Toggle
            onPress={_handlePress}
            isActive={isActive} />
        </Row>
      </Row>
    )
  }

  return (
    <Screen
      safeBottom
      safeTop>
      <FocusAwareStatusBar barStyle='dark-content' />
      <Row
        marginVertical={8 * 2}
        justifyContent='center'>
        <Text
          weight='bold'
          size={16}>
          QR Code
        </Text>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.cancelBtn}>
          <IconCancelGrey style={sizeIcon.md} />
        </TouchableOpacity>
      </Row>
      {
        scanningSuccess ?
          <Column flex={1}>
            <ScrollView>
              <Text
                weight='bold'
                margin={8 * 2}>
                Danh sách booking
              </Text>
              {
                currDataBooking?.data?.map((_i, idx) => {
                  return (
                    <ItemBooking data={_i} key={_i?._id} />
                  )
                })
              }
            </ScrollView>
            <ActionButton
              onPress={_handleConfirm}
              colors={["#34759b", "#1a3e67"]}
              disabled={!choiceBooking?._id}
              title='Check in Booking' />
          </Column>
          :
          <Column flex={1}>
            <Camera
              isActive={!scanningSuccess}
              style={styleElement.flex}
              device={device}
              codeScanner={codeScanner} />
            <View style={styles.maskOutter}>
              <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
              <View style={[{ flex: 400 }, styles.maskCenter]}>
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                <View style={styles.maskInner} />
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              </View>
              <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
            </View>
          </Column>
      }
    </Screen>
  )
}


export default NewQRCode

const styles = StyleSheet.create({
  avatarService: {
    width: 8 * 14,
    height: 8 * 14 * 9 / 16,
    borderRadius: 8
  },
  cancelBtn: {
    position: 'absolute',
    right: 8 * 4
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
})
