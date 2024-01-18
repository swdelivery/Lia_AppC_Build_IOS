import React, { memo, useState, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { navigation } from "../../../rootNavigation";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_5,
  BG_GREY_OPACITY_9,
  BLUE,
  GREY,
  SECOND_COLOR,
  WHITE,
} from "../../Constant/Color";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import ScreenKey from "../../Navigation/ScreenKey";
import { sizeIcon, sizeLogo } from "../../Constant/Icon";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import {
  getListBranchLocation,
  createNewBooking,
  uploadModule,
} from "../../Redux/Action/BookingAction";
import CountStar from "../../Components/CountStar/index";
import { URL_ORIGINAL } from "../../Constant/Url";
import { styleElement } from "../../Constant/StyleElement";
import CalendarPickSingle from "../../Components/CalendarPickSingle/CalendarPickSingle";
import moment from "moment";
import { alertCustomNotAction } from "../../Constant/Utils";
import {
  createVideoRequest,
  getAssets,
  getAssetsGroup,
} from "../../Redux/Action/OrtherAction";
import ImagePicker from "react-native-image-crop-picker";
import TextInput from "@Components/TextInput";

const BookingView = memo((props) => {
  const dispatch = useDispatch();
  const listBranchRedux = useSelector(
    (state) => state.bookingReducer.listBranch
  );
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);
  const assetGroupRedux = useSelector(
    (state) => state.ortherReducer?.assetGroup
  );
  const assetRedux = useSelector((state) => state.ortherReducer?.asset);

  const [listImageBanking, setListImageBanking] = useState([]);
  const [showModalCalendar, setShowModalCalendar] = useState(false);
  const [description, setDescription] = useState("");

  const [branchForBooking, setBranchForBooking] = useState("");
  const [listTimeForBooking, setListTimeForBooking] = useState([
    {
      _id: "1",
      from: "09:00",
      to: "11:00",
    },
    {
      _id: "2",
      from: "11:00",
      to: "13:00",
    },
    {
      _id: "3",
      from: "13:00",
      to: "15:00",
    },
    {
      _id: "4",
      from: "15:00",
      to: "17:00",
    },
    {
      _id: "5",
      from: "17:00",
      to: "19:00",
    },
    {
      _id: "6",
      from: "19:00",
      to: "21:00",
    },
  ]);

  const [currPickDate, setCurrPickDate] = useState(moment()._d);

  const [currTimeChoice, setCurrTimeChoice] = useState({});

  const [listServiceHasChoice, setListServiceHasChoice] = useState([]);
  const [listAssetCodeChoice, setListAssetCodeChoice] = useState([]);

  const [curAssetGroup, setCurAssetGroup] = useState("");

  useEffect(() => {
    if (_isEmpty(listBranchRedux)) {
      dispatch(getListBranchLocation());
    }
    dispatch(getAssetsGroup());
    dispatch(getAssets());
  }, [listBranchRedux]);

  useEffect(() => {
    if (assetGroupRedux.length > 0) {
      setCurAssetGroup(assetGroupRedux[0]?.code);
    }
  }, [assetGroupRedux]);

  const _handleAssetChoice = (value) => {
    var tmp = [...listAssetCodeChoice];
    if (tmp.indexOf(value) > -1) {
      tmp.splice(tmp.indexOf(value), 1);
    } else {
      tmp.push(value);
    }
    setListAssetCodeChoice(tmp);
  };

  const _handleConfirmPickDate = (date) => {
    setCurrPickDate(moment(date).format());
    setShowModalCalendar(false);
  };

  const _handleConfirmCreateBooking = async () => {
    if (
      _isEmpty(listAssetCodeChoice) ||
      !currPickDate ||
      _isEmpty(currTimeChoice) ||
      _isEmpty(listImageBanking)
    ) {
      return alertCustomNotAction(`Lỗi`, `Điền đầy đủ các trường cần thiết`);
    }

    Alert.alert(
      "Xác nhận",
      `Xác nhận tạo lịch hẹn Video?`,
      [
        {
          text: "Huỷ",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            if (listImageBanking?.length > 0) {
              let listImages = listImageBanking.map((i, index) => {
                return {
                  uri: i.path,
                  width: i.width,
                  height: i.height,
                  mime: i.mime,
                  type: i.mime,
                  name: `${i.modificationDate}_${index}`,
                };
              });

              let resultUploadImage = await uploadModule({
                moduleName: "videoCallRequest",
                files: listImages,
              });
              if (resultUploadImage.isAxiosError) return;
              let listIdImageHasUpload = resultUploadImage?.data?.data.map(
                (item) => item._id
              );

              var date = new Date(currPickDate);
              let dataFetchCreateBooking = {
                appointmentDate: {
                  from: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    currTimeChoice?.from?.split(":")[0],
                    0,
                    0
                  ),
                  to: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    currTimeChoice?.to?.split(":")[0],
                    0,
                    0
                  ),
                },
                serviceCodeArr: listServiceHasChoice?.map((item) => item?.code),
                desireCodeArr: listAssetCodeChoice,
                images: listIdImageHasUpload,
                description: description,
              };

              let resultCreateNewBooking = await createVideoRequest(
                dataFetchCreateBooking
              );
              if (resultCreateNewBooking?.isAxiosError) return;

              _clearAllState();
              // navigation.navigate(ScreenKey.BOOKING_MAIN, { keyGoBack: "HOME" })
              navigation.navigate("MainTab");
            } else {
              var date = new Date(currPickDate);
              let dataFetchCreateBooking = {
                appointmentDate: {
                  from: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    currTimeChoice?.from?.split(":")[0],
                    0,
                    0
                  ),
                  to: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    currTimeChoice?.to?.split(":")[0],
                    0,
                    0
                  ),
                },
                serviceCodeArr: listServiceHasChoice?.map((item) => item?.code),
                desireCodeArr: listAssetCodeChoice,
                description: description,
              };

              let resultCreateNewBooking = await createVideoRequest(
                dataFetchCreateBooking
              );
              if (resultCreateNewBooking?.isAxiosError) return;

              _clearAllState();
              navigation.navigate("MainTab");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const _clearAllState = () => {
    setListAssetCodeChoice([]);
    setCurrTimeChoice({});
    setListServiceHasChoice([]);
    setCurrPickDate(null);
  };

  const _handlePickImage = async () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 6,
      mediaType: "photo",
      // cropping:true,
      compressImageQuality: 0.5,
      compressImageMaxWidth: 700,
      // compressVideoPreset:'LowQuality'
    })
      .then(async (images) => {
        setListImageBanking((old) => [...old, ...images]);
      })
      .catch((e) => {});
  };

  return (
    <>
      <CalendarPickSingle
        confirm={_handleConfirmPickDate}
        setShowModalCalendar={(flag) => {
          setShowModalCalendar(flag);
        }}
        show={showModalCalendar}
      />

      <View
        style={{
          paddingHorizontal: _moderateScale(8 * 3),
          marginTop: _moderateScale(8 * 0),
        }}
      >
        <Text
          style={{
            ...stylesFont.fontNolanBold,
            fontSize: _moderateScale(16),
            color: Color.BLACK_OPACITY_8,
          }}
        >
          Thời gian hẹn{" "}
          {
            <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>
              *
            </Text>
          }
        </Text>

        <View
          style={[
            styleElement.rowAliCenter,
            {
              justifyContent: "space-between",
              marginTop: _moderateScale(8 * 2),
            },
          ]}
        >
          {moment(new Date()).isSame(currPickDate, "day") ? (
            <TouchableOpacity
              onPress={() => {
                setCurrPickDate(moment()._d);
              }}
              style={[styles.overBtnCalendar]}
            >
              <View
                style={[
                  styles.overBtnCalendar__month,
                  { backgroundColor: SECOND_COLOR },
                ]}
              >
                <Text
                  style={[
                    styles.overBtnCalendar__month__text1,
                    { color: WHITE, fontSize: _moderateScale(14) },
                  ]}
                >
                  Thg {moment(new Date()).format("MM")}
                </Text>
                <Text
                  style={[
                    styles.overBtnCalendar__month__text2,
                    { color: WHITE, fontSize: _moderateScale(16) },
                  ]}
                >
                  {moment(new Date()).format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  {
                    marginTop: _moderateScale(4),
                    color: SECOND_COLOR,
                    ...stylesFont.fontNolanBold,
                  },
                ]}
              >
                Hôm nay
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setCurrPickDate(moment()._d);
              }}
              style={[styles.overBtnCalendar]}
            >
              <View style={styles.overBtnCalendar__month}>
                <Text style={styles.overBtnCalendar__month__text1}>
                  Thg {moment(new Date()).format("MM")}
                </Text>
                <Text style={styles.overBtnCalendar__month__text2}>
                  {moment(new Date()).format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  { marginTop: _moderateScale(4) },
                ]}
              >
                Hôm nay
              </Text>
            </TouchableOpacity>
          )}

          {moment().add(1, "days").isSame(currPickDate, "day") ? (
            <TouchableOpacity
              onPress={() => {
                setCurrPickDate(moment().add(1, "days")._d);
              }}
              style={[styles.overBtnCalendar]}
            >
              <View
                style={[
                  styles.overBtnCalendar__month,
                  { backgroundColor: SECOND_COLOR },
                ]}
              >
                <Text
                  style={[
                    styles.overBtnCalendar__month__text1,
                    { color: WHITE, fontSize: _moderateScale(14) },
                  ]}
                >
                  Thg {moment().add(1, "days").format("MM")}
                </Text>
                <Text
                  style={[
                    styles.overBtnCalendar__month__text2,
                    { color: WHITE, fontSize: _moderateScale(16) },
                  ]}
                >
                  {moment().add(1, "days").format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  {
                    marginTop: _moderateScale(4),
                    color: SECOND_COLOR,
                    ...stylesFont.fontNolanBold,
                  },
                ]}
              >
                Ngày mai
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setCurrPickDate(moment().add(1, "days")._d);
              }}
              style={[styles.overBtnCalendar]}
            >
              <View style={styles.overBtnCalendar__month}>
                <Text style={styles.overBtnCalendar__month__text1}>
                  Thg {moment().add(1, "days").format("MM")}
                </Text>
                <Text style={styles.overBtnCalendar__month__text2}>
                  {moment().add(1, "days").format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  { marginTop: _moderateScale(4) },
                ]}
              >
                Ngày mai
              </Text>
            </TouchableOpacity>
          )}

          {moment().add(2, "days").isSame(currPickDate, "day") ? (
            <TouchableOpacity
              onPress={() => {
                setCurrPickDate(moment().add(2, "days")._d);
              }}
              style={[styles.overBtnCalendar]}
            >
              <View
                style={[
                  styles.overBtnCalendar__month,
                  { backgroundColor: SECOND_COLOR },
                ]}
              >
                <Text
                  style={[
                    styles.overBtnCalendar__month__text1,
                    { color: WHITE, fontSize: _moderateScale(14) },
                  ]}
                >
                  Thg {moment().add(2, "days").format("MM")}
                </Text>
                <Text
                  style={[
                    styles.overBtnCalendar__month__text2,
                    { color: WHITE, fontSize: _moderateScale(16) },
                  ]}
                >
                  {moment().add(2, "days").format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  {
                    marginTop: _moderateScale(4),
                    color: SECOND_COLOR,
                    ...stylesFont.fontNolanBold,
                  },
                ]}
              >
                Ngày kia
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setCurrPickDate(moment().add(2, "days")._d);
              }}
              style={[styles.overBtnCalendar]}
            >
              <View style={styles.overBtnCalendar__month}>
                <Text style={styles.overBtnCalendar__month__text1}>
                  Thg {moment().add(2, "days").format("MM")}
                </Text>
                <Text style={styles.overBtnCalendar__month__text2}>
                  {moment().add(2, "days").format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  { marginTop: _moderateScale(4) },
                ]}
              >
                Ngày kia
              </Text>
            </TouchableOpacity>
          )}

          {currPickDate &&
          !moment(new Date()).isSame(currPickDate, "day") &&
          !moment().add(1, "days").isSame(currPickDate, "day") &&
          !moment().add(2, "days").isSame(currPickDate, "day") ? (
            <TouchableOpacity style={styles.overBtnCalendar}>
              <View
                style={[
                  styles.overBtnCalendar__month,
                  { backgroundColor: SECOND_COLOR },
                ]}
              >
                <Text
                  style={[
                    styles.overBtnCalendar__month__text1,
                    { color: WHITE, fontSize: _moderateScale(14) },
                  ]}
                >
                  Thg {moment(currPickDate).format("MM")}
                </Text>
                <Text
                  style={[
                    styles.overBtnCalendar__month__text2,
                    {
                      color: WHITE,
                      fontSize: _moderateScale(16),
                      ...stylesFont.fontNolanBold,
                    },
                  ]}
                >
                  {moment(currPickDate).format("DD")}
                </Text>
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  {
                    marginTop: _moderateScale(4),
                    color: SECOND_COLOR,
                    ...stylesFont.fontNolanBold,
                  },
                ]}
              >
                Ngày khác
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setShowModalCalendar(true);
              }}
              style={styles.overBtnCalendar}
            >
              <View style={styles.overBtnCalendar__month}>
                <Image
                  style={sizeIcon.md}
                  source={require("../../NewIcon/plusGrey.png")}
                />
              </View>
              <Text
                style={[
                  styles.overBtnCalendar__month__text1,
                  { marginTop: _moderateScale(4) },
                ]}
              >
                Ngày khác
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: _moderateScale(8 * 2),
          marginTop: _moderateScale(8 * 2),
        }}
      >
        <View style={[styles.listTime]}>
          {listTimeForBooking?.map((item, index) => {
            if (item?._id == currTimeChoice?._id) {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.itemTime, styles.itemTimeActive]}
                >
                  <Text style={[styles.titTime, styles.titTimeActive]}>
                    {item?.from} - {item?.to}
                  </Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                onPress={() => setCurrTimeChoice(item)}
                key={index}
                style={[styles.itemTime]}
              >
                <Text style={[styles.titTime]}>
                  {item?.from} - {item?.to}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: _moderateScale(8 * 3),
          marginTop: _moderateScale(8 * 3),
        }}
      >
        <Text
          style={{
            ...stylesFont.fontNolanBold,
            fontSize: _moderateScale(16),
            color: Color.BLACK_OPACITY_8,
          }}
        >
          Hình ảnh{" "}
          {
            <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>
              *
            </Text>
          }
        </Text>
      </View>

      <View style={{ flex: 1, marginTop: _moderateScale(0) }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: _moderateScale(8 * 1),
              paddingTop: _moderateScale(8 * 2),
              paddingHorizontal: _moderateScale(8 * 3),
              alignItems: "center",
            }}
          >
            {listImageBanking?.map((item, index) => {
              return (
                <View
                  style={{
                    width: _moderateScale(180),
                    height: _moderateScale(180),
                    borderWidth: 0.5,
                    borderColor: "transparent",
                    marginRight: _moderateScale(8 * 2),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setListImageBanking((old) =>
                        old.filter(
                          (itemFilter) => itemFilter?.path !== item?.path
                        )
                      );
                    }}
                    hitSlop={styleElement.hitslopSm}
                    style={{
                      backgroundColor: Color.RED,
                      width: _moderateScale(8 * 2.5),
                      height: _moderateScale(8 * 2.5),
                      borderRadius: _moderateScale((8 * 2.5) / 2),
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      zIndex: 100,
                      right: 0,
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    <View
                      style={{
                        width: _moderateScale(8 * 1.25),
                        height: _moderateScale(2.5),
                        backgroundColor: WHITE,
                      }}
                    />
                  </TouchableOpacity>

                  <Image
                    style={{
                      width: _moderateScale(172),
                      height: _moderateScale(172),
                      borderRadius: _moderateScale(8),
                      bottom: 0,
                      left: 0,
                      zIndex: -1,
                      position: "absolute",
                      borderWidth: _moderateScale(1),
                      borderColor: BG_GREY_OPACITY_5,
                    }}
                    source={{ uri: item?.path }}
                  />
                </View>
              );
            })}
            <TouchableOpacity
              onPress={_handlePickImage}
              style={[
                styles.itemService,
                {
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Image
                style={sizeIcon.md}
                source={require("../../NewIcon/plusGrey.png")}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          paddingHorizontal: _moderateScale(8 * 3),
          marginTop: _moderateScale(8 * 2),
        }}
      >
        <Text
          style={{
            ...stylesFont.fontNolanBold,
            fontSize: _moderateScale(16),
            color: Color.BLACK_OPACITY_8,
          }}
        >
          Mong muốn{" "}
          {
            <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>
              *
            </Text>
          }
        </Text>
      </View>

      <View
        style={[
          { marginTop: _moderateScale(8 * 2), paddingLeft: _moderateScale(8) },
        ]}
      >
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={[styles.cateAssetGroup]}>
            {assetGroupRedux?.map((res, ind) => {
              return (
                <TouchableOpacity
                  onPress={() => setCurAssetGroup(res?.code)}
                  style={[
                    styles.itemAssetGroup,
                    curAssetGroup === res.code && styles.itemAssetGroupActive,
                  ]}
                  key={ind}
                >
                  <Text
                    style={[
                      styles.itemAssetGroupText,
                      curAssetGroup === res.code &&
                        styles.itemAssetGroupTextActive,
                    ]}
                  >
                    {res?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={[
            styles.cateAsset,
            {
              marginTop: _moderateScale(8 * 1),
              paddingLeft: _moderateScale(8),
              alignItems: "flex-start",
            },
          ]}
        >
          {assetRedux?.map((res, ind) => {
            return res?.codeGroup.indexOf(curAssetGroup) > -1 ? (
              <TouchableOpacity
                onPress={() => _handleAssetChoice(res?.code)}
                style={[
                  styles.itemAsset,
                  listAssetCodeChoice.indexOf(res.code) > -1 &&
                    styles.itemAssetActive,
                ]}
                key={ind}
              >
                <View style={[styles.assetTextContain]}>
                  {listAssetCodeChoice.indexOf(res.code) > -1 ? (
                    <Image
                      style={[sizeIcon.md, styles.checkIco]}
                      source={require("../../NewIcon/acheck.png")}
                    />
                  ) : (
                    <Image
                      style={[sizeIcon.md, styles.checkIco]}
                      source={require("../../NewIcon/icheck.png")}
                    />
                  )}

                  <Text
                    style={[
                      styles.itemAssetText,
                      listAssetCodeChoice.indexOf(res.code) > -1 &&
                        styles.itemAssetTextActive,
                    ]}
                  >
                    {" "}
                    {res?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            );
          })}
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: _moderateScale(8 * 3),
          marginTop: _moderateScale(8 * 0),
        }}
      >
        <Text
          style={{
            ...stylesFont.fontNolanBold,
            fontSize: _moderateScale(16),
            color: Color.BLACK_OPACITY_8,
          }}
        >
          Ghi chú
        </Text>

        <View
          style={{
            minHeight: _moderateScale(8 * 10),
            backgroundColor: Color.BG_GREY_OPACITY_2,
            marginTop: _moderateScale(8 * 2),
            borderRadius: _moderateScale(8),
            padding: _moderateScale(8),
            paddingHorizontal: _moderateScale(8 * 1.5),
          }}
        >
          <TextInput
            onChangeText={(content) => {
              setDescription(content);
            }}
            value={description}
            placeholder={"vd: Tôi muốn xử lý da dư"}
            multiline
            style={{
              flex: 1,
              fontSize: _moderateScale(14),
            }}
          />
        </View>
      </View>

      <View style={{ height: 8 * 3 }} />

      {/* <View style={[styles.containTitle]}>
                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                    Mong muốn: {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>
            </View>
            <View style={[styles.rowContent, { flexDirection: 'column' }]}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={[styles.cateAssetGroup]}>
                        {assetGroupRedux?.map((res, ind) => {
                            return <TouchableOpacity
                                onPress={() => setCurAssetGroup(res?.code)}
                                style={[styles.itemAssetGroup,
                                curAssetGroup === res.code && styles.itemAssetGroupActive
                                ]} key={ind}>
                                <Text style={[styles.itemAssetGroupText,
                                curAssetGroup === res.code && styles.itemAssetGroupTextActive
                                ]}>{res?.name}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                </ScrollView>
                <View style={[styles.cateAsset]}>
                    {assetRedux?.map((res, ind) => {
                        return res?.codeGroup.indexOf(curAssetGroup) > -1 ?
                            <TouchableOpacity
                                onPress={() => _handleAssetChoice(res?.code)}
                                style={[styles.itemAsset,
                                listAssetCodeChoice.indexOf(res.code) > -1 && styles.itemAssetActive
                                ]}
                                key={ind}>
                                <View style={[styles.assetTextContain]}>
                                    {
                                        listAssetCodeChoice.indexOf(res.code) > -1 ?
                                            <Image style={[sizeIcon.xs, styles.checkIco]} source={require('../../Icon/a_check.png')} /> :
                                            <Image style={[sizeIcon.xs, styles.checkIco]} source={require('../../Icon/i_check.png')} />
                                    }

                                    <Text style={[styles.itemAssetText,
                                    listAssetCodeChoice.indexOf(res.code) > -1 && styles.itemAssetTextActive
                                    ]}> {res?.name}</Text>
                                </View>
                            </TouchableOpacity> :
                            <></>
                    })}
                </View>
            </View> */}

      <TouchableOpacity
        onPress={() => {
          _handleConfirmCreateBooking();
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
            // marginBottom: getBottomSpace() + _moderateScale(8)
          },
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            { fontSize: _moderateScale(16), color: WHITE },
          ]}
        >
          Gửi yêu cầu
        </Text>
      </TouchableOpacity>

      {/* <View style={{ width: _moderateScale(340), alignSelf: 'center', marginBottom: 12 }}>
                <Button.ButtonPrimary pressAction={() => _handleConfirmCreateBooking()}
                    text={`Gửi yêu cầu`} height={40} />
            </View> */}

      <View style={{ height: 50 }} />
    </>
  );
});

const styles = StyleSheet.create({
  btnCheckCode__text: {
    fontSize: _moderateScale(14),
    color: WHITE,
  },
  btnCheckCode: {
    backgroundColor: Color.BLUE_FB,
    height: "100%",
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "center",
  },
  inputCodeRef: {
    marginRight: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    color: Color.BLACK_OPACITY_8,
  },
  containTitle: {
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleMain: {
    fontSize: _moderateScale(16),
    color: GREY,
    marginLeft: _moderateScale(8 * 2),
  },
  rowContent: {
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
    marginTop: _moderateScale(8 * 3),
    marginBottom: _moderateScale(8 * 3),
  },
  listBranch: {
    flexDirection: "row",
  },
  itemBranch: {
    width: _moderateScale(150),
    height: _moderateScale(80),
    marginRight: _moderateScale(12),
    backgroundColor: BG_GREY_OPACITY_5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: _moderateScale(8),
    padding: _moderateScale(12),
    paddingHorizontal: _moderateScale(20),
  },
  itemBranchActive: {
    backgroundColor: SECOND_COLOR,
  },
  titItemBranch: {
    color: WHITE,
    fontSize: _moderateScale(18),
    ...stylesFont.fontNolan500,
  },
  listTime: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: _moderateScale(4),
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8),
    paddingBottom: _moderateScale(16),
  },
  itemTime: {
    width: _moderateScale(105),
    marginTop: _moderateScale(8),
    borderColor: BG_GREY_OPACITY_9,
    alignItems: "center",
    padding: _moderateScale(4),
    borderRadius: 4,
    borderWidth: 0.5,
  },
  itemTimeActive: {
    borderWidth: 0,
    backgroundColor: SECOND_COLOR,
  },
  titTime: {
    color: BG_GREY_OPACITY_9,
    fontSize: _moderateScale(14),
    ...stylesFont.fontNolanBold,
  },
  titTimeActive: {
    color: WHITE,
  },
  listService: {
    flexDirection: "row",
    // paddingBottom: _moderateScale(24),
    paddingHorizontal: _moderateScale(12),
    alignItems: "center",
  },
  imgService: {
    width: "100%",
    height: _moderateScale(100),
    borderTopLeftRadius: _moderateScale(8),
    borderTopRightRadius: _moderateScale(8),
  },
  itemService: {
    width: _moderateScale(90),
    height: _moderateScale(100),
    marginRight: _moderateScale(8 * 2),
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: _moderateScale(8),
    borderWidth: 0.5,
    borderColor: BG_GREY_OPACITY_5,
    shadowColor: BG_GREY_OPACITY_9,
    backgroundColor: WHITE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  itemServiceAdd: {
    width: _moderateScale(80),
    height: _moderateScale(80),
    marginRight: _moderateScale(8 * 2),
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: _moderateScale(8),
    borderWidth: 0.5,
    borderColor: BG_GREY_OPACITY_5,
    shadowColor: BG_GREY_OPACITY_9,
    backgroundColor: WHITE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  bottomService: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  priceService: {
    backgroundColor: SECOND_COLOR,
    alignItems: "center",
    paddingVertical: _moderateScale(2),
    borderRadius: _moderateScale(4),
    position: "absolute",
    top: _moderateScale(-8),
    right: 0,
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
  nameService: {
    flexDirection: "row",
    marginTop: _moderateScale(16),
    paddingHorizontal: _moderateScale(16),
  },
  rateService: {
    flexDirection: "row",
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(16),
  },
  chooseService: {
    flexDirection: "row",
    width: 160,
    alignSelf: "center",
    backgroundColor: WHITE,
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(16),
    paddingVertical: _moderateScale(4),
    borderRadius: _moderateScale(20),
    justifyContent: "center",
    borderColor: SECOND_COLOR,
    borderWidth: 1,
  },
  chooseServiceActive: {
    backgroundColor: SECOND_COLOR,
    borderWidth: 0,
  },
  txtName: {
    color: SECOND_COLOR,
    fontSize: _moderateScale(14),
  },
  txtPrice: {
    color: WHITE,
    fontSize: _moderateScale(14),
  },
  txtBtn: {
    color: SECOND_COLOR,
  },
  txtActive: {
    color: WHITE,
  },
  input: {
    width: _widthScale(300),
    color: Color.GREY,
    padding: _moderateScale(12),
    fontSize: _widthScale(14),
    marginHorizontal: _moderateScale(16),
    maxHeight: _moderateScale(40),
    padding: _moderateScale(8),
    borderBottomWidth: 1,
    borderColor: SECOND_COLOR,
  },
  btnAddImage: {
    marginHorizontal: _moderateScale(8),
    borderRadius: _moderateScale(8),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: _moderateScale(8),
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 10),
    borderStyle: "dashed",
  },
  cateAssetGroup: {
    paddingHorizontal: _moderateScale(8 * 2),
    flexDirection: "row",
  },
  itemAssetGroup: {
    borderWidth: 0.5,
    marginRight: _moderateScale(8),
    borderRadius: _moderateScale(8),
    // minWidth: _moderateScale(80),
    borderColor: GREY,
    alignItems: "center",
    padding: _moderateScale(2),
    paddingHorizontal: _moderateScale(8),
  },
  itemAssetGroupActive: {
    borderColor: SECOND_COLOR,
    backgroundColor: SECOND_COLOR,
  },
  itemAssetGroupText: {
    color: GREY,
  },
  itemAssetGroupTextActive: {
    color: WHITE,
  },
  cateAsset: {
    marginHorizontal: _moderateScale(8 * 2),
    marginVertical: _moderateScale(8 * 2),
  },
  itemAsset: {
    // alignSelf: 'flex-start',
    // width:'100%',
    paddingVertical: _moderateScale(8),
  },
  assetTextContain: {
    justifyContent: "center",
    flexDirection: "row",
  },
  itemAssetText: {
    color: Color.GREY,
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(14),
  },
  itemAssetTextActive: {
    color: BASE_COLOR,
    ...stylesFont.fontNolanBold,
    fontSize: _moderateScale(14),
  },
  checkIco: {
    marginRight: _moderateScale(4),
  },
  overBtnCalendar__month__text2: {
    ...stylesFont.fontNolanBold,
    fontSize: _moderateScale(14),
    color: GREY,
  },
  overBtnCalendar__month__text1: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(12),
    color: GREY,
  },
  overBtnCalendar__month: {
    height: _moderateScale(8 * 8),
    width: _moderateScale(8 * 8),
    borderRadius: _moderateScale(8),
    backgroundColor: Color.BG_GREY_OPACITY_2,
    justifyContent: "center",
    alignItems: "center",
  },
  overBtnCalendar: {
    // borderWidth: 1,
    width: _moderateScale(8 * 8),
    alignItems: "center",
  },
  btnCheckCode__text: {
    fontSize: _moderateScale(14),
    color: WHITE,
  },
  btnCheckCode: {
    backgroundColor: Color.BLUE_FB,
    height: "100%",
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "center",
  },
  inputCodeRef: {
    // marginRight: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    color: Color.BLACK_OPACITY_8,
    color: Color.BLUE_FB,
  },
  containTitle: {
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleMain: {
    fontSize: _moderateScale(16),
    color: GREY,
    marginLeft: _moderateScale(8 * 2),
  },
  rowContent: {
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
    marginTop: _moderateScale(8 * 3),
    marginBottom: _moderateScale(8 * 5),
  },
  listBranch: {
    flexDirection: "row",
  },
  itemBranch: {
    width: _moderateScale(150),
    height: _moderateScale(80),
    marginRight: _moderateScale(12),
    backgroundColor: BG_GREY_OPACITY_5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: _moderateScale(8),
    padding: _moderateScale(12),
    paddingHorizontal: _moderateScale(20),
  },
  itemBranchActive: {
    backgroundColor: SECOND_COLOR,
  },
  titItemBranch: {
    color: WHITE,
    fontSize: _moderateScale(18),
    ...stylesFont.fontNolan500,
  },
  listTime: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: _moderateScale(4),
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8),
    // paddingBottom: _moderateScale(16),
  },
  itemTime: {
    width: _moderateScale(105),
    marginTop: _moderateScale(8),
    borderColor: BG_GREY_OPACITY_9,
    alignItems: "center",
    padding: _moderateScale(4),
    borderRadius: 4,
    borderWidth: 0.5,
  },
  itemTimeActive: {
    borderWidth: 0,
    backgroundColor: SECOND_COLOR,
  },
  titTime: {
    color: BG_GREY_OPACITY_9,
    fontSize: _moderateScale(14),
    ...stylesFont.fontNolanBold,
  },
  titTimeActive: {
    color: WHITE,
  },
  listService: {
    flexDirection: "row",
    paddingVertical: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 3),
    alignItems: "center",
  },
  imgService: {
    width: "100%",
    height: _moderateScale(100),
    borderTopLeftRadius: _moderateScale(8),
    borderTopRightRadius: _moderateScale(8),
  },
  itemService: {
    width: _moderateScale(90),
    height: _moderateScale(100),
    marginRight: _moderateScale(8 * 2),
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: _moderateScale(8),
    borderWidth: 0.5,
    borderColor: BG_GREY_OPACITY_5,
    shadowColor: BG_GREY_OPACITY_9,
    backgroundColor: WHITE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  bottomService: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  priceService: {
    backgroundColor: SECOND_COLOR,
    alignItems: "center",
    paddingVertical: _moderateScale(2),
    borderRadius: _moderateScale(4),
    position: "absolute",
    top: _moderateScale(-8),
    right: 0,
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
  nameService: {
    flexDirection: "row",
    marginTop: _moderateScale(16),
    paddingHorizontal: _moderateScale(16),
  },
  rateService: {
    flexDirection: "row",
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(16),
  },
  chooseService: {
    flexDirection: "row",
    width: 160,
    alignSelf: "center",
    backgroundColor: WHITE,
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(16),
    paddingVertical: _moderateScale(4),
    borderRadius: _moderateScale(20),
    justifyContent: "center",
    borderColor: SECOND_COLOR,
    borderWidth: 1,
  },
  chooseServiceActive: {
    backgroundColor: Color.THIRD_COLOR,
    borderWidth: 0,
  },
  txtName: {
    color: SECOND_COLOR,
    fontSize: _moderateScale(14),
  },
  txtPrice: {
    color: WHITE,
    fontSize: _moderateScale(14),
  },
  txtBtn: {
    color: SECOND_COLOR,
  },
  txtActive: {
    color: WHITE,
  },
  input: {
    width: _widthScale(300),
    color: Color.GREY,
    fontSize: _widthScale(14),
    marginHorizontal: _moderateScale(16),
    // maxHeight: _moderateScale(40),
    // backgroundColor:'red',
    padding: _moderateScale(8),
    // borderWidth:1,
    borderBottomWidth: 1,
    borderColor: SECOND_COLOR,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
};

export default BookingView;
