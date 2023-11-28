import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import { IconProfileBirthday, IconProfileCard, IconProfileFlag, IconProfileGender, IconProfileLocation, IconProfileMail, IconProfilePassport, IconProfilePerson, IconProfilePhone } from '@Components/Icon/Icon'
import ModalPickSingleNotSearch from '@Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import Header from '@Components/NewHeader/Header'
import Screen from '@Components/Screen'
import { updateProfilePartner } from '@Redux/Action/ProfileAction'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useVisible from 'src/Hooks/useVisible'
import EditAvatar from './Components/EditAvatar'
import Input from './Components/Input'
import MultiInput from './Components/MultiInput'
import useConfirmation from 'src/Hooks/useConfirmation'

const NewUpdateInfoUser = () => {

  const dispatch = useDispatch()

  const { showConfirmation } = useConfirmation();

  const infoUser = useSelector(state => state?.infoUserReducer?.infoUser)

  const genderPicker = useVisible();

  const [valueName, setValueName] = useState('')
  const [errorName, setErrorName] = useState(null)
  const [valuePhone, setValuePhone] = useState('')
  const [valueEmail, setValueEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [valueAddress, setValueAddress] = useState('')
  const [valueBirthday, setValueBirthday] = useState({
    day: null,
    month: null,
    year: null
  })
  const [errorBirthday, setErrorBirthday] = useState(null)
  const [valueGender, setValueGender] = useState(null)
  const [valueCMND, setValueCMND] = useState('')
  const [valueJob, setValueJob] = useState('')
  const [valueNationality, setValueNationality] = useState('')
  const [valueEthnicity, setValueEthnicity] = useState('')

  useEffect(() => {
    if (infoUser?._id) {
      console.log({ infoUser });
      setValueName(infoUser?.name);
      setValuePhone(infoUser?.phone[0]?.fullPhoneNumber);
      setValueEmail(infoUser?.email[0]);
      setValueAddress(!isEmpty(infoUser?.address) ? infoUser?.address[0]?.fullAddress : '')
      setValueBirthday(infoUser?.birthday?.length > 0 ? {
        day: moment(infoUser?.birthday).date().toString(),
        month: (moment(infoUser?.birthday).month() + 1).toString(),
        year: moment(infoUser?.birthday).year().toString()
      } : {
        day: null,
        month: null,
        year: null
      })
      setValueGender(infoUser?.gender)
      setValueCMND(infoUser?.idCard?.idNumber)
      setValueJob(infoUser?.profession)
      setValueNationality(infoUser?.nationality)
      setValueEthnicity(infoUser?.ethnicity)
    }
  }, [infoUser])

  const _handleConfirm = () => {
    console.log({
      valueName,
      valuePhone,
      valueEmail,
      valueAddress,
      valueBirthday,
      valueGender,
      valueCMND,
      valueJob,
      valueNationality,
      valueEthnicity
    });

    if (isEmpty(valueName)) {
      return Alert.alert('Vui lòng nhập các trường bắt buộc')
    }

    let dataFetch = {};

    if (!isEmpty(valueName)) {
      dataFetch['name'] = valueName
    }
    if (!isEmpty(valueEmail)) {
      dataFetch['email'] = [valueEmail]
    } else {
      dataFetch['email'] = []
    }
    if (!isEmpty(valueGender)) {
      dataFetch['gender'] = valueGender
    }
    if (!isEmpty(valueAddress)) {
      dataFetch['address'] = [{
        nationId: "",
        cityId: "",
        districtId: "",
        wardId: "",
        street: "",
        fullAddress: valueAddress
      }]
    } else {
      dataFetch['address'] = [{
        nationId: "",
        cityId: "",
        districtId: "",
        wardId: "",
        street: "",
        fullAddress: ""
      }]
    }
    if (!isEmpty(valueCMND)) {
      dataFetch['idCard'] = {
        idNumber: valueCMND,
        createdAt: moment()
      }
    } else {
      dataFetch['idCard'] = {
        idNumber: "",
        createdAt: moment()
      }
    }
    if (!isEmpty(valueBirthday?.year)) {
      dataFetch['birthday'] = moment(`${valueBirthday?.year}-${valueBirthday?.month}-${valueBirthday?.day}`)
    }
    if (!isEmpty(valueJob)) {
      dataFetch['profession'] = valueJob
    } else {
      dataFetch['profession'] = ""
    }
    if (!isEmpty(valueNationality)) {
      dataFetch['nationality'] = valueNationality
    } else {
      dataFetch['nationality'] = ""
    }
    if (!isEmpty(valueEthnicity)) {
      dataFetch['ethnicity'] = valueEthnicity
    } else {
      dataFetch['ethnicity'] = ""
    }

    showConfirmation(
      'Xác nhận',
      'Xác nhận cập nhật thông tin cá nhân?',
      () => {
        dispatch(updateProfilePartner(dataFetch))
      }
    );
    // 
  }

  const _handleCheckDisable = () => {
    if (isEmpty(errorName) && isEmpty(errorEmail) && isEmpty(errorBirthday)) {
      return false
    } else {
      return true
    }
  }

  return (

    <Screen safeBottom>

      <ModalPickSingleNotSearch
        hide={genderPicker.hide}
        onSelect={(item) => {
          setValueGender(item?.value)
        }}
        data={[
          { name: 'Nữ', value: 'female' },
          { name: 'Nam', value: 'male' },
        ]} show={genderPicker.visible} />

      <Header title={"Thông tin cá nhân"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <EditAvatar />

          <Column gap={8 * 4} paddingHorizontal={8 * 2}>
            <Input
              error={errorName}
              setError={setErrorName}
              title="Họ và tên"
              require
              value={valueName}
              onChangeText={setValueName}
              icon={<IconProfilePerson width={8 * 2} height={8 * 2} />} />

            <Input
              notEditable
              title="Số điện thoại"
              require
              value={valuePhone}
              icon={<IconProfilePhone width={8 * 2} height={8 * 2} />}
            />

            <Input
              error={errorEmail}
              setError={setErrorEmail}
              title="Email"
              keyboardType={'email-address'}
              value={valueEmail}
              onChangeText={setValueEmail}
              icon={<IconProfileMail width={8 * 2} height={8 * 2} />} />

            <Input title="Địa chỉ"
              value={valueAddress}
              onChangeText={setValueAddress}
              icon={<IconProfileLocation width={8 * 2} height={8 * 2} />} />

            <MultiInput
              value={valueBirthday}
              setValue={setValueBirthday}
              error={errorBirthday}
              number
              setError={setErrorBirthday}
              title="Ngày tháng năm sinh"
              icon={<IconProfileBirthday width={8 * 2} height={8 * 2} />} />

            <Input title="Giới tính"
              enablePress
              value={valueGender == 'male' ? "Nam" : "Nữ"}
              onPress={genderPicker.show}
              icon={<IconProfileGender width={8 * 2} height={8 * 2} />} />

            <Input title="CMND/CCCD"
              value={valueCMND}
              keyboardType={'number-pad'}
              onChangeText={setValueCMND}
              icon={<IconProfileCard width={8 * 2} height={8 * 2} />} />

            <Input title="Nghề nghiệp"
              value={valueJob}
              onChangeText={setValueJob}
              icon={<IconProfilePerson width={8 * 2} height={8 * 2} />} />

            <Input title="Quốc tịch"
              value={valueNationality}
              onChangeText={setValueNationality}
              icon={<IconProfilePassport width={8 * 2} height={8 * 2} />} />

            <Input title="Dân tộc"
              value={valueEthnicity}
              onChangeText={setValueEthnicity}
              icon={<IconProfileFlag width={8 * 2} height={8 * 2} />} />
          </Column>

          <View style={{ height: 200 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <ActionButton
        disable={_handleCheckDisable}
        onpress={_handleConfirm}
        title={'Cập nhật thông tin'} />

    </Screen>
  )
}

export default NewUpdateInfoUser

const styles = StyleSheet.create({})
