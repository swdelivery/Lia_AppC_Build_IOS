import React, { useRef, memo, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { _moderateScale, _heightScale, _width, _widthScale } from '../../Constant/Scale';
import {
  WHITE,
  GREY,
  BG_GREY_OPACITY_2,
  BG_GREY_OPACITY_5,
  BLUE_FB,
  BASE_COLOR,
  ORANGE,
} from "../../Constant/Color";
import { styleElement } from "../../Constant/StyleElement";
import { stylesFont } from '../../Constant/Font';
import { CREATE_BOOKING } from "../../Navigation/ScreenKey";
import Header from "../../Components/HeaderLoseWeight/index";
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import {
  createPartnerPickUpAddress,
  getAllAddressVietNam,
  getDistrictsByP,
  getwardsByD,
} from "../../Redux/Action/BookingAction";
import Collapsible from 'react-native-collapsible';
import TextInput from "@Components/TextInput";

const CreateNewAddress = memo((props) => {
  const RefScrollView = useRef(null);
  const RefTextInput = useRef(null);

  const [listAllProvince, setListAllProvince] = useState([]);
  const [currChoiceProvince, setCurrChoiceProvince] = useState({});

  const [listDistrict, setListDistrict] = useState([]);
  const [currChoiceDistrict, setCurrChoiceDistrict] = useState({});

  const [listWard, setListWard] = useState([]);
  const [currChoiceWard, setCurrChoiceWard] = useState({});

  const [textAddress, setTextAddress] = useState("");

  useEffect(() => {
    _getAllAddressVietNam();
  }, []);

  const _getAllAddressVietNam = async () => {
    let result = await getAllAddressVietNam();
    if (result?.isAxiosError) return;
    let temp = [...result?.data];
    let primaryArr = [];
    let codeArr = [79, 92, 75];
    temp = temp.filter((item, index) => {
      if (codeArr.includes(item?.code)) {
        primaryArr.push(item);
      }
      return !codeArr.includes(item?.code);
    });
    let newList = [...primaryArr, ...temp];

    setListAllProvince(newList);
  };
  const _handleChoiceProvince = async (data) => {
    let result = await getDistrictsByP(data?.code);
    if (result?.isAxiosError) return;
    setListDistrict(result?.data?.districts);
    setCurrChoiceProvince(data);
    RefScrollView.current?.scrollTo({
      y: 0,
      animated: false,
    });
  };

  const _handleChoiceDistrict = async (data) => {
    let result = await getwardsByD(data?.code);
    if (result?.isAxiosError) return;
    setListWard(result?.data?.wards);
    setCurrChoiceDistrict(data);
    RefScrollView.current?.scrollTo({
      y: 0,
      animated: false,
    });
  };
  
  const _handleChoiceWard = async (data) => {
    console.log({ data });
    setCurrChoiceWard(data);
    RefScrollView.current?.scrollTo({
      y: 0,
      animated: false,
    });
    RefTextInput?.current?.focus();
  };

  const _confirmCreatePickupAddress = async () => {
    let fullAddress = `${textAddress}, ${currChoiceWard?.name}, ${currChoiceDistrict?.name}, ${currChoiceProvince?.name}`;
    let result = await createPartnerPickUpAddress({
      fullAddress: fullAddress?.trim(),
    });
    if (result?.isAxiosError) return;
    navigation.navigate(CREATE_BOOKING, {
      currPickUpAddress: result?.data?.data,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBarCustom bgColor={WHITE} barStyle={"dark-content"} />
      <View style={{ height: _moderateScale(8) }} />
      <Header title={"Địa chỉ mới"} />

      {/* <TouchableOpacity style={styles.btnAddMore}>
                <Image style={[sizeIcon.md, { marginRight: _moderateScale(8) }]} source={require('../../NewIcon/locationRed.png')} />
                <Text style={styles.btnAddMore__text}>
                    Sử dụng vị trí hiện tại của tôi
                </Text>
            </TouchableOpacity> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: _moderateScale(8 * 2),
          marginTop: _moderateScale(8 * 2),
        }}
      >
        <View>
          <Text
            style={{
              ...stylesFont.fontNolan500,
              color: GREY,
              fontSize: _moderateScale(14),
            }}
          >
            Khu vực được chọn
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              setListDistrict([]);
              setListWard([]);
              setCurrChoiceProvince({});
              setCurrChoiceDistrict({});
              setCurrChoiceWard({});
              setTextAddress("");
            }}
          >
            <Text
              style={{
                ...stylesFont.fontNolan500,
                color: ORANGE,
                fontSize: _moderateScale(14),
              }}
            >
              Thiết lập lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {currChoiceProvince?.name ? (
        <View
          style={{ flexDirection: "row", marginTop: _moderateScale(8 * 2) }}
        >
          <View
            style={{
              width: _moderateScale(2),
              backgroundColor: BG_GREY_OPACITY_5,
              alignItems: "center",
              marginLeft: _moderateScale(8 * 2),
            }}
          >
            <View
              style={{
                width: _moderateScale(8),
                height: _moderateScale(8),
                backgroundColor: BLUE_FB,
                borderRadius: _moderateScale(4),
                position: "absolute",
                top: _moderateScale(6),
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              paddingHorizontal: _moderateScale(8 * 1),
            }}
          >
            <View style={{ minHeight: _moderateScale(8 * 4) }}>
              <Text style={{ fontSize: _moderateScale(14), color: BLUE_FB }}>
                {currChoiceProvince?.name}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {currChoiceDistrict?.name ? (
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: _moderateScale(2),
              backgroundColor: BG_GREY_OPACITY_5,
              alignItems: "center",
              marginLeft: _moderateScale(8 * 2),
            }}
          >
            <View
              style={{
                width: _moderateScale(8),
                height: _moderateScale(8),
                backgroundColor: BLUE_FB,
                borderRadius: _moderateScale(4),
                position: "absolute",
                top: _moderateScale(6),
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              paddingHorizontal: _moderateScale(8 * 1),
            }}
          >
            <View style={{ minHeight: _moderateScale(8 * 4) }}>
              <Text style={{ fontSize: _moderateScale(14), color: BLUE_FB }}>
                {currChoiceDistrict?.name}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {currChoiceWard?.name ? (
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: _moderateScale(2),
              backgroundColor: BG_GREY_OPACITY_5,
              alignItems: "center",
              marginLeft: _moderateScale(8 * 2),
            }}
          >
            <View
              style={{
                width: _moderateScale(8),
                height: _moderateScale(8),
                backgroundColor: BLUE_FB,
                borderRadius: _moderateScale(4),
                position: "absolute",
                top: _moderateScale(6),
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              paddingHorizontal: _moderateScale(8 * 1),
            }}
          >
            <View style={{ minHeight: _moderateScale(8 * 2) }}>
              <Text style={{ fontSize: _moderateScale(14), color: BLUE_FB }}>
                {currChoiceWard?.name}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}

      <Collapsible collapsed={currChoiceWard?.name ? false : true}>
        <View
          style={[
            styleElement.rowAliCenter,
            {
              paddingHorizontal: _moderateScale(8 * 0),
              marginTop: _moderateScale(8 * 2),
            },
          ]}
        >
          <TextInput
            ref={RefTextInput}
            onChangeText={(e) => setTextAddress(e)}
            value={textAddress}
            style={[
              styles.inputCodeRef,
              {
                backgroundColor: BG_GREY_OPACITY_2,
                flex: 1,
                marginHorizontal: _moderateScale(8 * 2),
              },
            ]}
            placeholder={"vd: Hẽm 401 Cách mạng tháng 8"}
          />
        </View>

        {textAddress?.trim()?.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              _confirmCreatePickupAddress();
            }}
            style={[
              {
                height: _moderateScale(8 * 5),
                backgroundColor: WHITE,
                marginHorizontal: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: BASE_COLOR,
                marginVertical: _moderateScale(8),
                marginTop: _moderateScale(8 * 3),
              },
            ]}
          >
            <Text
              style={[
                stylesFont.fontNolanBold,
                { fontSize: _moderateScale(16), color: WHITE },
              ]}
            >
              Hoàn thành
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </Collapsible>

      {/* <Collapsible collapsed={currChoiceWard?.name ? true : false}> */}
      {!currChoiceWard?.name ? (
        <>
          <View
            style={{
              marginTop: _moderateScale(8 * 2),
              height: _moderateScale(8 * 4),
              backgroundColor: BG_GREY_OPACITY_5,
              paddingHorizontal: _moderateScale(8 * 2),
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...stylesFont.fontNolanBold,
                color: GREY,
                fontSize: _moderateScale(14),
              }}
            >
              {listWard?.length > 0
                ? `Phường/Xã`
                : listDistrict?.length > 0
                ? `Quận/Huyện`
                : listAllProvince?.length > 0
                ? `Tỉnh/Thành phố`
                : ``}
            </Text>
          </View>
          <ScrollView
            ref={RefScrollView}
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {listWard?.length > 0 ? (
              <>
                {listWard?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        _handleChoiceWard(item);
                      }}
                      style={styles.btnProvince}
                    >
                      <Text>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <>
                {listDistrict?.length > 0 ? (
                  <>
                    {listDistrict?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            _handleChoiceDistrict(item);
                          }}
                          style={styles.btnProvince}
                        >
                          <Text>{item?.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {listAllProvince?.length > 0 ? (
                      <>
                        {listAllProvince?.map((item, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                _handleChoiceProvince(item);
                              }}
                              style={styles.btnProvince}
                            >
                              <Text>{item?.name}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
            <View style={{ height: _moderateScale(8 * 10) }} />
          </ScrollView>
        </>
      ) : (
        <></>
      )}

      {/* </Collapsible> */}

      {/* {
                listWard?.length > 0 ?
                    <ScrollView scrollIndicatorInsets={{ right: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                        {
                            listWard?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            // _handleChoiceDistrict(item)
                                        }}
                                        style={styles.btnProvince}>
                                        <Text>
                                            {item?.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    :
                    <>
                        {
                            listDistrict?.length > 0 ?
                                <ScrollView scrollIndicatorInsets={{ right: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                                    {
                                        listDistrict?.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        _handleChoiceDistrict(item)
                                                    }}
                                                    style={styles.btnProvince}>
                                                    <Text>
                                                        {item?.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                                :
                                <>
                                    {
                                        listAllProvince?.length > 0 ?
                                            <ScrollView scrollIndicatorInsets={{ right: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                                                {
                                                    listAllProvince?.map((item, index) => {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    _handleChoiceProvince(item)
                                                                }}
                                                                style={styles.btnProvince}>
                                                                <Text>
                                                                    {item?.name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                            :
                                            <>
                                            </>
                                    }
                                </>
                        }
                    </>
            } */}
    </View>
  );
});

const styles = StyleSheet.create({
  inputCodeRef: {
    // marginRight: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    color: BLUE_FB,
  },
  btnProvince: {
    height: _moderateScale(8 * 5),
    borderBottomWidth: _moderateScale(0.5),
    width: "85%",
    justifyContent: "center",
    borderColor: BG_GREY_OPACITY_5,
  },
  btnAddMore__text: {
    ...stylesFont.fontNolanBold,
    color: BLUE_FB,
  },
  btnAddMore: {
    marginTop: _moderateScale(8 * 2),
    width: "80%",
    height: _moderateScale(8 * 4),
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: _moderateScale(8),
    borderColor: BLUE_FB,
    alignSelf: "center",
  },
  btnBank: {
    backgroundColor: BG_GREY_OPACITY_2,
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: _moderateScale((8 * 8) / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  logoBank: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    resizeMode: "contain",
  },
  inputHeader: {
    marginHorizontal: _moderateScale(8 * 3),
    marginTop: _moderateScale(8),
    backgroundColor: "rgba(244, 244, 244,0.7)",
    borderRadius: _moderateScale(8),
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    fontSize: _moderateScale(14),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_2,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default CreateNewAddress;
