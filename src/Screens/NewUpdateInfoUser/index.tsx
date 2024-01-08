import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import { IconFacebook, IconInstagram, IconProfileBirthday, IconProfileCard, IconProfileFlag, IconProfileGender, IconProfileLocation, IconProfileMail, IconProfilePassport, IconProfilePerson, IconProfilePhone, IconTick, IconZalo } from '@Components/Icon/Icon'
import ModalPickSingleNotSearch from '@Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch'
import Screen from '@Components/Screen'
import { getPartnerByCollaboratorCode, updateProfilePartner } from '@Redux/Action/ProfileAction'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useVisible from "src/Hooks/useVisible";
import EditAvatar from "./Components/EditAvatar";
import Input from "./Components/Input";
import MultiInput from "./Components/MultiInput";
import useConfirmation from "src/Hooks/useConfirmation";
import Text from "@Components/Text";
import ActionSheetBottom from "@Components/ModalBottom/ActionSheetBottom";
import ImagePicker from "react-native-image-crop-picker";
import { uploadModule } from "@Redux/Action/BookingAction";
import LiAHeader from "@Components/Header/LiAHeader";
import Row from '@Components/Row'
import { sizeIcon } from '@Constant/Icon'
import Icon from '@Components/Icon'
import { NEW_BASE_COLOR } from '@Constant/Color'

