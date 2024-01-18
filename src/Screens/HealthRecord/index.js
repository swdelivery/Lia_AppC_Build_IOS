import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { navigation } from "../../../rootNavigation";
import FastImage from "../../Components/Image/FastImage";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_2,
  GREY,
  GREY_FOR_TITLE,
  SECOND_COLOR,
  WHITE,
  BG_GREY_OPACITY_5,
  BLACK_OPACITY_8,
  BTN_PRICE,
} from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { sizeIcon, sizeLogo } from "../../Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from "../../Constant/Url";
import { _logout } from "../../Services/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { healthRecord } from "../../Constant/healthRecord";
import {
  getHealthRecord,
  updateHealthRecord,
} from "../../Redux/Action/ProfileAction";
import { useSelector, useDispatch } from "react-redux";
import { get as _get, findIndex as _findIndex } from "lodash";
import { partnerLevel } from "../../Constant/PartnerLevel";
import { find } from "lodash";
import { isEmpty } from "../../Constant/Utils";
import { getBottomSpace } from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import TextInput from "@Components/TextInput";

const Profile = (props) => {
  const dispatch = useDispatch();

  const infoUserRedux = useSelector((state) => state.infoUserReducer);
  const scrollA = useRef(new Animated.Value(0)).current;
  const oldFlatListRef = useRef();
  const bloodFlatListRef = useRef();
  const heightFlatListRef = useRef();
  const weightFlatListRef = useRef();

  const [isShowGallery, setShowGallery] = useState(false);
  const [bloodGroup, setBloodGroup] = useState([
    "O+",
    "O-",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
  ]);
  const [oldArr, setoldArr] = useState(
    Array.from(new Array(100), (x, i) => i + 1)
  );
  const [indexOld, setIndexOld] = useState(0);

  const [heightArr, setHeightArr] = useState(
    Array.from(new Array(120), (x, i) => i + 135)
  );
  const [weightArr, setWeightArr] = useState(
    Array.from(new Array(220), (x, i) => i + 1)
  );

  const [healthRecordStatus, setHealthRecordStatus] = useState({
    basicInfo: { bloodGroup: null, age: null, height: null, weight: null },
    healthMetric: {
      bloodPressure: 0,
      bloodSugar: 0,
      axitUric: 0,
      cholesteron: 0,
    },
    medicalHistory: {
      heartRelatedDiseaes: false,
      drugAllergy: false,
      cancer: false,
      breastfeeding: false,
      pregnant: false,
      inMenstrualCycle: false,
      hyperthyroidism: false,
      seafoodPollenWeatherAllergies: false,
      otherIllness: "",
    },
  });

  useEffect(() => {
    _getHealthRecord();
  }, []);

  useEffect(() => {
    if (healthRecordStatus?.basicInfo?.bloodGroup) {
      var blood = bloodGroup.indexOf(healthRecordStatus?.basicInfo?.bloodGroup);
      setTimeout(
        () =>
          bloodFlatListRef.current.scrollToIndex({
            animated: true,
            index: blood,
          }),
        100
      );
    }

    if (healthRecordStatus?.basicInfo?.age) {
      var old = oldArr.indexOf(healthRecordStatus?.basicInfo?.age);
      setTimeout(
        () =>
          oldFlatListRef.current.scrollToIndex({ animated: true, index: old }),
        200
      );
    }

    if (healthRecordStatus?.basicInfo?.height) {
      var height = heightArr.indexOf(
        Math.floor(healthRecordStatus?.basicInfo?.height)
      );
      setTimeout(
        () =>
          heightFlatListRef.current.scrollToIndex({
            animated: true,
            index: height,
          }),
        300
      );
    }

    if (healthRecordStatus?.basicInfo?.weight) {
      var weight = weightArr.indexOf(
        Math.floor(healthRecordStatus?.basicInfo?.weight)
      );
      setTimeout(
        () =>
          weightFlatListRef.current.scrollToIndex({
            animated: true,
            index: weight,
          }),
        400
      );
    }
  }, [healthRecordStatus]);

  const _getHealthRecord = async () => {
    var currentRecord = await getHealthRecord();
    if (currentRecord?.isAxiosError) return;
    currentRecord !== null && setHealthRecordStatus(currentRecord);
  };

  const _updateHealthRecord = async () => {
    var currentRecord = await updateHealthRecord(healthRecordStatus);
    if (currentRecord?.isAxiosError) return;
  };

  const _handleOrtherIllness = (value) => {
    setHealthRecordStatus((old) => {
      return {
        ...old,
        medicalHistory: {
          ...old.medicalHistory,
          otherIllness: value,
        },
      };
    });
  };

  const _handleMedicalHistory = (code, value) => {
    setHealthRecordStatus((old) => {
      return {
        ...old,
        medicalHistory: {
          ...old.medicalHistory,
          [code]: value,
        },
      };
    });
  };

  const _handleHealthMetric = (code, value) => {
    setHealthRecordStatus((old) => {
      return {
        ...old,
        healthMetric: {
          ...old.healthMetric,
          [code]: value,
        },
      };
    });
  };

  const _handleHealthBasic = (code, value) => {
    setHealthRecordStatus((old) => {
      return {
        ...old,
        basicInfo: {
          ...old.basicInfo,
          [code]: value,
        },
      };
    });
  };

  const _renderLevelImage = (code) => {
    switch (code) {
      case "SILVER":
        return (
          <Image
            style={[sizeIcon.xlllg]}
            source={require("../../Image/component/rank_bac.png")}
          />
        );
        break;
      case "GOLD":
        return (
          <Image
            style={[sizeIcon.xlllg]}
            source={require("../../Image/component/rank_vang.png")}
          />
        );
        break;
      case "PLATINUM":
        return (
          <Image
            style={[sizeIcon.xlllg]}
            source={require("../../Image/component/rank_bk.png")}
          />
        );
        break;
      case "VIP":
        return (
          <Image
            style={[sizeIcon.xlllg]}
            source={require("../../Image/component/rank_vip.png")}
          />
        );
        break;
      default:
        break;
    }
  };

  const _renderBlood = ({ item, index }) => {
    if (item === healthRecordStatus.basicInfo.bloodGroup) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => _handleHealthBasic("bloodGroup", item)}
          style={styles.btnChoice_a}
        >
          <Text style={[stylesFont.fontNolanBold, styles.btnChoice_a__text]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => _handleHealthBasic("bloodGroup", item)}
        style={styles.btnChoice_i}
      >
        <Text style={[stylesFont.fontNolan500, styles.btnChoice_i__text]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const _awesomeChildListKeyExtractorBlood = useCallback(
    (item) => `awesome-child-blood-${item}`,
    []
  );

  const _renderOld = ({ item, index }) => {
    if (item === healthRecordStatus.basicInfo.age) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => _handleHealthBasic("age", item)}
          style={styles.btnChoice_a}
        >
          <Text style={[stylesFont.fontNolanBold, styles.btnChoice_a__text]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => _handleHealthBasic("age", item)}
        style={styles.btnChoice_i}
      >
        <Text style={[stylesFont.fontNolan500, styles.btnChoice_i__text]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const _awesomeChildListKeyExtractorOld = useCallback(
    (item) => `awesome-child-old-${item}`,
    []
  );

  const _renderHeight = ({ item, index }) => {
    if (item === Math.floor(healthRecordStatus.basicInfo.height)) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => _handleHealthBasic("height", item)}
          style={styles.btnChoice_a}
        >
          <Text style={[stylesFont.fontNolanBold, styles.btnChoice_a__text]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => _handleHealthBasic("height", item)}
        style={styles.btnChoice_i}
      >
        <Text style={[stylesFont.fontNolan500, styles.btnChoice_i__text]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const _awesomeChildListKeyExtractoHeight = useCallback(
    (item) => `awesome-child-height-${item}`,
    []
  );

  const _renderWeight = ({ item, index }) => {
    if (item === Math.floor(healthRecordStatus.basicInfo.weight)) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => _handleHealthBasic("weight", item)}
          style={styles.btnChoice_a}
        >
          <Text style={[stylesFont.fontNolanBold, styles.btnChoice_a__text]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => _handleHealthBasic("weight", item)}
        style={styles.btnChoice_i}
      >
        <Text style={[stylesFont.fontNolan500, styles.btnChoice_i__text]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const _awesomeChildListKeyExtractorWeight = useCallback(
    (item) => `awesome-child-weight-${item}`,
    []
  );

  const getItemLayout = (data, index) => {
    return {
      length: _moderateScale(46),
      offset: _moderateScale(46) * index,
      index,
    };
  };

  return (
    <View style={styles.container}>
      {/* <StatusBarCustom /> */}
      <Animated.ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={[styles.bannerContainer]}>
          <Animated.Image
            resizeMode={"contain"}
            style={[styles.banner(scrollA)]}
            source={require("../../NewImage/banner2Color.png")}
          />
          <View
            style={{
              position: "absolute",
              top: _moderateScale(520),
              width: "100%",
            }}
          >
            {/* <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}>
                                <Image style={[sizeIcon.llg]} source={require('../../Image/component/back.png')} />
                            </TouchableOpacity>
                            <Image
                                style={[sizeLogo.xl]}
                                source={require('../../Image/auth/logo.png')} />
                            <TouchableOpacity>
                            </TouchableOpacity>
                        </View> */}

            <View
              style={[
                styleElement.rowAliCenter,
                {
                  justifyContent: "space-between",
                  paddingHorizontal: _moderateScale(8 * 2),
                  marginTop: _moderateScale(8 * 2),
                },
              ]}
            >
              <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={[sizeIcon.llg]}
                  source={require("../../Icon/back_left_white.png")}
                />
              </TouchableOpacity>

              <Image
                style={[sizeLogo.xl]}
                source={require("../../NewImage/logoCenter2.png")}
              />
              <View style={{ opacity: 0 }}>
                <TouchableOpacity disabled onPress={() => navigation.goBack()}>
                  <Image
                    style={[sizeIcon.llg]}
                    source={require("../../Icon/back_left_white.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.coverTop}>
              <View style={styles.bannerProfile}>
                <TouchableOpacity
                  onPress={() => {
                    setShowGallery(true);
                  }}
                >
                  <FastImage
                    style={[styles.bannerProfile__avatar]}
                    uri={
                      infoUserRedux?.infoUser?.fileAvatar?.link
                        ? `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}`
                        : URL_AVATAR_DEFAULT
                    }
                  />
                </TouchableOpacity>
                <View style={styles.bannerProfile__nameAndJob}>
                  <Text
                    style={[
                      stylesFont.fontNolanBold,
                      styles.bannerProfile__nameAndJob__name,
                    ]}
                  >
                    {`${infoUserRedux?.infoUser?.name} `}
                  </Text>
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      styles.bannerProfile__nameAndJob__job,
                      { opacity: 0.9 },
                    ]}
                  >
                    {`${infoUserRedux?.infoUser?.fullPhone[0]}`}
                  </Text>
                  <View style={[styles.ranking]}>
                    {_renderLevelImage(infoUserRedux?.infoUser?.levelCode)}

                    <Text
                      style={{
                        ...stylesFont.fontNolanBold,
                        marginLeft: _moderateScale(8),
                        fontSize: _moderateScale(20),
                        color: WHITE,
                      }}
                    >
                      {
                        find(partnerLevel, {
                          code: infoUserRedux?.infoUser?.levelCode,
                        })?.name
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <ImageView
          images={[
            `${URL_ORIGINAL}${infoUserRedux?.infoUser?.profile?.fileAvatar?.link}`,
          ].map((item) => {
            return {
              uri: item,
            };
          })}
          onRequestClose={() => {
            setShowGallery(false);
          }}
          imageIndex={0}
          visible={isShowGallery}
        />

        <View
          style={{
            backgroundColor: WHITE,
            flex: 1,
            // paddingBottom: _moderateScale(8 * 20),
            marginTop: _moderateScale(12),
          }}
        >
          <View style={styles.wave} />
          <View style={styles.absoluteTitle}>
            <Image
              style={[sizeIcon.lg, { marginRight: _moderateScale(8 * 2) }]}
              source={require("../../Icon/protect.png")}
            />
            <Text style={[stylesFont.fontNolanBold, { color: BASE_COLOR }]}>
              DỮ LIỆU SỨC KHOẺ
            </Text>
          </View>
          <KeyboardAwareScrollView>
            <View style={[styles.containTitle]}>
              <Text style={[stylesFont.fontNolan500, styles.titleMain]}>
                Nhóm máu
              </Text>
            </View>
            <View style={[styles.wrapScrollView]}>
              <FlatList
                horizontal
                // pagingEnabled={true}
                getItemLayout={getItemLayout}
                ref={bloodFlatListRef}
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                contentContainerStyle={{ flexGrow: 1 }}
                data={!isEmpty(bloodGroup) ? bloodGroup : []}
                renderItem={_renderBlood}
                keyExtractor={_awesomeChildListKeyExtractorBlood}
              />
            </View>

            <View style={[styles.containTitle]}>
              <Text style={[stylesFont.fontNolan500, styles.titleMain]}>
                Tuổi
              </Text>
            </View>
            <View style={[styles.wrapScrollView]}>
              <FlatList
                horizontal
                getItemLayout={getItemLayout}
                ref={oldFlatListRef}
                // pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                contentContainerStyle={{ flexGrow: 1 }}
                data={!isEmpty(oldArr) ? oldArr : []}
                renderItem={_renderOld}
                keyExtractor={_awesomeChildListKeyExtractorOld}
              />
            </View>

            <View style={[styles.containTitle]}>
              <Text style={[stylesFont.fontNolan500, styles.titleMain]}>
                Chiều cao (cm)
              </Text>
            </View>
            <View style={[styles.wrapScrollView]}>
              <FlatList
                horizontal
                // pagingEnabled={true}
                getItemLayout={getItemLayout}
                ref={heightFlatListRef}
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                contentContainerStyle={{ flexGrow: 1 }}
                data={!isEmpty(heightArr) ? heightArr : []}
                renderItem={_renderHeight}
                keyExtractor={_awesomeChildListKeyExtractoHeight}
              />
            </View>

            <View style={[styles.containTitle]}>
              <Text style={[stylesFont.fontNolan500, styles.titleMain]}>
                Cân nặng (kg)
              </Text>
            </View>
            <View style={[styles.wrapScrollView]}>
              <FlatList
                horizontal
                // pagingEnabled={true}
                getItemLayout={getItemLayout}
                ref={weightFlatListRef}
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                contentContainerStyle={{ flexGrow: 1 }}
                data={!isEmpty(weightArr) ? weightArr : []}
                renderItem={_renderWeight}
                keyExtractor={_awesomeChildListKeyExtractorWeight}
              />
            </View>

            <View
              style={[
                styleElement.rowAliCenter,
                {
                  marginTop: _moderateScale(8 * 3),
                  paddingHorizontal: _moderateScale(32),
                  justifyContent: "space-between",
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    styles.titleMain,
                    { marginLeft: 0, marginBottom: _moderateScale(16) },
                  ]}
                >
                  Huyết áp
                </Text>
                <TextInput
                  onChangeText={(content) => {
                    _handleHealthMetric("bloodPressure", content);
                  }}
                  style={styles.input}
                  value={`${healthRecordStatus.healthMetric.bloodPressure}`}
                />
              </View>

              <View>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    styles.titleMain,
                    { marginLeft: 0, marginBottom: _moderateScale(16) },
                  ]}
                >
                  Đường huyết
                </Text>
                <TextInput
                  onChangeText={(content) => {
                    _handleHealthMetric("bloodSugar", content);
                  }}
                  style={styles.input}
                  value={`${healthRecordStatus.healthMetric.bloodSugar}`}
                />
              </View>
            </View>

            <View
              style={[
                styleElement.rowAliCenter,
                {
                  marginTop: _moderateScale(8 * 3),
                  paddingHorizontal: _moderateScale(32),
                  justifyContent: "space-between",
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    styles.titleMain,
                    { marginLeft: 0, marginBottom: _moderateScale(16) },
                  ]}
                >
                  AxitUric
                </Text>
                <TextInput
                  onChangeText={(content) => {
                    _handleHealthMetric("axitUric", content);
                  }}
                  style={styles.input}
                  value={`${healthRecordStatus.healthMetric.axitUric}`}
                />
              </View>

              <View>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    styles.titleMain,
                    { marginLeft: 0, marginBottom: _moderateScale(16) },
                  ]}
                >
                  Cholesteron
                </Text>
                <TextInput
                  onChangeText={(content) => {
                    _handleHealthMetric("cholesteron", content);
                  }}
                  style={styles.input}
                  value={`${healthRecordStatus.healthMetric.cholesteron}`}
                />
              </View>
            </View>

            <View style={{ marginTop: _moderateScale(8 * 3) }}>
              <Text
                style={[
                  stylesFont.fontNolan500,
                  styles.titleMain,
                  { marginLeft: _moderateScale(32) },
                ]}
              >
                Tiền sử bệnh
              </Text>
            </View>

            <View style={[styles.bannerPatient]}>
              {healthRecord?.map((item, index) => {
                var check = healthRecordStatus.medicalHistory;
                if (_get(check, item.code, false) === true) {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => _handleMedicalHistory(item.code, false)}
                      style={[
                        styleElement.rowAliCenter,
                        {
                          marginBottom: _moderateScale(8),
                          paddingVertical: _moderateScale(2),
                        },
                      ]}
                    >
                      <Image
                        style={[sizeIcon.lg]}
                        source={require("../../NewIcon/acheck.png")}
                      />
                      <Text
                        style={[
                          stylesFont.fontNolan500,
                          {
                            marginLeft: _moderateScale(8),
                            fontSize: _moderateScale(14),
                            flex: 1,
                            color: BLACK_OPACITY_8,
                          },
                        ]}
                      >
                        {item?.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => _handleMedicalHistory(item.code, true)}
                    style={[
                      styleElement.rowAliCenter,
                      {
                        marginBottom: _moderateScale(8),
                        paddingVertical: _moderateScale(4),
                      },
                    ]}
                  >
                    <Image
                      style={[sizeIcon.lg]}
                      source={require("../../NewIcon/icheck.png")}
                    />
                    <Text
                      style={[
                        stylesFont.fontNolan500,
                        {
                          marginLeft: _moderateScale(8),
                          fontSize: _moderateScale(14),
                          flex: 1,
                          color: BLACK_OPACITY_8,
                        },
                      ]}
                    >
                      {item?.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <Text style={{ marginTop: _moderateScale(16) }}>
                Bệnh lý khác:
              </Text>
              <TextInput
                multiline
                value={healthRecordStatus.medicalHistory.otherIllness}
                onChangeText={(content) => {
                  _handleOrtherIllness(content);
                }}
                style={[stylesFont.fontNolan500, styles.inputTreatment]}
                placeholder={"Nhập bệnh lý khác (Nếu có)"}
              />
            </View>

            <View style={{ height: 100 }} />
          </KeyboardAwareScrollView>
        </View>
      </Animated.ScrollView>

      {/* <View style={{ width: _moderateScale(240), alignSelf: 'center', marginBottom: getBottomSpace() + _moderateScale(8), marginTop: _moderateScale(8) }}>
                <Button.ButtonPrimary pressAction={() => _updateHealthRecord()}
                    text={`Cập nhật`} height={36} />
            </View> */}

      <TouchableOpacity
        onPress={() => {
          _updateHealthRecord();
        }}
        style={[
          {
            height: _moderateScale(8 * 5),
            backgroundColor: WHITE,
            marginHorizontal: _moderateScale(8 * 3),
            borderRadius: _moderateScale(8),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: BASE_COLOR,
            marginVertical: _moderateScale(8),
            marginBottom: getBottomSpace() + _moderateScale(8),
          },
        ]}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.6, 1]}
          colors={[BASE_COLOR, "#8c104e", "#db0505"]}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: _moderateScale(8),
          }}
        />

        <Text
          style={[
            stylesFont.fontNolanBold,
            { fontSize: _moderateScale(16), color: WHITE },
          ]}
        >
          Cập nhật
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3,

  elevation: 11,
};

const styles = StyleSheet.create({
  inputTreatment: {
    color: BLACK_OPACITY_8,
    height: _moderateScale(8 * 8),
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
    marginTop: _moderateScale(8),
    padding: _moderateScale(8),
    borderRadius: _moderateScale(8),
    backgroundColor: BG_GREY_OPACITY_2,
    paddingVertical: _moderateScale(8),
  },
  bannerPatient: {
    marginHorizontal: _moderateScale(8 * 3),
    backgroundColor: WHITE,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8 * 2),
    borderRadius: _moderateScale(4),
    marginTop: _moderateScale(16),
  },
  input: {
    width: _moderateScale(120),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    borderRadius: _moderateScale(4),
    color: BLACK_OPACITY_8,
  },
  btnChoice_a__text: {
    fontSize: _moderateScale(16),
    color: WHITE,
  },
  btnChoice_a: {
    width: _moderateScale(40),
    height: _moderateScale(40),
    borderWidth: _moderateScale(0.5),
    borderColor: BTN_PRICE,
    backgroundColor: BTN_PRICE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: _moderateScale(6),
    borderRadius: _moderateScale(4),
  },
  wrapScrollView: {
    marginLeft: _moderateScale(8 * 3),
    marginTop: _moderateScale(8 * 2),
    backgroundColor: WHITE,
    padding: _moderateScale(8),
    borderRadius: _moderateScale(4),
  },
  btnChoice_i__text: {
    fontSize: _moderateScale(14),
    color: BLACK_OPACITY_8,
  },
  btnChoice_i: {
    width: _moderateScale(40),
    height: _moderateScale(40),
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: _moderateScale(6),
    borderRadius: _moderateScale(4),
  },

  btnLogOut: {
    marginRight: _widthScale(8 * 4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: _moderateScale(4),
  },
  bannerProfile__nameAndJob__job: {
    fontSize: _moderateScale(16),
    color: WHITE,
  },
  bannerProfile__nameAndJob__name: {
    fontSize: _moderateScale(20),
    color: WHITE,
  },
  bannerProfile__nameAndJob: {
    marginLeft: _widthScale(8 * 2),
    marginBottom: _heightScale(8 * 6),
    flex: 1,
  },
  bannerProfile__avatar: {
    width: _moderateScale(90),
    height: _moderateScale(90),
    borderRadius: _moderateScale(120),
    borderWidth: _moderateScale(2),
    borderColor: WHITE,
  },
  bannerProfile: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: _moderateScale(336),
    alignSelf: "center",
    height: _moderateScale(8 * 12 + 24),
    backgroundColor: BG_GREY_OPACITY_2,
    borderRadius: _moderateScale(16),
    padding: _moderateScale(16),
  },
  coverTop: {
    height: "100%",
    justifyContent: "flex-start",
    paddingTop: _moderateScale(8 * 2),
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  ranking: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: _moderateScale(10),
  },
  bannerContainer: {
    marginTop: -_moderateScale(500),
    paddingTop: _moderateScale(500),
    alignItems: "center",
    overflow: "hidden",
  },
  banner: (scrollA) => ({
    height: _moderateScale(300),
    // width: 100%,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [
            -_moderateScale(300),
            0,
            _moderateScale(300),
            _moderateScale(300) + 1,
          ],
          outputRange: [
            -_moderateScale(300) / 2,
            0,
            _moderateScale(300) * 0.75,
            _moderateScale(300) * 0.75,
          ],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [
            -_moderateScale(300),
            0,
            _moderateScale(300),
            _moderateScale(300) + 1,
          ],
          // outputRange: [2, 1, 0.5, 0.5],
          outputRange: [2, 1, 1, 1],
        }),
      },
    ],
  }),
  wave: {
    width: "100%",
    height: _moderateScale(8 * 4),
    backgroundColor: WHITE,
    borderTopStartRadius: _moderateScale(8 * 3),
    borderTopEndRadius: _moderateScale(8 * 3),
    position: "absolute",
    top: -_moderateScale(8 * 4 - 1),
  },
  containTitle: {
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: _moderateScale(8 * 3),
  },
  titleMain: {
    fontSize: _moderateScale(16),
    color: GREY_FOR_TITLE,
    marginLeft: _moderateScale(8 * 2),
  },
  absoluteTitle: {
    position: "absolute",
    top: _moderateScale(-8 * 6),
    backgroundColor: WHITE,
    alignSelf: "center",
    minWidth: _moderateScale(320),
    height: _moderateScale(8 * 4.5),
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: _moderateScale(32),
    shadowColor: GREY,
    alignItems: "center",
    paddingHorizontal: _moderateScale(16),
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  rowContent: {
    marginHorizontal: _moderateScale(8 * 4),
    marginTop: _moderateScale(8 * 3),
  },
  rowActionProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemActionProfile: {
    backgroundColor: SECOND_COLOR,
    width: _moderateScale(90),
    height: _moderateScale(90),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: _moderateScale(8),
  },
  nameActionProfile: {
    color: WHITE,
    ...stylesFont.fontNolanBold,
    marginTop: _moderateScale(8),
  },
  listHistory: {
    flexDirection: "row",
  },
  rightCalendar: {
    paddingHorizontal: _moderateScale(16),
  },
  itemCalendar: {
    paddingBottom: _moderateScale(8),
    marginBottom: _moderateScale(8),
  },
});

const gradient = {
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  color: [
    "rgba(104, 47, 144,1)",
    "rgba(104, 47, 144,.9)",
    "rgba(104, 47, 144,.7)",
    "rgba(104, 47, 144,.4)",
  ],
};

export default Profile;
