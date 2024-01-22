import Text from "@Components/Text";
import React, { useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import * as Color from "../../Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import Row from "@Components/Row";
import { stylesFont } from "../../Constant/Font";
import CountryPicker from "react-native-country-picker-modal";
import {
  Country,
  CountryCode,
} from "react-native-country-picker-modal/lib/types";
import Column from "@Components/Column";
import TextInput from "@Components/TextInput";

type Props = ViewStyle & {
  label: string;
  errorMessage: string;
  content: string;
  countryCallingCode: string;
  onBlur: () => void;
  onChangeText: (string) => void;
  onSelectionCallingCode: (string) => void;
  marginTop?: number;
};

export default function PhoneInput({
  label,
  content,
  errorMessage,
  countryCallingCode,
  onBlur,
  onChangeText,
  onSelectionCallingCode,
  marginTop,
}: Props) {
  const [countryCode, setCountryCode] = useState<CountryCode>("VN");
  const [country, setCountry] = useState<Country>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    onSelectionCallingCode(country.callingCode[0]);
  };
  return (
    <Column marginTop={marginTop}>
      <Row
        paddingVertical={8 * 2}
        borderRadius={8}
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
        <Column>
          <CountryPicker
            withFilter={true}
            withFlag={true}
            withEmoji={true}
            withAlphaFilter={false}
            withCallingCode={true}
            withCountryNameButton={false}
            countryCode={countryCode}
            onSelect={onSelect}
            visible={false}
            containerButtonStyle={styles.countryCode}
          />
        </Column>
        <Text>+{countryCallingCode}</Text>
        <Column
          height={20}
          width={1}
          marginHorizontal={16}
          backgroundColor={Color.BORDER_INPUT_TEXT}
        />
        <TextInput
          value={content}
          keyboardType={"number-pad"}
          onChangeText={onChangeText}
          style={styles.input_text}
          placeholder={label}
          placeholderTextColor={"grey"}
          onBlur={onBlur}
        />
      </Row>
      {content && (
        <View style={styles.labelContainer}>
          <Text size={14} color={Color.GREY}>
            {label}
          </Text>
        </View>
      )}
      {errorMessage && errorMessage.length > 0 && (
        <Text style={styles.error_text}>{errorMessage}</Text>
      )}
    </Column>
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
  error_text: {
    color: Color.ERROR_COLOR,
    marginHorizontal: 10,
    fontStyle: "italic",
    marginVertical: 5,
  },
  input_text: {
    ...stylesFont.fontNolan,
    fontSize: 14,
    paddingVertical: 0,
    flex: 1,
    color: Color.BLACK,
    marginLeft: 5,
  },
  countryCode: {
    paddingVertical: 0,
    paddingTop: 0,
    marginTop: -10,
    marginBottom: -13,
  },
});
