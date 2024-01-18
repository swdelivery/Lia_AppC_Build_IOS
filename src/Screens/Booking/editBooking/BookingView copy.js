import React, { memo, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { navigation } from "../../../../rootNavigation";
import {
  BG_GREY_OPACITY_5,
  BG_GREY_OPACITY_9,
  GREY,
  SECOND_COLOR,
  WHITE,
} from "../../../Constant/Color";
import * as Color from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import ScreenKey from "../../../Navigation/ScreenKey";
import { sizeIcon } from "../../../Constant/Icon";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import {
  getListBranchLocation,
  createNewBooking,
  getListDoctorLocation,
} from "../../../Redux/Action/BookingAction";
import CountStar from "../../../Components/CountStar/index";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { styleElement } from "../../../Constant/StyleElement";
import CalendarPickSingle from "../../../Components/CalendarPickSingle/CalendarPickSingle";
import moment from "moment";
import { alertCustomNotAction } from "../../../Constant/Utils";
import TextInput from "@Components/TextInput";

const BookingView = memo((props) => {
  const dispatch = useDispatch();
  const listBranchRedux = useSelector(
    (state) => state?.bookingReducer?.listBranch
  );

  const listDoctorRedux = useSelector(
    (state) => state?.bookingReducer?.listDoctor
  );
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);

  const [height, setHeight] = useState(0);

  const [showModalCalendar, setShowModalCalendar] = useState(false);

  const [branchForBooking, setBranchForBooking] = useState("");
  const [doctorForBooking, setDoctorForBooking] = useState(props?.doctorCode);

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

  const [currPickDate, setCurrPickDate] = useState(null);

  const [currTimeChoice, setCurrTimeChoice] = useState({});

  const [listServiceHasChoice, setListServiceHasChoice] = useState([]);

  const [codeRef, setCodeRef] = useState(props?.refCode);

  const [description, setDescription] = useState("");

  const [mainDoctor, setMainDoctor] = useState("");

  useEffect(() => {
    if (_isEmpty(listBranchRedux)) {
      dispatch(getListBranchLocation());
    }
  }, [listBranchRedux]);

  useEffect(() => {
    if (_isEmpty(listDoctorRedux)) {
      dispatch(getListDoctorLocation());
    }
  }, [listDoctorRedux]);

  useEffect(() => {
    const tmp = listDoctorRedux.find((item) => item.code === doctorForBooking);
    setMainDoctor(tmp);
    setBranchForBooking(tmp?.branch?.code);
  }, [doctorForBooking]);

  const _handleConfirmPickDate = (date) => {
    setCurrPickDate(moment(date).format());
    setShowModalCalendar(false);
  };

  const _handleConfirmCreateBooking = async () => {
    console.log({
      codeRef,
      branchForBooking,
      currTimeChoice,
      listServiceHasChoice,
      description,
      currPickDate,
    });

    if (
      _isEmpty(branchForBooking) ||
      !currPickDate ||
      _isEmpty(currTimeChoice) ||
      _isEmpty(listServiceHasChoice)
    ) {
      return alertCustomNotAction(`Lỗi`, `Điền đầy đủ các trường cần thiết`);
    }

    let dataFetchCreateBooking = {
      appointmentDate: {
        date: currPickDate,
        from: {
          hour: Number(currTimeChoice?.from?.split(":")[0]),
          minute: Number(currTimeChoice?.from?.split(":")[1]),
        },
        to: {
          hour: Number(currTimeChoice?.to?.split(":")[0]),
          minute: Number(currTimeChoice?.to?.split(":")[1]),
        },
      },
      branchCode: branchForBooking,
      serviceNeedCareCodeArr: listServiceHasChoice?.map((item) => item?.code),
      partnerPhone: {
        nationCode: infoUserRedux?.phone[0]?.nationCode,
        phoneNumber: infoUserRedux?.phone[0]?.phoneNumber,
      },
      assignedDoctorCodeArr: [doctorForBooking],
      description: description,
    };

    console.log({ dataFetchCreateBooking });

    let resultCreateNewBooking = await createNewBooking(dataFetchCreateBooking);
    if (resultCreateNewBooking?.isAxiosError) return;

    navigation.navigate(ScreenKey.LIST_BOOKING, { keyGoBack: "MainTab" });

    _clearAllState();
  };

  const _clearAllState = () => {
    setCodeRef("");
    setBranchForBooking("");
    setCurrTimeChoice({});
    setListServiceHasChoice([]);
    setDescription("");
    setCurrPickDate(null);
  };

  return (
    <>
      <CalendarPickSingle
        minDate={new Date()}
        confirm={_handleConfirmPickDate}
        setShowModalCalendar={(flag) => {
          setShowModalCalendar(flag);
        }}
        show={showModalCalendar}
      />

      <View style={[styles.containTitle]}>
        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
          Mã giới thiệu
        </Text>
      </View>
      <View
        style={[
          styleElement.rowAliCenter,
          {
            paddingHorizontal: _moderateScale(8 * 2),
            flex: 1,
            marginTop: _moderateScale(24),
          },
        ]}
      >
        <TextInput
          onChangeText={(e) => setCodeRef(e)}
          value={codeRef}
          style={[styles.inputCodeRef, { flex: 1 }]}
          placeholder={"vd: AF209BHN"}
        />
        {/* <TouchableOpacity style={styles.btnCheckCode}>
                    <Text style={[stylesFont.fontNolan500, styles.btnCheckCode__text]}>
                        Kiểm tra
                    </Text>
                </TouchableOpacity> */}
      </View>

      <View style={[styles.containTitle, { marginTop: _moderateScale(32) }]}>
        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
          Bác sĩ{" "}
          {
            <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>
              *
            </Text>
          }
        </Text>
      </View>

      <View
        style={[
          styles.rowContent,
          { marginBottom: _moderateScale(16), flexDirection: "column" },
        ]}
      >
        <ScrollView
          // contentContainerStyle={{flex: 1 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={[styles.listBranch]}>
            {listDoctorRedux?.map((item, index) => {
              if (item?.code == doctorForBooking) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.itemBranch,
                      branchForBooking,
                      styles.itemBranchActive,
                    ]}
                  >
                    <Text
                      style={[styles.titItemBranch, stylesFont.fontNolanBold]}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }

              // return (
              //     <TouchableOpacity
              //         key={index}
              //         onPress={() => setBranchForBooking(item?.code)}
              //         style={[styles.itemBranch, branchForBooking]}>
              //         <Text style={[styles.titItemBranch, { color: Color.GREY }]}>{item?.name}</Text>
              //     </TouchableOpacity>
              // )
            })}

            {/* <TouchableOpacity style={[styles.itemBranch]}>
                            <Text style={[styles.titItemBranch]}>Chi nhánh Gò Vấp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.itemBranch]}>
                            <Text style={[styles.titItemBranch]}>Chi nhánh Cần Thơ</Text>
                        </TouchableOpacity> */}
          </View>
        </ScrollView>
        <View
          style={[
            styleElement.rowAliCenter,
            {
              marginHorizontal: _moderateScale(8 * 2),
              marginTop: _moderateScale(16),
              marginBottom: _moderateScale(4),
              flexDirection: "row",
              flex: 1,
            },
          ]}
        >
          <Image
            style={[sizeIcon.xxs, styles.iCon]}
            source={require("../../../Icon/a_call.png")}
          />
          <Text
            style={[
              stylesFont.fontNolan500,
              {
                opacity: 1,
                fontStyle: "italic",
                color: Color.GREY_FOR_TITLE,
                paddingLeft: _moderateScale(4),
              },
            ]}
          >
            {`${mainDoctor?.branch?.phone} | ${mainDoctor?.branch?.name}`}
          </Text>
        </View>
        <View
          style={[
            styleElement.rowAliCenter,
            {
              marginHorizontal: _moderateScale(8 * 2),
              marginBottom: _moderateScale(8 * 2),
              flexDirection: "row",
              flex: 1,
            },
          ]}
        >
          <Image
            style={[sizeIcon.xs, styles.iCon]}
            source={require("../../../Icon/a_address.png")}
          />
          <Text
            style={[
              stylesFont.fontNolan500,
              {
                opacity: 1,
                fontStyle: "italic",
                color: Color.GREY_FOR_TITLE,
                paddingLeft: _moderateScale(4),
              },
            ]}
          >
            {`${mainDoctor?.branch?.address}`}
          </Text>
        </View>
      </View>

      <View style={[styles.containTitle]}>
        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
          Thời gian hẹn{" "}
          {
            <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>
              *
            </Text>
          }
        </Text>
        {/* <TouchableOpacity onPress={() => {
                    setShowModalCalendar(true)
                }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.BLUE_FB }]}>
                        {
                            currPickDate ?
                                moment(currPickDate).format('DD/MM/YYYY')
                                :
                                `Chọn ngày`
                        }
                    </Text>
                </TouchableOpacity> */}
      </View>

      <View
        style={[
          styles.rowContent,
          { flexDirection: "column", marginTop: _moderateScale(16) },
        ]}
      >
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            alignItems: "center",
            paddingVertical: _moderateScale(6),
            marginBottom: _moderateScale(8),
            marginHorizontal: _moderateScale(8),
            borderRadius: _moderateScale(4),
            justifyContent: "center",
            backgroundColor: currPickDate ? SECOND_COLOR : WHITE,
            borderColor: currPickDate ? SECOND_COLOR : Color.BLUE_FB,
          }}
          onPress={() => {
            setShowModalCalendar(true);
          }}
        >
          <Text
            style={[
              stylesFont.fontNolanBold,
              {
                marginLeft: _moderateScale(8),
                fontSize: _moderateScale(14),
                color: currPickDate ? WHITE : Color.BLUE_FB,
              },
            ]}
          >
            {currPickDate
              ? moment(currPickDate).format("DD/MM/YYYY")
              : `Chọn ngày`}
          </Text>
        </TouchableOpacity>

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
          {/* <View style={[styles.itemTime, styles.itemTimeActive]}>
                        <Text style={[styles.titTime, styles.titTimeActive]}>
                            09:00 - 11:00
                        </Text>
                    </View> */}
        </View>
      </View>

      <View style={[styles.containTitle]}>
        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
          Dịch vụ{" "}
          {
            <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>
              *
            </Text>
          }
        </Text>
        {/* <Image
                    style={[sizeIcon.sm]}
                    source={require('../../../Image/component/rightArrow.png')} /> */}
      </View>

      <View
        style={[
          styles.rowContent,
          { marginTop: _moderateScale(8), marginBottom: _moderateScale(8 * 2) },
        ]}
      >
        <ScrollView
          // contentContainerStyle={{flex: 1 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={[styles.listService]}>
            {listServiceHasChoice?.map((item, index) => {
              return (
                <View
                  key={item?._id}
                  style={[
                    ,
                    {
                      width: _moderateScale(180),
                      paddingBottom: _moderateScale(8 * 2),
                      marginRight: _moderateScale(8 * 2),
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
                      // paddingVertical:_moderateScale(8*2)
                      // height: _moderateScale(200),
                    },
                  ]}
                >
                  <Image
                    style={[
                      styles.imgService,
                      { backgroundColor: BG_GREY_OPACITY_5 },
                    ]}
                    resizeMode="cover"
                    source={{
                      uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`,
                    }}
                  />
                  <View style={[styles.bottomService]}>
                    <View style={[styles.priceService]}>
                      <Text style={[styles.txtPrice]}>
                        {item?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </Text>
                    </View>
                    <View style={[styles.nameService]}>
                      <Text numberOfLines={1} style={[styles.txtName]}>
                        {item?.name}
                      </Text>
                    </View>
                    <View style={[styles.rateService]}>
                      <CountStar small />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setListServiceHasChoice((olds) =>
                          olds?.filter(
                            (itemFilter) => itemFilter?._id !== item?._id
                          )
                        );
                      }}
                    >
                      <View
                        style={[
                          styles.chooseService,
                          styles.chooseServiceActive,
                        ]}
                      >
                        <Text style={[styles.txtBtn, styles.txtActive]}>
                          Bỏ chọn
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING, {
                  setListServiceHasChoice,
                  listServiceHasChoice,
                });
              }}
              style={[
                styles.itemService,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderStyle: "dashed",
                },
              ]}
            >
              <Text
                style={[
                  stylesFont.fontNolan500,
                  { fontSize: _moderateScale(14), color: Color.GREY },
                ]}
              >
                Thêm
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={[styles.containTitle]}>
        <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
          Ghi chú
        </Text>
      </View>

      <View style={[styles.rowContent]}>
        <TextInput
          value={description}
          onChangeText={(content) => {
            setDescription(content);
          }}
          multiline={true}
          // numberOfLines={10}

          style={[styles.input]}
        />
      </View>
      <View
        style={{
          width: _moderateScale(340),
          alignSelf: "center",
          marginBottom: 12,
        }}
      >
        <Button.ButtonPrimary
          pressAction={() => _handleConfirmCreateBooking()}
          text={`Đặt hẹn`}
          height={40}
        />
      </View>

      <View style={{ height: 100 }} />
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
    paddingVertical: _moderateScale(24),
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
