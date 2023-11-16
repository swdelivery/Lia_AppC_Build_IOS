import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import Button from "../../Components/Button/Button";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { sizeIcon } from "../../Constant/Icon";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import { alertCustomNotAction } from "../../Constant/Utils";
import { partnerAccountRegister } from "../../Redux/Action/AuthAction";
import { styleElement } from "../../Constant/StyleElement";
import { getPartnerByCollaboratorCode } from "../../Redux/Action/ProfileAction";
import Collapsible from "react-native-collapsible";
import { IconTick } from "../../Components/Icon/Icon";
import Spacer from "../../Components/Spacer";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import Header from "./components/Header";
import Row from "@Components/Row";
import EyeOn from "../../SGV/eyeOn.svg";
import EyeOff from "../../SGV/eyeOff.svg";
import SVGArrowDown from "../../SGV/arrowDown.svg";
import CountryPicker from 'react-native-country-picker-modal' 
import { Country, CountryCode, CallingCode} from "react-native-country-picker-modal/lib/types";
import { isValidPhoneNumber } from 'react-phone-number-input';
import Column from "@Components/Column";
import PasswordInput from "@Components/PasswordInput";
import PhoneInput from "@Components/PhoneInput";

const RegisterInApp = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [name, setName] = useState("");
  const [codeAffiliate, setCodeAffiliate] = useState("");
  const [currPartnerCollab, setCurrPartnerCollab] = useState({});

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [focusInput, setFocusInput] = useState(null);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPass2, setIsShowPass2] = useState(false);

  const [countryCallingCode, setCountryCallingCode] = useState<CallingCode>('84')

  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [errorName, setErrorName] = useState("");

  const dispatch = useDispatch();

  const fetchData = async () => {
    // dispatch(fetchAllData())
    if (!phoneNumber || !password) {
      return alert("Nhập đầy đủ thông tin");
    }
  };

  useEffect(() => {
    if (codeAffiliate?.length > 0) {
      _getPartnerInviter(codeAffiliate);
    }
  }, [codeAffiliate]);

  const _getPartnerInviter = async (codeAffiliate) => {
    let result = await getPartnerByCollaboratorCode({
      collaboratorCode: codeAffiliate?.trim(),
    });
    if (result?.isAxiosError) return setCurrPartnerCollab({});
    setCurrPartnerCollab(result?.data?.data);
  };

  const _handleRegister = useCallback(async (nationCode) => {
    if (
      !name.trim() ||
      !phoneNumber.trim() ||
      !password.trim() ||
      !password2.trim()
    ) {
      return alertCustomNotAction(
        `Lỗi`,
        `Vui lòng nhập đầy đủ các trường cần thiết`
      );
    }
    if (password?.length < 6) {
      return alertCustomNotAction(`Lỗi`, `Mật khẩu phải ít nhất 6 kí tự`);
    }
    if (password !== password2) {
      return alertCustomNotAction(`Lỗi`, `Mật khẩu xác nhận không đúng`);
    }

    let dataPost: any = {
      name: name,
      phone: {
        phoneNumber: phoneNumber,
        nationCode: '+' + nationCode,
      },
      password: password,
    };

    if (codeAffiliate?.length > 0) {
      dataPost.inviterCode = codeAffiliate.trim();
    }

    let resultPartnerAccountRegister = await partnerAccountRegister(dataPost);
    if (resultPartnerAccountRegister?.isAxiosError) return;

    let newFormatPhone = phoneNumber;

    if (newFormatPhone.charAt(0) == "0") {
      newFormatPhone = `+84${newFormatPhone.substring(1)}`;
    } else {
      newFormatPhone = `+84${newFormatPhone}`;
    }

    navigation.navigate(ScreenKey.ACTIVATION_IN_APP, {
      phoneNumber: newFormatPhone,
      fullPhone: phoneNumber,
      password: password,
      routeName: props?.route?.params?.routeName,
      codeAffiliate: codeAffiliate.trim(),
    });
  }, [name, phoneNumber, password, password2, codeAffiliate]);

  const validatePhoneNumber = () => {
    if (!phoneNumber){
      setErrorPhoneNumber("Vui lòng nhập số điện thoại");
      return false;
    } else if (!isValidPhoneNumber('+' + countryCallingCode + phoneNumber)){
      setErrorPhoneNumber("Số điện thoại không hợp lệ");
      return false;
    } else {
      setErrorPhoneNumber("");
      return true;
    }
  }
  const validateName = () => {
    if (!name){
      setErrorName("Vui lòng nhập họ và tên");
      return false;
    } else {
      setErrorName("");
      return true;
    }
  }

  const validatePassword = () => {
    if (!password){
      setErrorPassword("Vui lòng nhập mật khẩu");
      return false;
    } else if (password.length < 6){
      setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    } else{
      setErrorPassword("");
      return true;
    }
  }

  const validatePassword2 = () => {
    if (password){
      if (!password2){
        setErrorPassword2("Vui lòng xác nhận lại mật khẩu");
        return false;
      } else if (password !== password2){
        setErrorPassword2("Nhập lại mật khẩu không trùng khớp");
        return false;
      } else {
        setErrorPassword2("");
        return true;
      }
    }else{
      setErrorPassword2("");
      return true;
    }
  }

  const validation = () => {
    var isContinue = true;
    if (!validateName()){
      isContinue = false;
    }

    if (!validatePhoneNumber()){
      isContinue = false;
    }

    if (!validatePassword()){
      isContinue = false;
    }

    if (!validatePassword2()){
      isContinue = false;
    }

    return isContinue;
  }

  const formatCodeAffiliate = (textValue) => {
    setCodeAffiliate(textValue.toUpperCase());
  }


  return (
    <Screen safeTop style={styles.container}>
      <Header title="Đăng ký tài khoản" onBack={navigation.goBack} />
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.content}
          enableOnAndroid={true}
          >
            <View
              style={[
                styles.container_logo,
                styleElement.centerChild,
              ]}
            >
              {/* <Text>LOGO HERE</Text> */}
              <Image
                resizeMode={"contain"}
                style={{ width: "70%", height: "70%" }}
                source={require("../../NewImage/NewLogoLogin.png")}
              />
            </View>

            <Column gap={_moderateScale(8 * 2)} style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2)}}>
              <View>
                {
                  codeAffiliate ?
                  <View style={styles.labelContainer}>
                    <Text size={14} color={Color.GREY} >Mã giới thiệu</Text>
                  </View> 
                  : <></>
                }
                <Row
                  paddingVertical={_moderateScale(8 * 2)}
                  borderRadius={_moderateScale(8)}
                  borderColor={
                    codeAffiliate ? Color.BORDER_INPUT_TEXT_FOCUSED : Color.BORDER_INPUT_TEXT
                  }
                  borderWidth={1}
                  paddingHorizontal={10}
                >
                  <TextInput
                    value={codeAffiliate}
                    onChangeText={formatCodeAffiliate}
                    // style={styles.input}
                    placeholder={"Mã giới thiệu"}
                    placeholderTextColor={"grey"}
                    style={styles.input_text}
                  />

                  <Collapsible collapsed={currPartnerCollab?._id ? false : true}>
                    <View
                      style={{
                        padding: _moderateScale(8 * 2),
                        paddingBottom: 0,
                        ...styleElement.rowAliCenter,
                      }}
                    >
                      <Text style={{ marginRight: _moderateScale(8) }}>
                        Tìm thấy người giới thiệu:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {currPartnerCollab?.name}
                        </Text>
                      </Text>
                      <IconTick style={sizeIcon.sm} />
                    </View>
                  </Collapsible>
                </Row>
              </View>

              <View>
                {
                  name ?
                  <View style={styles.labelContainer}>
                    <Text size={14} color={Color.GREY} >Tên của bạn</Text>
                  </View> 
                  : <></>
                }
                <Row
                  paddingVertical={_moderateScale(8 * 2)}
                  borderRadius={_moderateScale(8)}
                  borderColor={
                    errorName
                      ? Color.ERROR_COLOR
                      : name
                      ? Color.BORDER_INPUT_TEXT_FOCUSED
                      : Color.BORDER_INPUT_TEXT
                  }
                  borderWidth={1}
                  paddingHorizontal={10}
                >
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder={"Tên của bạn"}
                    placeholderTextColor={"grey"}
                    style={styles.input_text}
                    onBlur={validateName}
                  />
                </Row>
                {
                  errorName && errorName.length > 0 ? <Text style={styles.error_text}>
                    {errorName}
                  </Text> : <></>
                }
              </View>

              <PhoneInput 
                content={phoneNumber} 
                countryCallingCode={countryCallingCode} 
                errorMessage={errorPhoneNumber} 
                label="Nhập số điện thoại" 
                onBlur={validatePhoneNumber} 
                onChangeText={setphoneNumber} 
                onSelectionCallingCode={setCountryCallingCode}/>
                
              <PasswordInput 
                content={password} 
                errorMessage={errorPassword} 
                label="Nhập mật khẩu" 
                onBlur={validatePassword} 
                onChangeText={setPassword} />

              <PasswordInput 
                content={password2} 
                errorMessage={errorPassword2} 
                label="Xác nhận mật khẩu" 
                onBlur={validatePassword2} 
                onChangeText={setPassword2} />

              <Spacer top={_moderateScale(8 * 4)} />
              <TouchableOpacity
                onPress={()=>{
                  if (validation()){
                    _handleRegister(countryCallingCode);
                  }
                }}
                style={[
                  {
                    height: _moderateScale(8 * 6),
                    borderRadius: _moderateScale(8),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Color.BG_LOGIN_BUTTON,
                  },
                ]}
              >
                <Text
                  style={[
                    stylesFont.fontNolanBold,
                    { fontSize: _moderateScale(16), color: Color.WHITE },
                  ]}
                >
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </Column>
        </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  input: {
    width: _widthScale(320),
    color: Color.GREY,
    padding: 0,
    fontSize: _widthScale(14),
    paddingHorizontal: _widthScale(0),
    margin: 0,
  },
  headerContainer: {
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8 * 2),
    paddingBottom: 8,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  labelContainer: {
    backgroundColor: "white", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
  },
  input_text:{
    ...stylesFont.fontNolan,
    fontSize: _moderateScale(14),
    paddingVertical: 0,
    flex: 1,
    color: Color.BLACK
  },
  error_text:{
    color: Color.ERROR_COLOR,
    marginHorizontal: 10,
    fontStyle: 'italic',
    marginVertical: 5
  },
  container_logo: {
    height: _moderateScale(8 * 20),
    borderWidth: 0,
    margin: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8 * 2),
    marginTop: _moderateScale(8 * 2)
  }
});

export default RegisterInApp;
