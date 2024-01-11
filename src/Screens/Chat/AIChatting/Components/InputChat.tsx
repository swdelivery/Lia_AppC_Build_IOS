import Column from "@Components/Column";
import Fade from "@Components/Fade";
import IconButton from "@Components/IconButton";
import Row from "@Components/Row";
import { FONT_WEIGHTS } from "@Components/Text";
import { getInfoUserReducer } from "@Redux/Selectors";
import { createAIMessage } from "@Redux/aichat/actions";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useHapticCallback from "src/Hooks/useHapticCallback";
import {
  ChatGptIcon,
  SendIcon
} from "src/SGV";
import * as Color from "../../../../Constant/Color";
import {
  _widthScale
} from "../../../../Constant/Scale";

type Props = {
  //
};

const InputChat = ({ }: Props) => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const dispatch = useDispatch()

  const [currTextMessage, setCurrTextMessage] = useState("");

  const handlePressSend = useHapticCallback(() => {
    if (currTextMessage) {
      _sendMessage(currTextMessage);
    }
  }, [currTextMessage]);

  const _sendMessage = (message) => {
    setCurrTextMessage("")
    dispatch(createAIMessage.request({
      "partnerId": infoUser?._id,
      "content": message
    }))
  }

  return (
    <View>
      <Row
        backgroundColor={Color.WHITE}
        paddingHorizontal={16}
        gap={16}
        paddingVertical={12}
        borderTopWidth={1}
        borderColor={Color.BORDER_COLOR}
      >
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
            value={currTextMessage}
            onChangeText={(e) => setCurrTextMessage(e)}
            style={styles.input}
            placeholder={"Vui lòng nhập tin nhắn"}
            placeholderTextColor={Color.GREY}
          />
        </Column>
        <IconButton onPress={handlePressSend} size={30}>
          <SendIcon color={Color.BASE_COLOR} />
        </IconButton>
      </Row>
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
