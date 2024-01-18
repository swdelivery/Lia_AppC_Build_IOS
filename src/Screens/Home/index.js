import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";


import { _height, _moderateScale, _widthScale, _heightScale, _width } from '../../Constant/Scale';
import {
  WHITE,
  BG_GREY_OPACITY_5,
  BASE_COLOR,
  SECOND_COLOR,
  BLACK_OPACITY_8,
} from "../../Constant/Color";
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from "../../Constant/Icon";
import { stylesFont } from '../../Constant/Font';


import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector, useDispatch } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import { navigation } from '../../../rootNavigation';
import AlarmNotifi from "../../Components/AlarmNotifi/AlarmNotifi";
import { getWallet } from "../../Redux/Action/InfoAction";
import BubbleDiaryNotUpdate from '../../Screens/BubbleDiaryNotUpdate/BubbleDiaryNotUpdate'
import LinearGradient from "react-native-linear-gradient";
import { URL_ORIGINAL } from "../../Constant/Url";
import HorizonListServiceGr from './Components/HorizonListServiceGr';
import NewListOptions from './Components/NewListOptions';
import BannerHorizon from './Components/BannerHorizon';
import { getAllNewsv2, getEncyclopedia } from "../../Redux/Action/News";
import ListService from './Components/ListService';
import { getServicev2 } from '../../Redux/Action/Service';
import { getListBranchV2 } from '../../Redux/Action/BranchAction';
import ListBranch from './Components/ListBranch';
import { getAllDoctorv2 } from '../../Redux/Action/DoctorAction';
import ListDoctor from './Components/ListDoctor';
import { getAllProductv2 } from '../../Redux/Action/Product';
import ListProduct from './Components/ListProduct';
import AdsFlashSale from './Components/AdsFlashSale';
import { checkFlashSale } from "../../Redux/Action/FlashSaleAction";
import ItemEncyclopedia from './Components/ItemEncyclopedia';
import { getConfigFileByCode } from '../../Redux/Action/SpinWheelAction';
import keychain from "src/utils/keychain";
import { getServiceGroup } from "@Redux/service/actions";
import { getServiceGroupState } from '@Redux/service/selectors'

