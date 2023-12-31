import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_COLOR } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { IconBackWhite } from "@Components/Icon/Icon";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import { styleElement } from "@Constant/StyleElement";

const Header = (props) => {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();
  const { title } = props;

  const containerStyle = useMemo(() => {
    return {
      paddingTop: top,
    };
  }, [top]);

  return (
    <View style={[styles.header, containerStyle]}>
      <View style={styles.header__box}>
        <View style={styleElement.flex}>
          <TouchableOpacity onPress={navigation.goBack}>
            <IconBackWhite />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, alignItems: "center" }}>
          <Text weight="bold" size={16} color={"white"}>
            {title}
          </Text>
        </View>
        <View style={styleElement.flex} />
      </View>
    </View>
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
  header: {
    backgroundColor: BASE_COLOR,
  },
});
