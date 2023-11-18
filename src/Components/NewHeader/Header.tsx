import { ColorValue, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { IconBackWhite } from "@Components/Icon/Icon";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import { styleElement } from "@Constant/StyleElement";
import Column from "@Components/Column";

type Props = {
  barStyle?: "light-content" | "dark-content";
  bg?: ColorValue;
  safeTop?: boolean;
  titleColor?: ColorValue;
  title: string;
};

const Header = ({
  barStyle = "light-content",
  bg = BASE_COLOR,
  safeTop,
  titleColor = WHITE,
  title,
}: Props) => {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();

  const containerStyle = useMemo(() => {
    return {
      paddingTop: top,
    };
  }, [top]);

  return (
    <Column backgroundColor={bg} style={[styles.header, containerStyle]}>
      <StatusBar translucent barStyle={barStyle || "light-content"} />
      <View style={styles.header__box}>
        <View style={styleElement.flex}>
          <TouchableOpacity onPress={navigation.goBack}>
            <IconBackWhite />
          </TouchableOpacity>
        </View>
        <Column flex={4} alignItems="center">
          <Text weight="bold" size={16} color={titleColor}>
            {title}
          </Text>
        </Column>
        <View style={styleElement.flex} />
      </View>
    </Column>
  );
};

export default Header;

const styles = StyleSheet.create({
  header__box: {
    height: _moderateScale(8 * 6),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
  },
  header: {},
});
