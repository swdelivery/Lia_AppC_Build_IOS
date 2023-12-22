import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Banner from './DonationComponents/Banner'
import { _width } from '@Constant/Scale'
import Column from '@Components/Column'
import { stylesFont } from '@Constant/Font'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import Toggle from '@Components/Toggle/Toggle'
import InputMoney from './DonationComponents/InputMoney'
import InputWish from './DonationComponents/InputWish'
import TypeDonate from './DonationComponents/TypeDonate'
import ActionButton from '@Components/ActionButton/ActionButton'
import { useDispatch, useSelector } from 'react-redux'
import { openModalThanks } from '@Redux/modal/actions'
import { getDataCreateDonateState, getDetailCampainState } from '@Redux/charity/selectors'
import { createVolunteerDonate, selectHideName, selectVolunteerId, createVolunteerCompanionDonate } from '@Redux/charity/actions'
import BankInfo from './DonationComponents/BankInfo'
import { isIos } from 'src/utils/platform'
import WalletInfo from './DonationComponents/WalletInfo'
import ImageUpload from './DonationComponents/ImageUpload'
import { isEmpty } from 'lodash'
import { uploadModule } from '@Redux/Action/BookingAction'
import { getInfoUserReducer } from '@Redux/Selectors'
import { formatMonney } from '@Constant/Utils'
import useConfirmation from 'src/Hooks/useConfirmation'
import { useNavigate, useNavigationParams } from 'src/Hooks/useNavigation'

const Donation = () => {
  const { volunteerCompanion } = useNavigationParams();
  const { navigation } = useNavigate()
  const dispatch = useDispatch()
  const { data: { _id, createBy, name } } = useSelector(getDetailCampainState)
  const { infoUser } = useSelector(getInfoUserReducer);
  const { showConfirmation } = useConfirmation();
  const {
    volunteerId,
    amount,
    paymentMethodCode,
    isHideName,
    currencyCode,
    description,
    images
  } = useSelector(getDataCreateDonateState)

  const _handleConfirm = useCallback(async () => {
    const numberRegex = /^[1-9]\d*$/;
    let checkIsMoney = numberRegex.test(amount?.split('.')?.join(''));
    if (!checkIsMoney) {
      return Alert.alert('Vui lòng nhập đúng định dạng tiền')
    }
    showConfirmation(
      "Xác nhận",
      `Xác nhận ủng hộ ${formatMonney(amount)} VND cho dự án này?`,
      async () => {
        if (paymentMethodCode == "BANK_TRANSFER") {
          let listImages = images.map((i, index) => {
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
            moduleName: 'volunteer',
            files: listImages
          })
          if (resultUploadImage.isAxiosError) return
          let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);

          let dataFetchCreateDonateRequest = {
            amount: Number(amount?.split('.')?.join('')),
            paymentMethodCode: paymentMethodCode,
            isHideName: isHideName,
            currencyCode: currencyCode,
            description: description,
            images: listIdImageHasUpload
          }
          if (volunteerCompanion?.code) {
            dataFetchCreateDonateRequest['volunteerCompanionCode'] = volunteerCompanion?.code
            dispatch(createVolunteerCompanionDonate.request({
              dataFetch: dataFetchCreateDonateRequest,
              dataShowModal: {
                type: 'donation',
                price: formatMonney(amount),
                name: infoUser?.name,
                campainName: name,
                ownerName: createBy
              }
            }))
          } else {
            dataFetchCreateDonateRequest['volunteerId'] = volunteerId
            dispatch(createVolunteerDonate.request({
              dataFetch: dataFetchCreateDonateRequest,
              dataShowModal: {
                type: 'donation',
                price: formatMonney(amount),
                name: infoUser?.name,
                campainName: name,
                ownerName: createBy
              }
            }))
          }
        } else {
          let dataFetchCreateDonateRequest = {
            amount: Number(amount?.split('.')?.join('')),
            paymentMethodCode: paymentMethodCode,
            isHideName: isHideName,
            currencyCode: currencyCode,
            description: description,
            images: []
          }
          if (volunteerCompanion?.code) {
            dataFetchCreateDonateRequest['volunteerCompanionCode'] = volunteerCompanion?.code
            dispatch(createVolunteerCompanionDonate.request({
              dataFetch: dataFetchCreateDonateRequest,
              dataShowModal: {
                type: 'donation',
                price: formatMonney(amount),
                name: infoUser?.name,
                campainName: name,
                ownerName: createBy
              }
            }))
          } else {
            dataFetchCreateDonateRequest['volunteerId'] = volunteerId
            dispatch(createVolunteerDonate.request({
              dataFetch: dataFetchCreateDonateRequest,
              dataShowModal: {
                type: 'donation',
                price: formatMonney(amount),
                name: infoUser?.name,
                campainName: name,
                ownerName: createBy
              }
            }))
          }
        }
        return navigation.goBack()
      }
    );

  }, [
    volunteerId,
    amount,
    paymentMethodCode,
    isHideName,
    currencyCode,
    description,
    images
  ])

  const _handleChangeHideName = useCallback(() => {
    dispatch(selectHideName(!isHideName))
  }, [isHideName])

  useEffect(() => {
    if (_id) {
      dispatch(selectVolunteerId(_id))
    }
  }, [_id])

  const isDisable = useMemo(() => {

    if (paymentMethodCode == "BANK_TRANSFER") {
      if (!isEmpty(amount) && !isEmpty(images)) {
        return false
      } else {
        return true
      }
    } else {
      if (!isEmpty(amount)) {
        return false
      } else {
        return true
      }
    }
  }, [amount, images, paymentMethodCode])

  return (
    <Screen safeBottom>
      <FocusAwareStatusBar barStyle='dark-content' />
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}>
          <Banner />
          <TypeDonate />
          {
            paymentMethodCode == "BANK_TRANSFER" ?
              <BankInfo />
              :
              <WalletInfo />
          }
          <InputMoney />
          <Row
            gap={8}
            margin={8 * 2}>
            <Toggle
              onPress={_handleChangeHideName}
              isActive={isHideName} />
            <Text>Tôi muốn ủng hộ giấu tên</Text>
          </Row>
          {
            paymentMethodCode == "BANK_TRANSFER" ?
              <ImageUpload />
              :
              <></>
          }
          <InputWish />
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionButton
        disabled={isDisable}
        onPress={_handleConfirm}
        colors={["#34759b", "#1a3e67"]}
        title='Ủng hộ' />
    </Screen>
  )
}

export default Donation

const styles = StyleSheet.create({


  content: {
  },
  contentContainer: {
    paddingBottom: 60,
  },
})
