import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@Components/Text'
import { IconDiary, IconHandHeart, IconHeart, IconHome } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import { BLACK, GREY_FOR_TITLE, WHITE } from "@Constant/Color";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Column from "@Components/Column";
import { styleElement } from "@Constant/StyleElement";

const MainList = () => {
  return (
    <Row
      backgroundColor={"white"}
      marginHorizontal={16}
      borderRadius={8}
      style={styleElement.shadow}
    >
      <Row gap={8 * 2} justifyContent="space-between">
        <BtnIcon flag={"diary"} text={"Nhật ký"} icon={<IconDiary />} />
        <BtnIcon
          flag={"health-record"}
          text={"Sức khỏe"}
          icon={<IconHeart width={8 * 3.5} height={8 * 3.5} />}
        />
        <BtnIcon
          flag={"relatives-profile"}
          text={"Người thân"}
          icon={<IconHome />}
        />
        <BtnIcon flag={"affiliate"} text={"Tri ân"} icon={<IconHandHeart />} />
      </Row>
    </Row>
  );
};

export default MainList;

const BtnIcon = ({ icon = null, text = "", flag = null }) => {
  const { navigate } = useNavigate();

  const _handlePress = () => {
    switch (flag) {
      case "affiliate":
        return navigate(ScreenKey.NEW_AFFILIATE)();
      case "diary":
        return navigate(ScreenKey.LIST_PARTNER_DIARY)();
      case "health-record":
        return navigate(ScreenKey.HEALTH_RECORD)();
      case "relatives-profile":
        return navigate(ScreenKey.LIST_RELATIVES_PROFILE)();

      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={_handlePress} style={styles.btn}>
      <Column height={30} alignItems="center" justifyContent="center">
        {icon}
      </Column>
      <Text color={BLACK} size={14} weight="bold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: "center",
    borderRadius: 8,
    gap: 4,
    paddingVertical: 8,
  },
  container: {
    paddingHorizontal: 8 * 2,
  },
});
