import { isEmpty, remove as _remove } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  LayoutAnimation,
  Alert,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector } from "react-redux";
import SocketInstance from "../../../../../SocketInstance";

import * as Color from "../../../../Constant/Color";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../../Constant/Scale";
import * as ActionType from "../../../../Redux/Constants/ActionType";
import store from "../../../../Redux/store";
import { useMentions } from "react-native-controlled-mentions/dist";
// CALL API
import { _uploadModule, _uploadModuleDocument } from "../../../../Services/api";
import {
  CSS_SEND_MESSAGE,
  SSC_USER_TYPING,
  CSS_PARTNER_TYPING,
} from "../../../../Sockets/type";
import {
  uploadModule,
  uploadModuleDocument,
} from "../../../../Redux/Action/BookingAction";
import { getConfigData } from "../../../../Redux/Action/OrtherAction";
import moment from "moment";
import Typing from "./Typing";
import Row from "@Components/Row";
import {
  ChatGptIcon,
  ImageIcon,
  OptionDotsIcon,
  SendIcon,
  UploadIcon,
} from "src/SGV";
import IconButton from "@Components/IconButton";
import Column from "@Components/Column";
import Text, { FONT_WEIGHTS } from "@Components/Text";
import Fade from "@Components/Fade";
import { getConversationState } from "@Redux/chat/selectors";
import { getInfoUserReducer } from "@Redux/Selectors";
import useHapticCallback from "src/Hooks/useHapticCallback";
import useVisible from "src/Hooks/useVisible";
import Suggestions from "./Suggestions";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import BottomSheet from "@Components/BottomSheet";
import useAnimatedVisible from "src/Hooks/useAnimatedVisible";

type Props = {
  onImagePicker: () => void;
};

