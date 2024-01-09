import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BASE_COLOR, BORDER_COLOR, BRONZE, GOLD, PLATINUM, SILVER, WHITE } from '@Constant/Color'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Column from '@Components/Column'
import { IconSetting } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Avatar from '@Components/Avatar'
import { useSelector } from 'react-redux'
import Text from '@Components/Text'
import BtnLevelCode from './BtnLevelCode'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { sizeIcon } from '@Constant/Icon'
import { styleElement } from '@Constant/StyleElement'
import { getInfoUserReducer } from "@Redux/Selectors";
import { hidePartOfString } from "src/utils/common";

const Banner = () => {
  const { navigate } = useNavigate();
  const { infoUser } = useSelector(getInfoUserReducer);
  const { top } = useSafeAreaInsets();

  const _renderLevelCode = (levelCode) => {
    switch (levelCode) {
      case "BRONZE":
        return <BtnLevelCode name={"Hạng đồng"} bgColor={BRONZE} />;
      case "SILVER":
        return <BtnLevelCode name={"Hạng bạc"} bgColor={SILVER} />;
      case "GOLD":
        return <BtnLevelCode name={"Hạng vàng"} bgColor={GOLD} />;
      case "PLATINUM":
        return <BtnLevelCode name={"Hạng kim cương"} bgColor={PLATINUM} />;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Column marginTop={top}>
        <TouchableOpacity
          hitSlop={styleElement.hitslopSm}
          onPress={navigate(ScreenKey.SETTING_APP)}
          style={styles.btnSetting}
        >
          <IconSetting style={sizeIcon.llg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigate(ScreenKey.EDIT_PROFILE)}>
          <Row paddingHorizontal={8 * 2} gap={8 * 2}>
            <Avatar
              style={styles.avatar}
              avatar={infoUser?.fileAvatar}
              size={8 * 8}
              circle
            />
            <Column gap={4} flex={1}>
              <Text weight="bold" size={14} color={WHITE}>
                {infoUser?.name}
              </Text>
              <Text weight="regular" size={14} color={WHITE}>
                {hidePartOfString(infoUser?.phone[0]?.fullPhoneNumber, 6, 10)}
              </Text>
              {_renderLevelCode(infoUser?.levelCode)}
            </Column>
          </Row>
        </TouchableOpacity>
      </Column>
    </View>
  );
};

export default Banner

const styles = StyleSheet.create({
  avatar: {
    borderWidth: .5,
    borderColor: WHITE
  },
  btnSetting: {
    // alignSelf: 'flex-end',
    // marginRight: 8 * 2
    position: 'absolute',
    top: 8,
    right: 8 * 3,
    zIndex: 1
  },
  container: {
    backgroundColor: BASE_COLOR,
    paddingBottom: 8 * 2
  }
})
