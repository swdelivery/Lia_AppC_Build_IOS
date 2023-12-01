import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BASE_COLOR } from "../../../Constant/Color";
import { _moderateScale } from "../../../Constant/Scale";
import { IconBXH, IconWallet } from "../../../Components/Icon/Icon";
import ScreenKey from "../../../Navigation/ScreenKey";
import LiAHeader from "@Components/Header/LiAHeader";
import Row from "@Components/Row";
import { useNavigate } from "src/Hooks/useNavigation";

const Header = () => {
  const { navigate } = useNavigate();
  return (
    <LiAHeader
      safeTop
      title="Tri  Ân"
      right={
        <Row gap={8}>
          <TouchableOpacity onPress={navigate(ScreenKey.LIST_RANKED)}>
            <IconBXH />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigate(ScreenKey.INFO_WALLET_NEW_AFFILIATE)}
          >
            <IconWallet />
          </TouchableOpacity>
        </Row>
      }
    />
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
