import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import Screen from '@Components/Screen'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { IconCancelGrey } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import { useNavigate } from 'src/Hooks/useNavigation'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import Column from '@Components/Column'
import { styleElement } from '@Constant/StyleElement'
import { getBookingDataForPartner } from '@Redux/Action/BookingAction'
import { isEmpty } from 'lodash'
import { BORDER_COLOR } from '@Constant/Color'
import Image from '@Components/Image'
import Toggle from '@Components/Toggle/Toggle'

const maskRowHeight = 100
const maskColWidth = 500;

const NewQRCode = () => {
  const { navigation } = useNavigate()
  const device = useCameraDevice("back");

  const [scanningSuccess, setScanningSuccess] = useState(false)
  const [currDataBooking, setCurrDataBooking] = useState({
    show: false,
    data: []
  })

  const [choiceBooking, setChoiceBooking] = useState(null)

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
              // let resultCreateCheckinBookingForPartner = await createCheckinBookingForPartner({
              //   branchCode: obj?.branchCode
              // })
              // if (resultCreateCheckinBookingForPartner?.isAxiosError) return
              // navigation.goBack()
              // navigation.navigate(ScreenKey.LIST_BOOKING)
            }
          }
        ],
        { cancelable: false }
      );
    }
  }


  const ItemBooking = ({ data }) => {
    const { services } = data

    const _handlePress = useCallback(() => {
      setChoiceBooking(data)
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
          <Column flex={1}>
            <Text style={styleElement.flex}>
              {services[0]?.service?.name}
            </Text>
          </Column>
          <Toggle
            onPress={_handlePress}
            isActive={isActive} />
        </Row>
      </Row>
    )
  }

  return (
    <Screen safeTop>
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