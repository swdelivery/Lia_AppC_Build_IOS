import _isEmpty from "lodash/isEmpty";
import React, { useEffect, useRef, useCallback, useState, memo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from "../../../rootNavigation";
import {
  BG_GREY_OPACITY_5,
  BLUE_FB,
  GREY,
  WHITE,
  BG_GREY_OPACITY,
  RED,
} from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { sizeIcon } from "../../Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
  _width,
} from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import {
  getCommentsByPostId,
  createPostCommentv2,
} from "../../Redux/Action/PostAction";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import ItemComment from "./Components/ItemComment";
import { getBottomSpace } from "react-native-iphone-x-helper";
import store from "../../Redux/store";
import * as ActionType from "../../Redux/Constants/ActionType";
import TextInput from "@Components/TextInput";

const ModalCommentPost = memo((props) => {
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);

  let refTextInput = useRef(null);
  const dispatch = useDispatch();

  const listCommentRef = useRef();

  const [listComments, setListComments] = useState([]);
  const [loadingSendCmt, setLoadingSendCmt] = useState(false);

  const [currTextComment, setCurrTextComment] = useState("");
  const [currReplyComment, setCurrReplyComment] = useState({});

  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const [scrollListCommentTo, setScrollListCommentTo] = useState(null);

  useEffect(() => {
    _getListComments();
    if (props?.route?.params?.showKeyboard) {
      refTextInput.focus();
    }
  }, []);

  useEffect(() => {
    if (isFirstLoaded && listComments?.length > 0) {
      console.log({ x: props });

      let indexFind = listComments?.findIndex(
        (item) => item?._id == props?.route?.params?.idCommentHighlight
      );
      if (indexFind !== -1) {
        setTimeout(() => {
          listCommentRef.current.scrollToIndex({
            animated: true,
            index: indexFind,
          });
        }, 1000);
      }

      // setTimeout(() => {
      //     listCommentRef.current.scrollToIndex({ animated: true, index: 3 })

      // }, 1000);
    }
  }, [isFirstLoaded]);

  const _getListComments = async () => {
    let result = await getCommentsByPostId(
      {
        condition: {
          parentId: {
            equal: null,
          },
        },
        sort: {
          created: -1,
        },
        limit: 10,
        page: 1,
      },
      props?.route?.params?.idPost
    );

    if (result?.isAxiosError) return setIsFirstLoaded(true);
    setListComments(result?.data?.data);
    if (result?.data?.meta?.totalPage == 0) {
      setTotalPage(0);
      setCurrPage(0);
    } else {
      setTotalPage(result?.data?.meta?.totalPage);
      setCurrPage(result?.data?.meta?.page);
    }
    setIsFirstLoaded(true);
  };

  const _getMoreComments = async () => {
    let result = await getCommentsByPostId(
      {
        condition: {
          parentId: {
            equal: null,
          },
        },
        sort: {
          created: -1,
        },
        limit: 10,
        page: currPage + 1,
      },
      props?.route?.params?.idPost
    );
    if (result?.isAxiosError) return;
    setListComments((old) => {
      return [...old, ...result?.data?.data];
    });
    if (result?.data?.meta?.totalPage == 0) {
      setTotalPage(0);
      setCurrPage(0);
    } else {
      setTotalPage(result?.data?.meta?.totalPage);
      setCurrPage(result?.data?.meta?.page);
    }
  };

  const _comfirmSendComment = async (refTextInput) => {
    if (isEmpty(currTextComment.trim())) {
      return alert("Vui lòng nhập bình luận");
    }

    setLoadingSendCmt(true);

    let result = await createPostCommentv2({
      content: currTextComment,
      postId: props?.route?.params?.idPost,
    });
    if (result?.isAxiosError) return;

    setLoadingSendCmt(false);
    setCurrTextComment("");
    refTextInput.blur();

    setListComments((old) => {
      return [result?.data?.data, ...old];
    });
    if (props?.route?.params?.setInfoPost) {
      props?.route?.params?.setInfoPost((old) => {
        return {
          ...old,
          commentsCount: old?.commentsCount + 1,
        };
      });
    }
  };

  const _comfirmSendReplyComment = async (refTextInput) => {
    if (isEmpty(currTextComment.trim())) {
      return alert("Vui lòng nhập bình luận");
    }

    setLoadingSendCmt(true);

    let result = await createPostCommentv2({
      content: currTextComment,
      postId: props?.route?.params?.idPost,
      parentId: currReplyComment?._id,
    });
    if (result?.isAxiosError) return;

    setLoadingSendCmt(false);
    setCurrTextComment("");

    let tempListComments = cloneDeep(listComments);

    let indexCommentParent = tempListComments?.findIndex(
      (item) => item?._id == result?.data?.data?.parentId
    );
    if (indexCommentParent !== -1) {
      tempListComments[indexCommentParent] = {
        ...tempListComments[indexCommentParent],
        commentsCount: tempListComments[indexCommentParent].commentsCount + 1,
      };
    }
    setListComments(tempListComments);
    refTextInput.blur();
    setCurrReplyComment({});
    if (props?.route?.params?.setInfoPost) {
      props?.route?.params?.setInfoPost((old) => {
        return {
          ...old,
          commentsCount: old?.commentsCount + 1,
        };
      });
    }

    // setListComments(old => {
    //     return [
    //         result?.data?.data,
    //         ...old,
    //     ]
    // })
  };

  const _setCurrReplyComment = useCallback((itemCommemtForRep) => {
    console.log({ itemCommemtForRep });

    setCurrReplyComment(itemCommemtForRep);
  }, []);
  const _refTextInputFunction = () => {
    refTextInput.focus();
  };

  const _renderItem = ({ item, index }) => {
    return (
      <>
        <ItemComment
          isHightLight={item?._id == props?.route?.params?.idCommentHighlight}
          idCommentHighlight={props?.route?.params?.idCommentHighlight}
          refTextInput={_refTextInputFunction}
          setCurrReplyComment={_setCurrReplyComment}
          data={item}
        />
        {/* {
                    index == listComments?.length - 1 ?
                        <View style={{ height: 50 }} />
                        : <></>
                } */}
      </>
    );
  };

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <>
      <StatusBarCustom bgColor={WHITE} barStyle={"dark-content"} />
      <KeyboardAvoidingView
        keyboardVerticalOffset={
          Platform.OS == "ios" && getBottomSpace() == 0 ? _heightScale(0) : 0
        }
        behavior={Platform.OS == "ios" ? "padding" : null}
        style={{
          flexGrow: 1,
        }}
      >
        <View style={{ flex: 1, backgroundColor: WHITE }}>
          {/* {
                listComments?.map((item, index) => {
                    return(
                        <ItemComment data={item}/>
                    )
                })
            } */}
          <View
            style={{
              margin: _moderateScale(8 * 1.5),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: _moderateScale(8 * 3.5) }} />

            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(16),
              }}
            >
              Bình luận
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={[
                styleElement.centerChild,
                {
                  width: _moderateScale(8 * 3.5),
                  height: _moderateScale(8 * 3.5),
                  borderRadius: _moderateScale((8 * 3.5) / 2),
                  backgroundColor: BG_GREY_OPACITY_5,
                },
              ]}
            >
              <Image
                style={[sizeIcon.md]}
                source={require("../../Icon/cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={listComments}
            ref={listCommentRef}
            renderItem={_renderItem}
            keyExtractor={_awesomeChildListKeyExtractor}
            ListFooterComponent={() => {
              if (currPage !== totalPage) {
                return (
                  <View style={{ marginLeft: _moderateScale(8 * 3) }}>
                    <View style={{ height: _moderateScale(8 * 2) }} />
                    <TouchableOpacity onPress={_getMoreComments}>
                      <Text
                        style={{
                          ...stylesFont.fontNolan500,
                          fontSize: _moderateScale(14),
                        }}
                      >
                        Tải thêm bình luận
                      </Text>
                    </TouchableOpacity>
                    <View style={{ height: _moderateScale(8 * 6) }} />
                  </View>
                );
              } else {
                return (
                  <View style={{ marginLeft: _moderateScale(8 * 3) }}>
                    <View style={{ height: _moderateScale(8 * 2) }} />
                    <View style={{ height: _moderateScale(8 * 6) }} />
                  </View>
                );
              }
            }}
          />

          <View
            style={{
              borderTopWidth: _moderateScale(1),
              borderColor: BG_GREY_OPACITY_5,
            }}
          >
            {!isEmpty(currReplyComment) ? (
              <>
                <View
                  style={[
                    styleElement.rowAliCenter,
                    {
                      marginTop: _moderateScale(8),
                      marginLeft: _moderateScale(8 * 4),
                    },
                  ]}
                >
                  <View
                    style={{
                      width: _moderateScale(2),
                      height: _moderateScale(16),
                      backgroundColor: RED,
                      marginRight: _moderateScale(4),
                    }}
                  />

                  <Text style={[stylesFont.fontNolan]}>{`Đang trả lời `}</Text>
                  <Text style={[stylesFont.fontNolanBold, { color: BLUE_FB }]}>
                    {`${currReplyComment?.partner?.name}`}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      // console.log({aloo: refTextInput});
                      console.log({ rep: refTextInput });

                      refTextInput.blur();
                      setCurrReplyComment({});
                    }}
                    style={[
                      {
                        marginLeft: _moderateScale(8),
                        padding: _moderateScale(4),
                        borderRadius: _moderateScale(4),
                        backgroundColor: BG_GREY_OPACITY_5,
                      },
                    ]}
                  >
                    <Image
                      style={sizeIcon.xxxs}
                      source={require("../../Icon/cancel.png")}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <></>
            )}

            <View
              style={{
                width: _width,
                paddingVertical: _moderateScale(12),
                paddingBottom: getBottomSpace() + _moderateScale(12),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: WHITE,
              }}
            >
              <View
                style={{
                  backgroundColor: BG_GREY_OPACITY,
                  borderRadius: _moderateScale(10),
                  paddingVertical: _moderateScale(5),
                }}
              >
                <TextInput
                  ref={(ref) => (refTextInput = ref)}
                  multiline
                  value={currTextComment}
                  onChangeText={(content) => {
                    setCurrTextComment(content);
                  }}
                  style={styles.input}
                  placeholder={"Thêm bình luận"}
                />
              </View>
              <View>
                <TouchableOpacity
                  // disabled={loadingSendCmt}
                  style={{}}
                  onPress={() => {
                    if (!infoUserRedux?._id) {
                      store.dispatch({
                        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                        payload: {
                          flag: true,
                          currRouteName: props?.route?.name,
                        },
                      });
                      return;
                    }

                    // _comfirmSendComment()
                    if (currReplyComment?._id) {
                      // refTextInput.blur()
                      _comfirmSendReplyComment(refTextInput);
                    } else {
                      _comfirmSendComment(refTextInput);
                    }

                    console.log({ currReplyComment });
                  }}
                >
                  {loadingSendCmt ? (
                    <ActivityIndicator
                      color={Platform.OS !== "ios" && GREY}
                      size={"small"}
                    />
                  ) : (
                    <Image
                      style={[sizeIcon.llg]}
                      source={require("../../Icon/send.png")}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
});

const styles = StyleSheet.create({
  input: {
    width: _moderateScale(250),
    // height: _moderateScale(50),
    padding: 0,
    fontSize: _moderateScale(16),
    paddingHorizontal: _moderateScale(16),
    margin: 0,
  },
});

export default ModalCommentPost;
