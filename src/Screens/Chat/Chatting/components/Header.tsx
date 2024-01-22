import { isEmpty } from "lodash";
import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { StatusBar } from "@Components/StatusBar";
import SVGBackWhite from "src/SGV/backWhite.svg";
import useApi from "src/Hooks/services/useApi";
import PartnerService from "src/Services/PartnerService";

type Props = {
  conversation: Conversation;
};

const Header = ({ conversation }: Props) => {
  const { navigation, navigate } = useNavigate();
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
          <SVGBackWhite />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={conversation?.type == "videoCallRequest"}
          onPress={navigate(ScreenKey.INFO_ROOM_CHAT)}
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
        <TouchableOpacity
          disabled={conversation?.type == "videoCallRequest"}
          onPress={navigate(ScreenKey.INFO_ROOM_CHAT)}
        >
          <OptionDotsVerticalIcon />
        </TouchableOpacity>
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
  const { data, performRequest } = useApi(
    PartnerService.getDoctorDetails,
    null
  );
  const { navigation } = useNavigate();
  const mainDoctor = useMemo(() => {
    return conversation?.assignedUsers?.find((item) => item?.isMain);
  }, [conversation]);

  const _handleNavigate = useCallback(() => {
    // PENDING FOR WAITING BACKEND
    console.log({ mainDoctor, conversation });

    if (mainDoctor?.employeeType == 'BS') {
      performRequest(mainDoctor?.profile._id);
      // navigation.navigate(ScreenKey.DETAIL_DOCTOR, { doctor: mainDoctor?.profile });
    }

  }, [mainDoctor])

  if (mainDoctor) {
    return (
      <TouchableOpacity onPress={_handleNavigate}>
        <Row>
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
        </Row>
      </TouchableOpacity>
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
    borderBottomWidth: 0.5,
    borderBottomColor: Color.BG_GREY_OPACITY_5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // borderColor: Color.BG_GREY_OPACITY
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
    top: 1,
  },
  icon: {
    width: 8 * 5,
    height: 8 * 5,
    borderRadius: (8 * 5) / 2,
    borderColor: Color.BG_GREY_OPACITY,
    backgroundColor: "white",
  },
  roomInfo: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Header;
