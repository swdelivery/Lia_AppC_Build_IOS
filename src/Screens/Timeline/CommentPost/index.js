import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useDispatch, useSelector } from "react-redux";
// COMPONENT
import EachCommentPost from "../../../Components/Timeline/EachCommentPost";
import {
  BASE_COLOR,
  BG_GREY_OPACITY,
  BG_GREY_OPACITY_5,
  GREY,
  GREY_FOR_TITLE,
  WHITE,
} from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { sizeIcon } from "../../../Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { styleElement } from "../../../Constant/StyleElement";
import {
  clearCurrSeePost,
  confirmCommentPost,
  getAllCommentsByPost,
} from "../../../Redux/Action/PostAction";
import BtnComtLike from "./BtnComtLike";
import ContentPost from "./ContentPost";
import CountLikeAndComment from "./CountLikeAndComment";
import HeaderAndAvatar from "./HeaderAndAvatar";
import ImagesPost from "./ImagesPost";
import TextInput from "@Components/TextInput";

const CommentPost = (props) => {
  let flatListRef = useRef(null);
  let refTextInput = useRef(null);

  const dispatch = useDispatch();

  const infoUserRedux = useSelector((state) => state.infoUserReducer);
  const postsRedux = useSelector((state) => state.postReducer);

  const [currTextComment, setCurrTextComment] = useState("");
  const [currReplyComment, setCurrReplyComment] = useState({});

  const [isShowGallery, setShowGallery] = useState(false);
  const [indexCurrImageView, setIndexCurrImageView] = useState(0);
  const [loadingLikeCmt, setLoadingLikeCmt] = useState(false);
  const [loadingSendCmt, setLoadingSendCmt] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  // const [errorFetch, setErrorFetch] = useState(null)

  useEffect(() => {
    console.log({ alooo: props.route.params });

    dispatch(getAllCommentsByPost(props?.route?.params?.postId));
    // dispatch(getPostById(props?.route?.params?.postId))

    return () => {
      dispatch(clearCurrSeePost());
    };
  }, [props?.route?.params?.postId]);

  // useEffect(() => {
  //     console.log({ abcxyz:  });

  // }, [])

  const _comfirmSendComment = () => {
    if (isEmpty(currTextComment.trim())) {
      return alert("Vui lòng nhập bình luận");
    }

    setLoadingSendCmt(true);

    if (!isEmpty(currReplyComment)) {
      dispatch(
        confirmCommentPost(
          {
            postId: currReplyComment?.postId,
            parentId: currReplyComment?._id,
            content: currTextComment.trim(),
          },
          setLoadingSendCmt
        )
      );
      setCurrTextComment("");
      return;
    }

    dispatch(
      confirmCommentPost(
        {
          postId: props?.route?.params?.postId,
          content: currTextComment.trim(),
        },
        setLoadingSendCmt
      )
    );
    setCurrTextComment("");
  };

  const _getMoreComment = () => {
    dispatch(
      getAllCommentsByPost(
        props?.route?.params?.postId,
        postsRedux.currSeeCommentPost.data[
          postsRedux.currSeeCommentPost.data.length - 1
        ]._id
      )
    );
  };

  const bodyContentAndImages = () => {
    return (
      <>
        <ContentPost data={props?.route?.params?.data} />

        <ImagesPost data={props?.route?.params?.data} />

        <CountLikeAndComment
          countLike={props?.route?.params?.data?.likersCount}
          countComment={props?.route?.params?.data?.commentsCount}
        />

        <BtnComtLike
          refTextInput={() => {
            refTextInput.focus();
          }}
          likerIdArr={props?.route?.params?.data?.likerIdArr}
          // isLike={props?.route?.params?.data?.likerIdArr?.find(itemFind => itemFind == infoUserRedux.infoUser._id) ? false : true}
          postId={props?.route?.params?.data?._id}
        />
      </>
    );
  };

  // const _renderItemComment = ({ item, index }) => {
  //     console.log({ itemmmmm: item });

  //     return (

  //     )
  // }

  const xyz = useCallback((itemCommemtForRep) => {
    setCurrReplyComment(itemCommemtForRep);
    // if (refTextInput.isFocused() == false) {
    //     refTextInput.focus()
    // }
  }, []);

  const refTextInputFunction = () => {
    refTextInput.focus();
  };

  const _renderItemComment = ({ item, index }) => {
    return (
      <EachCommentPost
        refTextInput={refTextInputFunction}
        setCurrReplyComment={xyz}
        item={item}
        lasted={index == postsRedux?.currSeeCommentPost?.data?.length - 1}
      />
    );
  };

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={
        Platform.OS == "ios" && getBottomSpace() == 0 ? _heightScale(16) : 0
      }
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={{
        flexGrow: 1,
      }}
    >
      <View style={[styles.container]}>
        <HeaderAndAvatar
          data={props?.route?.params?.data}
          avatar={
            props?.route?.params?.data?.userCreate?.profile?.fileAvatar?.link
          }
        />
        {/* <ScrollView> */}

        <View style={{ flex: 1 }}>
          <FlatList
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[stylesFont.fontNolan500, { color: GREY }]}>
                    Chưa có bình luận về bài viết này
                  </Text>
                </View>
              );
            }}
            ListHeaderComponent={bodyContentAndImages()}
            ref={(ref) => (flatListRef = ref)}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum) {
                _getMoreComment();
                setOnEndReachedCalledDuringMomentum(true);
              }
            }}
            onMomentumScrollBegin={() => {
              setOnEndReachedCalledDuringMomentum(false);
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={
              !isEmpty(postsRedux?.currSeeCommentPost?.data)
                ? postsRedux?.currSeeCommentPost?.data
                : []
            }
            renderItem={_renderItemComment}
            keyExtractor={_awesomeChildListKeyExtractor}
          />
        </View>

        {/* </ScrollView> */}
        <View
          style={{
            borderTopWidth: _moderateScale(0.5),
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
                    marginLeft: _moderateScale(8 * 2.5),
                  },
                ]}
              >
                <Text style={[stylesFont.fontNolan]}>{`Đang trả lời `}</Text>
                <Text style={[stylesFont.fontNolan500]}>
                  {`${currReplyComment?.userCreate?.profile?.firstName} ${currReplyComment?.userCreate?.profile?.lastName}`}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    // console.log({aloo: refTextInput});
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
                    source={require("../../../Icon/cancel.png")}
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
              paddingVertical: _heightScale(12),
              paddingBottom: getBottomSpace() + _heightScale(12),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              backgroundColor: WHITE,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                alert("Chức năng đang hoàn thiện...");
              }}
            >
              <Image
                style={[sizeIcon.lllg]}
                source={require("../../../Icon/image.png")}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: BG_GREY_OPACITY,
                borderRadius: _moderateScale(10),
                paddingVertical: _heightScale(5),
              }}
            >
              <TextInput
                // onFocus={_onFocusTextInput}
                // onBlur={_outFocusTextInput}
                ref={(ref) => (refTextInput = ref)}
                multiline
                value={currTextComment}
                onChangeText={(content) => {
                  setCurrTextComment(content);
                }}
                style={styles.input}
                placeholder={"Aa"}
              />
            </View>
            <View>
              <TouchableOpacity
                disabled={loadingSendCmt}
                style={{}}
                onPress={() => {
                  _comfirmSendComment();
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
                    source={require("../../../Icon/send.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentView__text: {
    fontSize: _moderateScale(14),
    lineHeight: _moderateScale(8 * 2.5),
    textAlign: "justify",
  },
  contentView: {
    marginVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
  },
  avatarAndTitle__titleAndTime__time: {
    fontSize: _moderateScale(14),
    color: GREY,
  },
  avatarAndTitle__titleAndTime__title: {
    fontSize: _moderateScale(16),
    color: GREY_FOR_TITLE,
  },
  avatarAndTitle__titleAndTime: {
    marginLeft: _moderateScale(8),
  },
  avatarAndTitle__avatar: {
    width: _moderateScale(8 * 4.5),
    height: _moderateScale(8 * 4.5),
    borderRadius: _moderateScale((8 * 4.5) / 2),
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
  },
  avatarAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  comment__nameAndContent__content: {
    fontSize: _moderateScale(14),
  },
  comment__nameAndContent__name: {
    fontSize: _moderateScale(15),
  },
  comment__nameAndContent: {
    backgroundColor: "#F1F2F6",
    // backgroundColor:'grey',
    borderRadius: _moderateScale(8),
    paddingTop: _moderateScale(4),
    paddingBottom: _moderateScale(8),
    paddingHorizontal: _moderateScale(8),
  },
  comment__avatar: {
    width: _moderateScale(8 * 5.5),
    height: _moderateScale(8 * 5.5),
    borderRadius: _moderateScale((8 * 5.5) / 2),
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
  },
  commentReply__avatar: {
    width: _moderateScale(8 * 3.5),
    height: _moderateScale(8 * 3.5),
    borderRadius: _moderateScale((8 * 3.5) / 2),
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
  },
  commentReply: {
    flexDirection: "row",
    marginRight: _moderateScale(8 * 2),
    marginBottom: _moderateScale(8),
    marginTop: _moderateScale(8),
  },
  comment: {
    flexDirection: "row",
    marginHorizontal: _moderateScale(8 * 2),
    marginTop: _moderateScale(8 * 2),
  },
  input: {
    width: _widthScale(250),
    // height: _moderateScale(50),
    padding: 0,
    fontSize: _widthScale(16),
    paddingHorizontal: _widthScale(16),
    margin: 0,
  },
  header: {
    justifyContent: "center",
    // alignItems: 'flex-end',
    width: _width,
    height: _moderateScale(8 * 6),
    backgroundColor: WHITE,
    paddingVertical: _moderateScale(8),
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    borderTopStartRadius: _moderateScale(8),
    borderTopEndRadius: _moderateScale(8),
    // marginTop: _moderateScale(8 * 2),
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
  color: [BASE_COLOR, "rgba(104, 47, 144,.4)"],
};

export default CommentPost;
