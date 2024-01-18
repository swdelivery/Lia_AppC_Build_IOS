import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import * as Color from "../../Constant/Color";
import { GREY_FOR_TITLE, WHITE } from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _moderateScale,
  _widthScale,
  _width,
  _height,
} from "../../Constant/Scale";
import { Image } from "react-native";

import { getServiceByGroup } from "../../Redux/Action/ServiceGroup";
import { useDispatch, useSelector } from "react-redux";
import { URL_ORIGINAL } from "../../Constant/Url";
import { getDataServiceFiles } from "../../Redux/Action/Service";
import ImageView from "react-native-image-viewing";
import { alertCustomNotAction } from "../../Constant/Utils";
import ModalIframeYoutube from "../../Components/ModalIframeYoutube/ModalIframeYoutube";
import { TabBar, TabView } from "react-native-tab-view";
import ListService from "./ListService";

import { StatusBar } from "@Components/StatusBar";
import Screen from "@Components/Screen";
import LiAHeader from "@Components/Header/LiAHeader";
import { getServiceGroup } from "@Redux/service/actions";
import { getServiceGroupState } from "@Redux/service/selectors";

const ListServiceScreen = (props) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const opacityAnimated = new Animated.Value(1);

  const listServiceGroupRedux = useSelector(getServiceGroupState);

  const [currentGroup, setCurrentGroup] = useState("");

  const [showImageViewing, setShowImageViewing] = useState(false);
  const [listImagesSeeCurr, setListImagesSeeCurr] = useState([]);
  const [indexCurrImageView, setIndexCurrImageView] = useState(0);

  const [playingYoutube, setPlayingYoutube] = useState({
    show: false,
    playList: [],
  });

  const [routes, setRoutes] = useState([
    // { key: 'first', title: 'FaceBook' },
    // { key: 'second', title: `Khách hàng` },
  ]);
  const [index, setIndex] = useState(0);

  const [showOverLay, setShowOverLay] = useState(true);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  useEffect(() => {
    // setShowOverLay(true)

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

    setTimeout(() => {
      setIsFirstLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isFirstLoaded) {
      Animated.timing(opacityAnimated, {
        toValue: 0,
        duration: 1000,
      }).start(() => {
        setShowOverLay(false);
      });
    }
  }, [isFirstLoaded]);

  useEffect(() => {
    if (listServiceGroupRedux.length > 0) {
      console.log({ listServiceGroupRedux, x: props });

      if (props?.route?.params?.currServiceGr?._id) {
        if (props?.route?.params?.currServiceGr?.parentCodeArr?.length > 0) {
          let indexFinded = listServiceGroupRedux?.findIndex(
            (item) =>
              item?.code ==
              props?.route?.params?.currServiceGr?.parentCodeArr[0]
          );
          if (indexFinded !== -1) {
            setCurrentGroup(listServiceGroupRedux[indexFinded].code);
            setIndex(indexFinded);

            let tempListGR = [...listServiceGroupRedux].map((item) => {
              return {
                key: item?.code,
                title: item?.name,
                avatar: item?.fileAvatar?.link,
                _id: item?._id,
                codeGR: item?.code,
              };
            });
            console.log({ tempListGR });
            setRoutes(tempListGR);
          }
        } else {
          let indexFinded = listServiceGroupRedux?.findIndex(
            (item) => item?._id == props?.route?.params?.currServiceGr?._id
          );
          if (indexFinded !== -1) {
            setCurrentGroup(listServiceGroupRedux[indexFinded].code);
            setIndex(indexFinded);

            let tempListGR = [...listServiceGroupRedux].map((item) => {
              return {
                key: item?.code,
                title: item?.name,
                avatar: item?.fileAvatar?.link,
                _id: item?._id,
                codeGR: item?.code,
              };
            });
            console.log({ tempListGR });
            setRoutes(tempListGR);
          }
        }
      }

      setCurrentGroup(listServiceGroupRedux[0].code);

      let tempListGR = [...listServiceGroupRedux].map((item) => {
        return {
          key: item?.code,
          title: item?.name,
          avatar: item?.fileAvatar?.link,
          _id: item?._id,
          codeGR: item?.code,
        };
      });
      console.log({ tempListGR });
      setRoutes(tempListGR);
    }
  }, [listServiceGroupRedux]);

  useEffect(() => {
    if (currentGroup !== "") {
      var condition = {
        condition: {
          codeGroup: {
            in: [currentGroup],
          },
        },
        limit: 100,
        page: 1,
      };
      dispatch(getServiceByGroup(condition));
    }
  }, [currentGroup]);

  const _handlePressImage = async (id) => {
    console.log({ id });
    let result = await getDataServiceFiles(id, {
      condition: {
        type: {
          equal: "image",
        },
      },
      limit: 1000,
    });
    if (result?.isAxiosError) return;
    if (result?.data?.data?.length == 0) {
      return alertCustomNotAction(`Lỗi`, `Chưa có dữ liệu ảnh về dịch vụ này`);
    }

    setShowImageViewing(true);
    setListImagesSeeCurr(result?.data?.data);
  };

  const _handlePressVideo = async (id) => {
    console.log({ id });
    let result = await getDataServiceFiles(id, {
      condition: {
        type: {
          equal: "video",
        },
      },
      limit: 1000,
    });
    if (result?.isAxiosError) return;

    if (result?.data?.data?.length == 0) {
      return alertCustomNotAction(
        `Lỗi`,
        `Chưa có dữ liệu video về dịch vụ này`
      );
    }

    setPlayingYoutube((old) => {
      return {
        ...old,
        show: true,
        playList: result?.data?.data?.map((item) => item?.file?.link),
      };
    });
  };

  const renderTabBar = (props) => {
    return (
      <>
        <TabBar
          tabStyle={{
            flexDirection: "row",
            alignItems: "center",
            width: "auto",
            height: "auto",
          }}
          {...props}
          indicatorStyle={{ backgroundColor: "transparent" }}
          style={{
            backgroundColor: "transparent",
            shadowOffset: { height: 0, width: 0 },
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
            // paddingLeft: _moderateScale(6),
          }}
          inactiveColor="grey"
          activeColor={Color.BASE_COLOR}
          scrollEnabled
          getLabelText={({ route }) => route.title}
          renderLabel={({ route, focused, color }) => (
            // <View style={[stylesFont.fontDinTextPro, focused ? styles.tabItemActive : styles.tabItemNotActive]}>
            //     <Text style={[
            //         focused ? stylesFont.fontNolanBold : stylesFont.fontNolan,
            //         focused ? styles.tabItem__textActive : styles.tabItem__textNoteActive
            //     ]}>
            //         {route.title}
            //     </Text>
            // </View>
            <View
              style={{ width: _moderateScale(8 * 7), alignItems: "center" }}
            >
              <View
                style={[
                  {
                    width: _moderateScale(8 * 6),
                    height: _moderateScale(8 * 6),
                    borderRadius: _moderateScale((8 * 6) / 2),
                    borderWidth: _moderateScale(2),
                    overflow: "hidden",
                  },
                  focused
                    ? { borderColor: Color.THIRD_COLOR }
                    : { borderColor: "transparent" },
                ]}
              >
                <Image
                  style={[
                    {
                      width: "100%",
                      height: "100%",
                    },
                  ]}
                  source={{ uri: `${URL_ORIGINAL}${route?.avatar}` }}
                />
              </View>
              <Text
                style={[
                  {
                    ...stylesFont.fontNolan500,
                    fontSize: _moderateScale(14),
                    marginTop: _moderateScale(0),
                    color: WHITE,
                    opacity: 0.8,
                  },
                  focused && {
                    ...stylesFont.fontNolanBold,
                    opacity: 1,
                    color: Color.THIRD_COLOR,
                    fontSize: _moderateScale(14),
                  },
                ]}
                numberOfLines={1}
              >
                {route?.title}
              </Text>
            </View>
          )}
        />
      </>
    );
  };
  const renderScene = ({ route }) => {
    return (
      <ListService
        currGrChoice={props?.route?.params?.currServiceGr}
        route={route}
      />
    );
    // switch (route.key) {
    //     case 'customer':
    //         return <OverViewMessagesApp />;
    //     case 'face_book':
    //         return <OverViewMessagesFacebook />;
    //     case 'face_book':
    //         return <OverViewMessagesFacebook />;

    //     default:
    //         return null;
    // }
  };

  return (
    <Screen safeTop style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LiAHeader title="Danh sách dịch vụ" />
      {routes?.length > 0 ? (
        <TabView
          renderTabBar={renderTabBar}
          swipeEnabled={true}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
        />
      ) : (
        <></>
      )}

      <ModalIframeYoutube
        playList={playingYoutube?.playList}
        hide={() => {
          setPlayingYoutube((old) => {
            return {
              ...old,
              show: false,
              playList: [],
            };
          });
        }}
        show={playingYoutube?.show}
      />

      <ImageView
        images={listImagesSeeCurr?.map((item) => {
          return {
            uri: `${URL_ORIGINAL}${item?.file?.link}`,
          };
        })}
        onRequestClose={() => {
          setShowImageViewing(false);
        }}
        imageIndex={indexCurrImageView}
        visible={showImageViewing}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BASE_COLOR,
  },
  title: {
    fontSize: _moderateScale(20),
    color: WHITE,
    marginLeft: _moderateScale(8 * 4),
    marginTop: _moderateScale(8 * 3),
  },
  wave: {
    width: "100%",
    height: _moderateScale(8 * 4),
    backgroundColor: "red",
    borderTopStartRadius: _moderateScale(8 * 3),
    borderTopEndRadius: _moderateScale(8 * 3),
    position: "absolute",
    // top: _moderateScale(8 * 4 - 1)
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

  containTitle: {
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleMain: {
    fontSize: _moderateScale(16),
    color: GREY_FOR_TITLE,
    marginLeft: _moderateScale(8 * 2),
  },
  listCategoryService: {
    width: _moderateScale(320),
    alignItems: "center",
    flexDirection: "row",
    marginVertical: _moderateScale(24),
    alignSelf: "center",
  },
  categoryService: {
    width: _moderateScale(70),
    alignItems: "center",
    marginRight: _moderateScale(8),
  },
  viewCircle: {
    width: _moderateScale(56),
    height: _moderateScale(56),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  nameCategory: {
    fontSize: _moderateScale(13),
    color: WHITE,
    ...stylesFont.fontNolanBold,
    marginTop: _moderateScale(8),
  },
  columnContent: {
    flexDirection: "column",
    paddingHorizontal: _moderateScale(8 * 2),
    marginTop: _moderateScale(8 * 3),
    marginBottom: _moderateScale(8 * 5),
  },
});

const gradientHeader = {
  container: {
    flex: 1,
  },
  color: [
    Color.BASE_COLOR,
    Color.SECOND_COLOR,
    // 'rgba(8, 116, 231,0.7)',
  ],
};

export default ListServiceScreen;