const HomeScreen = (props) => {
  const RefScrollView = useRef(null);
  const dispatch = useDispatch();

  const scrollA = useRef(new Animated.Value(0)).current;
  const infoUserRedux = useSelector((state) => state?.infoUserReducer);
  const walletReducer = useSelector(
    (state) => state?.walletReducer?.infoWallet
  );

  const isShowBagedDiaryRedux = useSelector(
    (state) => state.notificationReducer.isShowBagedDiary
  );

  const listServiceGroupRedux = useSelector(getServiceGroupState);

  const [listAllNews, setListAllNews] = useState([]);

  const [currOption, setCurrOption] = useState("DV");
  const [isFlashSaleReady, setIsFlashSaleReady] = useState(false);
  const [isAdsFlashSaleReady, setIsAdsFlashSaleReady] = useState(false);

  const [btnFlashSale, setbtnFlashSale] = useState({});

  const [list5Service, setList5Service] = useState([]);
  const [list5Branch, setList5Branch] = useState([]);
  const [list5Doctor, setList5Doctor] = useState([]);
  const [list5Product, setList5Product] = useState([]);
  const [list5Encyclopedia, setList5Encyclopedia] = useState([]);
  const [onlayoutHeightHeaderMain, setOnlayoutHeightHeaderMain] = useState(0);

  useEffect(() => {
    _checkFlashSale();

    var condition = {
      condition: {
        parentCode: {
          equal: null,
        },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 100,
      page: 1,
    };

    dispatch(getServiceGroup.request(condition));
    _getAllNews();
    _getLogoFlashSale();
  }, []);

  useEffect(() => {
    if (currOption) {
      // alert(onlayoutHeightHeaderMain)

      _getDataByOption(currOption);
    }
  }, [currOption]);

  const _checkFlashSale = async () => {
    let result = await checkFlashSale();
    if (result?.isAxiosError) return;

    if (result?.data?.data?.availableFlashSale > 0) {
      setIsAdsFlashSaleReady(true);
      setIsFlashSaleReady(true);
    }
  };

  const _getLogoFlashSale = async () => {
    let result = await getConfigFileByCode("BUTTON_FLS");
    if (result?.isAxiosError) return;
    setbtnFlashSale(result?.data?.data);
  };

  const _getDataByOption = async (currOption) => {
    if (currOption == "DV") {
      let result = await getServicev2({
        sort: {
          orderNumber: -1,
        },
        limit: 8,
        page: 1,
      });
      if (result?.isAxiosError) return;
      setList5Service(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "PK") {
      let result = await getListBranchV2({
        sort: {
          orderNumber: -1,
        },
        limit: 8,
        page: 1,
      });
      if (result?.isAxiosError) return;
      setList5Branch(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "BS") {
      let result = await getAllDoctorv2({
        sort: {
          orderNumber: -1,
        },
        limit: 8,
        page: 1,
      });
      if (result?.isAxiosError) return;
      setList5Doctor(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "SP") {
      let result = await getAllProductv2({
        limit: 8,
        page: 1,
      });
      if (result?.isAxiosError) return;
      setList5Product(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "BK") {
      let result = await getEncyclopedia({
        limit: 8,
        page: 1,
      });
      if (result?.isAxiosError) return;
      setList5Encyclopedia(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
  };

  const _getAllNews = async () => {
    let result = await getAllNewsv2({
      sort: {
        orderNumber: -1,
      },
      limit: 5,
    });
    if (result?.isAxiosError) return;
    setListAllNews(result?.data?.data);
  };

  useEffect(() => {
    if (infoUserRedux?.infoUser?._id) {
      _getWallet();
    }
  }, [infoUserRedux]);

  const _getWallet = async () => {
    let tokenSTR = keychain.getTokens().accessToken;

    if (tokenSTR) {
      var data = await getWallet();
      if (data?.isAxiosError) return;

      store.dispatch({
        type: ActionType.SET_DATA_WALLET,
        payload: {
          data: data,
        },
      });
    }
  };

  const _renderItemServiceGr = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: _moderateScale(8 * 8),
          height: "auto",
          borderWidth: 1,
        }}
      >
        <Image
          style={{
            width: _moderateScale(8 * 4),
            height: _moderateScale(8 * 4),
          }}
          source={{ uri: `${URL_ORIGINAL}${item?.fileAvatar?.link}` }}
        />

        <Text numberOfLines={1}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  _hanleClickSale = () => {
    // alert('Flash sale')
    setIsAdsFlashSaleReady(false);
    navigation.navigate(ScreenKey.FLASHSALE_SCREEN);
  };
  return (
    <View style={styles.container}>
      {infoUserRedux?.infoUser?._id &&
      isShowBagedDiaryRedux?.show &&
      isShowBagedDiaryRedux?.data?.length > 0 ? (
        <BubbleDiaryNotUpdate data={isShowBagedDiaryRedux?.data} />
      ) : (
        <></>
      )}

      {isAdsFlashSaleReady == true ? (
        <TouchableOpacity
          onPress={() => {
            setIsAdsFlashSaleReady(false);
          }}
          activeOpacity={1}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <AdsFlashSale _hanleClickSale={_hanleClickSale}></AdsFlashSale>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <StatusBarCustom />
      <View style={{ height: _moderateScale(8 * 16) }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={gradient.color}
          style={gradient.container}
        >
          <View
            style={[
              styleElement.rowAliCenter,
              {
                paddingHorizontal: _moderateScale(8 * 2),
                marginTop: _moderateScale(8),
              },
            ]}
          >
            <View style={styles.avatarLia}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
                source={require("../../NewImage/logoCenter2.png")}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenKey.SEARCHING_HOME);
              }}
              style={{
                marginTop: _moderateScale(0),
                marginLeft: _moderateScale(8 * 2),
              }}
            >
              <View style={styles.inputHeader}>
                <Image
                  style={[
                    sizeIcon.xs,
                    { marginRight: _moderateScale(8), top: 1, opacity: 0.9 },
                  ]}
                  source={require("../../NewIcon/searchWhite.png")}
                />
                <View>
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      {
                        paddingVertical: 0,
                        fontSize: _moderateScale(14),
                        color: WHITE,
                      },
                    ]}
                  >
                    Bạn cần tìm ?
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                marginLeft: _moderateScale(8),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!infoUserRedux?.infoUser?._id) {
                    store.dispatch({
                      type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                      payload: {
                        flag: true,
                        currRouteName: props?.route?.name,
                      },
                    });
                    return;
                  }
                  navigation.navigate(ScreenKey.MY_PERSONAL_PAGE);
                }}
                //  onPress={()=>{
                //     navigation.navigate(ScreenKey.MY_PERSONAL_PAGE)
                // }}
              >
                <Image
                  style={{
                    width: _moderateScale(8 * 4),
                    height: _moderateScale(8 * 4),
                    borderRadius: _moderateScale(8 * 2),
                    borderWidth: 1,
                    borderColor: WHITE,
                  }}
                  source={{
                    uri: `${URL_ORIGINAL}${infoUserRedux?.infoUser?.fileAvatar?.link}`,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "flex-end", flex: 1 }}>
              <AlarmNotifi />
            </View>
          </View>

          <NewListOptions />
        </LinearGradient>

        <View style={styles.wave} />
      </View>

      <ScrollView ref={RefScrollView} stickyHeaderIndices={[1]}>
        <View
          onLayout={(e) => {
            setOnlayoutHeightHeaderMain(e?.nativeEvent?.layout?.height);
          }}
        >
          <HorizonListServiceGr data={[...listServiceGroupRedux]} />
          <View style={{ height: _moderateScale(8 * 2) }} />
          <View>
            <BannerHorizon listAllNews={listAllNews} />
          </View>
          <View style={{ height: _moderateScale(8 * 3) }} />
        </View>
        <View>
          <View>
            <View
              style={[
                styleElement.rowAliCenter,
                {
                  width: "100%",
                  // height: _moderateScale(50),
                  borderBottomWidth: 1,
                  borderColor: BG_GREY_OPACITY_5,
                  justifyContent: "space-evenly",
                  backgroundColor: WHITE,
                  zIndex: 1,
                  // borderWidth:1,
                  paddingBottom: _moderateScale(8 * 1.5),
                },
              ]}
            >
              <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                  setCurrOption("DV");
                }}
              >
                <Text
                  style={[
                    styles.titleTab,
                    currOption == "DV" && styles.titleTabActive,
                  ]}
                >
                  Dịch vụ
                </Text>
                {currOption == "DV" ? (
                  <View style={styles.lineActive} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                  setCurrOption("PK");
                }}
              >
                <Text
                  style={[
                    styles.titleTab,
                    currOption == "PK" && styles.titleTabActive,
                  ]}
                >
                  Phòng khám
                </Text>
                {currOption == "PK" ? (
                  <View style={styles.lineActive} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                  setCurrOption("BS");
                }}
              >
                <Text
                  style={[
                    styles.titleTab,
                    currOption == "BS" && styles.titleTabActive,
                  ]}
                >
                  Bác sĩ
                </Text>
                {currOption == "BS" ? (
                  <View style={styles.lineActive} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                  setCurrOption("SP");
                }}
              >
                <Text
                  style={[
                    styles.titleTab,
                    currOption == "SP" && styles.titleTabActive,
                  ]}
                >
                  Sản phẩm
                </Text>
                {currOption == "SP" ? (
                  <View style={styles.lineActive} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                  setCurrOption("BK");
                }}
              >
                <Text
                  style={[
                    styles.titleTab,
                    currOption == "BK" && styles.titleTabActive,
                  ]}
                >
                  Bách khoa
                </Text>
                {currOption == "BK" ? (
                  <View style={styles.lineActive} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          {/* <Text style={{height:100}}>awd</Text>
                    <Text style={{height:100}}>awd</Text>
                    <Text style={{height:100}}>awd</Text>
                    <Text style={{height:100}}>awd</Text>
                    <Text style={{height:100}}>awd</Text>
                    <Text style={{height:100}}>awd</Text> */}
          {currOption == "DV" ? (
            <>
              <View style={{ height: _moderateScale(8) }} />
              {list5Service?.data?.length > 0 ? (
                <View
                  style={{
                    alignItems: "flex-end",
                    paddingHorizontal: _moderateScale(8 * 2),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreenKey.LIST_SERVICE);
                    }}
                    style={[styleElement.rowAliCenter]}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK_OPACITY_8,
                      }}
                    >
                      Xem tất cả {list5Service?.meta?.totalDocuments} dịch vụ
                    </Text>

                    <Image
                      style={sizeIcon.md}
                      source={require("../../Icon/arrowRight_grey.png")}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              <ListService data={list5Service} />
            </>
          ) : (
            <></>
          )}
          {currOption == "PK" ? (
            <>
              <View style={{ height: _moderateScale(8) }} />
              {list5Branch?.data?.length > 0 ? (
                <>
                  <View
                    style={{
                      alignItems: "flex-end",
                      paddingHorizontal: _moderateScale(8 * 2),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(ScreenKey.LIST_BRANCH);
                      }}
                      style={[styleElement.rowAliCenter]}
                    >
                      <Text
                        style={{
                          ...stylesFont.fontNolan500,
                          fontSize: _moderateScale(14),
                          color: BLACK_OPACITY_8,
                        }}
                      >
                        Xem tất cả {list5Branch?.meta?.totalDocuments} phòng
                        khám
                      </Text>

                      <Image
                        style={sizeIcon.md}
                        source={require("../../Icon/arrowRight_grey.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <></>
              )}
              <View style={{ height: _moderateScale(8) }} />
              <ListBranch data={list5Branch} />
            </>
          ) : (
            <></>
          )}
          {currOption == "BS" ? (
            <>
              <View style={{ height: _moderateScale(8) }} />
              {list5Doctor?.data?.length > 0 ? (
                <>
                  <View
                    style={{
                      alignItems: "flex-end",
                      paddingHorizontal: _moderateScale(8 * 2),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Platform.OS == "ios"
                          ? navigation.navigate(ScreenKey.LIST_DOCTOR_IOS)
                          : navigation.navigate(ScreenKey.LIST_DOCTOR);
                      }}
                      style={[styleElement.rowAliCenter]}
                    >
                      <Text
                        style={{
                          ...stylesFont.fontNolan500,
                          fontSize: _moderateScale(14),
                          color: BLACK_OPACITY_8,
                        }}
                      >
                        Xem tất cả {list5Doctor?.meta?.totalDocuments} bác sĩ
                      </Text>

                      <Image
                        style={sizeIcon.md}
                        source={require("../../Icon/arrowRight_grey.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <></>
              )}
              <View style={{ height: _moderateScale(8) }} />
              <ListDoctor data={list5Doctor} />
            </>
          ) : (
            <></>
          )}
          {currOption == "SP" ? (
            <>
              <View style={{ height: _moderateScale(8) }} />
              {list5Product?.data?.length > 0 ? (
                <View
                  style={{
                    alignItems: "flex-end",
                    paddingHorizontal: _moderateScale(8 * 2),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreenKey.LIST_PRODUCT);
                    }}
                    style={[styleElement.rowAliCenter]}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK_OPACITY_8,
                      }}
                    >
                      Xem tất cả {list5Product?.meta?.totalDocuments} sản phẩm
                    </Text>

                    <Image
                      style={sizeIcon.md}
                      source={require("../../Icon/arrowRight_grey.png")}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              <ListProduct data={list5Product} />
            </>
          ) : (
            <></>
          )}
          {currOption == "BK" ? (
            <>
              <View style={{ height: _moderateScale(8) }} />
              {list5Encyclopedia?.data?.length > 0 ? (
                <View
                  style={{
                    alignItems: "flex-end",
                    paddingHorizontal: _moderateScale(8 * 2),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreenKey.LIST_ALL_ENCYCLOPEDIA);
                    }}
                    style={[styleElement.rowAliCenter]}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK_OPACITY_8,
                      }}
                    >
                      Xem tất cả {list5Encyclopedia?.meta?.totalDocuments} bách
                      khoa
                    </Text>

                    <Image
                      style={sizeIcon.md}
                      source={require("../../Icon/arrowRight_grey.png")}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              <View style={{ paddingHorizontal: _moderateScale(8 * 1.5) }}>
                {list5Encyclopedia?.data?.map((item, index) => {
                  return <ItemEncyclopedia key={index} data={item} />;
                })}
              </View>
              {/* <ListProduct data={list5Product} /> */}
            </>
          ) : (
            <></>
          )}
          {/* {
                        currOption == "PK" ?
                            <ListBranch data={list5Branch} />
                            : <></>
                    } */}
        </View>
      </ScrollView>

      {/* {
                infoUserRedux?.infoUser?._id ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenKey.MISSION_SCREEN)}
                        style={{
                            position: 'absolute',
                            right: _moderateScale(8 * 2), bottom: _heightScale(8 * 2)
                        }}>
                        <ImageBackground style={[styleElement.centerChild, {
                            width: _moderateScale(96),
                            height: _moderateScale(96),
                            paddingBottom: _moderateScale(4)
                        }]}
                            resizeMode="contain"
                            source={require('../../NewIcon/bg_btnHome.png')}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: WHITE }}>
                                {walletReducer?.liaTicketAmount} LiA
                    </Text>

                        </ImageBackground>
                    </TouchableOpacity>
                    :
                    <></>
            } */}

      {isFlashSaleReady ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenKey.FLASHSALE_SCREEN)}
          style={{
            position: "absolute",
            right: _moderateScale(8 * 2),
            bottom: _heightScale(8 * 2),
          }}
        >
          {btnFlashSale?.fileArr?.length > 0 ? (
            <ImageBackground
              style={[
                styleElement.centerChild,
                {
                  width: _moderateScale(76),
                  height: _moderateScale(76),
                  paddingBottom: _moderateScale(4),
                },
              ]}
              resizeMode="contain"
              source={{
                uri: `${URL_ORIGINAL}${btnFlashSale?.fileArr[0]?.link}`,
              }}
            >
              <Text
                style={{
                  ...stylesFont.fontNolanBold,
                  fontSize: _moderateScale(14),
                  color: WHITE,
                }}
              ></Text>
            </ImageBackground>
          ) : (
            <></>
          )}
          {/* <ImageBackground style={[styleElement.centerChild, {
                            width: _moderateScale(96),
                            height: _moderateScale(96),
                            paddingBottom: _moderateScale(4)
                        }]}
                            resizeMode="contain"
                            source={require('../../Image/flashsale1.png')}>
                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: WHITE }}>

                            </Text>
                        </ImageBackground> */}
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        BASE_COLOR,
        SECOND_COLOR,
        // WHITE
    ]
}


const styles = StyleSheet.create({
    lineActive: {
        height: _moderateScale(2),
        width: '100%',
        backgroundColor: BASE_COLOR,
        position: 'absolute',
        bottom: -_moderateScale(6),
        zIndex: 1
    },
    titleTab: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        opacity: 0.5
    },
    titleTabActive: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        letterSpacing: -1,
        color: "black",
        opacity: 1
    },
    inputHeader: {
        width: _moderateScale(8 * 25),
        backgroundColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 1.5),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarLia: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        bottom: -_moderateScale(8 * 2)
    },

}
)


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 4
}


export default HomeScreen;
