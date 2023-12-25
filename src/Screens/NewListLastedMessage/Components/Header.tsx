import {
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { _moderateScale } from "@Constant/Scale";
import { BORDER_COLOR, GREY } from "@Constant/Color";
import { IconFindGrey } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import { useDispatch, useSelector } from "react-redux";
import { openActionSheetIcon } from "@Redux/modal/actions";
import { styleElement } from "@Constant/StyleElement";
import { getStateActionSheetIcon } from "@Redux/modal/selectors";
import { isEmpty } from "lodash";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { getInfoUserReducer } from "@Redux/Selectors";
import Avatar from "@Components/Avatar";
import { FocusAwareStatusBar } from "@Components/StatusBar";

const Header = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
  const { infoUser } = useSelector(getInfoUserReducer);

  const { dataChoice } = useSelector(getStateActionSheetIcon);

  const _handlePressOptions = useCallback(() => {
    dispatch(
      openActionSheetIcon({
        flag: true,
        data: [
          { name: "Đặt lịch hẹn", type: "booking" },
          { name: "Gương thần", type: "faceAI" },
        ],
      })
    );
  }, []);

  useEffect(() => {
    if (!isEmpty(dataChoice)) {
      switch (dataChoice.type) {
        case "booking":
          return navigate(ScreenKey.CREATE_BOOKING);
        case "faceAI":
          return navigate(ScreenKey.FACE_AI);
        default:
          break;
      }
    }
  }, [dataChoice]);

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Row
        paddingVertical={_moderateScale(8 * 2)}
        borderBottomWidth={1}
        borderBottomColor={BORDER_COLOR}
        gap={_moderateScale(8 * 2)}
        paddingHorizontal={_moderateScale(8 * 2)}
      >
        <Column>
          <TouchableOpacity>
            <Avatar
              size={32}
              style={styles.avatar}
              avatar={infoUser.fileAvatar}
            />
          </TouchableOpacity>
        </Column>
        <Column flex={1}>
          <Row gap={_moderateScale(8)} style={styles.textInputStyle}>
            <IconFindGrey style={sizeIcon.llg} />
            <TextInput
              placeholder="Tìm kiếm"
              style={styles.textInputStyle__input}
            />
          </Row>
        </Column>
        <TouchableOpacity
          hitSlop={styleElement.hitslopSm}
          onPress={_handlePressOptions}
        >
          <Column gap={4}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </Column>
        </TouchableOpacity>
      </Row>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  dot: {
    width: _moderateScale(4),
    height: _moderateScale(4),
    borderRadius: _moderateScale(2),
    backgroundColor: GREY,
  },
  textInputStyle__input: {
    flex: 1,
  },
  textInputStyle: {
    width: "100%",
    height: 35,
    borderWidth: 1,
    paddingHorizontal: _moderateScale(8),
    borderRadius: 4,
    borderColor: BORDER_COLOR,
  },
  avatar: {
    borderRadius: _moderateScale(8 * 2),
  },
});
