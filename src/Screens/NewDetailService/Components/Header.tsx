import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import IconBackBlack from "../../../SGV/backArrBlack.svg";
import IconFind from "../../../SGV/find_grey.svg";
import { navigation } from "../../../../rootNavigation";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

const Header = () => {
  const { navigate } = useNavigate();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={navigation.goBack}
        hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
      >
        <IconBackBlack
          width={_moderateScale(8 * 3)}
          height={_moderateScale(8 * 3)}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.header__input}
        onPress={navigate(ScreenKey.SEARCHING_HOME)}
      >
        <IconFind
          width={_moderateScale(8 * 2)}
          height={_moderateScale(8 * 2)}
        />
        <Text left={_moderateScale(8)}>Tìm bất cứ gì bạn muốn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header__input: {
    height: _moderateScale(8 * 4),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: _moderateScale(8 * 2),
    backgroundColor: "#F7F7F7",
    marginLeft: _moderateScale(8 * 2),
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    width: _width,
    height: _moderateScale(8 * 6),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbd9d9",
  },
});
