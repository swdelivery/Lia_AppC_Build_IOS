import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import { IconProfileBirthday, IconProfileGender, IconProfileMail, IconProfilePerson, IconProfilePhone } from '@Components/Icon/Icon'
import Input from '@Components/Input/Input'
import MultiInput from '@Components/Input/MultiInput'
import ActionSheetBottom from '@Components/ModalBottom/ActionSheetBottom'
import ModalPickSingleNotSearch from '@Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import Header from '@Components/NewHeader/Header'
import Screen from '@Components/Screen'
import { uploadModule } from '@Redux/Action/BookingAction'
import { createPartnerRelative, updatePartnerRelative } from '@Redux/relatives/actions'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import ImagePicker from "react-native-image-crop-picker"
import { useDispatch, useSelector } from 'react-redux'
import useConfirmation from 'src/Hooks/useConfirmation'
import useVisible from 'src/Hooks/useVisible'
import EditAvatar from './Components/EditAvatar'

const RelativesInfo = (props) => {

  const { params } = props?.route

  const genderPicker = useVisible();
  const ownerPicker = useVisible();
  const cameraPicker = useVisible()


  const dispatch = useDispatch()
  const { showConfirmation } = useConfirmation();

  const infoUser = useSelector(state => state?.infoUserReducer?.infoUser)

  const [avatarId, setAvatarId] = useState(null);
  const [avatarTemp, setAvatarTemp] = useState(null)

  const [valueName, setValueName] = useState('')
  const [errorName, setErrorName] = useState(null)
  const [valueNickname, setValueNickname] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [valueEmail, setValueEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [valueBirthday, setValueBirthday] = useState({
    day: null,
    month: null,
    year: null
  })
  const [errorBirthday, setErrorBirthday] = useState(null)
  const [valueGender, setValueGender] = useState(null)
  const [valueOwner, setValueOwner] = useState(null)

  useEffect(() => {
    if (params?.infoRelative?._id) {
      const {
        fullName,
        preferredName,
        phoneNumber,
        email,
        relation,
        birthday,
        avatar,
        gender
      } = params?.infoRelative

      if (!isEmpty(fullName)) {
        setValueName(fullName)
      }
      if (!isEmpty(preferredName)) {
        setValueNickname(preferredName)
      }
      if (!isEmpty(phoneNumber)) {
        setValuePhone(phoneNumber)
      }
      if (!isEmpty(email)) {
        setValueEmail(email)
      }
      if (!isEmpty(relation)) {
        setValueOwner(relation)
      }
      if (!isEmpty(gender)) {
        setValueGender(gender)
      }
      if (birthday?.length > 0) {
        setValueBirthday({
          day: moment(birthday).date().toString(),
          month: (moment(birthday).month() + 1).toString(),
          year: moment(birthday).year().toString()
        })
      }
      if (!isEmpty(avatar?._id)) {
        setAvatarId(avatar?._id)
        setAvatarTemp(avatar)
      }
    }

  }, [params])

  const _handleCheckDisable = () => {
    if (!isEmpty(valueName) &&
      !isEmpty(valuePhone) &&
      !isEmpty(valueOwner) &&
      isEmpty(errorName) &&
      isEmpty(errorPhone) &&
      isEmpty(errorBirthday) &&
      isEmpty(errorEmail)) {
      return false
    }
    else { return true }
  }
  const _handleConfirm = () => {

    let dataFetch = {};
    if (!isEmpty(valueName)) {
      dataFetch['fullName'] = valueName
    }
    if (!isEmpty(valueNickname)) {
      dataFetch['preferredName'] = valueNickname
    }
    if (!isEmpty(valuePhone)) {
      dataFetch['phoneNumber'] = valuePhone
    }
    if (!isEmpty(valueEmail)) {
      dataFetch['email'] = valueEmail
    }
    if (!isEmpty(valueOwner)) {
      dataFetch['relation'] = valueOwner
    }
    if (!isEmpty(valueBirthday?.year)) {
      dataFetch['birthday'] = moment(`${valueBirthday?.year}-${valueBirthday?.month}-${valueBirthday?.day}`)
    }
    if (!isEmpty(valueGender)) {
      dataFetch['gender'] = valueGender
    }
    if (!isEmpty(avatarId)) {
      dataFetch['avatarId'] = avatarId
    }

    if (params?.infoRelative?._id) {
      showConfirmation(
        'Xác nhận',
        'Xác nhận cập nhật hồ sơ người thân?',
        () => {
          dispatch(updatePartnerRelative.request({
            _id: params?.infoRelative?._id,
            data: dataFetch
          }))
        }
      );
    } else {
      showConfirmation(
        'Xác nhận',
        'Xác nhận lưu hồ sơ người thân?',
        () => {
          dataFetch['partnerId'] = infoUser?._id
          dispatch(createPartnerRelative.request(dataFetch))
        }
      );
    }
  }

  const _handleConfirmBottomSheet = (data) => {
    if (data?.type == 'gallery') {
      _handlePickGallery()
    }
    if (data?.type == 'camera') {
      _handlePickCamera()
    }
  }


  const _handlePickGallery = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      multiple: false,
      mediaType: "photo",
      compressImageQuality: 1,
    }).then(async (image) => {
      let newImage = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
        type: image.mime,
        name: `${image.modificationDate}_${0}`,
        isLocal: true,
      };
      if (!isEmpty(newImage)) {
        let listImages = [newImage];
        let resultUploadImage = await uploadModule({
          moduleName: "partner",
          files: listImages,
        });
        if (resultUploadImage.isAxiosError) return;
        let listIdImageHasUpload = resultUploadImage?.data?.data.map(
          (item) => item._id
        );
        setAvatarId(listIdImageHasUpload[0])
        setAvatarTemp(resultUploadImage?.data?.data[0])
      }
    });
  };

  const _handlePickCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      width: 500,
      height: 500,
      cropping: true,
      multiple: false,
    }).then(async (image) => {
      let newImage = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
        type: image.mime,
        name: `${image.modificationDate}_${0}`,
        isLocal: true
      }
      if (!isEmpty(newImage)) {
        let listImages = [newImage]
        let resultUploadImage = await uploadModule({
          moduleName: 'partner',
          files: listImages
        })
        if (resultUploadImage.isAxiosError) return
        let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);
        setAvatarId(listIdImageHasUpload[0])
        setAvatarTemp(resultUploadImage?.data?.data[0])
      }
    }).catch(e => { });
  }

  return (
    <Screen safeBottom>
      <Header title="Thông tin người thân" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <EditAvatar
            cameraPicker={cameraPicker}
            avatarId={avatarId}
            setAvatarId={setAvatarId}
            avatarTemp={avatarTemp}
            setAvatarTemp={setAvatarTemp}
          />

          <Column gap={8 * 4} paddingHorizontal={8 * 2}>
            <Input
              maxLength={20}
              error={errorName}
              setError={setErrorName}
              title="Họ và tên"
              require
              value={valueName}
              onChangeText={setValueName}
              icon={<IconProfilePerson width={8 * 2} height={8 * 2} />} />

            <Input title="Tên thân mật"
              value={valueNickname}
              onChangeText={setValueNickname}
              icon={<IconProfilePerson width={8 * 2} height={8 * 2} />} />

            <Input
              maxLength={10}
              title="Số điện thoại"
              require
              keyboardType={'number-pad'}
              typeInput="phone-number"
              error={errorPhone}
              setError={setErrorPhone}
              value={valuePhone}
              onChangeText={setValuePhone}
              icon={<IconProfilePhone width={8 * 2} height={8 * 2} />} />

            <Input
              title="Đây là hồ sơ của"
              require
              enablePress
              value={valueOwner}
              onPress={ownerPicker.show}
              icon={<IconProfileGender width={8 * 2} height={8 * 2} />} />

            <MultiInput
              value={valueBirthday}
              setValue={setValueBirthday}
              error={errorBirthday}
              number
              setError={setErrorBirthday}
              title="Ngày tháng năm sinh (vd: 01/01/2000)"
              icon={<IconProfileBirthday width={8 * 2} height={8 * 2} />} />

            <Input
              title="Giới tính"
              enablePress
              value={valueGender ? (valueGender == 'male' ? "Nam" : "Nữ") : null}
              onPress={genderPicker.show}
              icon={<IconProfileGender width={8 * 2} height={8 * 2} />} />

            <Input
              error={errorEmail}
              setError={setErrorEmail}
              title="Email"
              keyboardType={'email-address'}
              value={valueEmail}
              onChangeText={setValueEmail}
              icon={<IconProfileMail width={8 * 2} height={8 * 2} />} />

          </Column>
          <View style={{ height: 200 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <ActionButton
        disable={_handleCheckDisable}
        onpress={_handleConfirm}
        title={'Lưu hồ sơ người thân'} />

      <ModalPickSingleNotSearch
        hide={genderPicker.hide}
        onSelect={(item) => {
          setValueGender(item?.value)
        }}
        data={[
          { name: 'Nữ', value: 'female' },
          { name: 'Nam', value: 'male' },
        ]} show={genderPicker.visible} />

      <ModalPickSingleNotSearch
        hide={ownerPicker.hide}
        onSelect={(item) => {
          setValueOwner(item?.value)
        }}
        data={[
          { name: 'Bố', value: 'Bố' },
          { name: 'Mẹ', value: 'Mẹ' },
          { name: 'Chồng', value: 'Chồng' },
          { name: 'Vợ', value: 'Vợ' },
          { name: 'Con', value: 'Con' },
          { name: 'Anh/Chị/Em', value: 'Anh/Chị/Em' },
          { name: 'Bạn bè', value: 'Bạn bè' },
        ]} show={ownerPicker.visible} />

      <ActionSheetBottom
        onConfirm={_handleConfirmBottomSheet}
        indexRed={2}
        options={[
          { name: "Mở camera", type: "camera" },
          { name: "Chọn ảnh từ thư viện", type: "gallery" },
          { name: "Đóng", type: "cancel" },
        ]}
        onClose={cameraPicker.hide}
        visible={cameraPicker?.visible}
      />

    </Screen>
  )
}

export default RelativesInfo

const styles = StyleSheet.create({})
