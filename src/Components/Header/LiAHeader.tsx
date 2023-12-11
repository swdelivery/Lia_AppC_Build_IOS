import {
  ColorValue,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import Column from "@Components/Column";
import { styleElement } from "@Constant/StyleElement";
import { BackIcon } from "@Components/Icon/Icon";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import { _moderateScale } from "@Constant/Scale";

type Props = {
  barStyle?: "light-content" | "dark-content";
  bg?: ColorValue;
  safeTop?: boolean;
  titleColor?: ColorValue;
  title: string;
  backDisable?: boolean;
  right?: React.ReactElement;
  bottomBorderColor?: ColorValue;
};

const LiAHeader = ({
  barStyle = "light-content",
  bg = BASE_COLOR,
  safeTop = false,
  titleColor = WHITE,
  title,
  backDisable = false,
  right,
  bottomBorderColor,
}: Props) => {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();

  return (
    <Column
      backgroundColor={bg}
      paddingTop={safeTop ? top : 0}
      borderBottomWidth={bottomBorderColor ? StyleSheet.hairlineWidth : 0}
      borderBottomColor={bottomBorderColor}
    >
      <StatusBar translucent barStyle={barStyle || "light-content"} />
      <View style={styles.header__box}>
        <View style={styleElement.flex}>
          {!backDisable && (
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={navigation.goBack}>
              <BackIcon
                color={bg === WHITE ? BASE_COLOR : "white"}
                width={24}
                height={24}
              />
            </TouchableOpacity>
          )}
        </View>
        <Column flex={4} alignItems="center">
          <Text numberOfLines={1} weight="bold" size={16} color={titleColor}>
            {title}
          </Text>
        </Column>
        <Column flex={1} alignItems="flex-end">
          {right}
        </Column>
      </View>
    </Column>
  );
};

export default LiAHeader;

const styles = StyleSheet.create({
  header__box: {
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
