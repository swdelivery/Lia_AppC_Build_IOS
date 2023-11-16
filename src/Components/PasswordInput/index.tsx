import Text from "@Components/Text";
import React, { ReactNode, useMemo, useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import * as Color from "../../Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { TextInput } from "react-native-gesture-handler";
import EyeOn from "../../SGV/eyeOn.svg";
import EyeOff from "../../SGV/eyeOff.svg";
import Row from "@Components/Row";
import { stylesFont } from "../../Constant/Font";

type Props = ViewStyle & {
  label: string;
  errorMessage: string;
  content: string;
  onBlur: () => void;
  onChangeText: (string) => void;
};

export default function PasswordInput({label, content, errorMessage, onBlur, onChangeText}: Props) {
  const [isShowPass, setIsShowPass] = useState(false);
  return (
    <View>
      {content ? (
        <View style={styles.labelContainer}>
          <Text size={14} color={Color.GREY}>
            {label}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <Row
        paddingVertical={_moderateScale(8 * 2)}
        borderRadius={_moderateScale(8)}
        borderColor={
            errorMessage
            ? Color.ERROR_COLOR
            : content
            ? Color.BORDER_INPUT_TEXT_FOCUSED
            : Color.BORDER_INPUT_TEXT
        }
        borderWidth={1}
        paddingHorizontal={10}
      >
        <TextInput
          secureTextEntry={!isShowPass}
          value={content}
          onChangeText={onChangeText}
          style={styles.input_text}
          placeholder={label}
          placeholderTextColor={"grey"}
          onBlur={onBlur}
        />
        <TouchableOpacity
          onPress={() => {
            setIsShowPass(!isShowPass);
          }}
        >
          {isShowPass ? (
            <EyeOff width={20} height={20} />
          ) : (
            <EyeOn width={20} height={20} />
          )}
        </TouchableOpacity>
      </Row>
      {errorMessage && errorMessage.length > 0 ? (
        <Text style={styles.error_text}>{errorMessage}</Text>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelContainer: {
    backgroundColor: "white", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
  },
  error_text:{
    color: Color.ERROR_COLOR,
    marginHorizontal: 10,
    fontStyle: 'italic',
    marginVertical: 5
  },
  input_text:{
    ...stylesFont.fontNolan,
    fontSize: _moderateScale(14),
    paddingVertical: 0,
    flex: 1,
    color: Color.BLACK
  },
});