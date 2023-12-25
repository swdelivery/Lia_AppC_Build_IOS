import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Color from "../../../../Constant/Color";
import {
  _moderateScale,
  _width,
  _widthScale,
} from "../../../../Constant/Scale";
import { styleElement } from "../../../../Constant/StyleElement";
import ScreenKey from "../../../../Navigation/ScreenKey";
import Row from "@Components/Row";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconBackWhite } from "@Components/Icon/Icon";
import Text from "@Components/Text";
import { OptionDotsVerticalIcon } from "src/SGV";
import Avatar from "@Components/Avatar";
import { Conversation } from "@typings/chat";
import { useNavigate } from "src/Hooks/useNavigation";
import Column from "@Components/Column";

type Props = {
  conversation: Conversation;
};

const Header = ({ conversation }: Props) => {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();

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
          disabled={conversation?.type == "videoCallRequest"}
          onPress={() => {
            navigation.navigate(ScreenKey.INFO_ROOM_CHAT);
          }}
          activeOpacity={0.8}
          style={styles.roomInfo}
        >
          {conversation?.type === "consultation" && (
            <Image
              resizeMode="cover"
              source={require("src/NewImage/logoLiA.png")}
              style={styles.icon}
            />
          )}
          {conversation?.type === "videoCallRequest" && (
            <Image
              resizeMode="cover"
              source={require("../../../../NewIcon/noteCall.png")}
              style={styles.icon}
            />
          )}

          <Row flex={1} marginLeft={8}>
            {conversation?.type === "treatment" && (
              <DoctorInfo conversation={conversation} />
            )}
            {conversation?.type === "consultation" && (
              <Text weight="bold" numberOfLines={1} size={16} color={"white"}>
                {conversation?.name}
              </Text>
            )}
            {conversation?.type === "videoCallRequest" && (
              <>
                <Text numberOfLines={1} weight="bold" size={16}>
                  Yêu cầu Video Call
                </Text>
                {/* {_renderStatusVideoCall(conversation?.data?.status)} */}
              </>
            )}
          </Row>
        </TouchableOpacity>
        <View>
          <OptionDotsVerticalIcon />
        </View>
      </Row>

      {conversation?.type === "videoCallRequest" &&
        isEmpty(conversation?.assignedUsers) && (
          <Column
            backgroundColor={Color.WHITE}
            paddingVertical={_moderateScale(8)}
            paddingHorizontal={_moderateScale(8 * 2)}
          >
            <Text weight="bold" color={Color.GREY}>
              Hiện chưa có bác sĩ đảm nhận cuộc hẹn này
            </Text>
          </Column>
        )}
    </>
  );
};

function DoctorInfo({ conversation }: { conversation: any }) {
  const mainDoctor = useMemo(() => {
    return conversation?.assignedUsers?.find((item) => item?.isMain);
  }, [conversation]);

  if (mainDoctor) {
    return (
      <>
        <Avatar avatar={mainDoctor?.profile?.fileAvatar} size={35} circle />
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
    backgroundColor: "#1c5579",
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
    backgroundColor: "white",
  },
  roomInfo: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Header;
