import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_5,
  BLACK,
  BORDER_COLOR,
  GREY,
  RED,
  WHITE,
} from "@Constant/Color";
import { stylesFont } from "@Constant/Font";
import { _moderateScale } from "@Constant/Scale";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  title: string;
  require?: boolean;
  number?: boolean;
  icon?: any;
  error?: string;
  setError?: (item) => void;
  value: any;
  setValue?: (item) => void;
};

const MultiInput = ({
  title,
  require,
  number,
  icon,
  setError,
  error,
  setValue,
  value,
}: Props) => {
  const [onFocused, setOnFocused] = useState(false);
  const positionY = useSharedValue(0);

  const RefInputDate = useRef(null);
  const RefInputMonth = useRef(null);
  const RefInputYear = useRef(null);

  const [valueTextInputDate, setValueTextInputDate] = useState("");
  const [valueTextInputMonth, setValueTextInputMonth] = useState("");
  const [valueTextInputYear, setValueTextInputYear] = useState("");

  useEffect(() => {
    if (onFocused) {
      positionY.value = withTiming(-30, { duration: 300 });
    } else {
      if (valueTextInputDate?.trim()?.length == 0) {
        positionY.value = withTiming(0, { duration: 300 });
      }
    }
  }, [onFocused]);

  useEffect(() => {
    console.log({ value });
    if (
      !isEmpty(value?.day) ||
      !isEmpty(value?.month) ||
      !isEmpty(value?.year)
    ) {
      positionY.value = withTiming(-30, { duration: 300 });
    }
    if (value?.day) {
      setValueTextInputDate(value?.day?.toString().padStart(2, "0"));
    }
    if (value?.month) {
      setValueTextInputMonth(value?.month?.toString().padStart(2, "0"));
    }
    if (value?.year) {
      setValueTextInputYear(`${value?.year}`);
    }
  }, [value]);

  const animText = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: positionY.value,
        },
      ],
    };
  });

  const _handleOnfocusInput = () => {
    setOnFocused(true);
  };
  const _handleOnBlurInput = () => {
    console.log({
      valueTextInputDate,
      valueTextInputMonth,
      valueTextInputYear,
    });
    handleCheckDate({
      year: valueTextInputYear,
      month: valueTextInputMonth,
      day: valueTextInputDate,
    });

    setOnFocused(false);
  };

  const handleCheckDate = ({ year, month, day }) => {
    // Kết hợp ngày, tháng, năm thành một chuỗi đầy đủ
    const fullDate = `${year}-${month}-${day}`;

    // Sử dụng moment để kiểm tra tính hợp lệ của ngày tháng năm
    const isValidDate = moment(fullDate, "YYYY-MM-DD", true).isValid();

    if (isValidDate) {
      if (moment(fullDate).isBefore(moment())) {
        setValue({
          day: day,
          month: month,
          year: year,
        });
        setError(null);
      } else {
        setError(`Ngày tháng năm không hợp lệ`);
      }
    } else {
      setError(`Ngày tháng năm không hợp lệ`);
      console.log("Thông báo", "Ngày tháng năm không hợp lệ");
    }
  };

  const _handleOnChangeTextDate = (value) => {
    setValueTextInputDate(value);
    if (value.length === 2) {
      RefInputMonth.current.focus();
    }
  };
  const _handleOnChangeTextMonth = (value) => {
    setValueTextInputMonth(value);
    if (value.length === 2) {
      RefInputYear.current.focus();
    }
  };
  const _handleOnChangeTextYear = (value) => {
    setValueTextInputYear(value);
    if (value.length === 4) {
      RefInputYear.current.blur();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setOnFocused(true);
        RefInputDate.current.focus();
      }}
    >
      <View
        style={[
          styles.container,
          onFocused && { borderWidth: 1, borderColor: BASE_COLOR },
          error && { borderColor: RED },
        ]}
      >
        <Animated.View style={[styles.textTitle, animText]}>
          <Text
            weight={onFocused ? "bold" : "regular"}
            color={onFocused ? BASE_COLOR : GREY}
            size={_moderateScale(14)}
          >
            {title} {require && <Text color={RED}>*</Text>}
          </Text>
        </Animated.View>

        <Row paddingLeft={8 * 6} gap={8}>
          <View style={styles.icon}>{icon}</View>

          <View>
            <TextInput
              selectTextOnFocus
              placeholderTextColor={BG_GREY_OPACITY_5}
              placeholder="01"
              value={valueTextInputDate}
              onChangeText={(e) => _handleOnChangeTextDate(e)}
              ref={RefInputDate}
              onFocus={_handleOnfocusInput}
              onBlur={_handleOnBlurInput}
              keyboardType={number ? "number-pad" : "default"}
              maxLength={2}
              style={[
                styles.input,
                {
                  opacity: onFocused || valueTextInputDate?.length > 0 ? 1 : 0,
                },
              ]}
            />
            <View
              style={[
                styles.input__underLine,
                {
                  opacity: onFocused || valueTextInputDate?.length > 0 ? 1 : 0,
                },
              ]}
            />
          </View>
          <Text
            style={{
              opacity: onFocused || valueTextInputDate?.length > 0 ? 1 : 0,
            }}
          >
            /
          </Text>

          <View>
            <TextInput
              selectTextOnFocus
              placeholderTextColor={BG_GREY_OPACITY_5}
              placeholder="01"
              value={valueTextInputMonth}
              onChangeText={(e) => _handleOnChangeTextMonth(e)}
              ref={RefInputMonth}
              onFocus={_handleOnfocusInput}
              onBlur={_handleOnBlurInput}
              keyboardType={number ? "number-pad" : "default"}
              maxLength={2}
              style={[
                styles.input,
                {
                  opacity: onFocused || valueTextInputMonth?.length > 0 ? 1 : 0,
                },
              ]}
            />
            <View
              style={[
                styles.input__underLine,
                {
                  opacity: onFocused || valueTextInputDate?.length > 0 ? 1 : 0,
                },
              ]}
            />
          </View>
          <Text
            style={{
              opacity: onFocused || valueTextInputDate?.length > 0 ? 1 : 0,
            }}
          >
            /
          </Text>

          <View>
            <TextInput
              selectTextOnFocus
              placeholderTextColor={BG_GREY_OPACITY_5}
              placeholder="2000"
              value={valueTextInputYear}
              onChangeText={(e) => _handleOnChangeTextYear(e)}
              ref={RefInputYear}
              onFocus={_handleOnfocusInput}
              onBlur={_handleOnBlurInput}
              keyboardType={number ? "number-pad" : "default"}
              maxLength={4}
              style={[
                styles.input,
                {
                  opacity: onFocused || valueTextInputYear?.length > 0 ? 1 : 0,
                },
                { width: _moderateScale(8 * 6) },
              ]}
            />
            <View
              style={[
                styles.input__underLine,
                {
                  opacity: onFocused || valueTextInputDate?.length > 0 ? 1 : 0,
                },
                { width: _moderateScale(8 * 6) },
              ]}
            />
          </View>
        </Row>

        <Collapsible collapsed={error ? false : true}>
          <Column margin={8 * 2} marginTop={0}>
            <Text color={RED} fontStyle="italic">
              * {error}
            </Text>
          </Column>
        </Collapsible>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MultiInput;

const styles = StyleSheet.create({
  input__underLine: {
    width: _moderateScale(8 * 3),
    height: 1,
    backgroundColor: GREY,
    position: "absolute",
    bottom: _moderateScale(8 * 2),
  },
  input: {
    ...stylesFont.fontNolan,
    textAlign: "center",
    width: _moderateScale(8 * 3),
    height: _moderateScale(8 * 7),
  },
  textTitle: {
    position: "absolute",
    top: _moderateScale(8 * 2),
    left: _moderateScale(8 * 6),
    backgroundColor: WHITE,
    paddingHorizontal: _moderateScale(4),
  },
  textInput: {
    flex: 1,
    height: _moderateScale(8 * 7),
    paddingHorizontal: _moderateScale(4),
  },
  icon: {
    position: "absolute",
    left: _moderateScale(8 * 2),
  },
  container: {
    // height: _moderateScale(8 * 7),
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
});
