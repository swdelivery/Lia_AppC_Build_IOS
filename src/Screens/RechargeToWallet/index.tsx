import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconCopy, IconUpload } from '@Components/Icon/Icon'
import ModalFlashMsg from '@Components/ModalFlashMsg/ModalFlashMsg'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { BASE_COLOR, BORDER_COLOR, GREY, PRICE_ORANGE, RED } from '@Constant/Color'
import { stylesFont } from "@Constant/Font"
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale } from '@Constant/Scale'
import { createPaymentRequest, uploadModule } from '@Redux/Action/BookingAction'
import Clipboard from '@react-native-community/clipboard'
import { isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import useConfirmation from 'src/Hooks/useConfirmation'
import { useNavigate } from 'src/Hooks/useNavigation'

const RechargeToWallet = () => {
  const { navigation } = useNavigate()

  const { showConfirmation } = useConfirmation();

  const [valueMoney, setValueMoney] = useState('')
  const [valueDescription, setValueDescription] = useState('')
  const [listImageBanking, setListImageBanking] = useState([])
  const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)

  useEffect(() => {
    _getconfigfile()
  }, [])

  const _getconfigfile = async () => {

  }

  const _handleOnchangeText = (value) => {
    setValueMoney(value.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }

  const _handleConfirm = async () => {
    showConfirmation(
      "Xác nhận",
      `Xác nhận gửi yêu cầu nạp ${valueMoney} VNĐ vào ví?`,
      async () => {
        let listImages = listImageBanking.map((i, index) => {
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            type: i.mime,
            name: `${i.modificationDate}_${index}`
          };
        })

        let resultUploadImage = await uploadModule({
          moduleName: 'paymentRequest',
          files: listImages
        })
        if (resultUploadImage.isAxiosError) return

        let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);
        let dataFetchCreatePaymentRequest = {
          paymentFor: "WALLET",
          amount: Number(valueMoney?.split('.')?.join('')),
          isRefund: false,
          methodCode: "CARDTRANSFER",
          currencyCode: "VND",
          description: valueDescription,
          images: listIdImageHasUpload
        }
        let resultCreatePaymentRequest = await createPaymentRequest(dataFetchCreatePaymentRequest);
        if (resultCreatePaymentRequest?.isAxiosError) return;
        navigation.goBack()
      }
    );
  }

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
      setListImageBanking([image])
    }).catch(e => { });
  }

  const isDisabled = useMemo(() => {
    if (!isEmpty(valueMoney) && !isEmpty(listImageBanking)) {
      return false;
    } else {
      return true;
    }
  }, [valueMoney, listImageBanking]);

  return (
    <Screen safeBottom>
      <LiAHeader safeTop title={"Yêu cầu nạp tiền"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Column
            gap={8}
            margin={8 * 2}>
            <Column
              gap={8}>
              <Text
                color={BASE_COLOR}
                weight='regular'>
                Ngân hàng:
              </Text>
              <Text
                weight='bold'>
                ACB
              </Text>
            </Column>
            <Column
              gap={8}>
              <Text
                color={BASE_COLOR}
                weight='regular'>
                Số tài khoản:
              </Text>
              <Row gap={8 * 2}>
                <Text
                  weight='bold'>
                  68686868
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(`20033357`)
                    setShowModalFlashMsg(true)
                    setTimeout(() => {
                      setShowModalFlashMsg(false)
                    }, 1500);
                  }}>
                  <Row gap={4}>
                    <IconCopy style={sizeIcon.sm} />
                    <Text>
                      Copy
                    </Text>
                  </Row>
                </TouchableOpacity>

              </Row>
            </Column>
            <Column
              gap={8}>
              <Text
                color={BASE_COLOR}
                weight='regular'>
                Tên ngân hàng thụ hưởng:
              </Text>
              <Text
                weight='bold'>
                LIA MEDIA COMPANY
              </Text>
            </Column>
          </Column>

          <Column
            gap={8}
            marginTop={0}
            margin={8 * 2}>
            <Text color={BASE_COLOR}>
              Nhập số tiền muốn nạp <Text color={RED}>*</Text>
            </Text>
            <TextInput
              onChangeText={(e) => _handleOnchangeText(e)}
              value={valueMoney}
              keyboardType={'number-pad'}
              placeholder='0'
              style={styles.textInput} />
          </Column>

          <Column
            gap={8}
            marginTop={0}
            alignItems='flex-start'
            margin={8 * 2}>
            <Text color={BASE_COLOR}>
              Hình ảnh đã chuyển khoản <Text color={RED}>*</Text>
            </Text>
            {
              listImageBanking?.length > 0 ?
                <TouchableOpacity
                  onPress={_handlePickImage}>
                  <Image
                    style={{
                      borderRadius: 4,
                      width: 8 * 20,
                      height: 8 * 20 * listImageBanking[0]?.height / listImageBanking[0]?.width,
                    }}
                    source={{ uri: `${listImageBanking[0]?.path}` }} />
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
          <Column
            gap={8}
            marginTop={0}
            margin={8 * 2}>
            <Text color={BASE_COLOR}>
              Ghi chú
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(e) => setValueDescription(e)}
                value={valueDescription}
                placeholder={"Nhập ghi chú"}
                multiline />
            </View>
          </Column>
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionButton
        disabled={isDisabled}
        onPress={_handleConfirm}
        title={"Gửi yêu cầu"} />

      <ModalFlashMsg
        bottom
        show={showModalFlashMsg}
        hide={() => {
          setShowModalFlashMsg(false)
        }}
        data={'Đã copy.'} />

    </Screen >
  )
}

export default RechargeToWallet

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: _moderateScale(8 * 10),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: _moderateScale(8),
    padding: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
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
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BORDER_COLOR,
    padding: 8 * 2,
    fontSize: 18,
    color: PRICE_ORANGE,
    ...stylesFont.fontNolanBold
  }
})