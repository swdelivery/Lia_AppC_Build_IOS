import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { navigation } from "../../../../rootNavigation";
import * as Color from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { styleElement } from "../../../Constant/StyleElement";
import { URL_ORIGINAL } from "../../../Constant/Url";
import ScreenKey from "../../../Navigation/ScreenKey";
import Row from "@Components/Row";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconBackWhite } from "@Components/Icon/Icon";
import Text from "@Components/Text";
import { OptionDotsVerticalIcon } from "src/SGV";
import Avatar from "@Components/Avatar";

const Header = (props) => {
  const { top } = useSafeAreaInsets();

  const infoCurrRoomChattingRedux = useSelector(
    (state) => state?.messageReducer?.currRoomChatting?.infoCurrRoomChatting
  );

  const _renderStatusVideoCall = (status) => {
    switch (status) {
      case "WAIT":
        return (
          <View style={[styleElement.rowAliCenter]}>
            <View style={[styles.dot, { backgroundColor: Color.BLUE_FB }]} />
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(12),
                color: Color.BLUE_FB,
              }}
            >
              Đang chờ duyệt
            </Text>
          </View>
        );
      case "ACCEPT":
        return (
          <View style={[styleElement.rowAliCenter]}>
            <View
              style={[styles.dot, { backgroundColor: Color.GREEN_SUCCESS }]}
            />
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(12),
                color: Color.GREEN_SUCCESS,
              }}
            >
              Duyệt thành công
            </Text>
          </View>
        );
      case "COMPLETE":
        return (
          <View style={[styleElement.rowAliCenter]}>
            <View style={[styles.dot, { backgroundColor: Color.BASE_COLOR }]} />
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(12),
                color: Color.BASE_COLOR,
              }}
            >
              Hoàn thành tư vấn
            </Text>
          </View>
        );
      case "DENY":
        return (
          <View style={[styleElement.rowAliCenter]}>
            <View style={[styles.dot, { backgroundColor: Color.GREY }]} />
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(12),
                color: Color.GREY,
              }}
            >
              Tạm hoãn
            </Text>
          </View>
        );
      case "CANCEL":
        return (
          <View style={[styleElement.rowAliCenter]}>
            <View style={[styles.dot, { backgroundColor: Color.RED }]} />
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(12),
                color: Color.RED,
              }}
            >
              Huỷ tư vấn
            </Text>
          </View>
        );

      default:
        break;
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Row
        style={styles.header}
        paddingTop={top + 8}
        paddingBottom={8}
        paddingHorizontal={16}
      >
        <TouchableOpacity
          hitSlop={styleElement.hitslopSm}
          onPress={navigation.goBack}
        >
          <IconBackWhite />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={infoCurrRoomChattingRedux?.type == "videoCallRequest"}
          onPress={() => {
            navigation.navigate(ScreenKey.INFO_ROOM_CHAT);
          }}
          activeOpacity={0.8}
          style={styles.roomInfo}
        >
          {infoCurrRoomChattingRedux?.type === "consultation" && (
            <Image
              resizeMode="cover"
              source={require("../../../NewIcon/tuvan.png")}
              style={styles.icon}
            />
          )}
          {infoCurrRoomChattingRedux?.type === "videoCallRequest" && (
            <Image
              resizeMode="cover"
              source={require("../../../NewIcon/noteCall.png")}
              style={styles.icon}
            />
          )}

          <Row flex={1} marginLeft={8}>
            {infoCurrRoomChattingRedux?.type === "treatment" && (
              <DoctorInfo
                infoCurrRoomChattingRedux={infoCurrRoomChattingRedux}
              />
            )}
            {infoCurrRoomChattingRedux?.type === "consultation" && (
              <Text weight="bold" numberOfLines={1} size={16}>
                {infoCurrRoomChattingRedux?.name}
              </Text>
            )}
            {infoCurrRoomChattingRedux?.type === "videoCallRequest" && (
              <>
                <Text numberOfLines={1} weight="bold" size={16}>
                  Yêu cầu Video Call
                </Text>
                {_renderStatusVideoCall(
                  infoCurrRoomChattingRedux?.data?.status
                )}
              </>
            )}

            {/* {
                        !isEmpty(currChattingRedux) &&
                            currChattingRedux.memberArr.length > 0 &&
                            currChattingRedux.type == "single" ?
                            <>
                                {
                                    listUserOnlineRedux?.find(item => item == currChattingRedux.memberArr.find(itemFind => itemFind.userId._id !== infoUserRedux.infoUser._id).userId._id) ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ marginRight: _moderateScale(6), width: _moderateScale(12), height: _moderateScale(12), borderRadius: _moderateScale(6), backgroundColor: Color.ONLINE }} />
                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), bottom: _moderateScale(1) }]}>
                                                Đang hoạt động
                                            </Text>
                                        </View>
                                        :
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ marginRight: _moderateScale(6), width: _moderateScale(12), height: _moderateScale(12), borderRadius: _moderateScale(6), backgroundColor: Color.BG_GREY_OPACITY_7 }} />
                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), bottom: _moderateScale(1) }]}>
                                                Không hoạt động...
                                            </Text>
                                        </View>
                                }
                            </>
                            :
                            <>
                            </>
                    } */}
          </Row>
        </TouchableOpacity>
        <View>
          <OptionDotsVerticalIcon />
        </View>
      </Row>

      {infoCurrRoomChattingRedux?.type == "videoCallRequest" ? (
        <>
          {isEmpty(infoCurrRoomChattingRedux?.assignedUsers) ? (
            <View
              style={{
                backgroundColor: Color.WHITE,
                paddingVertical: _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2),
              }}
            >
              <Text
                style={{
                  ...stylesFont.fontNolan500,
                  fontSize: _moderateScale(14),
                  fontStyle: "italic",
                  color: Color.GREY,
                }}
              >
                Hiện chưa có bác sĩ đảm nhận cuộc hẹn này
              </Text>
            </View>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

function DoctorInfo({
  infoCurrRoomChattingRedux,
}: {
  infoCurrRoomChattingRedux: any;
}) {
  const mainDoctor = useMemo(() => {
    return infoCurrRoomChattingRedux?.assignedUsers?.find(
      (item) => item?.isMain
    );
  }, [infoCurrRoomChattingRedux]);

  if (mainDoctor) {
    return (
      <>
        <Avatar size={35} circle />
        <Text
          weight="bold"
          size={16}
          numberOfLines={1}
          left={12}
          color={Color.WHITE}
        >
          {mainDoctor?.name}
        </Text>
      </>
    );
  }
  return (
    <Text weight="bold" size={16} numberOfLines={1}>
      Hỗ trợ sau điều trị
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    width: _width,
    backgroundColor: Color.BASE_COLOR,
    zIndex: 1,
    borderBottomWidth: _moderateScale(0.5),
    borderBottomColor: Color.BG_GREY_OPACITY_5,
  },
  avatar: {
    width: _moderateScale(40),
    height: _moderateScale(40),
    borderRadius: _moderateScale(20),
    // borderColor: Color.BG_GREY_OPACITY
  },
  dot: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    borderRadius: _moderateScale(4),
    marginRight: _moderateScale(4),
    top: _moderateScale(1),
  },
  icon: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
    borderColor: Color.BG_GREY_OPACITY,
  },
  roomInfo: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Header;
