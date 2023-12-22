import ActionButton from '@Components/ActionButton/ActionButton'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import Toggle from '@Components/Toggle/Toggle'
import { formatMonney } from '@Constant/Utils'
import { uploadModule } from '@Redux/Action/BookingAction'
import { getInfoUserReducer } from '@Redux/Selectors'
import { clearDataDonation, createVolunteerCompanionDonate, createVolunteerDonate, selectHideName, selectVolunteerId } from '@Redux/charity/actions'
import { getDataCreateDonateState, getDetailCampainState } from '@Redux/charity/selectors'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useConfirmation from 'src/Hooks/useConfirmation'
import { useNavigate, useNavigationParams } from 'src/Hooks/useNavigation'
import { isIos } from 'src/utils/platform'
import BankInfo from './DonationComponents/BankInfo'
import Banner from './DonationComponents/Banner'
import ImageUpload from './DonationComponents/ImageUpload'
import InputMoney from './DonationComponents/InputMoney'
import InputWish from './DonationComponents/InputWish'
import TypeDonate from './DonationComponents/TypeDonate'
import WalletInfo from './DonationComponents/WalletInfo'

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

  useEffect(() => {
    return () => {
      dispatch(clearDataDonation())
    };
  }, [])

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
