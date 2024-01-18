import match from "autosuggest-highlight/match";
import { escapeRegExp, isEmpty, remove } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { useSelector } from "react-redux";
import slugify from "slugify";
import { navigation } from "../../../rootNavigation";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { sizeIcon } from "../../Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from "../../Constant/Url";
import * as ActionType from "../../Redux/Constants/ActionType";
import Store from "../../Redux/store";
import { _createGroupChat } from "../../Services/api";
import { handleApi } from "../../Services/utils";
import TextInput from "@Components/TextInput"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CreateGroupChat = (props) => {
  const membersRedux = useSelector((state) => state.membersReducer);
  const [currListMembersInGroupChat, setCurrListMembersInGroupChat] = useState(
    []
  );
  const [titleGroupChat, setTitleGroupChat] = useState("");
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [listMembersOfSystemLocalComp, setListMembersOfSystemLocalComp] =
    useState(membersRedux?.listMembersOfSystem);
  const [listMembersAfterFilter, setListMembersAfterFilter] = useState([]);

  const flatListRef = useRef();

  const _addMembers = (item) => {
    // console.log({ currMemberAdded: item });
    // "userId": "5ffd16b814bb7d25dce475e9",
    // "employeeId": "5ffd164914bb7d25dce475d1",
    // "employeeCode": "TECH.03",
    // "name": "Lê Thành An",
    // "isMain": true
    let newMember = {
      userId: item?._id,
      employeeId: item?.profile?._id,
      employeeCode: item?.profile?.code,
      name: `${item?.profile?.firstName} ${item?.profile?.lastName}`,
      isMain: false,
      fileAvatar: item?.profile?.fileAvatar,
    };
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrListMembersInGroupChat((oldLists) => [...oldLists, newMember]);
    // flatListRef.current.scrollToEnd({ animated: true })
  };

  const filterByNames = (data, inputValue) => {
    const re = new RegExp(escapeRegExp(inputValue), "i");
    const results = data.filter((item) => {
      console.log(slugify(item.profile.lastName, ""));

      if (re.test(slugify(item.profile.lastName, " "))) {
        const matches = match(slugify(item.profile.lastName, ""), inputValue);
        // item["parts"] = parse(item.profile.lastName, matches);
        return true;
      }
      // if (re.test(slugify(item.profile.firstName, ' '))) {
      //     const matches = match(slugify(item.profile.firstName, ''), inputValue);
      //     // item["parts"] = parse(item.profile.firstName, matches);
      //     return true;
      // }
      else {
        return false;
      }
    });
    console.log({ results });

    if (!isEmpty(results)) {
      setListMembersAfterFilter(results);
    }

    // return results;
  };

  const _removeMembers = (itemForRemove) => {
    // let indexForRemove = currListMembersInGroupChat.findIndex(item => item.userId == itemForRemove.userId);
    // if (indexForRemove !== -1) {
    // console.log({itemForRemove});

    // }
    let tempCurrListMembersInGroupChat = [...currListMembersInGroupChat];
    remove(tempCurrListMembersInGroupChat, (item) => {
      return item.userId == itemForRemove.userId;
    });
    // LayoutAnimation.configureNext(layoutAnimConfig)
    // LayoutAnimation.configureNext(CustomLayoutSpring);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrListMembersInGroupChat(tempCurrListMembersInGroupChat);
    // console.log({ x });
  };

  const _removeMembersFromListDefault = (itemForRemoveFromListDefault) => {
    // console.log({itemForRemoveFromListDefault});
    let tempCurrListMembersInGroupChat = [...currListMembersInGroupChat];
    remove(tempCurrListMembersInGroupChat, (item) => {
      return item.userId == itemForRemoveFromListDefault._id;
    });
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrListMembersInGroupChat(tempCurrListMembersInGroupChat);
  };

  const _onScrollFlatlist = (e) => {
    // if (membersRedux.listMembersOfSystem.length < 10) return
    // // console.log(e.nativeEvent.contentOffset.y);
    // if (e.nativeEvent.contentOffset.y > 0) {
    //     setHeaderCollapsed(true)
    // } else {
    //     setHeaderCollapsed(false)
    // }
  };

  const _onChangeTitleGroupChat = (content) => {
    setTitleGroupChat(content);
  };

  const _confirmCreateGroupChat = async () => {
    if (isEmpty(titleGroupChat) || currListMembersInGroupChat.length < 2) {
      return alert("Điền đẩy đủ thông tin!");
    }

    console.log({ currListMembersInGroupChat });
    let dataForFecth = {
      name: titleGroupChat,
      type: "multiple",
      memberArr: [...currListMembersInGroupChat],
    };

    console.log({ dataForFecth });

    Store.dispatch({
      type: ActionType.LOADING_BEGIN,
      payload: {
        content: "Đang xử lí...",
      },
    });

    let resultCreateGroupChat = await handleApi(_createGroupChat(dataForFecth));
    Store.dispatch({
      type: ActionType.LOADING_DONE,
      payload: null,
    });
    if (resultCreateGroupChat.error)
      return alert("Lỗi khi tạo mới, vui lòng thử lại");

    navigation.goBack();
  };

  useEffect(() => {
    console.log("changeeee state");
  }, [headerCollapsed]);

  const _renderItemMember = ({ item, index }) => {
    return (
      <View
        style={[
          styleElement.rowAliCenter,
          { flex: 1 },
          index == listMembersOfSystemLocalComp.length - 1 && {
            marginBottom: _moderateScale(8 * 6),
          },
        ]}
      >
        <Image
          style={{
            width: _moderateScale(46),
            height: _moderateScale(46),
            borderRadius: _moderateScale(23),
            marginHorizontal: _widthScale(16),
            marginTop: _moderateScale(16),
          }}
          source={{
            uri: item?.profile?.fileAvatar?.link
              ? `${URL_ORIGINAL}${item?.profile?.fileAvatar?.link}`
              : URL_AVATAR_DEFAULT,
          }}
        />

        <Text
          style={[
            stylesFont.fontNolan500,
            {
              flex: 1,
              fontSize: _moderateScale(16),
              color: Color.GREY_FOR_TITLE,
            },
          ]}
        >
          {`${item?.profile?.firstName} ${item?.profile?.lastName}`}
          {/* {
                        randomStringFixLengthCode(10)
                    } */}
        </Text>

        {currListMembersInGroupChat.find(
          (itemFind) => itemFind.userId == item._id
        ) ? (
          <TouchableOpacity
            // disabled={currListMembersInGroupChat.find(itemFind => itemFind.userId == item._id) ? true : false}
            onPress={() => _removeMembersFromListDefault(item)}
            // style={[styles.btnAddPeopleToTask, currListMembersInGroupChat.find(itemFind => itemFind.userId == item._id) && { opacity: 0.2 }]}
            style={{
              marginHorizontal: _moderateScale(16),
            }}
          >
            <View
              style={{
                width: _moderateScale(8 * 3),
                height: _moderateScale(8 * 3),
                borderRadius: _moderateScale((8 * 3) / 2),
                backgroundColor: Color.BASE_COLOR,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={sizeIcon.md}
                source={require("../../Icon/tick_white.png")}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // disabled={currListMembersInGroupChat.find(itemFind => itemFind.userId == item._id) ? true : false}
            onPress={() => _addMembers(item)}
            // style={[styles.btnAddPeopleToTask, currListMembersInGroupChat.find(itemFind => itemFind.userId == item._id) && { opacity: 0.2 }]}
            style={{
              marginHorizontal: _moderateScale(16),
            }}
          >
            <View
              style={{
                width: _moderateScale(8 * 3),
                height: _moderateScale(8 * 3),
                borderRadius: _moderateScale((8 * 3) / 2),
                borderWidth: _moderateScale(2),
                borderColor: Color.BG_GREY_OPACITY_5,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <View
        style={[
          styles.content__header,
          styleElement.rowAliCenter,
          shadow,
          { justifyContent: "space-between" },
        ]}
        key="0"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[styleElement.rowAliCenter, styles.btnGoBack]}
        >
          <Image
            style={sizeIcon.lg}
            source={require("../../Icon/cancel.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            _confirmCreateGroupChat();
          }}
          style={[styleElement.rowAliCenter, styles.btnGoBack]}
        >
          <Image
            style={sizeIcon.lllg}
            source={require("../../Icon/accepted.png")}
          />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={headerCollapsed}>
        <View
          style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}
        >
          <TouchableOpacity
            style={[styles.btnCamera, { marginLeft: _moderateScale(16) }]}
          >
            <Image
              style={sizeIcon.llg}
              source={require("../../Icon/camera_blue.png")}
            />
          </TouchableOpacity>
          <TextInput
            value={titleGroupChat}
            onChangeText={(content) => _onChangeTitleGroupChat(content)}
            placeholderTextColor={Color.GREY}
            style={[
              stylesFont.fontNolan500,
              {
                fontSize: _moderateScale(18),
                flex: 1,
                marginHorizontal: _moderateScale(14),
              },
            ]}
            placeholder="Đặt tên nhóm"
          />
        </View>
      </Collapsible>

      <View
        style={{
          width: _width,
          paddingHorizontal: _moderateScale(14),
          marginVertical: _moderateScale(8),
        }}
      >
        <View
          style={[
            styleElement.rowAliCenter,
            {
              width: "100%",
              backgroundColor: Color.BG_GREY_OPACITY,
              borderRadius: _moderateScale(8),
            },
          ]}
        >
          <Image
            style={[sizeIcon.lg, { marginHorizontal: _moderateScale(8) }]}
            source={require("../../Icon/search_grey.png")}
          />
          <TextInput
            onChangeText={(c) => {
              filterByNames(listMembersOfSystemLocalComp, c);
            }}
            placeholderTextColor={Color.GREY}
            placeholder={"Tìm kiếm..."}
            style={[
              {
                marginVertical: _heightScale(6),
                paddingVertical: _moderateScale(0),
                fontSize: _moderateScale(14),
                flex: 1,
                paddingRight: _moderateScale(16),
              },
              Platform.OS == "ios" && { paddingVertical: _moderateScale(8) },
            ]}
          />
        </View>
      </View>
      <View style={styleElement.lineHorizontal} />

      {/* <Collapsible
                collapsed={currListMembersInGroupChat?.length > 0 ? false : true}
            // collapsed={false}
            > */}

      {/* <View style={[styleElement.rowAliCenterWrap, { paddingVertical: _moderateScale(4), paddingRight: _moderateScale(8) }]}> */}
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          // style={{ height: _moderateScale(10) }}
          // onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          // contentContainerStyle={{ alignItems: 'center', paddingRight: _moderateScale(16) }}
          horizontal
        >
          {!isEmpty(currListMembersInGroupChat) &&
            currListMembersInGroupChat.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => _removeMembers(item)}
                  style={{
                    width: _moderateScale(50),
                    height: _moderateScale(50),
                    marginLeft: _widthScale(16),
                    // marginBottom: _moderateScale(16),
                    marginTop: _moderateScale(8),
                    // marginVertical:_moderateScale(16),
                    // borderRadius: _moderateScale(23),
                  }}
                >
                  <ImageBackground
                    key={index}
                    imageStyle={{
                      width: _moderateScale(46),
                      height: _moderateScale(46),
                      borderRadius: _moderateScale(23),
                      zIndex: 1,
                    }}
                    style={
                      {
                        // overflow:'hidden'
                      }
                    }
                    source={{
                      uri: item?.fileAvatar?.link
                        ? `${URL_ORIGINAL}${item?.fileAvatar?.link}`
                        : URL_AVATAR_DEFAULT,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        right: -_moderateScale(0),
                        width: _moderateScale(16),
                        height: _moderateScale(16),
                        borderRadius: _moderateScale(8),
                        backgroundColor: Color.RED,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 100,
                      }}
                    >
                      <View
                        style={{
                          width: _moderateScale(10),
                          height: _moderateScale(3),
                          backgroundColor: Color.WHITE,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
      <View style={styleElement.lineHorizontal} />
      {/* </View> */}
      {/* </Collapsible> */}

      {/* <View style={{height:100}}>

                </View> */}
      {/* <Text>
                {randomStringFixLengthCode(5)}
            </Text> */}
      <View style={{ flex: 1 }}>
        {!isEmpty(listMembersAfterFilter) ? (
          <FlatList
            data={
              !isEmpty(listMembersAfterFilter) ? listMembersAfterFilter : []
            }
            renderItem={_renderItemMember}
            keyExtractor={_awesomeChildListKeyExtractor}
          />
        ) : (
          <>
            {!isEmpty(listMembersOfSystemLocalComp) ? (
              <FlatList
                data={
                  !isEmpty(listMembersOfSystemLocalComp)
                    ? listMembersOfSystemLocalComp
                    : []
                }
                renderItem={_renderItemMember}
                keyExtractor={_awesomeChildListKeyExtractor}
              />
            ) : (
              <></>
            )}
          </>
        )}
        {/* <FlatList
                    // onScroll={(e) => { _onScrollFlatlist(e) }}
                    data={listMembersOfSystemLocalComp}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    renderItem={({ item, index }) => {
                        // if (currListMembersInGroupChat.find(itemFind => itemFind.userId == item._id)) {
                        //     return
                        // }
                        return (
                            
                        )
                    }}
                    keyExtractor={(item, index) => `${index}`}
                /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCamera: {
    width: _moderateScale(8 * 5.5),
    height: _moderateScale(8 * 5.5),
    borderRadius: _moderateScale((8 * 5.5) / 2),
    backgroundColor: Color.BG_GREY_OPACITY,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGoBack: {
    marginVertical: _heightScale(12),
  },
  btnAddPeopleToTask: {
    width: _moderateScale(60),
    height: _moderateScale(30),
    borderRadius: _moderateScale(8),
    backgroundColor: Color.BG_GREY_OPACITY,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: _moderateScale(16),
  },
  checkBox_inActive: {
    width: _moderateScale(20),
    height: _moderateScale(20),
    borderWidth: _moderateScale(2),
    borderColor: Color.GREY,
    borderRadius: _moderateScale(4),
    marginHorizontal: _moderateScale(16),
  },
  checkBox_active: {
    width: _moderateScale(20),
    height: _moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.BASE_COLOR,
    borderRadius: _moderateScale(4),
    marginHorizontal: _moderateScale(16),
  },
  textInputDescription: {
    width: "100%",
    paddingHorizontal: _moderateScale(16),
    paddingVertical: 0,
    // backgroundColor:'red',
    fontSize: _moderateScale(16),
    color: Color.GREY_FOR_TITLE,
    marginVertical: _moderateScale(16),
  },
  title: {
    padding: _moderateScale(16),
  },
  content__header: {
    height: _moderateScale(50),
    width: _width,
    backgroundColor: Color.WHITE,
    paddingHorizontal: _widthScale(16),
    alignItems: "center",
  },
  content__heading: {
    fontSize: _moderateScale(16),
  },
  progressBar: {
    width: _widthScale(270 / [1, 2, 3, 4, 5, 6, 7, 8].length),
    height: _moderateScale(4),
    backgroundColor: Color.BG_GREY_OPACITY_3,
    marginHorizontal: _widthScale(2),
    marginTop: _moderateScale(4),
  },
  card: {
    width: _widthScale(330),
    // height: _moderateScale(100),
    borderRadius: _moderateScale(8),
    backgroundColor: Color.WHITE,
    alignSelf: "center",
    marginTop: _moderateScale(16),
    paddingVertical: _moderateScale(16),
  },
  tabRight__title: {
    fontSize: _moderateScale(16),
    color: Color.GREY_FOR_TITLE,
  },
  tabRightNotifi: {
    width: "85%",
    backgroundColor: Color.WHITE,
    paddingBottom: _heightScale(8),
    height: "100%",
  },
  header__title: {
    fontSize: _moderateScale(16),
    color: Color.GREY_FOR_TITLE,
    width: _widthScale(250),
    textAlign: "center",
    // backgroundColor:'red'
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: _width,
    height: _moderateScale(45),
    backgroundColor: Color.WHITE,
  },
  scene: {
    flex: 1,
  },
  box: {
    // padding: _heightScale(15),
    // paddingVertical: _heightScale(10),
    // paddingLeft:_widthScale(40),
    flex: 1,
    backgroundColor: Color.WHITE,
    borderRadius: _widthScale(10),
  },
  box_text1: {
    fontSize: _heightScale(16),
    // marginBottom: _heightScale(5),
    color: Color.GREY,
  },
  box_text2: {
    color: Color.GREEN,
    fontSize: _heightScale(18),
  },
  box_child: {
    flexDirection: "row",
    // justifyContent: '',
    alignItems: "center",
    // paddingHorizontal: _widthScale(5),
  },
  box_child_text: {
    fontSize: _heightScale(13),
    // marginBottom: _heightScale(5),
    color: Color.GREY,
  },
  icon: {
    width: _moderateScale(22),
    height: _moderateScale(22),
    resizeMode: "contain",
  },
  iconSm: {
    width: _moderateScale(19),
    height: _moderateScale(19),
    resizeMode: "contain",
  },
  dotNewNotifi: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    borderRadius: _moderateScale(4),
    backgroundColor: Color.RED,
    position: "absolute",
    right: _moderateScale(2),
    top: _moderateScale(2),
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.68,

  elevation: 1.5,
};

const gradient = {
  container: {
    width: "100%",
    height: "100%",
    // paddingVertical: basePadding.sm,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  color: [Color.BASE_COLOR, "rgba(104, 47, 144,.4)"],
};

export default CreateGroupChat;
