import _isEmpty from "lodash/isEmpty";
import React, { useEffect, useState, memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { navigation } from "../../../rootNavigation";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_3,
  BLACK_OPACITY_8,
  GREY,
  GREY_FOR_TITLE,
  WHITE,
  BLACK,
} from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { sizeIcon } from "../../Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import FastImage from "../../Components/Image/FastImage";
import { URL_ORIGINAL } from "../../Constant/Url";
import { getMinePartnerPost } from "../../Redux/Action/PostAction";
import { getPartnerDiaryv2 } from "../../Redux/Action/Diary";
import ListImages from "./ListImages";
import ListPosts from "./ListPosts";
import ListDiary from "./ListDiary";
import { TabView, TabBar } from "react-native-tab-view";
import ImageView from "react-native-image-viewing";
import { StatusBar } from "@Components/StatusBar";
import Screen from "@Components/Screen";

const MyPersonalPage = memo((props) => {
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);

  const [listPartnerPost, setListPartnerPost] = useState([]);
  const [listPartnerDiary, setListPartnerDiary] = useState([]);

  const [indexCurrImageView, setIndexCurrImageView] = useState(0);
  const [showImageViewing, setShowImageViewing] = useState(false);
  const [listImagesSeeCurr, setListImagesSeeCurr] = useState([]);

  const [routes] = useState([
    { key: "first", title: "Hình ảnh" },
    { key: "second", title: "Bài viết" },
    { key: "third", title: "Nhật ký" },
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    _getListPost();
    _getListDiary();
  }, []);

  const _getListPost = async () => {
    let result = await getMinePartnerPost();
    if (result?.isAxiosError) return;
    setListPartnerPost(result?.data?.data);
  };

  const _getListDiary = async () => {
    let result = await getPartnerDiaryv2();
    if (result?.isAxiosError) return;
    setListPartnerDiary(result?.data?.data);
  };

  const renderTabBar = (props) => {
    return (
      <TabBar
        tabStyle={{ flexDirection: "row", alignItems: "center" }}
        {...props}
        indicatorStyle={{ backgroundColor: BASE_COLOR }}
        style={{
          backgroundColor: WHITE,
        }}
        inactiveColor="grey"
        activeColor={BASE_COLOR}
        labelStyle={[
          stylesFont.fontDinTextPro,
          {
            fontSize: _moderateScale(16),
          },
        ]}
        getLabelText={({ route }) => route.title}
      />
    );
  };
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <ListImages idUser={infoUserRedux?._id} />;
      case "second":
        return <ListPosts />;
      case "third":
        return <ListDiary />;

      default:
        return null;
    }
  };

  return (
    <Screen safeTop>
      <ImageView
        images={listImagesSeeCurr?.map((item) => {
          return {
            uri: `${URL_ORIGINAL}${item?.link}`,
          };
        })}
        onRequestClose={() => {
          setShowImageViewing(false);
        }}
        imageIndex={indexCurrImageView}
        visible={showImageViewing}
      />

      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: _moderateScale(8 * 2),
          alignItems: "center",
          paddingVertical: _moderateScale(8 * 1.5),
          borderBottomWidth: _moderateScale(0.5),
          borderBottomColor: BG_GREY_OPACITY_3,
          backgroundColor: WHITE,
          // height: _moderateScale(8 * 6)
        }}
      >
        <View
          style={[
            { width: _moderateScale(8 * 5) },
            { alignItems: "flex-start" },
          ]}
        >
          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={[sizeIcon.lg]}
              source={require("../../Icon/back_bold.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {infoUserRedux?.name ? (
            <Text
              style={[
                stylesFont.fontNolan500,
                { fontSize: _moderateScale(16), color: BLACK },
              ]}
              numberOfLines={2}
            >
              Trang cá nhân
            </Text>
          ) : (
            <></>
          )}
        </View>
        {/* <TouchableOpacity
                onLongPress={()=>{
                    navigation.navigate(ScreenKey.DEMO_SCREEN)
                }}
                style={{width:20,height:20}}>

                </TouchableOpacity> */}
      </View>

      <View
        style={[
          styleElement.rowAliCenter,
          {
            marginTop: _moderateScale(8 * 2),
            paddingHorizontal: _moderateScale(8 * 2),
          },
        ]}
      >
        <View style={[styleElement.rowAliCenter, { flex: 4 }]}>
          <TouchableOpacity
            onPress={() => {
              setShowImageViewing(true);
              setIndexCurrImageView(index);
              setListImagesSeeCurr([infoUserRedux?.fileAvatar]);
            }}
          >
            <FastImage
              style={[
                {
                  width: _moderateScale(8 * 8),
                  height: _moderateScale(8 * 8),
                  borderRadius: _moderateScale(8 * 4),
                },
              ]}
              uri={`${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}`}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: _moderateScale(8), flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(16),
                color: GREY_FOR_TITLE,
              }}
            >
              {infoUserRedux?.name}
            </Text>
            <View style={{ height: _moderateScale(2) }} />
            <Text
              numberOfLines={1}
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(16),
                color: GREY,
              }}
            >
              {infoUserRedux?.fullPhone[0]}
            </Text>
          </View>
        </View>

        <View
          style={[
            styleElement.rowAliCenter,
            {
              flex: 2,
              marginLeft: _moderateScale(8),
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                ...stylesFont.fontNolanBold,
                fontSize: _moderateScale(18),
                color: BASE_COLOR,
              }}
            >
              {listPartnerPost?.length}
            </Text>
            <Text
              style={{
                marginTop: _moderateScale(4),
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
                textAlign: "center",
                color: BLACK_OPACITY_8,
              }}
            >
              Bài viết
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                ...stylesFont.fontNolanBold,
                fontSize: _moderateScale(18),
                color: BASE_COLOR,
              }}
            >
              {listPartnerDiary?.length}
            </Text>
            <Text
              style={{
                marginTop: _moderateScale(4),
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
                textAlign: "center",
                color: BLACK_OPACITY_8,
              }}
            >
              Nhật ký
            </Text>
          </View>
        </View>
      </View>

      <TabView
        renderTabBar={renderTabBar}
        swipeEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy
      />

      {/* <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(16)
                    }}>
                        Bài viết
                    </Text>

                    {
                        listPartnerPost?.map((item, index) => {
                            return (
                                <ItemPost key={item?._id} data={item}/>
                            )
                        })
                    }
                </View>

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 3) }}>
                    <Text style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(16)
                    }}>
                        Nhật ký
                    </Text>

                    {
                        listPartnerDiary?.map((item, index) => {
                            return (
                                <ItemDiary key={item?._id} data={item}/>
                            )
                        })
                    }
                </View>
                <View style={{height:_moderateScale(50)}}/> */}
    </Screen>
  );
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 2,

  elevation: 3,
};

export default MyPersonalPage;
