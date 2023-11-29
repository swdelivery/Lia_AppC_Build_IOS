import { isEmpty, remove as _remove } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  LayoutAnimation,
  Alert,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import { useSelector } from "react-redux";
import SocketInstance from "../../../../../SocketInstance";
import * as Color from "../../../../Constant/Color";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../../Constant/Scale";
import { useMentions } from "react-native-controlled-mentions/dist";
import { _uploadModule, _uploadModuleDocument } from "../../../../Services/api";
import {
  CSS_SEND_MESSAGE,
  SSC_USER_TYPING,
  CSS_PARTNER_TYPING,
} from "../../../../Sockets/type";
import { uploadModuleDocument } from "../../../../Redux/Action/BookingAction";
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
import { useTimeout } from "@r0b0t3d/react-native-hooks";
import MediaPicker from "./MediaPicker";

type Props = {
  //
};

const InputChat = ({ }: Props) => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { data: conversation } = useSelector(getConversationState);
  const moreActions = useVisible();
  const imageActions = useVisible();
  const moreActionsHeight = useSharedValue(0);

  const [currTextMessage, setCurrTextMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listUserIsTyping, setListUserIsTyping] = useState([]);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const [listSgMsg, setListSgMsg] = useState([]);
  const [isShowlistSgMsg, setIsShowListSgMsg] = useState(false);
  useTimeout(
    () => {
      setIsTyping(false);
    },
    isTyping ? 3000 : -1
  );

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
      setListUserIsTyping((prev) => {
        if (data?.conversationId == conversation?._id) {
          if (data.data.isTyping == false) {
            let tempListUserIsTyping = [...prev];
            _remove(
              tempListUserIsTyping,
              (item) => item.userId === data.data.userId
            );
            return tempListUserIsTyping;
          } else {
            if (data.data.userId == infoUser?._id) return;
            let tempListUserIsTyping = [...prev]?.filter(
              (item) => item?.userId !== data?.data?.userId
            );
            return [data.data, ...tempListUserIsTyping];
          }
        }
      });
    });

    return () => {
      SocketInstance.socketConn?.off(SSC_USER_TYPING);
    };
  }, [conversation]);

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

  const _changeCurrTextMessage = useCallback((e) => {
    setIsTyping(e.length > 0);
    setCurrTextMessage(e);
  }, []);

  const _sendMessage = useCallback(() => {
    // ====== NEW =======
    if (isEmpty(currTextMessage.trim())) {
      return;
    }

    setLoadingSendMessage(true);

    let flagChatGPT = currTextMessage.includes("{@}[ChatGPT](1)");
    let customText = currTextMessage.replace("{@}[ChatGPT](1)", "");
    let customType = flagChatGPT ? "chatgpt" : "text";

    let data = {
      conversationId: conversation?._id,
      message: {
        type: customType,
        content: flagChatGPT ? customText.trim() : currTextMessage,
      },
    };

    setIsTyping(false);
    setCurrTextMessage("");
    SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data);
    setTimeout(() => {
      setLoadingSendMessage(false);
    }, 300);
  }, [currTextMessage]);

  const handleMessage = useCallback(
    (message: any) => {
      let data = {
        conversationId: conversation?._id,
        message,
      };

      SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data);
    },
    [conversation]
  );

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let listDocuments = {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
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
    console.log({ data });

    SocketInstance.socketConn?.emit(CSS_SEND_MESSAGE, data);
  }, [conversation]);

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
            multiline
            {...textInputProps}
            style={styles.input}
            placeholder={"Vui lòng nhập tin nhắn"}
            placeholderTextColor={Color.GREY}
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
              onPress={imageActions.show}
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

      <MediaPicker
        visible={imageActions.visible}
        onClose={imageActions.hide}
        onMessage={handleMessage}
      />
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
