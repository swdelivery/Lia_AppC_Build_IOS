import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_COLOR, WHITE } from "../../Constant/Color";
import { _moderateScale } from "../../Constant/Scale";
import { IconBackGrey, IconBackWhite } from "../Icon/Icon";
import { sizeIcon } from "../../Constant/Icon";
import { ColorValue } from "react-native";
import Column from "@Components/Column";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "@Components/Text";
import Row from "@Components/Row";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  barStyle: "light-content" | "dark-content";
  bg?: ColorValue;
  safeTop?: boolean;
  titleColor?: ColorValue;
  title: string;
};

const LiAHeader = ({
  barStyle,
  bg = BASE_COLOR,
  safeTop,
  titleColor = WHITE,
  title,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { navigation } = useNavigate();

  return (
    <>
      <StatusBar translucent barStyle={barStyle || "light-content"} />
      <Column backgroundColor={bg} marginTop={safeTop ? top : 0}>
        <Row style={styles.header__box}>
          <Column flex={1}>
            <TouchableOpacity onPress={navigation.goBack}>
              {barStyle == "light-content" ? (
                <IconBackWhite style={sizeIcon.llg} />
              ) : (
                <IconBackGrey style={sizeIcon.llg} />
              )}
            </TouchableOpacity>
          </Column>
          <Column flex={4} alignItems="center">
            <Text weight="bold" size={16} color={titleColor}>
              {title}
            </Text>
          </Column>
          <Row flex={1} />
        </Row>
      </Column>
    </>
  );
};

export default LiAHeader;

const styles = StyleSheet.create({
  header__box: {
    height: _moderateScale(8 * 6),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
  },
  header: {
    backgroundColor: BASE_COLOR,
    // borderBottomWidth:.5,
    // borderBottomColor:'rgba(0,0,0,.3)'
  },
});
