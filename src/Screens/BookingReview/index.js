import React, { useState, memo, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GREY,
  WHITE,
  BASE_COLOR,
  RED,
  BG_GREY_OPACITY_5,
  BLACK,
  BLACK_OPACITY_8,
  BLUE_FB,
  FIFTH_COLOR,
  GREEN_SUCCESS,
} from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { sizeIcon } from "../../Constant/Icon";
import { _moderateScale } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { navigation } from "../../../rootNavigation";
import _isEmpty from "lodash/isEmpty";
import _min from "lodash/min";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  createReviewBooking,
  getBookingReviews,
} from "../../Redux/Action/BookingAction";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import TextInput from "@Components/TextInput";

const index = memo((props) => {
  const [reaction, setReaction] = useState("VERY_GOOD");
  const [indexCountStar, setIndexCountStar] = useState(5);
  const [description, setDescription] = useState("");

  const [listItem, setListItem] = useState([
    { _id: "2", code: "securityReview", name: "Bảo vệ" },
    { _id: "3", code: "receptionReview", name: "Lễ tân" },
    { _id: "4", code: "consultantReview", name: "Tư vấn viên" },
    { _id: "6", code: "csReview", name: "Chăm sóc khách hàng" },
    { _id: "7", code: "branchReview", name: "Chi nhánh" },
  ]);
  const [listItemNotGood, setListItemNotGood] = useState([]);

  const [dataForFetch, setDataForFetch] = useState({});

  useEffect(() => {
    console.log({ props });

    // _handleSetStar(5)

    if (
      props?.route?.params?.data?.bookingId &&
      props?.route?.params?.data?.hasReview
    ) {
      _getDataReview(props?.route?.params?.data);
      // alert('da review')
      // console.log({props});
    } else {
      setDataForFetch({
        ...dataForFetch,
        bookingId: props?.route?.params?.data?.bookingId,
        securityReview: {
          rating: 5,
          comment: "",
          isSelected: false,
        },
        receptionReview: {
          rating: 5,
          comment: "",
          isSelected: false,
        },
        consultantReview: {
          rating: 5,
          comment: "",
          isSelected: false,
        },
        csReview: {
          rating: 5,
          comment: "",
          isSelected: false,
        },
        branchReview: {
          rating: 5,
          comment: "",
          isSelected: false,
        },
      });
    }
  }, []);

  const _getDataReview = async (dataReviewBooking) => {
    let result = await getBookingReviews(props?.route?.params?.data?.bookingId);
    if (result?.isAxiosError) return;

    setDataForFetch(result?.data?.data[0]);
    setReaction(result?.data?.data[0]?.reaction);

    let arrayKey = [
      "securityReview",
      "receptionReview",
      "consultantReview",
      "csReview",
      "branchReview",
    ];
    let listAllStar = [];
    let descriptionFetch = "";
    let listItemNotGoodTemp = [];

    arrayKey.forEach((element) => {
      if (result?.data?.data[0][element]?.isSelected == true) {
        let itemFind = listItem?.find((item) => item?.code == element);
        listItemNotGoodTemp.push(itemFind);
      }

      if (!_isEmpty(result?.data?.data[0][element]?.comment)) {
        descriptionFetch = result?.data?.data[0][element]?.comment;
      }
      listAllStar.push(result?.data?.data[0][element]?.rating);
    });
    let minStar = _min(listAllStar);

    setIndexCountStar(Number(minStar));
    setDescription(descriptionFetch);
    setListItemNotGood(listItemNotGoodTemp);
  };

  const _handleSetStar = (star) => {
    setDataForFetch((old) => {
      return {
        ...old,
        bookingId: props?.route?.params?.data?.bookingId,
        securityReview: {
          ...old?.securityReview,
          rating: star,
        },
        receptionReview: {
          ...old?.receptionReview,
          rating: star,
        },
        consultantReview: {
          ...old?.consultantReview,
          rating: star,
        },
        csReview: {
          ...old?.csReview,
          rating: star,
        },
        branchReview: {
          ...old?.branchReview,
          rating: star,
        },
      };
    });
  };
  const _handleOnchangeText = (text) => {
    setDescription(text);
    setDataForFetch((old) => {
      return {
        ...old,
        securityReview: {
          ...old?.securityReview,
          comment: text,
        },
        receptionReview: {
          ...old?.receptionReview,
          comment: text,
        },
        consultantReview: {
          ...old?.consultantReview,
          comment: text,
        },
        csReview: {
          ...old?.csReview,
          comment: text,
        },
        branchReview: {
          ...old?.branchReview,
          comment: text,
        },
      };
    });
  };

  const _handleConfirmFeedBack = async () => {
    console.log({ dataForFetch, listItemNotGood });

    let dataForFetchTemp = { ...dataForFetch, reaction };

    if (!_isEmpty(listItemNotGood)) {
      let arrayKey = listItem?.map((item) => item?.code);
      arrayKey.forEach((element) => {
        let checkKeyExist = listItemNotGood?.find(
          (itemFind) => itemFind?.code == element
        );

        if (checkKeyExist) {
          dataForFetchTemp[element] = {
            ...dataForFetchTemp[element],
            isSelected: true,
          };
        }

        if (!checkKeyExist) {
          dataForFetchTemp[element] = {
            comment: "",
            rating: 5,
            isSelected: false,
          };
        }
      });
    }

    console.log({ dataForFetchTemp });

    let resultCreateReviewTreatment = await createReviewBooking(
      dataForFetchTemp
    );
    if (resultCreateReviewTreatment?.isAxiosError) return;

    if (props?.route?.params?._getBookingDataById) {
      props?.route?.params?._getBookingDataById();
    }
    if (props?.route?.params?._getBookingReviews) {
      props?.route?.params?._getBookingReviews();
    }

    navigation.goBack();
  };

  const _handleSetReaction = (starCount) => {
    console.log({ starCount });
    switch (starCount) {
      case 1:
        setReaction("VERY_BAD");
        break;
      case 2:
        setReaction("BAD");
        break;
      case 3:
        setReaction("NOT_GOOD");
        break;
      case 4:
        setReaction("GOOD");
        break;
      case 5:
        setReaction("VERY_GOOD");
        break;

      default:
        break;
    }
  };

  const renderGif = (indexCountStar) => {
    switch (indexCountStar) {
      case 1:
        return (
          <Image style={styles.gif} source={require("../../Gif/1-g.gif")} />
        );
      case 2:
        return (
          <Image style={styles.gif} source={require("../../Gif/2-g.gif")} />
        );
      case 3:
        return (
          <Image style={styles.gif} source={require("../../Gif/3-g.gif")} />
        );
      case 4:
        return (
          <Image style={styles.gif} source={require("../../Gif/4-g.gif")} />
        );
      case 5:
        return (
          <Image style={styles.gif} source={require("../../Gif/5-g.gif")} />
        );

      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <StatusBarCustom barStyle={"dark-content"} bgColor={WHITE} />
      <View
        style={{
          width: "100%",
          paddingVertical: _moderateScale(8 * 2),
          borderBottomWidth: _moderateScale(0.5),
          borderBottomColor: BG_GREY_OPACITY_5,
        }}
      >
        <View style={[styleElement.rowAliCenter]}>
          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={() => {
              navigation.goBack();
            }}
            style={{ paddingHorizontal: _moderateScale(8 * 2) }}
          >
            <Image
              style={[sizeIcon.lg]}
              source={require("../../Icon/cancel.png")}
            />
          </TouchableOpacity>
          <Text
            style={[
              stylesFont.fontNolan500,
              { fontSize: _moderateScale(16), color: BLACK },
            ]}
          >
            ĐÁNH GIÁ BOOKING
          </Text>
        </View>
      </View>

      <KeyboardAwareScrollView>
        {props?.route?.params?.data?.template?.data?.interacted ||
        props?.route?.params?.data?.hasReview ? (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}

        <Text style={[stylesFont.fontNolan500, styles.title]}>
          {`Cảm nhận của bạn về \n Booking này?`}
        </Text>
        <Text
          style={[
            stylesFont.fontNolan500,
            styles.title_2,
            { marginHorizontal: _moderateScale(16) },
          ]}
        >
          Trang Beauty sẽ tặng bạn những phần quà hấp dẫn sau khi đánh giá
        </Text>

        {renderGif(indexCountStar)}

        <View
          style={[
            styleElement.rowAliCenter,
            {
              justifyContent: "center",
              marginVertical: _moderateScale(0),
              borderRadius: _moderateScale(32),
              backgroundColor: "white",
              marginHorizontal: _moderateScale(8 * 5),
            },
            shadow,
          ]}
        >
          {[1, 2, 3, 4, 5]?.map((item, index) => {
            if (index + 1 > indexCountStar) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    _handleSetReaction(index + 1);
                    setIndexCountStar(index + 1);
                    _handleSetStar(index + 1);
                  }}
                  style={styles.btnStar}
                >
                  <Image
                    style={[sizeIcon.xlllg]}
                    source={require("../../Icon/i_star.png")}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  _handleSetReaction(index + 1);
                  setIndexCountStar(index + 1);
                  _handleSetStar(index + 1);
                }}
                style={styles.btnStar}
              >
                <Image
                  style={[sizeIcon.xlllg]}
                  source={require("../../Icon/a_star.png")}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {true ? (
          <View
            style={{
              marginBottom: _moderateScale(8 * 2),
              marginTop: _moderateScale(8 * 2),
            }}
          >
            <Text
              style={[
                stylesFont.fontNolan500,
                {
                  fontSize: _moderateScale(16),
                  marginLeft: _moderateScale(8 * 3),
                },
              ]}
            >
              Bạn <Text style={{ ...stylesFont.fontNolanBold }}>KHÔNG</Text> hài
              lòng về điều gì?
            </Text>
            <View
              style={[
                styleElement.rowAliCenter,
                {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingHorizontal: _moderateScale(8 * 3),
                  marginTop: _moderateScale(8),
                },
              ]}
            >
              {listItem.map((item, index) => {
                if (
                  listItemNotGood?.find(
                    (itemFind) => itemFind?.code == item?.code
                  )
                ) {
                  return (
                    <TouchableOpacity
                      key={item?._id}
                      onPress={() => {
                        setListItemNotGood((old) =>
                          [...old].filter(
                            (itemFilter) => itemFilter?.code !== item?.code
                          )
                        );
                      }}
                      style={[
                        {
                          // width: "30%",
                          paddingHorizontal: _moderateScale(8 * 2),
                          borderWidth: _moderateScale(1),
                          borderRadius: _moderateScale(8),
                          justifyContent: "center",
                          alignItems: "center",
                          paddingVertical: _moderateScale(4),
                          borderColor: RED,
                          backgroundColor: RED,
                          marginBottom: _moderateScale(8 * 1),
                        },
                        { marginHorizontal: _moderateScale(8) },
                      ]}
                    >
                      <Text
                        style={[stylesFont.fontNolanBold, { color: WHITE }]}
                      >
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={item?._id}
                    onPress={() => {
                      setListItemNotGood((old) => [...old, item]);
                      // _handleSetStarSpecific(item)
                    }}
                    style={[
                      {
                        // width: "30%",
                        paddingHorizontal: _moderateScale(8 * 2),
                        borderWidth: _moderateScale(1),
                        borderRadius: _moderateScale(8),
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: _moderateScale(4),
                        borderColor: BASE_COLOR,
                        marginBottom: _moderateScale(8 * 1),
                      },
                      { marginHorizontal: _moderateScale(8) },
                    ]}
                  >
                    <Text
                      style={[stylesFont.fontNolan500, { color: BASE_COLOR }]}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <></>
        )}

        <View style={{ paddingHorizontal: _moderateScale(8 * 3) }}>
          <Text
            style={[
              stylesFont.fontNolan500,
              { fontSize: _moderateScale(18), color: BASE_COLOR },
            ]}
          >
            Nội dung
          </Text>
          <View
            style={{
              minHeight: _moderateScale(8 * 10),
              backgroundColor: FIFTH_COLOR,
              marginTop: _moderateScale(8),
              borderRadius: _moderateScale(8),
              padding: _moderateScale(8),
              paddingHorizontal: _moderateScale(8 * 2),
            }}
          >
            <TextInput
              value={description}
              onChangeText={(e) => _handleOnchangeText(e)}
              placeholder={"Nhập nội dung bình luận"}
              multiline
              style={{
                flex: 1,
                fontSize: _moderateScale(16),
              }}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </KeyboardAwareScrollView>
      {props?.route?.params?.data?.template?.data?.interacted ||
      props?.route?.params?.data?.hasReview ? (
        <></>
      ) : (
        <View style={{}}>
          <TouchableOpacity
            onPress={_handleConfirmFeedBack}
            style={styles.btnConfirm}
          >
            <Text
              style={[
                stylesFont.fontNolanBold,
                { fontSize: _moderateScale(16), color: WHITE },
              ]}
            >
              Gửi đánh giá
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  gif: {
    width: _moderateScale(8 * 18),
    height: _moderateScale(8 * 18),
    alignSelf: "center",
  },
  btnConfirm: {
    marginHorizontal: _moderateScale(8 * 3),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: getBottomSpace() + _moderateScale(8 * 2),
    backgroundColor: GREEN_SUCCESS,
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(8),
  },
  btnStar: {
    padding: _moderateScale(8),
  },
  textReaction: {
    color: BLUE_FB,
    alignSelf: "center",
    fontSize: _moderateScale(20),
    marginTop: _moderateScale(8 * 2),
  },
  fb2: {
    width: _moderateScale(56),
    height: _moderateScale(56),
    resizeMode: "contain",
  },
  fb1: {
    width: _moderateScale(56),
    height: _moderateScale(56),
    resizeMode: "contain",
  },
  title_2: {
    fontSize: _moderateScale(14),
    color: GREY,
    alignSelf: "center",
    textAlign: "center",
  },
  title: {
    fontSize: _moderateScale(20),
    color: BLACK_OPACITY_8,
    alignSelf: "center",
    textAlign: "center",
    marginVertical: _moderateScale(8 * 2),
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 3,
};

export default index;