const InputChat = ({ onImagePicker }: Props) => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { data: conversation } = useSelector(getConversationState);
  const moreActions = useVisible();
  const moreActionsHeight = useSharedValue(0);

  const [currTextMessage, setCurrTextMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listUserIsTyping, setListUserIsTyping] = useState([]);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [listVideoForUpload, setListVideoForUpload] = useState([]);

  const [listSgMsg, setListSgMsg] = useState([]);

  const [isShowlistSgMsg, setIsShowListSgMsg] = useState(false);

  const ActionSheetRef = useRef();

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (isShowlistSgMsg) {
  //     Animated.timing(animatedArrow, {
  //       toValue: 1,
  //       duration: 500,
  //     }).start();
  //   } else {
  //     Animated.timing(animatedArrow, {
  //       toValue: 0,
  //       duration: 500,
  //     }).start();
  //   }
  // }, [isShowlistSgMsg]);

  useEffect(() => {
    if (isTyping == true) {
      let data = {
        conversationId: conversation?._id,
        data: {
          isTyping: true,
        },
      };
      SocketInstance.socketConn?.emit(CSS_PARTNER_TYPING, data);
      console.log("Start Typing");
    } else {
      let data = {
        conversationId: conversation?._id,
        data: {
          isTyping: false,
        },
      };
      SocketInstance.socketConn?.emit(CSS_PARTNER_TYPING, data);
      console.log("Stop Typing");
    }
  }, [isTyping]);

  useEffect(() => {
    SocketInstance.socketConn?.on(SSC_USER_TYPING, (data) => {
      console.log({
        SOCKET: `----SSC_USER_TYPING---`,
        data,
      });

      if (data?.conversationId == conversation?._id) {
        if (data.data.isTyping == false) {
          let tempListUserIsTyping = [...listUserIsTyping];
          _remove(
            tempListUserIsTyping,
            (item) => item.userId === data.data.userId
          );
          setListUserIsTyping(tempListUserIsTyping);
        } else {
          if (data.data.userId == infoUser?._id) return;
          let tempListUserIsTyping = [...listUserIsTyping]?.filter(
            (item) => item?.userId !== data?.data?.userId
          );
          setListUserIsTyping([data.data, ...tempListUserIsTyping]);
        }
      }
    });

    return () => {
      SocketInstance.socketConn?.off(SSC_USER_TYPING);
    };
  }, [conversation, listUserIsTyping]);

  useEffect(() => {
    if (conversation?._id) {
      _getConfigData(conversation?.type);
    }
  }, [conversation]);

  const _getConfigData = async (type) => {
    if (type == "consultation") {
      if (
        !conversation?.latestMessage?._id ||
        moment
          .duration(
            moment(new Date()).diff(
              moment(conversation?.latestMessage?.created)
            )
          )
          .asMinutes() > 60
      ) {
        setTimeout(() => {
          setIsShowListSgMsg(true);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, 500);
      }
      let result = await getConfigData("CONSMSGBOX");
      if (result?.isAxiosError) return;
      setListSgMsg(result?.value);
    }
    if (type == "treatment") {
      if (
        !conversation?.latestMessage?._id ||
        moment
          .duration(
            moment(new Date()).diff(
              moment(conversation?.latestMessage?.created)
            )
          )
          .asMinutes() > 60
      ) {
        setTimeout(() => {
          setIsShowListSgMsg(true);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, 500);
      }
      let result = await getConfigData("TREATMSGBOX");
      if (result?.isAxiosError) return;
      setListSgMsg(result?.value);
    }
  };

  const _changeCurrTextMessage = (e) => {
    if (e.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    setCurrTextMessage(e);
  };

  const _sendMessage = () => {
    // ====== NEW =======
    if (isEmpty(currTextMessage.trim())) {
      return;
    }

    setLoadingSendMessage(true);

    let flagChatGPT = currTextMessage.includes("{@}[ChatGPT](1)");
    let customText = currTextMessage.replace("/{@}[ChatGPT](1)/g", "");
    let customType = flagChatGPT ? "chatgpt" : "text";

    let data = {
      conversationId: conversation?._id,
      message: {
        type: customType,
        content: flagChatGPT ? customText.trim() : currTextMessage,
      },
    };

    console.log("tuccccccccccccccccccccccccccccccccccccccccccccccc", data);

    setIsTyping(false);
    setCurrTextMessage("");
    SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data);
    setTimeout(() => {
      setLoadingSendMessage(false);
    }, 300);
  };
  const _onFocusTextInput = () => {
    // setIsTyping(true)
  };
  const _outFocusTextInput = () => {
    setIsTyping(false);
  };

  const pickDocument = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let listDocuments = {
        uri: res.uri,
        type: res.type,
        name: res.name,
      };
      let resultUploadDocumentMessage = await uploadModuleDocument({
        moduleName: "chatMessage",
        files: [listDocuments],
      });
      if (resultUploadDocumentMessage.isAxiosError) return;

      let listIdDocumentHasUpload =
        resultUploadDocumentMessage?.data?.data?.map((item) => item._id);
      let data = {
        conversationId: conversation?._id,
        message: {
          type: "document",
          documents: listIdDocumentHasUpload,
        },
      };
      SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data);
    } catch (err: any) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        Alert.alert(err.message);
      }
    }
  };

  // Config of suggestible triggers
  const triggersConfig = {
    mention: {
      trigger: "@",
    },
  };

  const patternsConfig = {
    url: {
      pattern: /a/gi,
      textStyle: { color: "blue" },
    },
  };

  const { textInputProps, triggers } = useMentions({
    value: currTextMessage || "",
    onChange: (content) => {
      _changeCurrTextMessage(content);
    },
    triggersConfig,
    // patternsConfig,
  });

  const handleRightActionPress = useHapticCallback(() => {
    if (currTextMessage) {
      _sendMessage();
    } else {
      moreActionsHeight.value = withSpring(moreActions.visible ? 0 : 80, {
        overshootClamping: true,
      });
      moreActions.toggle();
    }
  }, [currTextMessage, _sendMessage, moreActions.visible]);

  const handleChatGptPress = useHapticCallback(() => {
    let data = {
      conversationId: conversation?._id,
      message: {
        type: "chatgpt",
        content: "Tóm tắt lại cuộc trò chuyện",
      },
    };
    SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data);
  }, []);

  // const pickVideoDocument = async () => {
  //     try {
  //         const res = await DocumentPicker.pick({
  //             type: [DocumentPicker.types.images],
  //         });
  //         console.log(
  //             res.uri,
  //             res.type, // mime type
  //             res.name,
  //             res.size
  //         );

  //         let listDocuments = {
  //             uri: res.uri,
  //             type: res.type,
  //             name: res.name,
  //         };

  //         let resultUploadDocumentMessage = await handleApi(_uploadModuleDocument({
  //             moduleName: 'chatMessage',
  //             files: [listDocuments]
  //         }))
  //         if (resultUploadDocumentMessage.error) return

  //         let listIdDocumentHasUpload = resultUploadDocumentMessage.data.map(item => item._id);
  //         let data = {
  //             room: currChattingRedux?.code,
  //             message: {
  //                 type: "document",
  //                 documents: listIdDocumentHasUpload
  //             }
  //         };
  //         SocketInstance.socketConn.emit(CSS_SEND_MESSAGE, data)

  //     } catch (err) {
  //         if (DocumentPicker.isCancel(err)) {
  //             // User cancelled the picker, exit any dialogs or menus and move on
  //         } else {
  //             throw err;
  //         }
  //     }
  // }

  // const _showActionSheet = () => {
  //     ActionSheetIOS.showActionSheetWithOptions(
  //         {
  //             options: ["Huỷ", "Chụp ảnh", 'Video', "Chọn từ thư viện"],
  //             // destructiveButtonIndex: 2,
  //             cancelButtonIndex: 0,
  //             userInterfaceStyle: 'dark'
  //         },
  //         buttonIndex => {
  //             if (buttonIndex === 0) {
  //                 // cancel action
  //             } else if (buttonIndex === 1) {
  //                 pickCamera()
  //             } else if (buttonIndex === 2) {
  //                 pickMultiple()
  //             }
  //         })
  // }

  const moreActionsAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: moreActionsHeight.value,
      opacity: interpolate(
        moreActionsHeight.value,
        [30, 80],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <View>
      <Typing users={listUserIsTyping} />

      {triggers ? (
        <>
          <Suggestions {...triggers.mention} />
        </>
      ) : null}

      <Row
        backgroundColor={Color.WHITE}
        paddingHorizontal={16}
        gap={16}
        paddingVertical={12}
        borderTopWidth={1}
        borderColor={Color.BORDER_COLOR}
      >
        <IconButton onPress={handleChatGptPress}>
          <ChatGptIcon />
        </IconButton>
        <Column
          borderWidth={1}
          borderRadius={5}
          borderColor={Color.BORDER_INPUT_TEXT}
          flex={1}
          minHeight={35}
          paddingVertical={2}
        >
          <TextInput
            onFocus={_onFocusTextInput}
            onBlur={_outFocusTextInput}
            multiline
            {...textInputProps}
            style={styles.input}
            placeholder={"Vui lòng nhập tin nhắn"}
          />
        </Column>
        <IconButton
          onPress={handleRightActionPress}
          isLoading={loadingSendMessage}
          size={30}
        >
          <Fade
            visible={!currTextMessage}
            style={styles.sendIcon}
            duration={150}
          >
            <OptionDotsIcon
              color={moreActions.visible ? Color.BASE_COLOR : Color.GREY}
            />
          </Fade>
          <Fade
            visible={!!currTextMessage}
            style={styles.sendIcon}
            duration={150}
          >
            <SendIcon />
          </Fade>
        </IconButton>
      </Row>
      <Animated.View style={[styles.moreActions, moreActionsAnimatedStyle]}>
        <Row
          borderTopWidth={1}
          borderTopColor={Color.BORDER_COLOR}
          gap={30}
          paddingHorizontal={20}
          paddingVertical={11}
          width={_width}
        >
          <Column alignItems="center">
            <IconButton
              size={40}
              backgroundColor={Color.BASE_COLOR_LIGHT}
              borderRadius={5}
              onPress={onImagePicker}
            >
              <ImageIcon />
            </IconButton>
            <Text size={12}>Hình ảnh</Text>
          </Column>
          <Column alignItems="center">
            <IconButton
              size={40}
              backgroundColor={Color.BASE_COLOR_LIGHT}
              borderRadius={5}
              onPress={pickDocument}
            >
              <UploadIcon />
            </IconButton>
            <Text size={12}>Tài liệu</Text>
          </Column>
        </Row>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 4,
    fontSize: 14,
    paddingHorizontal: _widthScale(16),
    margin: 0,
    fontFamily: FONT_WEIGHTS["regular"],
    maxHeight: 150,
  },
  content: {
    minHeight: 1000,
  },
  moreActions: {
    overflow: "hidden",
    justifyContent: "center",
    width: "100%",
  },
  sendIcon: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "white",
  },
});

export default InputChat;