const NewUpdateInfoUser = () => {
  const dispatch = useDispatch();

  const { showConfirmation } = useConfirmation();

  const infoUser = useSelector((state) => state?.infoUserReducer?.infoUser);

  const genderPicker = useVisible();
  const cameraPicker = useVisible();

  const [valueInviteCode, setValueInviteCode] = useState("");
  const [currPartnerCollab, setCurrPartnerCollab] = useState({});
  const [valueName, setValueName] = useState("");
  const [errorName, setErrorName] = useState(null);
  const [valuePhone, setValuePhone] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [valueAddress, setValueAddress] = useState("");
  const [valueBirthday, setValueBirthday] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [errorBirthday, setErrorBirthday] = useState(null);
  const [valueGender, setValueGender] = useState(null);
  const [valueCMND, setValueCMND] = useState("");
  const [valueJob, setValueJob] = useState("");
  const [valueNationality, setValueNationality] = useState("");
  const [valueEthnicity, setValueEthnicity] = useState("");

  const [valueFacebook, setValueFacebook] = useState("");
  const [valueZalo, setValueZalo] = useState("");
  const [valueInstagram, setValueInstagram] = useState("");

  useEffect(() => {
    if (infoUser?._id) {
      setValueName(infoUser?.name);
      setValuePhone(infoUser?.phone[0]?.fullPhoneNumber);
      setValueEmail(infoUser?.email[0]);
      setValueAddress(
        !isEmpty(infoUser?.address) ? infoUser?.address[0]?.fullAddress : ""
      );
      setValueBirthday(
        infoUser?.birthday?.length > 0
          ? {
            day: moment(infoUser?.birthday).date().toString(),
            month: (moment(infoUser?.birthday).month() + 1).toString(),
            year: moment(infoUser?.birthday).year().toString(),
          }
          : {
            day: null,
            month: null,
            year: null,
          }
      );
      setValueGender(infoUser?.gender);
      setValueCMND(infoUser?.idCard?.idNumber);
      setValueJob(infoUser?.profession);
      setValueNationality(infoUser?.nationality);
      setValueEthnicity(infoUser?.ethnicity);
      setValueFacebook(infoUser?.facebook);
      setValueZalo(infoUser?.zalo);
      setValueInstagram(infoUser?.instagram);
    }
  }, [infoUser]);

  useEffect(() => {
    if (infoUser?.inviterCode) {
      _getPartnerInviter(infoUser?.inviterCode)
      setValueInviteCode(infoUser?.inviterCode)
    }
  }, [infoUser?.inviterCode])

  useEffect(() => {
    if (!isEmpty(valueInviteCode.trim())) {
      _getPartnerInviter(valueInviteCode.trim())
    }
  }, [valueInviteCode])

  const _getPartnerInviter = async (codeAffiliate) => {
    let result = await getPartnerByCollaboratorCode({
      collaboratorCode: codeAffiliate?.trim(),
    });
    if (result?.isAxiosError) return setCurrPartnerCollab({});
    setCurrPartnerCollab(result?.data?.data);
  };

  const _handleConfirm = () => {

    if (isEmpty(valueName)) {
      return Alert.alert("Vui lòng nhập các trường bắt buộc");
    }

    let dataFetch = {};

    if (!isEmpty(valueInviteCode.trim())) {
      dataFetch["inviterCode"] = valueInviteCode.trim();
    }
    if (!isEmpty(valueName)) {
      dataFetch["name"] = valueName;
    }
    if (!isEmpty(valueEmail)) {
      dataFetch["email"] = [valueEmail];
    } else {
      dataFetch["email"] = [];
    }
    if (!isEmpty(valueGender)) {
      dataFetch["gender"] = valueGender;
    }
    if (!isEmpty(valueAddress)) {
      dataFetch["address"] = [
        {
          nationId: "",
          cityId: "",
          districtId: "",
          wardId: "",
          street: "",
          fullAddress: valueAddress,
        },
      ];
    } else {
      dataFetch["address"] = [
        {
          nationId: "",
          cityId: "",
          districtId: "",
          wardId: "",
          street: "",
          fullAddress: "",
        },
      ];
    }
    if (!isEmpty(valueCMND)) {
      dataFetch["idCard"] = {
        idNumber: valueCMND,
        createdAt: moment(),
      };
    } else {
      dataFetch["idCard"] = {
        idNumber: "",
        createdAt: moment(),
      };
    }
    if (!isEmpty(valueBirthday?.year)) {
      dataFetch["birthday"] = moment(
        `${valueBirthday?.year}-${valueBirthday?.month}-${valueBirthday?.day}`
      );
    }
    if (!isEmpty(valueJob)) {
      dataFetch["profession"] = valueJob;
    } else {
      dataFetch["profession"] = "";
    }
    if (!isEmpty(valueNationality)) {
      dataFetch["nationality"] = valueNationality;
    } else {
      dataFetch["nationality"] = "";
    }
    if (!isEmpty(valueEthnicity)) {
      dataFetch["ethnicity"] = valueEthnicity;
    } else {
      dataFetch["ethnicity"] = "";
    }
    if (!isEmpty(valueFacebook)) {
      dataFetch["facebook"] = valueFacebook;
    } else {
      dataFetch["facebook"] = "";
    }
    if (!isEmpty(valueZalo)) {
      dataFetch["zalo"] = valueZalo;
    } else {
      dataFetch["zalo"] = "";
    }
    if (!isEmpty(valueInstagram)) {
      dataFetch["instagram"] = valueInstagram;
    } else {
      dataFetch["instagram"] = "";
    }

    showConfirmation("Xác nhận", "Xác nhận cập nhật thông tin cá nhân?", () => {
      dispatch(updateProfilePartner(dataFetch));
    });
    //
  };

  const isDisabled = useMemo(() => {
    if (isEmpty(errorName) && isEmpty(errorEmail) && isEmpty(errorBirthday)) {
      return false;
    } else {
      return true;
    }
  }, [errorName, errorEmail, errorBirthday]);

  const _handleConfirmBottomSheet = (data) => {
    if (data?.type == "gallery") {
      _handlePickGallery();
    }
    if (data?.type == "camera") {
      _handlePickCamera();
    }
  };

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
        dispatch(updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] }));
      }
    });
  };

  const _handlePickCamera = () => {
    ImagePicker.openCamera({
      mediaType: "photo",
      width: 500,
      height: 500,
      cropping: true,
      multiple: false,
    })
      .then(async (image) => {
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
          dispatch(
            updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] })
          );
        }
      })
      .catch((e) => { });
  };

  return (
    <Screen safeBottom>
      <ModalPickSingleNotSearch
        hide={genderPicker.hide}
        onSelect={(item) => {
          setValueGender(item?.value);
        }}
        data={[
          { name: "Nữ", value: "female" },
          { name: "Nam", value: "male" },
        ]}
        show={genderPicker.visible}
      />

      <LiAHeader safeTop title={"Thông tin cá nhân"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <EditAvatar cameraPicker={cameraPicker} />

          <Column gap={8 * 4} paddingHorizontal={8 * 2}>
            <Input
              notEditable={infoUser?.inviterCode}
              maxLength={20}
              title="Mã giới thiệu"
              value={valueInviteCode}
              onChangeText={setValueInviteCode}
              icon={<Icon name='link-variant' color={NEW_BASE_COLOR} size={8 * 2} />}
            >
              {
                currPartnerCollab?._id ?
                  <Row
                    gap={8}
                    marginTop={0}
                    margin={8 * 2}>
                    <Text>
                      Người giới thiệu: {currPartnerCollab?.name}
                    </Text>
                    <IconTick style={sizeIcon.sm} />
                  </Row>
                  : <></>
              }

            </Input>
            <Input
              maxLength={20}
              error={errorName}
              setError={setErrorName}
              title="Họ và tên"
              require
              value={valueName}
              onChangeText={setValueName}
              icon={<Icon name='account' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              notEditable
              title="Số điện thoại"
              require
              value={valuePhone}
              icon={<Icon name='phone' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              error={errorEmail}
              setError={setErrorEmail}
              title="Email"
              keyboardType={"email-address"}
              value={valueEmail}
              onChangeText={setValueEmail}
              icon={<Icon name='email' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              title="Địa chỉ"
              value={valueAddress}
              onChangeText={setValueAddress}
              icon={<Icon name='map-marker' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <MultiInput
              value={valueBirthday}
              setValue={setValueBirthday}
              error={errorBirthday}
              number
              setError={setErrorBirthday}
              title="Ngày tháng năm sinh (vd: 01/01/2000)"
              icon={<Icon name='calendar' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              title="Giới tính"
              enablePress
              value={
                valueGender ? (valueGender == "male" ? "Nam" : "Nữ") : null
              }
              onPress={genderPicker.show}
              icon={<Icon name='gender-male-female' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              title="CMND/CCCD"
              value={valueCMND}
              keyboardType={"number-pad"}
              onChangeText={setValueCMND}
              icon={<Icon name='card-account-details-outline' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              title="Nghề nghiệp"
              value={valueJob}
              onChangeText={setValueJob}
              icon={<Icon name='account' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              title="Quốc tịch"
              value={valueNationality}
              onChangeText={setValueNationality}
              icon={<Icon name='badge-account-outline' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Input
              title="Dân tộc"
              value={valueEthnicity}
              onChangeText={setValueEthnicity}
              icon={<Icon name='account' color={NEW_BASE_COLOR} size={8 * 2} />}
            />

            <Text weight="bold">Mạng xã hội</Text>

            <Input
              title="Facebook"
              value={valueFacebook}
              onChangeText={setValueFacebook}
              icon={<IconFacebook width={8 * 2} height={8 * 2} />}
            />

            <Input
              title="Zalo"
              value={valueZalo}
              onChangeText={setValueZalo}
              icon={<IconZalo width={8 * 2} height={8 * 2} />}
            />

            <Input
              title="Instagram"
              value={valueInstagram}
              onChangeText={setValueInstagram}
              icon={<IconInstagram width={8 * 2} height={8 * 2} />}
            />
          </Column>

          <View style={{ height: 200 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <ActionButton
        disabled={isDisabled}
        onPress={_handleConfirm}
        title={"Cập nhật thông tin"}
      />

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
  );
};

export default NewUpdateInfoUser

const styles = StyleSheet.create({})
